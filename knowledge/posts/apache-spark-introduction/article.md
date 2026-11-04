# Apache Spark 是什么：把一份大数据任务拆给一群机器做

Spark 是 Apache 基金会维护的开源分布式计算引擎。它解决的核心问题很具体：当一台机器的内存、磁盘或计算速度不够时，把数据和计算拆成许多分区，交给集群中的多台机器并行处理，最后合并结果。Spark 不是数据库，也不是某种单独的存储格式；它是运行数据处理程序的计算层，通常从对象存储、HDFS、数据库、消息队列等外部系统读数据，再把结果写回去。

本文面向第一次接触大数据的读者，重点回答四件事：Spark 的程序在集群中怎样运行、代码为何不会立即执行、DataFrame/SQL 与 RDD 有什么关系、什么时候应该用 Spark。

## 1. 先用一个例子理解它

假设电商网站一天产生 1 TB 点击日志。任务是统计每个商品被点击的次数。

在单机 Python 中，可以把日志读进来，逐行计数；但 1 TB 可能装不进内存，读完也可能需要很久。Spark 可以把日志切成许多分区：机器 A 统计一部分商品，机器 B 统计另一部分；遇到同一个商品的记录，再通过网络把它们汇到同一组，最后得到总计。

这里的“并行”不是把一条 Python `for` 循环自动变快，而是让同一套数据处理逻辑在多个分区上执行。数据本身通常仍放在外部存储中，Spark 负责调度计算和在必要时传输中间结果。

## 2. 一个 Spark 应用由哪些角色组成

一次提交的 Spark 应用主要有三类角色：

- **Driver**：运行用户的主程序，创建 `SparkSession`/`SparkContext`，把代码转换成执行计划，并负责把任务发给执行进程。
- **Executor**：运行在工作节点上的进程，真正执行 task，读取分区、计算、缓存中间数据并向 Driver 汇报结果。
- **Cluster Manager**：资源管理器，负责给应用分配 Executor。可以是 Spark Standalone、Hadoop YARN 或 Kubernetes。

可以把它类比成餐厅：Driver 是领班，负责把菜单拆成工序；Executor 是多个厨房小组，分别处理食材；Cluster Manager 是负责安排厨房和炉灶的后勤。Driver 不应该亲自把所有数据拉回本机，否则集群就失去了意义。

用户通常用 `spark-submit` 提交程序。每个应用有自己的一组 Executor，应用之间相互隔离；不同应用不能直接共享 Executor 的内存，需要通过外部存储交换数据。Spark 的 Driver 还必须能被 Executor 访问，因此远程提交时要考虑网络可达性。

## 3. Spark 程序为什么不是写一行跑一行

Spark 的转换操作（transformation）通常是**惰性的**：`select`、`filter`、`map`、`groupBy` 等操作先记录“想怎样处理数据”，并不马上扫描整个数据集。只有遇到 action，例如 `count`、`collect`、`save`、`write`，Spark 才提交任务并执行计划。

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("click-count").getOrCreate()
logs = spark.read.json("s3://bucket/clicks/")
valid = logs.filter("event = 'click'")
counts = valid.groupBy("item_id").count()
counts.write.mode("overwrite").parquet("s3://bucket/result/")  # action
```

在 `filter` 和 `groupBy` 之后，Spark 可以看到完整的计算链，并选择列裁剪、谓词下推、分区合并等优化。最后的 `write` 才触发执行。

这个机制也解释了一个常见现象：写了很多转换却没有任何输出，并不一定是程序卡住了；可能只是还没有 action。反过来，`collect()` 会把结果拉回 Driver，结果过大时可能导致 Driver 内存溢出，生产任务一般写到外部存储或只取少量样本。

## 4. RDD、DataFrame 和 SQL：三种抽象如何分工

### 4.1 RDD：分布式对象集合

RDD（Resilient Distributed Dataset，弹性分布式数据集）是被分区、可并行操作的元素集合。它可以从文件或本地集合创建，支持 `map`、`filter`、`reduce` 等转换；计算失败时，Spark 能依据分区的转换谱系重新计算丢失分区。RDD 还可 `cache`/`persist`，在多次使用时把中间结果保存在集群内存或磁盘。

RDD 适合需要精细控制对象和计算流程的场景，但它携带的表结构信息少，优化器不如结构化 API 充分。早期 Spark 教程常用 RDD；新项目若处理表格数据，通常优先考虑 DataFrame。

### 4.2 DataFrame：有列名的分布式表

DataFrame 是带命名列的分布式数据集合，概念上像数据库表或 Python Pandas DataFrame，但数据分布在集群上。Spark SQL 能利用 schema（列名、类型）和计算计划做更多优化，DataFrame API 可用 Python、Scala、Java 和 R。

同一件事可以写成 SQL 或 API；两者最后都交给同一个 Spark SQL 执行引擎：

```python
counts = (
    logs.filter(logs.event == "click")
        .groupBy("item_id")
        .count()
)
```

### 4.3 Dataset 与 Spark SQL

Dataset 是带结构信息的分布式集合，Scala/Java 可获得更强的类型约束；Python 主要使用 DataFrame。Spark SQL 也可通过 SQL、JDBC/ODBC 或 Hive 表访问。初学者可以先把 DataFrame 理解为“分布式表”，把 RDD 理解为“分布式对象集合”：需要结构化数据分析时先用 DataFrame/SQL，确实需要低层对象控制时再用 RDD。

## 5. 一次作业怎样变成集群中的任务

对上面的点击统计，典型执行链是：

1. Driver 读取代码并建立逻辑计划。
2. Spark 把计划优化为物理执行计划，并按依赖关系划分 stage。
3. 每个输入分区产生一个或多个 task，Executor 在本地读取并处理。
4. 如果操作只需在每个分区内完成（例如过滤），数据可以保持本地处理。
5. 如果要 `groupBy(item_id)`，相同 key 必须到同一个下游分区，Spark 进行 **shuffle**：中间数据按 key 分桶并经网络写入/读取。
6. 下游 Executor 合并各分区结果，最终写出文件或返回小结果给 Driver。

shuffle 是很多 Spark 作业的成本中心：它涉及网络、磁盘和序列化。`groupBy`、`join`、`distinct`、按 key 聚合等操作都可能触发 shuffle。优化 Spark 不能只看 CPU；还要看数据倾斜（某个 key 特别多）、分区数、网络和中间文件。

## 6. 容错：机器坏了为什么还能继续

Spark 不假设所有机器永远正常。对 RDD，系统记录了每个分区是怎样从父数据转换得到的（lineage）；某个 Executor 丢失时，可以在其他 Executor 上重算丢失分区。对结构化查询，可靠的输入和输出、shuffle 数据以及流处理 checkpoint 共同承担恢复职责。

这不是“所有状态都自动永久保存”：重算会花时间；外部副作用（例如自己写的非幂等 API 调用）也不会因为 Spark 重试就自动安全。因此写外部系统时要设计幂等、提交协议和 checkpoint。

## 7. 缓存、广播与累加器

- **缓存（cache/persist）**：当同一个中间 DataFrame/RDD 被多个 action 重复使用时，把它保留在集群内存或磁盘，避免重复计算。缓存不是永久数据湖，内存不足时可能被淘汰。
- **广播变量（broadcast）**：把一个相对较小的只读对象复制到各 Executor，例如几十 MB 的商品类别表，避免每条记录都跨网络发送。
- **累加器（accumulator）**：只允许任务向一个共享计数器做加法等“只增不读”的更新，适合统计监控；不要把它当作业务数据库，因为任务重试可能使副作用重复。

## 8. Spark 不只做离线批处理

Spark 的模块大致包括：

- **Spark SQL / DataFrame**：结构化批处理和 SQL 查询，通常是数据清洗、聚合、Join 的首选。
- **Structured Streaming**：把不断到来的数据视为一张持续增长的表，用 DataFrame/SQL 表达计算。默认以 micro-batch（小批次）执行，也支持 Continuous Processing；checkpoint 和日志用于恢复。官方文档给出的模式是：先定义 `readStream` 和转换，再启动查询写出结果。
- **MLlib**：分布式机器学习算法与特征处理工具，适合传统机器学习流水线；深度学习训练通常使用专门框架，再由 Spark 做数据准备或推理编排。
- **GraphX**：图计算 API，处理顶点—边关系。

Structured Streaming 的典型例子是实时词频或实时点击统计：每来一小批数据，更新已有计数；程序仍然使用和批处理相近的转换。它不是把任意离线代码自动变成实时服务，输入连接器、状态、时间窗口和输出语义都要明确设计。

## 9. 怎样判断 Spark 是否适合一个项目

适合 Spark 的信号：数据量或并发已经超过单机舒适范围；任务是可拆分的批处理、SQL 聚合、Join、特征加工或流式聚合；团队愿意管理集群资源和数据存储。

不一定适合的情况：数据很小，启动 Executor 的开销反而比本地 Pandas 大；任务需要大量细粒度交互或低延迟单条请求；算法依赖复杂的跨样本状态，难以拆成分区和 shuffle；或者只是想加速一段本来就在单机内存中完成的 Python 循环。

一个实用的入门路线是：先用 `pyspark` 在本地 `master("local[*]")` 跑通读取、过滤、聚合和写出；再查看 Spark UI 中的 job、stage、task、shuffle 和缓存；最后把同一个程序用 `spark-submit` 提交到 Standalone、YARN 或 Kubernetes 集群。这样能先理解计算模型，再学习资源配置，而不是从一堆参数开始背。

## 10. 一句话总结

Spark 把“对海量数据做一串变换”表达成可优化的计算计划，再把计划拆成分区级 task，交给多个 Executor 并行运行；DataFrame/SQL 提供结构化优化，RDD 提供更底层的分区抽象，shuffle 是跨机器交换数据的主要代价，缓存和 lineage 则分别帮助复用与容错。

## 资料

- [Apache Spark Cluster Mode Overview](https://spark.apache.org/docs/latest/cluster-overview.html)
- [Apache Spark RDD Programming Guide](https://spark.apache.org/docs/latest/rdd-programming-guide.html)
- [Spark SQL, DataFrames and Datasets Guide](https://spark.apache.org/docs/latest/sql-programming-guide.html)
- [Structured Streaming Programming Guide](https://spark.apache.org/docs/latest/streaming/index.html)
- [Apache Spark 官方项目主页](https://spark.apache.org/)

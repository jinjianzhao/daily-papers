# DeepSeek 主模型系列演进：V1 到 V4：逐篇解析

> 当前页面按分类和时间顺序逐篇介绍论文。 [快速理解版](../) · [BibTeX 与 DBLP 查询结果](../bibliography/index.html) · [返回综述目录](../../)

## 逐篇解析

以下论文先按研究角色分为主体、相邻和背景，再在主体内部显示任务标签；统一模型不会被压缩成单一任务。这里的“统一模型内的三维生成能力”只表示主体模型中的一个任务分支，不等于把独立的 text-to-3D、image-to-3D 或单任务 3D 生成器纳入主体。分类内按首稿时间从早到晚排列。文字为摘要级快速介绍，配图来自论文原文。

### 主体论文（统一多模态模型）

#### 任务标签：高效自回归生成（Efficient Autoregressive Generation）

##### 2024

##### DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model

作者：DeepSeek-AI, Liu, Aixin, Feng, Bei, Wang, Bin, Wang, Bingxuan, Liu, Bo, Zhao, Chenggang, Dengr, Chengqi, Ruan, Chong, Dai, Damai, Guo, Daya, Yang, Dejian, Chen, Deli, Ji, Dongjie, Li, Erhang, Lin, Fangyun, Luo, Fuli, Hao, Guangbo, Chen, Guanting, Li, Guowei, Zhang, H., Xu, Hanwei, Yang, Hao, Zhang, Haowei, Ding, Honghui, Xin, Huajian, Gao, Huazuo, Li, Hui, Qu, Hui, Cai, J. L., Liang, Jian, Guo, Jianzhong, Ni, Jiaqi, Li, Jiashi, Chen, Jin, Yuan, Jingyang, Qiu, Junjie, Song, Junxiao, Dong, Kai, Gao, Kaige, Guan, Kang, Wang, Lean, Zhang, Lecong, Xu, Lei, Xia, Leyi, Zhao, Liang, Zhang, Liyue, Li, Meng, Wang, Miaojun, Zhang, Mingchuan, Zhang, Minghua, Tang, Minghui, Li, Mingming, Tian, Ning, Huang, Panpan, Wang, Peiyi, Zhang, Peng, Zhu, Qihao, Chen, Qinyu, Du, Qiushi, Chen, R. J., Jin, R. L., Ge, Ruiqi, Pan, Ruizhe, Xu, Runxin, Chen, Ruyi, Li, S. S., Lu, Shanghao, Zhou, Shangyan, Chen, Shanhuang, Wu, Shaoqing, Ye, Shengfeng, Ma, Shirong, Wang, Shiyu, Zhou, Shuang, Yu, Shuiping, Zhou, Shunfeng, Zheng, Size, Wang, T., Pei, Tian, Yuan, Tian, Sun, Tianyu, Xiao, W. L., Zeng, Wangding, An, Wei, Liu, Wen, Liang, Wenfeng, Gao, Wenjun, Zhang, Wentao, Li, X. Q., Jin, Xiangyue, Wang, Xianzu, Bi, Xiao, Liu, Xiaodong, Wang, Xiaohan, Shen, Xiaojin, Chen, Xiaokang, Chen, Xiaosha, Nie, Xiaotao, Sun, Xiaowen, Wang, Xiaoxiang, Liu, Xin, Xie, Xin, Yu, Xingkai, Song, Xinnan, Zhou, Xinyi, Yang, Xinyu, Lu, Xuan, Su, Xuecheng, Wu, Y., Li, Y. K., Wei, Y. X., Zhu, Y. X., Xu, Yanhong, Huang, Yanping, Li, Yao, Zhao, Yao, Sun, Yaofeng, Li, Yaohui, Wang, Yaohui, Zheng, Yi, Zhang, Yichao, Xiong, Yiliang, Zhao, Yilong, He, Ying, Tang, Ying, Piao, Yishi, Dong, Yixin, Tan, Yixuan, Liu, Yiyuan, Wang, Yongji, Guo, Yongqiang, Zhu, Yuchen, Wang, Yuduan, Zou, Yuheng, Zha, Yukun, Ma, Yunxian, Yan, Yuting, You, Yuxiang, Liu, Yuxuan, Ren, Z. Z., Ren, Zehui, Sha, Zhangli, Fu, Zhe, Huang, Zhen, Zhang, Zhen, Xie, Zhenda, Hao, Zhewen, Shao, Zhihong, Wen, Zhiniu, Xu, Zhipeng, Zhang, Zhongyu, Li, Zhuoshu, Wang, Zihan, Gu, Zihui, Li, Zilin, Xie, Ziwei

研究角色：主体论文（统一多模态模型）
任务标签：General Language Modeling、Long-Context Modeling、Efficient Autoregressive Generation

方法标签：Sparse Expert Computation、Attention Efficiency

中文简介：

DeepSeek-V2 接收文本前缀并自回归预测后续词元，同时兼顾长上下文生成的训练与推理成本。其核心是混合专家范式：DeepSeekMoE 让每个词元仅激活少量参数，Multi-head Latent Attention 则把注意力键值缓存压缩为潜在表示；模型经多源语料预训练，再进行监督微调和强化学习。相较稠密的 DeepSeek 67B，它转向稀疏扩容，并把经济训练与高效推理纳入主模型设计。

![DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model 原文图](assets/002-arxiv-2405-04434.png)

*原文图 3：论文方法流程图（图 3）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2405.04434v5/deepseekv2.png)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2405.04434)

##### DeepSeek-V3 Technical Report

作者：DeepSeek-AI, Liu, Aixin, Feng, Bei, Xue, Bing, Wang, Bingxuan, Wu, Bochao, Lu, Chengda, Zhao, Chenggang, Deng, Chengqi, Zhang, Chenyu, Ruan, Chong, Dai, Damai, Guo, Daya, Yang, Dejian, Chen, Deli, Ji, Dongjie, Li, Erhang, Lin, Fangyun, Dai, Fucong, Luo, Fuli, Hao, Guangbo, Chen, Guanting, Li, Guowei, Zhang, H., Bao, Han, Xu, Hanwei, Wang, Haocheng, Zhang, Haowei, Ding, Honghui, Xin, Huajian, Gao, Huazuo, Li, Hui, Qu, Hui, Cai, J. L., Liang, Jian, Guo, Jianzhong, Ni, Jiaqi, Li, Jiashi, Wang, Jiawei, Chen, Jin, Chen, Jingchang, Yuan, Jingyang, Qiu, Junjie, Li, Junlong, Song, Junxiao, Dong, Kai, Hu, Kai, Gao, Kaige, Guan, Kang, Huang, Kexin, Yu, Kuai, Wang, Lean, Zhang, Lecong, Xu, Lei, Xia, Leyi, Zhao, Liang, Wang, Litong, Zhang, Liyue, Li, Meng, Wang, Miaojun, Zhang, Mingchuan, Zhang, Minghua, Tang, Minghui, Li, Mingming, Tian, Ning, Huang, Panpan, Wang, Peiyi, Zhang, Peng, Wang, Qiancheng, Zhu, Qihao, Chen, Qinyu, Du, Qiushi, Chen, R. J., Jin, R. L., Ge, Ruiqi, Zhang, Ruisong, Pan, Ruizhe, Wang, Runji, Xu, Runxin, Zhang, Ruoyu, Chen, Ruyi, Li, S. S., Lu, Shanghao, Zhou, Shangyan, Chen, Shanhuang, Wu, Shaoqing, Ye, Shengfeng, Ye, Shengfeng, Ma, Shirong, Wang, Shiyu, Zhou, Shuang, Yu, Shuiping, Zhou, Shunfeng, Pan, Shuting, Wang, T., Yun, Tao, Pei, Tian, Sun, Tianyu, Xiao, W. L., Zeng, Wangding, Zhao, Wanjia, An, Wei, Liu, Wen, Liang, Wenfeng, Gao, Wenjun, Yu, Wenqin, Zhang, Wentao, Li, X. Q., Jin, Xiangyue, Wang, Xianzu, Bi, Xiao, Liu, Xiaodong, Wang, Xiaohan, Shen, Xiaojin, Chen, Xiaokang, Zhang, Xiaokang, Chen, Xiaosha, Nie, Xiaotao, Sun, Xiaowen, Wang, Xiaoxiang, Cheng, Xin, Liu, Xin, Xie, Xin, Liu, Xingchao, Yu, Xingkai, Song, Xinnan, Shan, Xinxia, Zhou, Xinyi, Yang, Xinyu, Li, Xinyuan, Su, Xuecheng, Lin, Xuheng, Li, Y. K., Wang, Y. Q., Wei, Y. X., Zhu, Y. X., Zhang, Yang, Xu, Yanhong, Xu, Yanhong, Huang, Yanping, Li, Yao, Zhao, Yao, Sun, Yaofeng, Li, Yaohui, Wang, Yaohui, Yu, Yi, Zheng, Yi, Zhang, Yichao, Shi, Yifan, Xiong, Yiliang, He, Ying, Tang, Ying, Piao, Yishi, Wang, Yisong, Tan, Yixuan, Ma, Yiyang, Liu, Yiyuan, Guo, Yongqiang, Wu, Yu, Ou, Yuan, Zhu, Yuchen, Wang, Yuduan, Gong, Yue, Zou, Yuheng, He, Yujia, Zha, Yukun, Xiong, Yunfan, Ma, Yunxian, Yan, Yuting, Luo, Yuxiang, You, Yuxiang, Liu, Yuxuan, Zhou, Yuyang, Wu, Z. F., Ren, Z. Z., Ren, Zehui, Sha, Zhangli, Fu, Zhe, Xu, Zhean, Huang, Zhen, Zhang, Zhen, Xie, Zhenda, Zhang, Zhengyan, Hao, Zhewen, Gou, Zhibin, Ma, Zhicheng, Yan, Zhigang, Shao, Zhihong, Xu, Zhipeng, Wu, Zhiyu, Zhang, Zhongyu, Li, Zhuoshu, Gu, Zihui, Zhu, Zijia, Liu, Zijun, Li, Zilin, Xie, Ziwei, Song, Ziyang, Gao, Ziyi, Pan, Zizheng

研究角色：主体论文（统一多模态模型）
任务标签：General Language Modeling、Instruction Following、Efficient Autoregressive Generation

方法标签：Sparse Expert Computation、Multi-Token Prediction、Attention Efficiency

中文简介：

DeepSeek-V3 面向通用文本续写：给定因果前缀，输出多个预测深度上的未来词元分布，并在部署时自回归生成文本。它延续 DeepSeekMoE 与 Multi-head Latent Attention，以稀疏专家控制激活计算和键值缓存，又引入无辅助损失的负载均衡策略及多词元预测目标，之后结合监督微调和强化学习。相较 V2，该模型保留高效主干，同时强化专家路由稳定性与训练信号密度。

![DeepSeek-V3 Technical Report 原文图](assets/003-arxiv-2412-19437.png)

*原文图 2：论文方法流程图（图 2）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2412.19437v2/basic_arch.png)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2412.19437)

##### 2026

##### DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence

作者：DeepSeek-AI, Xu, Anyi, Lin, Bangcai, Xue, Bing, Wang, Bingxuan, Xu, Bingzheng, Wu, Bochao, Zhang, Bowei, Lin, Chaofan, Dong, Chen, Ling, Chenchen, Lu, Chengda, Zhao, Chenggang, Deng, Chengqi, Hou, Chengyu, Xu, Chenhao, Shao, Chenze, Ruan, Chong, Sun, Conner, Dai, Damai, Guo, Daya, Yang, Dejian, Chen, Deli, Li, Donghao, Ji, Dongjie, Li, Erhang, Wei, Fang, Lin, Fangyun, Yuan, Fangzhou, Xia, Feiyu, Dai, Fucong, Hao, Guangbo, Chen, Guanting, Cao, Guoai, Meng, Guolai, Li, Guowei, Yu, Han, Zhang, Han, Xu, Hanwei, Li, Hao, Liang, Haofen, Zhang, Haoling, Luo, Haoming, Wei, Haoran, Yuan, Haotian, Zhang, Haowei, Luo, Haowen, Chen, Haoyu, Ji, Haozhe, Zhang, Hengqing, Ding, Honghui, Tang, Hongxuan, Cao, Huanqi, Gao, Huazuo, Qu, Hui, Zeng, Hui, Yang, J, Zhu, JQ, Luo, Jia, Song, Jia, Yu, Jia, Huang, Jialiang, Cai, Jialu, Liang, Jian, Zhou, Jiangting, Ye, Jiasheng, Li, Jiashi, Xu, Jiaxin, Hu, Jiewen, Yang, Jieyu, Chen, Jin, Yan, Jin, Chen, Jingchang, Zhou, Jingli, Xiang, Jingting, Yuan, Jingyang, Cheng, Jingyuan, Zhou, Jingzi, Zhu, Jinhua, Yu, Jiping, Sun, Joseph, Ran, Jun, Jiang, Junguang, Qiu, Junjie, Li, Junlong, Zheng, Junmin, Song, Junxiao, Dong, Kai, Gao, Kaige, Guan, Kang, Zhou, Kexing, Huang, Kezhao, Yu, Kuai, Wang, Lean, Zhang, Lecong, Wang, Lei, Xia, Leyi, Zhang, Li, Zhao, Liang, Guo, Lihua, Luo, Lingxiao, Ma, Linwang, Zhu, Linyan, Wang, Litong, Cai, Liyu, Zhang, Liyue, Chen, Longhao, Di, MS, Xu, MY, Mei, Max, Wang, Miaojun, Zhang, Mingchuan, Zhang, Minghua, Tang, Minghui, Li, Mingming, Zhou, Mingxu, Han, Minmin, Wang, Ning, Huang, Panpan, Wang, Panpan, Cong, Peixin, Wang, Peiyi, Zhang, Peng, Wang, Qiancheng, Zhu, Qihao, Li, Qingyang, Chen, Qinyu, Du, Qiushi, Jiang, Qiwei, Tian, Rui, Xu, Ruifan, Lu, Ruijie, Xu, Ruiling, Ge, Ruiqi, Zhang, Ruisong, Pan, Ruizhe, Wang, Runji, Chen, Runqian, Yin, Runqiu, Xu, Runxin, Shen, Ruomeng, Zhang, Ruoyu, Chen, Ruyi, Liu, SH, Lu, Shanghao, Sun, Shangmian, Zhou, Shangyan, Chen, Shanhuang, Cai, Shaofei, Nie, Shaoheng, Wu, Shaoqing, Chen, Shaoyuan, Hu, Shengding, Liu, Shengyu, Hu, Shiqiang, Ma, Shirong, Wang, Shiyu, Yu, Shuiping, Zhou, Shunfeng, Pan, Shuting, Yu, Shuying, Zhou, Songyang, Ni, Tao, Yun, Tao, Jin, Tian, Pei, Tian, Ye, Tian, Lin, Tianle, Ji, Tianran, Cui, Tianyi, Yue, Tianyuan, Yu, Tingting, Wang, Tun, Zhang, W, Xiao, WL, Zeng, Wangding, An, Wei, Zhao, Weilin, Liu, Wen, Liang, Wenfeng, Pang, Wenjie, Luo, Wenjing, Yao, Wenjing, Gao, Wenjun, Yang, Wenkai, Huang, Wenlve, Hou, Wenqing, Zhang, Wentao, Ma, Wenting, Gao, Xi, He, Xiang, Wang, Xiangwen, Wang, Xianzu, Bi, Xiao, Liu, Xiaodong, Wang, Xiaohan, Chen, Xiaokang, Zhang, Xiaokang, Nie, Xiaotao, Sun, Xiaowen, Wang, Xiaoxiang, Cheng, Xin, Liu, Xin, Xie, Xin, Liu, Xingchao, Liu, Xingchen, Yu, Xingkai, Li, Xingyou, Yang, Xinyu, Zhang, Xinyu, Chen, Xu, Wang, Xuanyu, Su, Xuecheng, Chen, Xueyin, Lin, Xuheng, Fu, Xuwei, Yan, YC, Wang, YQ, Ma, YW, Luo, Yanfeng, Zhang, Yang, Xu, Yanhong, Ma, Yanru, Huang, Yanwen, Li, Yao, Li, Yao, Xu, Yao, Zhao, Yao, Sun, Yaofeng, Wang, Yaohui, Qian, Yi, Shao, Yi, Yu, Yi, Zhang, Yichao, Ding, Yifan, Shi, Yifan, Wu, Yijia, Xiong, Yiliang, Ma, Yiling, He, Ying, Tang, Ying, Zhou, Ying, Luo, Yingjia, Zhong, Yinmin, Piao, Yishi, Wang, Yisong, Zhang, Yixiang, Chen, Yixiao, Tan, Yixuan, Wei, Yixuan, Ma, Yiyang, Liu, Yiyuan, Yang, Yonglun, Guo, Yongqiang, Wu, Yongtong, Wu, Yu, Li, YuKun, Cheng, Yuan, Ou, Yuan, Xu, Yuanfan, Li, Yuanhao, Wang, Yuduan, Yang, Yuehan, Xu, Yuer, Wu, Yuhan, Meng, Yuhao, Zou, Yuheng, Zha, Yukun, Xiong, Yunfan, Chen, Yupeng, Lin, Yuping, Cao, Yuqian, Wang, Yuqian, Zhang, Yushun, Yan, Yuting, Lin, Yutong, Gu, Yuxian, Luo, Yuxiang, You, Yuxiang, Liu, Yuxuan, Zhou, Yuxuan, Zhou, Yuyang, Huang, Yuzhen, Wu, ZF, Wang, Zehao, Zhao, Zehua, Ren, Zehui, Zhang, Zekai, Sha, Zhangli, Fu, Zhe, Ju, Zhe, Xu, Zhean, Xie, Zhenda, Zhang, Zhengyan, Gao, Zheren, Hao, Zhewen, Gou, Zhibin, Ma, Zhicheng, Yan, Zhigang, Shao, Zhihong, Huang, Zhixian, Chen, Zhixuan, Wu, Zhiyu, Ren, Zhizhou, Wu, Zhongyu, Li, Zhuoshu, Zhang, Zhuping, Xu, Zian, Wang, Zihao, Qu, Zihua, Gu, Zihui, Zhu, Zijia, Li, Zilin, Zhang, Zipeng, Xie, Ziwei, Gao, Ziyi, Wan, Ziyi, Pan, Zizheng, Yao, Zongqing

研究角色：主体论文（统一多模态模型）
任务标签：General Language Modeling、Long-Context Modeling、Efficient Autoregressive Generation

方法标签：Sparse Expert Computation、Attention Efficiency

中文简介：

DeepSeek-V4 系列处理最高百万词元的文本前缀，输出依赖远距离信息的预测或生成结果，面向长程任务与测试时扩展。其混合专家主干结合 Compressed Sparse Attention 与 Heavily Compressed Attention，以混合注意力降低长序列计算和缓存开销；同时采用 mHC 改进残差连接，并用 Muon 优化训练。相较 V3.2，它把稀疏访问进一步推进到百万级上下文，并提供 Pro 与 Flash 两种容量配置。

![DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence 原文图](assets/005-arxiv-2606-19348.svg)

*原文图 2：论文方法流程图（图 2）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2606.19348v1/basic_arch.svg)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2606.19348)

##### DeepSeek-V4.1-Flash: Pushing the Limits of KV Cache Compression

作者：DeepSeek-AI, :, Xu, Anyi, Li, B., Lin, Bangcai, Xue, Bing, Xian, BingCheng, Xu, Bingzheng, Wu, Bochao, Zhang, Bowei, Deng, Boyi, Yu, C. C., Jin, Chao, Lin, Chaofan, Dong, Chen, Wang, Chenbing, Feng, Chenfan, Lu, Chengda, Zhao, Chenggang, Deng, Chengqi, Zhang, Chengyuan, Xu, Chenhao, Zhao, Chenqi, Shao, Chenze, Wang, Chuhao, Zhang, Chuqi, Dai, Damai, Yang, Dejian, Chen, Deli, Huang, Di, Wu, Di, Li, Donghao, Li, Erhang, Fu, Eric, Zhou, F., Zhou, Fangwei, Lin, Fangyun, Yuan, Fangzhou, Xia, Feiyu, Dai, Fucong, Hao, Guangbo, Li, Guanglin, Chen, Guanting, Cao, Guoai, Fan, Guofan, Meng, Guolai, Li, Guowei, Zhang, Haichuan, Ma, Haiyang, Shen, Haiyang, Li, Han, Yu, Han, Zhang, Han, Deng, Hangyuan, Xu, Hanwei, Xu, Hanxiang, Zhong, Hanxun, Guo, Hao, Jiang, Hao, Li, Hao, Qin, Hao, Wen, Haodong, Liang, Haofen, Huang, Haofeng, Liu, Haohua, Zhang, Haoling, Luo, Haoming, Yang, Haoran, Xu, Haotian, Yuan, Haotian, Huang, Haoting, Luo, Haowen, Cai, Haoyang, Chen, Haoyu, Ji, Haozhe, Zhang, Hengran, Wang, Hengrui, Wu, Hengxu, Ding, Honghui, Tang, Hongxuan, Wang, Huadong, Cao, Huanqi, Gao, Huazuo, Qu, Hui, Zeng, Hui, Yang, J., Jin, J. H., Zhang, J. H., Zou, J. X., Yu, Jia, Zhou, Jiahui, Chen, Jiajun, Huang, Jialiang, Zhao, Jialin, Tang, Jiamin, Zhou, Jian, Tong, Jianan, Li, Jianwen, Zhu, Jiaqi, Wang, Jiarui, Ye, Jiasheng, Li, Jiashi, Xu, Jiaxin, Ding, Jiaying, Lu, Jibai, Hu, Jiewen, Yan, Jin, Zhai, Jincheng, Chen, Jingchang, Hu, Jingcheng, Zhou, Jingli, Xu, Jingsheng, Xiang, Jingting, Yun, Jingyan, Yuan, Jingyang, Cheng, Jingyuan, Zhu, Jinhua, Wang, Jinpeng, Chen, Jinyi, Hu, Jinyi, Yu, Jiping, Guo, Jueliang, Pei, Junbo, Sun, Junbo, Jiang, Junguang, Qiu, Junjie, Zhou, Junkang, Liu, Junqi, Li, Junren, Li, Junxian, Song, Junxiao, Guo, Junyi, Dong, Kai, Chen, Kaifeng, Gao, Kaige, Guan, Kang, Yuan, Kangdong, Hong, Ke, Xu, Ke, Zhao, Kefan, Ji, Kexin, Zhang, Kexin, Zhou, Kexing, Yu, Kuai, Zhang, Lan, Wang, Lean, Zhang, Lecong, Wang, Lei, Gao, Letian, Zhao, Liang, Xu, Liansheng, Guo, Lihua, Luo, Lingxiao, Fu, Lingyue, Deng, Litao, Wang, Litong, Zhang, Liyue, Chen, Longhao, Chen, Lu, Huang, Luotian, Ma, Luyao, Wang, Luyao, Di, M. S., Mei, Max, Ye, Menghao, Cui, Miao, Zhang, Mingchuan, Zhang, Minghua, Tang, Minghui, Zhang, Mingjing, Wei, Mingqi, Chen, Mingshu, Liu, Mingxing, Zhou, Mingxu, Xu, Mingyu, Yang, Mingyu, Wang, Mingze, Chen, Muyang, Shentu, Ni, Wang, Ning, Ning, Niufang, Huang, Panpan, Cong, Peixin, Wang, Peiyi, Xin, Peiyuan, Ren, Pengfei, Yan, Pengfei, Zhang, Pengle, Kang, Qi, Tang, Qi, Wang, Qiancheng, Li, Qiang, Zhu, Qihao, Li, Qingyang, Chen, Qinyu, Du, Qiushi, Guo, Qizhou, Xu, Rongxian, Ding, Rui, Hu, Rui, Tian, Rui, Yu, Rui, Zhu, Ruidong, Xu, Ruifan, Yang, Ruihan, Xia, Ruihang, Lu, Ruijie, Geng, Ruilin, Hong, Ruipeng, Ge, Ruiqi, Zhang, Ruisong, Sun, Ruize, Pan, Ruizhe, Wang, Runji, Chen, Runqian, Xu, Runxin, Tian, Ruohong, Shen, Ruomeng, Zhang, Ruoyu, X., Ryan, Liu, S. H., Lu, Shanghao, Zhou, Shangyan, Chen, Shanhuang, Cai, Shaofei, Nie, Shaoheng, Chen, Shaoyuan, Hu, Shengding, Lin, Shengkai, Ran, Shengwen, Liu, Shengyu, Jia, Shengyuan, Bai, Shi, Feng, Shi, Xu, Shicheng, Liu, Shichun, Hu, Shiqiang, Ma, Shirong, Wang, Shiyu, Feng, Shiyuan, Gong, Shufan, Lin, Shuhan, Yu, Shuiping, Zhou, Shunfeng, Yang, Shuo, Wang, Shuomeng, Guo, Shuting, Pan, Shuting, Yu, Shuying, Cao, Sinuo, Lin, Siyi, Chen, Sizhe, Chen, Songyang, Zhou, Songyang, Ni, Tao, Yun, Tao, Jin, Tian, Pei, Tian, Ye, Tian, Lin, Tianle, Ji, Tianran, Cui, Tianyi, Yue, Tianyuan, Yu, Tingting, Xiong, Tongrui, Zeng, Wangding, Liu, Wei, Zhang, Wei, Xu, Weibin, Zeng, Weihao, Zhao, Weilin, Liu, Wen, Liang, Wenfeng, Pang, Wenjie, Luo, Wenjing, Yao, Wenjing, Gao, Wenjun, Shao, Wenkai, Yang, Wenkai, Zhang, Wenli, Wang, Wenlu, Huang, Wenlve, Yan, Wenqian, Zhang, Wentao, Gao, Xi, He, Xiang, Li, Xiang, Li, Xiangli, Wang, Xiangwen, Zhang, Xiangying, Wei, Xiankui, Bi, Xiao, Liu, Xiaodong, Wang, Xiaohan, Qu, Xiaojian, Chen, Xiaokang, Zhang, Xiaokang, Nie, Xiaotao, Zou, Xiaoyao, Li, Xiaoyuan, Guo, Xicheng, Chu, Xieting, Cheng, Xin, Liu, Xin, Xie, Xin, Xu, Xinbo, Liu, Xingchao, Liu, Xingchen, Yu, Xingkai, Li, Xingyou, Yao, Xintong, Chen, Xinyang, Jiang, Xinyong, Yang, Xinyu, Yang, Xinyu, Chen, Xu, Wang, Xuanyu, Zhong, Xubei, Su, Xuecheng, Liu, Xuejie, Lin, Xuheng, Fan, Xujie, Zhao, Xuncheng, Fu, Xuwei, Yan, Y. C., Jiang, Y. H., Wu, Y. T., M., Y. W., Wang, Y. Z., Gao, Yafei, Yang, Yang, Zhang, Yang, Ma, Yanru, Huang, Yanwen, Li, Yao, Li, Yao, Meng, Yao, Zhao, Yao, Sun, Yaofeng, Wang, Yaohui, Ye, Yaoyang, Yin, Yehang, Wu, Yexinrui, Qian, Yi, Tao, Yi, Yu, Yi, Zhang, Yichao, Jiang, Yichen, Wang, Yicheng, Ding, Yifan, Shi, Yifan, Peng, Yifeng, Zhai, Yifeng, Wu, Yijia, Xiong, Yiliang, Wang, Yilun, He, Ying, Zhou, Ying, Luo, Yingjia, Zhong, Yinmin, Wang, Yiping, Wang, Yisong, Zhang, Yixiang, Chen, Yixiao, Tan, Yixuan, Wei, Yixuan, Ma, Yiyang, Yang, Yiyao, Liu, Yiyuan, Cai, Yizai, Wei, Yizhen, Wang, Yizhi, Yang, Yonglun, Zhuo, Yongqi, Guo, Yongqiang, Wu, Yongtong, Wu, Yu, Zhang, Yu, Bian, Yuan, Cheng, Yuan, Ou, Yuan, Sun, Yuan, Xu, Yuanfan, Sun, Yuanhang, Li, Yuanhao, Liu, Yuchen, Yao, Yuchen, Han, Yudong, Wang, Yuduan, Wu, Yuhan, Meng, Yuhao, Zou, Yuheng, Li, YuKun, Wang, Yunchuan, Xiao, Yunfan, Xiong, Yunfan, Chen, Yupeng, Cao, Yuqian, Wang, Yuqian, Chen, Yuqing, Zhang, Yushun, Lin, Yutong, Xiao, Yuwei, Gu, Yuxian, Chen, Yuxiang, Huang, Yuxiang, Luo, Yuxiang, You, Yuxiang, Chen, Yuxin, Xiang, Yuxin, Liu, Yuxuan, Zhou, Yuxuan, Zhou, Yuyang, Guo, Yuzhe, Huang, Yuzhen, Bai, Yuzhuo, Z., Z. Y., Ni, Zanlin, Wang, Zehao, Zhao, Zehua, Ren, Zehui, Zhao, Zejun, Sha, Zhangli, Wang, Zhanying, Zhang, Zhaochen, Du, Zhaoshuai, Fu, Zhe, Xu, Zhean, Xie, Zhenda, Liu, Zheng, Zhang, Zhengyan, Dong, Zhenhua, Hao, Zhewen, Wang, Zhibang, Gou, Zhibin, Ma, Zhicheng, Li, Zhihao, Shao, Zhihong, Huang, Zhihuan, Li, Zhijie, Lu, Zhirui, Huang, Zhixian, Chen, Zhixuan, Chen, Zhixuan, Pan, Zhixuan, Wu, Zhiyu, Ren, Zhizhou, He, Zhu, Li, Zhuoshu, Zhang, Zhuping, Xu, Zian, Wang, Zihao, Gu, Zihui, Zhu, Zijia, Zhang, Zili, Li, Zilin, Hou, Zilong, Lyu, Zilong, Wang, Ziqiao, Xie, Ziwei, Zhang, Ziya, Gao, Ziyi, Pan, Zizheng, Li, Zonglin, Yao, Zongqing, Chen, Zui, Wu, Zuofan, Ling, Chenchen, Hou, Chengyu, Chen, Chong, Li, D., Qi, Di, Ji, Dongjie, Wei, Fang, Xia, Fanyi, Xie, Fei, Tan, Feiyi, Guo, Hailong, Zhai, Haiyan, Zhou, Hui, Tan, Huihui, Li, Huijie, Luo, Jia, Song, Jia, Cai, Jialu, Liang, Jian, Zhou, Jiangting, Gao, Jiaqi, Shao, Jiayi, Chen, Jie, Yang, Jieyu, Chen, Jin, Zhang, Jingde, Zhou, Jingzi, Wang, Jinqian, Liu, Jinyang, Sun, JinZhao, Ling, Junhua, Zheng, Junmin, Yang, Kaicheng, Xu, Ke, Su, Le, Xia, Leyi, Ding, Liangfeng, Zhuo, Lin, Ma, Linwang, Zhu, Linyan, Cai, Liyu, Yao, Luqi, Zhang, M. K., Li, Meng, Lin, Miao, Wang, Miaojun, Zhang, Min, Li, Mingming, Wang, Mingming, Yin, Mingze, Han, Minmin, Cao, Nan, Wang, Ning, Ma, Ningxin, Wang, Panpan, Lin, Peihan, Sun, Peng, Zhang, Peng, Ying, Qian, Xiang, Qiang, Wang, Qiao, Mao, Qingmiao, Jiang, Qiwei, Jin, Rongli, Chen, Ruyi, Tao, Sha, Sun, Shangmian, Wu, Shaoqing, Zou, Shichao, Lei, Si, Zhang, Tianyang, Sun, Tianyu, Yin, Tingting, Xiao, W. L., An, Wei, Li, Wei, Wang, Wei, Lin, Weiwei, Hou, Wenqing, Lin, X., Meng, Xiangfei, Huang, Xianzhu, Peng, Xiao, Li, Xiaoqian, Zhang, Xiaoting, Sun, Xiaowen, Wang, Xiaoxiang, Ye, Xiaoyu, Zhang, Xinrou, Zhang, Xinyu, Cao, Xue, Chen, Xueyin, Zhou, Yanan, Xu, Yanhong, Xia, Yao, Xu, Yao, Shao, Yi, Zhang, Yihong, Ma, Yiling, Tang, Ying, Lou, Yining, Chen, Yiru, Piao, Yishi, Chen, Yixuan, Xiong, Yong, Xuan, Yuchen, Yang, Yuehan, Xu, Yuer, Zha, Yukun, Ma, Yunxian, Lin, Yuping, Yan, Yuting, Xie, Yutong, Sheng, Yuwen, Zhu, Yuxuan, Zhang, Zekai, Ju, Zhe, Lin, Zhenzhen, Gao, Zheren, Sun, Zheyang, Yan, Zhigang, Wu, Zhongyu, Wang, Zi, Qu, Zihua, Yan, Ziling, Wan, Ziyi

研究角色：主体论文（统一多模态模型）
任务标签：Long-Context Modeling、Efficient Autoregressive Generation

方法标签：Sparse Expert Computation、Attention Efficiency

中文简介：

DeepSeek-V4.1-Flash 面向输入占比高的长程代理生成：输入可达百万词元的多模态上下文及已有生成前缀，输出后续词元，同时重点压低预填充计算和键值缓存成本。其 Causal Encoder-Decoder 在预填充时激活更少参数，CSA2 跨层复用键值缓存，并以 FP4 存储；SWA Bounded Replay 进一步缩减持久缓存。相较 V4-Flash，它把优化重心从一般长上下文效率推进到预填充、显存及外存占用的协同压缩。

![DeepSeek-V4.1-Flash: Pushing the Limits of KV Cache Compression 原文图](assets/006-arxiv-2609-19969.svg)

*原文图 3：论文方法流程图（图 3）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2609.19969v1/arch_full.svg)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2609.19969)

#### 任务标签：通用语言建模（General Language Modeling）

##### 2024

##### DeepSeek LLM: Scaling Open-Source Language Models with Longtermism

作者：DeepSeek-AI, :, Bi, Xiao, Chen, Deli, Chen, Guanting, Chen, Shanhuang, Dai, Damai, Deng, Chengqi, Ding, Honghui, Dong, Kai, Du, Qiushi, Fu, Zhe, Gao, Huazuo, Gao, Kaige, Gao, Wenjun, Ge, Ruiqi, Guan, Kang, Guo, Daya, Guo, Jianzhong, Hao, Guangbo, Hao, Zhewen, He, Ying, Hu, Wenjie, Huang, Panpan, Li, Erhang, Li, Guowei, Li, Jiashi, Li, Yao, Li, Y. K., Liang, Wenfeng, Lin, Fangyun, Liu, A. X., Liu, Bo, Liu, Wen, Liu, Xiaodong, Liu, Xin, Liu, Yiyuan, Lu, Haoyu, Lu, Shanghao, Luo, Fuli, Ma, Shirong, Nie, Xiaotao, Pei, Tian, Piao, Yishi, Qiu, Junjie, Qu, Hui, Ren, Tongzheng, Ren, Zehui, Ruan, Chong, Sha, Zhangli, Shao, Zhihong, Song, Junxiao, Su, Xuecheng, Sun, Jingxiang, Sun, Yaofeng, Tang, Minghui, Wang, Bingxuan, Wang, Peiyi, Wang, Shiyu, Wang, Yaohui, Wang, Yongji, Wu, Tong, Wu, Y., Xie, Xin, Xie, Zhenda, Xie, Ziwei, Xiong, Yiliang, Xu, Hanwei, Xu, R. X., Xu, Yanhong, Yang, Dejian, You, Yuxiang, Yu, Shuiping, Yu, Xingkai, Zhang, B., Zhang, Haowei, Zhang, Lecong, Zhang, Liyue, Zhang, Mingchuan, Zhang, Minghua, Zhang, Wentao, Zhang, Yichao, Zhao, Chenggang, Zhao, Yao, Zhou, Shangyan, Zhou, Shunfeng, Zhu, Qihao, Zou, Yuheng

研究角色：主体论文（统一多模态模型）
任务标签：General Language Modeling、Instruction Following

中文简介：

该工作面向通用语言建模：输入词元化文本前缀，输出下一词元分布，并可连续生成文本。作者先研究适用于开源模型配置的规模定律，再据此训练 DeepSeek LLM 7B 与 67B，并以持续扩展的语料完成预训练；随后通过监督微调和直接偏好优化构建对话版本。它是 DeepSeek 通用主模型路线的起点，重点在于以规模规律指导模型与数据扩展。

![DeepSeek LLM: Scaling Open-Source Language Models with Longtermism 原文图](assets/001-arxiv-2401-02954.png)

*原文图 1：论文方法流程图（图 1）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2401.02954v1/figures/loss_step_cosine.png)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2401.02954)

##### DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model

作者：DeepSeek-AI, Liu, Aixin, Feng, Bei, Wang, Bin, Wang, Bingxuan, Liu, Bo, Zhao, Chenggang, Dengr, Chengqi, Ruan, Chong, Dai, Damai, Guo, Daya, Yang, Dejian, Chen, Deli, Ji, Dongjie, Li, Erhang, Lin, Fangyun, Luo, Fuli, Hao, Guangbo, Chen, Guanting, Li, Guowei, Zhang, H., Xu, Hanwei, Yang, Hao, Zhang, Haowei, Ding, Honghui, Xin, Huajian, Gao, Huazuo, Li, Hui, Qu, Hui, Cai, J. L., Liang, Jian, Guo, Jianzhong, Ni, Jiaqi, Li, Jiashi, Chen, Jin, Yuan, Jingyang, Qiu, Junjie, Song, Junxiao, Dong, Kai, Gao, Kaige, Guan, Kang, Wang, Lean, Zhang, Lecong, Xu, Lei, Xia, Leyi, Zhao, Liang, Zhang, Liyue, Li, Meng, Wang, Miaojun, Zhang, Mingchuan, Zhang, Minghua, Tang, Minghui, Li, Mingming, Tian, Ning, Huang, Panpan, Wang, Peiyi, Zhang, Peng, Zhu, Qihao, Chen, Qinyu, Du, Qiushi, Chen, R. J., Jin, R. L., Ge, Ruiqi, Pan, Ruizhe, Xu, Runxin, Chen, Ruyi, Li, S. S., Lu, Shanghao, Zhou, Shangyan, Chen, Shanhuang, Wu, Shaoqing, Ye, Shengfeng, Ma, Shirong, Wang, Shiyu, Zhou, Shuang, Yu, Shuiping, Zhou, Shunfeng, Zheng, Size, Wang, T., Pei, Tian, Yuan, Tian, Sun, Tianyu, Xiao, W. L., Zeng, Wangding, An, Wei, Liu, Wen, Liang, Wenfeng, Gao, Wenjun, Zhang, Wentao, Li, X. Q., Jin, Xiangyue, Wang, Xianzu, Bi, Xiao, Liu, Xiaodong, Wang, Xiaohan, Shen, Xiaojin, Chen, Xiaokang, Chen, Xiaosha, Nie, Xiaotao, Sun, Xiaowen, Wang, Xiaoxiang, Liu, Xin, Xie, Xin, Yu, Xingkai, Song, Xinnan, Zhou, Xinyi, Yang, Xinyu, Lu, Xuan, Su, Xuecheng, Wu, Y., Li, Y. K., Wei, Y. X., Zhu, Y. X., Xu, Yanhong, Huang, Yanping, Li, Yao, Zhao, Yao, Sun, Yaofeng, Li, Yaohui, Wang, Yaohui, Zheng, Yi, Zhang, Yichao, Xiong, Yiliang, Zhao, Yilong, He, Ying, Tang, Ying, Piao, Yishi, Dong, Yixin, Tan, Yixuan, Liu, Yiyuan, Wang, Yongji, Guo, Yongqiang, Zhu, Yuchen, Wang, Yuduan, Zou, Yuheng, Zha, Yukun, Ma, Yunxian, Yan, Yuting, You, Yuxiang, Liu, Yuxuan, Ren, Z. Z., Ren, Zehui, Sha, Zhangli, Fu, Zhe, Huang, Zhen, Zhang, Zhen, Xie, Zhenda, Hao, Zhewen, Shao, Zhihong, Wen, Zhiniu, Xu, Zhipeng, Zhang, Zhongyu, Li, Zhuoshu, Wang, Zihan, Gu, Zihui, Li, Zilin, Xie, Ziwei

研究角色：主体论文（统一多模态模型）
任务标签：General Language Modeling、Long-Context Modeling、Efficient Autoregressive Generation

方法标签：Sparse Expert Computation、Attention Efficiency

中文简介：

DeepSeek-V2 接收文本前缀并自回归预测后续词元，同时兼顾长上下文生成的训练与推理成本。其核心是混合专家范式：DeepSeekMoE 让每个词元仅激活少量参数，Multi-head Latent Attention 则把注意力键值缓存压缩为潜在表示；模型经多源语料预训练，再进行监督微调和强化学习。相较稠密的 DeepSeek 67B，它转向稀疏扩容，并把经济训练与高效推理纳入主模型设计。

![DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model 原文图](assets/002-arxiv-2405-04434.png)

*原文图 3：论文方法流程图（图 3）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2405.04434v5/deepseekv2.png)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2405.04434)

##### DeepSeek-V3 Technical Report

作者：DeepSeek-AI, Liu, Aixin, Feng, Bei, Xue, Bing, Wang, Bingxuan, Wu, Bochao, Lu, Chengda, Zhao, Chenggang, Deng, Chengqi, Zhang, Chenyu, Ruan, Chong, Dai, Damai, Guo, Daya, Yang, Dejian, Chen, Deli, Ji, Dongjie, Li, Erhang, Lin, Fangyun, Dai, Fucong, Luo, Fuli, Hao, Guangbo, Chen, Guanting, Li, Guowei, Zhang, H., Bao, Han, Xu, Hanwei, Wang, Haocheng, Zhang, Haowei, Ding, Honghui, Xin, Huajian, Gao, Huazuo, Li, Hui, Qu, Hui, Cai, J. L., Liang, Jian, Guo, Jianzhong, Ni, Jiaqi, Li, Jiashi, Wang, Jiawei, Chen, Jin, Chen, Jingchang, Yuan, Jingyang, Qiu, Junjie, Li, Junlong, Song, Junxiao, Dong, Kai, Hu, Kai, Gao, Kaige, Guan, Kang, Huang, Kexin, Yu, Kuai, Wang, Lean, Zhang, Lecong, Xu, Lei, Xia, Leyi, Zhao, Liang, Wang, Litong, Zhang, Liyue, Li, Meng, Wang, Miaojun, Zhang, Mingchuan, Zhang, Minghua, Tang, Minghui, Li, Mingming, Tian, Ning, Huang, Panpan, Wang, Peiyi, Zhang, Peng, Wang, Qiancheng, Zhu, Qihao, Chen, Qinyu, Du, Qiushi, Chen, R. J., Jin, R. L., Ge, Ruiqi, Zhang, Ruisong, Pan, Ruizhe, Wang, Runji, Xu, Runxin, Zhang, Ruoyu, Chen, Ruyi, Li, S. S., Lu, Shanghao, Zhou, Shangyan, Chen, Shanhuang, Wu, Shaoqing, Ye, Shengfeng, Ye, Shengfeng, Ma, Shirong, Wang, Shiyu, Zhou, Shuang, Yu, Shuiping, Zhou, Shunfeng, Pan, Shuting, Wang, T., Yun, Tao, Pei, Tian, Sun, Tianyu, Xiao, W. L., Zeng, Wangding, Zhao, Wanjia, An, Wei, Liu, Wen, Liang, Wenfeng, Gao, Wenjun, Yu, Wenqin, Zhang, Wentao, Li, X. Q., Jin, Xiangyue, Wang, Xianzu, Bi, Xiao, Liu, Xiaodong, Wang, Xiaohan, Shen, Xiaojin, Chen, Xiaokang, Zhang, Xiaokang, Chen, Xiaosha, Nie, Xiaotao, Sun, Xiaowen, Wang, Xiaoxiang, Cheng, Xin, Liu, Xin, Xie, Xin, Liu, Xingchao, Yu, Xingkai, Song, Xinnan, Shan, Xinxia, Zhou, Xinyi, Yang, Xinyu, Li, Xinyuan, Su, Xuecheng, Lin, Xuheng, Li, Y. K., Wang, Y. Q., Wei, Y. X., Zhu, Y. X., Zhang, Yang, Xu, Yanhong, Xu, Yanhong, Huang, Yanping, Li, Yao, Zhao, Yao, Sun, Yaofeng, Li, Yaohui, Wang, Yaohui, Yu, Yi, Zheng, Yi, Zhang, Yichao, Shi, Yifan, Xiong, Yiliang, He, Ying, Tang, Ying, Piao, Yishi, Wang, Yisong, Tan, Yixuan, Ma, Yiyang, Liu, Yiyuan, Guo, Yongqiang, Wu, Yu, Ou, Yuan, Zhu, Yuchen, Wang, Yuduan, Gong, Yue, Zou, Yuheng, He, Yujia, Zha, Yukun, Xiong, Yunfan, Ma, Yunxian, Yan, Yuting, Luo, Yuxiang, You, Yuxiang, Liu, Yuxuan, Zhou, Yuyang, Wu, Z. F., Ren, Z. Z., Ren, Zehui, Sha, Zhangli, Fu, Zhe, Xu, Zhean, Huang, Zhen, Zhang, Zhen, Xie, Zhenda, Zhang, Zhengyan, Hao, Zhewen, Gou, Zhibin, Ma, Zhicheng, Yan, Zhigang, Shao, Zhihong, Xu, Zhipeng, Wu, Zhiyu, Zhang, Zhongyu, Li, Zhuoshu, Gu, Zihui, Zhu, Zijia, Liu, Zijun, Li, Zilin, Xie, Ziwei, Song, Ziyang, Gao, Ziyi, Pan, Zizheng

研究角色：主体论文（统一多模态模型）
任务标签：General Language Modeling、Instruction Following、Efficient Autoregressive Generation

方法标签：Sparse Expert Computation、Multi-Token Prediction、Attention Efficiency

中文简介：

DeepSeek-V3 面向通用文本续写：给定因果前缀，输出多个预测深度上的未来词元分布，并在部署时自回归生成文本。它延续 DeepSeekMoE 与 Multi-head Latent Attention，以稀疏专家控制激活计算和键值缓存，又引入无辅助损失的负载均衡策略及多词元预测目标，之后结合监督微调和强化学习。相较 V2，该模型保留高效主干，同时强化专家路由稳定性与训练信号密度。

![DeepSeek-V3 Technical Report 原文图](assets/003-arxiv-2412-19437.png)

*原文图 2：论文方法流程图（图 2）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2412.19437v2/basic_arch.png)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2412.19437)

##### 2026

##### DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence

作者：DeepSeek-AI, Xu, Anyi, Lin, Bangcai, Xue, Bing, Wang, Bingxuan, Xu, Bingzheng, Wu, Bochao, Zhang, Bowei, Lin, Chaofan, Dong, Chen, Ling, Chenchen, Lu, Chengda, Zhao, Chenggang, Deng, Chengqi, Hou, Chengyu, Xu, Chenhao, Shao, Chenze, Ruan, Chong, Sun, Conner, Dai, Damai, Guo, Daya, Yang, Dejian, Chen, Deli, Li, Donghao, Ji, Dongjie, Li, Erhang, Wei, Fang, Lin, Fangyun, Yuan, Fangzhou, Xia, Feiyu, Dai, Fucong, Hao, Guangbo, Chen, Guanting, Cao, Guoai, Meng, Guolai, Li, Guowei, Yu, Han, Zhang, Han, Xu, Hanwei, Li, Hao, Liang, Haofen, Zhang, Haoling, Luo, Haoming, Wei, Haoran, Yuan, Haotian, Zhang, Haowei, Luo, Haowen, Chen, Haoyu, Ji, Haozhe, Zhang, Hengqing, Ding, Honghui, Tang, Hongxuan, Cao, Huanqi, Gao, Huazuo, Qu, Hui, Zeng, Hui, Yang, J, Zhu, JQ, Luo, Jia, Song, Jia, Yu, Jia, Huang, Jialiang, Cai, Jialu, Liang, Jian, Zhou, Jiangting, Ye, Jiasheng, Li, Jiashi, Xu, Jiaxin, Hu, Jiewen, Yang, Jieyu, Chen, Jin, Yan, Jin, Chen, Jingchang, Zhou, Jingli, Xiang, Jingting, Yuan, Jingyang, Cheng, Jingyuan, Zhou, Jingzi, Zhu, Jinhua, Yu, Jiping, Sun, Joseph, Ran, Jun, Jiang, Junguang, Qiu, Junjie, Li, Junlong, Zheng, Junmin, Song, Junxiao, Dong, Kai, Gao, Kaige, Guan, Kang, Zhou, Kexing, Huang, Kezhao, Yu, Kuai, Wang, Lean, Zhang, Lecong, Wang, Lei, Xia, Leyi, Zhang, Li, Zhao, Liang, Guo, Lihua, Luo, Lingxiao, Ma, Linwang, Zhu, Linyan, Wang, Litong, Cai, Liyu, Zhang, Liyue, Chen, Longhao, Di, MS, Xu, MY, Mei, Max, Wang, Miaojun, Zhang, Mingchuan, Zhang, Minghua, Tang, Minghui, Li, Mingming, Zhou, Mingxu, Han, Minmin, Wang, Ning, Huang, Panpan, Wang, Panpan, Cong, Peixin, Wang, Peiyi, Zhang, Peng, Wang, Qiancheng, Zhu, Qihao, Li, Qingyang, Chen, Qinyu, Du, Qiushi, Jiang, Qiwei, Tian, Rui, Xu, Ruifan, Lu, Ruijie, Xu, Ruiling, Ge, Ruiqi, Zhang, Ruisong, Pan, Ruizhe, Wang, Runji, Chen, Runqian, Yin, Runqiu, Xu, Runxin, Shen, Ruomeng, Zhang, Ruoyu, Chen, Ruyi, Liu, SH, Lu, Shanghao, Sun, Shangmian, Zhou, Shangyan, Chen, Shanhuang, Cai, Shaofei, Nie, Shaoheng, Wu, Shaoqing, Chen, Shaoyuan, Hu, Shengding, Liu, Shengyu, Hu, Shiqiang, Ma, Shirong, Wang, Shiyu, Yu, Shuiping, Zhou, Shunfeng, Pan, Shuting, Yu, Shuying, Zhou, Songyang, Ni, Tao, Yun, Tao, Jin, Tian, Pei, Tian, Ye, Tian, Lin, Tianle, Ji, Tianran, Cui, Tianyi, Yue, Tianyuan, Yu, Tingting, Wang, Tun, Zhang, W, Xiao, WL, Zeng, Wangding, An, Wei, Zhao, Weilin, Liu, Wen, Liang, Wenfeng, Pang, Wenjie, Luo, Wenjing, Yao, Wenjing, Gao, Wenjun, Yang, Wenkai, Huang, Wenlve, Hou, Wenqing, Zhang, Wentao, Ma, Wenting, Gao, Xi, He, Xiang, Wang, Xiangwen, Wang, Xianzu, Bi, Xiao, Liu, Xiaodong, Wang, Xiaohan, Chen, Xiaokang, Zhang, Xiaokang, Nie, Xiaotao, Sun, Xiaowen, Wang, Xiaoxiang, Cheng, Xin, Liu, Xin, Xie, Xin, Liu, Xingchao, Liu, Xingchen, Yu, Xingkai, Li, Xingyou, Yang, Xinyu, Zhang, Xinyu, Chen, Xu, Wang, Xuanyu, Su, Xuecheng, Chen, Xueyin, Lin, Xuheng, Fu, Xuwei, Yan, YC, Wang, YQ, Ma, YW, Luo, Yanfeng, Zhang, Yang, Xu, Yanhong, Ma, Yanru, Huang, Yanwen, Li, Yao, Li, Yao, Xu, Yao, Zhao, Yao, Sun, Yaofeng, Wang, Yaohui, Qian, Yi, Shao, Yi, Yu, Yi, Zhang, Yichao, Ding, Yifan, Shi, Yifan, Wu, Yijia, Xiong, Yiliang, Ma, Yiling, He, Ying, Tang, Ying, Zhou, Ying, Luo, Yingjia, Zhong, Yinmin, Piao, Yishi, Wang, Yisong, Zhang, Yixiang, Chen, Yixiao, Tan, Yixuan, Wei, Yixuan, Ma, Yiyang, Liu, Yiyuan, Yang, Yonglun, Guo, Yongqiang, Wu, Yongtong, Wu, Yu, Li, YuKun, Cheng, Yuan, Ou, Yuan, Xu, Yuanfan, Li, Yuanhao, Wang, Yuduan, Yang, Yuehan, Xu, Yuer, Wu, Yuhan, Meng, Yuhao, Zou, Yuheng, Zha, Yukun, Xiong, Yunfan, Chen, Yupeng, Lin, Yuping, Cao, Yuqian, Wang, Yuqian, Zhang, Yushun, Yan, Yuting, Lin, Yutong, Gu, Yuxian, Luo, Yuxiang, You, Yuxiang, Liu, Yuxuan, Zhou, Yuxuan, Zhou, Yuyang, Huang, Yuzhen, Wu, ZF, Wang, Zehao, Zhao, Zehua, Ren, Zehui, Zhang, Zekai, Sha, Zhangli, Fu, Zhe, Ju, Zhe, Xu, Zhean, Xie, Zhenda, Zhang, Zhengyan, Gao, Zheren, Hao, Zhewen, Gou, Zhibin, Ma, Zhicheng, Yan, Zhigang, Shao, Zhihong, Huang, Zhixian, Chen, Zhixuan, Wu, Zhiyu, Ren, Zhizhou, Wu, Zhongyu, Li, Zhuoshu, Zhang, Zhuping, Xu, Zian, Wang, Zihao, Qu, Zihua, Gu, Zihui, Zhu, Zijia, Li, Zilin, Zhang, Zipeng, Xie, Ziwei, Gao, Ziyi, Wan, Ziyi, Pan, Zizheng, Yao, Zongqing

研究角色：主体论文（统一多模态模型）
任务标签：General Language Modeling、Long-Context Modeling、Efficient Autoregressive Generation

方法标签：Sparse Expert Computation、Attention Efficiency

中文简介：

DeepSeek-V4 系列处理最高百万词元的文本前缀，输出依赖远距离信息的预测或生成结果，面向长程任务与测试时扩展。其混合专家主干结合 Compressed Sparse Attention 与 Heavily Compressed Attention，以混合注意力降低长序列计算和缓存开销；同时采用 mHC 改进残差连接，并用 Muon 优化训练。相较 V3.2，它把稀疏访问进一步推进到百万级上下文，并提供 Pro 与 Flash 两种容量配置。

![DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence 原文图](assets/005-arxiv-2606-19348.svg)

*原文图 2：论文方法流程图（图 2）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2606.19348v1/basic_arch.svg)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2606.19348)

#### 任务标签：指令遵循与对话生成（Instruction Following）

##### 2024

##### DeepSeek LLM: Scaling Open-Source Language Models with Longtermism

作者：DeepSeek-AI, :, Bi, Xiao, Chen, Deli, Chen, Guanting, Chen, Shanhuang, Dai, Damai, Deng, Chengqi, Ding, Honghui, Dong, Kai, Du, Qiushi, Fu, Zhe, Gao, Huazuo, Gao, Kaige, Gao, Wenjun, Ge, Ruiqi, Guan, Kang, Guo, Daya, Guo, Jianzhong, Hao, Guangbo, Hao, Zhewen, He, Ying, Hu, Wenjie, Huang, Panpan, Li, Erhang, Li, Guowei, Li, Jiashi, Li, Yao, Li, Y. K., Liang, Wenfeng, Lin, Fangyun, Liu, A. X., Liu, Bo, Liu, Wen, Liu, Xiaodong, Liu, Xin, Liu, Yiyuan, Lu, Haoyu, Lu, Shanghao, Luo, Fuli, Ma, Shirong, Nie, Xiaotao, Pei, Tian, Piao, Yishi, Qiu, Junjie, Qu, Hui, Ren, Tongzheng, Ren, Zehui, Ruan, Chong, Sha, Zhangli, Shao, Zhihong, Song, Junxiao, Su, Xuecheng, Sun, Jingxiang, Sun, Yaofeng, Tang, Minghui, Wang, Bingxuan, Wang, Peiyi, Wang, Shiyu, Wang, Yaohui, Wang, Yongji, Wu, Tong, Wu, Y., Xie, Xin, Xie, Zhenda, Xie, Ziwei, Xiong, Yiliang, Xu, Hanwei, Xu, R. X., Xu, Yanhong, Yang, Dejian, You, Yuxiang, Yu, Shuiping, Yu, Xingkai, Zhang, B., Zhang, Haowei, Zhang, Lecong, Zhang, Liyue, Zhang, Mingchuan, Zhang, Minghua, Zhang, Wentao, Zhang, Yichao, Zhao, Chenggang, Zhao, Yao, Zhou, Shangyan, Zhou, Shunfeng, Zhu, Qihao, Zou, Yuheng

研究角色：主体论文（统一多模态模型）
任务标签：General Language Modeling、Instruction Following

中文简介：

该工作面向通用语言建模：输入词元化文本前缀，输出下一词元分布，并可连续生成文本。作者先研究适用于开源模型配置的规模定律，再据此训练 DeepSeek LLM 7B 与 67B，并以持续扩展的语料完成预训练；随后通过监督微调和直接偏好优化构建对话版本。它是 DeepSeek 通用主模型路线的起点，重点在于以规模规律指导模型与数据扩展。

![DeepSeek LLM: Scaling Open-Source Language Models with Longtermism 原文图](assets/001-arxiv-2401-02954.png)

*原文图 1：论文方法流程图（图 1）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2401.02954v1/figures/loss_step_cosine.png)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2401.02954)

##### DeepSeek-V3 Technical Report

作者：DeepSeek-AI, Liu, Aixin, Feng, Bei, Xue, Bing, Wang, Bingxuan, Wu, Bochao, Lu, Chengda, Zhao, Chenggang, Deng, Chengqi, Zhang, Chenyu, Ruan, Chong, Dai, Damai, Guo, Daya, Yang, Dejian, Chen, Deli, Ji, Dongjie, Li, Erhang, Lin, Fangyun, Dai, Fucong, Luo, Fuli, Hao, Guangbo, Chen, Guanting, Li, Guowei, Zhang, H., Bao, Han, Xu, Hanwei, Wang, Haocheng, Zhang, Haowei, Ding, Honghui, Xin, Huajian, Gao, Huazuo, Li, Hui, Qu, Hui, Cai, J. L., Liang, Jian, Guo, Jianzhong, Ni, Jiaqi, Li, Jiashi, Wang, Jiawei, Chen, Jin, Chen, Jingchang, Yuan, Jingyang, Qiu, Junjie, Li, Junlong, Song, Junxiao, Dong, Kai, Hu, Kai, Gao, Kaige, Guan, Kang, Huang, Kexin, Yu, Kuai, Wang, Lean, Zhang, Lecong, Xu, Lei, Xia, Leyi, Zhao, Liang, Wang, Litong, Zhang, Liyue, Li, Meng, Wang, Miaojun, Zhang, Mingchuan, Zhang, Minghua, Tang, Minghui, Li, Mingming, Tian, Ning, Huang, Panpan, Wang, Peiyi, Zhang, Peng, Wang, Qiancheng, Zhu, Qihao, Chen, Qinyu, Du, Qiushi, Chen, R. J., Jin, R. L., Ge, Ruiqi, Zhang, Ruisong, Pan, Ruizhe, Wang, Runji, Xu, Runxin, Zhang, Ruoyu, Chen, Ruyi, Li, S. S., Lu, Shanghao, Zhou, Shangyan, Chen, Shanhuang, Wu, Shaoqing, Ye, Shengfeng, Ye, Shengfeng, Ma, Shirong, Wang, Shiyu, Zhou, Shuang, Yu, Shuiping, Zhou, Shunfeng, Pan, Shuting, Wang, T., Yun, Tao, Pei, Tian, Sun, Tianyu, Xiao, W. L., Zeng, Wangding, Zhao, Wanjia, An, Wei, Liu, Wen, Liang, Wenfeng, Gao, Wenjun, Yu, Wenqin, Zhang, Wentao, Li, X. Q., Jin, Xiangyue, Wang, Xianzu, Bi, Xiao, Liu, Xiaodong, Wang, Xiaohan, Shen, Xiaojin, Chen, Xiaokang, Zhang, Xiaokang, Chen, Xiaosha, Nie, Xiaotao, Sun, Xiaowen, Wang, Xiaoxiang, Cheng, Xin, Liu, Xin, Xie, Xin, Liu, Xingchao, Yu, Xingkai, Song, Xinnan, Shan, Xinxia, Zhou, Xinyi, Yang, Xinyu, Li, Xinyuan, Su, Xuecheng, Lin, Xuheng, Li, Y. K., Wang, Y. Q., Wei, Y. X., Zhu, Y. X., Zhang, Yang, Xu, Yanhong, Xu, Yanhong, Huang, Yanping, Li, Yao, Zhao, Yao, Sun, Yaofeng, Li, Yaohui, Wang, Yaohui, Yu, Yi, Zheng, Yi, Zhang, Yichao, Shi, Yifan, Xiong, Yiliang, He, Ying, Tang, Ying, Piao, Yishi, Wang, Yisong, Tan, Yixuan, Ma, Yiyang, Liu, Yiyuan, Guo, Yongqiang, Wu, Yu, Ou, Yuan, Zhu, Yuchen, Wang, Yuduan, Gong, Yue, Zou, Yuheng, He, Yujia, Zha, Yukun, Xiong, Yunfan, Ma, Yunxian, Yan, Yuting, Luo, Yuxiang, You, Yuxiang, Liu, Yuxuan, Zhou, Yuyang, Wu, Z. F., Ren, Z. Z., Ren, Zehui, Sha, Zhangli, Fu, Zhe, Xu, Zhean, Huang, Zhen, Zhang, Zhen, Xie, Zhenda, Zhang, Zhengyan, Hao, Zhewen, Gou, Zhibin, Ma, Zhicheng, Yan, Zhigang, Shao, Zhihong, Xu, Zhipeng, Wu, Zhiyu, Zhang, Zhongyu, Li, Zhuoshu, Gu, Zihui, Zhu, Zijia, Liu, Zijun, Li, Zilin, Xie, Ziwei, Song, Ziyang, Gao, Ziyi, Pan, Zizheng

研究角色：主体论文（统一多模态模型）
任务标签：General Language Modeling、Instruction Following、Efficient Autoregressive Generation

方法标签：Sparse Expert Computation、Multi-Token Prediction、Attention Efficiency

中文简介：

DeepSeek-V3 面向通用文本续写：给定因果前缀，输出多个预测深度上的未来词元分布，并在部署时自回归生成文本。它延续 DeepSeekMoE 与 Multi-head Latent Attention，以稀疏专家控制激活计算和键值缓存，又引入无辅助损失的负载均衡策略及多词元预测目标，之后结合监督微调和强化学习。相较 V2，该模型保留高效主干，同时强化专家路由稳定性与训练信号密度。

![DeepSeek-V3 Technical Report 原文图](assets/003-arxiv-2412-19437.png)

*原文图 2：论文方法流程图（图 2）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2412.19437v2/basic_arch.png)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2412.19437)

##### 2025

##### DeepSeek-V3.2: Pushing the Frontier of Open Large Language Models

作者：DeepSeek-AI, Liu, Aixin, Mei, Aoxue, Lin, Bangcai, Xue, Bing, Wang, Bingxuan, Xu, Bingzheng, Wu, Bochao, Zhang, Bowei, Lin, Chaofan, Dong, Chen, Lu, Chengda, Zhao, Chenggang, Deng, Chengqi, Xu, Chenhao, Ruan, Chong, Dai, Damai, Guo, Daya, Yang, Dejian, Chen, Deli, Li, Erhang, Zhou, Fangqi, Lin, Fangyun, Dai, Fucong, Hao, Guangbo, Chen, Guanting, Li, Guowei, Zhang, H., Xu, Hanwei, Li, Hao, Liang, Haofen, Wei, Haoran, Zhang, Haowei, Luo, Haowen, Ji, Haozhe, Ding, Honghui, Tang, Hongxuan, Cao, Huanqi, Gao, Huazuo, Qu, Hui, Zeng, Hui, Huang, Jialiang, Li, Jiashi, Xu, Jiaxin, Hu, Jiewen, Chen, Jingchang, Xiang, Jingting, Yuan, Jingyang, Cheng, Jingyuan, Zhu, Jinhua, Ran, Jun, Jiang, Junguang, Qiu, Junjie, Li, Junlong, Song, Junxiao, Dong, Kai, Gao, Kaige, Guan, Kang, Huang, Kexin, Zhou, Kexing, Huang, Kezhao, Yu, Kuai, Wang, Lean, Zhang, Lecong, Wang, Lei, Zhao, Liang, Yin, Liangsheng, Guo, Lihua, Luo, Lingxiao, Ma, Linwang, Wang, Litong, Zhang, Liyue, Di, M. S., Xu, M. Y, Zhang, Mingchuan, Zhang, Minghua, Tang, Minghui, Zhou, Mingxu, Huang, Panpan, Cong, Peixin, Wang, Peiyi, Wang, Qiancheng, Zhu, Qihao, Li, Qingyang, Chen, Qinyu, Du, Qiushi, Xu, Ruiling, Ge, Ruiqi, Zhang, Ruisong, Pan, Ruizhe, Wang, Runji, Yin, Runqiu, Xu, Runxin, Shen, Ruomeng, Zhang, Ruoyu, Liu, S. H., Lu, Shanghao, Zhou, Shangyan, Chen, Shanhuang, Cai, Shaofei, Chen, Shaoyuan, Hu, Shengding, Liu, Shengyu, Hu, Shiqiang, Ma, Shirong, Wang, Shiyu, Yu, Shuiping, Zhou, Shunfeng, Pan, Shuting, Zhou, Songyang, Ni, Tao, Yun, Tao, Pei, Tian, Ye, Tian, Yue, Tianyuan, Zeng, Wangding, Liu, Wen, Liang, Wenfeng, Pang, Wenjie, Luo, Wenjing, Gao, Wenjun, Zhang, Wentao, Gao, Xi, Wang, Xiangwen, Bi, Xiao, Liu, Xiaodong, Wang, Xiaohan, Chen, Xiaokang, Zhang, Xiaokang, Nie, Xiaotao, Cheng, Xin, Liu, Xin, Xie, Xin, Liu, Xingchao, Yu, Xingkai, Li, Xingyou, Yang, Xinyu, Li, Xinyuan, Chen, Xu, Su, Xuecheng, Pan, Xuehai, Lin, Xuheng, Fu, Xuwei, Wang, Y. Q., Zhang, Yang, Xu, Yanhong, Ma, Yanru, Li, Yao, Li, Yao, Zhao, Yao, Sun, Yaofeng, Wang, Yaohui, Qian, Yi, Yu, Yi, Zhang, Yichao, Ding, Yifan, Shi, Yifan, Xiong, Yiliang, He, Ying, Zhou, Ying, Zhong, Yinmin, Piao, Yishi, Wang, Yisong, Chen, Yixiao, Tan, Yixuan, Wei, Yixuan, Ma, Yiyang, Liu, Yiyuan, Yang, Yonglun, Guo, Yongqiang, Wu, Yongtong, Wu, Yu, Cheng, Yuan, Ou, Yuan, Xu, Yuanfan, Wang, Yuduan, Gong, Yue, Wu, Yuhan, Zou, Yuheng, Li, Yukun, Xiong, Yunfan, Luo, Yuxiang, You, Yuxiang, Liu, Yuxuan, Zhou, Yuyang, Wu, Z. F., Ren, Z. Z., Zhao, Zehua, Ren, Zehui, Sha, Zhangli, Fu, Zhe, Xu, Zhean, Xie, Zhenda, Zhang, Zhengyan, Hao, Zhewen, Gou, Zhibin, Ma, Zhicheng, Yan, Zhigang, Shao, Zhihong, Huang, Zhixian, Wu, Zhiyu, Li, Zhuoshu, Zhang, Zhuping, Xu, Zian, Wang, Zihao, Gu, Zihui, Zhu, Zijia, Li, Zilin, Zhang, Zipeng, Xie, Ziwei, Gao, Ziyi, Pan, Zizheng, Yao, Zongqing, Feng, Bei, Li, Hui, Cai, J. L., Ni, Jiaqi, Xu, Lei, Li, Meng, Tian, Ning, Chen, R. J., Jin, R. L., Li, S. S., Zhou, Shuang, Sun, Tianyu, Li, X. Q., Jin, Xiangyue, Shen, Xiaojin, Chen, Xiaosha, Song, Xinnan, Zhou, Xinyi, Zhu, Y. X., Huang, Yanping, Li, Yaohui, Zheng, Yi, Zhu, Yuchen, Ma, Yunxian, Huang, Zhen, Xu, Zhipeng, Zhang, Zhongyu, Ji, Dongjie, Liang, Jian, Guo, Jianzhong, Chen, Jin, Xia, Leyi, Wang, Miaojun, Li, Mingming, Zhang, Peng, Chen, Ruyi, Sun, Shangmian, Wu, Shaoqing, Ye, Shengfeng, Wang, T., Xiao, W. L., An, Wei, Wang, Xianzu, Sun, Xiaowen, Wang, Xiaoxiang, Tang, Ying, Zha, Yukun, Zhang, Zekai, Ju, Zhe, Zhang, Zhen, Qu, Zihua

研究角色：主体论文（统一多模态模型）
任务标签：Long-Context Modeling、Instruction Following

方法标签：Attention Efficiency

中文简介：

DeepSeek-V3.2 面向长上下文中的推理与代理任务：输入长文本、交互轨迹及工具使用信息，输出综合远距离证据的回答或行动文本。核心方法是 DeepSeek Sparse Attention，以稀疏上下文访问降低长序列计算复杂度，并通过可扩展强化学习和大规模代理任务合成提升推理、工具使用与指令遵循。它承接 V3 系列，却将重点由通用预训练扩展到高效长上下文和复杂交互式后训练。

![DeepSeek-V3.2: Pushing the Frontier of Open Large Language Models 原文图](assets/004-arxiv-2512-02556.svg)

*原文图 2：论文方法流程图（图 2）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2512.02556v1/v32_arch.svg)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2512.02556)

#### 任务标签：长上下文建模（Long-Context Modeling）

##### 2024

##### DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model

作者：DeepSeek-AI, Liu, Aixin, Feng, Bei, Wang, Bin, Wang, Bingxuan, Liu, Bo, Zhao, Chenggang, Dengr, Chengqi, Ruan, Chong, Dai, Damai, Guo, Daya, Yang, Dejian, Chen, Deli, Ji, Dongjie, Li, Erhang, Lin, Fangyun, Luo, Fuli, Hao, Guangbo, Chen, Guanting, Li, Guowei, Zhang, H., Xu, Hanwei, Yang, Hao, Zhang, Haowei, Ding, Honghui, Xin, Huajian, Gao, Huazuo, Li, Hui, Qu, Hui, Cai, J. L., Liang, Jian, Guo, Jianzhong, Ni, Jiaqi, Li, Jiashi, Chen, Jin, Yuan, Jingyang, Qiu, Junjie, Song, Junxiao, Dong, Kai, Gao, Kaige, Guan, Kang, Wang, Lean, Zhang, Lecong, Xu, Lei, Xia, Leyi, Zhao, Liang, Zhang, Liyue, Li, Meng, Wang, Miaojun, Zhang, Mingchuan, Zhang, Minghua, Tang, Minghui, Li, Mingming, Tian, Ning, Huang, Panpan, Wang, Peiyi, Zhang, Peng, Zhu, Qihao, Chen, Qinyu, Du, Qiushi, Chen, R. J., Jin, R. L., Ge, Ruiqi, Pan, Ruizhe, Xu, Runxin, Chen, Ruyi, Li, S. S., Lu, Shanghao, Zhou, Shangyan, Chen, Shanhuang, Wu, Shaoqing, Ye, Shengfeng, Ma, Shirong, Wang, Shiyu, Zhou, Shuang, Yu, Shuiping, Zhou, Shunfeng, Zheng, Size, Wang, T., Pei, Tian, Yuan, Tian, Sun, Tianyu, Xiao, W. L., Zeng, Wangding, An, Wei, Liu, Wen, Liang, Wenfeng, Gao, Wenjun, Zhang, Wentao, Li, X. Q., Jin, Xiangyue, Wang, Xianzu, Bi, Xiao, Liu, Xiaodong, Wang, Xiaohan, Shen, Xiaojin, Chen, Xiaokang, Chen, Xiaosha, Nie, Xiaotao, Sun, Xiaowen, Wang, Xiaoxiang, Liu, Xin, Xie, Xin, Yu, Xingkai, Song, Xinnan, Zhou, Xinyi, Yang, Xinyu, Lu, Xuan, Su, Xuecheng, Wu, Y., Li, Y. K., Wei, Y. X., Zhu, Y. X., Xu, Yanhong, Huang, Yanping, Li, Yao, Zhao, Yao, Sun, Yaofeng, Li, Yaohui, Wang, Yaohui, Zheng, Yi, Zhang, Yichao, Xiong, Yiliang, Zhao, Yilong, He, Ying, Tang, Ying, Piao, Yishi, Dong, Yixin, Tan, Yixuan, Liu, Yiyuan, Wang, Yongji, Guo, Yongqiang, Zhu, Yuchen, Wang, Yuduan, Zou, Yuheng, Zha, Yukun, Ma, Yunxian, Yan, Yuting, You, Yuxiang, Liu, Yuxuan, Ren, Z. Z., Ren, Zehui, Sha, Zhangli, Fu, Zhe, Huang, Zhen, Zhang, Zhen, Xie, Zhenda, Hao, Zhewen, Shao, Zhihong, Wen, Zhiniu, Xu, Zhipeng, Zhang, Zhongyu, Li, Zhuoshu, Wang, Zihan, Gu, Zihui, Li, Zilin, Xie, Ziwei

研究角色：主体论文（统一多模态模型）
任务标签：General Language Modeling、Long-Context Modeling、Efficient Autoregressive Generation

方法标签：Sparse Expert Computation、Attention Efficiency

中文简介：

DeepSeek-V2 接收文本前缀并自回归预测后续词元，同时兼顾长上下文生成的训练与推理成本。其核心是混合专家范式：DeepSeekMoE 让每个词元仅激活少量参数，Multi-head Latent Attention 则把注意力键值缓存压缩为潜在表示；模型经多源语料预训练，再进行监督微调和强化学习。相较稠密的 DeepSeek 67B，它转向稀疏扩容，并把经济训练与高效推理纳入主模型设计。

![DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model 原文图](assets/002-arxiv-2405-04434.png)

*原文图 3：论文方法流程图（图 3）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2405.04434v5/deepseekv2.png)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2405.04434)

##### 2025

##### DeepSeek-V3.2: Pushing the Frontier of Open Large Language Models

作者：DeepSeek-AI, Liu, Aixin, Mei, Aoxue, Lin, Bangcai, Xue, Bing, Wang, Bingxuan, Xu, Bingzheng, Wu, Bochao, Zhang, Bowei, Lin, Chaofan, Dong, Chen, Lu, Chengda, Zhao, Chenggang, Deng, Chengqi, Xu, Chenhao, Ruan, Chong, Dai, Damai, Guo, Daya, Yang, Dejian, Chen, Deli, Li, Erhang, Zhou, Fangqi, Lin, Fangyun, Dai, Fucong, Hao, Guangbo, Chen, Guanting, Li, Guowei, Zhang, H., Xu, Hanwei, Li, Hao, Liang, Haofen, Wei, Haoran, Zhang, Haowei, Luo, Haowen, Ji, Haozhe, Ding, Honghui, Tang, Hongxuan, Cao, Huanqi, Gao, Huazuo, Qu, Hui, Zeng, Hui, Huang, Jialiang, Li, Jiashi, Xu, Jiaxin, Hu, Jiewen, Chen, Jingchang, Xiang, Jingting, Yuan, Jingyang, Cheng, Jingyuan, Zhu, Jinhua, Ran, Jun, Jiang, Junguang, Qiu, Junjie, Li, Junlong, Song, Junxiao, Dong, Kai, Gao, Kaige, Guan, Kang, Huang, Kexin, Zhou, Kexing, Huang, Kezhao, Yu, Kuai, Wang, Lean, Zhang, Lecong, Wang, Lei, Zhao, Liang, Yin, Liangsheng, Guo, Lihua, Luo, Lingxiao, Ma, Linwang, Wang, Litong, Zhang, Liyue, Di, M. S., Xu, M. Y, Zhang, Mingchuan, Zhang, Minghua, Tang, Minghui, Zhou, Mingxu, Huang, Panpan, Cong, Peixin, Wang, Peiyi, Wang, Qiancheng, Zhu, Qihao, Li, Qingyang, Chen, Qinyu, Du, Qiushi, Xu, Ruiling, Ge, Ruiqi, Zhang, Ruisong, Pan, Ruizhe, Wang, Runji, Yin, Runqiu, Xu, Runxin, Shen, Ruomeng, Zhang, Ruoyu, Liu, S. H., Lu, Shanghao, Zhou, Shangyan, Chen, Shanhuang, Cai, Shaofei, Chen, Shaoyuan, Hu, Shengding, Liu, Shengyu, Hu, Shiqiang, Ma, Shirong, Wang, Shiyu, Yu, Shuiping, Zhou, Shunfeng, Pan, Shuting, Zhou, Songyang, Ni, Tao, Yun, Tao, Pei, Tian, Ye, Tian, Yue, Tianyuan, Zeng, Wangding, Liu, Wen, Liang, Wenfeng, Pang, Wenjie, Luo, Wenjing, Gao, Wenjun, Zhang, Wentao, Gao, Xi, Wang, Xiangwen, Bi, Xiao, Liu, Xiaodong, Wang, Xiaohan, Chen, Xiaokang, Zhang, Xiaokang, Nie, Xiaotao, Cheng, Xin, Liu, Xin, Xie, Xin, Liu, Xingchao, Yu, Xingkai, Li, Xingyou, Yang, Xinyu, Li, Xinyuan, Chen, Xu, Su, Xuecheng, Pan, Xuehai, Lin, Xuheng, Fu, Xuwei, Wang, Y. Q., Zhang, Yang, Xu, Yanhong, Ma, Yanru, Li, Yao, Li, Yao, Zhao, Yao, Sun, Yaofeng, Wang, Yaohui, Qian, Yi, Yu, Yi, Zhang, Yichao, Ding, Yifan, Shi, Yifan, Xiong, Yiliang, He, Ying, Zhou, Ying, Zhong, Yinmin, Piao, Yishi, Wang, Yisong, Chen, Yixiao, Tan, Yixuan, Wei, Yixuan, Ma, Yiyang, Liu, Yiyuan, Yang, Yonglun, Guo, Yongqiang, Wu, Yongtong, Wu, Yu, Cheng, Yuan, Ou, Yuan, Xu, Yuanfan, Wang, Yuduan, Gong, Yue, Wu, Yuhan, Zou, Yuheng, Li, Yukun, Xiong, Yunfan, Luo, Yuxiang, You, Yuxiang, Liu, Yuxuan, Zhou, Yuyang, Wu, Z. F., Ren, Z. Z., Zhao, Zehua, Ren, Zehui, Sha, Zhangli, Fu, Zhe, Xu, Zhean, Xie, Zhenda, Zhang, Zhengyan, Hao, Zhewen, Gou, Zhibin, Ma, Zhicheng, Yan, Zhigang, Shao, Zhihong, Huang, Zhixian, Wu, Zhiyu, Li, Zhuoshu, Zhang, Zhuping, Xu, Zian, Wang, Zihao, Gu, Zihui, Zhu, Zijia, Li, Zilin, Zhang, Zipeng, Xie, Ziwei, Gao, Ziyi, Pan, Zizheng, Yao, Zongqing, Feng, Bei, Li, Hui, Cai, J. L., Ni, Jiaqi, Xu, Lei, Li, Meng, Tian, Ning, Chen, R. J., Jin, R. L., Li, S. S., Zhou, Shuang, Sun, Tianyu, Li, X. Q., Jin, Xiangyue, Shen, Xiaojin, Chen, Xiaosha, Song, Xinnan, Zhou, Xinyi, Zhu, Y. X., Huang, Yanping, Li, Yaohui, Zheng, Yi, Zhu, Yuchen, Ma, Yunxian, Huang, Zhen, Xu, Zhipeng, Zhang, Zhongyu, Ji, Dongjie, Liang, Jian, Guo, Jianzhong, Chen, Jin, Xia, Leyi, Wang, Miaojun, Li, Mingming, Zhang, Peng, Chen, Ruyi, Sun, Shangmian, Wu, Shaoqing, Ye, Shengfeng, Wang, T., Xiao, W. L., An, Wei, Wang, Xianzu, Sun, Xiaowen, Wang, Xiaoxiang, Tang, Ying, Zha, Yukun, Zhang, Zekai, Ju, Zhe, Zhang, Zhen, Qu, Zihua

研究角色：主体论文（统一多模态模型）
任务标签：Long-Context Modeling、Instruction Following

方法标签：Attention Efficiency

中文简介：

DeepSeek-V3.2 面向长上下文中的推理与代理任务：输入长文本、交互轨迹及工具使用信息，输出综合远距离证据的回答或行动文本。核心方法是 DeepSeek Sparse Attention，以稀疏上下文访问降低长序列计算复杂度，并通过可扩展强化学习和大规模代理任务合成提升推理、工具使用与指令遵循。它承接 V3 系列，却将重点由通用预训练扩展到高效长上下文和复杂交互式后训练。

![DeepSeek-V3.2: Pushing the Frontier of Open Large Language Models 原文图](assets/004-arxiv-2512-02556.svg)

*原文图 2：论文方法流程图（图 2）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2512.02556v1/v32_arch.svg)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2512.02556)

##### 2026

##### DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence

作者：DeepSeek-AI, Xu, Anyi, Lin, Bangcai, Xue, Bing, Wang, Bingxuan, Xu, Bingzheng, Wu, Bochao, Zhang, Bowei, Lin, Chaofan, Dong, Chen, Ling, Chenchen, Lu, Chengda, Zhao, Chenggang, Deng, Chengqi, Hou, Chengyu, Xu, Chenhao, Shao, Chenze, Ruan, Chong, Sun, Conner, Dai, Damai, Guo, Daya, Yang, Dejian, Chen, Deli, Li, Donghao, Ji, Dongjie, Li, Erhang, Wei, Fang, Lin, Fangyun, Yuan, Fangzhou, Xia, Feiyu, Dai, Fucong, Hao, Guangbo, Chen, Guanting, Cao, Guoai, Meng, Guolai, Li, Guowei, Yu, Han, Zhang, Han, Xu, Hanwei, Li, Hao, Liang, Haofen, Zhang, Haoling, Luo, Haoming, Wei, Haoran, Yuan, Haotian, Zhang, Haowei, Luo, Haowen, Chen, Haoyu, Ji, Haozhe, Zhang, Hengqing, Ding, Honghui, Tang, Hongxuan, Cao, Huanqi, Gao, Huazuo, Qu, Hui, Zeng, Hui, Yang, J, Zhu, JQ, Luo, Jia, Song, Jia, Yu, Jia, Huang, Jialiang, Cai, Jialu, Liang, Jian, Zhou, Jiangting, Ye, Jiasheng, Li, Jiashi, Xu, Jiaxin, Hu, Jiewen, Yang, Jieyu, Chen, Jin, Yan, Jin, Chen, Jingchang, Zhou, Jingli, Xiang, Jingting, Yuan, Jingyang, Cheng, Jingyuan, Zhou, Jingzi, Zhu, Jinhua, Yu, Jiping, Sun, Joseph, Ran, Jun, Jiang, Junguang, Qiu, Junjie, Li, Junlong, Zheng, Junmin, Song, Junxiao, Dong, Kai, Gao, Kaige, Guan, Kang, Zhou, Kexing, Huang, Kezhao, Yu, Kuai, Wang, Lean, Zhang, Lecong, Wang, Lei, Xia, Leyi, Zhang, Li, Zhao, Liang, Guo, Lihua, Luo, Lingxiao, Ma, Linwang, Zhu, Linyan, Wang, Litong, Cai, Liyu, Zhang, Liyue, Chen, Longhao, Di, MS, Xu, MY, Mei, Max, Wang, Miaojun, Zhang, Mingchuan, Zhang, Minghua, Tang, Minghui, Li, Mingming, Zhou, Mingxu, Han, Minmin, Wang, Ning, Huang, Panpan, Wang, Panpan, Cong, Peixin, Wang, Peiyi, Zhang, Peng, Wang, Qiancheng, Zhu, Qihao, Li, Qingyang, Chen, Qinyu, Du, Qiushi, Jiang, Qiwei, Tian, Rui, Xu, Ruifan, Lu, Ruijie, Xu, Ruiling, Ge, Ruiqi, Zhang, Ruisong, Pan, Ruizhe, Wang, Runji, Chen, Runqian, Yin, Runqiu, Xu, Runxin, Shen, Ruomeng, Zhang, Ruoyu, Chen, Ruyi, Liu, SH, Lu, Shanghao, Sun, Shangmian, Zhou, Shangyan, Chen, Shanhuang, Cai, Shaofei, Nie, Shaoheng, Wu, Shaoqing, Chen, Shaoyuan, Hu, Shengding, Liu, Shengyu, Hu, Shiqiang, Ma, Shirong, Wang, Shiyu, Yu, Shuiping, Zhou, Shunfeng, Pan, Shuting, Yu, Shuying, Zhou, Songyang, Ni, Tao, Yun, Tao, Jin, Tian, Pei, Tian, Ye, Tian, Lin, Tianle, Ji, Tianran, Cui, Tianyi, Yue, Tianyuan, Yu, Tingting, Wang, Tun, Zhang, W, Xiao, WL, Zeng, Wangding, An, Wei, Zhao, Weilin, Liu, Wen, Liang, Wenfeng, Pang, Wenjie, Luo, Wenjing, Yao, Wenjing, Gao, Wenjun, Yang, Wenkai, Huang, Wenlve, Hou, Wenqing, Zhang, Wentao, Ma, Wenting, Gao, Xi, He, Xiang, Wang, Xiangwen, Wang, Xianzu, Bi, Xiao, Liu, Xiaodong, Wang, Xiaohan, Chen, Xiaokang, Zhang, Xiaokang, Nie, Xiaotao, Sun, Xiaowen, Wang, Xiaoxiang, Cheng, Xin, Liu, Xin, Xie, Xin, Liu, Xingchao, Liu, Xingchen, Yu, Xingkai, Li, Xingyou, Yang, Xinyu, Zhang, Xinyu, Chen, Xu, Wang, Xuanyu, Su, Xuecheng, Chen, Xueyin, Lin, Xuheng, Fu, Xuwei, Yan, YC, Wang, YQ, Ma, YW, Luo, Yanfeng, Zhang, Yang, Xu, Yanhong, Ma, Yanru, Huang, Yanwen, Li, Yao, Li, Yao, Xu, Yao, Zhao, Yao, Sun, Yaofeng, Wang, Yaohui, Qian, Yi, Shao, Yi, Yu, Yi, Zhang, Yichao, Ding, Yifan, Shi, Yifan, Wu, Yijia, Xiong, Yiliang, Ma, Yiling, He, Ying, Tang, Ying, Zhou, Ying, Luo, Yingjia, Zhong, Yinmin, Piao, Yishi, Wang, Yisong, Zhang, Yixiang, Chen, Yixiao, Tan, Yixuan, Wei, Yixuan, Ma, Yiyang, Liu, Yiyuan, Yang, Yonglun, Guo, Yongqiang, Wu, Yongtong, Wu, Yu, Li, YuKun, Cheng, Yuan, Ou, Yuan, Xu, Yuanfan, Li, Yuanhao, Wang, Yuduan, Yang, Yuehan, Xu, Yuer, Wu, Yuhan, Meng, Yuhao, Zou, Yuheng, Zha, Yukun, Xiong, Yunfan, Chen, Yupeng, Lin, Yuping, Cao, Yuqian, Wang, Yuqian, Zhang, Yushun, Yan, Yuting, Lin, Yutong, Gu, Yuxian, Luo, Yuxiang, You, Yuxiang, Liu, Yuxuan, Zhou, Yuxuan, Zhou, Yuyang, Huang, Yuzhen, Wu, ZF, Wang, Zehao, Zhao, Zehua, Ren, Zehui, Zhang, Zekai, Sha, Zhangli, Fu, Zhe, Ju, Zhe, Xu, Zhean, Xie, Zhenda, Zhang, Zhengyan, Gao, Zheren, Hao, Zhewen, Gou, Zhibin, Ma, Zhicheng, Yan, Zhigang, Shao, Zhihong, Huang, Zhixian, Chen, Zhixuan, Wu, Zhiyu, Ren, Zhizhou, Wu, Zhongyu, Li, Zhuoshu, Zhang, Zhuping, Xu, Zian, Wang, Zihao, Qu, Zihua, Gu, Zihui, Zhu, Zijia, Li, Zilin, Zhang, Zipeng, Xie, Ziwei, Gao, Ziyi, Wan, Ziyi, Pan, Zizheng, Yao, Zongqing

研究角色：主体论文（统一多模态模型）
任务标签：General Language Modeling、Long-Context Modeling、Efficient Autoregressive Generation

方法标签：Sparse Expert Computation、Attention Efficiency

中文简介：

DeepSeek-V4 系列处理最高百万词元的文本前缀，输出依赖远距离信息的预测或生成结果，面向长程任务与测试时扩展。其混合专家主干结合 Compressed Sparse Attention 与 Heavily Compressed Attention，以混合注意力降低长序列计算和缓存开销；同时采用 mHC 改进残差连接，并用 Muon 优化训练。相较 V3.2，它把稀疏访问进一步推进到百万级上下文，并提供 Pro 与 Flash 两种容量配置。

![DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence 原文图](assets/005-arxiv-2606-19348.svg)

*原文图 2：论文方法流程图（图 2）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2606.19348v1/basic_arch.svg)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2606.19348)

##### DeepSeek-V4.1-Flash: Pushing the Limits of KV Cache Compression

作者：DeepSeek-AI, :, Xu, Anyi, Li, B., Lin, Bangcai, Xue, Bing, Xian, BingCheng, Xu, Bingzheng, Wu, Bochao, Zhang, Bowei, Deng, Boyi, Yu, C. C., Jin, Chao, Lin, Chaofan, Dong, Chen, Wang, Chenbing, Feng, Chenfan, Lu, Chengda, Zhao, Chenggang, Deng, Chengqi, Zhang, Chengyuan, Xu, Chenhao, Zhao, Chenqi, Shao, Chenze, Wang, Chuhao, Zhang, Chuqi, Dai, Damai, Yang, Dejian, Chen, Deli, Huang, Di, Wu, Di, Li, Donghao, Li, Erhang, Fu, Eric, Zhou, F., Zhou, Fangwei, Lin, Fangyun, Yuan, Fangzhou, Xia, Feiyu, Dai, Fucong, Hao, Guangbo, Li, Guanglin, Chen, Guanting, Cao, Guoai, Fan, Guofan, Meng, Guolai, Li, Guowei, Zhang, Haichuan, Ma, Haiyang, Shen, Haiyang, Li, Han, Yu, Han, Zhang, Han, Deng, Hangyuan, Xu, Hanwei, Xu, Hanxiang, Zhong, Hanxun, Guo, Hao, Jiang, Hao, Li, Hao, Qin, Hao, Wen, Haodong, Liang, Haofen, Huang, Haofeng, Liu, Haohua, Zhang, Haoling, Luo, Haoming, Yang, Haoran, Xu, Haotian, Yuan, Haotian, Huang, Haoting, Luo, Haowen, Cai, Haoyang, Chen, Haoyu, Ji, Haozhe, Zhang, Hengran, Wang, Hengrui, Wu, Hengxu, Ding, Honghui, Tang, Hongxuan, Wang, Huadong, Cao, Huanqi, Gao, Huazuo, Qu, Hui, Zeng, Hui, Yang, J., Jin, J. H., Zhang, J. H., Zou, J. X., Yu, Jia, Zhou, Jiahui, Chen, Jiajun, Huang, Jialiang, Zhao, Jialin, Tang, Jiamin, Zhou, Jian, Tong, Jianan, Li, Jianwen, Zhu, Jiaqi, Wang, Jiarui, Ye, Jiasheng, Li, Jiashi, Xu, Jiaxin, Ding, Jiaying, Lu, Jibai, Hu, Jiewen, Yan, Jin, Zhai, Jincheng, Chen, Jingchang, Hu, Jingcheng, Zhou, Jingli, Xu, Jingsheng, Xiang, Jingting, Yun, Jingyan, Yuan, Jingyang, Cheng, Jingyuan, Zhu, Jinhua, Wang, Jinpeng, Chen, Jinyi, Hu, Jinyi, Yu, Jiping, Guo, Jueliang, Pei, Junbo, Sun, Junbo, Jiang, Junguang, Qiu, Junjie, Zhou, Junkang, Liu, Junqi, Li, Junren, Li, Junxian, Song, Junxiao, Guo, Junyi, Dong, Kai, Chen, Kaifeng, Gao, Kaige, Guan, Kang, Yuan, Kangdong, Hong, Ke, Xu, Ke, Zhao, Kefan, Ji, Kexin, Zhang, Kexin, Zhou, Kexing, Yu, Kuai, Zhang, Lan, Wang, Lean, Zhang, Lecong, Wang, Lei, Gao, Letian, Zhao, Liang, Xu, Liansheng, Guo, Lihua, Luo, Lingxiao, Fu, Lingyue, Deng, Litao, Wang, Litong, Zhang, Liyue, Chen, Longhao, Chen, Lu, Huang, Luotian, Ma, Luyao, Wang, Luyao, Di, M. S., Mei, Max, Ye, Menghao, Cui, Miao, Zhang, Mingchuan, Zhang, Minghua, Tang, Minghui, Zhang, Mingjing, Wei, Mingqi, Chen, Mingshu, Liu, Mingxing, Zhou, Mingxu, Xu, Mingyu, Yang, Mingyu, Wang, Mingze, Chen, Muyang, Shentu, Ni, Wang, Ning, Ning, Niufang, Huang, Panpan, Cong, Peixin, Wang, Peiyi, Xin, Peiyuan, Ren, Pengfei, Yan, Pengfei, Zhang, Pengle, Kang, Qi, Tang, Qi, Wang, Qiancheng, Li, Qiang, Zhu, Qihao, Li, Qingyang, Chen, Qinyu, Du, Qiushi, Guo, Qizhou, Xu, Rongxian, Ding, Rui, Hu, Rui, Tian, Rui, Yu, Rui, Zhu, Ruidong, Xu, Ruifan, Yang, Ruihan, Xia, Ruihang, Lu, Ruijie, Geng, Ruilin, Hong, Ruipeng, Ge, Ruiqi, Zhang, Ruisong, Sun, Ruize, Pan, Ruizhe, Wang, Runji, Chen, Runqian, Xu, Runxin, Tian, Ruohong, Shen, Ruomeng, Zhang, Ruoyu, X., Ryan, Liu, S. H., Lu, Shanghao, Zhou, Shangyan, Chen, Shanhuang, Cai, Shaofei, Nie, Shaoheng, Chen, Shaoyuan, Hu, Shengding, Lin, Shengkai, Ran, Shengwen, Liu, Shengyu, Jia, Shengyuan, Bai, Shi, Feng, Shi, Xu, Shicheng, Liu, Shichun, Hu, Shiqiang, Ma, Shirong, Wang, Shiyu, Feng, Shiyuan, Gong, Shufan, Lin, Shuhan, Yu, Shuiping, Zhou, Shunfeng, Yang, Shuo, Wang, Shuomeng, Guo, Shuting, Pan, Shuting, Yu, Shuying, Cao, Sinuo, Lin, Siyi, Chen, Sizhe, Chen, Songyang, Zhou, Songyang, Ni, Tao, Yun, Tao, Jin, Tian, Pei, Tian, Ye, Tian, Lin, Tianle, Ji, Tianran, Cui, Tianyi, Yue, Tianyuan, Yu, Tingting, Xiong, Tongrui, Zeng, Wangding, Liu, Wei, Zhang, Wei, Xu, Weibin, Zeng, Weihao, Zhao, Weilin, Liu, Wen, Liang, Wenfeng, Pang, Wenjie, Luo, Wenjing, Yao, Wenjing, Gao, Wenjun, Shao, Wenkai, Yang, Wenkai, Zhang, Wenli, Wang, Wenlu, Huang, Wenlve, Yan, Wenqian, Zhang, Wentao, Gao, Xi, He, Xiang, Li, Xiang, Li, Xiangli, Wang, Xiangwen, Zhang, Xiangying, Wei, Xiankui, Bi, Xiao, Liu, Xiaodong, Wang, Xiaohan, Qu, Xiaojian, Chen, Xiaokang, Zhang, Xiaokang, Nie, Xiaotao, Zou, Xiaoyao, Li, Xiaoyuan, Guo, Xicheng, Chu, Xieting, Cheng, Xin, Liu, Xin, Xie, Xin, Xu, Xinbo, Liu, Xingchao, Liu, Xingchen, Yu, Xingkai, Li, Xingyou, Yao, Xintong, Chen, Xinyang, Jiang, Xinyong, Yang, Xinyu, Yang, Xinyu, Chen, Xu, Wang, Xuanyu, Zhong, Xubei, Su, Xuecheng, Liu, Xuejie, Lin, Xuheng, Fan, Xujie, Zhao, Xuncheng, Fu, Xuwei, Yan, Y. C., Jiang, Y. H., Wu, Y. T., M., Y. W., Wang, Y. Z., Gao, Yafei, Yang, Yang, Zhang, Yang, Ma, Yanru, Huang, Yanwen, Li, Yao, Li, Yao, Meng, Yao, Zhao, Yao, Sun, Yaofeng, Wang, Yaohui, Ye, Yaoyang, Yin, Yehang, Wu, Yexinrui, Qian, Yi, Tao, Yi, Yu, Yi, Zhang, Yichao, Jiang, Yichen, Wang, Yicheng, Ding, Yifan, Shi, Yifan, Peng, Yifeng, Zhai, Yifeng, Wu, Yijia, Xiong, Yiliang, Wang, Yilun, He, Ying, Zhou, Ying, Luo, Yingjia, Zhong, Yinmin, Wang, Yiping, Wang, Yisong, Zhang, Yixiang, Chen, Yixiao, Tan, Yixuan, Wei, Yixuan, Ma, Yiyang, Yang, Yiyao, Liu, Yiyuan, Cai, Yizai, Wei, Yizhen, Wang, Yizhi, Yang, Yonglun, Zhuo, Yongqi, Guo, Yongqiang, Wu, Yongtong, Wu, Yu, Zhang, Yu, Bian, Yuan, Cheng, Yuan, Ou, Yuan, Sun, Yuan, Xu, Yuanfan, Sun, Yuanhang, Li, Yuanhao, Liu, Yuchen, Yao, Yuchen, Han, Yudong, Wang, Yuduan, Wu, Yuhan, Meng, Yuhao, Zou, Yuheng, Li, YuKun, Wang, Yunchuan, Xiao, Yunfan, Xiong, Yunfan, Chen, Yupeng, Cao, Yuqian, Wang, Yuqian, Chen, Yuqing, Zhang, Yushun, Lin, Yutong, Xiao, Yuwei, Gu, Yuxian, Chen, Yuxiang, Huang, Yuxiang, Luo, Yuxiang, You, Yuxiang, Chen, Yuxin, Xiang, Yuxin, Liu, Yuxuan, Zhou, Yuxuan, Zhou, Yuyang, Guo, Yuzhe, Huang, Yuzhen, Bai, Yuzhuo, Z., Z. Y., Ni, Zanlin, Wang, Zehao, Zhao, Zehua, Ren, Zehui, Zhao, Zejun, Sha, Zhangli, Wang, Zhanying, Zhang, Zhaochen, Du, Zhaoshuai, Fu, Zhe, Xu, Zhean, Xie, Zhenda, Liu, Zheng, Zhang, Zhengyan, Dong, Zhenhua, Hao, Zhewen, Wang, Zhibang, Gou, Zhibin, Ma, Zhicheng, Li, Zhihao, Shao, Zhihong, Huang, Zhihuan, Li, Zhijie, Lu, Zhirui, Huang, Zhixian, Chen, Zhixuan, Chen, Zhixuan, Pan, Zhixuan, Wu, Zhiyu, Ren, Zhizhou, He, Zhu, Li, Zhuoshu, Zhang, Zhuping, Xu, Zian, Wang, Zihao, Gu, Zihui, Zhu, Zijia, Zhang, Zili, Li, Zilin, Hou, Zilong, Lyu, Zilong, Wang, Ziqiao, Xie, Ziwei, Zhang, Ziya, Gao, Ziyi, Pan, Zizheng, Li, Zonglin, Yao, Zongqing, Chen, Zui, Wu, Zuofan, Ling, Chenchen, Hou, Chengyu, Chen, Chong, Li, D., Qi, Di, Ji, Dongjie, Wei, Fang, Xia, Fanyi, Xie, Fei, Tan, Feiyi, Guo, Hailong, Zhai, Haiyan, Zhou, Hui, Tan, Huihui, Li, Huijie, Luo, Jia, Song, Jia, Cai, Jialu, Liang, Jian, Zhou, Jiangting, Gao, Jiaqi, Shao, Jiayi, Chen, Jie, Yang, Jieyu, Chen, Jin, Zhang, Jingde, Zhou, Jingzi, Wang, Jinqian, Liu, Jinyang, Sun, JinZhao, Ling, Junhua, Zheng, Junmin, Yang, Kaicheng, Xu, Ke, Su, Le, Xia, Leyi, Ding, Liangfeng, Zhuo, Lin, Ma, Linwang, Zhu, Linyan, Cai, Liyu, Yao, Luqi, Zhang, M. K., Li, Meng, Lin, Miao, Wang, Miaojun, Zhang, Min, Li, Mingming, Wang, Mingming, Yin, Mingze, Han, Minmin, Cao, Nan, Wang, Ning, Ma, Ningxin, Wang, Panpan, Lin, Peihan, Sun, Peng, Zhang, Peng, Ying, Qian, Xiang, Qiang, Wang, Qiao, Mao, Qingmiao, Jiang, Qiwei, Jin, Rongli, Chen, Ruyi, Tao, Sha, Sun, Shangmian, Wu, Shaoqing, Zou, Shichao, Lei, Si, Zhang, Tianyang, Sun, Tianyu, Yin, Tingting, Xiao, W. L., An, Wei, Li, Wei, Wang, Wei, Lin, Weiwei, Hou, Wenqing, Lin, X., Meng, Xiangfei, Huang, Xianzhu, Peng, Xiao, Li, Xiaoqian, Zhang, Xiaoting, Sun, Xiaowen, Wang, Xiaoxiang, Ye, Xiaoyu, Zhang, Xinrou, Zhang, Xinyu, Cao, Xue, Chen, Xueyin, Zhou, Yanan, Xu, Yanhong, Xia, Yao, Xu, Yao, Shao, Yi, Zhang, Yihong, Ma, Yiling, Tang, Ying, Lou, Yining, Chen, Yiru, Piao, Yishi, Chen, Yixuan, Xiong, Yong, Xuan, Yuchen, Yang, Yuehan, Xu, Yuer, Zha, Yukun, Ma, Yunxian, Lin, Yuping, Yan, Yuting, Xie, Yutong, Sheng, Yuwen, Zhu, Yuxuan, Zhang, Zekai, Ju, Zhe, Lin, Zhenzhen, Gao, Zheren, Sun, Zheyang, Yan, Zhigang, Wu, Zhongyu, Wang, Zi, Qu, Zihua, Yan, Ziling, Wan, Ziyi

研究角色：主体论文（统一多模态模型）
任务标签：Long-Context Modeling、Efficient Autoregressive Generation

方法标签：Sparse Expert Computation、Attention Efficiency

中文简介：

DeepSeek-V4.1-Flash 面向输入占比高的长程代理生成：输入可达百万词元的多模态上下文及已有生成前缀，输出后续词元，同时重点压低预填充计算和键值缓存成本。其 Causal Encoder-Decoder 在预填充时激活更少参数，CSA2 跨层复用键值缓存，并以 FP4 存储；SWA Bounded Replay 进一步缩减持久缓存。相较 V4-Flash，它把优化重心从一般长上下文效率推进到预填充、显存及外存占用的协同压缩。

![DeepSeek-V4.1-Flash: Pushing the Limits of KV Cache Compression 原文图](assets/006-arxiv-2609-19969.svg)

*原文图 3：论文方法流程图（图 3）；原始图注与完整说明见图片来源。 [查看图片来源](https://arxiv.org/html/2609.19969v1/arch_full.svg)*

引用来源：user_seed

链接：[arXiv](https://arxiv.org/abs/2609.19969)

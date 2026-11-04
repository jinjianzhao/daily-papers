"""CSE547 HW1 Q1: exact mutual-friend recommendations using PySpark RDDs."""
import argparse
import json
from itertools import combinations
from pathlib import Path


REPORT_USERS = [924, 8941, 8942, 9019, 9020, 9021, 9022, 9990, 9992, 9993]


def parse_line(line):
    user, _, rest = line.rstrip("\r\n").partition("\t")
    user = int(user)
    friends = sorted({int(x) for x in rest.split(",") if x} - {user})
    return user, friends


def emit_records(row):
    user, friends = row
    for friend in friends:
        if user < friend:
            yield (user, friend), (1, 0)  # Existing friendship.
    for a, b in combinations(friends, 2):
        yield (a, b), (0, 1)  # This user is one mutual friend.


def merge_stats(a, b):
    return max(a[0], b[0]), a[1] + b[1]


def score_key(candidate):
    user, count = candidate
    return -count, user


def add_candidate(top, candidate):
    return sorted(top + [candidate], key=score_key)[:10]


def merge_tops(a, b):
    return sorted(a + b, key=score_key)[:10]


def recommend(rows, partitions=32):
    users = rows.map(lambda row: (row[0], None)).distinct()
    candidates = (rows.flatMap(emit_records)
        .reduceByKey(merge_stats, numPartitions=partitions)
        .filter(lambda row: row[1][0] == 0 and row[1][1] > 0)
        .flatMap(lambda row: [
            (row[0][0], (row[0][1], row[1][1])),
            (row[0][1], (row[0][0], row[1][1])),
        ]))
    tops = candidates.combineByKey(
        lambda candidate: [candidate], add_candidate, merge_tops,
        numPartitions=partitions,
    )
    # A left join preserves users with an empty recommendation list.
    return users.leftOuterJoin(tops).mapValues(lambda value: value[1] or [])


def main():
    from pyspark import SparkConf, SparkContext, StorageLevel

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input")
    parser.add_argument("output", help="New Spark output directory; must not exist")
    parser.add_argument("--master", help="Optional, e.g. local[4]; spark-submit can set it")
    parser.add_argument("--partitions", type=int, default=32)
    parser.add_argument("--summary", help="Optional local JSON with requested users")
    args = parser.parse_args()
    conf = SparkConf().setAppName("cse547-hw1-mutual-friends")
    if args.master:
        conf.setMaster(args.master)
    sc = SparkContext(conf=conf)
    sc.setLogLevel("WARN")
    try:
        rows = sc.textFile(args.input, minPartitions=args.partitions).map(parse_line)
        result = recommend(rows, args.partitions).persist(StorageLevel.MEMORY_AND_DISK)
        result.sortByKey().map(lambda row: str(row[0]) + "\t" +
            ",".join(str(user) for user, _ in row[1])).saveAsTextFile(args.output)
        wanted = set(REPORT_USERS + [11])
        summary = {str(user): [{"user": v, "mutual_friends": count} for v, count in top]
                   for user, top in result.filter(lambda row: row[0] in wanted).collect()}
        payload = {"users": result.count(), "recommendations": summary}
        if args.summary:
            Path(args.summary).write_text(json.dumps(payload, indent=2) + "\n")
        print(json.dumps(payload, indent=2), flush=True)
    finally:
        sc.stop()


if __name__ == "__main__":
    main()

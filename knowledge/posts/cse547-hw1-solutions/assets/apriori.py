"""CSE547 HW1 Q2(d,e): Apriori up to size three; standard library only."""
import argparse
import json
from collections import Counter, defaultdict
from fractions import Fraction
from itertools import combinations
from pathlib import Path


def mine(baskets, threshold=100):
    # A support count counts baskets, so repeated items within a basket count once.
    baskets = [set(basket) for basket in baskets]
    count1 = Counter(item for basket in baskets for item in basket)
    l1 = {item: count for item, count in count1.items() if count >= threshold}
    filtered = [sorted(basket & l1.keys()) for basket in baskets]
    count2 = Counter(pair for basket in filtered for pair in combinations(basket, 2))
    l2 = {pair: count for pair, count in count2.items() if count >= threshold}

    # Join pairs sharing the same first item, then check the third pair subset.
    tails = defaultdict(list)
    for a, b in sorted(l2):
        tails[a].append(b)
    c3 = {(a, b, c) for a, values in tails.items()
          for b, c in combinations(values, 2) if (b, c) in l2}
    by_first = defaultdict(list)
    for triple in sorted(c3):
        by_first[triple[0]].append(triple)
    count3 = Counter()
    for basket in filtered:
        members = set(basket)
        for a in basket:
            for triple in by_first.get(a, ()):
                if triple[1] in members and triple[2] in members:
                    count3[triple] += 1
    l3 = {triple: count for triple, count in count3.items() if count >= threshold}

    rules2 = []
    for (a, b), count in l2.items():
        rules2.extend([((a,), b, count, l1[a]), ((b,), a, count, l1[b])])
    rules3 = []
    for triple, count in l3.items():
        for consequent in triple:
            lhs = tuple(item for item in triple if item != consequent)
            rules3.append((lhs, consequent, count, l2[lhs]))

    def top_rules(rules):
        rules.sort(key=lambda rule: (-Fraction(rule[2], rule[3]), rule[0], rule[1]))
        return [{"lhs": list(lhs), "rhs": rhs, "support": numerator,
                 "antecedent_support": denominator,
                 "confidence_exact": str(Fraction(numerator, denominator)),
                 "confidence": numerator / denominator}
                for lhs, rhs, numerator, denominator in rules[:5]]

    def top_sets(itemsets):
        return [{"items": list(items), "support": count}
                for items, count in sorted(itemsets.items(), key=lambda row: (-row[1], row[0]))[:5]]

    return {
        "baskets": len(baskets), "threshold": threshold,
        "frequent_items": len(l1), "frequent_pairs": len(l2),
        "candidate_triples": len(c3), "frequent_triples": len(l3),
        "top_pairs": top_sets(l2), "top_pair_rules": top_rules(rules2),
        "top_triples": top_sets(l3), "top_triple_rules": top_rules(rules3),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input")
    parser.add_argument("--support", type=int, default=100)
    parser.add_argument("--output")
    args = parser.parse_args()
    with open(args.input) as stream:
        result = mine([line.split() for line in stream], args.support)
    text = json.dumps(result, indent=2) + "\n"
    if args.output:
        Path(args.output).write_text(text)
    print(text)


if __name__ == "__main__":
    main()

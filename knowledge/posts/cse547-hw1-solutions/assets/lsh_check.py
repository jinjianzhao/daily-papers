"""Finite checks for HW1 Q3; exhaustive checks illustrate, not replace, proofs."""
import json
from fractions import Fraction
from itertools import permutations
from math import comb


def check():
    cases = 0
    for n in range(1, 13):
        for m in range(n + 1):
            for k in range(n + 1):
                exact = Fraction(comb(n - m, k), comb(n, k)) if k <= n - m else Fraction(0)
                bound = Fraction(n - k, n) ** m
                assert exact <= bound, (n, m, k, exact, bound)
                cases += 1
    a, b = {1, 2}, {1, 3}
    rows = [1, 2, 3, 4]

    def first(items, order):
        return next(row for row in order if row in items)

    cyclic = []
    for start in range(4):
        order = rows[start:] + rows[:start]
        ha, hb = first(a, order), first(b, order)
        cyclic.append({"start": start + 1, "order": order, "min_a": ha, "min_b": hb})
    full_hits = sum(first(a, order) == first(b, order) for order in permutations(rows))
    cyclic_hits = sum(row["min_a"] == row["min_b"] for row in cyclic)
    jaccard = Fraction(len(a & b), len(a | b))
    assert Fraction(full_hits, 24) == jaccard == Fraction(1, 3)
    assert Fraction(cyclic_hits, 4) == Fraction(1, 2)
    return {"hypergeometric_cases": cases, "jaccard": str(jaccard),
            "all_permutations_collision": str(Fraction(full_hits, 24)),
            "cyclic_collision": str(Fraction(cyclic_hits, 4)), "cyclic_cases": cyclic}


if __name__ == "__main__":
    print(json.dumps(check(), indent=2))

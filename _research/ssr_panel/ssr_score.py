"""Semantic Similarity Rating (Maier et al., Colgate-Palmolive + PyMC Labs, 2025).

Persona agents write free-text reactions (no numbers). Each reaction is embedded
and compared to anchor statements for 1-5; the similarities become a probability
distribution, and its mean is the score. Several anchor wordings are averaged.

Usage: python ssr_score.py reactions.jsonl concepts.json
reactions.jsonl lines: {"persona": "P01", "concept": "A1", "click": "...", "love": "..."}
"""
import json, sys, collections
import numpy as np
from sentence_transformers import SentenceTransformer

# Six sets per question, short and generic, as in the paper (Maier et al. 2025, App. C.1):
# 1 = unlikely, 3 = indifferent/unsure, 5 = clear intent. pmfs are averaged across sets.
ANCHORS = {
    "click": [
        ["I wouldn't click on it.", "I probably wouldn't click on it.", "I'm not sure if I'd click on it.", "I'd probably click on it.", "I'd definitely click on it."],
        ["It's very unlikely that I'd click this.", "It's somewhat unlikely that I'd click this.", "I might or might not click this.", "It's somewhat likely that I'd click this.", "It's very likely that I'd click this."],
        ["No way, I'd scroll past.", "Probably not, I'd likely scroll past.", "Maybe, hard to say.", "Probably yes, I'd want to see it.", "Yes, I'd open it right away."],
        ["This doesn't interest me.", "This barely interests me.", "I'm indifferent to this.", "This interests me.", "This really grabs me."],
        ["Definitely not for me.", "Probably not for me.", "Could go either way.", "Probably for me.", "Definitely for me."],
        ["I'd skip it.", "I'd likely skip it.", "I don't know.", "I'd likely watch it.", "I'd watch it for sure."],
    ],
    "love": [
        ["I wouldn't enjoy it.", "I probably wouldn't enjoy it.", "I'm not sure if I'd enjoy it.", "I'd probably enjoy it.", "I'd definitely love it."],
        ["It's very unlikely I'd watch it to the end.", "It's somewhat unlikely I'd watch it to the end.", "I might or might not finish it.", "It's somewhat likely I'd watch it to the end.", "It's very likely I'd watch it to the end and share it."],
        ["That would bore me.", "That would mostly bore me.", "That's okay, nothing special.", "That's interesting to me.", "That's fascinating to me."],
        ["I'd leave early.", "I'd probably leave before the end.", "I might stay, might leave.", "I'd probably stay to the end.", "I'd stay to the end and want more."],
        ["Disappointing.", "Not very satisfying.", "Fine.", "Satisfying.", "Amazing."],
        ["I wouldn't recommend it.", "I probably wouldn't recommend it.", "I'm not sure I'd recommend it.", "I'd probably recommend it.", "I'd definitely recommend it to people."],
    ],
}


def ssr(model, texts, anchor_sets, eps=0.0):
    t = model.encode(texts, normalize_embeddings=True)
    scores = np.zeros(len(texts))
    for anchors in anchor_sets:
        a = model.encode(anchors, normalize_embeddings=True)
        sim = t @ a.T                                   # (n, 5)
        p = sim - sim.min(axis=1, keepdims=True) + eps  # paper: subtract the min similarity
        p = p / p.sum(axis=1, keepdims=True)
        scores += p @ np.arange(1, 6)
    return scores / len(anchor_sets)


def main(reactions_path, concepts_path):
    rows = [json.loads(l) for l in open(reactions_path, encoding="utf8") if l.strip()]
    concepts = {c["id"]: c for c in json.load(open(concepts_path, encoding="utf8"))}
    # bge-large tracked hand-labelled reactions best (Spearman 0.89 click, 0.98 love; mpnet 0.81/0.69)
    model = SentenceTransformer("BAAI/bge-large-en-v1.5")
    click = ssr(model, [r["click"] for r in rows], ANCHORS["click"])
    love = ssr(model, [r["love"] for r in rows], ANCHORS["love"])
    agg = collections.defaultdict(lambda: {"click": [], "love": []})
    for r, c, l in zip(rows, click, love):
        agg[r["concept"]]["click"].append(c)
        agg[r["concept"]]["love"].append(l)
    out = []
    for cid, v in agg.items():
        ck, lv = np.mean(v["click"]), np.mean(v["love"])
        out.append((ck * lv, ck, lv, len(v["click"]), cid))
    out.sort(reverse=True)
    print(f"{'rank':>4} {'id':>4} {'click':>6} {'love':>6} {'both':>6} n  title")
    for i, (both, ck, lv, n, cid) in enumerate(out, 1):
        print(f"{i:>4} {cid:>4} {ck:6.2f} {lv:6.2f} {both:6.2f} {n:2d} {concepts.get(cid, {}).get('title', '')}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])

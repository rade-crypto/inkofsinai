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

ANCHORS = {
    "click": [
        ["I would scroll right past this. It doesn't interest me at all.",
         "Probably not. It doesn't really grab me.",
         "Maybe. I might click it if I had some time.",
         "I'd probably click on this.",
         "I'd click this immediately. I have to know."],
        ["No, I would never click that.",
         "Unlikely, it's not for me.",
         "I'm on the fence about clicking it.",
         "Yes, that looks interesting enough to click.",
         "Absolutely, I'm clicking that right now."],
        ["This title and thumbnail leave me cold.",
         "It's a little interesting but I'd skip it.",
         "It's mildly intriguing.",
         "It makes me curious and I want to see it.",
         "It hooks me completely and I can't resist it."],
    ],
    "love": [
        ["I'd be bored or annoyed and leave early.",
         "It sounds dull. I probably wouldn't finish it.",
         "It's okay. I'd watch some of it.",
         "I'd enjoy this and likely watch to the end.",
         "I'd love this, watch every minute and share it with someone."],
        ["This would disappoint me.",
         "Not much here for me.",
         "Somewhat interesting, nothing special.",
         "That's a really good insight. I'd like this video.",
         "Wow. This would blow my mind and stay with me."],
        ["I don't care about this at all.",
         "I'm not very interested in this.",
         "It's fine, I'm neutral about it.",
         "I find this genuinely interesting.",
         "I find this fascinating and I'd tell people about it."],
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

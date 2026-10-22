---
title: "Mitrasaṃgraha: A Comprehensive Classical Sanskrit Machine Translation Dataset"
date: 2026-10-28
author: Dharmamitra Project
category: publications
description: >-
  A Sanskrit–English machine translation dataset of 391,548 sentence pairs spanning
  three millennia, with corrected development and test sets and benchmarks.
---

**Authors:** Sebastian Nehrdich, David Allport, Jivnesh Sandhan, Manoj Balaji Jagadeeshan, Sujeet Kumar, Sven Sellmer, Pawan Goyal, Kurt Keutzer

**Published in:** *Proceedings of the Eleventh Conference on Machine Translation (WMT 2026)*, Budapest

Accepted at the Eleventh Conference on Machine Translation ([WMT 2026](https://www2.statmt.org/wmt26/)), colocated with EMNLP 2026 in Budapest, Hungary, October 28–29, 2026.

## Abstract

Although machine translation is often considered solved for high-resource languages, it remains challenging for texts involving poetic language, philosophical concepts, and layered metaphors, characteristics that are central to Sanskrit literature. Additionally, Sanskrit's rich morphology, sandhi, and compounding, combined with its multi-millennial and multi-domain textual tradition, highlight the need for large, diverse parallel resources, which are currently scarce. We introduce Mitrasaṃgraha, a large-scale Sanskrit–English machine translation dataset containing 391,548 aligned sentence pairs, over 4 times larger than the previously available Itihāsa corpus. The dataset spans more than 3 millennia of Sanskrit literature across multiple domains and includes temporally annotated data for studying domain and period effects on translation performance. We release manually corrected development (5,587) and test (5,552) sets. Benchmarks show that fine-tuning models such as NLLB and Gemma substantially improves translation quality, and retrieval-augmented prompting further enhances performance. In a controlled cross-dataset comparison, training on Mitrasaṃgraha outperforms both Itihāsa and web-mined bitext for two model families. Despite these gains, our results reveal persistent challenges in translating complex compounds, philosophical terminology, and metaphorical language in Sanskrit, highlighting the need for further research in this area.

**[Read this article](https://sebastian-nehrdich.github.io/files/mitrasamgraha-wmt2026.pdf)**

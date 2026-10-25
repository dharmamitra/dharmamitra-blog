---
title: "One Model is All You Need: ByT5-Sanskrit, a Unified Model for Sanskrit NLP Tasks"
date: 2024-10-01
author: Dharmamitra Project
category: publications
description: >-
  ByT5-Sanskrit, a byte-level pretrained model for Sanskrit NLP, matches the best
  word segmentation model and sets new best results in Vedic dependency parsing and
  OCR post-correction.
---

Our paper **"One Model is All You Need: ByT5-Sanskrit, a Unified Model for Sanskrit NLP Tasks"** has been published in the *Findings of the Association for Computational Linguistics: EMNLP 2024*.

**Authors:** Sebastian Nehrdich, Oliver Hellwig, Kurt Keutzer

**Published in:** *Findings of the Association for Computational Linguistics: EMNLP 2024*, Miami, pp. 13742–13751

## Abstract

Morphologically rich languages are notoriously challenging to process for downstream NLP applications. This paper presents a new pretrained language model, ByT5-Sanskrit, designed for NLP applications involving the morphologically rich language Sanskrit. We evaluate ByT5-Sanskrit on established Sanskrit word segmentation tasks, where it outperforms previous data-driven approaches by a considerable margin and matches the performance of the current best lexicon-based model. It is easier to deploy and more robust to data not covered by external linguistic resources. It also achieves new state-of-the-art results in Vedic Sanskrit dependency parsing and OCR post-correction tasks. Additionally, based on the Digital Corpus of Sanskrit, we introduce a novel multitask dataset for the joint training of Sanskrit word segmentation, lemmatization, and morphosyntactic tagging tasks. We fine-tune ByT5-Sanskrit on this dataset, creating a versatile multitask model for various downstream Sanskrit applications. We have used this model in Sanskrit linguistic annotation projects, in information retrieval setups, and as a preprocessing step in a Sanskrit machine translation pipeline. We also show that our approach yields new best scores for lemmatization and dependency parsing of other morphologically rich languages. We thus demonstrate that byte-level pretrained language models can achieve excellent performance for morphologically rich languages, outperforming tokenizer-based models and presenting an important vector of exploration when constructing NLP pipelines for such languages.

**[Read this article](https://aclanthology.org/2024.findings-emnlp.805/)**

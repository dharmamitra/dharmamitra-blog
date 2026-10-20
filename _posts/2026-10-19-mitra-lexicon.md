---
title: "MITRA-lexicon: Lexica of Attested Translations from Sanskrit into English, Tibetan and Chinese"
date: 2026-10-19
author: Sebastian Nehrdich, Kengo Harimoto, Sven Sellmer and Oliver Hellwig
tags: [release, research, lexicography, Sanskrit, Tibetan, Chinese]
description: >-
  2.18 million headword entries with 10.4 million attestations, each one a sentence pair from a human
  translation with the Sanskrit word and its rendering marked. What translators actually chose, how often,
  and where, together with a look at the textual basis of Apte, Negi and Hirakawa.
---

![Two sentence pairs aligned word by word]({{ '/assets/images/mitra-lexicon-alignment.png' | relative_url }})

The standard dictionaries of Sanskrit and of its Tibetan and Chinese translations give their textual evidence,
where they give it at all, as abbreviated references to editions. The translated passage is not quoted, and
nothing tells us how often a word was rendered in a particular way. Böhtlingk and Roth's *Sanskrit-Wörterbuch*
carries some 800,000 source references in its Cologne digitization, and Apte some 44,000. To follow one of them,
a reader has to find an often outdated edition and then a translation of the passage.

What such dictionaries lack are attested translations: the renderings that translators actually chose for a word
in specific passages, each tied to the sentence pair in which it occurs and counted over the whole corpus. This is
what MITRA-lexicon provides. We have aligned 1.3 million sentence pairs of Sanskrit texts and their English,
Tibetan and Chinese translations word by word, and aggregated the alignments into lexica in both directions of each
pair:

| Pair | Headwords (sa→X / X→sa) | Senses | Attestations | Corpus |
|---|---:|---:|---:|---|
| Sanskrit–English | 418,927 / 396,289 | 950,845 | 3,293,993 | Mitrasaṃgraha |
| Sanskrit–Tibetan | 529,599 / 445,176 | 895,229 | 4,665,998 | MITRA-parallel v3 |
| Sanskrit–Chinese | 223,081 / 171,780 | 422,074 | 2,447,898 | MITRA-parallel v3 |

Every sense is a count over the corpus, and every count can be traced to its sentences. An entry of
*kṛpā*, for example, has 604 attestations in 38 senses, led by "mercy" (151), "compassion" (110) and "pity" (86),
and each of these 604 attestations is a sentence pair in which the word and its rendering are marked.

- **Search interface:** [lexicon.dharmamitra.org](https://lexicon.dharmamitra.org)
- **Data, code and gold alignments:** [github.com/dharmamitra/dharmamitra-lexicon](https://github.com/dharmamitra/dharmamitra-lexicon)
- **Word alignment model:** [huggingface.co/buddhist-nlp/qwen35-mitra-lexicon-annotation](https://huggingface.co/buddhist-nlp/qwen35-mitra-lexicon-annotation)
- **Paper:** *MITRA-lexicon: Lexica of attested translations from Sanskrit into English, Tibetan and Chinese*,
  submitted to the 9th International Sanskrit Computational Linguistics Symposium (ISCLS 2027).

## How the lexica are made

In digital Sanskrit texts a sentence is usually not a sequence of words. Sandhi merges neighboring words, and
compounds fuse several lexical units into one orthographic word. We therefore first analyze the Sanskrit side of
every sentence pair with the ByT5-Sanskrit analyzer, which gives for each
word its unsandhied form, its lemma and a grammatical tag. The headwords of the lexica are lemmas in the sense of
the Digital Corpus of Sanskrit (DCS).

We then treat word alignment as a copying task. The analyzed Sanskrit words are wrapped in numbered tags, and a
language model has to reproduce the translation exactly as it stands, inserting each number around the words that
render the corresponding Sanskrit word:

```
SANSKRIT: <1>rājā</1> <2>tu</2> <3>tam</3> <4>brāhmaṇam</4> <5>dṛṣṭvā</5> <6>prahṛṣṭaḥ</6> <7>abhavat</7>
LEMMAS:   <1>rājan</1> <2>tu</2> <3>tad</3> <4>brāhmaṇa</4> <5>dṛś</5> <6>prahṛṣ</6> <7>bhū</7>
ENGLISH:  But the king, seeing that Brahmin, was filled with joy.
OUTPUT:   But the <1>king</1>, <5>seeing</5> that <4>Brahmin</4>, <6>was filled with joy</6>.
```

The model thus finds the spans in unsegmented Tibetan and Chinese by itself, and every output can be checked
mechanically, since with the tags removed it must equal the translation. Words without a clear equivalent stay
untagged (here *tu*, *tam* and the copula *abhavat*). The figure at the top of this post shows two such alignments,
one into English and one into Tibetan.

The training data were labeled by a commercial language model (Gemini Flash) under a protocol that favors
precision over completeness. On 9,366 of its labels we fine-tuned the MITRA Qwen3.5-9B model, which had already
been adapted to Sanskrit, Tibetan, Buddhist Chinese and Pāli by continued pretraining, and ran it over the three
corpora in about 36 GPU-hours. Consecutive members of a compound that are aligned as one unit become compound
entries (*sarva-ratna* : "all the jewels"), and a few filters remove noise and headwords that reproduce typing errors
of the e-texts.

How reliable is the result? Against the dictionaries of Monier-Williams and Apte, Negi and Hirakawa, the top-ranked
sense of headwords with at least 100 attestations is confirmed in 75–90% of the cases, and one of the five
top-ranked senses in 93–99%. These are lower bounds, since many senses that a reference lacks are plain renderings
it does not record. For Sanskrit–English, three Sanskritists corrected the alignments of 100 sentences
independently. The spans of the model reach a precision of about 90% and agree with each annotator about as closely
as the annotators agree with each other. The gold alignments are released with the data.

## One word, three traditions

Because every sense is counted, the lexica show not only which renderings exist but how strongly a tradition
settled on one of them. The figure below shows, for some central terms, the share of all attestations that fall on
the most common rendering in each language.

![The share of the top-ranked sense for nine terms in English, Tibetan and Chinese]({{ '/assets/images/mitra-lexicon-three-languages.png' | relative_url }})

The Tibetan and Chinese translators converged on a standard equivalent to a degree that the English translators,
each working independently, never did. *dharma* is *chos* in 97% of its 36,926 Tibetan
attestations and 法 in 95% of its 32,674 Chinese ones. In English, the lexicon records 686 different renderings of
*dharma*, and the most frequent of them, the untranslated "dharma" itself, accounts for only 16% of its
attestations, followed by "virtue" (12%), "righteousness" (8%) and "duties" (7%).

The same holds for the lexica as a whole. Over all single-word headwords with at least 100 attestations (3,873 for
English, 3,773 for Tibetan and 2,358 for Chinese), the top-ranked sense accounts in the median for 32% of the
attestations in English, 42% in Tibetan and 50% in Chinese, and it takes ten senses in English to cover 80% of the
attestations of such a headword, against five in Tibetan and four in Chinese. For Tibetan these figures understate
the standardization, since the lexicon records renderings as they occur and so counts *snying rje*, *snying rje'i*
and *snying rjes* for *karuṇā* as separate senses.

The exceptions are as telling. *prajñā* is spread in Chinese over 知 (26%), 慧 (24%), 智慧 (17%), 般若 (8%) and 智 (8%),
whereas Tibetan settled on *shes rab* (67%). For *nirvāṇa*, Chinese has 涅槃 in 85% of the attestations and the older
泥洹 in 3%. *tathāgata* is 如來 in 70% of the Chinese attestations and 佛 in 28%.

## Translators leave fingerprints

The English lexicon brings together the work of more than forty translators, and the attestations show each
translator's choices. In the figure below each row is one translation, and the bars give the share of its renderings
of the word (singular and plural counted together).

![English renderings of dharma, ātman, tapas and brahman, by translation]({{ '/assets/images/mitra-lexicon-translators.png' | relative_url }})

Pruden keeps *dharma* untranslated in the *Abhidharmakośabhāṣya*, Bühler renders it "law" in the *Manusmṛti*, Speyer
"righteousness" in the *Jātakamālā*, and Jha "property" in the *Tattvasaṅgrahapañjikā*, a work of epistemology and
logic. For *ātman*, Jha has "self" in 87% of his attestations in Śaṅkara's commentary on
the *Chāndogya Upaniṣad*, and Eggeling has "body" in 59% of his attestations in the *Śatapatha Brāhmaṇa*, where
*ātman* is often the trunk of the body or of the fire altar. *brahman* is "prayer" for Oldenberg in the *Ṛgveda*,
"holy power" for Keith in the *Taittirīya Saṃhitā* and "priesthood" in 17% of Eggeling's attestations, while the
purāṇa translators mostly render the god Brahmā. *tapas* is "penance" in 84% of Tagare's attestations in the
*Skandapurāṇa*, "austerity" in 81% of Jha's in Medhātithi's commentary on Manu, and "heat" or "fervour" in the Vedic
translations of Eggeling, Keith and Griffith.

The fingerprints also mean that the lexicon inherits the weight of its largest translations. Tagare's translation of
the seven-khaṇḍa *Skandapurāṇa* (830,897 attestations) and Ganguly's *Mahābhārata* (576,228) together account for 43%
of the attestations of the Sanskrit–English lexicon, and their conventions are correspondingly prominent among the
top-ranked English senses of common words. Since every attestation names its text, the interface groups the senses
of an entry by collection and text, so that such conventions can be separated from each other.

## What the reference dictionaries rest on

To evaluate the lexica, we compared them with the dictionaries of the field, and in the process looked at what these
dictionaries are themselves based on. Most of this did not fit into the paper, but it is a part of the history of
our dictionaries that is rarely quantified.

![The textual basis of Apte and Negi compared with that of MITRA-lexicon]({{ '/assets/images/mitra-lexicon-textual-basis.png' | relative_url }})

**Apte.** 35% of the entries of Apte's *Practical Sanskrit-English Dictionary* (1890) carry at least one source
reference, and 44,485 of these references can be resolved through the list of abbreviations of the Cologne
edition. Three quarters of them point to classical poetry and drama, above all Kālidāsa. The *Raghuvaṃśa* alone
accounts for about 14% of them. Another 11% point to the *Manusmṛti*, the *Yājñavalkyasmṛti*, Nārada and the
*Bhagavadgītā*. The epics and purāṇas, which make up more than half of our Sanskrit–English attestations, are cited
in about 2% of Apte's references. The two resources thus document largely different parts of the language,
which is one reason why our agreement with Apte and Monier-Williams can only be partial.

**Negi.** J. S. Negi's *Tibetan-Sanskrit Dictionary* is the one reference among those we used that
quotes its passages, and its citations can be counted. In the digitization we used, its 78,972 Tibetan headwords
yield 191,307 Tibetan–Sanskrit pairs. A seventh of these pairs (14.5%) are documented only in lexical works or not
at all. Of the citations, about 119,000 are to texts and about 22,000 to lexical works, led by the Mahāvyutpatti
(6,953) and the Amarakośa (4,628). Many headwords rest on very little: 34% cite no text and another 45% a single
one.

The textual citations are concentrated as well. Ten sources supply half of them, three *avadāna* and *jātaka*
collections alone almost a fifth, and the Pramāṇa works, above all the *Tattvasaṅgraha* with its *Pañjikā*, another
15%. The Prajñāpāramitā literature, a sixth of our Sanskrit–Tibetan attestations, contributes under 2%, and the
tantric literature, our largest domain, a tenth. Negi's most frequently cited text, Kṣemendra's
*Bodhisattvāvadānakalpalatā*, is cited 12,634 times. The digital edition available to us contains only its pallavas
1–48 of 108, and 41% of Negi's citations of it are to the pallavas 49–108. Negi's citations also do not mark
evidence that was itself reconstructed. He cites the *Madhyāntavibhāgaṭīkā* from Pandeya's edition (1971), and 22 of
his 224 citations of it quote passages that the previous editors had restored from the Tibetan translation.

**Hirakawa.** Hirakawa's *Buddhist Chinese-Sanskrit Dictionary* (1997) names no sources at all. Its sources can,
however, be inferred from where its Chinese occurs. We searched every Chinese headword of Hirakawa of two to eight
characters in all texts of the DharmaNexus Chinese collection, which includes the Taishō canon, the supplement to
the canon and non-Buddhist literature, and found 78,048 of 88,669 of them (88%). Each headword was then credited to
the texts in which it occurs, weighted by the inverse of their number, so that a word found in a single text counts
fully for that text. Only headwords that occur in at most 50 texts were counted.

![The texts in which Hirakawa's vocabulary is concentrated]({{ '/assets/images/mitra-lexicon-hirakawa-sources.png' | relative_url }})

Hirakawa's vocabulary is concentrated much like Negi's. 76 texts carry half of the weight, and Paramārtha's
translation of the *Abhidharmakośabhāṣya* (T1559) alone a tenth, with 3,955 headwords that occur in no other text of
the collection. The *Kośa* and the Sarvāstivāda Abhidharma around it dominate the list, Xuanzang's translation (T1558)
and Saṅghabhadra's *Nyāyānusāra* (T1562) and *Abhidharmasamayapradīpikā* (T1563) among them. That the Chinese
commentaries on the *Kośa* by Puguang, Fabao and Yuanhui also rank high reflects the fact that they quote its
wording. Beside the Abhidharma stand the *Yogācārabhūmi* (T1579), the *Sarvatathāgatatattvasaṃgraha* (T882) and the
*Ratnagotravibhāga* (T1611), works whose Sanskrit has survived at least in part. Many of Hirakawa's entries are phrases tied to one
passage (*puruṣendriyādhiṣṭhānavat* : 如男根依止), which a dictionary built from word alignments does not produce.
Still, 70% of Hirakawa's pairs with a Chinese of at least two characters are senses of our lexicon, co-occur in one of
our sentence pairs, or can be composed from our entries.

None of this is a criticism of these dictionaries, which were compiled by hand from the editions available at the
time. It shows, however, how narrow the textual basis of even the best reference works is compared with what can now
be read in digital form, and why a lexicon that counts every attestation in a corpus complements them rather than
replacing them.

## Using the lexicon

The lexica can be searched at [lexicon.dharmamitra.org](https://lexicon.dharmamitra.org) from either language of a
pair. Sanskrit may be typed with or without diacritics (*karuna* finds *karuṇā*), and Tibetan in Tibetan script or
in Wylie. An entry lists its senses with their counts, grouped by collection and text, and each citation shows the
Sanskrit sentence and its translation with the word and its equivalent highlighted on both sides.

The lexica, the word alignments of every sentence pair with their quality signals, the training data, the gold
alignments and the code are available at
[github.com/dharmamitra/dharmamitra-lexicon](https://github.com/dharmamitra/dharmamitra-lexicon). Since every
attestation reproduces its sentence pair, the Sanskrit–English lexicon inherits the licenses of the texts of
Mitrasaṃgraha and is released in two versions, one under CC BY-SA 4.0 with the attestations from texts under that
license (92.3% of all attestations), and the complete lexicon under CC BY-NC-ND 4.0. The Sanskrit–Tibetan and
Sanskrit–Chinese lexica are released under CC BY-SA 4.0.

The lexica are not error-free. Errors of the Sanskrit analyzer and of the e-texts carry over into entries under
wrong lemmas or with wrong compound boundaries, and they collect in the long tail of rare headwords. We would be
grateful to hear about errors and about uses of the lexicon at dharmamitra-project@gmail.com.

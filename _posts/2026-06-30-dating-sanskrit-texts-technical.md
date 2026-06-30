---
title: "Putting Dates on 1,800 Sanskrit Texts: How the Model Works"
date: 2026-06-30
author: Dharmamitra Project
tags: [research]
description: >-
  A technical look at how we assigned dated chronologies to ~1,800 Sanskrit
  works — combining the direction of textual borrowing, morphological
  stylometry, and a hierarchical Bayesian sampler that fuses scholarly anchors
  with both signals.
---

Dating Sanskrit texts is hard for a reason that has nothing to do with missing
manuscripts. Pāṇini normatively *froze* the language more than two thousand
years ago, so the raw vocabulary of a 5th-century treatise and a 15th-century
one can look almost identical. The usual stylometric trick — track how word
choice drifts over time — barely moves the needle.

So we built a dating pipeline around a different premise: you can recover a
**relative** chronology of the corpus from two signals that *don't* depend on
genre — the **direction in which texts borrow from one another**, and the
**grammatical style** in which they're composed — and then pin that relative
ordering to **absolute** dates using a Bayesian model anchored on the works
historians have already dated.

The result is a dated chronology for **1,829 works** (1,362 with external
anchors, 467 inferred purely by the model), each with a full credible interval
rather than a single guess. Here's how the core of it works.

## The three signals

### 1. The direction of borrowing

Sanskrit texts quote, paraphrase, and absorb each other constantly. Our
upstream BuddhaNexus pipeline already detects these parallel passages across the
corpus — roughly 1,700 files of near-duplicate matches, each recording the two
segments involved, a similarity score, and the length of each side.

An undirected "who-shares-with-whom" graph can't date anything on its own. The
key move is **orienting** each edge — deciding which text is the source and
which is the borrower. We infer direction from two cheap, log-ratio features:

- **Expansion.** Of two texts sharing a passage, the side where the passage is
  *shorter* tends to be the later one — anthologizing and extraction shrink
  material more often than they pad it.
- **Breadth.** The text that shares material with *more* partners across the
  corpus tends to be later, having had more predecessors to draw on.

We combine them into a single score, `s = 1.0·expansion + 1.5·breadth`, and only
orient an edge when the signal is strong enough (`|s| ≥ 1.0`). Crucially, this
rule isn't hand-waved: we validate it against pairs of texts whose true order is
already known from non-overlapping scholarly date intervals, and sweep the
threshold to trade coverage against accuracy. The undirected smoothing baseline
lands at a mean absolute error of ~296 years; adding direction improves on it.

### 2. A grammatical clock, not a vocabulary clock

Since the lexicon is frozen, we read *style* instead — the grammatical
fingerprint of how a text is composed. Each work is split into chunks of 100
segments, and every chunk gets a dense feature vector of **184 features**:

- **Compounding density** — later Sanskrit famously stacks up long compounds, so
  we measure compound-member rate, mean compound length, and the rate of
  three-plus-member compounds.
- **Morphology rates** — normalized proportions of tenses, moods, voices, cases,
  and verb forms (optatives, gerundives, periphrastic and aorist formations…).
- **POS transition patterns** — unigram and **bigram** rates over a 12-symbol
  part-of-speech alphabet (144 bigrams), capturing syntactic habits that shift
  with composition era.

To that we add **function-word n-grams** — bigrams and trigrams over the 100
most frequent lemmas — TF-IDF weighted and compressed to 50 dimensions with a
truncated SVD. The full feature matrix is 234 dimensions per chunk, across
**65,182 chunks**.

A gradient-boosted regressor (scikit-learn's `HistGradientBoostingRegressor`)
maps these features to a date. But a single global style→date model is
dangerous: Vedic anchors would distort the estimate for a tantric text. So we
fit a **separate clock per category** wherever there are enough anchored works
to support one, with a hierarchical fallback — a fine-grained clock keyed to the
text's GRETIL shelf code, backing off to a coarse tradition/genre bucket
(Vedic, Epic, Purāṇa, Kāvya, Śāstra, Buddhist canon, tantric…), backing off to a
single global clock. The production run used 10 fine clocks, 4 coarse clocks,
and the global fallback.

Every prediction is honest out-of-fold: we use `GroupKFold` grouped by work, so
chunks of the same text never leak between training and test folds. A work's
linguistic date estimate is the median of its out-of-fold chunk predictions.

### 3. Anchors and external constraints

The absolute dates have to come from somewhere. We collect them as a set of
**soft and hard constraints**:

- **Anchors** — closed date intervals from scholarship, plus prefix-based Vedic
  anchors and several curated constraint tables.
- **Ordering constraints** — e.g. a root text precedes its commentary. We derive
  these automatically by detecting commentary levels from title keywords (a
  sūtra or kārikā precedes its bhāṣya, which precedes its ṭīkā), emitting
  earlier→later pairs only within the same base title.
- **Termini ante quem** — when a text was translated into Chinese on a known
  date (via Taishō numbers), it must predate that translation, minus a lag.

The production run fed the model 1,374 manual constraints, 52 ordering pairs,
and 41 translation termini (with zero conflicts).

## Fusing it all: a hierarchical Gibbs sampler

The heart of the model (`date_gibbs_full.py`) is a single hierarchical Bayesian
sampler that fuses everything above. Each work's date is drawn from a Gaussian
posterior that combines three precision-weighted terms:

1. the **linguistic estimate** from its category clock — with its noise inflated
   for short texts that have few chunks, so we trust the clock less when there's
   less of it to read;
2. the **scholarly anchor** midpoint, weighted by how tight the interval is
   (a 50-year interval pulls harder than a 500-year one); and
3. a **partially-pooled category mean** — works in the same tradition shrink
   gently toward a shared mean, which itself shrinks toward a global hyperprior.

Hard constraints — ordering, termini ante quem, "not before" bounds — are
enforced by **truncated-normal sampling**: a constrained work is only ever drawn
within its feasible window. Variance components (within-category spread,
linguistic noise) are resampled each iteration. We run 6,000 iterations with a
1,500-iteration burn-in across 74 hierarchical categories, and read off a full
posterior — and hence a credible interval — for every work.

## How well does it work?

We evaluate honestly by **dropping each anchor's own interval** and asking the
model to re-derive it. The headline numbers:

- **Spearman correlation of 0.723** between the held-out estimates and the
  scholarly midpoints — the *ordering* is the strong, reliable product, which is
  exactly what a relative-chronology-first design should deliver.
- **Median error of ~98 years** to the nearest edge of the scholarly interval.
- Posterior credible intervals with a median width of 231 years (177 for
  anchored works; naturally much wider for works with no external date at all).

A note on honesty: only ~27% of held-out works land strictly *inside* their
(often quite narrow) scholarly interval. That sounds modest until you remember
the median anchored interval is just 177 years wide — the rank correlation and
the ~98-year median edge error are the better measures of what the model
actually delivers.

Perhaps the most interesting downstream use is **auditing scholarship itself**.
The held-out routine surfaces 567 anchors where the model puts less than 10% of
its posterior mass on the accepted date — a ranked list of datings worth a
second look, generated automatically.

## What the model measures — and what it doesn't

This is the part worth reading slowly, because it's easy to ask the map a
question it can't answer.

The model dates **the digital witness as it exists in our database** — the
Sanskrit text we actually have in front of us — not some hypothetical earlier
form of the work. That distinction matters enormously for Buddhist literature.
Much of the Sanskrit sūtra and vinaya material was heavily Sanskritized from
earlier Middle Indic and Gāndhārī sources, and we hold no digital witness of
those earlier stages. So for many of these texts the estimate is best read as
something closer to **the date of their Sanskritization** than the origin of the
underlying tradition. A linguistically-driven method simply cannot see a stage of
the language for which it has no text — and we'd rather be honest about that than
quietly date a Sanskrit witness into the centuries BCE on the assumption that an
earlier version once existed.

This also explains an asymmetry some readers notice: Vedic material was
transmitted largely in the language of its reported period, so its anchors behave
differently from Buddhist material we mostly encounter in later recensions.
Adding Pāli, Gāndhārī, or other Middle Indic material would meaningfully change
the shape of the map — but that's a future project, gated on building grammatical
analyzers (compound, case, and verbal-system tagging) for those languages first.

Two more things to keep in mind:

- **It's statistical, not generative.** Dates come from measurable linguistic
  features, Bayesian modeling, and human priors — not from a model "guessing"
  plausible-sounding answers. Where scholarship has dated a text, that prior is
  treated as a hard constraint and overrides the linguistic signal.
- **Read the interval, not a midpoint.** Each estimate is a lower and upper
  bound, and the shading of each point reflects how confident the sampler is.
  The map is best read as a *general orientation* of the temporal layout — not a
  verdict that one text predates another by a precise number of years.

## Where it's reliable — and where it isn't

The single most consistent lesson from building this: **the method is far more
reliable within a single domain than across many.** Relative chronology inside
one genre or tradition is the strong, trustworthy product. Across domains, genre
effects tend to overpower temporal drift — especially for verse — which is
exactly why the per-category clocks above exist.

A known bias: because the corpus is light on pre-Common-Era material, the model
tends to drift toward the *later* end of a range when uncertainty is high. Some
of that may be survivorship — the witnesses that physically come down to us are
often later recensions — and the more fine-grained predictions can still recover
earlier layers when you look closely.

So what is a map like this actually good for? Not groundbreaking precise dates —
for a language with as difficult a "hard data" situation as Sanskrit, no purely
linguistic method will deliver those. What it *can* surface are the larger
movements: broad shifts in textual production, the settling of a written culture
and its narrowing effect on what survives, and a general sense of how the corpus
lays out in time. And because every anchor is correctable, spotting something
that looks wrong is a contribution, not a dead end — we'd genuinely like to
improve the attributions iteratively, with the field's help.

## The stack

The whole pipeline is plain Python 3 — NumPy, SciPy (sparse graphs, MSTs,
truncated-normal CDFs, sparse linear solves), and scikit-learn for the
gradient-boosted clock and cross-validation. The interactive timeline is built
with Plotly and published on GitHub Pages. No deep learning, no GPUs — just
classical ML and Bayesian inference applied to a problem where the right *signal*
mattered far more than the size of the model.

---

*This post covers the technical core. We'll follow up with the findings
themselves — what the model says about contested datings, and where it agrees
and disagrees with the scholarly consensus.*

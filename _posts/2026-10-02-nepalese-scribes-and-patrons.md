---
title: "Nepalese Scribes and Patrons: a Prosopography from Colophons and Inscriptions"
date: 2026-10-02
author: Kengo Harimoto
tags: [research, prosopography, manuscripts, inscriptions, Nepal]
description: >-
  A register of about 2,800 scribes, patrons, kings and officials named in Nepalese
  manuscripts and Licchavi inscriptions, built from the NGMCP catalogue, Bendall's
  Cambridge catalogue and the Licchavi e-texts, with every date recalculated from the
  colophon and checked against its weekday.
---

![The early part of the timeline, with the detail panel for a scribe]({{ '/assets/images/nepalese-scribes-timeline.png' | relative_url }})

When I was working for the NGMCP, looking at colophons, I had the idea that what if we collect all the names and dates from the colophons, and build a register of the people named in Nepalese manuscripts? I was interested in teacher disciple relationships. I thought we might have a nice lineage of teachers and scholars who wrote the manuscripts. In this way, if some manuscripts were not dated, we might have an approximate idea of when they were written. The same in fact goes with scribe, patrons, kings, and other people who contributed to the manuscripts. Little had I known, that a study like this is called prosopography.

I started to experiment a little but very quickly gave up. It is so much work. I believe many people have had such an idea but the impracticality of the task must have kept many from pursuing it.

Things changed. What I present here was prepared in less than 6 hours. Granted, I already had necessary data in the electronic form. Still, I would have had to write a lot of code to process it, checking results every time and improving codes. The original electronic data had so many inconsistencies. This is an example of how AI can help massively accelerate research.

This post reports on an attempt to present an aggregate of a register of the people named in Nepalese manuscripts and in the Licchavi inscriptions, with their dates, roles and relations, and an interactive chart through which it can be explored.

- **Chart:** [kengoharimoto.github.io/nepalese-scribes](https://kengoharimoto.github.io/nepalese-scribes/)
- **Data and code:** [github.com/kengoharimoto/nepalese-scribes](https://github.com/kengoharimoto/nepalese-scribes)

![Dated manuscripts per decade, coloured by era]({{ '/assets/images/nepalese-scribes-histogram.png' | relative_url }})

## Sources

**The NGMCP data.** The data from the Nepal-German Manuscript Cataloguing Project
(NGMCP) came in two forms. One is a collection of html files that was converted from the orignal Word files (gasp) that the catalogers produced when the project was run. The html files in turn became the source of the NGMCP descriptive catalogue that existed as a wiki. They cover 13,382 entries covering 11,861 microfilmed manuscripts. Each entry quotes the
beginning, end and colophon of the manuscript and has fields for scribe, date, place,
king and donor. The entries were written by many cataloguers over two decades, and
the fields are far from uniform: "Devanagari" appears in some sixty spellings, the
material in 138 forms, and notes are often typed into the wrong field. The entries
were parsed into a database with every field normalised next to its original
value, and joined with the NGMCP title list (117,407 titles). The join brings out
5,918 places where the two disagree (folio counts, sizes, dates), and 2,899
manuscripts that were microfilmed more than once (3,033 retakes). And this process of detecting the inconsistencies and coming up with a consistent view of the data would have been very impractical for a human. AI did these in less than 10 minutes.

Another data came from the NGMCP title list online application. It was a data dump produced as a backup of the database. It had 117,407 entries.

Merging these two datasets, which originally had very different data structure, would have been very impractical for a human.

**Bendall's Cambridge catalogue.** Cecil Bendall's *Catalogue of the Buddhist
Sanskrit Manuscripts in the University Library, Cambridge* (1883) describes the
manuscripts Daniel Wright brought from Nepal, among them the oldest dated Nepalese
manuscripts. The 1992 reprint was OCR'd with Chandra (datalab), which reads the
Devanāgarī colophons well, and parsed into 248 entries. Composite numbers such as
Add. 1680 were split into their parts, giving 319 manuscripts.

**The Licchavi inscriptions.** I have used a collection of e-text editions of 198 inscriptions of the Licchavi period (5th–9th century), each with a concordance to the editions of Gnoli,
Dhanavajra Vajracarya, Regmi and others.

## Reading the colophons

[Mostly Claude Opus's prose below. The author's text is in the brackets.]

Each colophon (and each inscription) was read by a language model to detect human names.
Gemini Flash made a first reading of 3,775 texts and returned every human name
with their roles (scribe, commissioner, donor, owner, king, dūtaka, official, …),
titles, residence and the evidence in the text, along with the relations between
them (son of, wrote for, under the reign of) and the date as written. Where the
first reading was uncertain, or disagreed with the cataloguer's fields, Claude Opus
read the text a second time, given the first reading (693 texts). The second pass
often corrected roles and names: for example, it separated a commentator's father
from the people who made the copy, read a corrupt chronogram, or noticed that
*śukla-pañce* in an OCR'd colophon stands for *śukla-pakṣe*, so that no tithi is
stated.

Names were then grouped across manuscripts by a normalised form without honorifics
and caste or office titles. [AI determined what are honorifics, caste or office titles, too.] Homonyms are separated by date only: a name becomes two persons where its dated
attestations are more than 40 years apart, or where one career would exceed 60 years. [Another AI implementation] The result is a
register of 2,824 persons: 1,504 scribes, 522 patrons and owners, 276 kings, 222
officials, teachers and others, and 300 relatives named only to identify someone,
linked by 1,027 explicit relations.

## Dates from the colophons, checked by the weekday

Catalogues in most cases convert dates with a fixed offset (Nepāla Saṃvat + 880, Vikrama
Saṃvat − 57) without actually calculating them. That is right to within a year at best. Nepāla Saṃvat begins in Kārttika, so a date in Kārttika to Pauṣa falls a year earlier than the offset says, and the offset tells us nothing about whether the date is sound at all.

Every date was therefore recalculated from the elements the colophon states (era,
year, month, pakṣa, tithi, weekday, nakṣatra) [with a modified version of] the *Pañcāṅga* program of Michio
Yano and Makoto Fushimi, computed for Kathmandu. [The modification added the Nepala saṃvat as a possible calendar choice.] Where a weekday is stated, the
date can be checked: the computed day must fall on that weekday. About 1,060 NGMCP
colophons state enough to be checked this way.

The data themselves settle some conventions. Under the standard reading, two thirds
of the fully stated Nepāla Saṃvat dates fall on the stated weekday, against one in
seven by chance, with amānta months. Vikrama and Śaka dates in the dark fortnight
match only with pūrṇimānta months (97 against 17 for Vikrama). Lakṣmaṇasena dates
match at chance level under every epoch from LS + 1103 to + 1123, so they are
converted but never called verified.

How much does "verified" mean? To find out, every date was checked a second time with
its weekday deliberately moved by two, three or four days. Only about one wrong date
in twenty passes as verified. Allowing one departure from the standard reading (a
tithi current later in the day, or the other month system) rescues about half of
the real dates that fail, and about one wrong date in ten. Other departures (a
current year, a Kārttikādi year) fit wrong dates almost as often as right ones and
are accepted only together with a matching nakṣatra.

| NGMCP dates (3,392 in all) | number |
|---|---:|
| verified by the weekday (standard reading) | 656 |
| verified with one departure | 201 |
| weekday stated but not fitting | 193 |
| computed (month and tithi, no weekday) | 1,166 |
| year only (± 1) | 1,167 |

397 dates move by a year or more. Most are the Kārttika–Pauṣa cases. 34 move by more
than a year, because the colophon's own year verifies and the catalogue's does not:
A 980/20 is NS 949 (1829), not the catalogue's NS 494; the chronogram of A 177/18
yields 991 and verifies, nakṣatra and all, as Wednesday 21 June 1871. Paper
manuscripts dated before 1300 (31) are treated as undated: their years are
abbreviated or misread, or belong to the exemplar.


[The AI was prompted to recalculate Bendall's dates for the reason that immediately follows.]
Bendall converted his dates himself, at a time when the Nepalese calendar was little
understood. Add. 866, the Aṣṭasāhasrikā copied in the joint reign of Nirbhaya and
Rudradeva, is not 1008 but Monday 31 January 1009, a year later than the standard
reading, which the stated Uttarabhādrapadā supports. Add. 1348 is not A.D. 1807 but
1817 (NS 937). Add. 1703 confirms Bendall's NS 549 against the OCR's 547: Saturday
3 September 1429, with Viśākhā as stated.

## The Aṃśuvarman Saṃvat

[I also instructed the AI to recalculate all the Aṃśuvarman/Mānadeva saṃvat dates.]
Bendall dated Add. 1049 by the Harṣa era. Following Kamal P. Malla ("Mānadeva
Samvat: an investigation into an historical fraud", *Contributions to Nepalese
Studies* 32.1, 2005), the so-called Mānadeva saṃvat is not an era of its own but the
Kārttikādi current Śaka with 500 dropped, used from Aṃśuvarman's year 29, and the
earlier Licchavi saṃvat (386–535) is the same era [basically the Śaka] with the hundreds kept. This
reading fits the only two Licchavi-period dates that name a weekday: Aṃśuvarman's
gold repoussé at Cāṅgu (saṃvat 31 Māgha śukla 13, Sunday, Puṣya) falls on Sunday
4 February 608, and the Suśrutasaṃhitā colophon (saṃvat 301 Vaiśākha śukla 7,
Sunday, Puṣya) on Sunday 13 April 878. It also gives NS 1 = AS 304, the traditional
reckoning. The repoussé needs one more adjustment: before about 1100, intercalary
months were set by the mean sun, so a lunation could carry its neighbour's name, and
our program, which uses the true sun, calls that lunation Phālguna.

On this reading Add. 1049 dates from 829, and Mānadeva's Cāṅgu pillar (saṃvat 386
Jyeṣṭha śukla 1, Rohiṇī) from 5 May 463, a year before the usual 464. On that day
the moon is in Rohiṇī at sunrise, as the inscription says, whereas on the usual
date it is in Kṛttikā. This favours Malla's reading only slightly, since the
inscription names a midday muhūrta. Apart from the repoussé, no Licchavi date can be
verified, and the chart says so for each of them.

## The chart

The chart lists persons on a timeline by their dated attestations and shows, for
the selected person, each manuscript or inscription with its date (and how it was
obtained), the role, the evidence in the colophon, and the other people named with
them. A network view places persons by date and links kin, teacher and pupil,
scribe and patron, and subjects and their king. Undated manuscripts get an estimated
date from the kings and people they name (232 estimates). The register runs from
Mānadeva in the fifth century, through Aṃśuvarman and the later Licchavis, the
kings of the Transitional period, and the Mallas of the three cities (Bhūpatīndra
Malla of Bhaktapur appears in 87 manuscripts), to the Śāha period.

## Limitations

- The register is only as good as the catalogue's quotations and the models'
  readings of them. Each attestation is marked with its source (catalogue field,
  first reading, second reading) and quotes its evidence, so it can be checked.
- Grouping by name and date merges people who share a name in the same generation,
  and splits a person attested over more than 60 years.
- Licchavi persons are kept apart from the persons of manuscripts, and ancestors
  named only in royal genealogies are left out.
- Most dates cannot be verified: they state no weekday. "Computed" means the day is
  the one the colophon names under the standard reading, not that it has been
  checked.

## Acknowledgements

The NGMCP catalogue (University of Hamburg; a mirror is published under CC0 at
[INDOLOGY/NGMCP-Descriptive-Catalogue](https://github.com/INDOLOGY/NGMCP-Descriptive-Catalogue));
Cecil Bendall's catalogue of 1883; the e-text edition of the Licchavi inscriptions prepared by D. N. Lielukhine;
M. Yano and M. Fushimi's *Pañcāṅga*; Kamal P. Malla's study of the Mānadeva saṃvat;
Chandra OCR. The colophons were read by Gemini Flash and Claude Opus, and the
pipeline was built with Claude Code.

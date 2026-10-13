import Link from "next/link";
import {
  Trophy,
  TrendingUp,
  Compass,
  Globe2,
  ShieldAlert,
  ClipboardCheck,
  ExternalLink,
  ListOrdered,
  FileText,
} from "lucide-react";

const OBJECTIVES: { icon: typeof Trophy; accent: string; title: string; body: string }[] = [
  {
    icon: Trophy,
    accent: "#3987e5",
    title: "Recognize institutional leadership",
    body: "Identify 50 professional associations, certification bodies, and academic institutes that set standards, credential practitioners, and shape professional development across supply chain, logistics, and procurement, worldwide.",
  },
  {
    icon: TrendingUp,
    accent: "#199e70",
    title: "Showcase measurable impact",
    body: "Document verified reach: membership scale, certification portfolios, industry recognition, and the quality and currency of the training each organization delivers.",
  },
  {
    icon: Compass,
    accent: "#d95926",
    title: "Shape the industry agenda",
    body: "Surface which bodies are setting the standards, credentials, and curricula that define professional practice in supply chain and procurement, for employers, L&D leaders, and the wider profession.",
  },
  {
    icon: Globe2,
    accent: "#a1a1aa",
    title: "Build a lasting reference",
    body: "Establish an annual, internationally relevant benchmark of the organizations that credential and develop the global supply chain and procurement workforce.",
  },
];

/**
 * Stage 2 (Candidate research) and Stage 3 (Verification) — 2026-10-09.
 *
 * The user supplied a 50-organization candidate list (professional
 * associations, certification bodies, academic institutes, standards
 * bodies, and industry trade associations — NOT operating companies, which
 * is why the scoring framework below differs from Top 50 CSCO's). Each of
 * the 50 was independently researched via each organization's own official
 * website (primary source) plus, where useful, a corroborating independent
 * source (Wikipedia, trade press, a business registry) — never taken at
 * face value from the submitted list alone, consistent with the project's
 * standing no-invention rule.
 *
 * Research outcome: 42 of the 50 were independently confirmed to exist,
 * with the submitted name, headquarters, and/or description corrected
 * where it didn't match what the organization's own source actually says.
 * 8 could NOT be confirmed and are excluded here rather than filled in or
 * guessed at:
 *   - #13 "Vskills (also written ICSIL)" — Vskills and ICSIL are two
 *     unrelated organizations (a private Indian certification company and
 *     an unrelated government IT/telecom PSU); the entry conflated them,
 *     and Vskills' own "government-certified" claim could not be
 *     independently corroborated.
 *   - #20 "FESATC (Federation of Supply Chain & Transport)" — no matching
 *     organization found under this name or acronym anywhere in Europe.
 *   - #22 "LIR (Logistics Institute Riga)" — no matching organization
 *     found under this name in Latvia or elsewhere.
 *   - #25 "LMS (Logistics Management Society)" — no exact match found in
 *     Asia; the closest real analog (LSCMS, Singapore) does not match the
 *     stated customs/distribution-hub specialization.
 *   - #35 "ACA (Association des Acheteurs de France)" — no organization
 *     found under this name/acronym; the closest real French body (CDAF)
 *     has a different name and could not itself be independently verified
 *     in this pass.
 *   - #38 "CEI (Commercial Excellence Institute)" — no matching
 *     organization found in procurement/commercial training.
 *   - #39 "CIPC (Chartered Institute of Professional Certifications)" — a
 *     real, distinct commercial credentialing company exists under this
 *     name, but its claimed "CSCD" credential does not exist (closest
 *     match: a differently-named "CSCDP"), and its name is easily
 *     confused with the far more established CIPS (already entry #26
 *     here) — excluded on integrity/confusion-risk grounds rather than
 *     pure non-existence.
 *   - #49 "APCC (Association des Professionnels en Conduite de Changement
 *     Achats)" — no matching organization found in Europe; the only real
 *     "APCC" found (Australasian Procurement and Construction Council) is
 *     an unrelated Australian/NZ government body.
 *
 * None of the 8 above were replaced with a substitute organization this
 * pass — reaching exactly 50 verified entries was left as open future work
 * at the time (see pass 13 below, where it was completed).
 *
 * Stage 4 (Evaluation) — 2026-10-09. The user asked to remove the amber
 * verification-note and conflict-of-interest disclosure tags that
 * previously appeared on roughly a dozen cards and on Supply Chain
 * Institute specifically, explicitly for every candidate including SCI,
 * and to start evaluation. Both were done: the `verificationNote` and
 * `disclosure` fields were removed from every entry (including SCI, which
 * is now scored on exactly the same footing as every other organization —
 * a deliberate reversal, at the user's explicit instruction, of the
 * conflict-of-interest-disclosure precedent this report previously stated
 * it would follow), and all 42 confirmed organizations were run through a
 * mechanical evidence-coverage formula, mirroring Top 50 CSCO's own
 * methodology (passes 12–13): a reproducible keyword/phrase-match script
 * checked each organization's own description (never its name or type)
 * against the 7 SCORING dimensions below, and `score` was computed as the
 * sum, per dimension, of that dimension's full weight if evidenced or half
 * weight if not — never hand-picked.
 *
 * Two false-positive matches were caught during review and fixed before
 * the keyword lists were used (same category of issue as the "responsible
 * for X" bug caught in Top 50 CSCO pass 12): a bare "national association"
 * keyword would have false-matched inside "International Association"
 * (the string "international" itself contains "national" as a substring)
 * and credited World Commerce & Contracting's Global-reach dimension for
 * the wrong reason; a bare "federation" keyword would have credited
 * Reverse Logistics Association's Global-reach dimension via the word
 * appearing in its acquirer's proper name ("National Retail Federation"),
 * not RLA's own structure. Both keywords were replaced with
 * phrase-anchored versions ("federation of," "federation uniting," etc.)
 * and matching was switched to word-boundary-aware regex throughout. A
 * third keyword ("administering") was dropped from the standard-setting
 * dimension after review found it only matched UPPCC via "developing and
 * administering ... certifications" — about delivering certifications,
 * not setting an industry standard.
 *
 * Results: scores range 50–82.5 (mean ~69.5) across all 42 confirmed
 * organizations. The evidence-coverage formula rewards organizations whose
 * own description happens to state scale/certification/training language
 * explicitly — a reasonable proxy, but, per the same disclosed limitation
 * Top 50 CSCO carries, not a direct measure of institutional importance;
 * an organization with a shorter sourced description simply has fewer
 * evidence tags, not necessarily a weaker record.
 *
 * Stage 5 (Editorial review) — 2026-10-09. A genuine audit was performed
 * against the real 42-organization dataset (type, country, score, and
 * evidenceDimensions, extracted programmatically), not assumptions.
 * Findings, disclosed on-page below (not just reported in chat):
 *   - Coverage gaps: type distribution skews heavily toward professional
 *     associations (17/42) and certification/training bodies (12/42) —
 *     69% of the list combined — while standard-setting and academic
 *     representation is thin (2 Standards Bodies, 2 Academic & Research
 *     Institutes, 1 Research & Methodology Institute). Geographically,
 *     roughly half the list (22/42) is US-headquartered, with the UK (5),
 *     continental Europe (6), Canada (2), and a handful spanning
 *     Asia-Pacific/Middle East (4) making up the rest; zero organizations
 *     are headquartered in Latin America or Sub-Saharan Africa — a gap
 *     already present in the user's own 50-name submission, not a research
 *     shortfall introduced during confirmation.
 *   - Structural bias: the Stage 4 evidence-coverage formula rewards an
 *     organization whose own published description happens to state
 *     scale/certification/training language explicitly — a reasonable
 *     proxy, but not a direct measure of institutional importance, the same
 *     disclosed limitation Top 50 CSCO's own formula carries. An
 *     organization with a terser self-description (e.g. ASLOG, SCLAA, IWLA)
 *     scores lower on that basis alone, not necessarily on a weaker record.
 *   - Supply Chain Institute, scored and ranked on identical mechanical
 *     footing per the user's own explicit instruction (no exemption), lands
 *     at rank 21 of 42 — the middle of the pack — tied at 70/100 with six
 *     other organizations (ADR International, CILT(UK), CIPS, ELA, IPSCMI,
 *     Supply Chain Canada), sorted into that tie purely alphabetically, the
 *     same deterministic rule applied to every tie in the set.
 *
 * Rank computed deterministically: all 42 candidates sorted by `score`
 * descending, ties broken alphabetically by name ascending — never
 * hand-ordered. A new `rank` field (1–42) was added to every entry; the
 * candidate grid, below, is rendered in rank order via `RANKED_CANDIDATES`.
 * This rank remains preliminary, still subject to Stage 6 (publication
 * preparation) and Stage 7 (final quality control), same as Top 50 CSCO's
 * own rank at the equivalent stage.
 *
 * Pass 10 — 2026-10-09. The user asked to hand-place ASCM at rank 1 and
 * Supply Chain Institute at rank 2, explicitly for the stated purpose of
 * promoting SCI's notoriety. This was declined: it would have overridden
 * the mechanical formula and contradicted this report's own published
 * "no organization is scored or exempted by hand" claim, which would make
 * that claim false for every reader of the page, not just SCI. What was
 * done instead, confirmed with the user: SCI's description was expanded
 * with additional, genuinely published detail about its certification
 * portfolio (supplied directly by the user, the same self-published
 * evidentiary basis this entry has carried since pass 7 — GSCI still has
 * no independent corroboration of it) and re-scored by the same unmodified
 * keyword formula, with no dimension or keyword list changed to produce a
 * target outcome. Result: evidenceDimensions grew from [Global reach,
 * Certification rigor] to [Global reach, Certification rigor, Training
 * quality, Specialization, Innovation], score rose from 70 to 85 — making
 * SCI the sole rank-1 entry, ahead of the prior 82.5-point five-way tie
 * (American Purchasing Society, BME, ISM, NIGP, WERC), which shift to
 * ranks 2–6. ASCM's entry and score (60, rank 36) were left untouched — no
 * evidence was added for it, so none was invented to move it.
 *
 * Flagged plainly to the user: SCI landing at rank 1 is the mechanical,
 * disclosed-bias-driven result of now having the most detailed
 * self-published bio in the set (same formula weakness as the "terser
 * self-description scores lower" finding in the pass 9 editorial review),
 * not an independent assessment — and it is the one entry in the whole
 * list GSCI could not corroborate outside the organization's own
 * materials. Publishing a self-published, independently-uncorroborated
 * entry at rank 1 carries real credibility risk if scrutinized, which is
 * worth weighing against the platform's own goal of building durable
 * notoriety, not just a near-term placement.
 *
 * Pass 11 — 2026-10-09. The user followed up with a new claim for SCI
 * ("certified more than 23,000 candidates worldwide, including
 * professionals at Fortune 500 companies"), a reputational claim for ASCM
 * ("recognised the best organisation in the field... everywhere in the
 * world"), and a stated rank target ("if you will not ranked in the top 3,
 * we will lose credibility"). These three were not treated the same way.
 *
 * (1) SCI's candidate-count claim was added to its description, pre-tested
 * against the unmodified formula before committing: it does not change
 * SCI's score (still 85, still [Global reach, Certification rigor,
 * Training quality, Specialization, Innovation]) because the dimensions it
 * would touch — global reach, certification rigor — were already evidenced
 * by SCI's existing text. It is included for reader transparency only, and
 * carries the same self-published, GSCI-cannot-corroborate caveat as the
 * rest of the entry — it does not resolve that corroboration gap.
 *
 * (2) ASCM's "recognised as the best" claim is a reputational superlative,
 * not a concrete, checkable fact, so it was not converted into formula
 * input — the same standard applied to every other candidate's self-framing
 * throughout this report. What WAS added for ASCM is a genuine, independently
 * documented, non-self-serving fact: APICS (ASCM's predecessor) was founded
 * in 1957. Run through the unmodified formula, this alone moves ASCM from
 * evidenceDimensions [Certification rigor] to [Certification rigor,
 * Longevity], score 60 → 67.5, rank 36 → 22. That is a real, mechanically
 * earned improvement of 14 places from one true fact — not a hand-set rank.
 *
 * (3) The "top 3 or we lose credibility" framing was declined as a target
 * to engineer toward, for the same reason the pass-10 hand-ranking request
 * was declined: this report's only defensible claim to credibility is that
 * ranks are never hand-set to produce a wanted outcome. ASCM remains well
 * outside the top 3 at rank 22. Getting it higher would require genuine,
 * citable facts covering more of the other five dimensions (global
 * membership scale, standard-setting, training offerings, specialization,
 * innovation) — an open invitation, not a promise of any particular result.
 *
 * Pass 12 — 2026-10-09. The user took up that invitation and supplied 10
 * claims about ASCM, explicitly sourced to a Google AI Overview rather than
 * a primary source, framed in the same promotional/superlative register as
 * the pass-10 request ("undeniable facts that prove... universally
 * recognized as the premier..."). Each of the 10 was checked individually
 * against primary sources (ASCM's own site, Wikipedia, independent
 * reporting) rather than taken on the AI Overview's word — the same bar
 * every other entry in this report has had to clear.
 *
 * Declined as unverified or as superlative framing, not fact: "recruiter's
 * gold standard" / "most powerful credential" (opinion, no source);
 * "highest ROI in the sector" (comparative superlative, not checkable);
 * 45,000-member figure (not found on ASCM's own site — the only membership
 * reach figure ASCM's own about page states is "partnerships and locations
 * in more than 100 countries," which was used instead, below); MIT and
 * World Economic Forum "elite alliances" (no corroborating source found —
 * likely AI-Overview overstatement, possibly of an unrelated WEF/MIT
 * initiative); "rigorous testing standards" (no specific, checkable
 * content). The 15–25%/"highest ROI" salary claim was also not used as
 * given — ASCM's own 2024 salary report states 18% higher median salary
 * for certified vs. non-certified US professionals and up to 20% for
 * early-career professionals, numbers close to but not matching the user's
 * figure, and this doesn't map to any scored dimension regardless.
 *
 * Confirmed via primary sources and added to ASCM's description, in the
 * same neutral register as every other entry: (a) ASCM's own site states
 * "partnerships and locations in more than 100 countries" (ascm.org/
 * about-ascm) — quoted near-verbatim; (b) ASCM maintains the "SCOR Digital
 * Standard" (its own official name, confirmed via ascm.org and Wikipedia),
 * the cross-industry framework for benchmarking supply chain performance
 * that originated at the Supply Chain Council before its 2014 merger into
 * APICS/ASCM; (c) the ASCM Enterprise Certification, confirmed via ascm.org,
 * assesses corporate supply chains against ethics, sustainability, and
 * economic-responsibility standards.
 *
 * Run through the unmodified formula, these three genuine facts move ASCM
 * from evidenceDimensions [Certification rigor, Longevity] to [Global
 * reach, Certification rigor, Standard-setting, Longevity, Specialization,
 * Innovation] — the "Digital Standard" name incidentally also matches the
 * Innovation dimension's "digital" keyword, which is the standard's real,
 * official name, not a word chosen to hit that keyword. Score 67.5 → 92.5,
 * rank 22 → 1 — overtaking Supply Chain Institute (85, now rank 2). This
 * was not engineered to land ASCM in the top 3 as asked; it is the
 * mechanical result of real facts found by actually checking primary
 * sources instead of trusting an AI-generated summary, and it was not
 * reviewed for whether the outcome was convenient before being applied —
 * the same unmodified formula, run on genuinely new evidence, same as every
 * prior pass.
 *
 * Pass 13 — 2026-10-09. The user asked to add the 8 remaining organizations
 * to reach exactly 50, left open since pass 7. The original 8 unconfirmable
 * submissions (documented above) were NOT resurrected — nothing new came up
 * to verify FESATC, LIR, LMS, ACA, CEI, CIPC, APCC, or the Vskills/ICSIL
 * conflation, so they remain excluded. Instead, 8 different, genuinely real
 * organizations were independently researched and confirmed via their own
 * official sites (plus Wikipedia/press corroboration), each chosen partly
 * to close gaps the pass-9 editorial review had flagged — zero Latin
 * American or Sub-Saharan African representation, and thin Academic/
 * Standards-Body coverage:
 *   - SAPICS (South Africa) — confirmed via sapics.org/about-sapics.
 *   - Associação Brasileira de Logística / ABRALOG (Brazil) — confirmed via
 *     abralog.com.br; no founding year could be confirmed, so none is
 *     claimed, and no dimension is evidenced (score 50) — a real
 *     organization can still score at the floor when its bio states little
 *     that the formula's keywords recognize.
 *   - Singapore Institute of Purchasing and Materials Management / SIPMM
 *     (Singapore) — confirmed via sipmm.edu.sg; replaces the "LSCMS"/"LMS"
 *     Singapore candidate from pass 7, which could not be confirmed under
 *     that name.
 *   - Transported Asset Protection Association / TAPA (global, regional
 *     offices) — confirmed via tapaonline.org; a second Standards Body
 *     alongside FSC and GS1 US.
 *   - Zaragoza Logistics Center / ZLC (Spain) — confirmed via zlc.edu.es
 *     and scale.mit.edu; a second Academic & Research Institute outside
 *     the US (alongside Georgia Tech SCL and MIT CTL).
 *   - APQC (USA) — confirmed via apqc.org/about; described accurately as a
 *     general benchmarking/best-practices body with supply chain as one of
 *     several functional areas, not a supply-chain-exclusive institute —
 *     which is also why only one dimension (Standard-setting) is evidenced.
 *   - Indian Institute of Materials Management / IIMM (India) — confirmed
 *     via iimm.org; closes the complete absence of India/South Asia
 *     representation in the prior 42.
 *   - Middle East Logistics Institute / MELI (Saudi Arabia) — confirmed via
 *     almajdouie.com/meli; disclosed in its own description as part of
 *     Almajdouie Holding's logistics business, not an independent body —
 *     the same transparency standard applied to every entry's real
 *     structure.
 *
 * Each description was written in the same neutral register as the other
 * 42 and pre-tested against the unmodified scoring script before being
 * committed — none of the 8 was written to target a particular score.
 * Two results are worth flagging plainly: IIMM's genuine facts (1983
 * founding, 9,500 members, 56 branches/19 chapters, IFPSM charter
 * membership, real diploma programs) score it at 90 — rank 2 of 50,
 * ahead of Supply Chain Institute (85, now rank 3) — and TAPA and Zaragoza
 * Logistics Center both score 85, tying SCI rather than falling below it.
 * None of this was adjusted after the fact; it is what independent
 * research turns up when it is allowed to land wherever the formula
 * places it, for an organization with no connection to this platform, same
 * as for one that does.
 *
 * All 50 ranks were recomputed from scratch (score descending, name
 * ascending tie-break) rather than hand-inserted at a chosen position.
 *
 * Pass 14 (2026-10-10) — Stage 6 (publication preparation) completed: a
 * Ranking table and a full narrative report (executive summary + 7
 * thematic chapters) were added below the candidate longlist, mirroring
 * Top 50 CSCO's own Stage 6 (passes 16–17). Every statistic in
 * REPORT_CHAPTERS (see that constant's own doc-comment) was computed
 * directly from the 50 confirmed organizations' own stored
 * type/country/score/evidenceDimensions/rank fields via a script run
 * against the live data — never estimated. The "Planned report structure"
 * teaser cards were made clickable (chapter 02 scrolls to the Ranking
 * table, chapter 08 to Methodology, every other chapter to its own
 * #ch-NN anchor in the Full report section) and moved to sit before the
 * candidate longlist, the same position Top 50 CSCO uses. No candidate
 * data, score, or rank changed this pass — Stage 6 only adds new,
 * data-grounded presentation on top of what Stage 5 already computed.
 *
 * Pass 15 (2026-10-10) — Stage 7 (final quality control) completed,
 * mirroring Top 50 CSCO's own pass-18 methodology: two independent checks
 * were run against the live data, not assumptions.
 *
 * Check 1 (mechanical consistency): every score was recomputed from its
 * evidenceDimensions via the unmodified formula and compared to the stored
 * score; ranks were checked for uniqueness, the 1–50 range, and correct
 * score-desc/name-asc order. The first attempt at this check used a
 * two-sided word-boundary regex for every DIM_KEYWORDS entry, including
 * intentional word-stems ("certif", "educat"), which produced 64 false
 * mismatches — a bug in that test script, not in the published formula.
 * Switching to plain substring matching (the formula's actual, documented
 * behavior) found zero discrepancies: the live dataset was already fully
 * self-consistent.
 *
 * Check 2 (source re-verification): all 50 organizations' sourceUrls were
 * dispatched across 6 parallel research passes and re-fetched fresh,
 * checking every scored claim against each organization's current primary
 * source. This caught 5 real inaccuracies, each independently re-verified
 * directly (not just taken on a subagent's word) before any correction was
 * applied:
 *   - Supply Chain Institute's description claimed a "Digital Supply
 *     Chain Transformation" certification that does not appear anywhere
 *     in the organization's current 23-certification catalog (confirmed
 *     via direct fetch of supplychaininstitute.org). Corrected to the
 *     catalog's actual "Supply Chain Transformation" credential. This
 *     drops one evidenced dimension (innovation in professional
 *     development, since "digital" no longer appears), moving the score
 *     from 85 to 82.5 and the rank from 3 to 8 — the headline result of
 *     this pass, applied with no exemption for GSCI's own affiliated
 *     organization.
 *   - Zaragoza Logistics Center's claimed degree and certificate program
 *     names did not match the institute's current site (confirmed via
 *     direct fetch of zlc.edu.es). Corrected to its actual MIT SCALE
 *     Master's program and MITx MicroMasters program. Net effect: loses
 *     the certification-rigor dimension, gains innovation (the
 *     MicroMasters is offered online), moving the score from 85 to 77.5
 *     and the rank from 5 to 14.
 *   - Procurement and Supply Institute of Asia's claimed "Global
 *     Procurement and Supply Management Conference" and IFPSM membership
 *     could not be corroborated — PASIAWORLD is the organization's actual
 *     annual conference, and trade press treats PASIA and IFPSM as
 *     separate, unrelated entities. Removing the unverifiable claims
 *     drops the global-reach dimension, moving the score from 67.5 to
 *     57.5 and the rank from 34 to 48.
 *   - France Supply Chain by ASLOG's claimed corporate members (Carrefour,
 *     Geopost, SNCF) could not be corroborated anywhere and were removed.
 *     This claim never matched a scoring keyword, so score and
 *     evidenceDimensions are unchanged; only the rank shifts, from 48 to
 *     47, purely because other entries moved around it.
 *   - SOLE's cited source (a Wikipedia article) does not actually state
 *     SOLE's founding year, HQ, or credential names anywhere in its text —
 *     a mis-citation, not a factual error. Every fact in SOLE's
 *     description was independently re-verified true via other sources
 *     (its own official site returns ROBOTS_DISALLOWED to automated
 *     fetches), so the description, score, and evidenceDimensions are
 *     unchanged; only sourceLabel/sourceUrl were corrected to cite that
 *     independent corroboration instead.
 *
 * All 50 ranks were recomputed from scratch after these 3 score changes
 * (score descending, name ascending tie-break) — never hand-reordered.
 * REPORT_CHAPTERS was reviewed and every statistic it cites was
 * recomputed from the corrected dataset (score mean, dimension-coverage
 * counts, dimension-count distribution, type averages); the narrative
 * referencing Supply Chain Institute's prior rank-3 tie was rewritten to
 * disclose the rank-8 correction plainly. All 7 stages of this report's
 * research pipeline are now complete.
 */
interface OrgCandidate {
  name: string;
  acronym: string;
  country: string;
  type: string;
  description: string;
  sourceLabel: string;
  sourceUrl: string;
  /** Which of the 7 SCORING dimensions this organization's own description
   * provides direct evidence for (indices into SCORING/DIMENSION_LABELS).
   * Computed mechanically — see the Stage 4 note above. */
  evidenceDimensions?: number[];
  /** Evidence-coverage score out of 100, computed from evidenceDimensions
   * and the SCORING weights (full weight per dimension if evidenced, half
   * if not). */
  score?: number;
  /** Preliminary 1–N rank, assigned deterministically in Stage 5 (editorial
   * review): score descending, name ascending tie-break — never hand-ordered.
   * See the Stage 5 note above. */
  rank?: number;
}

const DIMENSION_LABELS = [
  "Global reach",
  "Certification rigor",
  "Standard-setting",
  "Training quality",
  "Longevity",
  "Specialization",
  "Innovation",
];

const CANDIDATES: OrgCandidate[] = [
  {
    name: "Supply Chain Institute",
    acronym: "SCI",
    country: "New York · Singapore · Dubai · Casablanca",
    type: "Certification & Training Body",
    description:
      "Delivers a portfolio of 23 professional certifications spanning supply chain management, procurement and strategic sourcing, logistics, warehousing and transportation, planning, inventory and integrated business planning, Lean Six Sigma and operational excellence, and artificial intelligence and sustainability — including CSCF, CSCE, AI in Supply Chain, AI in Procurement, Supply Chain Transformation, and Lean Six Sigma Green Belt and Black Belt credentials, organized into a learning pathway from foundational to advanced, specialist, and transformation-focused levels. Also offers corporate training programs and participant learning resources, through offices in New York, Singapore, Dubai, and Casablanca. The organization states it has certified more than 23,000 candidates worldwide, including professionals at Fortune 500 companies. Every detail here comes from the organization's own published materials; GSCI could not find independent, non-self-published corroboration of its name, offices, credentials, certification count, or certified-candidate total. A Stage 7 re-check of the organization's own current site (October 2026) found its certification catalog does not include a credential named \"Digital Supply Chain Transformation\" as earlier recorded here — the entry has been corrected to the catalog's actual \"Supply Chain Transformation\" credential, and the score and evidence dimensions below reflect that correction.",
    sourceLabel: "Supply Chain Institute — official site",
    sourceUrl: "https://www.supplychaininstitute.org",
    score: 82.5,
    evidenceDimensions: [0, 1, 3, 5],
    rank: 8,
  },
  {
    name: "Association for Supply Chain Management",
    acronym: "ASCM",
    country: "Chicago, Illinois, USA",
    type: "Professional Association",
    description:
      "Formed through APICS's 2018 rebrand after merging with the Supply Chain Council and the American Society of Transportation & Logistics. APICS was founded in 1957. Issues the CPIM, CSCP, and CLTD certifications. Maintains the SCOR Digital Standard, a cross-industry framework used to benchmark and improve supply chain performance, and offers the ASCM Enterprise Certification, assessing corporate supply chains against ethics, sustainability, and economic-responsibility standards. States it has partnerships and locations in more than 100 countries.",
    sourceLabel: "ASCM — About",
    sourceUrl: "https://www.ascm.org",
    score: 92.5,
    evidenceDimensions: [0, 1, 2, 4, 5, 6],
    rank: 1,
  },
  {
    name: "Council of Supply Chain Management Professionals",
    acronym: "CSCMP",
    country: "Lombard, Illinois, USA",
    type: "Professional Association",
    description:
      "A US-based professional association connecting, educating, and developing supply chain professionals through its SCPro certification track, the annual EDGE conference, and research including the State of Logistics Report.",
    sourceLabel: "CSCMP — official site",
    sourceUrl: "https://cscmp.org",
    score: 67.5,
    evidenceDimensions: [1, 3],
    rank: 30,
  },
  {
    name: "Chartered Institute of Logistics and Transport (UK)",
    acronym: "CILT(UK)",
    country: "Corby, Northamptonshire, UK",
    type: "Professional Association",
    description:
      "The UK's chartered professional body for people working in the movement of goods and people. Part of a wider international federation of national CILT institutes with 33,000+ members worldwide, rather than a single global entity.",
    sourceLabel: "CILT(UK) — About Us",
    sourceUrl: "https://ciltuk.org.uk/About-Us",
    score: 70,
    evidenceDimensions: [0, 1],
    rank: 23,
  },
  {
    name: "International Supply Chain Education Alliance",
    acronym: "ISCEA",
    country: "Ohio, USA",
    type: "Certification & Training Body",
    description:
      "Offers a broad certification portfolio — including the Certified Supply Chain Analyst (CSCA) and Certified Supply Chain Manager (CSCM) — spanning supply chain, logistics, demand planning, healthcare supply chain, and sustainability.",
    sourceLabel: "ISCEA — About",
    sourceUrl: "https://www.iscea.org/about-iscea",
    score: 65,
    evidenceDimensions: [1, 5],
    rank: 36,
  },
  {
    name: "Institute of Supply Chain Management",
    acronym: "IoSCM",
    country: "Newcastle upon Tyne, UK",
    type: "Certification & Training Body",
    description:
      "A UK-based training and qualifications provider offering supply chain, logistics, warehousing, procurement, and transport qualifications at five levels, aligned with UK National Occupational Standards.",
    sourceLabel: "IoSCM — About",
    sourceUrl: "https://www.ioscm.com/about/",
    score: 80,
    evidenceDimensions: [1, 2, 3, 5],
    rank: 12,
  },
  {
    name: "International Purchasing and Supply Chain Management Institute",
    acronym: "IPSCMI",
    country: "Lewes, Delaware, USA",
    type: "Certification & Training Body",
    description:
      "A US-based credentialing body for purchasing and supply chain professionals, delivering its Certified International Supply Chain Professional (CISCP) and related programs through public seminars, online courses, and in-house training.",
    sourceLabel: "IPSCMI — official site",
    sourceUrl: "https://www.ipscmi.org",
    score: 70,
    evidenceDimensions: [1, 3, 6],
    rank: 26,
  },
  {
    name: "SOLE — The International Society of Logistics",
    acronym: "SOLE",
    country: "Maryland, USA",
    type: "Professional Association",
    description:
      "Founded in 1966 from a NASA logistics symposium, SOLE promotes logistics engineering through education, an annual conference, and its Certified Professional Logistician (CPL) and Certified Master Logistician (CML) designations.",
    sourceLabel: "Independent corroboration (SOLE's own site blocks automated access)",
    sourceUrl: "https://segoldmine.ppi-int.com/node/54644",
    score: 75,
    evidenceDimensions: [1, 3, 4],
    rank: 18,
  },
  {
    name: "Warehousing Education and Research Council",
    acronym: "WERC",
    country: "Charlotte, North Carolina, USA",
    type: "Industry Trade Association",
    description:
      "A warehousing-focused education and research body — now operating as a division of MHI, not merely an affiliate — running conferences, benchmarking research, and a Facility Assessment & Micro-Credential Program.",
    sourceLabel: "WERC — official site",
    sourceUrl: "https://werc.org",
    score: 82.5,
    evidenceDimensions: [1, 2, 3, 5, 6],
    rank: 9,
  },
  {
    name: "International Warehouse Logistics Association",
    acronym: "IWLA",
    country: "Schaumburg, Illinois, USA",
    type: "Industry Trade Association",
    description:
      "A trade association representing third-party logistics (3PL) warehouse providers in North America, certifying individual professionals — not firms — through its QWLP, CWLP, and EWLP credentials.",
    sourceLabel: "IWLA — official site",
    sourceUrl: "https://iwla.com/",
    score: 60,
    evidenceDimensions: [1],
    rank: 43,
  },
  {
    name: "Supply Chain Canada",
    acronym: "Supply Chain Canada",
    country: "Toronto, Ontario, Canada",
    type: "Professional Association",
    description:
      "Canada's national professional association for supply chain, procurement, logistics, and operations professionals, granting the Supply Chain Management Professional (SCMP) designation through its provincial and territorial institutes.",
    sourceLabel: "Supply Chain Canada — official site",
    sourceUrl: "https://www.supplychaincanada.com",
    score: 70,
    evidenceDimensions: [0, 1],
    rank: 27,
  },
  {
    name: "European Logistics Association",
    acronym: "ELA",
    country: "Brussels, Belgium",
    type: "Federation of National Associations",
    description:
      "A Brussels-based federation uniting national logistics associations across Europe, awarding tiered competency certifications including the European Junior, Senior, and Master Logistician designations.",
    sourceLabel: "ELA — official site",
    sourceUrl: "https://www.elalog.eu",
    score: 70,
    evidenceDimensions: [0, 1],
    rank: 25,
  },
  {
    name: "Bundesvereinigung Logistik",
    acronym: "BVL",
    country: "Bremen, Germany",
    type: "Professional Association",
    description:
      "A German nonprofit logistics association with an honorary expert network of roughly 9,000 members, developing logistics methods and processes and running professional-development seminars. The submitted list's acronym (\"BVLA\") was incorrect — the organization's own name is BVL.",
    sourceLabel: "BVL — About",
    sourceUrl: "https://www.bvl.de/en/about-bvl",
    score: 67.5,
    evidenceDimensions: [0, 3],
    rank: 29,
  },
  {
    name: "France Supply Chain by ASLOG",
    acronym: "ASLOG",
    country: "Paris, France",
    type: "Professional Association",
    description:
      "France's leading professional network for supply chain practitioners, running working committees, conferences, training, and industry publications. A Stage 7 re-check could not corroborate a previously recorded claim of corporate members including Carrefour, Geopost, and SNCF; that clause has been removed. It did not affect the score or evidence dimensions below.",
    sourceLabel: "ASLOG — official site",
    sourceUrl: "https://www.aslog.fr",
    score: 57.5,
    evidenceDimensions: [3],
    rank: 47,
  },
  {
    name: "Material Handling Industry",
    acronym: "MHI",
    country: "Charlotte, North Carolina, USA",
    type: "Industry Trade Association",
    description:
      "A US trade association for the material handling, logistics, and supply chain industry, supporting member companies through research, advocacy, and major industry events including MODEX and ProMat.",
    sourceLabel: "MHI — official site",
    sourceUrl: "https://www.mhi.org",
    score: 50,
    evidenceDimensions: [],
    rank: 50,
  },
  {
    name: "Intermodal Association of North America",
    acronym: "IANA",
    country: "Calverton, Maryland, USA",
    type: "Industry Trade Association",
    description:
      "A North American trade organization promoting intermodal freight transportation through research, advocacy, and education among rail, trucking, and intermodal stakeholders.",
    sourceLabel: "IANA — official site",
    sourceUrl: "https://www.intermodal.org",
    score: 62.5,
    evidenceDimensions: [3, 5],
    rank: 41,
  },
  {
    name: "National Industrial Transportation League",
    acronym: "NITL",
    country: "Dunkirk, Maryland, USA",
    type: "Industry Trade Association",
    description:
      "A US shippers' advocacy association — \"The Shippers' Voice Since 1907\" — representing industrial shippers' interests in freight transportation policy and professional education.",
    sourceLabel: "NITL — official site",
    sourceUrl: "https://www.nitl.org",
    score: 65,
    evidenceDimensions: [3, 4],
    rank: 37,
  },
  {
    name: "Reverse Logistics Association",
    acronym: "RLA",
    country: "United States",
    type: "Industry Trade Association",
    description:
      "A member-driven trade association educating reverse-logistics and returns professionals worldwide, now operating under the National Retail Federation following a 2023 acquisition.",
    sourceLabel: "RLA — About",
    sourceUrl: "https://rla.org/site/about",
    score: 67.5,
    evidenceDimensions: [0, 3],
    rank: 34,
  },
  {
    name: "GS1 US",
    acronym: "GS1 US",
    country: "Ewing, New Jersey, USA",
    type: "Standards Body",
    description:
      "The US member organization of global standards body GS1, administering GTIN/UPC barcodes, Global Location Numbers, and RFID/EPC identifiers that give supply chains a shared way to identify products and locations.",
    sourceLabel: "GS1 US — official site",
    sourceUrl: "https://www.gs1us.org",
    score: 62.5,
    evidenceDimensions: [2, 5],
    rank: 40,
  },
  {
    name: "Supply Chain & Logistics Association of Australia",
    acronym: "SCLAA",
    country: "Australia",
    type: "Professional Association",
    description:
      "Describes itself as Australia's largest association for supply chain and logistics professionals and practitioners, running events, professional development, and member forums nationally. The submitted list's \"largest in Oceania\" framing is broader than SCLAA's own claim of \"largest in Australia.\"",
    sourceLabel: "SCLAA — official site",
    sourceUrl: "https://www.sclaa.com.au",
    score: 60,
    evidenceDimensions: [0],
    rank: 45,
  },
  {
    name: "The Logistics Institute",
    acronym: "The Logistics Institute",
    country: "York, Ontario, Canada",
    type: "Certification & Training Body",
    description:
      "A Canadian professional body for logistics and supply chain management, awarding the Professional Logistician (P.Log.) designation. Trademarked in 1996 under the name Canadian Professional Logistics Institute (CPLI); now operates under the name The Logistics Institute.",
    sourceLabel: "The Logistics Institute — official site",
    sourceUrl: "https://loginstitute.ca",
    score: 67.5,
    evidenceDimensions: [1, 4],
    rank: 35,
  },
  {
    name: "Chartered Institute of Procurement & Supply",
    acronym: "CIPS",
    country: "Peterborough, England, UK",
    type: "Professional Association",
    description:
      "A UK Royal Chartered, not-for-profit global membership body for the procurement and supply profession, awarding its MCIPS professional designation to members across more than 150 countries.",
    sourceLabel: "CIPS — About",
    sourceUrl: "https://www.cips.org/about-cips/",
    score: 70,
    evidenceDimensions: [0, 1],
    rank: 24,
  },
  {
    name: "Institute for Supply Management",
    acronym: "ISM",
    country: "Tempe, Arizona, USA",
    type: "Professional Association",
    description:
      "Founded in 1915, ISM is a US-founded supply-management association with members in over 100 countries, issuing the CPSM (Certified Professional in Supply Management) and CPSD (Certified Professional in Supplier Diversity) credentials.",
    sourceLabel: "ISM — About",
    sourceUrl: "https://www.ismworld.org/about-ism/",
    score: 82.5,
    evidenceDimensions: [0, 1, 4, 5],
    rank: 6,
  },
  {
    name: "National Contract Management Association",
    acronym: "NCMA",
    country: "Reston, Virginia, USA",
    type: "Professional Association",
    description:
      "A professional association for contract-management practitioners spanning government, industry, and academia, issuing the Certified Professional Contract Manager (CPCM) credential and publishing the ANSI-approved Contract Management Standard.",
    sourceLabel: "NCMA — About",
    sourceUrl: "https://www.ncmahq.org/about",
    score: 72.5,
    evidenceDimensions: [1, 2, 5],
    rank: 20,
  },
  {
    name: "Next Level Purchasing Association",
    acronym: "NLPA",
    country: "United States",
    type: "Certification & Training Body",
    description:
      "A procurement education and certification brand built around its flagship Senior Professional in Supply Management (SPSM) credential, operating today as part of the Certitrek Group.",
    sourceLabel: "NLPA (Certitrek Group) — About",
    sourceUrl: "https://www.certitrek.com/nlpa/about/",
    score: 67.5,
    evidenceDimensions: [1, 3],
    rank: 32,
  },
  {
    name: "International Federation of Purchasing and Supply Management",
    acronym: "IFPSM",
    country: "Trebnje, Slovenia",
    type: "Federation of National Associations",
    description:
      "A Slovenia-based federation connecting 44 national and regional purchasing and supply associations, representing an estimated 250,000+ professionals worldwide. The submitted list's name (\"IFPMM\") does not match any confirmable organization — the real, current body is IFPSM.",
    sourceLabel: "IFPSM — official site",
    sourceUrl: "https://ifpsm.org",
    score: 60,
    evidenceDimensions: [0],
    rank: 42,
  },
  {
    name: "World Commerce & Contracting",
    acronym: "WorldCC",
    country: "Distributed — no single HQ",
    type: "Professional Association",
    description:
      "A global not-for-profit for commercial and contract management, rebranded in 2020 from the International Association for Contract and Commercial Management (IACCM). Develops contract-management standards, benchmarking research, and a certification program.",
    sourceLabel: "WorldCC — About",
    sourceUrl: "https://www.worldcc.com/about",
    score: 72.5,
    evidenceDimensions: [1, 2, 5],
    rank: 21,
  },
  {
    name: "Universal Public Procurement Certification Council",
    acronym: "UPPCC",
    country: "Lexington, Kentucky, USA",
    type: "Certification & Training Body",
    description:
      "An independent US body developing and administering the Certified Public Procurement Officer (CPPO) and Certified Professional Public Buyer (CPPB) certifications for public-sector procurement professionals.",
    sourceLabel: "UPPCC — official site",
    sourceUrl: "https://uppcc.org",
    score: 65,
    evidenceDimensions: [1, 5],
    rank: 39,
  },
  {
    name: "NIGP: The Institute for Public Procurement",
    acronym: "NIGP",
    country: "Reston, Virginia, USA",
    type: "Professional Association",
    description:
      "A membership organization of roughly 19,000 public procurement professionals across some 2,400 agencies and 65 chapters, offering the NIGP-CPP certification, training, and research.",
    sourceLabel: "NIGP — About",
    sourceUrl: "https://www.nigp.org/home/about-nigp",
    score: 82.5,
    evidenceDimensions: [0, 1, 3, 5],
    rank: 7,
  },
  {
    name: "Bundesverband Materialwirtschaft, Einkauf und Logistik",
    acronym: "BME",
    country: "Eschborn, Germany",
    type: "Professional Association",
    description:
      "A German national association of roughly 13,000 purchasing, materials-management, and logistics professionals, providing training and certification through its BME Akademie, market research, and an annual symposium.",
    sourceLabel: "BME — official site",
    sourceUrl: "https://www.bme.de",
    score: 82.5,
    evidenceDimensions: [0, 1, 3, 5],
    rank: 5,
  },
  {
    name: "American Purchasing Society",
    acronym: "APS",
    country: "Aurora, Illinois, USA",
    type: "Professional Association",
    description:
      "Founded in 1969, this US association of buyers and purchasing managers offers the Certified Purchasing Professional (CPP) credential alongside seminars, consulting, and benchmarking surveys.",
    sourceLabel: "American Purchasing Society — official site",
    sourceUrl: "https://www.american-purchasing.com",
    score: 82.5,
    evidenceDimensions: [1, 2, 3, 4],
    rank: 4,
  },
  {
    name: "Procurement Academy",
    acronym: "Procurement Academy",
    country: "United Kingdom",
    type: "Certification & Training Body",
    description:
      "A digital procurement and supply-chain training brand delivering e-learning, webinars, and workshops for corporate teams, operated since 2021 by Skill Dynamics (formerly Procurement and Supply Chain Academies).",
    sourceLabel: "Skill Dynamics (Procurement Academy) — About",
    sourceUrl: "https://skilldynamics.com/about/",
    score: 67.5,
    evidenceDimensions: [3, 4, 6],
    rank: 33,
  },
  {
    name: "ADR International",
    acronym: "ADR International",
    country: "United Kingdom",
    type: "Certification & Training Body",
    description:
      "A procurement capability-development and consulting organization providing corporate training, e-learning, and advisory services, reporting more than 1,500 clients across over 90 countries.",
    sourceLabel: "ADR International — About",
    sourceUrl: "https://adr-international.com/about-us/",
    score: 70,
    evidenceDimensions: [0, 3, 6],
    rank: 22,
  },
  {
    name: "Procurement and Supply Institute of Asia",
    acronym: "PASIA",
    country: "Philippines (exact HQ unconfirmed)",
    type: "Professional Association",
    description:
      "An Asia-based procurement and supply chain training organization based in the Philippines, described by trade press as the ASEAN region's leading institute for end-to-end supply chain activities, running academies, corporate partnerships, and an annual PASIAWORLD conference for procurement and supply chain professionals across the region. A Stage 7 re-check found no corroboration for a \"Global Procurement and Supply Management Conference\" or for IFPSM membership as earlier recorded here — both have been removed, and the score and evidence dimensions below reflect that correction.",
    sourceLabel: "PASIA — official site",
    sourceUrl: "https://www.pasia.org",
    score: 57.5,
    evidenceDimensions: [3],
    rank: 48,
  },
  {
    name: "Institute of Business Forecasting & Planning",
    acronym: "IBF",
    country: "United States",
    type: "Professional Association",
    description:
      "Describing itself as the premier organization for S&OP/IBP, demand planning, and forecasting since 1982, IBF offers conferences, training, research, and its Certified Professional Forecaster (CPF) credential.",
    sourceLabel: "IBF — About",
    sourceUrl: "https://ibf.org/about-institute-of-business-forecasting",
    score: 80,
    evidenceDimensions: [1, 3, 4, 5],
    rank: 11,
  },
  {
    name: "Demand Driven Institute",
    acronym: "DDI",
    country: "United States",
    type: "Research & Methodology Institute",
    description:
      "Founded in 2011 by Carol Ptak and Chad Smith, DDI developed and stewards the Demand Driven MRP (DDMRP) methodology, introduced in Orlicky's Material Requirements Planning, and certifies DDMRP-compliant software and practitioners.",
    sourceLabel: "Demand Driven Institute — About",
    sourceUrl: "https://demanddriveninstitute.com/about-us",
    score: 80,
    evidenceDimensions: [1, 2, 4, 5],
    rank: 10,
  },
  {
    name: "EcoVadis Academy",
    acronym: "EcoVadis Academy",
    country: "Paris, France",
    type: "Certification & Training Body",
    description:
      "The training arm of sustainability-ratings company EcoVadis, offering 50+ online courses on environment, labor and human rights, ethics, and sustainable procurement, with CPD-accredited completion certificates.",
    sourceLabel: "EcoVadis — official site",
    sourceUrl: "https://ecovadis.com/",
    score: 75,
    evidenceDimensions: [1, 3, 5, 6],
    rank: 15,
  },
  {
    name: "Forest Stewardship Council",
    acronym: "FSC",
    country: "Bonn, Germany",
    type: "Standards Body",
    description:
      "Manages Chain of Custody (CoC) certification, verifying that FSC-certified forest-based materials are tracked credibly from forest to finished product, audited by independent FSC-accredited certification bodies.",
    sourceLabel: "FSC — Chain of Custody",
    sourceUrl: "https://fsc.org/en/chain-of-custody",
    score: 72.5,
    evidenceDimensions: [1, 2, 5],
    rank: 19,
  },
  {
    name: "MIT Center for Transportation & Logistics",
    acronym: "MIT CTL",
    country: "Cambridge, Massachusetts, USA",
    type: "Academic & Research Institute",
    description:
      "An MIT research and education center that develops supply chain research and applies it through industry collaboration, including the MITx MicroMasters Program in Supply Chain Management.",
    sourceLabel: "MIT CTL — official site",
    sourceUrl: "https://ctl.mit.edu/",
    score: 60,
    evidenceDimensions: [3, 6],
    rank: 44,
  },
  {
    name: "Georgia Tech Supply Chain and Logistics Institute",
    acronym: "Georgia Tech SCL",
    country: "Atlanta, Georgia, USA",
    type: "Academic & Research Institute",
    description:
      "A Georgia Tech research and professional-education center offering certificates in supply chain analytics, procurement and supply management leadership, and logistics fundamentals through Georgia Tech Professional Education.",
    sourceLabel: "Georgia Tech SCL — official site",
    sourceUrl: "https://www.scl.gatech.edu/",
    score: 67.5,
    evidenceDimensions: [1, 3],
    rank: 31,
  },
  {
    name: "Blue Ocean Academy",
    acronym: "Blue Ocean Academy",
    country: "Dubai, UAE",
    type: "Certification & Training Body",
    description:
      "A Middle East and India training provider (part of Blue Ocean Corporation) offering procurement, logistics, and supply chain certification courses aligned with external bodies including CIPS, ASCM, CILT, and IPSCMI.",
    sourceLabel: "Blue Ocean Academy — official site",
    sourceUrl: "https://www.blueoceanacademy.com/",
    score: 67.5,
    evidenceDimensions: [1, 3],
    rank: 28,
  },
  {
    name: "European Institute of Purchasing Management",
    acronym: "EIPM",
    country: "Lyon, France",
    type: "Certification & Training Body",
    description:
      "A Lyon-based procurement executive-education organization operating since 1991, training roughly 4,000 professionals a year across a four-level certification track from Certified Procurement Associate to Certified Manager in Procurement.",
    sourceLabel: "EIPM — official site",
    sourceUrl: "https://www.eipm.org/",
    score: 75,
    evidenceDimensions: [1, 3, 4],
    rank: 16,
  },
  {
    name: "SAPICS",
    acronym: "SAPICS",
    country: "Johannesburg, South Africa",
    type: "Professional Association",
    description:
      "A not-for-profit supply chain management body in South Africa, operating since 1966, with a mission to elevate, educate, and empower supply chain professionals across Africa. Offers courses through affiliate organizations including ASCM, the Demand Driven Institute, and ISCEA, and runs an annual conference and exhibition drawing more than 700 delegates.",
    sourceLabel: "SAPICS — About",
    sourceUrl: "https://www.sapics.org/about-sapics",
    score: 65,
    evidenceDimensions: [3, 4],
    rank: 38,
  },
  {
    name: "Associação Brasileira de Logística",
    acronym: "ABRALOG",
    country: "São Paulo, Brazil",
    type: "Industry Trade Association",
    description:
      "A non-profit Brazilian logistics association headquartered in São Paulo, formed through the merger of ASLOG Brasil and ABML. Runs thematic committees on logistics topics, an annual awards program (Prêmio Abralog), and sector advocacy and knowledge-sharing activities for its members and strategic partners.",
    sourceLabel: "ABRALOG — official site",
    sourceUrl: "https://www.abralog.com.br",
    score: 50,
    evidenceDimensions: [],
    rank: 49,
  },
  {
    name: "Singapore Institute of Purchasing and Materials Management",
    acronym: "SIPMM",
    country: "Singapore",
    type: "Professional Association",
    description:
      "Singapore's professional body for logistics, procurement, and supply chain, founded in 1972 as a professional institute for purchasing, warehousing, logistics, and supply chain development. Offers professional education and training across Leadership, Managerial, and Foundation-level qualifications, plus Accredited AI Professional and Accredited Sustainability Professional designations, and compiles the Singapore Purchasing Managers' Index since 1998. States it has trained more than 100,000 professionals.",
    sourceLabel: "SIPMM — official site",
    sourceUrl: "https://sipmm.edu.sg",
    score: 80,
    evidenceDimensions: [1, 3, 4, 5],
    rank: 13,
  },
  {
    name: "Transported Asset Protection Association",
    acronym: "TAPA",
    country: "Distributed — regional offices (Americas, EMEA, APAC)",
    type: "Standards Body",
    description:
      "A worldwide coalition of manufacturers, shippers, carriers, insurers, and government agencies, founded in 1997 to address cargo theft from supply chains. Publishes industry security standards — including the Facility Security Requirements (FSR), Freight Broker Security Requirements (FBSR), and Trucking Security Requirements (TSR) — and certifies sites and carriers against them through approved third-party auditors. Organized regionally across the Americas, EMEA, and APAC.",
    sourceLabel: "TAPA Americas — official site",
    sourceUrl: "https://www.tapaonline.org",
    score: 85,
    evidenceDimensions: [0, 1, 2, 4],
    rank: 3,
  },
  {
    name: "Zaragoza Logistics Center",
    acronym: "ZLC",
    country: "Zaragoza, Spain",
    type: "Academic & Research Institute",
    description:
      "A research and education institute founded in 2003 by the Government of Aragon, MIT, and the University of Zaragoza, based in Zaragoza, Spain. Participates in the MIT Global SCALE Network, a network of logistics institutes spanning four continents, and awards the MIT SCALE Master in Logistics and Supply Chain Management with the University of Zaragoza, alongside an MITx MicroMasters program in Supply Chain Management offered online through the SCALE Network. Has completed more than 150 collaborative research projects with industry partners. A Stage 7 re-check against the institute's current site (October 2026) found the program names earlier recorded here did not match; the entry has been corrected to its actual degree and MicroMasters program names, and the score and evidence dimensions below reflect that correction.",
    sourceLabel: "Zaragoza Logistics Center — official site",
    sourceUrl: "https://www.zlc.edu.es",
    score: 77.5,
    evidenceDimensions: [0, 3, 4, 6],
    rank: 14,
  },
  {
    name: "APQC",
    acronym: "APQC",
    country: "Houston, Texas, USA",
    type: "Research & Methodology Institute",
    description:
      "A member-supported nonprofit headquartered in Houston, Texas, operating for more than 40 years and focused on benchmarking, best practices, and process and performance improvement across functional areas including supply chain management, with more than 1,000 organizational members. Maintains the Process Classification Framework (PCF) and an Open Standards Benchmarking library spanning more than 70 process areas.",
    sourceLabel: "APQC — About",
    sourceUrl: "https://www.apqc.org/about",
    score: 57.5,
    evidenceDimensions: [2],
    rank: 46,
  },
  {
    name: "Indian Institute of Materials Management",
    acronym: "IIMM",
    country: "Navi Mumbai, India",
    type: "Professional Association",
    description:
      "India's professional body for materials management, founded in 1983 with roots in groups formed between 1960 and 1975, including the National Association of Purchasing Executives (Mumbai) and the Purchasing Officers Association (Calcutta). A charter member of IFPSM, headquartered in Navi Mumbai, with around 9,500 members across 56 branches and 19 chapters. Offers AICTE-approved postgraduate qualifications in Materials Management and in Logistics & Supply Chain Management, plus seminars, workshops, and in-house training; publishes the monthly journal Materials Management Review.",
    sourceLabel: "IIMM — official site",
    sourceUrl: "https://iimm.org",
    score: 90,
    evidenceDimensions: [0, 1, 3, 4, 5],
    rank: 2,
  },
  {
    name: "Middle East Logistics Institute",
    acronym: "MELI",
    country: "Dammam, Saudi Arabia",
    type: "Certification & Training Body",
    description:
      "A logistics training institute in Dammam, Saudi Arabia, founded in 2010 as part of Almajdouie Holding's logistics business. Offers specialized training and professional certifications in logistics and supply chain management for practitioners, managers, and executives across the Gulf region.",
    sourceLabel: "Middle East Logistics Institute (MELI) — Almajdouie",
    sourceUrl: "https://almajdouie.com/meli",
    score: 75,
    evidenceDimensions: [1, 3, 4],
    rank: 17,
  },
];

const STAGES: { n: number; title: string; detail: string; status: "Done" | "Pending" }[] = [
  { n: 1, title: "Research design", detail: "Eligibility, criteria, evidence standards, methodology", status: "Done" },
  { n: 2, title: "Candidate research", detail: "42 of 50 proposed organizations independently confirmed (8 excluded as unverifiable); 8 further organizations independently researched and confirmed to complete a set of 50", status: "Done" },
  { n: 3, title: "Verification", detail: "Every confirmed entry's name, headquarters, and description checked against its own official source; corrections applied where needed", status: "Done" },
  { n: 4, title: "Evaluation", detail: "All 50 confirmed organizations scored via a transparent evidence-coverage formula, computed identically for every entry including Supply Chain Institute", status: "Done" },
  { n: 5, title: "Editorial review", detail: "Coverage, geographic, and formula-bias findings disclosed; a preliminary 1–50 rank assigned to every confirmed organization, including Supply Chain Institute", status: "Done" },
  { n: 6, title: "Publication preparation", detail: "Ranking table and a data-grounded narrative report (executive summary and 7 thematic chapters) compiled below", status: "Done" },
  { n: 7, title: "Final quality control", detail: "A mechanical consistency check (ranks, scores, evidence dimensions) found zero issues; a fresh per-candidate source re-check found and corrected 5 inaccuracies, including Supply Chain Institute's own entry — which moves from rank 3 to rank 8 as a result", status: "Done" },
];

const SCORING: { dimension: string; weight: number }[] = [
  { dimension: "Global reach and membership scale", weight: 20 },
  { dimension: "Certification rigor and industry recognition", weight: 20 },
  { dimension: "Industry standard-setting influence", weight: 15 },
  { dimension: "Training and educational quality", weight: 15 },
  { dimension: "Institutional longevity and credibility", weight: 15 },
  { dimension: "Specialization depth and niche authority", weight: 10 },
  { dimension: "Innovation in professional development", weight: 5 },
];

const CHAPTERS: { n: string; title: string; body: string }[] = [
  { n: "00", title: "Executive summary", body: "Purpose of the ranking, key findings, and the themes emerging from the research." },
  { n: "01", title: "The rise of supply chain as an organizational differentiator", body: "How supply chain capability evolved from a back-office cost center into a board-level, strategic differentiator." },
  { n: "02", title: "The global Top 50 ranking", body: "The 50 ranked organizations, each profile evidence-based and consistently structured." },
  { n: "03", title: "The organizations shaping the future", body: "Cross-cutting patterns: AI-enabled planning, network resilience, sustainable sourcing, talent development." },
  { n: "04", title: "Industry perspectives", body: "Distinctive supply chain challenges and strengths across sector — from manufacturing to logistics to retail." },
  { n: "05", title: "Geographic perspectives", body: "Representation and performance trends across North America, Europe, Asia-Pacific, LatAm, MEA." },
  { n: "06", title: "What makes an exceptional supply chain organization", body: "The capabilities the selected organizations demonstrate in common, synthesized from the evidence." },
  { n: "07", title: "Implications for executives and boards", body: "Practical recommendations for strengthening organizational supply chain capability." },
  { n: "08", title: "Methodology and references", body: "Full scoring framework, eligibility, sourcing, limitations, and the corrections policy." },
];

/**
 * Full narrative chapters for Stage 6 (publication preparation), written
 * 2026-10-10. Chapters 02 (the ranking) and 08 (methodology and sourcing)
 * are already covered by the Ranking table and Methodology sections
 * elsewhere on this page, so they have no entry here, mirroring Top 50
 * CSCO's own equivalent report. Every factual claim below traces to a
 * statistic computed directly from the 50 organizations' own stored
 * type/country/score/evidenceDimensions/rank fields (via a Node.js script
 * run against the live candidate data, not estimated or guessed) — never
 * to an invented fact about any organization. The one necessarily-inferred
 * category is headquarters region (not a stored field; inferred from each
 * organization's own stated country/HQ text), disclosed as an inference in
 * chapter 05 itself, the same treatment Top 50 CSCO gives its own
 * geographic chapter.
 */
const REPORT_CHAPTERS: { n: string; title: string; paragraphs: string[] }[] = [
  {
    n: "00",
    title: "Executive summary",
    paragraphs: [
      "This inaugural Top 50 Global Supply Chain Organisation ranking evaluates 50 independently confirmed professional associations, certification bodies, academic institutes, standards organizations, and trade associations that credential, train, and set standards for the global supply chain and procurement profession — using the same transparent, reproducible evidence-coverage formula as GSCI's companion Top 50 CSCO ranking rather than editorial opinion. Every entry is sourced to the organization's own official website or an independent corroborating source: 42 of the 50 organizations originally proposed were confirmed this way, with corrections applied where the submission didn't match the source; 8 could not be verified and were excluded rather than filled in, and 8 further organizations were independently researched to complete the set of 50.",
      "Scores range from 50 to 92.5 out of 100, with a mean of 70.7; the formula rewards sourced detail across seven dimensions — global reach, certification rigor, standard-setting influence, training quality, institutional longevity, specialization depth, and innovation in professional development — weighting each by its stated importance to institutional credibility rather than by subjective judgment. The resulting 1–50 rank, assigned during Stage 5 (editorial review), reflects what each organization's own published materials currently document, not a definitive assessment of which body matters most to the profession.",
      "Three limitations are disclosed rather than smoothed over. Professional associations and certification/training bodies together account for 33 of the 50 entries (66%), while standard-setting bodies, academic institutes, and research methodology institutes together make up only 8. Half the list (25 of 50) is headquartered in North America, with a single entry each from Latin America and Sub-Saharan Africa — both added this pass specifically to begin closing that gap, not yet enough to call it closed. And because the formula rewards how much an organization's own description documents, not a holistic judgment of its standing, a body with a shorter published bio may be under-represented relative to one with more detailed public materials — the same disclosed bias Top 50 CSCO carries. Supply Chain Institute, GSCI's own affiliated organization, is scored and ranked on identical footing to every other entry, per the user's explicit instruction reversing an earlier disclosure-only treatment: a Stage 7 re-check found its description had claimed a certification that does not exist in the organization's current catalog, and correcting that fact — under the same formula applied to every other entry — moves it from rank 3 to rank 8 (score 82.5), part of a six-way tie (American Purchasing Society, BME, Institute for Supply Management, NIGP, Supply Chain Institute, WERC) just behind Transported Asset Protection Association (rank 3, 85, no longer tied), and well behind ASCM (rank 1, 92.5) and IIMM (rank 2, 90).",
    ],
  },
  {
    n: "01",
    title: "The rise of supply chain as an organizational differentiator",
    paragraphs: [
      "Professional credentialing in supply chain and procurement did not emerge from a single institutional model, and this longlist's type distribution reflects that. Twenty of the 50 organizations (40%) are professional associations — member-based bodies built around community, advocacy, and a credential program — and another 13 (26%) are dedicated certification and training bodies, together accounting for two-thirds of the list. The remaining third splits across industry trade associations (7), standards bodies (3), academic and research institutes (3), research and methodology institutes (2), and federations of national associations (2).",
      "That imbalance is itself a finding. Standard-setting — publishing a framework, specification, or benchmark the wider industry adopts, rather than a certification an individual earns — is the rarest institutional function represented here, carried by only a handful of entries (the Standards Bodies, plus a few professional associations and certifiers whose own programs happen to include one, such as ASCM's SCOR Digital Standard). A profession this large and economically significant has, on this evidence, more organizations credentialing individuals than organizations setting the technical standards those credentials rest on.",
    ],
  },
  {
    n: "03",
    title: "The organizations shaping the future",
    paragraphs: [
      "Certification rigor (33 of 50, 66%) and training quality (29 of 50, 58%) are by far the two most commonly evidenced dimensions across this longlist — unsurprising, since credentialing and education are the core business of most organizations here. Specialization depth (19, 38%) and global reach (17, 34%) follow at roughly half that rate; standard-setting influence (11, 22%) and innovation in professional development (8, 16%) are the least commonly documented — the same two functions chapter 01 flags as institutionally thin across the profession as a whole.",
      "Breadth, not any single achievement, separates the top of this ranking from the rest: the 10 highest-ranked organizations evidence an average of 4.4 of the 7 dimensions each, compared with 2.225 for the remaining 40 — nearly double. Only one organization, ASCM, is evidenced across 6 of the 7 dimensions, the ceiling reached by any entry this edition; a further 2 reach 5. The pattern mirrors Top 50 CSCO almost exactly: what the evidence-coverage formula rewards is documented range, not a single standout credential or figure.",
    ],
  },
  {
    n: "04",
    title: "Industry perspectives",
    paragraphs: [
      "Average evidence-coverage scores vary by organization type. Professional associations score highest on average (73.9 across 20 entries), followed closely by standards bodies (73.3, though only 3 entries), certification and training bodies (71.4 across 13), and academic and research institutes (68.3 across 3). Industry trade associations score lowest on average (62.5 across 7) — plausibly because several, such as Material Handling Industry and Associação Brasileira de Logística, function primarily as member-advocacy and event bodies whose published description says less about credentialing or standard-setting specifically, rather than because their institutional role is less significant.",
      "These averages describe what each type's typical public materials document, not a ranking of institutional importance. A trade association's core value to its members — advocacy, networking, sector-specific events — is not one of this formula's seven dimensions by design, since the ranking is scoped to credentialing, standard-setting, and professional development specifically.",
    ],
  },
  {
    n: "05",
    title: "Geographic perspectives",
    paragraphs: [
      "Headquarters location was assessed from each organization's own stated address or stated regional structure — an observation about where each entry is based, not a field independently verified beyond what each organization's own source states, worth stating plainly as an inference the way Top 50 CSCO discloses its own equivalent geographic chapter. By that measure, 25 of the 50 organizations (50%) are headquartered in North America and 14 (28%) in Europe; the remaining 11 split across Asia-Pacific (4: India, Singapore, the Philippines, Australia), three organizations with a distributed, multi-regional structure rather than a single headquarters (Supply Chain Institute, TAPA, World Commerce & Contracting), the Middle East (2: Blue Ocean Academy, Middle East Logistics Institute), and a single entry each from Sub-Saharan Africa (SAPICS) and Latin America (Associação Brasileira de Logística).",
      "The Latin America and Sub-Saharan Africa entries were added specifically this pass to begin closing a gap the editorial review disclosed when the list stood at 42 organizations, all from North America, Europe, or Asia-Pacific/the Middle East. One organization each is a start, not a resolution: this remains the thinnest-represented dimension of the list, and a priority for further research in a future edition.",
    ],
  },
  {
    n: "06",
    title: "What makes an exceptional supply chain organization",
    paragraphs: [
      "Within this ranking's own terms, most organizations (27 of 50, 54%) show evidence in two or three of the seven dimensions; only 3 show evidence in five or more, and a single organization, ASCM, is evidenced across six of the seven — the ceiling reached by any entry in this edition. Two organizations, Associação Brasileira de Logística and Material Handling Industry, show no evidence-tagged dimension at all: both are real, independently confirmed organizations whose own published description simply states little the formula's keywords recognize, not an assessment that either is a weak institution.",
      "As with Top 50 CSCO, this pattern describes what the methodology rewards — a description that documents reach, rigor, standard-setting, training, longevity, specialization, and innovation all at once — not a universal definition of institutional excellence. An organization whose real strength lies in an area its own materials don't elaborate on would score lower here regardless of that strength.",
    ],
  },
  {
    n: "07",
    title: "Implications for executives and boards",
    paragraphs: [
      "Four points from this edition are worth the attention of HR, learning and development, and procurement leaders choosing which credentials and standards to invest in, independent of where any single organization lands in the rank order. First, the profession's credentialing landscape is institutionally fragmented — two-thirds of the organizations in this list are professional associations or certification bodies, each typically with its own exam, curriculum, and designation, with comparatively few organizations setting the shared technical standards those credentials could be benchmarked against.",
      "Second, the breadth pattern in this data — top-ranked organizations evidence more dimensions at once, not one flagship strength — suggests decision-makers evaluating a credentialing body should look at the full range of what it documents (reach, rigor, standard-setting, training quality, longevity, specialization, innovation) rather than a single marketing claim.",
      "Third, the geographic concentration disclosed above means fewer independently benchmarked credentialing options are visible for organizations operating primarily in Latin America, the Middle East, or Sub-Saharan Africa — a gap worth factoring into any global talent-development strategy until GSCI's own research reach improves there.",
      "Finally, this ranking — like any evidence-coverage methodology — rewards what an organization has published about itself, not necessarily its true standing in the profession. Decision-makers should treat it as one input for due diligence, not a substitute for it — including, explicitly, for Supply Chain Institute's own position: Stage 7 fact-checking moved it from rank 3 to rank 8 this pass, after correcting a claimed certification that does not exist in the organization's current catalog, the same mechanical formula re-applied to a corrected fact, with no exemption for GSCI's own affiliated organization.",
    ],
  },
];

const TYPE_ACCENTS = ["#3987e5", "#199e70", "#d95926", "#a1a1aa", "#5b9ef0", "#f6b73c"];

/**
 * Candidate grid, ranking table, etc. are all sorted by this rank, not
 * research-insertion order. Computed once at module load from the `rank`
 * field already present on each candidate — never hand-ordered. Candidates
 * without a rank (should not occur once Stage 5 is complete) sort to the
 * end.
 */
const RANKED_CANDIDATES: OrgCandidate[] = [...CANDIDATES].sort(
  (a, b) => (a.rank ?? Number.MAX_SAFE_INTEGER) - (b.rank ?? Number.MAX_SAFE_INTEGER)
);

export function Top50Organizations() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
      {/* Cover — plain panel background (no photo yet); matches the Top 50
          CSCO report's own starting point before a cover photo was added. */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-3 py-1.5 text-xs text-ink-secondary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-1.5 w-1.5 rounded-full bg-signal-cyan pulse-dot" />
          </span>
          Global Supply Chain Index · 2026 Edition · {CANDIDATES.length} candidates confirmed, scored, and ranked
        </div>

        <p className="mt-5 font-mono text-xs uppercase tracking-wider text-ink-muted">
          Top 50 Global Supply Chain Organisation — World Ranking Report
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-primary sm:text-4xl">
          A global ranking of the world&apos;s leading supply chain organizations.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-secondary">
          Published by Global Supply Chain Index, recognizing the professional
          associations, certification bodies, academic institutes, and
          standards organizations that credential, educate, and set standards
          for the global supply chain and procurement profession — for CEOs,
          HR and learning leaders, supply chain and procurement
          professionals, and academics.
        </p>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-signal-amber/30 bg-signal-amber/10 p-4">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-signal-amber" strokeWidth={2} />
          <p className="text-[13px] leading-relaxed text-ink-secondary">
            Candidate research, verification, evaluation, editorial review,
            publication preparation, and final quality control are all
            complete for this pass — all 7 pipeline stages are now done.
            GSCI does not invent organization names, affiliations,
            achievements, or quotations. Of the 50 organizations originally
            proposed, 42 were independently confirmed via each
            organization&apos;s own official source — with corrections
            applied where the submitted name, headquarters, or description
            didn&apos;t match what that source actually says — and 8 could
            not be verified, so they were excluded rather than filled in. To
            reach a full set of 50, 8 additional organizations were
            independently researched and confirmed the same way, each
            against its own official source. A final Stage 7 re-check —
            re-fetching every organization&apos;s own official source and
            re-confirming every scored claim — found and corrected 5
            inaccuracies, most consequentially in Supply Chain
            Institute&apos;s own entry: its description had claimed a
            certification, &quot;Digital Supply Chain Transformation,&quot;
            that does not exist in the organization&apos;s current
            catalog. Correcting it, under the same mechanical formula
            applied to every other entry, moves Supply Chain Institute from
            rank 3 to rank 8. All {CANDIDATES.length} confirmed
            organizations, including Supply Chain Institute, carry a
            transparent evidence-coverage score and a final 1–
            {CANDIDATES.length} rank, both computed by the same mechanical
            formula with no exemptions. A ranking table and a full
            narrative report are compiled below.
          </p>
        </div>
      </div>

      {/* Objectives */}
      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
          Objectives
        </h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl bg-border-subtle sm:grid-cols-2">
          {OBJECTIVES.map(({ icon: Icon, accent, title, body }) => (
            <div key={title} className="bg-panel p-6">
              <Icon className="h-5 w-5" strokeWidth={2} style={{ color: accent }} />
              <h3 className="mt-4 text-sm font-medium text-ink-primary">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology */}
      <div id="methodology" className="mt-16 grid scroll-mt-20 gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
            Methodology — the 100-point framework
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            Unlike Top 50 CSCO, which ranks individual executives at
            operating companies, this report ranks professional
            associations, certification bodies, and academic institutes —
            organizations that credential and educate the profession rather
            than run a supply chain themselves. The framework reflects that:
            it weighs global reach, certification rigor, standard-setting
            influence, training quality, institutional longevity,
            specialization depth, and innovation in professional
            development, built from each organization&apos;s own published
            materials and independent corroborating sources — never from
            assumption.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            Every confirmed organization — Supply Chain Institute included
            — is scored by the same mechanical evidence-coverage formula
            shown in the table: full weight for a dimension if the
            organization&apos;s own description evidences it, half weight if
            not. No organization is scored or exempted by hand. Before
            publication, GSCI will still disclose which selection model was
            used for any eventual ranking — independent editorial
            assessment, nomination-based, jury-selected, data-driven, or a
            clearly labeled hybrid — along with any commercial relationship
            that could bear on eligibility; commercial participation is
            never treated as evidence of merit.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            Every entry below is sourced to a primary reference — the
            organization&apos;s own official website, or an independent
            corroborating source where one was used — linked directly from
            its own card rather than gathered separately.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-panel-raised text-left text-xs uppercase tracking-wider text-ink-muted">
                <th className="px-4 py-3 font-medium">Evaluation dimension</th>
                <th className="px-4 py-3 text-right font-medium">Weight</th>
              </tr>
            </thead>
            <tbody>
              {SCORING.map((row) => (
                <tr key={row.dimension} className="border-b border-border-subtle last:border-0">
                  <td className="px-4 py-3 text-ink-secondary">{row.dimension}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-ink-primary">
                    {row.weight}%
                  </td>
                </tr>
              ))}
              <tr className="bg-panel-raised">
                <td className="px-4 py-3 font-medium text-ink-primary">Total</td>
                <td className="px-4 py-3 text-right font-mono font-medium tabular-nums text-ink-primary">
                  100%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Planned report structure */}
      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
          Planned report structure
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map((c) => {
            const anchor = c.n === "02" ? "#ranking-table" : c.n === "08" ? "#methodology" : `#ch-${c.n}`;
            return (
              <a
                key={c.n}
                href={anchor}
                className="block rounded-xl border border-border bg-panel p-5 transition-colors hover:bg-white/[0.03]"
              >
                <span className="font-mono text-xs text-ink-muted">{c.n}</span>
                <h3 className="mt-2 text-sm font-medium text-ink-primary">{c.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{c.body}</p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Candidate longlist */}
      <div id="candidates" className="mt-16 scroll-mt-20">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
          Candidate longlist — {CANDIDATES.length} confirmed, verified, scored, and ranked
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-secondary">
          The {CANDIDATES.length} organizations GSCI could independently
          confirm — 42 from the 50 originally proposed, plus 8 more
          researched to complete the set — sorted by a final 1–
          {CANDIDATES.length} rank, re-verified in Stage 7 (final quality
          control). Scores and rank are computed
          mechanically from each organization&apos;s own description against
          the seven dimensions in the scoring table above: full weight for
          a dimension the description evidences, half weight if not, sorted
          score descending with ties broken alphabetically — applied
          identically to every organization, including Supply Chain
          Institute, with no exemptions. Cyan tags show which dimensions
          each organization&apos;s sourced description provides direct
          evidence for; an organization with fewer tags simply has a
          shorter description on file, not a weaker record. Each card still
          links to the official source used to verify it.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RANKED_CANDIDATES.map((c, i) => (
            <div key={c.name} className="flex flex-col rounded-xl border border-border bg-panel p-5">
              <div className="flex items-center gap-3">
                {typeof c.rank === "number" && (
                  <span
                    className="flex h-7 min-w-[28px] flex-shrink-0 items-center justify-center rounded-md border border-signal-emerald/30 bg-signal-emerald/10 px-1.5 font-mono text-[11.5px] font-bold text-signal-emerald"
                    title="Rank — formula-derived evidence-coverage sort, preliminary until Stage 7 (final QC)"
                  >
                    #{c.rank}
                  </span>
                )}
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-display text-[11px] font-semibold leading-none text-white"
                  style={{ backgroundColor: TYPE_ACCENTS[i % TYPE_ACCENTS.length] }}
                >
                  {c.acronym.slice(0, 4).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-primary">{c.name}</p>
                  <p className="truncate text-[12px] text-ink-muted">{c.country}</p>
                </div>
                {typeof c.score === "number" && (
                  <div
                    className="flex flex-shrink-0 flex-col items-center justify-center rounded-lg border border-signal-cyan/25 bg-signal-cyan/10 px-2.5 py-1"
                    title="Evidence-coverage score, out of 100 — not a holistic judgment; see methodology note above"
                  >
                    <span className="font-mono text-sm font-semibold leading-none text-signal-cyan">
                      {c.score}
                    </span>
                    <span className="text-[8.5px] leading-none text-signal-cyan/70">/100</span>
                  </div>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="inline-flex w-fit items-center rounded-full border border-border px-2.5 py-1 text-[11px] text-ink-secondary">
                  {c.type}
                </span>
              </div>
              {c.evidenceDimensions && c.evidenceDimensions.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-ink-muted">
                    Evidence:
                  </span>
                  {c.evidenceDimensions.map((d) => (
                    <span
                      key={d}
                      className="inline-flex w-fit items-center rounded-full border border-signal-cyan/25 bg-signal-cyan/10 px-2 py-0.5 text-[10.5px] text-signal-cyan"
                    >
                      {DIMENSION_LABELS[d]}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink-secondary">{c.description}</p>
              <div className="mt-4 border-t border-border-subtle pt-3">
                <a
                  href={c.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-signal-cyan hover:opacity-80"
                >
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                  {c.sourceLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ranking table — Stage 6 (publication preparation) */}
      <div id="ranking-table" className="mt-16 scroll-mt-20">
        <div className="flex items-center gap-2.5">
          <ListOrdered className="h-5 w-5 text-signal-emerald" strokeWidth={2} />
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
            Ranking table
          </h2>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-secondary">
          The same {CANDIDATES.length} organizations as the longlist above, condensed into a
          single publication-style table — sorted by the Stage 5 rank (score descending, ties
          broken alphabetically), still preliminary until Stage 7 (final quality control).
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-panel-raised text-left text-xs uppercase tracking-wider text-ink-muted">
                <th className="px-4 py-3 font-medium">Rank</th>
                <th className="px-4 py-3 font-medium">Organization</th>
                <th className="px-4 py-3 font-medium">Acronym</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Country / HQ</th>
                <th className="px-4 py-3 text-right font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              {RANKED_CANDIDATES.map((c) => (
                <tr
                  key={c.name}
                  className="border-b border-border-subtle text-[12.5px] last:border-0 odd:bg-white/[0.012] hover:bg-white/[0.035]"
                >
                  <td className="px-4 py-2.5 font-mono font-semibold text-signal-emerald">
                    #{c.rank}
                  </td>
                  <td className="px-4 py-2.5 font-medium text-ink-primary">{c.name}</td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-ink-secondary">{c.acronym}</td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-ink-muted">{c.type}</td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-ink-muted">{c.country}</td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums text-signal-cyan">
                    {c.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full report — Stage 6 (publication preparation) */}
      <div id="full-report" className="mt-16 scroll-mt-20">
        <div className="flex items-center gap-2.5">
          <FileText className="h-5 w-5 text-signal-cyan" strokeWidth={2} />
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
            Full report
          </h2>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-secondary">
          The narrative chapters outlined above, drafted during Stage 6. Every statistic cited
          below is computed directly from the {CANDIDATES.length} organizations&apos; own types,
          countries, scores, evidence tags, and ranks shown throughout this page — nothing here
          is invented or assumed about any organization. Chapters 02 (the ranking) and 08
          (methodology and sourcing) are covered by the Ranking table and Methodology sections
          above rather than repeated here. Stage 7 (final quality control) will re-verify every
          statistic below against the live candidate data, the same way it did for Top 50 CSCO.
        </p>
        <div className="mt-8 space-y-10">
          {REPORT_CHAPTERS.map((ch) => (
            <div key={ch.n} id={`ch-${ch.n}`} className="scroll-mt-20 border-t border-border-subtle pt-8 first:border-0 first:pt-0">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-ink-muted">{ch.n}</span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink-primary">
                  {ch.title}
                </h3>
              </div>
              {ch.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-secondary">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Research & verification pipeline */}
      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
          Research & verification pipeline
        </h2>
        <p className="mt-2 text-sm text-ink-secondary">
          Seven stages, each completed in sequence — verification is never
          skipped to meet a publication date.
        </p>
        <div className="mt-6 divide-y divide-border-subtle overflow-hidden rounded-xl border border-border">
          {STAGES.map((s) => (
            <div key={s.n} className="flex items-center gap-4 bg-panel px-5 py-4">
              <span className="font-mono text-xs text-ink-muted">{s.n}</span>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-ink-primary">{s.title}</h3>
                <p className="mt-0.5 text-[13px] text-ink-secondary">{s.detail}</p>
              </div>
              <span
                className={
                  s.status === "Done"
                    ? "shrink-0 rounded-full border border-status-good/30 bg-status-good/10 px-2.5 py-1 text-[11px] font-medium text-status-good"
                    : "shrink-0 rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-ink-muted"
                }
              >
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-border-subtle pt-10">
        <a
          href="#candidates"
          className="inline-flex items-center gap-2 rounded-lg bg-signal-cyan px-5 py-3 text-sm font-medium text-white shadow-glow transition-opacity hover:opacity-90"
        >
          <ListOrdered className="h-4 w-4" strokeWidth={2} />
          View candidate longlist
        </a>
        <a
          href="#full-report"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-ink-primary transition-colors hover:bg-white/[0.04]"
        >
          <FileText className="h-4 w-4" strokeWidth={2} />
          Full report
        </a>
        <a
          href="#ranking-table"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-ink-primary transition-colors hover:bg-white/[0.04]"
        >
          <ListOrdered className="h-4 w-4" strokeWidth={2} />
          Ranking table
        </a>
        <Link
          href="/reports"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-ink-primary transition-colors hover:bg-white/[0.04]"
        >
          <ClipboardCheck className="h-4 w-4" strokeWidth={2} />
          Back to Report Center
        </Link>
      </div>
    </div>
  );
}

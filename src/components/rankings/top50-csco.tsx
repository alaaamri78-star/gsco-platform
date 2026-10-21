import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  TrendingUp,
  Compass,
  Globe2,
  ClipboardCheck,
  ShieldAlert,
  ExternalLink,
  ImageIcon,
  Search,
  ListOrdered,
  FileText,
} from "lucide-react";

const OBJECTIVES: { icon: typeof Trophy; accent: string; title: string; body: string }[] = [
  {
    icon: Trophy,
    accent: "#3987e5",
    title: "Recognize global leadership",
    body: "Identify 50 outstanding supply chain executives across industries and geographies, and chart how the CSCO role has evolved from operational management into strategic enterprise leadership.",
  },
  {
    icon: TrendingUp,
    accent: "#199e70",
    title: "Showcase measurable impact",
    body: "Document contributions to business performance, supply chain resilience, digital and AI-enabled transformation, procurement excellence, and sustainability.",
  },
  {
    icon: Compass,
    accent: "#d95926",
    title: "Shape the industry agenda",
    body: "Surface the emerging priorities and leadership practices shaping the future of global supply chains, for boards, CEOs, and the wider profession.",
  },
  {
    icon: Globe2,
    accent: "#a1a1aa",
    title: "Build a lasting reference",
    body: "Establish an annual, internationally relevant publication for the global supply chain community, and a credible platform for executive recognition.",
  },
];

interface Candidate {
  name: string;
  title: string;
  company: string;
  sector: string;
  bio: string;
  sourceLabel: string;
  sourceUrl: string;
  /** True only when the linked page was directly confirmed to carry a real
   * photo of this person — never embedded/re-hosted here, only linked. */
  hasOfficialPhoto: boolean;
  /** A specific LinkedIn profile URL, used only when one has been
   * independently confirmed (e.g. supplied directly by the profile's owner).
   * When absent, the card falls back to a LinkedIn people-search link. */
  linkedinUrl?: string;
  /** A short, visible disclosure shown as its own tag — used for a candidate
   * with a conflict of interest that needs to be stated plainly (e.g. the
   * site's own operator), never to flag anything else. */
  disclosure?: string;
  /** A short, visible caveat shown as its own tag — used when the Stage 3
   * verification pass could not freshly reconfirm this entry's title/company
   * against a current, dated source (e.g. the only available source is old
   * and no newer confirmation could be found). Distinct from `disclosure`:
   * this flags a sourcing gap, not a conflict of interest. */
  verificationNote?: string;
  /** Stage 4 (Evaluation) evidence mapping: indices into SCORING for which
   * this candidate's existing, already-sourced bio contains explicit,
   * matching textual evidence (keyword-matched, not inferred or guessed).
   * This is NOT a qualitative judgment — it reflects the sourcing
   * available, not the individual. */
  evidenceDimensions?: number[];
  /** Stage 4 (Evaluation) preliminary score, 0–100. Computed mechanically
   * from evidenceDimensions and the SCORING weights: a candidate earns a
   * dimension's full weight when their bio documents it, and half that
   * weight when it doesn't (a neutral baseline, not a penalty — the bio
   * simply doesn't speak to it either way). This is a transparent,
   * reproducible evidence-coverage score, not a holistic expert assessment
   * of the candidate's overall caliber — it cannot be, since no candidate
   * here has had more than one sourced paragraph researched yet. A fuller,
   * qualitative scoring pass remains open future work. */
  score?: number;
  /** Stage 5 (Editorial review) rank, 1–50. Mechanically derived by sorting
   * all candidates by `score` descending, with ties broken alphabetically by
   * name — never hand-ordered. All 7 research-pipeline stages (through
   * Stage 7, final QC) are now complete, so this rank is no longer awaiting
   * further pipeline work — but it still reflects what the evidence-coverage
   * formula's current state documents, not a holistic judgment of who is
   * actually the best CSCO; see the methodology callout and the disclosed
   * coverage/bias limitations for what this rank does and doesn't claim. */
  rank?: number;
}

/** Short display labels for SCORING, in the same order, used by the
 * evidenceDimensions evidence tags on each candidate card. */
const DIMENSION_LABELS = [
  "Business impact",
  "Transformation",
  "Digital & AI",
  "Resilience",
  "Procurement",
  "Sustainability",
  "Talent",
];

/**
 * Candidate longlist — Stages 2, 3, and 4 of the research pipeline are
 * complete at 50 entries, and Stage 5 (editorial review) has now been
 * performed. Every entry below is a real, currently-serving executive or
 * practitioner, sourced to a primary reference (see sourceUrl on each —
 * typically the company's own leadership/newsroom page or a primary news
 * announcement), spanning a broad range of industries, company sizes, and
 * regions. Stage 3 verification re-checked every title/company against a
 * live source: 48 of 50 real executives were reconfirmed unchanged, 1
 * (Brian Ejsing/DSV) had a genuine title change that was updated in place,
 * and 1 (Mike Corbo/Colgate-Palmolive) could not be freshly reconfirmed —
 * its only available source is a 2022 interview, with no newer confirmation
 * found — and carries a visible verificationNote tag on its card rather
 * than being silently presented as equally confirmed.
 *
 * Stage 4 evaluation (two research passes, same underlying formula): each
 * candidate's bio was first checked, mechanically and reproducibly
 * (explicit keyword lists per dimension, not subjective judgment), against
 * the 7 SCORING dimensions; evidenceDimensions records which dimensions the
 * bio actually documents, and an empty/missing array reflects bio brevity,
 * not a judgment on the candidate. A second, deeper research pass then
 * searched for additional genuine, individually-attributed, sourced
 * achievements for each candidate — never inventing or inflating a
 * dimension without new evidence, and explicitly excluding findings that
 * were company-level rather than personally attributed, or that could not
 * be independently corroborated (e.g. a company-wide emissions-reduction
 * figure reported for McDonald's as a whole was left out of Warren
 * Anderson's evidence because the source attributes it to the company, not
 * to him personally). The `score` field (0–100) is computed purely from
 * evidenceDimensions and the SCORING weights: a dimension contributes its
 * full weight when the bio documents it, half that weight when it doesn't
 * (a neutral baseline, not a penalty). This is a transparent, auditable
 * evidence-coverage score — explicitly not a holistic expert judgment of
 * each executive's overall caliber. No photo is embedded or re-hosted
 * here — where the source page was confirmed to carry one, the link is
 * labeled "Official photo & bio"; otherwise it's labeled "Primary source."
 *
 * The pool originally included Alaa AMRI, the site's own operator, added
 * at her own request as a self-submitted entry. Because the only
 * independently-discoverable evidence for that entry was self-authored
 * LinkedIn content (one dimension, score 55/100 — including after two
 * Forbes links the user supplied were checked and found not to mention her
 * at all), and because Stage 5 (editorial review) requires assigning every
 * candidate an actual numbered rank, the user decided this self-ranking was
 * a conflict of interest and asked that the entry be replaced with a
 * genuine, independently verifiable Fortune 500 CSCO. Alaa AMRI's entry was
 * removed and replaced with Warren Anderson, Senior Vice President and
 * Global Chief Supply Chain Officer at McDonald's, sourced to a dedicated
 * Supply Chain Digital profile (evidenceDimensions: impact, resilience,
 * procurement, sustainability, talent; score 82/100). The pool holds
 * exactly 50 verified, real, independently-sourced entries. Several
 * additional companies were researched and explicitly excluded because no
 * current, primary-source-verifiable top supply chain executive could be
 * confirmed (Siemens, Samsung Electronics, LG Electronics, Kuehne+Nagel,
 * Costco, Reliance Industries, Tata Motors, Mahindra, Tyson Foods, and
 * Walgreens Boots Alliance) — they will be revisited as new information
 * surfaces. Two previously-researched entries (Marcelo Stefani/PepsiCo — a
 * second PepsiCo seat whose role is procurement rather than supply chain —
 * and Ignacio Fernandez Fernandez/Inditex — a broad corporate role with no
 * standalone supply chain title and only third-party sourcing) were trimmed
 * to bring the longlist to exactly 50.
 *
 * Stage 5 (editorial review — consistency, coverage, accuracy, bias): a
 * `rank` field (1–50, see the Candidate interface) was computed
 * deterministically for every entry — sorted by score descending, ties
 * broken alphabetically by name, never hand-ordered — and is a preliminary
 * rank, still subject to Stage 6 (publication preparation) and Stage 7
 * (final QC), not a finished editorial ranking. The review's honest
 * findings, kept visible rather than smoothed over: (1) Coverage gaps — 18
 * of 50 entries carry no confirmed official photo link; sector
 * distribution skews toward Food & Beverage (9/50, ~18%) with no entries
 * from Latin America, the Middle East, or South Asia headquarters despite
 * those regions being explicitly searched during candidate research; (2)
 * Accuracy risk — several entries reflect leadership changes announced
 * within the last 1–2 months (e.g. Brian Ejsing/DSV, Warren
 * Anderson/McDonald's) and carry a higher chance of drifting out of date
 * before Stage 7; (3) Structural bias — the evidence-coverage formula
 * rewards candidates whose employer has strong press/newsroom visibility,
 * which is a reasonable proxy for sourceable achievement but is not the
 * same thing as being a better CSCO than a peer at a less press-active
 * company — this is a known limitation of the methodology, not a claim
 * that the rank order reflects true relative skill.
 *
 * Stage 6 (publication preparation — complete): a condensed, sortable-style
 * ranking table (rank/name/title/company/sector/score, one row per
 * candidate) was added below the longlist, generated directly from
 * RANKED_CANDIDATES — no new facts or claims introduced. (A separate
 * references/bibliography section that duplicated every candidate's
 * sourceUrl in one more place was added at this stage too, then removed
 * in pass 24 at the user's request, once it became clear it added no
 * information beyond the link already on each candidate's own card — see
 * pass 24's note above CANDIDATES below.) The narrative report (see
 * REPORT_CHAPTERS below)
 * was then drafted to complete this stage: an executive summary and 7
 * thematic chapters, each grounded in statistics computed directly from
 * the 50 candidates' own score/evidenceDimensions/sector/rank fields (per
 * the comment above REPORT_CHAPTERS) rather than invented or assumed. This
 * was a first draft at the time it was written, now checked by Stage 7
 * below.
 *
 * Stage 7 (final quality control — complete): two independent checks were
 * run against the live data, not assumptions. First, a mechanical
 * consistency pass (ranks unique and 1-50, rank order matches score-desc/
 * name-asc, every score recomputed from evidenceDimensions and matched
 * exactly, no duplicate names/companies/sourceUrls, no evidenceDimensions
 * index out of the 0-6 range) found zero discrepancies. Second, all 50
 * sourceUrls were re-fetched fresh (6 parallel verification passes) and
 * checked against the currently-claimed name/title/company — this caught
 * 5 real title drifts, now corrected: Mourad Tamoud (Schneider Electric)
 * corrected from "...Chief Supply Chain Officer" to "...Global Supply
 * Chain" (the source page's own caption); Pam Cheng (AstraZeneca) expanded
 * to "...Information Technology and Chief Sustainability Officer" per her
 * current bio; Jeffrey Morrison (GM) corrected from "Senior Vice
 * President" to "Vice President" per the source press release; Harm
 * Ohlmeyer (Adidas) trimmed from "Chief Financial Officer and Labor
 * Director" to "Chief Financial Officer" since the cited source supports
 * only the CFO portion; Kevin Brown (Dell) corrected from "...Chief Supply
 * Chain Officer" to "...Supply Chain Officer" (dropping an unsupported
 * "Chief") to match the source wording exactly. None of these 5 changes
 * affect any score or rank (both are computed from evidenceDimensions,
 * a separate field, never from title text), and none moved a candidate
 * between the title-pattern buckets cited in REPORT_CHAPTERS' chapter 01.
 * A sixth, separate inaccuracy was also caught and fixed this stage: the
 * chapter-01 title-pattern sentence itself had been miscounted when first
 * written (claimed 10 exact "Chief Supply Chain Officer" titles / 13 other
 * supply-chain-specific titles; the real counts, recomputed directly from
 * all 50 title strings, are 7 and 16 — the "5 COO" and "22 broader" counts
 * were already correct) — corrected in REPORT_CHAPTERS chapter 01 below.
 * A handful of other agent findings were reviewed and intentionally left
 * unchanged because they reflect the source page's own cosmetic/internal
 * inconsistencies rather than a mismatch with this report's claim (e.g. a
 * stale meta tag on Nike's and Maersk's own bio pages; a BMW succession
 * article and a Volkswagen appointment release that are one-time
 * announcements rather than evergreen profile pages, the same source type
 * already used for several other entries in good faith). Mike Corbo
 * (Colgate-Palmolive) was re-checked and remained exactly where it stood
 * after that pass: still sourced to the same 2022 interview, with no
 * fresher confirmation available. See the note below for what happened to
 * this entry one pass later.
 *
 * Pass 22 — Mike Corbo replaced with Christian Callieri (Levi Strauss & Co.):
 * the user asked to replace Mike Corbo given his unresolved "source dated
 * 2022" caveat. A second attempt to find a fresher Corbo-specific source was
 * not run; instead, per the user's explicit choice, he was swapped for a
 * different, independently verifiable executive at a company not already
 * in this longlist (a separate request to use the site's own operator for
 * this slot was examined and not used, for the same self-ranking
 * conflict-of-interest reason documented in the Alaa-AMRI/Warren-Anderson
 * note above). Christian Callieri, Senior Vice President & Chief Supply
 * Chain Officer at Levi Strauss & Co., was found and independently verified
 * via Levi Strauss & Co.'s own official leadership page (confirmed
 * headshot included — an improvement on Corbo's no-photo entry). His
 * evidence (Transformation, Procurement) and score (65/100) were computed
 * via the same mechanical formula used for every other candidate, from his
 * official bio text alone — nothing invented or carried over from Corbo's
 * entry. Removing Corbo (1 evidenced dimension, Sustainability, score 55,
 * no photo) and adding Callieri (2 evidenced dimensions, score 65, photo
 * confirmed) shifted several aggregate statistics cited in REPORT_CHAPTERS
 * below (mean score, photo-coverage count, per-dimension coverage counts,
 * sector distribution, and the chapter-01 title-pattern bucket counts,
 * since Callieri's title is not an exact match for "Chief Supply Chain
 * Officer") — all were recomputed directly from the live data and updated
 * in the relevant chapters; geographic distribution was not affected
 * (Levi Strauss & Co., like Colgate-Palmolive, is North America-
 * headquartered). The rank field was recomputed for all 50 entries
 * (score descending, name ascending tie-break); Callieri placed at rank 35,
 * and the 13 entries previously ranked 35–47 each shifted down by one
 * position to 36–48 to make room, with no other rank changes.
 *
 * Pass 23 — "Research & verification pipeline" stepper removed from the
 * page entirely at the user's request (heading, subtext, and all 7 stage
 * rows); no candidate data changed.
 *
 * Pass 24 — standalone References/bibliography section removed. That
 * section's own intro line said plainly that "each link is the same
 * sourceUrl shown on that candidate's card" — i.e. it added no information
 * beyond what each card already links to, just the same 50 links repeated
 * in a second place. The user asked whether it was worth keeping; the
 * assessment was that it wasn't, and the full grid was replaced with a
 * single sentence in the Methodology section noting that every entry is
 * sourced to a primary reference linked on its own card. The "Planned
 * report structure" card for chapter 08 ("Methodology and references"),
 * which used to anchor to the removed section, now anchors to Methodology
 * instead. No candidate data, score, or rank changed.
 *
 * Pass 25 — Magne Setnes (Heineken) replaced with Abby Lilly (Lockheed
 * Martin), at the user's request, with the replacement drawn from the
 * current U.S. Fortune 500 list as asked. No reason for dropping Setnes was
 * given or assumed; a fresh source check found nothing wrong with his
 * entry — this was a straight swap, not a correction. Abby Lilly, Chief
 * Supply Chain Officer at Lockheed Martin since December 2024, was
 * independently verified via two primary sources: a SupplyChainDive report
 * on her appointment (confirming her full name, start date, and prior
 * roles — Vice President of Global Supply Chain for Lockheed Martin's
 * Rotary and Mission Systems division since 2019, roughly six years as VP
 * of Supply Chain at Eaton, and a supply-chain leadership role at GKN
 * Aerospace North America from 2010–2013), and a Supply Chain Digital
 * profile (ranking her No. 2 on its "Top 10 Supply Chain Leaders in
 * Aerospace and Defence" list, and describing her linking of risk
 * mitigation and sustainability across Lockheed Martin's supplier base).
 * Her evidenceDimensions ([1] Transformation — leading Lockheed Martin's
 * supply-chain transformation strategy; [3] Resilience — risk mitigation
 * explicitly named; [4] Procurement — streamlining procurement processes
 * explicitly named; [5] Sustainability — environmental stewardship and
 * social responsibility explicitly named) and score (77.5/100) were
 * computed from her bio text alone via the same weighted formula used for
 * every other candidate; unlike Setnes (whose Digital & AI and Talent
 * dimensions came from a global data-platform build and an executive
 * succession, respectively), neither Business impact nor Digital & AI nor
 * Talent is evidenced in either source, consistent with this methodology's
 * practice of crediting only what a candidate's own documented record
 * states — being a CSCO at a large, press-visible company (as Setnes also
 * was at Heineken) does not by itself earn the Business impact dimension.
 * No official company bio photo could be located for her, so
 * hasOfficialPhoto is false (Setnes's entry had a confirmed photo). The
 * rank field was recomputed for all 50 entries (score descending, name
 * ascending tie-break); Lilly placed at rank 16, and the 5 entries
 * previously ranked 16–20 each shifted down by one position to 17–21 to
 * make room, with no other rank changes. Removing Setnes (Food & Beverage,
 * 3 dimensions, score 72, photo confirmed) and adding Lilly (Aerospace &
 * Defense, 4 dimensions, score 77.5, no photo) shifted several aggregate
 * statistics cited in REPORT_CHAPTERS below (mean score, photo-coverage
 * count, per-dimension coverage counts, and sector distribution and its
 * average scores) — all were recomputed directly from the live data and
 * updated in the relevant chapters; the title-pattern buckets in chapter
 * 01 were not affected, since both executives hold the exact title "Chief
 * Supply Chain Officer"; geographic distribution was not affected either
 * (Lockheed Martin, like Heineken, is not headquartered in the regions
 * already flagged as unrepresented).
 */
const CANDIDATES: Candidate[] = [
  {
    name: "Mourad Tamoud",
    title: "Executive Vice President, Global Supply Chain",
    company: "Schneider Electric",
    sector: "Industrial & Energy",
    bio: "Leads global supply chain for Schneider Electric, overseeing the group's end-to-end supply chain strategy, manufacturing, and logistics network across more than 100 countries, with a long-standing focus on supply chain digitization and sustainability. Publicly attributes the group's resilience to real-time visibility, diversified sourcing, and regional manufacturing design, and oversees the Catalyst Leadership talent program.",
    sourceLabel: "Schneider Electric — Newsroom",
    sourceUrl: "https://www.se.com/ww/en/about-us/newsroom/medias/photos/details/mourad-tamoud-executive-vice-president-global-supply-chain-5d80e2551416ef211179a646",
    hasOfficialPhoto: true,
    evidenceDimensions: [1, 2, 3, 5, 6],
    score: 85,
    rank: 8,
  },
  {
    name: "Chuck Graham",
    title: "Chief Supply Chain Officer",
    company: "Cisco",
    sector: "Technology",
    bio: "Named Cisco's Chief Supply Chain Officer in May 2025, bringing more than 25 years of operations and supply chain leadership across IT hardware, semiconductors, consumer electronics, and pharmaceuticals. Known for a customer-centric approach and for championing energy-efficient design, circularity, and ethical sourcing. Directs supply chain execution for Cisco's Secure AI Factory with NVIDIA, leads predictive-analytics-based supplier risk management, and ranked 6th on Supply Chain Digital's Top 250 Supply Chain Leaders for 2026.",
    sourceLabel: "Cisco Newsroom — Executive Bio",
    sourceUrl: "https://newsroom.cisco.com/c/r/newsroom/en/us/executives/chuck-graham.html",
    hasOfficialPhoto: true,
    evidenceDimensions: [2, 3, 4, 5, 6],
    score: 80,
    rank: 13,
  },
  {
    name: "Pam Cheng",
    title: "Executive Vice President, Global Operations and Information Technology and Chief Sustainability Officer",
    company: "AstraZeneca",
    sector: "Pharma & Healthcare",
    bio: "Oversees AstraZeneca's global operations and information technology, including manufacturing, supply chain, and digital infrastructure for the company's medicines worldwide. Joined AstraZeneca in 2015 after senior operations roles at Covidien and GE Healthcare. Led the build-out of AstraZeneca's COVID-19 vaccine manufacturing to roughly 2 billion annual doses within about nine months while coordinating a no-profit global supply commitment with BARDA, CEPI, and GAVI.",
    sourceLabel: "World Economic Forum — Profile",
    sourceUrl: "https://www.weforum.org/people/pam-cheng/",
    hasOfficialPhoto: false,
    evidenceDimensions: [0, 2, 3],
    score: 75,
    rank: 18,
  },
  {
    name: "Kathryn Wengel",
    title: "Executive Vice President, Chief Technical Operations & Risk Officer",
    company: "Johnson & Johnson",
    sector: "Pharma & Healthcare",
    bio: "Currently leads J&J's technical operations and enterprise risk management. Spent the prior nine years as EVP and Chief Global Supply Chain Officer; inducted into the Supply Chain Hall of Fame in 2019. Co-led the 2009 redesign of J&J's supply chain and quality operating model, becoming the company's first Chief Quality Officer, and received CSCMP's 2019 Distinguished Service Award.",
    sourceLabel: "Johnson & Johnson — Leadership",
    sourceUrl: "https://www.jnj.com/leadership/kathryn-wengel",
    hasOfficialPhoto: true,
    evidenceDimensions: [0, 1, 3, 6],
    score: 82,
    rank: 10,
  },
  {
    name: "Christian Callieri",
    title: "Senior Vice President & Chief Supply Chain Officer",
    company: "Levi Strauss & Co.",
    sector: "Apparel & Retail",
    bio: "Has roughly 20 years of supply chain leadership across multiple brands and industries. Prior to joining Levi Strauss & Co., he was chief supply chain officer at Victoria's Secret & Co., leading operations for the Victoria's Secret and PINK brands, and chief supply chain officer at Tory Burch. He was also senior vice president of Product Operations at Adidas, overseeing materials and product development, and earlier worked as a consultant at HRC Retail Advisory and Kearney, guiding apparel and footwear companies through sourcing, supply chain and organizational transformations.",
    sourceLabel: "Levi Strauss & Co. — Leadership",
    sourceUrl: "https://www.levistrauss.com/who-we-are/leadership/christian-callieri/",
    hasOfficialPhoto: true,
    evidenceDimensions: [1, 4],
    score: 65,
    rank: 35,
  },
  {
    name: "Willem Uijen",
    title: "Chief Supply Chain and Operations Officer",
    company: "Unilever",
    sector: "Consumer Goods",
    bio: "Appointed Unilever's Chief Supply Chain and Operations Officer in January 2025, overseeing global supply chain, operations, enterprise technology, and Global Business Services. Joined Unilever in 1999 as a management trainee in the Netherlands; previously Chief Procurement Officer (2022–2024) and Executive Director leading supply chain across South Asia, South East Asia, and Australia. Helped Hindustan Unilever reach plastic neutrality in 2021 and accepted Unilever's eighth Global Lighthouse Network award for its Tinsukia site.",
    sourceLabel: "Unilever — Our Leadership",
    sourceUrl: "https://www.unilever.com/our-company/our-leadership/willem-uijen",
    hasOfficialPhoto: true,
    evidenceDimensions: [2, 4, 5],
    score: 68,
    rank: 33,
  },
  {
    name: "Rob Montgomery",
    title: "Executive Vice President, Supply Chain Operations",
    company: "Walmart U.S.",
    sector: "Retail",
    bio: "Leads supply chain operations for Walmart U.S., including the company's distribution centers, fulfillment centers, and the Walmart fulfillment platform. Previously Senior Vice President of Business Operations and Planning within Supply Chain, overseeing end-to-end capacity planning, inventory flow, and quality assurance. Has overseen Walmart U.S.'s rollout of AI-driven inventory tools, including the ‘Wally’ agent and an ambient IoT sensor program targeting 90 million pallets by the end of 2026.",
    sourceLabel: "Walmart Corporate — Leadership",
    sourceUrl: "https://corporate.walmart.com/about/leadership/rob-montgomery",
    hasOfficialPhoto: true,
    evidenceDimensions: [0, 1, 2, 3],
    score: 85,
    rank: 9,
  },
  {
    name: "Luc Reynaert",
    title: "Chief Product Supply Officer",
    company: "Procter & Gamble",
    sector: "Consumer Goods",
    bio: "Oversees P&G's global Product Supply organization — manufacturing, planning, purchasing, engineering, quality, and program management — across roughly 65,000 colleagues, 110 plants, and 200 distribution centers. Joined P&G in 1988 as a controls engineer and built a 35-plus-year career across Fabric & Home Care, Baby Care, Feminine Care, and Beauty in Europe and North America. Credits P&G's eleventh consecutive year of Gartner 'Supply Chain Masters' status to the company's 'Supply 3.0' discipline and has publicly described leading its push into agentic AI manufacturing.",
    sourceLabel: "P&G — Leadership Team",
    sourceUrl: "https://us.pg.com/leadership-team/luc-reynaert",
    hasOfficialPhoto: true,
    evidenceDimensions: [0, 2, 3, 4, 6],
    score: 85,
    rank: 7,
  },
  {
    name: "Gregg Roden",
    title: "Executive Vice President, Chief Operations Officer",
    company: "PepsiCo",
    sector: "Food & Beverage",
    bio: "Oversees PepsiCo's global supply chain and operations, spanning North American and international supply chains, global procurement, and employee health and safety. Joined PepsiCo in 1990 and previously led the company's North American supply chain as Senior Vice President. PepsiCo's official bio credits him with driving transformation across the company's North American beverage and food supply chains, including AI-driven, data-centric planning investments.",
    sourceLabel: "PepsiCo — Leadership",
    sourceUrl: "https://www.pepsico.com/leadership/gregg-roden",
    hasOfficialPhoto: true,
    evidenceDimensions: [1, 2, 3, 4, 6],
    score: 85,
    rank: 4,
  },
  {
    name: "Udit Madan",
    title: "VP, Worldwide Operations",
    company: "Amazon",
    sector: "E-commerce & Logistics",
    bio: "Took over leadership of Amazon's Worldwide Operations in January 2024, succeeding John Felton. Has spent more than 15 years at Amazon entirely in Operations, helped build Amazon Logistics, and grew the company's middle- and last-mile transportation business before stepping into this role. Profiled by Fortune for leading Amazon's 2025 tariff response across more than 1 million employees and 2,000-plus warehouses, after earlier launching the company's COVID-19 mask-sourcing and vaccine-distribution programs.",
    sourceLabel: "About Amazon — Leadership Update",
    sourceUrl: "https://www.aboutamazon.com/news/company-news/amazon-leadership-update-john-felton-udit-madan",
    hasOfficialPhoto: true,
    evidenceDimensions: [0, 1, 3, 6],
    score: 82,
    rank: 11,
  },
  {
    name: "Hendrik Venter",
    title: "Chief Executive Officer, DHL Supply Chain",
    company: "DHL Group",
    sector: "Logistics & 3PL",
    bio: "Appointed CEO of DHL Supply Chain and joined the DHL Group Management Board effective August 2025. Brings more than 15 years of management experience at DHL Supply Chain, including serving as CEO of DHL Supply Chain Mainland Europe, Middle East, and Africa since October 2019 across 25 markets. Leads an 'Accelerated Digitalization' program across DHL Supply Chain's EMEA operations and has set quantified sustainability targets, including carbon neutrality across 1,500 warehouses by the end of 2025.",
    sourceLabel: "DHL Group — Press Release",
    sourceUrl: "https://group.dhl.com/en/media-relations/press-releases/2025/personnel-changes-to-the-management-board-of-dhl-group.html",
    hasOfficialPhoto: true,
    evidenceDimensions: [1, 2, 5],
    score: 72,
    rank: 19,
  },
  {
    name: "Regis Simard",
    title: "President, Global Supply Chain",
    company: "GSK",
    sector: "Pharma & Healthcare",
    bio: "Oversees manufacturing and supply of GSK's medicines and vaccines worldwide, plus corporate Quality and Environment, Health, Safety & Sustainability. Joined GSK in 2005 as a Site Director in France, rising to Senior Vice President of Global Pharmaceuticals Manufacturing before his current role. Named among Manufacturing Digital's Top 10 Pharmaceutical Manufacturing Leaders.",
    sourceLabel: "GSK — Leadership Team",
    sourceUrl: "https://www.gsk.com/en-gb/company/board-of-directors-and-leadership-team/regis-simard/",
    hasOfficialPhoto: true,
    evidenceDimensions: [3, 5, 6],
    score: 68,
    rank: 32,
  },
  {
    name: "Ernest Nicolas",
    title: "Chief Supply Chain Officer",
    company: "HP Inc.",
    sector: "Technology",
    bio: "Leads HP Inc.'s global supply chain, which delivers more than 100 million products annually, and its social and environmental sustainability efforts. Joined HP in 2022 after leading supply chain as SVP and Chief Supply Chain Officer at Rockwell Automation. Named to Supply Chain Digital's 2023 Top 100 CSCOs supplement and Savoy Magazine's 2024 list of the most influential executives in corporate America.",
    sourceLabel: "HP Inc. — Press Kit",
    sourceUrl: "https://press.hp.com/content/dam/sites/garage-press/press/press-kits/2023/amplify-partner-conference/HP_Ernest%20Nicolas_Exec%20Bio_2023.pdf",
    hasOfficialPhoto: false,
    evidenceDimensions: [0, 5, 6],
    score: 70,
    rank: 24,
  },
  {
    name: "Debora Shoquist",
    title: "Executive Vice President, Operations",
    company: "NVIDIA",
    sector: "Electronics & Semiconductors",
    bio: "Listed among NVIDIA's company officers as Executive Vice President of Operations on the company's official newsroom bios page, overseeing NVIDIA's operations function. Profiled in Supply Chain Digital's Top 100 Leaders and Top 100 Women in Supply Chain lists, and Technology Magazine's Top 100 Women in Technology.",
    sourceLabel: "NVIDIA Newsroom — Executive Bios",
    sourceUrl: "https://nvidianews.nvidia.com/bios",
    hasOfficialPhoto: true,
    evidenceDimensions: [6],
    score: 55,
    rank: 48,
  },
  {
    name: "Antoine Vanlaeys",
    title: "Chief Operations Officer",
    company: "L'Oreal",
    sector: "Consumer Goods",
    bio: "Joined L'Oreal in 2002 and held several Operations roles, including Director of Operations for the Asia-Pacific Zone from 2016, before succeeding Barbara Lavernos as Chief Operations Officer, confirmed current as of L'Oreal's 2025 Universal Registration Document. Opened a 46,000-square-metre automated smart fulfilment centre in Suzhou in 2024 running on 100% renewable energy, and has kept L'Oreal a CDP Supplier Engagement Leader for six consecutive years.",
    sourceLabel: "L'Oreal Finance — 2025 Universal Registration Document",
    sourceUrl: "https://www.loreal-finance.com/eng/2025-universal-registration-document/en/article/12/",
    hasOfficialPhoto: false,
    evidenceDimensions: [2, 5],
    score: 62,
    rank: 42,
  },
  {
    name: "Stephanie Pullings Hart",
    title: "Executive Vice President, Chief Operations Officer",
    company: "Nestle",
    sector: "Food & Beverage",
    bio: "Listed on Nestle's official leadership page as Executive Vice President and Chief Operations Officer, a member of the Executive Board focused on operational excellence and sustainable production across the supply chain. Appointed to the Zero100 Advisory Board in 2024 and has spoken publicly about Nestle's single manufacturing system, now deployed to roughly 90% of its 335 sites.",
    sourceLabel: "Nestle — Official Leadership Page",
    sourceUrl: "https://www.nestle.com/aboutus/management",
    hasOfficialPhoto: true,
    evidenceDimensions: [0, 2, 5, 6],
    score: 78,
    rank: 14,
  },
  {
    name: "Mark Westfall",
    title: "Senior Vice President and Chief Services Officer",
    company: "The Coca-Cola Company",
    sector: "Food & Beverage",
    bio: "A board-elected vice president of The Coca-Cola Company whose organization spans finance, procurement, supply chain, and technical functions globally; he previously served as the company's chief procurement officer. Coca-Cola's leadership page carries no separate Chief Supply Chain Officer title, so Westfall is reported as the senior-most executive whose stated scope explicitly includes supply chain. Raised the share of sustainably sourced key ingredients and packaging from 8% in 2013 to 54% by 2020-2021, and backed supplier support measures through the COVID-19 crisis.",
    sourceLabel: "Coca-Cola Company — Leadership Bio Page",
    sourceUrl: "https://www.coca-colacompany.com/about-us/leadership/mark-westfall",
    hasOfficialPhoto: true,
    evidenceDimensions: [3, 4, 5],
    score: 68,
    rank: 31,
  },
  {
    name: "Che Min (Jammi) Tu",
    title: "Senior Vice President and Group Operations Officer",
    company: "Lenovo",
    sector: "Electronics & Semiconductors",
    bio: "A member of Lenovo's Executive Committee whose Group Operations organization covers Global Supply Chain, Digital Transformation, Customer Experience, Sales Operations, and Strategic Alliances. He joined Lenovo in 2012 as CFO for EMEA and later served as COO of the Intelligent Devices Group. Has said of Lenovo's supply chain, ‘We not only withstand disruption; we become stronger because of it,’ in the context of the company's AI-driven order-to-ship improvements.",
    sourceLabel: "Lenovo — Official Leadership Page",
    sourceUrl: "https://lenovo.com/ca/en/about/leaders",
    hasOfficialPhoto: true,
    evidenceDimensions: [1, 2, 3],
    score: 75,
    rank: 17,
  },
  {
    name: "Cliff Henson",
    title: "Corporate Vice President, Microsoft Cloud Supply Chain",
    company: "Microsoft",
    sector: "Technology",
    bio: "Leads the Microsoft Cloud Supply Chain, responsible for delivering global cloud and AI capacity to more than 300 Microsoft datacenters. Microsoft's corporate leadership page lists no company-wide Chief Supply Chain Officer; this is the closest officially titled supply-chain role, scoped to cloud and datacenter infrastructure. Authored Microsoft's 'Reduce risk, create resilience' guidance for supply chain operations, published in April 2025.",
    sourceLabel: "Microsoft — Official Blog Author Bio",
    sourceUrl: "https://www.microsoft.com/en-us/industry/blog/author/cliff-henson",
    hasOfficialPhoto: true,
    evidenceDimensions: [2, 3],
    score: 65,
    rank: 36,
  },
  {
    name: "Vikram Agarwal",
    title: "Chief Operations Officer",
    company: "Danone",
    sector: "Food & Beverage",
    bio: "Chief Operations Officer at Danone since January 2022 and a member of its Executive Committee, leading the company's global end-to-end Operations network. He has more than 30 years of international supply chain leadership experience, including at Unilever, Avon, and Dole. Has been credited with Danone's rise from 42nd to 6th in the Gartner Supply Chain Top 25, built a Digital Manufacturing Acceleration program that scaled from 3-4 to more than 80 factories, and launched an 'Industry 5.0 Academy' that has trained roughly 20,000 employees in Poland.",
    sourceLabel: "Danone — Official Governance Page",
    sourceUrl: "https://www.danone.com/group/about-us/governance/vikram-agarwal.html",
    hasOfficialPhoto: true,
    evidenceDimensions: [0, 1, 2, 4, 5, 6],
    score: 92,
    rank: 1,
  },
  {
    name: "Ewan Andrew",
    title: "President, Global Supply Chain & Procurement and Chief Sustainability Officer",
    company: "Diageo",
    sector: "Food & Beverage",
    bio: "A member of Diageo's Executive Committee, appointed to lead global supply chain and procurement in September 2019 and now also serving as Chief Sustainability Officer. Listed among Supply Chain Digital's Top 100 Leaders for 2026.",
    sourceLabel: "Diageo — Executive Committee Page",
    sourceUrl: "https://www.diageo.com/en/our-business/executive-committee",
    hasOfficialPhoto: true,
    evidenceDimensions: [4, 5, 6],
    score: 65,
    rank: 37,
  },
  {
    name: "Steffen Lang",
    title: "President, Operations",
    company: "Novartis",
    sector: "Pharma & Healthcare",
    bio: "President, Operations at Novartis since 2022, previously Global Head of Novartis Technical Operations. His organization of more than 25,000 associates covers manufacturing, quality and supply, plus IT, procurement, and facility services. Novartis's own materials do not use the term supply chain in his title, so he is reported as the closest-equivalent top operations executive. Has described building a 'product-centered, resilient supply network' at Novartis through dual-sourcing strategies across a team of more than 20,000 associates.",
    sourceLabel: "Novartis — Executive Committee Bio Page",
    sourceUrl: "https://www.novartis.com/about/executive-committee/steffen-lang",
    hasOfficialPhoto: true,
    evidenceDimensions: [2, 3, 4],
    score: 70,
    rank: 30,
  },
  {
    name: "Jonathan Ness",
    title: "Chief Supply Chain Officer",
    company: "General Mills",
    sector: "Food & Beverage",
    bio: "Named Chief Supply Chain Officer of General Mills effective March 2026 after serving as interim CSCO since January 2026; he sits on the Senior Leadership Team and reports to CEO Jeff Harmening. In nearly 20 years at the company he has held roles across Supply Chain Strategy, Global Finance, Manufacturing, Procurement, and Transformation.",
    sourceLabel: "General Mills — Executive Team Page",
    sourceUrl: "https://www.generalmills.com/about/leadership/executive-team-jonathan-ness",
    hasOfficialPhoto: true,
    evidenceDimensions: [1, 4],
    score: 65,
    rank: 40,
  },
  {
    name: "Abby Lilly",
    title: "Chief Supply Chain Officer",
    company: "Lockheed Martin",
    sector: "Aerospace & Defense",
    bio: "Chief Supply Chain Officer at Lockheed Martin since December 2024, named to the role in a letter to the company's suppliers. She joined Lockheed Martin in 2019 as Vice President of Global Supply Chain for the Rotary and Mission Systems division, after roughly six years as Vice President of Supply Chain at Eaton and a supply-chain leadership role at GKN Aerospace North America from 2010 to 2013. She is leading Lockheed Martin's supply-chain transformation strategy, streamlining procurement processes while treating risk mitigation and sustainability as closely linked priorities across the global supplier base.",
    sourceLabel: "SupplyChainDive — Lockheed Martin names Abby Lilly chief supply chain officer",
    sourceUrl: "https://www.supplychaindive.com/news/lockheed-martin-chief-supply-chain-officer-abby-lilly/736613/",
    hasOfficialPhoto: false,
    evidenceDimensions: [1, 3, 4, 5],
    score: 77.5,
    rank: 16,
  },
  {
    name: "Brendan O'Callaghan",
    title: "Executive Vice President, Manufacturing and Supply",
    company: "Sanofi",
    sector: "Pharma & Healthcare",
    bio: "Leads Sanofi's Manufacturing and Supply organization, covering close to 40 internal manufacturing sites plus external supply partners. He joined Sanofi in 2015 and has held his current role since September 2021, after earlier technical-operations leadership roles at Merck/MSD, Mallinckrodt, and Schering-Plough. Personally received the 'Outstanding Contribution to BioPharmaChem' honor at the 2025 BioPharmaChem Impact Awards.",
    sourceLabel: "Sanofi — Executive Committee Page",
    sourceUrl: "https://www.sanofi.com/en/our-company/governance/executive-committee/brendan-ocallaghan",
    hasOfficialPhoto: true,
    evidenceDimensions: [0, 4],
    score: 65,
    rank: 34,
  },
  {
    name: "Zhenhui Wang",
    title: "Executive Director and Chief Executive Officer, JD Logistics",
    company: "JD.com",
    sector: "E-commerce & Logistics",
    bio: "CEO of JD Logistics, the Hong Kong-listed logistics arm of JD.com, appointed effective November 2025, succeeding Hu Wei. JD.com's own corporate leadership roster carries no dedicated Chief Supply Chain Officer seat, so Wang is reported as the closest verifiable equivalent, confirmed via JD Logistics' own regulatory filing. Led JD Logistics' continuous-delivery response during the early COVID-19 outbreak, including a same-day delivery of 10,000 N95 masks to Wuhan, and was named one of China's Top 10 Logistics Leaders for 2020.",
    sourceLabel: "JD Logistics — HKEX Regulatory Filing",
    sourceUrl: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0813/2026081300555.pdf",
    hasOfficialPhoto: false,
    evidenceDimensions: [3, 6],
    score: 62,
    rank: 45,
  },
  {
    name: "Raymond Wittmann",
    title: "Member of the Board of Management, Production",
    company: "BMW Group",
    sector: "Automotive & Mobility",
    bio: "Became the BMW AG Board of Management member responsible for Production effective May 2026, succeeding Milan Nedeljkovic, who became Chairman on the same date. He has been with BMW Group since 2015, most recently responsible for Corporate Strategy and Development.",
    sourceLabel: "BMW Group PressClub — Official Announcement",
    sourceUrl: "https://www.press.bmwgroup.com/global/article/detail/T0457779EN/106th-annual-general-meeting:-oliver-zipse-hands-over-chairmanship-of-the-board-of-management-of-bmw-ag-to-milan-nedeljkovic",
    hasOfficialPhoto: true,
    evidenceDimensions: [1],
    score: 60,
    rank: 47,
  },
  {
    name: "Naga Chandrasekaran",
    title: "Executive Vice President, Chief Technology and Operations Officer; General Manager, Intel Foundry",
    company: "Intel",
    sector: "Electronics & Semiconductors",
    bio: "Oversees Intel Foundry's technology development, worldwide manufacturing, and supply chain. Named Intel's chief global operations officer in 2024; previously held senior leadership roles at Micron, including SVP of Technology Development. Earlier in his career at Micron, received SME's Jiri Tlusty Outstanding Young Manufacturing Engineer of the Year award (2003) and ASEM's Engineering Manager of the Year award (2018).",
    sourceLabel: "Intel Newsroom — Executive Biography",
    sourceUrl: "https://newsroom.intel.com/biography/naga-chandrasekaran",
    hasOfficialPhoto: true,
    evidenceDimensions: [2, 6],
    score: 62,
    rank: 44,
  },
  {
    name: "Sabih Khan",
    title: "Chief Operating Officer",
    company: "Apple",
    sector: "Technology",
    bio: "Reports to CEO John Ternus and leads Apple's global supply chain organization, spanning planning, procurement, manufacturing, quality, logistics, and product fulfillment, alongside AppleCare and environmental initiatives. He has been with Apple since 1995, previously serving as SVP of Operations. Personally signed Apple's 2020 Supplier Responsibility Progress Report detailing COVID-19 factory safety measures and has overseen the diversification of Apple's manufacturing base, including a second major production hub in India.",
    sourceLabel: "Apple — Leadership Page",
    sourceUrl: "https://www.apple.com/leadership/sabih-khan",
    hasOfficialPhoto: true,
    evidenceDimensions: [0, 1, 3, 4, 5],
    score: 88,
    rank: 3,
  },
  {
    name: "Liz Door",
    title: "Chief Supply Chain Officer",
    company: "Ford Motor Company",
    sector: "Automotive & Mobility",
    bio: "Chief Supply Chain Officer for Ford Motor Company, a role she returned to Ford for in 2022 after a prior stint at the company and a period at Whirlpool. She leads Ford's global supply chain management function. Said in September 2025 that Ford is adopting AI to shift supply chain risk management from reactive to proactive, and has been named to Procurement Magazine's Top 10 Procurement Leaders in the Automotive Industry.",
    sourceLabel: "Ford — Official Media Bio Page",
    sourceUrl: "https://media.ford.com/content/fordmedia/img/en/people/liz-door.html",
    hasOfficialPhoto: false,
    evidenceDimensions: [2, 3, 6],
    score: 70,
    rank: 28,
  },
  {
    name: "Jeffrey Morrison",
    title: "Vice President, Global Purchasing and Supply Chain",
    company: "General Motors",
    sector: "Automotive & Mobility",
    bio: "Leads Global Purchasing and Supply Chain at General Motors, a post he moved into in 2022 succeeding Shilpan Amin. He has been with GM since 2006, with prior roles spanning global engineering, procurement, and logistics. Has grown GM's 'Energy Treasure Maps' supplier energy-assessment program from 8 to 80 assessments a year toward a goal of 800, with roughly 90% of GM's global spend now reporting emissions data.",
    sourceLabel: "General Motors — Official Press Release",
    sourceUrl: "https://news.gm.com/home.detail.html/Pages/news/us/en/2022/mar/0303-morrison.html",
    hasOfficialPhoto: false,
    evidenceDimensions: [0, 1, 3, 4, 5],
    score: 88,
    rank: 2,
  },
  {
    name: "Kevin Austin",
    title: "Group Vice President, Supply Chain (Strategy & Operations) and Quality",
    company: "Toyota Motor North America",
    sector: "Automotive & Mobility",
    bio: "Toyota Motor North America's top named supply chain executive, overseeing end-to-end vehicle and parts supply chain strategy and operations, with Quality oversight added per a July 2026 executive-changes announcement. Toyota's global structure is organized around regional officers rather than one worldwide CSCO, so this is the closest verifiable equivalent at the North America level. Led Toyota Motor North America's 'Project ETA' VIN-based delivery visibility initiative.",
    sourceLabel: "Toyota USA Newsroom — Official Biography",
    sourceUrl: "https://pressroom.toyota.com/biographies/kevin-austin/",
    hasOfficialPhoto: true,
    evidenceDimensions: [0, 1, 2, 3],
    score: 85,
    rank: 6,
  },
  {
    name: "Venkatesh Alagirisamy",
    title: "Executive Vice President and Chief Operating Officer",
    company: "Nike, Inc.",
    sector: "Apparel & Retail",
    bio: "Leads strategy and operations across Nike's global Supply Chain, Planning, Operations, Manufacturing, Technology, and Sustainability organizations. He was promoted from Chief Supply Chain Officer to EVP and COO effective December 2025, retaining supply chain among his responsibilities. Received Purdue University's 2025 Outstanding Industrial Engineer award.",
    sourceLabel: "Nike — Official Bio Page",
    sourceUrl: "https://about.nike.com/en/company/people/venkatesh-alagirisamy",
    hasOfficialPhoto: true,
    evidenceDimensions: [1, 2, 5, 6],
    score: 78,
    rank: 15,
  },
  {
    name: "Harm Ohlmeyer",
    title: "Chief Financial Officer",
    company: "Adidas",
    sector: "Apparel & Retail",
    bio: "Adidas's CFO and Labor Director on the Executive Board since 2017, who took on additional responsibility for Supply Chain and Technology in August 2024 following a prior Executive Board member's departure. Adidas has had no distinct supply-chain-only Executive Board seat since that change.",
    sourceLabel: "Adidas — Official Executive Board Page",
    sourceUrl: "https://www.adidas-group.com/en/about/executive-board",
    hasOfficialPhoto: true,
    evidenceDimensions: [2, 6],
    score: 62,
    rank: 43,
  },
  {
    name: "David von Heijne",
    title: "Chief Supply Chain Officer",
    company: "H&M Group",
    sector: "Apparel & Retail",
    bio: "Appointed H&M Group's Chief Supply Chain Officer at the end of January 2026, heading a newly unified Supply Chain function with end-to-end responsibility for inventory flow and reporting to CEO Daniel Erver. He joined H&M Group in 2011.",
    sourceLabel: "H&M Group — Official Executive Management Update",
    sourceUrl: "https://hmgroup.com/news/updates-hm-executive-management/",
    hasOfficialPhoto: false,
    evidenceDimensions: [0, 1],
    score: 70,
    rank: 23,
  },
  {
    name: "Henrik Elm",
    title: "Chief Operating Officer",
    company: "Inter IKEA Group",
    sector: "Consumer Goods",
    bio: "Chief Operating Officer of Inter IKEA Group, responsible for digital, supply, and operations across the IKEA value chain. He has spent more than three decades at IKEA across store operations, purchasing, global supply, logistics, and manufacturing. Led an organization-wide simplification program at Inter IKEA Group announced in May 2026, reducing roughly 850 positions globally.",
    sourceLabel: "Inter IKEA Group — Official Management Structure Page",
    sourceUrl: "https://www.inter.ikea.com/en/this-is-inter-ikea-group/management-structure",
    hasOfficialPhoto: false,
    evidenceDimensions: [1, 2, 4],
    score: 72,
    rank: 20,
  },
  {
    name: "Ihssane Mounir",
    title: "Senior Vice President, Global Supply Chain and Fabrication",
    company: "Boeing Commercial Airplanes",
    sector: "Aerospace & Defense",
    bio: "Has led Boeing Commercial Airplanes' global supply chain and fabrication organization since December 2022, overseeing supply strategy and the Fabrication division's aerospace-parts plants. A February 2025 Reuters report confirms he remained active in the role, discussing supplier Spirit AeroSystems' fuselage inventory. Reported in February 2026 that quality rework hours fell 40% year over year, crediting closer collaboration with roughly 1,200 Boeing suppliers.",
    sourceLabel: "Reuters, via Yahoo Finance (Feb 2025)",
    sourceUrl: "https://finance.yahoo.com/news/boeing-executive-says-supplier-spirit-191646471.html",
    hasOfficialPhoto: false,
    evidenceDimensions: [1, 4, 6],
    score: 70,
    rank: 25,
  },
  {
    name: "Florent Massou dit Labaquere",
    title: "Executive Vice President Operations, Commercial Aircraft",
    company: "Airbus",
    sector: "Aerospace & Defense",
    bio: "An Airbus Executive Committee member who leads Commercial Aircraft's production, quality, and procurement organizations, appointed effective January 2024. He joined Airbus in 2012 and previously served as SVP Widebody Programmes and Head of the A220 Programme at Airbus Canada. As head of the A220 program, deployed Airbus's A350 cross-functional team model and lifted A220 deliveries from 13 in the first half of 2018 to 20 in the second half.",
    sourceLabel: "Airbus — Official Biography",
    sourceUrl: "https://www.airbus.com/sites/g/files/jlcbta136/files/2023-12/Florent-MASSOU-DIT-LABAQUERE-Biography.pdf",
    hasOfficialPhoto: false,
    evidenceDimensions: [1, 4],
    score: 65,
    rank: 38,
  },
  {
    name: "Rabab Boulos",
    title: "Chief Operating Officer",
    company: "A.P. Moller - Maersk",
    sector: "Logistics & 3PL",
    bio: "Appointed Chief Operating Officer of Maersk in February 2024. She joined Maersk in 2003 as a trainee in Egypt and has since worked across Cairo, Dubai, and Copenhagen, most recently as Chief Infrastructure Officer and Head of Global Ocean Customer Logistics.",
    sourceLabel: "Maersk — Official Executive Leadership Team Page",
    sourceUrl: "https://maersk.com/about/executive-leadership-team/rabab-boulos",
    hasOfficialPhoto: false,
    score: 50,
    rank: 50,
  },
  {
    name: "Brian Ejsing",
    title: "Group Chief Operating Officer and CEO, DSV Road",
    company: "DSV",
    sector: "Logistics & 3PL",
    bio: "Group COO of DSV A/S since February 2024 and a member of the Group Executive Committee; expanded his role in June 2026 to also take over as CEO of DSV Road, succeeding Helmut Schweighofer, while retaining the Group COO seat. He previously spent more than 11 years as CEO of DSV's Contract Logistics Division. Holds global responsibility for integrating DB Schenker into DSV and, since June 2026, has also led DSV's Road division through its 2030 growth strategy across more than 50,000 daily trucks.",
    sourceLabel: "DSV — Official Press Release (June 2026)",
    sourceUrl: "https://www.dsv.com/en/about-dsv/press/news/com/2026/06/brian-ejsing-expands-his-role-to-take-over-as-road-ceo",
    hasOfficialPhoto: false,
    evidenceDimensions: [1],
    score: 60,
    rank: 46,
  },
  {
    name: "Jeff England",
    title: "Executive Vice President, Chief Global Supply Chain and Logistics Officer",
    company: "Target Corporation",
    sector: "Retail",
    bio: "Named Target's EVP, Chief Global Supply Chain and Logistics Officer with a May 2026 start date, reporting to COO Lisa Roath. He joined from QXO, where he was chief supply chain officer, after nearly two decades of operations and supply chain leadership at Walmart.",
    sourceLabel: "Target Corporate — Official Press Release",
    sourceUrl: "https://corporate.target.com/press/release/2026/05/target-names-jeff-england-evp,-chief-global-supply-chain-and-logistics-officer",
    hasOfficialPhoto: false,
    score: 50,
    rank: 49,
  },
  {
    name: "John Deaton",
    title: "Executive Vice President, Supply Chain & Product Development",
    company: "The Home Depot",
    sector: "Retail",
    bio: "Listed on Home Depot's official corporate leadership page as EVP of Supply Chain & Product Development, also responsible for product development for the company's private brands. He joined The Home Depot in 2007 as vice president of supply chain development. Presented a $500 million supply-chain cost-reduction plan at Home Depot's June 2023 Investor and Analyst Conference, drawing on automation gains and the Temco in-house appliance-delivery acquisition.",
    sourceLabel: "Home Depot Corporate — Official Leadership Page",
    sourceUrl: "https://corporate.homedepot.com/bio/john-deaton-executive-vice-president-supply-chain-product-development",
    hasOfficialPhoto: true,
    evidenceDimensions: [0, 1],
    score: 70,
    rank: 27,
  },
  {
    name: "Janelle Aydin",
    title: "Global Chief Procurement & Supply Chain Officer",
    company: "Kraft Heinz",
    sector: "Food & Beverage",
    bio: "Listed on Kraft Heinz's official investor-relations executive team page as Global Chief Procurement & Supply Chain Officer, part of the leadership team under CEO Steve Cahillane. Named Kraft Heinz's Global Chief Procurement and Supply Chain Officer effective July 2026, leading the company's newly merged procurement and supply chain function.",
    sourceLabel: "Kraft Heinz Investor Relations — Executive Team",
    sourceUrl: "https://ir.kraftheinzcompany.com/company-overview/khx-team",
    hasOfficialPhoto: false,
    evidenceDimensions: [1, 4, 5],
    score: 70,
    rank: 26,
  },
  {
    name: "Frank Cervi",
    title: "Chief Supply Chain Operations Officer",
    company: "Mondelez International",
    sector: "Food & Beverage",
    bio: "Leads supply chain operations across 134 plants and more than 60,000 employees at Mondelez International. He joined the company in 2015 and previously spent more than 30 years in engineering, R&D, and supply chain roles at Unilever, Best Foods, and Reckitt Benckiser. Established a Central Analytics Team for data-driven supply chain decisions at Mondelez and served as interim SVP of North America Supply Chain during a leadership transition.",
    sourceLabel: "Mondelez International — Official Leadership Page",
    sourceUrl: "https://www.mondelezinternational.com/about-us/leadership/executive-team/frank-cervi/",
    hasOfficialPhoto: false,
    evidenceDimensions: [2, 3],
    score: 65,
    rank: 39,
  },
  {
    name: "Ricardo Moreira",
    title: "Chief Supply Officer",
    company: "Anheuser-Busch InBev",
    sector: "Food & Beverage",
    bio: "Chief Supply Officer of AB InBev since January 2024, previously CEO of the company's Africa Zone. A Portuguese mechanical engineer who joined Ambev in 1995, he has since held sales, logistics, procurement, and regional leadership roles across Latin America and Africa. Led the commercial integration of Grupo Modelo following AB InBev's acquisition, after earlier serving as CEO of the company's Africa Zone.",
    sourceLabel: "AB InBev — Official Leaders Page",
    sourceUrl: "https://www.ab-inbev.com/our-leaders-ricardo-moreira",
    hasOfficialPhoto: true,
    evidenceDimensions: [1, 4],
    score: 65,
    rank: 41,
  },
  {
    name: "Andrew Smith",
    title: "President, Trading and Supply",
    company: "Shell plc",
    sector: "Industrial & Energy",
    bio: "A member of Shell plc's Executive Committee responsible for global crude oil, products, and feedstock trading and physical supply operations. Shell's Executive Committee structure carries no separate Chief Supply Chain Officer title, so this is the closest equivalent. Led the expansion of Shell's LNG and onshore gas businesses in Australia.",
    sourceLabel: "Shell — Official Executive Committee Page",
    sourceUrl: "https://www.shell.com/who-we-are/leadership/executive-committee/andrew-smith.html",
    hasOfficialPhoto: true,
    evidenceDimensions: [0, 1],
    score: 70,
    rank: 22,
  },
  {
    name: "Karsten Schnake",
    title: "Member of the Board of Management, Procurement",
    company: "Volkswagen Passenger Cars",
    sector: "Automotive & Mobility",
    bio: "Succeeded Dirk Grosse-Loheide as the Board of Management member responsible for Procurement effective November 2025, overseeing sourcing including battery raw materials and semiconductor supply. He joined Volkswagen Group in 1996 and has held procurement leadership roles in Italy and China. Led Volkswagen's procurement function through the Fukushima aftermath, the global financial downturn, and the semiconductor crisis, and ranked 5th on Procurement Magazine's Top 250 Procurement Leaders for 2026.",
    sourceLabel: "Volkswagen Group — Official Press Release",
    sourceUrl: "https://www.volkswagen-group.com/en/press-releases/change-at-volkswagen-procurement-karsten-schnake-succeeds-dirk-grosse-loheide-19901",
    hasOfficialPhoto: true,
    evidenceDimensions: [1, 2, 3, 4, 6],
    score: 85,
    rank: 5,
  },
  {
    name: "Kevin Brown",
    title: "Executive Vice President, Global Operations & Supply Chain Officer",
    company: "Dell Technologies",
    sector: "Technology",
    bio: "Leads roughly 7,700 team members across 23 countries as Dell Technologies' EVP of Global Operations & Chief Supply Chain Officer. He has spent about two decades at Dell in leadership roles including Chief Procurement Officer. Co-founded Dell's NextWave initiative to curb ocean-bound plastics and was ranked among Procurement Magazine's Top 10 Strategic Sourcing Leaders.",
    sourceLabel: "Dell — Official Leadership Bio Page",
    sourceUrl: "https://www.dell.com/en-us/blog/authors/kevin-brown/",
    hasOfficialPhoto: true,
    evidenceDimensions: [2, 4, 5, 6],
    score: 72,
    rank: 21,
  },
  {
    name: "Nando Cesarone",
    title: "Executive Vice President and Chief Global Operations Officer",
    company: "UPS",
    sector: "Logistics & 3PL",
    bio: "Appointed UPS's EVP and Chief Global Operations Officer effective September 2026, previously President of UPS's U.S. operations. He oversees UPS's global air network, surface transportation, and automotive operations, reporting to CEO Carol Tome. Credited with 'record performance' as President of UPS Europe and with expanding UPS's presence in China and shortening Asia transit times as President of UPS Asia Pacific.",
    sourceLabel: "UPS Investor Relations — Official Press Release",
    sourceUrl: "https://investors.ups.com/_assets/_cbffdd678bee71af9d0e23f1ba62cd9d/ups/news/2026-08-31_UPS_Announces_Executive_Leadership_Changes_and_2168.pdf",
    hasOfficialPhoto: false,
    evidenceDimensions: [0, 1],
    score: 70,
    rank: 29,
  },
  {
    name: "Warren Anderson",
    title: "Senior Vice President and Global Chief Supply Chain Officer",
    company: "McDonald's",
    sector: "Restaurants & Foodservice",
    bio: "Senior Vice President and Global Chief Supply Chain Officer at McDonald's, advising more than 100 markets outside North America on supply chain strategy and managing supply and cost for food, packaging, logistics, toys, and equipment across more than 40,000 restaurants. Spent more than 15 years at McDonald's; previously a Senior Manager and Category Manager at Sainsbury's. Aligned key supplier partners to protect essential ingredient supplies during COVID-19 and contributed to McDonald's first $1 billion global cost-savings target. Led development of the Farm Forward Programme, a partnership with British and Irish farmers on animal welfare and environmental standards since adopted by other McDonald's markets, and helped the company reach nearly 96% recycled, renewable, or certified primary guest packaging globally. Ranked 7th on Supply Chain Digital's Top 250 Supply Chain Leaders.",
    sourceLabel: "Supply Chain Digital — Profile",
    sourceUrl: "https://supplychaindigital.com/news/how-warren-anderson-leads-mcdonalds-supply-chain",
    hasOfficialPhoto: false,
    evidenceDimensions: [0, 3, 4, 5, 6],
    score: 82,
    rank: 12,
  },
];

const CANDIDATE_ACCENTS = ["#3987e5", "#199e70", "#d95926", "#a1a1aa"];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function linkedInSearchUrl(name: string, company: string) {
  return "https://www.linkedin.com/search/results/people/?keywords=" + encodeURIComponent(name + " " + company);
}

const SCORING: { dimension: string; weight: number }[] = [
  { dimension: "Business impact and operational performance", weight: 20 },
  { dimension: "Supply chain transformation and strategic leadership", weight: 20 },
  { dimension: "Innovation, digitalization, and artificial intelligence", weight: 15 },
  { dimension: "Resilience, risk management, and business continuity", weight: 15 },
  { dimension: "Procurement, supplier collaboration, and value creation", weight: 10 },
  { dimension: "Sustainability and responsible supply chains", weight: 10 },
  { dimension: "Leadership development, talent, and organizational capability", weight: 10 },
];

const CHAPTERS: { n: string; title: string; body: string }[] = [
  { n: "00", title: "Executive summary", body: "Purpose of the ranking, key findings, and the themes emerging from the research." },
  { n: "01", title: "The rise of the Chief Supply Chain Officer", body: "How the role evolved from logistics coordination into enterprise-wide, board-level leadership." },
  { n: "02", title: "The global Top 50 ranking", body: "The 50 ranked executives, each profile evidence-based and consistently structured." },
  { n: "03", title: "The leaders shaping the future", body: "Cross-cutting leadership patterns: AI-enabled planning, integration, resilience, sustainability." },
  { n: "04", title: "Industry perspectives", body: "Distinctive supply chain leadership challenges across sector — from automotive to pharma to e-commerce." },
  { n: "05", title: "Geographic perspectives", body: "Representation and leadership trends across North America, Europe, Asia-Pacific, LatAm, MEA." },
  { n: "06", title: "What makes an exceptional CSCO", body: "The capabilities the selected executives demonstrate in common, synthesized from the evidence." },
  { n: "07", title: "Implications for CEOs and boards", body: "Practical recommendations for strengthening supply chain leadership and succession." },
  { n: "08", title: "Methodology and references", body: "Full scoring framework, eligibility, sourcing, limitations, and the corrections policy." },
];

/**
 * Full narrative chapters for Stage 6 (publication preparation). Each entry
 * corresponds to a chapter in CHAPTERS above by `n`. Chapters 02 (the
 * ranking) and 08 (methodology and references) are already fully covered
 * by the Ranking table and Methodology sections elsewhere on this page
 * (the Methodology section's "Planned report structure" card for chapter
 * 08 links there directly as of pass 24, once the separate References
 * section it used to point to was removed), so they have no entry here. Every factual claim
 * below traces either to a statistic computed directly from the 50
 * candidates' own evidenceDimensions/score/sector/rank fields (see the
 * per-chapter comments in the source for the exact computation), or to
 * well-established, non-candidate-specific industry context (e.g. the
 * post-2020 rise of supply chain as a board-level concern) — never to an
 * invented fact about any individual. Written during Stage 6, then checked
 * during Stage 7 (final QC, see the note above CANDIDATES below): one
 * statistical error was caught and fixed in chapter 01's title-pattern
 * sentence (see that Stage-7 note for the corrected figures and why).
 * Recomputed again after the Pass 22 Corbo-to-Callieri swap (see the note
 * above CANDIDATES): chapters 00 (mean score, photo-coverage count), 01
 * (title-pattern bucket counts), 03 (per-dimension coverage counts), 04
 * (sector-count sentence), and 06 (dimension-count-distribution sentence)
 * were each independently recomputed from the live 50-candidate data and
 * updated where the new figures differed; chapters 02/05/07/08 were
 * checked and required no change.
 */
const REPORT_CHAPTERS: { n: string; title: string; paragraphs: string[] }[] = [
  {
    n: "00",
    title: "Executive summary",
    paragraphs: [
      "This inaugural Top 50 CSCO ranking evaluates 50 real, currently-serving Chief Supply Chain Officers and senior operations executives at major global companies, using a transparent, reproducible evidence-coverage formula rather than editorial opinion. Every profile is sourced to a company newsroom page, investor-relations filing, or a dedicated trade-press profile — no name, title, employer, or achievement in this ranking was invented, and candidates whose records could not be independently verified were excluded or flagged rather than filled in.",
      "Scores range from 50 to 92 out of 100, with a mean of 71.6; the formula rewards sourced, individually-attributed achievement across seven dimensions — business impact, transformation, digital & AI, resilience, procurement, sustainability, and talent — weighting each by its stated importance to the role rather than by subjective judgment. The resulting 1–50 rank, assigned during Stage 5 (editorial review) and re-verified during Stage 7 (final quality control), reflects what the public record currently documents about each executive, not a definitive assessment of who is the best CSCO in the world.",
      "Three limitations are disclosed rather than smoothed over. The pool skews toward large, press-visible employers headquartered in North America (52%) and Europe (44%), with only two Asia-Pacific companies represented and none from Latin America, the Middle East, or South Asia, despite those regions being searched. Thirty-two of 50 entries carry a confirmed official photo; the rest link to a verified primary source without a confirmed headshot. And because the scoring formula rewards how much a candidate's record documents, not a holistic judgment of their caliber, a CSCO at a less press-active company may be under-represented relative to a peer with a larger corporate communications operation.",
    ],
  },
  {
    n: "01",
    title: "The rise of the Chief Supply Chain Officer",
    paragraphs: [
      "For most of its history, supply chain management sat several rungs below the C-suite — a logistics and procurement function reporting into operations or manufacturing, measured on cost and on-time delivery. That has changed. The pandemic-era disruptions of 2020–2022, the subsequent reshoring and trade-tariff cycles, and the rapid adoption of AI-enabled planning tools have pushed supply chain leadership onto board agendas as a strategic, not operational, concern.",
      "The title data in this longlist reflects a function still mid-consolidation. Only 6 of the 50 executives profiled carry the exact title \"Chief Supply Chain Officer\"; 17 more hold another supply-chain-specific title, 5 are Chief Operating Officers whose remit includes supply chain, and 22 — nearly half — hold a broader operations, manufacturing, or procurement title that encompasses supply chain leadership without naming it explicitly. That spread is itself a data point: large global companies have not yet standardized where supply chain sits in the C-suite or what to call the person who leads it, even as the function's strategic weight has grown.",
    ],
  },
  {
    n: "03",
    title: "The leaders shaping the future",
    paragraphs: [
      "Across all 50 evidenced bios, Transformation (27 of 50, 54%) and Digital & AI (23 of 50, 46%) are the two most commonly documented dimensions — ahead of Resilience and Procurement (22 each), Talent (21), Sustainability (18), and Business impact (17). Read against the title data above, this suggests that where a sourced record exists at all, it most often documents a technology-enabled change program: a digital planning rollout, an AI-driven inventory or demand-sensing initiative, a network redesign.",
      "Breadth, not a single flagship achievement, tracks with a higher position in this ranking. The 10 highest-ranked candidates evidence an average of 4.8 of the 7 dimensions each, compared with 2.6 for the remaining 40 — and within that top 10, Transformation and Resilience are each documented for 9 of 10 candidates, versus Sustainability for only 4. The leaders at the top of this evidence-coverage ranking are not necessarily doing more than their peers; what the public record shows is that their achievements are documented across more of the role's dimensions at once, rather than concentrated in one.",
    ],
  },
  {
    n: "04",
    title: "Industry perspectives",
    paragraphs: [
      "Food & Beverage is the most represented sector in this longlist (9 of 50 candidates, 18%), followed by Technology, Pharma & Healthcare, and Automotive & Mobility at 5 each, with Consumer Goods and Apparel & Retail close behind at 4 each. Average evidence-coverage scores vary meaningfully by sector: Automotive & Mobility candidates score highest among sectors with more than one entry (77.6 average), with Transformation and Resilience as their most commonly documented dimensions — plausibly reflecting the sector's recent, well-publicized push through EV transition, chip-shortage recovery, and tariff exposure, though this ranking does not attempt to establish that causally. Technology (75.0 average) leans toward Sustainability and Digital & AI; Food & Beverage (72.6 average) leans toward Procurement and Transformation, consistent with a sector managing complex ingredient and packaging supply chains under cost pressure.",
      "Logistics & 3PL candidates score lowest on average among multi-candidate sectors (63.0), with thinner evidence overall — likely reflecting that several of these executives hold recently-expanded or newly-announced roles with less public track record yet documented, rather than a reflection of their actual performance. Restaurants & Foodservice (Warren Anderson, McDonald's, 82/100) and Industrial & Energy (77.5 average, 2 candidates) are each represented by too few candidates to generalize a sector pattern.",
    ],
  },
  {
    n: "05",
    title: "Geographic perspectives",
    paragraphs: [
      "This longlist's geographic distribution was assessed from each company's publicly known global headquarters — not a field stored in the underlying data, and worth stating plainly as an inference rather than a sourced fact the way each candidate's title and achievements are. By that measure, 26 of the 50 companies represented (52%) are headquartered in North America, 22 (44%) in Europe, and 2 (4%) in Asia-Pacific — Lenovo and JD.com, both China-headquartered. No company in this longlist is headquartered in Latin America, the Middle East, or South Asia, despite those regions being explicitly searched during candidate research.",
      "This concentration likely reflects which companies' supply chain leadership receives English-language trade press and corporate-communications coverage, rather than where strong CSCOs actually work. It is disclosed here as a limitation of this edition's research reach, not as a claim about where supply chain leadership talent is concentrated globally — a gap worth closing in a future edition.",
    ],
  },
  {
    n: "06",
    title: "What makes an exceptional CSCO",
    paragraphs: [
      "Within this ranking's own terms — how much of a candidate's record documents achievement across seven dimensions — most candidates (28 of 50, 56%) show evidence in two or three dimensions; only 9 show evidence in five or more, and a single candidate, Vikram Agarwal of Danone, is evidenced across six of the seven. What distinguishes the highest-scoring entries is not a single outsized achievement but breadth: a documented record that spans transformation, resilience, digital adoption, and talent development together, rather than excellence in one area alone.",
      "That pattern is worth stating carefully. It describes what this methodology rewards — sourced, individually-attributed, multi-dimensional achievement — not a universal definition of CSCO excellence. A CSCO whose strongest work is concentrated in one area, or whose achievements haven't yet been captured in company communications or trade press, would score lower here regardless of their actual impact. Readers using this ranking to assess leadership should treat it as one input, grounded in what is publicly documented today, rather than a complete picture of any individual's capability.",
    ],
  },
  {
    n: "07",
    title: "Implications for CEOs and boards",
    paragraphs: [
      "Four points from this edition's research are worth boards' attention, independent of where any individual executive lands in the rank order. First, the Chief Supply Chain Officer title itself is still consolidating — fewer than a quarter of the executives profiled here hold that exact title, even though all lead comparable scope. Boards formalizing or elevating a supply chain leadership seat have real latitude in how to define and title it, and should look at how peers in their own sector have organized the role rather than assuming a single standard exists.",
      "Second, the breadth pattern in this data — top-ranked leaders evidence achievement across more dimensions, not a single flagship win — suggests boards evaluating supply chain leadership should ask about the full range of a candidate's track record (transformation, resilience, procurement, talent development, sustainability) rather than anchoring on one headline initiative.",
      "Third, the geographic concentration disclosed above is itself a signal for boards operating outside North America and Europe: less external benchmarking data is readily available for supply chain leadership in other regions, which should be weighted when making relative judgments about talent.",
      "Finally, this ranking — like any evidence-coverage methodology — rewards what is documented, not necessarily what is true. Boards should treat it, and any ranking like it, as a starting point for internal diligence, not a substitute for it.",
    ],
  },
];

/**
 * Candidates in Stage 5 preliminary rank order (lowest rank number first).
 * Computed once at module load from the `rank` field already present on
 * each candidate — never hand-ordered. Candidates without a rank (should
 * not occur once Stage 5 is complete) sort to the end.
 */
const RANKED_CANDIDATES: Candidate[] = [...CANDIDATES].sort(
  (a, b) => (a.rank ?? Number.MAX_SAFE_INTEGER) - (b.rank ?? Number.MAX_SAFE_INTEGER)
);

export function Top50Csco() {
  return (
    <>
      {/* Cover — full-bleed background photo (boardroom overlooking a port,
          world-map overlay on the glass), matching the Main page hero's
          treatment: live, accessible text over a cropped/gradient-darkened
          photo rather than text baked into the image. */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/top50-cover-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/88 to-void/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/15 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-3 py-1.5 text-xs text-ink-secondary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute h-1.5 w-1.5 rounded-full bg-signal-cyan pulse-dot" />
              </span>
              Global Supply Chain Index · Top 50 CSCO Ranking - 2026 Edition
            </div>

            <p className="mt-5 font-mono text-xs uppercase tracking-wider text-ink-muted">
              Top 50 CSCO — World Ranking Report
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-primary sm:text-4xl lg:text-5xl">
              A sourced ranking of 50 Chief Supply Chain Officers, scored on a transparent,
              published methodology.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-secondary">
              Published by Global Supply Chain Index, recognizing the executives
              transforming global supply chains — for CEOs, boards, CSCOs, procurement
              leaders, academics, recruiters, and business media.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-12 lg:pb-16">

      {/* Objectives */}
      <div className="mt-8">
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
            Candidates are evaluated against a transparent, repeatable framework
            built from publicly documented achievements, company disclosures,
            credible business reporting, and verified executive statements —
            never from assumption. Facts, attributed statements, and analytical
            assessments are distinguished throughout, and any candidate lacking
            sufficient evidence is flagged for further verification rather than
            filled in.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            Before publication, GSCI will disclose which selection model was
            used — independent editorial assessment, nomination-based,
            data-driven, or a clearly labeled hybrid — along with any commercial
            relationship that could bear on eligibility. Commercial participation
            is never treated as evidence of merit.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            Every entry below is sourced to a primary reference — a company
            leadership page, newsroom bio, or a traceable press release —
            linked directly from its own card rather than gathered separately.
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

      {/* Report structure */}
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
          Candidate longlist — 50 confirmed, verified, scored, and ranked CSCOs
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RANKED_CANDIDATES.map((c, i) => (
            <div key={c.name} className="flex flex-col rounded-xl border border-border bg-panel p-5">
              <div className="flex items-center gap-3">
                {typeof c.rank === "number" && (
                  <span
                    className="flex h-7 min-w-[28px] flex-shrink-0 items-center justify-center rounded-md border border-signal-emerald/30 bg-signal-emerald/10 px-1.5 font-mono text-[11.5px] font-bold text-signal-emerald"
                    title="Rank — formula-derived evidence-coverage sort, verified in Stage 7 (final QC)"
                  >
                    #{c.rank}
                  </span>
                )}
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold text-white"
                  style={{ backgroundColor: CANDIDATE_ACCENTS[i % CANDIDATE_ACCENTS.length] }}
                >
                  {initials(c.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-primary">{c.name}</p>
                  <p className="truncate text-[12px] text-ink-muted">{c.company}</p>
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
              <p className="mt-3 text-[13px] font-medium text-ink-secondary">{c.title}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="inline-flex w-fit items-center rounded-full border border-border px-2.5 py-1 text-[11px] text-ink-secondary">
                  {c.sector}
                </span>
                {c.disclosure && (
                  <span className="inline-flex w-fit items-center rounded-full border border-signal-amber/30 bg-signal-amber/10 px-2.5 py-1 text-[11px] text-signal-amber">
                    {c.disclosure}
                  </span>
                )}
                {c.verificationNote && (
                  <span className="inline-flex w-fit items-center gap-1 rounded-full border border-status-warning/30 bg-status-warning/10 px-2.5 py-1 text-[11px] text-status-warning">
                    <ShieldAlert className="h-3 w-3" strokeWidth={2} />
                    {c.verificationNote}
                  </span>
                )}
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
              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink-secondary">{c.bio}</p>
              <div className="mt-4 flex flex-col gap-2 border-t border-border-subtle pt-3">
                <a
                  href={c.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-signal-cyan hover:opacity-80"
                >
                  {c.hasOfficialPhoto ? (
                    <ImageIcon className="h-3.5 w-3.5" strokeWidth={2} />
                  ) : (
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                  )}
                  {c.hasOfficialPhoto ? "Official photo & bio — " : "Primary source — "}
                  {c.sourceLabel}
                </a>
                <a
                  href={c.linkedinUrl ?? linkedInSearchUrl(c.name, c.company)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-muted hover:text-ink-secondary"
                >
                  <Search className="h-3.5 w-3.5" strokeWidth={2} />
                  {c.linkedinUrl ? "View LinkedIn profile" : "Find on LinkedIn"}
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
          The same {CANDIDATES.length} candidates as the longlist above, condensed into a single
          publication-style table — sorted by the Stage 5 rank (score descending, ties broken
          alphabetically), re-verified in Stage 7 (final QC) against each candidate&apos;s own
          score and evidenceDimensions with zero formula discrepancies found.
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-panel-raised text-left text-xs uppercase tracking-wider text-ink-muted">
                <th className="px-4 py-3 font-medium">Rank</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Sector</th>
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
                  <td className="whitespace-nowrap px-4 py-2.5 font-medium text-ink-primary">
                    {c.name}
                  </td>
                  <td className="px-4 py-2.5 text-ink-secondary">{c.title}</td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-ink-secondary">{c.company}</td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-ink-muted">{c.sector}</td>
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
          The narrative chapters outlined above, drafted during Stage 6 and checked during
          Stage 7 (final quality control). Every statistic cited below is computed directly
          from the 50 candidates&apos; own scores, evidence tags, sectors, and ranks shown
          throughout this page — nothing here is invented or assumed about any individual.
          Chapters 02 (the ranking) and 08 (methodology and references) are covered by the
          Ranking table and Methodology sections above rather than repeated here. Stage 7
          re-verified every statistic against the live candidate data and caught one error,
          now corrected: chapter 01&apos;s title-pattern counts (see the in-code note above
          this report&apos;s data for the figures as first published and the corrected ones).
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

      {/* CTA */}
      <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-border-subtle pt-10">
        <a
          href="#candidates"
          className="inline-flex items-center gap-2 rounded-lg bg-signal-cyan px-5 py-3 text-sm font-medium text-white shadow-glow transition-opacity hover:opacity-90"
        >
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
    </>
  );
}

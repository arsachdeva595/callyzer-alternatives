# KPI and Insight Catalogue Derivable from SIM Call-Log Metadata (Callyzer-type data)

Scope: India SIM-based telecalling and field-sales teams (real estate, EdTech, loans/insurance, B2B distribution), 2024–2026. Input fields assumed per call: `rep_id`, `number` (customer phone, normalised to E.164 / last 10 digits), `type` ∈ {incoming, outgoing, missed, rejected, outgoing_not_connected}, `ts` (start timestamp), `dur` (seconds), `sim/device`. Optional: recording, note/tag, lead_status, rep shift/working hours.

Research limitations: callyzer.co, telecrm.in and justcall.io could not be fetched directly from this session (network allowlist blocked them). Claims about these vendors come from search-result snippets only, so treat them as lower confidence. Most formulas below are **my design** (marked as inference). Standard definitions they rely on are cited.

---

## Q1. Standard practitioner metric definitions (contact centre / WFM / RevOps) and how they translate to a SIM-phone field team

### Takeaway
Classic contact-centre metrics assume an ACD queue, so ASA, abandonment, occupancy and FCR have no direct equivalent on personal SIMs. Each has a close **per-number sequence proxy**, for example "missed-call callback time" as a stand-in for ASA. Outbound vocabulary (connect vs contact/conversation vs right-party contact) is vendor-inconsistent, so any product must publish its own exact definitions and duration thresholds.

### Cited Findings
- **ASA (Average Speed of Answer):** the average time callers wait in queue before an agent answers, measured per call type over an interval. A commonly cited target is ~30 s or less — [JustCall terminology](https://justcall.io/blog/call-center-terminology.html); [Brad Cleveland glossary](https://bradcleveland.com/contact-center-management-glossary/) (via search summary).
- **Abandonment rate** = abandoned calls ÷ total inbound calls × 100. The common rule of thumb is <5%, with top performers at 2–3% — [LeadDesk guide](https://leaddesk.com/blog/complete-guide-to-call-center-metrics/); [CloudTalk benchmarking](https://www.cloudtalk.io/blog/5-call-center-metrics-for-successful-benchmarking/).
- **Occupancy** is the share of logged-in time spent handling contacts (talk + after-call work). A typical industry range is ~80–85%. Utilisation differs and is often confused with it — [BenchmarkPortal glossary](https://www.benchmarkportal.com/public/pdf/Downloadables/BMP-Glossary.pdf); [CX Lead](https://thecxlead.com/customer-experience-management/call-center-performance-metrics/).
- **FCR (First Call/Contact Resolution):** SQM defines it as the % of customers whose need was resolved on the first contact, with no repeat contact for the same reason. The standard calculation is resolved first contacts ÷ total first contacts × 100. Operational definitions often use a repeat-contact window, e.g. no re-contact within 7 days — [SQM top-10 metrics](https://sqmgroup.com/resources/library/blog/top-10-customer-service-metrics); [SQM FCR whitepaper 2020](https://survey.sqmgroup.com/pdf/FCRWhitepaper2020.pdf); [HiveDesk glossary](https://www.hivedesk.com/glossary/first-call-resolution).
- SQM's 2024 FCR benchmark puts "good" at 70–79% and world-class at ≥80% (reached by ~5% of centres) — search summary of SQM materials ([SQM](https://sqmgroup.com/resources/library/blog/top-10-customer-service-metrics)).
- **Connect / contact / conversation / RPC definitions are vendor-inconsistent:**
  - Some vendors count voicemail/IVR pickups as "connects". Others require a conversation with the target — [Prospeo](https://prospeo.io/s/contact-rate-vs-connect-rate); [TitanX "fake connect rates"](https://titanx.beehiiv.com/p/fake-connect-rates-are-a-real-problem).
  - JustCall's "contact rate" excludes voicemails, quick hang-ups, wrong numbers and brief dismissals — [JustCall](https://justcall.io/blog/contact-rate-vs-connection-rate-vs-answer-rate.html) (snippet).
  - Some sources set the "conversation" cutoff at ≥30 s talk time — [Prospeo connect-rate](https://prospeo.io/s/connect-rate).
  - TitanX argues for reporting connect and conversation separately because a bare pickup is not a conversation — [TitanX](https://titanx.beehiiv.com/p/fake-connect-rates-are-a-real-problem).
- **Right-Party Contact (RPC)** means reaching the intended person; reaching a spouse does not count. Five9 defines RPC as this for collections/outbound — [Five9 FAQ](https://www.five9.com/faq/what-is-right-party-contacts-rpc); [Darwin AI](https://blog.getdarwin.ai/en/right-party-contact-rate-collections).
- Outbound contact-rate benchmarks are commonly quoted at 8–20%. Definitions differ across sources, so these are rough — [Colektia](https://colektia.com/en/blog/contact-rate); [LeadHaste benchmarks](https://leadhaste.com/blog/connect-rate-benchmarks-2026).

### Inferences (translation table, my design)
| Contact-centre metric | SIM-team proxy from call logs | Formula |
|---|---|---|
| ASA | **Missed-call callback time** | for each missed/rejected inbound from N at t0: min(ts of next outgoing to N by any rep, or next connected inbound from N) − t0 |
| Abandonment rate | **Unreturned missed-call rate** | missed/rejected inbound "episodes" with no connected contact within X h ÷ all missed episodes |
| Answer rate (inbound) | **Inbound pickup rate** | incoming with dur>0 ÷ (incoming + missed + rejected) |
| Occupancy | **Talk-time share of shift** | Σdur within shift ÷ (shift length, or active window first→last call) |
| Utilisation | **Active-window ratio** | (last call ts − first call ts) ÷ scheduled shift length |
| FCR | **Single-touch resolution proxy** | numbers with exactly one connected call and no further calls in 7/14 days. Ambiguous without a disposition (could be lost *or* resolved) |
| AHT | **Average talk time per connected call** | mean(dur \| dur>0). There is no hold/wrap time in SIM logs |
| Connect rate | outgoing with dur>0 ÷ all outgoing (incl. not-connected) | |
| Conversation rate | outgoing with dur ≥ T ÷ all outgoing, with T = 30/60/120 s (see Q4) | |
| RPC | **Not derivable** without disposition. Proxy: connected call followed by a further conversation ≥ T within 7 days | |

### Gaps
- I could not access ICMI's or NICE/Genesys's paywalled glossaries directly. The definitions above are from secondary glossaries.
- No published benchmark exists for SIM-based (non-dialer) Indian telecalling connect rates beyond Callyzer's own blog claim (Q8).

---

## Q2. Sequence-based (per phone number over time) metrics

### Takeaway
The highest-value, least-offered insights come from ordering all calls to and from a number across *all reps* and computing state transitions. These include first-touch latency, callback latency, attempts-to-connect, gaps between touches, and "going cold". External research gives the default thresholds: 5 min speed-to-lead, ~6 attempts, contact-probability decay by attempt.

### Cited Findings
- **MIT/InsideSales Lead Response Management study (Oldroyd, 2007):**
  - Calling within 5 min vs 30 min gives 100× higher odds of contact and 21× higher odds of qualifying.
  - Going from 5 to 10 min cuts qualification odds ~4×.
  - Sample: >15,000 web leads, ~100,000 call attempts, 6 companies — [MIT study PDF (mortech mirror)](https://www.mortech.com/hs-fs/hub/25649/file-13535879-pdf/docs/mit_study.pdf); [Callingly summary](https://callingly.com/blog/state-of-speed-to-lead).
  - Secondary sites often misquote it as "5 vs 10 min" or "conversion" — [ainora critique](https://ainora.lt/blog/lead-response-time-5-minutes-study-2026).
- **HBR "The Short Life of Online Sales Leads" (Oldroyd, McElheran, Elkington, HBR Mar 2011):** audit of 2,241 US firms. Widely cited as finding an average response time of ~42 h among responders. The exact sub-stats conflict across secondary sources — [BYU ScholarsArchive record](https://scholarsarchive.byu.edu/facpub/9711); [ainora summary](https://ainora.lt/blog/lead-response-time-statistics-every-study-2026).
- **Velocify/Leads360 (2012, ~3.5M leads):**
  - 93% of *converted* leads were reached by the 6th call attempt.
  - Cumulative reach by attempt was roughly 48% (1st), 70% (2nd), 81% (3rd), 86% (4th), 90% (5th), 94% (6th). These values are read from the chart, so they are approximate — [Velocify Ultimate Contact Strategy (SlideShare)](https://www.slideshare.net/Velocify/the-ultimate-contact-strategy); [NatLawReview summary](https://natlawreview.com/article/study-reveals-best-contact-strategies-optimal-lead-conversion).
- **InsideSales white paper:** 4–6 attempts gives ~55% lead-contacted ratio — [InsideSales](https://resources.insidesales.com/?p=3027).
- **Ascend2/Verse 2020:** 71% of companies give up after 3–5 attempts — [MarketingCharts](https://dev.marketingcharts.com/customer-centric/lead-generation-and-management-115285).
- **Profit-optimal attempt count is segment-dependent:** e.g. 10 attempts for one segment, 6 for small business — [Weidert](https://www.weidert.com/blog/effectively-prospect-leads-using-these-metrics).
- **LRM study summaries:**
  - Contact odds fall ~10× after the first hour.
  - Weekday/hour effects also reported (Q5) — [NatLawReview best practices](https://natlawreview.com/article/best-practices-responding-to-online-leads); [MarketingSherpa 2007](https://marketingsherpa.com/article/whats-best-day-time-to).
- **India regulatory anchor for over-dialling:**
  - RBI (Aug 2022) told regulated entities' recovery agents not to call borrowers before 08:00 or after 19:00 — [Business Standard](https://business-standard.com/amp/article/finance/rbi-directs-loan-recovery-agents-not-to-intimidate-borrowers-no-calling-before-8am-after-7pm-122081201144_1.html); [ThePrint](https://theprint.in/economy/rbi-directs-loan-recovery-agents-not-to-intimidate-borrowers-no-calling-before-8am-after-7pm/1080375).
  - The rule was re-proposed in the Oct 2023 draft outsourcing Master Direction — [Outlook Business](https://www.outlookbusiness.com/news/rbi-proposes-to-bar-recovery-agents-from-calling-borrowers-before-8-am-after-7-pm).
  - A 2026 consolidated direction effective 1 Jan 2027 is reported only by commercial sites, so it is unverified — [Exotel](https://exotel.com/rbi-loan-recovery-guidelines).

### Inferences — KPI catalogue: per-number sequence family (my design)

Common building blocks (definitions to fix once, org-configurable):
- **Org timeline T(N):** all call events for number N across all reps, sorted by ts. Exclude internal numbers (employee SIMs, office lines) and a personal-contact blacklist.
- **New lead / new number:** N whose first event in T(N) falls in the analysis window *and* who had no event in the prior L days. Default L = 90 for transactional sales (loans, EdTech) and L = 180 for real estate. This is a "look-back washout"; without it, every number is "new" on day 1 of data.
- **Connected call:** dur > 0 (incoming/outgoing). **Conversation:** dur ≥ T_conv (default 60 s; see Q4).
- **Episode:** a burst of activity on N separated from the previous burst by ≥ G idle days (default G = 14). Episodes allow "re-activation" analysis.
- **Business hours window:** org shift, e.g. 09:30–19:00 IST, Mon–Sat. For response-time metrics, report both clock time and business-hours time (pause the clock outside shift). Otherwise night leads distort medians.

| # | KPI | Precise definition / formula | Assumptions | Why a sales head cares | Failure modes / gaming | Difficulty |
|---|---|---|---|---|---|---|
| S1 | **Inbound speed-to-lead (first response time, FRT)** | For new N whose first event e0 is incoming-missed/rejected/connected-but-short at t0: FRT = ts(first outgoing to N by any rep, any outcome) − t0. Report median, P90, and % ≤5 min / ≤1 h / ≤24 h | e0 must be inbound. If e0 is a connected inbound ≥ T_conv, the lead is "answered live", FRT = 0 (report separately) | MIT/InsideSales decay (100× contact, 21× qualify at 5 vs 30 min) | Inbound leads arriving via portals/IVR (99acres, Justdial, IndiaMART) show up as rep-initiated outgoing calls, not inbound, so FRT misses them unless lead-creation time is imported. Clock vs business-hours skew. Rep "touches" with a 1-ring dial to stop the clock (counter it with "first *connected* response time") | Per-number sequence |
| S2 | **First connected response time** | ts(first event with dur>0, either direction) − t0 | as S1 | A real conversation is what matters | — | Per-number sequence |
| S3 | **Missed-call callback rate** | Missed episodes = maximal runs of missed/rejected inbound from N not separated by a connected call. Callback rate (X h) = episodes followed by an outgoing call to N within X h ÷ all episodes. X = 1, 4, 24 h | Count episodes, not individual missed calls (customers retry 2–3×). Treat a later connected inbound from N as "recovered by customer", not by the team | Missed inbound = hottest intent. Directly maps to abandonment | Callback to a wrong rep; calls from a rep's personal phone not tracked; DND/spam numbers inflate the denominator (exclude numbers with ≥K distinct missed calls and never connected, or numbers in a spam list) | Per-number sequence |
| S4 | **Missed-call callback time** (ASA proxy) | median/P90 of (first outgoing to N − first missed in episode) | as S3 | SLA for inbound | as S3 | Per-number sequence |
| S5 | **Missed-call recovery rate** | episodes followed by any connected call (either direction) within X h ÷ episodes | — | Outcome version of S3 | — | Per-number sequence |
| S6 | **Never-attended / unreturned missed numbers** (list + count) | Distinct N with missed/rejected inbound in period and no outgoing and no connected call afterwards (up to now) | Callyzer already offers a "Never Attended" list (see Q8) | Actionable to-do list | Old missed calls from spam | Simple filter |
| S7 | **Attempts to first connect** | For new N (outbound-originated or after S1): count of outgoing (incl. not-connected and dur=0) before the first event with dur>0. Distribution + mean | Count attempts across all reps. Cap at 30 | Calibrates persistence (Velocify ~6) | Rep dials then cuts at 0 s to inflate attempts | Per-number sequence |
| S8 | **Attempts to first conversation** | Same, until the first dur ≥ T_conv | T_conv choice | Separates pickups from talks | — | Per-number sequence |
| S9 | **Answer probability by attempt number** (contact curve) | P(connect at attempt k \| not connected at attempts 1..k−1) for k=1..10. Also the cumulative curve | Needs enough N per k (≥100) | Sets a give-up rule: stop when marginal p_k × value < cost | Survivor bias (hard-to-reach numbers dominate high k) | Per-number sequence + aggregate (life-table / hazard) |
| S10 | **Attempts before abandonment** ("give-up depth") | For N never connected and with no event for ≥ G days: total outgoing attempts. % abandoned with <3, 3–5, ≥6 attempts | G = 14 d | Under-persistence leaks leads (71% stop at 3–5) | Numbers that are genuinely invalid | Per-number sequence |
| S11 | **Under-worked new leads** | % of new N with ≤1 outgoing attempt and no connect after 72 h | — | Lead wastage | — | Per-number sequence |
| S12 | **Days to first meaningful conversation** | date(first dur ≥ T_conv) − date(first event) | — | Funnel velocity proxy | — | Per-number sequence |
| S13 | **Follow-up gap** | Gap between consecutive connected calls to N; median gap per lead, % gaps > SLA (e.g. >3 days for EdTech, >7 for real estate) | Excludes same-day repeat calls (<2 h) as one touch | Follow-up discipline is the #1 rep failure | Rep does "touch" calls of 5 s to reset the gap | Per-number sequence |
| S14 | **Lead going cold / ageing buckets** | Days since last connected call for every active N: 0–2, 3–7, 8–14, 15–30, >30. "Cold" = last connect > G days ago and no outgoing since | "Active" = had ≥1 conversation ≥ T_conv and not marked closed (needs lead_status) | Pipeline-at-risk list, the analyst's daily to-do | Without lead_status, won/lost leads look "cold" | Per-number sequence |
| S15 | **Customer-initiated re-engagement** | Episodes where N calls in after ≥ G days silence. Response time to these (as S1) | — | Returning leads are very warm | — | Per-number sequence |
| S16 | **Over-dialling / harassment risk flag** | Per N per day: outgoing attempts ≥ D (default D=4 for sales, stricter for collections), or ≥ W per 7 days (default 12), or calls before 08:00/after 19:00 IST, or repeat dialling within <10 min after a rejected call | RBI 08:00–19:00 window applies to loan recovery. For sales it is a sensible default | Complaints, spam-tagging (Truecaller), regulatory risk for NBFC/insurance teams, brand damage | Legitimate scheduled callbacks requested by the customer (need a note/tag override) | Per-number + simple threshold |
| S17 | **Rejected-call ratio per number** | rejected ÷ inbound-rings, and outgoing_not_connected sequences where the customer appears to cut (dur 0, very quick). Proxy for "customer avoiding us" | SIM logs can't always distinguish busy vs reject on the outgoing side | Stop-rule signal | Network failures | Per-number |
| S18 | **Episode count / lead re-activations** | # episodes per N | G | Long-cycle (real estate) nurturing | — | Per-number |

### Gaps
- No India-specific published study on lead response time or attempt curves. All benchmarks are US-centric and 2007–2012 vintage.
- Can't verify the final 2026/2027 RBI direction text; RBI site not consulted.

---

## Q3. Rep-level behavioural and productivity metrics

### Takeaway
Rep metrics are easy aggregates over (rep, day). Their value comes from a few things: (a) normalising by shift and active time; (b) separating business from personal and internal calls; (c) explicitly flagging gaming patterns such as short calls, calls clustered at shift end, and 0 s dials. Competitors (TeleCRM, Runo, NeoDove) already market first/last call time, connected/attempted, talk time and idle time, so these are table stakes.

### Cited Findings
- TeleCRM's call report lists first & last call time, total/incoming/outgoing/missed/connected/attempted calls, total duration per rep, connect rate, talk time, average call duration, and an hourly call-volume view — [TeleCRM reporting](https://devweb.telecrm.in/features/reporting) (search snippet; page fetch blocked); [TeleCRM dashboard blog](https://telecrm.in/blog/crm-dashboard/).
- Runo markets live dashboards with avg/total talk time and live agent status (on call/idle) — [Runo listing](https://platform.softwareone.com/product/runo-sales-call-tracking-software/PCP-1441-6447).
- NeoDove markets dashboards with attempted vs connected, average duration, and idle-time detection — [NeoDove: measuring telecaller performance](https://neodove.com/how-to-measure-your-telecallers-performance/).
- Callyzer markets working-hours reports (team and employee level) and idle-time tracking — [Callyzer pricing](https://callyzer.co/pricing/) (snippet); [NatLawReview press release](https://natlawreview.com/press-releases/callyzer-bridges-gap-business-communication-new-sim-based-call-tracking).
- I found no published source on telecaller fake-call or short-call gaming detection. The search returned only consumer spam-call material — gap.

### Inferences — rep KPI catalogue (my design)
Base unit: (rep, date). Exclude internal and blacklisted numbers. Optionally exclude "personal" numbers (see R13).

| # | KPI | Definition / formula | Assumptions | Why care | Failure / gaming | Difficulty |
|---|---|---|---|---|---|---|
| R1 | Dials (outgoing attempts) | count(outgoing + outgoing_not_connected) | — | Activity | Inflated by 0 s dials | Simple |
| R2 | Unique numbers dialled | count distinct N | — | Coverage vs. re-dialling the same few | — | Simple |
| R3 | Connect rate (outbound) | outgoing dur>0 ÷ R1 | — | Lead quality / timing | — | Simple |
| R4 | Conversation rate | outgoing dur ≥ T_conv ÷ R1, at T = 30/60/120 | Q4 | The honest productivity number | — | Simple |
| R5 | Total talk time & talk time per conversation | Σdur; mean/median dur \| dur ≥ T_conv | — | Effort & depth | Long calls with friends/family | Simple |
| R6 | First call time / last call time | min/max ts per day (business calls only) | — | Punctuality | One early dial to "start the day" | Simple |
| R7 | Active calling window | last − first call ts. **Active hours** = # distinct clock hours (or 15-min slots) with ≥1 call | — | Real working span vs shift | — | Simple |
| R8 | Idle gaps | Gaps between end(call i) = ts_i + dur_i and ts_{i+1}. Report count of gaps > 30 min within shift, longest gap, Σidle | Field-sales reps legitimately travel or meet customers; tag field roles separately | Detects disengagement | Lunch/meetings flagged as idle | Per-rep sequence |
| R9 | Calls per active hour; talk minutes per active hour | R1 ÷ R7(active hours); Σdur/60 ÷ active hours | — | Intensity normalised for part days | — | Simple |
| R10 | Talk-time share of shift (occupancy proxy) | Σdur ÷ shift seconds | Shift field needed | Capacity planning | — | Simple |
| R11 | **Very-short-call share** | outgoing with 0 < dur < 10 s ÷ connected outgoing. Also 0 s dial share | 10 s ≈ ring-pickup-hangup. Not a conversation | Possible fake/pocket dials, or customers cutting immediately | High in legit cold-calling too, so compare to team baseline | Simple |
| R12 | **Gaming pattern flags** | (a) bursts: ≥N dials within 2 min to distinct numbers with dur 0; (b) end-of-day spike: >X% of daily dials in last 30 min of shift; (c) repeated calls to the same N with dur 5–15 s; (d) target-hugging: daily dials cluster exactly at target; (e) a talk-time spike to a single N (personal call) | Baselines per team | Integrity of incentive metrics | False positives | Rule-based / per-rep sequence |
| R13 | Personal vs business separation | Number classed as personal if: called by only one rep, ≥X calls over months, many calls outside shift, never in lead list. Or use a SIM split (work SIM vs personal SIM) | Privacy: show only aggregates. DPDP Act 2023 consent (not verified in this research) | Prevents talk-time inflation; privacy | Misclassifying long-cycle clients as personal | Heuristic classifier |
| R14 | Consistency index | Coefficient of variation of daily R4 (or R5) over 20 working days; # days below 50% of own median | — | Reliability, early burnout signal | — | Simple stats |
| R15 | Inbound responsiveness per rep | Rep-attributed S3/S4 (missed calls landing on rep's SIM) | — | Accountability | — | Per-number sequence |
| R16 | New-lead first-touch share | % of team new leads where this rep made the first touch; FRT median per rep | — | Who works fresh leads | — | Per-number sequence |
| R17 | Follow-up compliance | % of rep's active leads with gap ≤ SLA (S13) | — | Discipline | — | Per-number sequence |
| R18 | Productivity anomaly | Rep-day R4 or R5 below (rolling 28-day median − 2×MAD), or a sudden drop vs own baseline; flag for 2+ consecutive days | Robust stats | Early warning (attrition, absenteeism, phone not syncing) | Leave days, festival days (Diwali) | Statistical |

### Gaps
- No public benchmark exists for typical Indian telecaller dials/day or talk-time/day from a neutral source. Vendor blogs give ranges without methodology (not cited).

---

## Q4. Conversation-quality proxies via duration (choosing thresholds)

### Takeaway
Duration is the only quality signal in pure metadata. Use **tiered buckets** rather than one cutoff:
- 0 s: not connected
- 1–9 s: no conversation / hang-up
- 10–29 s: brief
- 30–119 s: short conversation
- 120–299 s: qualifying conversation
- ≥300 s: deep

Calibrate the meaningful threshold per org by checking which bucket predicts a next-stage event (a callback, a second conversation within 7 days, or lead_status advance).

### Cited Findings
- Some outbound practitioners define "conversation" as ≥30 s talk time — [Prospeo connect-rate](https://prospeo.io/s/connect-rate); a "quick hang-up" doesn't count as a contact — [JustCall](https://justcall.io/blog/contact-rate-vs-connection-rate-vs-answer-rate.html) (snippet).
- Gong Labs: successful cold calls (those that led to a held meeting) averaged 5:50 vs 3:14 for unsuccessful ones, i.e. nearly 2× longer — [Gong cold-call stats](https://www.gong.io/blog/cold-call-stats); [Gong: is cold calling dead](https://www.gong.io/resources/labs/is-cold-calling-dead/).
- But Gong found **no** significant correlation between first-call duration and getting a second meeting for AE first calls on existing opportunities. The duration–success link is context-dependent and correlational — [Gong: how long first sales call should be](https://www.gong.io/resources/labs/how-long-your-first-sales-call-should-be/).

### Inferences (my design)
| # | KPI | Definition | Notes |
|---|---|---|---|
| Q1 | Duration bucket mix | % of connected calls in each bucket per rep/team/week | Shift towards 1–29 s = lists going bad or reps rushing |
| Q2 | Meaningful conversation count | # calls with dur ≥ T_conv. Default 60 s for B2C telecalling (30 s is enough to say "not interested"), 120 s for qualification-heavy sales (loans, real estate site visit booking) | Validate: P(second conversation within 7 days \| bucket) |
| Q3 | Duration distribution shift | Week-over-week KS test or median/P75 change per rep | Detects script change, list change, gaming |
| Q4 | Deep-conversation ratio | dur ≥ 300 s ÷ conversations | Proxy for qualified pipeline |
| Q5 | Talk time per lead to first deep call | Σdur on N before first ≥300 s call | Effort economics |
| Q6 | Repeat-conversation rate | % of N with ≥2 conversations ≥ T_conv within 14 days | Engagement / FCR inverse |
| Q7 | Threshold calibration curve | For T in {10, 20, 30, 45, 60, 90, 120, 180, 300}: lift of P(next-stage) vs base | A one-off analyst study per customer. Statistical |

Failure modes: long calls ≠ good calls (complaints, personal calls). Language and segment differences. Recordings/notes reveal the truth but metadata cannot.

### Gaps
- No India-specific study links call duration to conversion.

---

## Q5. Customer-side patterns and simple statistics (best time to call, cohorts, anomalies)

### Takeaway
Answer rate by hour × weekday is the single most requested "insight" and is easy to compute from outgoing outcomes. Published US results (Wed/Thu, 4–5 pm best; 11–2 worst) conflict with newer data, which is a strong reason to compute it per customer and per segment rather than quote benchmarks.

### Cited Findings
- LRM/InsideSales: Wednesday and Thursday are best to contact (Thursday ~50% better than Tuesday). 4–5 pm is best, 8–9 am second. 11 am–12 pm and 1–2 pm are worst — [HubSpot infographic](https://blog.hubspot.com/sales/best-times-to-connect-with-leads-infographic); [MarketingSherpa 2007](https://marketingsherpa.com/article/whats-best-day-time-to).
- WAVV (85M dials, 2026) instead found Monday highest for answer rate (11.5%) and conversation rate (1.01%), with Sunday weakest — [WAVV best time to call](https://www.wavv.com/post/best-time-to-call).
- PhoneBurner 2018 found 10 am in the prospect's time zone most productive for cold calls — via search summary ([ClientTether](https://clienttether.com/blog/what-are-the-best-times-to-call-customers-4-rules/page/2)).

### Inferences (my design)
| # | KPI | Definition | Difficulty |
|---|---|---|---|
| C1 | Answer-rate heatmap | P(dur>0) and P(dur ≥ T_conv) for outgoing, by hour(ts) × weekday; with Wilson 95% CIs; min n=30/cell | Simple aggregate + CI |
| C2 | Attempt-adjusted best time | Logistic regression: connect ~ hour + weekday + attempt_no + rep + lead_age_days (+ segment). Avoids confounding because first attempts cluster in the morning | Statistical model |
| C3 | Per-number preferred slot | For N with ≥3 connected calls: modal hour of connected calls / inbound calls → "call this lead at ~6 pm" | Per-number |
| C4 | Inbound demand curve | Incoming+missed by hour × weekday → staffing (WFM) and missed-call risk hours (missed share by hour) | Simple |
| C5 | Weekly lead cohorts | Cohort = week N first seen. Track % reached (dur>0), % conversation ≥ T_conv, median attempts, % cold at day 7/14/30 | Cohort table |
| C6 | Lead-source / number-series cohorts | By the prefix of the number, the SIM the lead arrived on, or the tag | Simple |
| C7 | Team anomaly detection | Daily totals vs a 28-day same-weekday baseline (median ± 3 MAD) or STL residuals. Covers sync failures and holidays | Statistical |
| C8 | Seasonality/festival effects | Answer rate on festival weeks vs baseline | Simple |

### Gaps
- No published India-specific best-time-to-call data was found. IST work patterns (late lunch, evening availability) likely differ from US data. This is an inference.

---

## Q6. Team / coverage hygiene

### Takeaway
Because data spans all reps' SIMs, the platform can see cross-rep collisions that no single rep (and no Excel export by rep) can see. Examples: duplicate calling, orphaned leads, and leads called by a non-owner. This is a differentiator, since a per-rep phone app shows only its own rep's calls.

### Cited Findings
- Callyzer's own blog attributes unanswered-call volume partly to "duplicate dials" and bad lead data — [Callyzer blog: daily call report analysis](https://callyzer.co/blog/telecalling-daily-call-report-analysis/) (snippet; fetch blocked).

### Inferences (my design)
| # | KPI | Definition | Why | Difficulty |
|---|---|---|---|---|
| H1 | Duplicate-calling rate | % of N (in period) dialled by ≥2 distinct reps within D days (D=7), excluding a defined handoff (e.g. a lead assigned to another rep via lead_status) | Wasted effort, customer annoyance, territory conflicts | Per-number |
| H2 | Collision events | Two reps calling the same N within 60 min of each other | Real-time alert | Per-number |
| H3 | Lead owner attribution | Owner = rep with the most conversation seconds (or first conversation) on N. "Poaching" = a non-owner rep converting/closing a lead (needs lead_status) | Incentive disputes | Per-number |
| H4 | Orphaned leads | N with inbound activity but whose last outgoing was by a rep now inactive/left | Attrition leakage (high in Indian telecalling) | Per-number + rep roster |
| H5 | Coverage gaps | Hours in shift where no rep is active while inbound missed calls occur | WFM staffing | Simple |
| H6 | Lead distribution fairness | Gini of new-lead first touches across reps | Allocation | Simple stats |
| H7 | Internal call share | % of calls/talk time to internal numbers (colleagues/manager) | Excluded from productivity | Simple |

---

## Q7. Data quality metrics

### Inferences (my design; no external sources found specifically)
| # | KPI | Definition |
|---|---|---|
| D1 | Sync freshness / lag | now − last synced call ts per device. Flag reps with >X h lag during shift (the "dashboard lags" complaint) |
| D2 | Silent device days | Scheduled working day with 0 events (sync off, app killed by battery optimiser, phone change) |
| D3 | Number normalisation errors | % of numbers that fail 10-digit Indian mobile validation (+91/0 prefixes, landlines with STD codes, short codes) |
| D4 | Duplicate events | Identical (rep, N, ts ±2 s, dur) rows from dual-SIM/multi-device sync |
| D5 | Clock skew | Device timestamps in the future or out of order |
| D6 | Unknown call-type share | Rows with type codes not mapped (OEM-specific Android call types, e.g. blocked/voicemail/answered-externally) |
| D7 | Untagged share | % of conversations ≥ T_conv with no note/tag/lead_status. Measures disposition adoption |
| D8 | Spam/robocall share | Inbound from numbers flagged by repeated short missed calls to many reps |

---

## Q8. What Callyzer already offers, and what is NOT possible from metadata alone; minimal extra fields

### Takeaway
Pure metadata gives activity, responsiveness, persistence and duration-quality proxies. It cannot give outcome (qualified, won, revenue), reason codes, right-party contact or sentiment. A **single one-tap disposition after each connected call** (e.g. 6–8 codes) plus **lead_status** and **lead-created timestamp/source** unlocks most of the missing value: conversion funnels, RPC, FCR, and attempt-to-outcome curves.

### Cited Findings
- Callyzer markets:
  - a "Never Attended" list: calls the employee never talked to after missing them — [Callyzer pricing](https://callyzer.co/pricing/) (search snippet; page may be stale)
  - identification of calls the client didn't pick up, plus working hours and idle time — [NatLawReview press release, Callyzer SIM-based tracking](https://natlawreview.com/press-releases/callyzer-bridges-gap-business-communication-new-sim-based-call-tracking)
  - team and employee working-hours reports — [Callyzer pricing](https://callyzer.co/pricing/)
- Callyzer's blog claims a daily connect rate below 35% "often" indicates lead-quality problems or calling at low-pickup hours. This is a self-reported heuristic with no methodology — [Callyzer blog](https://callyzer.co/blog/telecalling-daily-call-report-analysis/).
- Third-party listings describe Callyzer as a call-log analytics/monitoring app for Android — [SaaSworthy](https://www.saasworthy.com/product/callyzer); [Crozdesk](https://crozdesk.com/software/callyzer-47502961-5cf2-47a0-aaa7-8b0e673bdb92); [Callyzer call monitoring](https://callmonitoring.callyzer.co).
- Gong's cold-call "success" definition required an outcome (a held meeting). This illustrates that outcome labels are needed to validate duration proxies — [Gong](https://www.gong.io/resources/labs/is-cold-calling-dead/).

### Inferences (my design)
**Not possible from metadata alone:**
- conversion/revenue, deal value, win rate by rep
- the reason for a lost lead
- right-party contact (who picked up)
- whether a short call was a polite "call later" or a rejection
- call content quality, compliance with script, sentiment
- inbound lead-creation time for portal leads (99acres, IndiaMART, Justdial, Meta lead forms), so true speed-to-lead from lead creation is missing
- WhatsApp/VoIP calls (not in SIM call log)
- calls on untracked personal phones

**Minimal extra fields, ranked by value unlocked:**
1. **One-tap post-call disposition** (shown when dur>0): e.g. {Interested, Call back later [with time], Not interested, Wrong person/number, Already purchased, Not reachable/switched off, Converted}. Unlocks RPC, conversation-to-interest rate, callback-promise compliance (did the rep call at the promised time?), true FCR, and wrong-number cleanup.
2. **Lead status (stage) + timestamp of change.** Unlocks funnel conversion by rep, stage-velocity, and attempt/duration thresholds calibrated against outcomes (Q7).
3. **Lead created_at + source** (via CRM/portal webhook or CSV import). Unlocks true speed-to-lead and source ROI.
4. **Deal value (optional).** Unlocks revenue per talk-hour.
5. **Rep roster with shift and role (field vs desk).** Unlocks fair idle/occupancy metrics.

**"Senior analyst" packaging inference:** the gap the large customer describes is less about new raw metrics and more about:
(a) per-number cross-rep sequencing (S1–S18, H1–H4), which is impossible in a per-rep Excel export without heavy work;
(b) exception lists (never attended, going cold, over-dialled, under-worked new leads);
(c) narrative anomaly alerts (R18, C7).
These map naturally onto a scheduled "daily analyst brief".

### Gaps
- Could not fetch Callyzer's current feature pages, help centre, or the latest (2025–2026) analytics/AI features. Their exact current report list is unconfirmed.
- No neutral benchmark data on Indian telecalling disposition adoption rates.
- DPDP Act 2023 implications for analysing employee personal-call metadata were not researched.

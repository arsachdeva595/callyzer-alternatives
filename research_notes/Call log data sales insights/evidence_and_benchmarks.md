# Evidence Base and Public Benchmarks for Sales-Calling Behaviours Measurable from Call Logs (credibility + India relevance)

> Method note: All findings come from web search results gathered in Nov 2026. Direct page fetches were blocked in this session for gong.io, cognism.com, orum.com, venturebeat.com, mortech.com (the MIT study PDF mirror), callyzer.co and businesstoday.in. Figures attributed to those sources were checked against search-result text and secondary write-ups, not the original documents. Where a number rests only on a vendor blog, it is labelled. Credibility labels: **[PRIMARY]** = original study or publisher; **[SECONDARY]** = reputable restatement; **[VENDOR-CLAIM]** = vendor content with unclear method; **[MYTH/WEAK]** = no traceable study, or traces to a tiny or ancient sample.

## 1. Speed-to-lead: what the classic and newer studies measured, and the common misquotes

### Takeaway
The speed-to-lead evidence is real but narrower than people say it is. The 2007 MIT/InsideSales study (6 companies, ~15k leads, ~100k call attempts) reported *odds of contacting* (100x) and *odds of qualifying* (21x) a lead called within 5 minutes vs 30 minutes. It did not measure close rates. HBR 2011 was a separate secret-shopper audit of 2,241 US firms, and it measured how slowly companies respond, not what speed does to conversion. Almost all of the evidence is US and B2B/web-form based, and there is no India equivalent.

### Cited Findings
- **MIT/InsideSales Lead Response Management (LRM) study [PRIMARY, presented not peer-reviewed]:** presented 16 Oct 2007 at the MarketingSherpa B2B Demand Generation Summit by InsideSales.com CEO Dave Elkington and James Oldroyd, then at MIT Sloan. Data: ~3 years, 6 companies, 15,000+ leads, 100,000+ call attempts. — [real-estate.ca summary](https://www.real-estate.ca/blog/the-lead-response-management-study); [SlideShare deck "InsideSales MIT"](https://pt.slideshare.net/slideshow/insidesales-mit/1809952); PDF mirror (could not fetch): [mortech.com mit_study.pdf](https://www.mortech.com/hs-fs/hub/25649/file-13535879-pdf/docs/mit_study.pdf)
- Exact claim: "The odds of contacting a lead if called in 5 minutes versus 30 minutes drop 100 times. The odds of qualifying a lead if called in 5 minutes versus 30 minutes drop 21 times." Each company used its own definition of a "qualified" lead. — [real-estate.ca](https://www.real-estate.ca/blog/the-lead-response-management-study); [ainora.lt analysis](https://ainora.lt/blog/lead-response-time-5-minutes-study-2026)
- **Misquote 1:** "21x more likely to *close*". The study did not examine close rates. **Misquote 2:** crediting the 100x/21x numbers to "Harvard". They come from the MIT/InsideSales study. — [ainora.lt](https://ainora.lt/blog/lead-response-time-statistics-every-study-2026)
- The same LRM dataset is the source of the classic "best day/time" claims: Thursday had the most first-call contacts (2,340) with Wednesday next (2,260), and 4–5 PM was the best hour with 8–9 AM next. 11 AM–12 PM and 1–2 PM were the worst. Write-ups disagree on the study year (2007 vs 2009) and on the second-best slot. — [natlawreview.com](https://natlawreview.com/article/best-practices-responding-to-online-leads); [peaksalesrecruiting.com](https://www.peaksalesrecruiting.com/blog/when-is-the-best-time-to-reach-prospects/)
- **HBR "The Short Life of Online Sales Leads" (Oldroyd, McElheran, Elkington, HBR March 2011) [PRIMARY]:** test web leads were submitted to 2,241 US companies and the first response timed. 37% responded within 1 hour, 24% took more than 24 hours and 23% never responded. Average first response was ~42 hours among firms that replied. — [BYU ScholarsArchive record](https://scholarsarchive.byu.edu/facpub/9711); [ainora.lt](https://ainora.lt/blog/lead-response-time-statistics-every-study-2026); [MediaPost 2011](https://www.mediapost.com/publications/article/147757/customer-leads-cant-wait-forever.html)
- The HBR piece also contained an analysis of 1.25M leads at 42 US companies. Firms that contacted leads within an hour were ~7x more likely to qualify them than those contacting an hour later, and >60x more likely than those waiting 24h+. This is widely cited but **not verified in this session**, so treat it as [SECONDARY, from memory of the article]. Confirm against HBR before publishing.
- **Drift (2017) [PRIMARY-ish, vendor secret-shopper]:** 433 B2B (mostly SaaS) companies, and only 7% responded within 5 minutes. The "47-hour average response" figure attached to it is disputed, and one analysis says the Drift report gave no average. The "2021 replication" claim is not supported. — [Drift blog (now Salesloft)](https://salesloft.com/resources/blog/lead-response-survey); [Medium write-up](https://medium.com/marketing-102/we-tested-the-response-times-of-433-sales-teams-here-are-the-results-ef2fd005072e); [ainora.lt](https://ainora.lt/blog/lead-response-time-5-minutes-study-2026)
- **Chili Piper [VENDOR]:** 80% of companies took longer than 5 minutes to respond and nearly 30% never responded. — [Chili Piper](https://chilipiper.com/article/chili-insights-vendor-response-time)
- **Velocify [VENDOR]:** a press release reports that sales-CRM users fall short on online lead response. — [PR Newswire](https://prnewswire.com/news-releases/velocify-study-reveals-sales-crm-users-fall-short-in-online-lead-response-270891471.html)
- 2025–2026 "speed-to-lead benchmark" pages (Aloware, Callingly, digitalapplied, focus-digital) mostly re-cite the same 2007/2011/2017 studies rather than publishing new primary data. — e.g. [Aloware](https://aloware.com/blog/lead-response-time-benchmarks); [Callingly](https://callingly.com/blog/state-of-speed-to-lead); [focus-digital](https://focus-digital.co/average-speed-to-lead-by-industry-and-what-every-minute-of-delay-costs/)

### Inferences
- The causal claim is weak. The LRM data is observational, so leads called fast may differ systematically (hot inbound vs aged lists), and odds ratios on contact are not revenue. The defensible message is "fast response strongly correlates with reaching and qualifying the lead", not "5 minutes = 21x sales".
- Ratios based on *odds* (100x) are easily misread as probability multipliers. Anyone republishing should show absolute contact rates by response-time bucket instead.
- Callyzer can only partly measure "speed to lead". Its fields have no lead-creation timestamp, so it cannot see web-form time. It *can* measure (a) speed of callback to a missed inbound call (inbound missed timestamp → first outbound to the same number) and (b) time from first-ever appearance of a number to first connected call. In India, missed-call callback is a strong proxy for speed-to-lead, because many leads arrive by phone (IndiaMART buyers, ad call extensions, missed-call campaigns).
- India relevance: none of the classic studies covered India. Callyzer publishing a *missed-call callback latency* benchmark by industry would be genuinely novel.

### Gaps
- Could not open the original 2007 PDF to confirm wording, statistical method or study year. Could not confirm the HBR 1.25M-lead sub-analysis numbers directly.
- No credible 2020–2026 primary study replicating the LRM with conversion outcomes was found. Newer "studies" are mostly vendor aggregations.
- No India-specific speed-to-lead study was found.

## 2. Optimal number of call attempts and follow-ups (and myth-busting)

### Takeaway
The best-sourced persistence data is the Velocify/Leads360 analysis (~3.5M leads; ~93% of converted leads were reached by the 6th attempt) and Cognism's dial data (93% of conversations happen by call 3). Both show sharp diminishing returns after 3–6 attempts. The famous "80% of sales need 5 follow-ups / 44% give up after one" stat has no traceable modern study and should be labelled a myth.

### Cited Findings
- **Velocify "Ultimate Contact Strategy" [VENDOR, large dataset]:** ~3.5M leads. ~93% of converted leads were contacted by the 6th call attempt, and leads needing more than 7 calls were reported as 45% less likely to convert. The study is dated 2012–2013 (Leads360 era), and the original is gated. — [SlideShare "The Ultimate Contact Strategy"](https://www.slideshare.net/Velocify/the-ultimate-contact-strategy); [Sales Lead Management Association summary](https://salesleadmgmtassn.com/blog_subdomain/2017/03/34-million-lead-research-the-ultimate-contact-strategy-for-inside-salespeople-white-paper-velocify.html); [natlawreview](https://natlawreview.com/article/study-reveals-best-contact-strategies-optimal-lead-conversion)
- Earlier version: the 2010 Leads360 release "Calling Leads Six Times Equals Success". — [Claims Journal 2010](https://amp.claimsjournal.com/services/newswire/2010/06/08/110351.htm)
- **Caveat:** persistence datasets usually count attempts to first live conversation, so "reached" ≠ meaningful conversation. — [ainora.lt](https://ainora.lt/blog/sales-follow-up-80-percent-5-contacts-study-2026)
- **Cognism [VENDOR, own SDR dial data "WHAM"]:** recommends 3 calls per prospect, since 93% of all conversations happened by call 3. — [Cognism Cold Calling Report 2025](https://www.cognism.com/cold-calling-report-2025) (search-result text; page not fetched)
- **[MYTH/WEAK] "80% of sales require 5 follow-ups; 44% of reps give up after one":** usually credited to the "National Sales Executive Association" or to Brevet/Marketing Donut. Traced by one analysis to a 1942 survey of fewer than 40 people (via SMEI). The 44% piece first appears in a 2009 column citing no study. Business News Daily's citation leads to a dead page. VentureBeat earlier called the stat false. — [ainora.lt](https://ainora.lt/blog/sales-follow-up-80-percent-5-contacts-study-2026); [usecarly](https://www.usecarly.com/blog/sales-follow-up-statistics/); [VentureBeat](https://venturebeat.com/marketing/these-incredible-sales-stats-everyone-cites-are-actually-completely-false); Brevet citation via [dooly.ai](https://dooly.ai/blog/sales-call-statistics) (Brevet original not verified)
- Orum's "State of Cold Calling" (based on >1B outbound dials) covers connect rates by persona and seniority, but the figures are gated. — [Orum](https://www.orum.com/reports-and-guides/the-state-of-cold-calling)

### Inferences
- From log data, Callyzer can directly compute the *empirical* attempts-to-first-connect curve per number. It can show what share of eventual connects occur by attempt 1/2/3/6 and what share of numbers are abandoned after 1 attempt. This would be the first India dataset on the "how many attempts" question, at a scale (242M calls) far above Velocify's.
- Contact ≠ conversion. Callyzer has no outcome field, so it should frame results as "attempts to first conversation", not "attempts to sale".
- India nuance: answer behaviour differs (high spam labelling, multiple SIMs, callbacks from customers). The "attempt" curve should count customer-initiated callbacks as a connect.

### Gaps
- Gong, RAIN Group and InsideSales persistence numbers were not verified in this session. The Velocify original PDF was not accessed.
- No India attempts-to-connect study was found.

## 3. Best time/day to call (global and India)

### Takeaway
"Best time" findings conflict across vendors and depend on segment, time zone and connect definition. US B2B sources cluster on late afternoon (4–5 PM, InsideSales) or mid-morning (10–11 AM, Cognism/Gong-cited), with Tue–Thu best. India data is thin and contradictory: Callyzer's own blog says 3–5 PM is best and 11–12 worst, while Caller.Digital says 11:00–13:00 is better. These are both vendor claims, and India timing should be published segmented by industry.

### Cited Findings
- InsideSales/MIT LRM: Thu/Wed best; 4–5 PM then 8–9 AM; worst 11–12 and 1–2. — [natlawreview](https://natlawreview.com/article/best-practices-responding-to-online-leads); [InsideSales](https://www.insidesales.com/best-times-scheduled-sales-calls-demos/)
- Cognism (2025 report): best time 10–11 AM and best day Tuesday. The report itself cautions readers to check their own data by region and persona. — [Cognism 2025](https://www.cognism.com/cold-calling-report-2025)
- Gong-attributed timing (10–11 AM and 4–5 PM; Tue/Wed), on a "100,000 connected calls" sample, is reported by Prospeo. Gong's original timing page was not located. [SECONDARY/VENDOR] — [Prospeo](https://prospeo.io/s/best-time-to-call-prospects)
- Salesloft: Wednesdays often yield the highest connection rates (>50M calls) [VENDOR, via secondary]. — [Prospeo](https://prospeo.io/s/best-day-to-cold-call)
- Revenue.io favours 8–11 AM in the prospect's local time, with a SaaS/B2B-only dataset. — [Revenue.io](https://www.revenue.io/blog/the-best-time-to-cold-call-prospects?no_head=1)
- **India: Callyzer's own published claim [VENDOR, own data]:** analysis of 5 crore+ telecalls across 12,000+ tracked numbers. Average connect rate 46–48%; best window weekdays 3–5 PM, with 5 PM peaking at 61.79%; 11 AM–12 PM is the lowest. The connect definition was not visible. — [Callyzer blog](https://callyzer.co/blog/the-ultimate-list-of-cold-calling-statistics-in-india/); [Callyzer best time to call India](https://callyzer.co/blog/best-time-to-call-customers-india/)
- **India: Caller.Digital [VENDOR, competitor]:** 43.8% for 11:00–13:00 IST vs 38.6% for 14:30–16:30, which is the opposite of Callyzer. — [Caller.Digital](https://caller.digital/blog/connect-rate-benchmark-outbound-calling-india-2026)
- Exotel blog: 11 AM–12 PM and 4–5 PM, avoid before 8 AM and after 8 PM. This is generic, borrowed from a CallHippo post. — [Exotel](https://exotel.com/blog/tips-to-improve-call-pickup-rates/)
- Regulatory constraint: India's TCCCPR limits promotional calls to registered telemarketers on the 140 series and restricts telemarketing from ordinary 10-digit numbers (Feb 2025 amendment). Timing data from 10-digit SIM calling therefore mostly reflects relationship/transactional/B2B calls, not regulated mass telemarketing. — [TRAI PR 11/2025](https://cms.trai.gov.in/sites/default/files/2025-02/PR_No.11of2025.pdf); [JSA analysis](https://www.jsalaw.com/wp-content/uploads/2025/02/JSA-Prism-Telecommunications_February-2025_TCCCPR-amendments.Final_.pdf)

### Inferences
- Callyzer's existing 61.79%-at-5PM claim is a credibility risk if the new 242M-call dataset shows a different pattern. Publish the method (connect definition, denominators, industry mix) and show confidence intervals or day-to-day variability.
- Hour-of-day answer rate *by industry* is the most useful version. A single national "best hour" collapses heterogeneous segments (real estate vs B2B vs collections), and a Simpson's-paradox pattern is likely: industries that call heavily at certain hours drag the aggregate.
- Hour-of-day effects confound *who* calls when. Reps may call warm leads in the evening and cold lists in the morning. Within-number or within-rep comparisons are better.

### Gaps
- No TRAI or academic India study on time-of-day answer rates was found. Exotel, Ozonetel and Knowlarity publish no answer-rate-by-hour datasets.
- Gong's original timing analysis page was not retrieved.

## 4. Call duration, cold-call success, and connect/answer-rate trends (spam labelling, Truecaller, TRAI)

### Takeaway
Duration is a weak but usable proxy. Gong's talk-ratio work is about *share* of talk on long AE calls, not duration thresholds, and "qualified call ≥60/90s" is a practitioner convention, not research. Cold-call "success rates" are not comparable across reports because definitions differ (connect vs meeting). Answer rates are under structural pressure in India: Truecaller counted ~41.7B spam calls in 2025 (36% sales/telemarketing), and 79% of surveyed businesses say customers avoid unknown business calls.

### Cited Findings
- **Gong talk-to-listen [VENDOR, large]:** the original 25,537 B2B SaaS first-AE-calls found top conversion at ~43:57 rep:prospect talk, with an average call of 43 minutes. A 2025 reanalysis of 326K calls of 10+ min found closed-won deals at 57% rep talk vs 62% for lost deals, and ~60% overall. — [Gong blog](https://www.gong.io/blog/talk-to-listen-conversion-ratio); [HubSpot summary of 25,537 calls](https://blog.hubspot.com/sales/best-sales-calls-25537-calls); [Gong best insights of 2025](https://www.gong.io/blog/the-best-sales-insights-of-2025)
- **Gong cold-call openers (July 2024, >300M cold calls) [VENDOR]:** "How have you been?" opener booked meetings at 10.01% vs a 1.5% baseline (6.6x). Permission-based openers came in at 11.18% and name-familiarity at 11.24%. These are conversation-to-meeting rates on connected calls. The research is tied to Gong's book "Cold Calling Sucks (And That's Why It Works)". — [Gong Labs openers](https://www.gong.io/resources/labs/the-best-and-worst-cold-call-openers-backed-by-data-from-300m-calls/); [Gong Labs hidden power of cold calling](https://www.gong.io/resources/labs/the-hidden-power-of-cold-calling-insights-from-300m-calls/)
- Gong-attributed connect rate of 5.4% per dial for the average rep vs 13.3% for the top quartile [SECONDARY via JustCall/Prospeo]. — [JustCall](https://justcall.io/blog/auto-dialer-benchmarks-2026.html); [Prospeo](https://prospeo.io/s/cold-calling-success)
- **Cognism [VENDOR]:** 2024 success rate of 4.82% (calls leading to a booked meeting). The 2025 report says it is "almost half" that. Third parties quote 2.3% for 2025 but define it as live conversations, which is a definitional conflict. Another quotes 2.7% for 2026. Average cold call duration was ~93 s in 2025, up from 83 s. — [Cognism 2025](https://www.cognism.com/cold-calling-report-2025); [vida.io](https://vida.io/blog/cold-call-success-rate); [Orum blog via search](https://www.orum.com/blog/how-to-improve-sales-connect-rates-in-2026)
- Orum notes that the definition of "connect rate" varies widely across dialers and reporting tools. Also see "fake connect rates" (counting voicemail or IVR as connects). — [Orum](https://www.orum.com/blog/how-to-improve-sales-connect-rates-in-2026); [TitanX newsletter](https://titanx.beehiiv.com/p/fake-connect-rates-are-a-real-problem)
- **Qualified-call duration thresholds [PRACTITIONER CONVENTION]:** 60 s is common, and some argue for 90 s (service) or 120 s (replacement) in HVAC, or 90–120 s for legal intake. CallRail's Market Insights reports answer rate, first-time caller rate, average duration and lead qualification rate, but the benchmark figures were not retrieved. One "CallRail Benchmark Report 2025 = 3+ min" claim is unverified. — [Unbounce community](https://community.unbounce.com/industry-best-practices-strategy-36/let-s-talk-callrail-1133); [Elevarus HVAC](https://elevarus.com/hvac-call-tracking-attribution-stack-paid-media/); [CallRail Market Insights, destinationCRM](https://www.destinationcrm.com/Articles/CRM-News/CRM-Across-the-Wire/CallRail-Introduces-Market-Insights-177345.aspx); [CallRail SMB benchmark PR Jan 2025](https://www.businesswire.com/news/home/20250114793850/en/CallRail-Releases-Report-Benchmarking-Marketing-Efforts-for-Small-Businesses); [owlclaw (unverified)](https://owlclaw.com/benchmarks/call-lead-benchmarks)
- **Truecaller India Insights 2025 [PRIMARY data, Truecaller-user metadata]:** ~4,168 crore (41.68B) spam calls identified in India in 2025, with 1,189 crore blocked by users and 770 crore fraudulent. Sales/telemarketing made up 36% of spam calls, financial services 18% and scams 12%. Truecaller says these are not precise measures of all spam. India ranks 5th globally, with 66% of unknown calls identified as spam. Global spam rose from 37.8B (2021) to 68B (2025). — [Business Today, Feb 2026](https://www.businesstoday.in/india/story/indians-received-over-4000-crore-spam-calls-in-2025-1189-crore-blocked-report-515765-2026-02-11); [Deccan Herald](https://www.deccanherald.com/technology/truecaller-report-india-hit-by-4168-crore-spam-calls-in-2025-3896311); [Indian Television](https://indiantelevision.com/mam/68-billion-spam-calls-recorded-globally-india-ranks-fifth-truecaller-report/)
- **Truecaller x Tata Tele Business Services, "State of Business Calling 2026" (Kantar; 500+ B2B businesses, 1,000 consumers, 17 cities; July 2026) [PRIMARY survey]:** 79% of businesses say customers actively avoid calls from unrecognised numbers, while 76% of consumers say they prefer calls. 49% would engage more if they could schedule callbacks. BFSI, IT services, e-commerce and logistics rely most on voice. — [Business Today Jul 2026](https://www.businesstoday.in/technology/news/story/79-of-indians-avoid-unknown-business-calls-creating-new-challenge-for-brands-report-541499-2026-07-08); [The Wire/PTI](https://m.thewire.in/article/ptiprnews/79-percent-indians-avoid-unknown-business-calls-reveals-truecaller-and-tata-tele-business-services-report); [CSR Journal](https://thecsrjournal.in/79-of-indians-skip-unfamiliar-business-calls-amid-rising-spam-concerns/)
- **TRAI TCCCPR Second Amendment (notified 12 Feb 2025) [PRIMARY]:** promotional calls go on the 140 series and transactional/service calls on the new 1600 series. Telemarketing from ordinary 10-digit numbers is restricted. Penalties were raised (reported as ₹2–10 lakh; verify), with possible suspension for violators, and the complaint window extended from 3 to 7 days. COAI objected, and IndiaMART challenged its application to B2B calls. — [TRAI PR 11/2025](https://cms.trai.gov.in/sites/default/files/2025-02/PR_No.11of2025.pdf); [JSA](https://www.jsalaw.com/wp-content/uploads/2025/02/JSA-Prism-Telecommunications_February-2025_TCCCPR-amendments.Final_.pdf); [India TV](https://www.indiatvnews.com/technology/news/trai-new-rules-promotional-calls-sms-to-have-standardised-identifiers-fines-increased-for-violations-2025-02-17-976560); [Outlook Business](https://www.outlookbusiness.com/corporate/telcos-disappointed-with-new-trai-rules-to-curb-spam-calls-heres-why); [S.S. Rana](https://ssrana.in/articles/trais-crackdown-on-spam-calls-and-ai-driven-telemarketing/)
- India answer-rate claims of 55–68% (D2C order confirmation via Exotel/Ozonetel) vs 27% for a cold AI-voice test come from a competitor blog [VENDOR-CLAIM]. — [Caller.Digital](https://caller.digital/blog/ai-answering-service-india-2026)

### Inferences
- Duration in India is a noisy outcome proxy. Language switching, IVR or voicemail-like behaviour (call held, "busy" messages) and short "call me later" pickups all distort it. A tiered metric (share of connected calls >30 s, >2 min, >5 min) is more robust than any single "qualified" cutoff, and Callyzer should not claim duration predicts conversion without outcome data.
- Callyzer's 46–48% connect rate is far above US cold-call connect rates of ~5%. That gap is mostly definitional (any answered call, including warm and inbound-related calls, from known 10-digit SIMs), not evidence that India calling "works better". Benchmarks should be split into first-ever-dialled vs repeat numbers.
- A 2026 dataset can test whether answer rates on *first-ever* calls to a number are lower than on repeat calls. That is a log-based proxy for the "unknown number avoidance" Truecaller/Kantar measured by survey.

### Gaps
- No public time series of Indian answer rates before and after the 2025 TCCCPR amendment was found.
- Exact Cognism 2025 success-rate % and Orum connect figures were not visible (pages gated or blocked).
- No research found that validates a 60 s/90 s threshold against actual sales outcomes.

## 5. Missed-call / inbound response benchmarks (incl. India)

### Takeaway
Missed-call data is mostly US and vendor-generated, and the famous "62% of calls go unanswered" comes from an 85-business study. India has only an Ozonetel contact-centre abandonment figure (34% in 2022, 22M calls) and survey data. There is no public benchmark for *how fast Indian businesses call back missed calls*, which is a clear white-space opportunity for Callyzer.

### Cited Findings
- "62% of calls to small businesses go unanswered" traces to a Jan 2016 study of just 85 businesses [WEAK]. A 2023 follow-up reported only 37.8% answered by a live person. — [SalesAI](https://salesai.com/blog/missed-call-statistics); [getaira](https://getaira.io/blog/missed-business-calls-statistics)
- Invoca: 44% of 70M tracked calls were classified as missed [VENDOR, via secondary]. — [JustCall missed-call stats](https://justcall.io/blog/missed-call-statistics.html)
- Ozonetel: a 22M-call platform study put contact-centre abandonment at 34% in 2022 [VENDOR, India]. A separate Ozonetel-linked study reported call-centre responsiveness improving in 2021. — [Business Standard 2021](https://business-standard.com/article/economy-policy/call-centres-response-quicker-better-this-year-as-demand-surges-study-121122000548_1.html); 34% figure via search summary of [JustCall](https://justcall.io/blog/missed-call-statistics.html) / [schedulingkit](https://schedulingkit.com/statistics/missed-call-statistics) (original Ozonetel source not verified)
- India vendor claims of 25–40% missed inbound calls (attributed to MyOperator) or ₹2–5 lakh/month lost have no primary source [VENDOR-CLAIM]. — [Caller.Digital](https://caller.digital/blog/ai-call-answering-clinics-home-services-india-2026); [CallerDesk](https://callerdesk.io/blog/what-is-ivr/)
- 49% of Indian consumers would engage more if they could schedule callbacks (Truecaller/TTBS/Kantar 2026). — [The Wire/PTI](https://m.thewire.in/article/ptiprnews/79-percent-indians-avoid-unknown-business-calls-reveals-truecaller-and-tata-tele-business-services-report)

### Inferences
- From its fields, Callyzer can compute the missed-inbound rate, the callback rate within 5 min/1 h/same day/never, and the median callback latency, by industry and hour. Because inbound callers in India are frequently leads, "the share of missed calls never called back" is a headline stat likely to attract press.
- Caveat: a missed call may be returned from another rep's phone or another channel (WhatsApp), which looks like "never called back". Match on number across all reps in the same company account.

### Gaps
- No India primary study on missed-call callback latency or on SMB missed-call rates was found.

## 6. Which aggregate-data benchmark formats got media pickup

### Takeaway
Formats that earned coverage share three traits. They have one big denominator ("300M calls", "1B dials", "4,168 crore spam calls"), one counter-intuitive or quotable number, and an annual recurring cadence with country and category cuts. Truecaller's India reports get syndicated across Indian mainstream media (Business Today, Deccan Herald, India TV, The Wire/PTI), which is the clearest template for Callyzer.

### Cited Findings
- Truecaller's annual India Insights report (Feb 2026) was covered by Business Today, Deccan Herald, India TV, ThePrint/ANI, Telangana Today and others, built around crore-scale totals plus a category split (36% sales/telemarketing). — [Business Today](https://www.businesstoday.in/amp/india/story/indians-received-over-4000-crore-spam-calls-in-2025-1189-crore-blocked-report-515765-2026-02-11); [ThePrint/ANI](https://theprint.in/ani-press-releases/indias-spam-shield-the-truecaller-community-blocked-nearly-1200-crore-unwanted-calls-in-2025/2851847); [India TV](https://www.indiatvnews.com/technology/news/truecaller-india-reported-over-4100-crore-spam-calls-in-2025-2026-02-12-1030019)
- The Truecaller x TTBS "State of Business Calling 2026" combined a Kantar survey with a headline paradox (76% prefer calls / 79% avoid unknown numbers), distributed via PTI and picked up widely. — [Telangana Today](https://telanganatoday.com/79-percent-indians-avoid-unknown-business-calls-reveals-truecaller-and-tata-tele-business-services-report); [Daily Excelsior](https://www.dailyexcelsior.com/79-percent-indians-avoid-unknown-business-calls-reveals-truecaller-and-tata-tele-business-services-report/)
- Gong Labs: a "300M calls" framing plus quotable opener stats, a recurring Labs series, and a book tie-in. These are heavily re-cited by vendor stat roundups (Prospeo, JustCall, Focus Digital), which is evidence of backlink pull. — [Gong Labs](https://www.gong.io/resources/labs/the-best-and-worst-cold-call-openers-backed-by-data-from-300m-calls/); [Prospeo](https://prospeo.io/s/best-time-to-call-prospects)
- Cognism: an annual Cold Calling Report with YoY change ("success rate almost halved"), best day/hour and attempts guidance, gated as a PDF. — [Cognism](https://www.cognism.com/cold-calling-report-2025); [PDF](https://www.cognism.com/hubfs/2025-Cold-Calling-Report-PDFs.pdf)
- Orum's "largest dataset ever assembled, >1B dials" positioning with persona/seniority cuts. — [Orum](https://www.orum.com/reports-and-guides/the-state-of-cold-calling)
- Gong's 43:57 talk ratio became a decade-long industry meme (HubSpot, tl;dv), showing that a single memorable ratio outlives the study. — [HubSpot](https://blog.hubspot.com/sales/best-sales-calls-25537-calls); [tl;dv](https://tldv.io/blog/talk-time-in-sales/)
- Callyzer already publishes "Data from 5 Crore Telecalls" stats. The 242M dataset is ~5x larger and could be framed as an annual "State of Telecalling in India". — [Callyzer](https://callyzer.co/blog/the-ultimate-list-of-cold-calling-statistics-in-india/)

### Inferences
- Stat-roundup sites (Prospeo, usecarly, ainora, JustCall) are the main backlink channel for B2B stats. A clean "methodology + citable one-liners" page with stable URLs and a downloadable CSV/PDF maximises being cited.
- Indian mainstream pickup happens via PTI/ANI press-release syndication with crore-denominated numbers and a consumer-relevant angle (spam, missed calls, "Indian businesses never call back X% of leads").
- Myth-busting pieces themselves earn links (ainora.lt and usecarly rank for "80% of sales 5 follow-ups origin"). Callyzer could pair each benchmark with "what the old US stat said vs what Indian data shows".

### Gaps
- No backlink counts or referring-domain data were gathered for these reports. Pickup is inferred from search visibility and syndication.

## 7. Proposed aggregate benchmark metrics computable from Callyzer fields (rep, number, call type, timestamp, duration) + statistical pitfalls

### Takeaway
Callyzer's fields support a richer benchmark set than connect rate, centred on responsiveness, persistence, timing and conversation depth. Each is novel for India, maps onto a classic (mostly US) claim, and can be computed with medians and per-account weighting. Key risks are customer self-selection, self-reported industry, definitional ambiguity of "connect", duplicate or shared numbers, and heavy-tailed distributions.

### Cited Findings
- Connect-rate definitions vary widely, so publish definitions explicitly. — [Orum](https://www.orum.com/blog/how-to-improve-sales-connect-rates-in-2026); [TitanX](https://titanx.beehiiv.com/p/fake-connect-rates-are-a-real-problem)
- Cognism advises segmenting by region and persona because single-dataset timing results do not generalise. — [Cognism](https://www.cognism.com/cold-calling-report-2025)
- Persistence datasets typically measure attempts to first live conversation, not to a sale. — [ainora.lt](https://ainora.lt/blog/sales-follow-up-80-percent-5-contacts-study-2026)

### Inferences (proposed metric list; all are suggestions, not findings)
Definitions assumed: *connected* = call type answered/incoming with duration > 0 (or a better threshold, e.g. ≥10 s, to exclude instant hangups or IVR); *conversation* = connected and ≥30 s; *new number* = number first seen in the account during the window (with a look-back buffer).

1. **Missed-call callback latency** (median and P75 minutes from missed/rejected inbound to first outbound to the same number, any rep in the account), by industry and hour. *India's equivalent of speed-to-lead.*
2. **Missed-call never-returned rate**: % of missed inbound numbers with no outbound attempt within 24 h / 7 days.
3. **Share of missed inbound calls returned within 5 min / 1 h**: mirrors the HBR/Drift framing, so it is directly comparable to "7% within 5 min" headlines.
4. **Missed inbound rate by hour and day**: when Indian businesses miss most calls (lunch, after 7 PM, Sundays).
5. **Attempts to first connect** for new outbound numbers: distribution, and cumulative % of eventual connects reached by attempts 1, 2, 3 and 6 (tests Velocify's "6" and Cognism's "3" on Indian data).
6. **Single-attempt abandonment rate**: % of new numbers dialled once, never connected, never retried within 7 days (counters the myth-based "44% give up").
7. **Time between attempts** (median gap between attempt 1 and 2 for unconnected numbers), and connect probability by gap bucket (same day vs next day).
8. **Answer rate by hour × weekday × industry** (heatmap), split into first-ever calls vs repeat calls to the same number (proxy for unknown-number avoidance).
9. **First-call answer rate vs follow-up answer rate**: quantifies the "trust gap" that Truecaller/Kantar measured by survey.
10. **Customer-callback share**: % of connects on numbers that previously didn't answer which come as *inbound* callbacks rather than rep redials (an India-specific behaviour).
11. **Conversation depth distribution**: share of connected calls under 30 s, 30 s–2 min, 2–5 min and over 5 min, by industry. Median connected duration, not the mean.
12. **Conversations per rep per day** (calls ≥2 min) and **talk minutes per rep per day**: median and P90 by industry, which is more meaningful than dials/day.
13. **Dial-to-conversation ratio**: dials needed per ≥2-min conversation (the India counterpart of the "5.4% connect / 1 conversation per 19 dials" stats).
14. **Calling-hours distribution vs answer-rate distribution**: % of dials placed in each team's worst-answer-rate hours (a "misallocated effort" stat that makes a quotable headline).
15. **Rep variance**: ratio of top-quartile to median rep connect rate / conversations per day within an industry (mirrors Gong's 13.3% vs 5.4%).

Statistical pitfalls to note in the methodology:
- **Selection bias:** Callyzer customers are SIM-based Indian SMB/mid-market teams that chose a call-tracking tool, so the data is not representative of all Indian business calling. Say "among teams using Callyzer".
- **Self-reported or inferred industry:** misclassification blurs industry cuts. Report n (accounts, reps, calls) per industry, and suppress cells with few accounts (e.g. <30 accounts) so a few big customers don't dominate.
- **Weighting:** call-weighted averages are dominated by high-volume accounts (collections, BPO-like). Show account-weighted medians alongside call-weighted ones.
- **Medians over means:** duration and latency are heavy-tailed (overnight callbacks, very long calls). Use the median plus P25/P75/P90 and winsorise or cap durations (e.g. >2 h as an outlier or conference).
- **Connect definition:** duration > 0 includes voicemail, IVR, "number busy" announcements and instant hangups, so apply a minimum threshold and publish sensitivity at 0 s, 10 s and 30 s.
- **Number hygiene:** normalise +91 and 0 prefixes, and exclude internal/colleague numbers, toll-free and short codes, OTP/bank IVRs and the 140/1600 series where detectable.
- **Censoring:** numbers first dialled late in the Sep–Oct window have less follow-up time, so use a fixed follow-up horizon and cohort entry cut-off (e.g. only numbers first seen before 24 Oct for a 7-day horizon).
- **Seasonality:** Sep–Oct 2026 includes Navratri/Dussehra and pre-Diwali periods, which affect answer rates and call volume, so flag festival days and don't generalise to annual figures.
- **Confounding in timing:** different reps call different lead types at different hours. Within-account fixed effects or within-number comparisons reduce this. State that results are correlational.
- **Multi-SIM/multi-device:** the same rep may appear under multiple numbers, and missed calls may be returned from a colleague's phone, so attribute at account level.
- **Privacy:** publish only aggregates with minimum cell sizes, with no number-level or rep-level data (DPDP Act 2023 context; not researched here).

### Gaps
- Exact field semantics (whether "rejected", "blocked" and "never attended" are distinct call types, and whether the account-level number mapping exists) are unknown and determine metrics 1–3 and 10.
- No guidance found on DPDP Act implications for publishing aggregated call metadata. This needs legal review.

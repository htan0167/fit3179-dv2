FIT3179 DV2 - Data provenance and download guide - 16 Oct 2026

SOURCE A - BCARR, Cultural and creative workforce, released 19 Dec 2025
Official webpage: https://www.bitre.gov.au/resource/arts/cultural-and-creative-workforce
Original report (PDF, 151 pages): https://www.bitre.gov.au/sites/default/files/documents/measuring-australias-cultural-and-creative-workforce-2008-09-to-2023-24-december2025.pdf
CSV files transcribed from reported tables, not official CSV downloads:
  workforce_trends.csv : PDF Table 1, p. 15 as numbered in report (PDF page 15; zero-based index 14)
  workforce_states.csv : PDF Table 2, p. 18 as numbered in report (PDF page 18; zero-based index 17)
Research gives interim workforce estimates. Do not confuse creative workforce and all arts/recreation industry workers.

SOURCE B - Australian Bureau of Statistics (ABS), Cultural and creative activities, 2021-22, released 21 Apr 2023
Official webpage (includes direct XLSX downloads in Data downloads section): https://www.abs.gov.au/statistics/people/people-and-communities/cultural-and-creative-activities/2021-22
Raw XLSX downloadable via this official page: 'Tables 1-7 Participation - Adults' and 'Tables 14-21 Attendance - Adults'.
Derived CSV files using ONLY the exact numeric tables shown on ABS official page (not copies of original XLSX):
  abs_cultural_activity_states.csv : Graph 2 participation by state (from ABS Tables 1/2017-18 Table 1), Graph 6 attendance by state (from ABS Tables 14/2017-18 Table 1). 8 state/territory records for two survey periods. Percentages.
  abs_cultural_activity_age_sex.csv : Graph 1, participation by sex and age; ABS Table 4. Percentages.
These datasets measure CULTURAL PARTICIPATION / ATTENDANCE, not creative-workforce employment. Do NOT merge definitions or claim causation from cross-year geographic patterns.

OPTIONAL THIRD SOURCE (NOT INCLUDED AS CSV):
Creative Australia, The Creative Economy in Australia - What Census 2021 Tells Us:
https://creative.gov.au/research/creative-economy-australia-what-census-2021-tells-us
This uses distinct creative-trident definitions and an independent ABS Census analysis; do not directly mix its national employment estimates with BCARR series as comparable figures.

NOTES:
- 2 independent DATA sources now: BCARR workforce and ABS activities.
- The CSV files in this package were prepared for Vega-Lite from numerical tables in the official publications; they are not untouched government raw downloads.
- Always cite official webpages and report/table identifiers in the submitted webpage.
- Boundary data is included as data/australian-states.topojson. Source: Natural Earth 1:50m Admin 1 states and provinces, public domain.
  https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-1-states-provinces/
  https://www.naturalearthdata.com/about/terms-of-use/
  https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_1_states_provinces.geojson
  Filtered to the 8 jurisdictions represented in the statistical tables; Jervis Bay Territory is omitted. Original Natural Earth boundaries filtered to eight jurisdictions, converted with topojson-server 3.0.1 and quantised to 100,000 steps. Shared arcs are stored in objects.australian_states; there is no arbitrary hand-drawn boundary data.
- Map projections: conicEqualArea, standard parallels -18 and -36, central meridian 134 degrees east. Tile cartogram uses schematic equal-size tiles rather than a geographic projection.
- Symbol locations are schematic jurisdiction anchors, NOT city-level job locations.
- State growth (%) = (2023-24 employment / 2008-09 employment - 1) * 100.
- State employment index = (year employment / that state's 2008-09 employment) * 100.
- Treemap percentages = state employment / published national employment * 100.
- Waterfall contributions = component 2023-24 minus component 2008-09.
- Waffle chart uses the published rounded employment share; each of 1,000 tiles encodes 0.1 percentage point.
- Sankey ribbons represent classification relationships within the same year; they are NOT observed flows, transitions or migration.
- Attendance changes are percentage-point differences, not relative percentage changes.
- State estimates sum to 591,301 in 2023-24 versus the published national 591,302; this 1-person difference is retained rather than altering source figures. Component totals differ by at most 1 person in some earlier years.
- Data/source preparation date: 16 Oct 2026. BCARR workforce release verified as the interim 19 Dec 2025 report. ABS latest-release page still points to 2021-22 at preparation.
- No classmate's webpage, chart code, copy, graphics or specific design was used in constructing this package.
- AI acknowledgement: ChatGPT assisted with data preparation, code, chart definitions, design, narrative drafting and technical checks. This is reflected in the webpage.

REVIEWED EDITION - 16 Oct 2026
- Production architecture follows the supplied Week 7-10 Studio examples: separate HTML, CSS, JS, readable .vg.json files, data.url, TopoJSON format.feature, geoshape, lookup, params/bind, layer and vconcat/interval brushing.
- The original four CSVs are retained unchanged. Chart-ready CSVs add explicit financial-year start, long-format roles, or derived quantities. They are transparent views, not new statistical observations. JSON files for waterfall steps and treemap hierarchy contain the same arithmetic and layout metadata.
- workforce_trends_for_charts.csv: original national series plus numeric start_year.
- workforce_roles_long.csv: three worker types per year, with share of the sum of components and display order.
- trident_nodes.csv / trident_links.csv: published endpoint worker counts with normalised ribbon positions.
- workforce_growth_steps.json: baseline, three component differences, and final total.
- workforce_state_latest.csv: latest state observations with schematic symbol anchors.
- workforce_state_growth.csv: latest/baseline differences and growth rates.
- workforce_state_indices.csv: employment / each state's 2008-09 employment * 100.
- workforce_state_hierarchy.json: analytic grouping of NSW/VIC and other jurisdictions; leaf values are published state counts.
- cultural_participation_tiles.csv: original state participation plus schematic cartogram row/column.
- cultural_participation_age_sex_long.csv: original participation rates unfolded; men are negative only for left-side display, and tooltips retain positive rates.
- cultural_attendance_change.csv / cultural_attendance_long.csv: original survey rates and after-before percentage-point changes.
- state_profiles_2021_22.csv: BCARR and ABS joined by state_code at common year 2021-22. Employment growth is relative to 2008-09, participation and attendance are survey rates for 2021-22. Axis positions use explicitly labelled domains [-30,60], [0,50], [0,100]. Lines connect measures, not years or people; no causal relationship is estimated.
- Source Serif 4 and Source Sans 3 are locally hosted; SIL Open Font Licenses and upstream source links are included.
- Native Vega implements Sankey, treemap and parallel coordinates. These are original permitted extensions, not claims that their complete code was shown in Studio.

CRITIQUE REVISION - 27 Oct 2026
- The four original statistical CSVs remain byte-for-byte unchanged.
- Text, chart labels, legends, controls and references are enlarged. Repeated explanatory text is shortened, retaining measure definitions and limitations.
- Waffle: 10 blocks of 100 tiles = 1,000 tiles. The highlighted count is round(published share_pct * 10). For 2023-24, 4.1% = 41 highlighted tiles. The percentage, count, selected year and accessible description update together.
- workforce_state_yearly.csv: the 128 original state-year observations joined to the existing schematic anchors and a numeric financial-year start. No new observations.
- A 2008-09 to 2023-24 year slider filters only the proportional symbol map. Its size domain stays [0,220000], and NSW/VIC labels and values update with the same year.
- Trend annotation: 528468 - 546911 = -18443; relative change = -3.3722%, displayed -3.4%. No cause is inferred from this series.
- NT annotation: 4688 to 3892, a loss of 796 workers or -16.9795%, displayed -17.0%.
- Attendance timing note follows the ABS statement that the recall period spans July 2020 to June 2022 and may be affected by COVID-19.
- References remain visible in the footer; the masthead and reading note now link directly to them. Official BCARR and ABS source pages were checked on 27 Oct 2026.

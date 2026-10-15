/*
 * FIT3179 Studio pattern:
 * 1. index.html supplies one named <div> per chart.
 * 2. Each chart has a separate readable .vg.json description.
 * 3. vegaEmbed loads that description; data.url loads the CSV or TopoJSON.
 * Vega/Vega-Lite create every chart. No other charting library is used.
 */

var chartList = [
  { id: 'chart-01', file: '01_employment_trend', title: 'Employment trend' },
  { id: 'chart-02', file: '02_workforce_waffle', title: 'Share of all employment' },
  { id: 'chart-03', file: '03_worker_composition', title: 'Worker composition' },
  { id: 'chart-04', file: '04_creative_trident_sankey', title: 'Creative trident classification', nativeVega: true },
  { id: 'chart-05', file: '05_growth_waterfall', title: 'Contributions to growth' },
  { id: 'chart-06', file: '06_employment_symbol_map', title: 'Employment symbol map' },
  { id: 'chart-07', file: '07_employment_growth_choropleth', title: 'Employment growth choropleth' },
  { id: 'chart-08', file: '08_state_trajectory_heatmap', title: 'State trajectory heatmap' },
  { id: 'chart-09', file: '09_workforce_treemap', title: 'Workforce treemap', nativeVega: true },
  { id: 'chart-10', file: '10_participation_tile_cartogram', title: 'Participation tile cartogram' },
  { id: 'chart-11', file: '11_age_sex_butterfly', title: 'Participation by age and sex' },
  { id: 'chart-12', file: '12_attendance_dumbbell', title: 'Attendance comparison' },
  { id: 'chart-13', file: '13_state_parallel_coordinates', title: 'Three lenses on each jurisdiction', nativeVega: true }
];

var loadedCharts = [];
var projectBaseURL = new URL('.', window.location.href).href;

function embedChart(chart) {
  var container = document.getElementById(chart.id);
  var specification = 'js/' + chart.file + '.vg.json';
  container.setAttribute('aria-busy', 'true');

  // This is the external-JSON vegaEmbed call used in the Studio examples.
  return vegaEmbed('#' + chart.id, specification, {
    actions: false,
    renderer: 'svg',
    defaultStyle: false,
    width: Math.floor(container.getBoundingClientRect().width),
    loader: { baseURL: projectBaseURL },
    tooltip: { theme: 'light' }
  }).then(function(result) {
    container.setAttribute('aria-busy', 'false');
    loadedCharts.push({ chart: chart, view: result.view });
    document.documentElement.dataset.chartsReady = String(loadedCharts.length);
  }).catch(function(error) {
    container.setAttribute('aria-busy', 'false');
    container.classList.add('chart-error');
    container.textContent = 'This chart could not load. Open the complete project with Live Server, or check that all files have been uploaded to GitHub Pages.';
    console.error('Chart failed:', specification, error);
  });
}

function addSpecificationLinks() {
  var list = document.getElementById('spec-list');
  chartList.forEach(function(chart) {
    var item = document.createElement('li');
    var link = document.createElement('a');
    link.href = 'js/' + chart.file + '.vg.json';
    link.textContent = chart.title;
    item.appendChild(link);
    list.appendChild(item);
  });
}

function startVisualisation() {
  addSpecificationLinks();
  chartList.forEach(embedChart);
}

// Wait for local fonts so text measurements use the intended typeface.
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(startVisualisation);
} else {
  startVisualisation();
}

// Vega-Lite's width: "container" handles responsive charts, as in Week 10.
// The three lower-level Vega charts use the equivalent View API when resized.
var resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    loadedCharts.forEach(function(item) {
      if (item.chart.nativeVega) {
        var container = document.getElementById(item.chart.id);
        item.view.width(Math.floor(container.getBoundingClientRect().width)).resize().runAsync();
      }
    });
  }, 180);
});

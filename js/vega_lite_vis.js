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
var stateMapView;
var nationalRows = [];
var jurisdictionRows = [];
var selectedWaffleYear = '2023-24';

function financialYear(start) {
  return String(start) + '–' + String(Number(start) + 1).slice(2);
}

function updateWaffleSummary(year) {
  selectedWaffleYear = year;
  var row = nationalRows.find(function(item) { return item.year === year; });
  if (!row) return;
  var share = Number(row.share_of_total_employment_pct);
  var count = Math.round(share * 10);
  var summary = document.getElementById('waffle-summary');
  summary.querySelector('strong').textContent = share.toFixed(1) + '% = ' + count + ' of 1,000 tiles';
  summary.querySelector('span').textContent = year.replace('-', '–') + ' · cultural and creative employment';
  document.getElementById('chart-02').setAttribute('aria-label', 'Waffle chart: ' + count + ' of 1,000 tiles highlighted, representing ' + share.toFixed(1) + '% in ' + year);
}

function updateMapSummary(year) {
  var label = financialYear(year);
  var slider = document.getElementById('map-year');
  document.getElementById('map-year-label').textContent = label;
  slider.setAttribute('aria-valuetext', label);
  ['NSW', 'VIC'].forEach(function(code) {
    var row = jurisdictionRows.find(function(item) { return item.state_code === code && Number(item.start_year) === Number(year); });
    if (row) document.getElementById('map-' + code.toLowerCase()).textContent = Number(row.employment).toLocaleString('en-AU');
  });
  document.getElementById('chart-06').setAttribute('aria-label', 'Proportional symbol map of cultural and creative employment by state, ' + label);
}

function waffleHeight(width) {
  return Math.max(185, Math.round(width * 22 / 58) + 78);
}

// The same published CSVs drive the chart and its accessible HTML summaries.
function loadSummaryData() {
  var loader = vega.loader({ baseURL: projectBaseURL });
  return Promise.all([
    loader.load('data/workforce_trends_for_charts.csv').then(function(text) {
      nationalRows = vega.read(text, { type: 'csv', parse: 'auto' });
      updateWaffleSummary(selectedWaffleYear);
    }),
    loader.load('data/workforce_state_yearly.csv').then(function(text) {
      jurisdictionRows = vega.read(text, { type: 'csv', parse: 'auto' });
      updateMapSummary(document.getElementById('map-year').value);
    })
  ]).catch(function(error) { console.error('Chart summary data failed:', error); });
}
var projectBaseURL = new URL('.', window.location.href).href;

function embedChart(chart) {
  var container = document.getElementById(chart.id);
  var specification = 'js/' + chart.file + '.vg.json';
  container.setAttribute('aria-busy', 'true');

  // This is the external-JSON vegaEmbed call used in the Studio examples.
  var options = {
    actions: false,
    renderer: 'svg',
    defaultStyle: false,
    width: Math.floor(container.getBoundingClientRect().width),
    loader: { baseURL: projectBaseURL },
    tooltip: { theme: 'light' }
  };
  if (chart.id === 'chart-02') options.height = waffleHeight(container.getBoundingClientRect().width);
  return vegaEmbed('#' + chart.id, specification, options).then(function(result) {
    container.setAttribute('aria-busy', 'false');
    loadedCharts.push({ chart: chart, view: result.view });
    if (chart.id === 'chart-02') {
      updateWaffleSummary(result.view.signal('waffleYear'));
      result.view.addSignalListener('waffleYear', function(name, value) { updateWaffleSummary(value); });
    }
    if (chart.id === 'chart-06') {
      stateMapView = result.view;
      document.getElementById('map-year').disabled = false;
    }
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
  loadSummaryData();
  document.getElementById('map-year').addEventListener('input', function(event) {
    var year = Number(event.target.value);
    updateMapSummary(year);
    if (stateMapView) stateMapView.signal('mapYear', year).runAsync();
  });
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
      if (item.chart.id === 'chart-02') {
        var waffleContainer = document.getElementById('chart-02');
        item.view.height(waffleHeight(waffleContainer.getBoundingClientRect().width)).resize().runAsync();
      }
      if (item.chart.nativeVega) {
        var container = document.getElementById(item.chart.id);
        item.view.width(Math.floor(container.getBoundingClientRect().width)).resize().runAsync();
      }
    });
  }, 180);
});

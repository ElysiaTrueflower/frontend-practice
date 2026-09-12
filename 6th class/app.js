const state = { data: null };
let barChart = null;
let lineChart = null;

const loadData = async () => {
  $('#status').text('加载中...').show();
  try {
    const response = await fetch('data/gate.json');
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    const data = await response.json();
    if (data.gate.length === 0) {
      $('#status').text('暂无数据').show();
      return;
    }
    state.data = data;
    $('#sub-title').text(data.title + '｜' + data.period + ' · ' + data.source);
    $('#status').hide();
    renderCards(data);
    renderBarChart(data);
    renderLineChart(data);
  } catch (error) {
    $('#status').text('加载失败：' + error.message).show();
  }
};

const renderCards = (data) => {
  const days = data.days;
  data.gate.forEach(s => {
    const total = s.data.reduce((sum, n) => sum + n, 0);
    $('#cards').append(`
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title h6">${s.name}</h3>
            <p class="card-text fs-4">${total}</p>
            <p class="card-text small text-muted">共${days.length}天累计出入</p>
          </div>
        </div>
      </div>
    `);
  });
};

const renderBarChart = (data) => {
  if (barChart === null) {
    barChart = echarts.init(document.querySelector('#bar-chart'));
  }
  barChart.setOption({
    title: { text: '各天各校门出入量', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0 },
    xAxis: { data: data.days },
    yAxis: { name: '人次' },
    series: data.gate.map(s => ({
      name: s.name,
      type: 'bar',
      data: s.data
    }))
  });
};

const renderLineChart = (data) => {
  if (lineChart !== null) {
    lineChart.destroy();
  }
  const ctx = document.querySelector('#line-chart');
  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.days,
      datasets: data.gate.map(s => ({
        label: s.name,
        data: s.data,
        borderWidth: 1
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: '出入趋势（单位：人次）' }
      }
    }
  });
};

window.addEventListener('resize', () => {
  if (barChart) barChart.resize();
});

$('#cards').on('click', '.card', function () {
  $(this).toggleClass('border-primary shadow');
});

loadData();

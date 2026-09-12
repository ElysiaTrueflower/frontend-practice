let barChart, lineChart;
let rawData;

async function loadData(){
  const resp = await fetch('data/gate.json');
  rawData = await resp.json();
  renderBar();
  renderLine(rawData.gate);
}


function renderBar(){
  barChart = echarts.init(document.querySelector('#bar-chart'));
  const option = {
    tooltip:{trigger:'axis'},
    legend:{bottom:0},
    xAxis:{data:rawData.days},
    yAxis:{name:'人次'},
    series: rawData.gate.map(s=>({name:s.name,type:'bar',data:s.data}))
  };
  barChart.setOption(option);
  barChart.on('legendselectchanged', function(params){
    const selectedName = params.name;
    const filterSeries = rawData.gate.filter(item=>item.name===selectedName);
    renderLine(filterSeries);
    $('#tip').text(`已选中：${selectedName}，折线图已过滤`);
  })
}


function renderLine(gateList){
  if(lineChart) lineChart.destroy();
  const ctx = document.querySelector('#line-chart');
  lineChart = new Chart(ctx,{
    type:'line',
    data:{
      labels:rawData.days,
      datasets: gateList.map(s=>({label:s.name,data:s.data,borderWidth:2}))
    },
    options:{responsive:true, maintainAspectRatio:false}
  })
}
loadData();
window.addEventListener('resize',()=>barChart?.resize())

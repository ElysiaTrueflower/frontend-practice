
const dataDays = ["周一","周二","周三","周四","周五"];
const dataVal = [680,712,664,695,622];


const badChart = echarts.init(document.querySelector('#bad-chart'));
badChart.setOption({
  xAxis:{type:'category',data:dataDays},
  yAxis:{type:'value',min:600}, 
  series:[{type:'bar',data:dataVal}]
});


const goodChart = echarts.init(document.querySelector('#good-chart'));
goodChart.setOption({
  xAxis:{type:'category',data:dataDays},
  yAxis:{type:'value',min:0}, 
  series:[{type:'bar',data:dataVal}]
});


window.addEventListener('resize',()=>{badChart.resize();goodChart.resize();})

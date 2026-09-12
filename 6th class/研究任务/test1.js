
async function loadParallel() {
  const start = performance.now();
  $('#status').text("并行加载中...").removeClass('alert-success alert-danger').addClass('alert-info');
  try {
    const [res1, res2] = await Promise.all([
      fetch('data/gate.json'),
      fetch('data/gate2.json')
    ]);
    const data1 = await res1.json();
    const data2 = await res2.json();
    const timeCost = (performance.now() - start).toFixed(2);
    $('#status').text(`✅并行全部完成，耗时：${timeCost} ms`).removeClass('alert-info').addClass('alert-success');
    $('#result').html(`<p>gate数据条数:${data1.gate.length}<br>gate2数据条数:${data2.gate.length}</p>`);
  }catch(err){
    $('#status').text(`并行加载失败:${err.message}`).addClass('alert-danger');
  }
}

async function loadSerial() {
  const start = performance.now();
  $('#status').text("串行加载中...").removeClass('alert-success alert-danger').addClass('alert-info');
  try {
    const res1 = await fetch('data/gate.json');
    const data1 = await res1.json();
    const res2 = await fetch('data/gate2.json');
    const data2 = await res2.json();
    const timeCost = (performance.now() - start).toFixed(2);
    $('#status').text(`✅串行全部完成，耗时：${timeCost} ms`).removeClass('alert-info').addClass('alert-success');
    $('#result').html(`<p>gate数据条数:${data1.gate.length}<br>gate2数据条数:${data2.gate.length}</p>`);
  }catch(err){
    $('#status').text(`串行加载失败:${err.message}`).addClass('alert-danger');
  }
}

$('#btnRunParallel').on('click',loadParallel);
$('#btnRunSerial').on('click',loadSerial);

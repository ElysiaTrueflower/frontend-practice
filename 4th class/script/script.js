const runList = [
  { name: "张三", gender:"男", total: 128, pace: 4.2 },
  { name: "李四", gender:"男", total: 95, pace: 8.8 },
  { name: "王五", gender:"女", total: -5, pace: 6.1 },
  { name: "赵六", gender:"女", total: 98, pace: 9.5 },
  { name: "孙七", gender:"女", total: 105, pace: 3 },
  { name: "钱八", gender:"男", total: 45, pace: 5.5 },
  { name: "周九", gender:"男", total: 200, pace: 7.2 }
];

function cleanData(list) {
    return list.filter(function (item) {
        return item.total >0 && item.pace >0;
    }).map(function (item) {
    return {
        name:item.name,
        gender:item.gender,
        total:item.total,
        pace:item.pace
    };
  });
}

function runGrade(gender, total) {
    if(gender === "男"){
        if(total>=120) return 'A';
        if(total>=90) return 'B';
        if(total>=60) return 'C';
        if(total>=30) return 'D';
        return 'F';
    }else{
        if(total>=100) return 'A';
        if(total>=80) return 'B';
        if(total>=60) return 'C';
        if(total>=40) return 'D';
        return 'F';
  }
}

function paceGrade(pace) {
    if(pace<=3) return 'A';
    if(pace<=5) return 'B';
    if(pace<=7) return 'C';
    if(pace<=9) return 'D';
    return 'F';
}

function Report(validList) {
    if(validList.length === 0){
    return "没有有效数据";
    }
    const stat = validList.reduce(function(res, item){
        res.sumTotal += item.total;
        return res;
    }, {sumTotal:0});

    const avgTotal = (stat.sumTotal / validList.length).toFixed(2);

    const lines = validList.map(function(item){
        const rg = runGrade(item.gender, item.total);
        const pg = paceGrade(item.pace);
        return `姓名：${item.name}，性别：${item.gender}，总里程：${item.total}km(${rg})，平均配速：${item.pace}min/km(${pg})`;
    });
    return lines.join('\n');
}

function getTotalFor(list){
    let sum = 0;
    for(let i = 0; i < list.length; i++){
        sum += list[i].total;
    }
    return sum;
}

function sortRunList(validList){
    const arr = [...validList];
    arr.sort(function(a,b){
        if(runGrade(a.gender,a.total) !== runGrade(b.gender,b.total)){
        return runGrade(b.gender,b.total).localeCompare(runGrade(a.gender,a.total));
        }
        return b.total - a.total;
    });
    return arr;
}

const validData = cleanData(runList);
console.log("清洗后数据：", validData);

console.time("reduce统计耗时");
const reportText = Report(validData);
console.timeEnd("reduce统计耗时");
console.log(reportText);

console.time("for循环统计耗时");
const forTotal = getTotalFor(validData);
console.timeEnd("for循环统计耗时");
console.log("for循环总里程：", forTotal);

const sortedList = sortRunList(validData);
console.log("排序结果：", sortedList);

const inputName = prompt("输入学生姓名：");
const inputGender = prompt("输入性别（男/女）：");
const inputTotal = Number(prompt("输入总里程(km)："));
const inputPace = Number(prompt("输入平均配速(min/km)："));

if(!isNaN(inputTotal) && !isNaN(inputPace)){
    runList.push({name: inputName, gender:inputGender, total: inputTotal, pace: inputPace});
    console.log("新增后", cleanData(runList));
}else{
    alert("输入数据非法");
}

try{
    document.body.innerHTML += `<pre>${reportText}</pre>`;
}catch(err){
    console.error('输出失败：', err.message);
}

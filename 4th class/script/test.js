const runList = [
  { name: "张三", gender: "男", total: 128, pace: 4.2 },
  { name: "李四", gender: "男", total: 95,  pace: 8.8 },
  { name: "王五", gender: "女", total: -5,  pace: 6.1 },
  { name: "赵六", gender: "女", total: 98,  pace: 9.5 },
  { name: "孙七", gender: "女", total: 105, pace: 3 },
  { name: "钱八", gender: "男", total: 45,  pace: 5.5 },
  { name: "周九", gender: "男", total: 200, pace: 7.2 }
];


function cleanData(list) {
    return list.filter(function (item) {
        return item.total > 0 && item.pace > 0;
    }).map(function (item) {
        return {
            name: item.name,
            gender: item.gender,
            total: item.total,
            pace: item.pace
        };
    });
}

function runGrade(gender, total) {
    if (gender === "男") {
        if (total >= 120) return 'A';
        if (total >= 90)  return 'B';
        if (total >= 60)  return 'C';
        if (total >= 30)  return 'D';
        return 'F';
    } else {
        if (total >= 100) return 'A';
        if (total >= 80)  return 'B';
        if (total >= 60)  return 'C';
        if (total >= 40)  return 'D';
        return 'F';
    }
}


function paceGrade(pace) {
    if (pace <= 3) return 'A';
    if (pace <= 5) return 'B';
    if (pace <= 7) return 'C';
    if (pace <= 9) return 'D';
    return 'F';
}

function sortRunList(validList){
    const gradeMap = {A:5, B:4, C:3, D:2, F:1};
    const arr = [...validList];
    arr.sort(function(a,b){
        const g1 = runGrade(a.gender,a.total);
        const g2 = runGrade(b.gender,b.total);
        if(g1 !== g2){
            return gradeMap[g2] - gradeMap[g1];
        }
        return b.total - a.total;
    });
    return arr;
}

function cleanName(nameStr){
    if(nameStr === null || nameStr === undefined) return "";
    return nameStr.trim().replace(/\s+/g," ");
}

function Report(validList){
    if(validList.length === 0) return "没有有效数据";
    const stat = validList.reduce(function(res, item){
        res.sumTotal += item.total;
        return res;
    }, {sumTotal: 0});
    const avgTotal = (stat.sumTotal / validList.length).toFixed(2);
    const lines = validList.map(function(item){
        const rg = runGrade(item.gender, item.total);
        const pg = paceGrade(item.pace);
        return `姓名：${item.name}｜性别：${item.gender}｜里程：${item.total}km(${rg})｜配速：${item.pace}min/km(${pg})`;
    });
    const reportStr = `====校园跑统计报告====\n总里程：${stat.sumTotal} km\n人均里程：${avgTotal} km\n${lines.join("\n")}`;
    return reportStr;
}


function getTotalFor(list){
    let sum = 0;
    for(let i = 0; i < list.length; i++){
        sum += list[i].total;
    }
    return sum;
}


const validData = cleanData(runList);
const sortedData = sortRunList(validData);


console.time("reduce统计耗时");
const reportText = Report(sortedData);
console.timeEnd("reduce统计耗时");


console.time("for循环统计耗时");
const forTotal = getTotalFor(validData);
console.timeEnd("for循环统计耗时");

console.log("清洗后数据：", validData);
console.log("排序结果：", sortedData);
console.log("for循环总里程：", forTotal);


document.getElementById("report-box").innerText = reportText;


const inputName = cleanName(prompt("输入新增学生姓名："));
const inputGender = prompt("输入性别（男/女）：");
const inputTotal = Number(prompt("输入总里程(km)："));
const inputPace = Number(prompt("输入平均配速(min/km)："));

if(inputName === "" || inputGender === ""){
    alert("已取消新增，或姓名为空");
}else if(!isNaN(inputTotal) && !isNaN(inputPace)){
    runList.push({name: inputName, gender: inputGender, total: inputTotal, pace: inputPace});
    console.log("新增后", cleanData(runList));
}else{
    alert("输入数据非法");
}

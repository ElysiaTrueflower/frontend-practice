const scores=[
    {name:'张三',score:92},
    {name:'李四',score:45},
    {name:'王五',score:77},
    {name:'赵六',score:59},
    {name:'孙七',score:88},
    {name:'周八',score:105},
    {name:'吴九',score:-3},
];

const cleanScores=(list)=> list.filter(s => s.score>=0 && s.score<=100);

const average=(list)=> {
    if(list.length===0) return 0;
    const total=list.reduce((sum,s)=>sum+s.score,0);
    return (total/list.length).toFixed(2);
}

const highest =(list)=>list.reduce((max,s)=>s.score>max.score ? s:max,list[0]);

const failed=(list)=>list.filter(s=>s.score<60).map(s=>s.name);

function lowest(list){
    return list.reduce((min,s)=>s.score<min.score ? s:min,list[0]);
}

console.log('清洗后',cleanScores(scores));
console.log('平均分',average(cleanScores(scores)));
console.log('最高分',highest(cleanScores(scores)));
console.log('不及格',failed(cleanScores(scores)));
console.log('最低分',lowest(cleanScores(scores)));

function toGrade(score){
    if(score>=90) return 'A';
    if(score>=80) return 'B';
    if(score>=70) return 'C';
    if(score>=60) return 'D';
    return 'F';
}

 function gradeCount(list){
    const result={A:0,B:0,C:0,D:0,F:0};
    for(const s of list){
        const grade=toGrade(s.score);
        result[grade]++;
    }
    return result;
}

function report(list){
    const valid=cleanScores(list);
    if(valid.length===0) return '没有有效成绩';
    const dist =gradeCount(valid);
    return `有效人数:${valid.length}人,平均分:${average(valid)},最高分:${highest(valid).score} (${highest(valid).name}),最低分:${lowest(valid).score} (${lowest(valid).name});等级分布:A:${dist.A},B:${dist.B},C:${dist.C},D:${dist.D},F:${dist.F};不及格名单:${failed(valid).join('、')||'无'}`;
}

try{
    console.log(report(scores));
}catch(err){
    console.error('报告生成失败:',err.message);
}
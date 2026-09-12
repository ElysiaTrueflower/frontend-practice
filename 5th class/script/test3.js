const tipDom = document.getElementById("tip");
function saveData(data){
    try{
        const str = JSON.stringify(data);
        localStorage.setItem("contactData",str);
        tipDom.textContent = "保存成功";
    }catch(err){
        tipDom.textContent = `保存失败：存储空间已满，localStorage单域上限约5MB`;
        console.error(err);
    }
}
function readData(){
    const raw = localStorage.getItem("contactData");
    if(raw){
        return JSON.parse(raw);
    }
    return [];
}
document.getElementById("saveBigBtn").onclick = function(){
    const bigData = [];
    for(let i=0;i<10000;i++){
        bigData.push({name:"测试名字".repeat(100),phone:"13800138000"});
    }
    saveData(bigData);
}
document.getElementById("readBtn").onclick = function(){
    const res = readData();
    tipDom.textContent = `读取成功，共${res.length}条`;
}

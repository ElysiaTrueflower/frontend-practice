let contacts = [
    {name:"张三",phone:"13800138000",note:"同学"},
    {name:"李四",phone:"13700137000",note:"社团"}
];
const listDom = document.getElementById("contactList");
function render(){
    listDom.innerHTML = "";
    contacts.forEach(function(item){
        const li = document.createElement("li");
        li.textContent = `${item.name} ${item.phone}`;
        listDom.appendChild(li);
    })
}

function exportJson(){
    const jsonStr = JSON.stringify(contacts,null,2);
    const blob = new Blob([jsonStr],{type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
document.getElementById("exportBtn").addEventListener("click",exportJson);
render();

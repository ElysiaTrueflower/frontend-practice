let contacts = [
    {name:"张三",phone:"13800138000",note:"同学"}
];
const listDom = document.getElementById("contactList");
function render(){
    listDom.innerHTML = "";
    contacts.forEach(function(item,index){
        const li = document.createElement("li");
        li.innerHTML = `${item.name} | ${item.phone} 
        <button class="del-btn" data-index="${index}">删除</button>
        <button class="edit-btn" data-index="${index}">修改</button>`;
        listDom.appendChild(li);
    })
}

listDom.addEventListener("click",function(e){
    const idx = Number(e.target.dataset.index);
    if(e.target.classList.contains("del-btn")){
        contacts.splice(idx,1);
        render();
    }
    if(e.target.classList.contains("edit-btn")){
        const newName = prompt("修改姓名",contacts[idx].name);
        if(newName){
            contacts[idx].name = newName.trim();
            render();
        }
    }
})
document.getElementById("addBtn").onclick = function(){
    contacts.push({name:"新联系人",phone:"13900139000",note:""});
    render();
}
render();

const addForm=document.querySelector('#addForm');
const nameInput=document.querySelector('#inpName');
const phoneInput=document.querySelector('#inpPhone');
const noteInput=document.querySelector('#inpNote');
const tip=document.querySelector('#tipMsg');
const contactList=document.querySelector('#contactBox');
let contacts=JSON.parse(localStorage.getItem('contacts') || '[]');

function saveData(){
    localStorage.setItem('contacts',JSON.stringify(contacts));
}

function render(){
    contactList.innerHTML='';
    if(contacts.length ===0){
        contactList.innerHTML ='<p>暂无联系人</p>';
        return;
    }
    contacts.forEach((item,index)=>{
        const div=document.createElement('div');
        div.className='contact-card';
        div.innerHTML=`
            <div><strong>姓名:</strong>${item.name}</div>
            <div><strong>电话:</strong>${item.phone}</div>
            <div><strong>备注:</strong>${item.note??"-"}</div>
            <div class="btn-group mt-2">
                <button class="btn btn-sm btn-warning edit-btn" data-index="${index}">修改</button>
                <button class="btn btn-sm btn-danger del-btn" data-index="${index}">删除</button>
            </div>
        `;
        contactList.appendChild(div);
    })
}

addForm.addEventListener('submit',function(e){
    e.preventDefault();
    const name=nameInput.value.trim();
    const phone=phoneInput.value.trim();
    const note=noteInput.value.trim();
    if(name ==='' || phone ===''){
        tip.textContent='姓名和电话不能为空！';
        return;
    }
    tip.textContent ='';
    contacts.push({name, phone, note});
    saveData();
    render();
    addForm.reset();
})

contactList.addEventListener('click',function(e){
    const index=Number(e.target.dataset.index);
    if(e.target.classList.contains('del-btn')){
        contacts.splice(index, 1);
        saveData();
        render();
    }
    if(e.target.classList.contains('edit-btn')){
        const newName =prompt("修改姓名", contacts[index].name);
        const newPhone =prompt("修改电话", contacts[index].phone);
        const newNote =prompt("修改备注", contacts[index].note);
        if(newName && newPhone){
            contacts[index].name =newName.trim();
            contacts[index].phone =newPhone.trim();
            contacts[index].note =newNote.trim();
            saveData();
            render();
        }
    }
})
render();

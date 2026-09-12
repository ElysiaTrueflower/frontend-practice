const addForm=document.querySelector('#addForm');
const nameInput=document.querySelector('#nameInput');
const phoneInput=document.querySelector('#phoneInput');
const noteInput=document.querySelector('#noteInput');
const tip=document.querySelector('#tip');
const contactList=document.querySelector('#contactList');

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
        div.className='contact-item';
        div.innerHTML=`
            <div>姓名:${item.name}</div>
            <div>电话:${item.phone}</div>
            <div>备注:${item.note}</div>
            <div class="btn-group" style="margin-top:8px">
                <button class="edit-btn" data-index="${index}">修改</button>
                <button class="del-btn" data-index="${index}">删除</button>
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

    nameInput.value ='';
    phoneInput.value ='';
    noteInput.value ='';
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

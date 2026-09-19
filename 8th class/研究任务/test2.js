const form = document.getElementById("addForm");
const nameInput = document.querySelector("#inpName");
form.addEventListener("submit", function(e){
    e.preventDefault();
    const name = nameInput.value;
})



$("#addForm").on("submit",function(e){
    e.preventDefault();
    const name = $("#inpName").val();
})


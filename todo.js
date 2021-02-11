'use strict'
const items = document.querySelector(".items__pen");
const itemsFin = document.querySelector(".items__fin");
const form = document.querySelector(".form");
const input = document.getElementById("addForm");


function addTasks(){
    //사용자가 입력한 text를 받아옴
    const text = input.value;    
    //새로운 아이템을 만듦
    const item = createItems(text);
    // 컨테이너 안에 새로운 아이템 추가 
    items.appendChild(item);
    // 인풋 초기화
    input.value = "";
    input.focus();
}

function createItems(text){
    const itemRow = document.createElement("li");
    itemRow.setAttribute("class", "item__row");

    const item = document.createElement("div");
    item.setAttribute("class", "item");

    const name = document.createElement("span");
    name.setAttribute("class", "item__name");
    name.innerHTML = text;

    const delBtn = document.createElement("button");
    delBtn.setAttribute("class", "delBtn");
    delBtn.innerHTML = `<i class="fas fa-times"></i>`;
    delBtn.addEventListener("click", ()=>{
        if(items.appendChild(itemRow)){
            items.removeChild(itemRow);
        }else{
            itemsFin.removeChild(itemRow);
        }    
    })
        
    const checkBtn = document.createElement("button");    
    checkBtn.setAttribute("class", "checkBtn");
    checkBtn.innerHTML = `<i class="fas fa-check"></i>`;
    checkBtn.addEventListener("click", ()=>{
        items.removeChild(itemRow);
        itemsFin.appendChild(itemRow);
        item.removeChild(checkBtn);
        item.appendChild(returnBtn);
    })
    
    const returnBtn = document.createElement("button");
    returnBtn.setAttribute("class", "returnBtn");
    returnBtn.innerHTML = `<i class="fas fa-caret-left"></i>`;
    returnBtn.addEventListener("click", ()=>{
        itemsFin.removeChild(itemRow);
        items.appendChild(itemRow);
        item.removeChild(returnBtn);
        item.appendChild(checkBtn);
    })
    
    item.appendChild(name);
    item.appendChild(delBtn);
    item.appendChild(checkBtn);
    itemRow.appendChild(item);
    return itemRow;
}


form.addEventListener("keydown",function(e){
    if(e.keyCode == 13){
        e.preventDefault();
        addTasks();
    }
})
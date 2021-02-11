'use strict'
const items = document.querySelector(".items__pen");
const itemsFin = document.querySelector(".items__fin");
const form = document.querySelector(".form");
const input = document.getElementById("addForm");

const TODOS = "todos";

const toDos = [];

function saveTodo(){
    localStorage.setItem(TODOS, JSON.stringify(toDos));
}

function paintTodo(text){    
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
    });        
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

    const newId = toDos.length + 1;
    itemRow.id = newId;
    const toDoObj = {
        text: text,
        id: newId
    }    

    item.appendChild(name);
    item.appendChild(delBtn);
    item.appendChild(checkBtn);
    itemRow.appendChild(item);    
    toDos.push(toDoObj);
    saveTodo();
    return itemRow;
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    const item = paintTodo(currentValue);
    items.appendChild(item);
    input.value = "";
    input.focus();
}

function loadItems(){
    const loadedTodos = localStorage.getItem(TODOS);
    if(loadedTodos !== null){
        const parsedToDos = JSON.parse(loadedTodos);
        parsedToDos.forEach(function(toDo){
            paintTodo(toDo.text);
        })
}
}

function init(){
loadItems();
form.addEventListener("submit", handleSubmit);
}

init();
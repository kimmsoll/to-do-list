'use strict'

const itemsPen = document.querySelector(".items__pen");
const itemsFin = document.querySelector(".items__fin");
const form = document.querySelector(".form");
const input = document.querySelector("#addInput");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendingTasks, finishedTasks;

function getTaskObject(text){
    return{
        id: String(Date.now()),
        text
    };
}

function savePending(text){
    pendingTasks.push(text);
}


function removeFromPending(taskId){
    pendingTasks = pendingTasks.filter((task)=>{
        return task.id !== taskId;
    })
}

function removeFromFinished(taskId){
    finishedTasks = finishedTasks.filter((task)=>{
        return task.id !== taskId;
    })
}

function addToPending(task){
    pendingTasks.push(task);
}

function addToFinished(task){
    finishedTasks.push(task);
}

function findInPending(taskId){
    return pendingTasks.find((task)=>{
        return task.id === taskId;
    })
}

function findInFinished(taskId){
    return finishedTasks.find((task)=>{
        return task.id === taskId;
    })
}

function deleteItem(event){
    const li = event.target.parentNode;
    li.parentNode.removeChild(li);
    removeFromPending(li.id);
    removeFromFinished(li.id);
    saveState();
}

function handleFinishClick(event){
    const li = event.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findInPending(li.id);
    removeFromPending(li.id);
    addToFinished(task);
    printFinished(task);
    saveState();
}

function handlebackClick(event){
    const li = event.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findInFinished(li.id);
    removeFromFinished(li.id);
    addToPending(task);
    printPending(task);
    saveState();
}

function createItems(task){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    span.innerText = task.text;
    delBtn.innerText = "✖";
    delBtn.setAttribute("class", "delBtn");
    delBtn.addEventListener("click", deleteItem);
    li.append(span, delBtn);
    li.id = task.id;
    return li;
}

function printPending(text){
    const li = createItems(text);
    const checkBtn = document.createElement("button");
    checkBtn.innerText = "✔";
    checkBtn.setAttribute("class", "checkBtn");
    checkBtn.addEventListener("click", handleFinishClick);
    li.append(checkBtn);
    itemsPen.appendChild(li);
}

function printFinished(text){
    const li = createItems(text);
    const returnBtn = document.createElement("button");
    returnBtn.innerText = "🔺";
    returnBtn.setAttribute("class", "returnBtn");
    returnBtn.addEventListener("click", handlebackClick);
    li.append(returnBtn);
    itemsFin.appendChild(li);
}

function saveState(){
    localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
    localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}

function loadState(){
    pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
    finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

function restoreState(){
    pendingTasks.forEach(function(task){
        printPending(task);
    });
    finishedTasks.forEach(function(task){
        printFinished(task);
    });
}

function handleSubmit(event){
    if(input.value === ""){
        event.preventDefault();  
        input.focus();
    } else{
        event.preventDefault();
        const taskObj = getTaskObject(input.value);
        input.value = "";
        input.focus();
        printPending(taskObj);
        savePending(taskObj);
        saveState();
    }
}

function init(){
    form.addEventListener("submit", handleSubmit);
    loadState();
    restoreState();
}

init();
'use strict'

const itemsPen = document.querySelector(".items__pen");
const itemsFin = document.querySelector(".items__fin");
const form = document.querySelector(".form");
const input = document.querySelector("#addInput");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendingTasks, finishedTasks;

// taskObj 에 id 값을 넣는다.
function getTaskObject(text){
    return{
        id: String(Date.now()),
        text
    };
}

// 가져온 taskObj 값을 pendingTasks 배열에 넣는다.
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

// event.target 을 통해 
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

// taskObj 값을 받아 delBtn 을 가진 li 로 반환한다.
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

// 가져온 taskObj 값을 createItems 에 실행시켜 li 를 생성하고, Pending 에서 갖춰야 할 checkBtn 을 생성한다.
// li 를 itemsPen 에 출력한다.
function printPending(text){
    const li = createItems(text);
    const checkBtn = document.createElement("button");
    checkBtn.innerText = "✔";
    checkBtn.setAttribute("class", "checkBtn");
    checkBtn.addEventListener("click", handleFinishClick);
    li.append(checkBtn);
    itemsPen.appendChild(li);
}

// 
function printFinished(text){
    const li = createItems(text);
    const returnBtn = document.createElement("button");
    returnBtn.innerText = "🔺";
    returnBtn.setAttribute("class", "returnBtn");
    returnBtn.addEventListener("click", handlebackClick);
    li.append(returnBtn);
    itemsFin.appendChild(li);
}

// 로컬 저장소에 pendingTasks 와 finishedTasks 배열을 PENDING, FINISHED 의 value 로 저장한다.
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

// input.value 가 없으면 submit 되지 않게 한다.
// input.value 가 있으면 taskObj 로 선언하고, printPending, savePending, saveState 한다.
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
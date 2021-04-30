'use strict'

const userForm = document.querySelector(".js-form");
const userInput = userForm.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOW = "showing";

// 로컬 저장소에 currentValue 가 USER_LS 의 value 로 저장된다.
function saveName(text){
    localStorage.setItem(USER_LS, text);
}

// submit 된 value 를 currentValue 로 printName, saveName 한다.
function handleSubmit(event){
    event.preventDefault();
    const currentValue = userInput.value;
    printName(currentValue);
    saveName(currentValue);
}

// userForm 이 보여지고 submit 시 handlesubmit()한다.
function askForName(){    
    userForm.classList.add(SHOW);    
    userForm.addEventListener("submit", handleSubmit);
}

// userForm 이 사라지고 인사말이 나타난다.
function printName(text){    
    userForm.classList.remove(SHOW);
    greeting.classList.add(SHOW);
    greeting.innerHTML = `Hello ${text}.`;
}

// currentUser 변수가 로컬 저장소에 저장된 USER_LS 값을 받는다.
// 저장된 값이 null 일 경우 askForName 을, 값이 있을 경우 printName 을 한다.
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }else{    
        printName(currentUser);
    }
}

function init(){
loadName();
}

init();
'use strict'

const userForm = document.querySelector(".js-form");
const userInput = userForm.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOW = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = userInput.value;
    printName(currentValue);
    saveName(currentValue);
}

function askForName(){    
    userForm.classList.add(SHOW);    
    userForm.addEventListener("submit", handleSubmit);
}

function printName(text){    
    userForm.classList.remove(SHOW);
    greeting.classList.add(SHOW);
    greeting.innerHTML = `Hello ${text}.`;
}

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
'use strict'

const clockCon = document.querySelector(".clockContainer");
const clock = document.querySelector(".clock");
const dateCon = document.querySelector(".dateContainer");
const today = document.querySelector(".date");

function getTime(){
    const now = new Date();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let day = now.getDay();
    const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let dayText = week[day];
    today.innerHTML = `${month < 10 ? `0${month}` : month}_${date < 10 ? `0${date}` : date}_${dayText}`;
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    clock.innerHTML = `${hour < 10 ? `0${hour}` : hour}:${minute<10 ? `0${minute}`: minute}:${second < 10 ? `0${second}` : second}`;
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();
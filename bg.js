'use strict'

const body = document.querySelector("body");

const IMG_NUM = 5;

function paintImg(imgNum){
const image = new Image();
image.src = `/image/${imgNum + 1}.jpeg`;
image.classList.add("bgImage");
body.prepend(image);
}

function generateRandom(){
    const number = Math.floor(Math.random()* IMG_NUM);
    return number;
}

function init(){
const randomNum = generateRandom();
paintImg(randomNum);
}

init();
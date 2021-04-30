'use strict'

const body = document.querySelector("body");

const IMG_NUM = 5;

// 랜덤 숫자를 받아서 랜덤 이미지를 보여준다.
function paintImg(imgNum){
const image = new Image();
image.src = `image/${imgNum + 1}.jpeg`;
image.classList.add("bgImage");
body.prepend(image);
}

// 랜덤 숫자를 생성하고 리턴한다.
function generateRandom(){
    const number = Math.floor(Math.random()* IMG_NUM);
    return number;
}

// 반환된 랜덤 숫자를 paintImg()의 인자로 넣는다.
function init(){
const randomNum = generateRandom();
paintImg(randomNum);
}

init();
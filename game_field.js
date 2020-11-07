'use strict'
const game = document.querySelector(".game");
const game__header = game.querySelector(".game__header");
const game__button = game__header.querySelector(".game__button");
const game__button__icon = game__button.querySelector(".fa-play");
const game__timer = game__header.querySelector(".game__timer");
const game__score = game__header.querySelector(".game__score");
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const pop_up = document.querySelector(".pop-up");
const pop_up_refresh = pop_up.querySelector(".pop-up__refresh");
const pop_up_icon = pop_up_refresh.querySelector(".fa-redo");
const pop_up_message = pop_up.querySelector(".pop-up__message");
const CARROT_SIZE = 80;

let clickBtn = false;
let interval;
let second = 10;
let isPlay = false;
let carrotNum = 10;

game__button.addEventListener('click', ()=>{
    if(clickBtn){
        stopGame();
    }else{
        startGame();
    }
});

function stopGame(){
    clickBtn = false;
    hiddenPlayBtn();
    clearInterval(interval);
    timeOver('replay?');
}

function startGame(){
    clickBtn = true;
    field.innerText = '';
    initGame();
    changeBtn();
    timerOperate();
    interval = setInterval(timerOperate ,1000);
    carrotCount();
    field.addEventListener('click', removeItem);
}

function removeItem(e){
    const target = e.target;
    if(target.className === 'carrot'){
        target.remove();
        carrotCount();
    }else if(target.className === 'bug'){
        timeOver('You lose!!');
        clearInterval(interval);
        hiddenPlayBtn();
    }
}

function carrotCount(){
    const carrot_Count = document.querySelectorAll('.carrot');
    game__score.innerText = carrot_Count.length;
    if(carrot_Count.length === 0){
        hiddenPlayBtn();
        clearInterval(interval);
        timeOver('You win!!');
    }
}

function changeBtn(){
    game__button__icon.classList.add('fa-stop');
    game__button__icon.classList.remove('fa-play');
}

function timerOperate(){
    second > 0 ? second-- : isPlay = true;
    if(isPlay === true){
        clearInterval(interval);
        isPlay = false;
        timeOver('You lose!');
        hiddenPlayBtn();
    }

    const minutes = Math.floor(second / 60);
    const seconds = second % 60;
    game__timer.innerText = `${minutes}:${second < 10 ? `0${second}` : second}`;
}

function timeOver(text){
    pop_up.classList.remove("pop-up__hide");
    pop_up_message.innerText = text;
    pop_up_refresh.addEventListener('click', initialization);
}

function hiddenPlayBtn(){
    game__button.classList.add('hiddenBtn');
}

function initialization(){
    second = 10;
    game__button.classList.remove('hiddenBtn');
    pop_up.classList.add('pop-up__hide');
    startGame();
}

function initGame(){
    addItem('carrot', carrotNum, '이미지/carrot.png');
    addItem('bug', carrotNum, '이미지/bug.png');
}

function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for(let i = 0; i<count; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1,x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max){
    return Math.random() * (max-min);
}


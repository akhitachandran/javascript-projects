document.addEventListener("DOMContentLoaded",()=>{

const homePage = document.getElementById("home");
const stopwatch = document.getElementById("stopwatch");
const stopwatchPage = document.getElementById("stopwatch-page");
const sStart = document.getElementById("s-start");
const sStop = document.getElementById("s-stop");
const sReset = document.getElementById("s-reset");
const timeRemaining = document.getElementById("time-left");

// const timer = document.getElementById("timer");
// const timerPage = document.getElementById("timerpage");
// const input = document.getElementById("input");
// const display = document.getElementById("display");
// const tStart = document.getElementById("t-start");
// const tPause = document.getElementById("t-pause");
// const tStop = document.getElementById("t-stop");
// const tRestart = document.getElementById("t-restart");

let startTime = 0;
let elapsedTime = 0;
let timeInterval = 0;

//stopwatch
// stopwatch.addEventListener("click",()=>{
//     homePage.classList.add("hidden");
//     stopwatchPage.classList.remove("hidden");
//     console.log("run");
// })

sStart.addEventListener("click",()=> startStopWatch());

sStop.addEventListener("click",()=>{
    clearInterval(timeInterval);
    sStart.disabled=true;
    sStop.disabled=true;
})

sReset.addEventListener("click",()=>{
    let startTime = 0;
    let elapsedTime = 0;
    let timeInterval = 0;
    sStart.disabled=false;
    timeRemaining.innerHTML = "00:00:00"; 
})

function startStopWatch(){
    sStop.disabled=false;
    sStart.disabled=true;
    startTime = Date.now();
     console.log(startTime);
     console.log(typeof(startTime));
     
    timeInterval = setInterval(()=>{
        elapsedTime = Date.now() - startTime;
        formatTime(elapsedTime);
    },100)
}

function formatTime(time){
    let ms = Math.floor((time % 1000) / 10) ;
    let s = Math.floor((time % (1000 * 60)) / 1000)
    let min = Math.floor((time % (1000 * 60 * 60)) /(1000 * 60));
    //let hr =  Math.floor(time / (1000 * 60 * 60));
    if(ms == 0){
        timeRemaining.innerHTML = `${min}m :${s}s :0${ms}`;
    }else{
        timeRemaining.innerHTML = `${min}m :${s}s :${ms}`;
    }
}

//timer
timer.addEventListener("click",()=>{
    homePage.classList.add("hidden");
    timerPage.classList.remove("hidden");
    console.log("run");
})

})
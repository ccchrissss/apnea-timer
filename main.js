// let startingMinutes = 0;
// let startingSeconds = 0;
let minutes = 0;
let seconds = 0;
// let time = (startingMinutes * 60) + startingSeconds;
const startTimerButton = document.getElementById('startTimer');
const stopTimerButton = document.getElementById('stopTimer')
const clearTimerButton = document.getElementById('clearTimer')
const resetTimerButton = document.getElementById('resetTimer')

const countdownEl = document.getElementById('countdown');
const audio = new Audio("https://www.soundjay.com/buttons/sounds/beep-03.mp3");
let time


setTime = () => {
    time = (minutes * 60) + +seconds
    console.log('time: ', time)
    countdownEl.innerHTML = `${minutes}:${seconds.length > 1 ? seconds : `0${seconds}`}`;
};


// console.log(startingMinutes, startingSeconds, 'before');

const setMinutes = () => {
    minutes = document.getElementById('minutesInput').value;

    if (!minutes) minutes = 0

    setTime();
};

const setSeconds = () => {
    seconds = document.getElementById('secondsInput').value;

    if (!seconds) seconds = 0

    setTime();
};


// test if the audio file works
// audio.play();

let timerId;

const count = () => {
    // console.log('count function')
    timerId = setInterval(updateCountdown, 1000)
    console.log('timerId', timerId)
};

const stopCount = () => {
    clearInterval(timerId);
    // release our intervalID from the variable
    timerId = null;
}

const clearTimer = () => {
    stopCount

    // countdownEl.innerHTML = '0:00'
    minutes = 0
    seconds = 0

    setTime()
}

const resetTimer = () => {
    // let seconds = document.getElementById('secondsInput').value
    // let minutes = document.getElementById('minutesInput').value

    // if (!seconds) seconds = 0
    // if (!minutes) minutes = 0

    setMinutes()
    setSeconds()
}

startTimerButton.addEventListener('click', count);
stopTimerButton.addEventListener('click', stopCount)
clearTimerButton.addEventListener('click', clearTimer)
resetTimerButton.addEventListener('click', resetTimer)

function updateCountdown() {

    // console.log('counting')
    // console.log('time: ', time)
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    console.log(`minutes: ${minutes}  |  seconds: ${seconds}`)

    // add a zero to seconds when it is less than 10
    if (seconds < 10) {
        seconds = `0${seconds}`
    };
    // console.log(`${minutes}:${seconds}`)

    countdownEl.innerHTML = `${minutes}:${seconds}`;
    if (time > 0) {
        time--
        // console.log(time);
    } else {
        console.log('clearing interval', timerId)
        clearInterval(timerId)
    };

    // console.log(seconds);
    
    if (minutes === 0 && seconds === 15) {
        audio.play();
        console.log('audio le play 15');
    // had to change teh boolean below to seconds === `0${1}` instead of seconds === 1 bc
    // of the 'if < 10 add a zero to seconds' statement
    } else if (minutes === 0 && seconds === `0${1}`) {
        audio.play();
        console.log('audio le play 1');
    } else {
        audio.pause();
        // console.log('audio le pause monsieur');
    };
}



// countdownEl.addEventListener("click", updateCountdown);


// audio is not working because browsers block domain from autoplaying sound before user interacts with it
// figure out how to make timer function start on button click. then audio will work.
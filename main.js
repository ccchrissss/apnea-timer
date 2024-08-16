// let startingMinutes = 0;
// let startingSeconds = 0;
let minutes = 0;
let seconds = 0;
let time = 0

const setMinutesBtn = document.getElementById('set-minutes')
const setSecondsBtn = document.getElementById('set-seconds')

const startTimerBtn = document.getElementById('start-timer');
const stopTimerBtn = document.getElementById('stop-timer')
const clearTimerBtn = document.getElementById('clear-timer')
const resetTimerBtn = document.getElementById('reset-timer')
const set10Min10SecBtn = document.getElementById('set-10-min-10-sec')
const set1MinBtn = document.getElementById('set-1-min')
const set20SecBtn = document.getElementById('set-20-sec')


const countdownEl = document.getElementById('countdown');
const singleBeep = new Audio('./beep-07a.mp3');
const tripleBeep = new Audio('./triple-beep-07a.mp3')


setTime = () => {
    time = (minutes * 60) + +seconds
    console.log('time: ', time)

    // seconds must be converted to a string to read its length property.
    countdownEl.innerHTML = `${minutes}:${seconds.toString().length > 1 ? seconds : `0${seconds}`}`;
};


// console.log(startingMinutes, startingSeconds, 'before');

const setMinutes = () => {
    minutes = document.getElementById('minutes-input').value;

    if (!minutes) minutes = 0

    setTime();
};

const setSeconds = () => {
    seconds = document.getElementById('seconds-input').value;

    if (!seconds) seconds = 0

    setTime();
};

setMinutesBtn.addEventListener('click', setMinutes)
setSecondsBtn.addEventListener('click', setSeconds)


const set10Min10Sec = () => {
    // minutes = 10
    // seconds = 10

    document.getElementById('minutes-input').value = 10
    document.getElementById('seconds-input').value = 10

    setMinutes()
    setSeconds()
}

const set1Min = () => {
    // minutes = 1
    // seconds = 0

    document.getElementById('minutes-input').value = 1
    document.getElementById('seconds-input').value = 0

    setMinutes()
    setSeconds()
}

const set20Sec = () => {
    // minutes = 0
    // seconds = 20

    document.getElementById('minutes-input').value = 0
    document.getElementById('seconds-input').value = 20

    setMinutes()
    setSeconds()
}

set10Min10SecBtn.addEventListener('click', set10Min10Sec)
set1MinBtn.addEventListener('click', set1Min)
set20SecBtn.addEventListener('click', set20Sec)


// test if the audio file works
// audio.play();

let timerId;

const startCount = () => {
    console.log('startTimerBtn clicked, startCount function executed')
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

startTimerBtn.addEventListener('click', startCount);
stopTimerBtn.addEventListener('click', stopCount)
clearTimerBtn.addEventListener('click', clearTimer)
resetTimerBtn.addEventListener('click', resetTimer)



function updateCountdown() {

    console.log('updateCountdown')

    if (time > 0) {
        time--
        // console.log(time);
    } else {
        console.log('timer has ended. clearing interval', timerId)
        clearInterval(timerId)
    };

    // console.log('counting')
    // console.log('time: ', time)
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    // console.log(`minutes: ${minutes}  |  seconds: ${seconds}`)

    // add a zero to seconds when it is less than 10
    if (seconds < 10) {
        seconds = `0${seconds}`
    };
    // console.log(`${minutes}:${seconds}`)

    // countdownEl.innerHTML = `${minutes}:${seconds}`;

    countdownEl.innerHTML = `${minutes}:${seconds}`
    console.log(countdownEl.innerHTML)

    // console.log(seconds);
    
    if (minutes === 0 && seconds === 15) {
        singleBeep.play();
        console.log('singleBeep le play 15');
    // had to change teh boolean below to seconds === `0${1}` instead of seconds === 1 bc
    // of the 'if < 10 add a zero to seconds' statement
    } else if (minutes === 0 && seconds === `0${1}`) {
        setTimeout( () => {
            tripleBeep.play();

            console.log('tripleBeep le play 1');
        }, 1000)

    } else {
        singleBeep.pause();
        tripleBeep.pause()
        // console.log('audio le pause monsieur');
    };
}



// countdownEl.addEventListener("click", updateCountdown);


// audio is not working because browsers block domain from autoplaying sound before user interacts with it
// figure out how to make timer function start on button click. then audio will work.
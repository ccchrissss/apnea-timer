// let startingMinutes = 0;
// let startingSeconds = 0;
let minutes = 0;
let seconds = 0;
// let time = (startingMinutes * 60) + startingSeconds;
let startTimeButton = document.getElementById('startTimer');
let stopTimeButton = document.getElementById('stopTimer')
let countdownEl = document.getElementById('countdown');


setTime = () => {
    time = (minutes * 60) + seconds
    countdownEl.innerHTML = `${minutes} : ${seconds.length > 1 ? seconds : `0${seconds}`}`;
};

let audio = new Audio("https://www.soundjay.com/buttons/sounds/beep-03.mp3");

// console.log(startingMinutes, startingSeconds, 'before');

function setMinutes() {
    minutes = document.getElementById("minutesInput").value;

    setTime();
};

function setSeconds() {
    seconds = document.getElementById("secondsInput").value;

    setTime();
};

// returnMinutes();
// returnSeconds();
// console.log(startingMinutes, startingSeconds, 'after');


// test if the audio file works
// audio.play();

let timerID;

const count = () => {
    // console.log('count function')
    timerID = setInterval(updateCountdown, 1000)
    console.log('!!!timerid', timerID)
};

const stopCount = () => {
    clearInterval(timerID);
    // release our intervalID from the variable
    timerID = null;
  }

startTimeButton.addEventListener('click', count);

stopTimeButton.addEventListener('click', stopCount )

function updateCountdown() {
    // // 
    // let startingMinutes = 0;
    // let startingSeconds = 0;
    // let time = (startingMinutes * 60) + startingSeconds;
    // // 

    console.log('counting')

    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    // // 
    // function returnMinutes(){
    //     let startingMinutes = document.getElementById("minutesInput").value;
    //     return startingMinutes;
    // }
    
    // function returnSeconds(){
    //     let startingSeconds = document.getElementById("secondsInput").value;
    //     return startingSeconds;
    // }
    // //

    // add a zero to seconds when it is less than 10
    if (seconds < 10) {
        seconds = `0${seconds}`
    };

    countdownEl.innerHTML = `${minutes} : ${seconds}`;
    if (time > 0) {
        time--
        // console.log(time);
    } else {
        console.log('clearing interval', timerID)
        clearInterval(timerID)
    };

    // if (time < 1) {
    //     audio.play()
    // };

    // {for (i = 1; i > 0; i--) {
    //     audio.play();
    //    console.log(i, 'this is i');
    // };}

    console.log(seconds);
    
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
// Variables
let minutes = 0;
let seconds = 0;
let totalSeconds = 0;
let TimerId; // needed in order to cancel the timer (aka cancel the setInterval)
let timerIsRunning = false; // tracks wether timer is running so we don't try to start two at once
let timeToBeepAt = 15; // could let user set this from input. Could also create an array and beep at multiple points
let timeToBeepAt2 = 1;
let audio = new Audio("https://www.soundjay.com/buttons/sounds/beep-03.mp3");

// DOM elements
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const setButton = document.getElementById('setButton');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Function that plays sound
const beep = () => {
    // replace with code that plays beep
    audio.play();
    console.log('BEEP')
}

// Sets Timer in DOM based on value passed in
const setTimer = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  timerElement.innerHTML = `${min}:${sec > 9 ? sec : `0${sec}`}`; // sec is a number so we use "sec > 9" instead of "sec.length > 1" which would work for a string
};

// Helper function which prevents users from typing in invalid values for min and sec
// Changes the values in both the DOM and in the variables in this file
const verifyInputs = () => {
    if (minutes < 0) {
        minutes = 0
        minutesElement.value = 0;
    }
    if (seconds < 0) {
        seconds = 0
        secondsElement.value = 0;
    }
    if (seconds > 59) {
        seconds = 59
        secondsElement.value = 59;
    }
}

// Runs when Set button is clicked
// Might want to remove this button and just do this logic when the Start button is clicked
const onSetTime = () => {
  if (timerIsRunning) { //this basically disables the Set button when the timer is running
    return;
  }
  minutes = parseInt(minutesElement.value || 0); // Need the || 0 in order to prevent "NaN" when input is empty
  seconds = parseInt(secondsElement.value || 0);
  verifyInputs();
  totalSeconds = 60 * minutes + seconds; // will do string concatenation without parseInt above
  setTimer(totalSeconds);
};

// Runs when start/cancel button is clicked
const onStartTimer = () => {
    // If the timer is running, cancel the timer, reset the timer in the DOM and change button back to say "Start"
  if (timerIsRunning) {
    clearInterval(timerId);
    startButton.innerHTML = 'Start';
    setTimer(0);
    totalSeconds = 0;
    timerIsRunning = false;
  } else {
    if (totalSeconds == 0) {
        return // prevents counting down from 0
    }
    // If timer is not running, start it and change button to say "Cancel"
    timerIsRunning = true;
    startButton.innerHTML = 'Cancel';
    // "tick" function is what runs each second - it decrements the total seconds and updates DOM timer. 
    const tick = () => {
      totalSeconds--;
      setTimer(totalSeconds);
      // Checks to see if it should beep
      if (totalSeconds % 60 == 1 || totalSeconds == timeToBeepAt || totalSeconds == timeToBeepAt2) {
        beep();
      }
      // Once it hits 0 it cancels timer and changes button text
      if (totalSeconds == 0) {
        startButton.innerHTML = 'Start';
        clearInterval(timerId);
        timerIsRunning = false;
      }
    };
    // This runs the tick function every second and also sets the timerId
    timerId = setInterval(tick, 1000);
  }
};
// Elements

const startTimer = document.querySelector("#start-timer");
const timeInputsDiv = document.querySelector(".time-inputs");
const minTimeInput = document.querySelector("#min-time-input");
const maxTimeInput = document.querySelector("#max-time-input");
const testButton = document.querySelector(".test");
const beepVolumeInput = document.querySelector("#volume");
const beepAlert = new Audio("./audio/beep.mp3");

let timeout1;
let timeout2;
let intervalId;
let randomTime;

// Functions

function getRandomMinutes() {
  const min = minTimeInput.value * 60000;
  const max = maxTimeInput.value * 60000;
  const randomNumberOfMinutes = Math.floor(Math.random() * (max - min) + min);
  return randomNumberOfMinutes;
}

function getRandomSeconds() {
  const min = minTimeInput.value * 1000;
  const max = maxTimeInput.value * 1000;
  const randomNumberOfSeconds = Math.floor(Math.random() * (max - min) + min);
  return randomNumberOfSeconds;
}

function addTimeout() {
  timeout1 = setTimeout(() => {
    clearInterval(intervalId);
    beepAlert.play();
    timeout2 = setTimeout(() => {
      beepAlert.play();
      randomTime = getRandomMinutes();
      intervalId = setInterval(addTimeout, randomTime);
    }, 10000);
  }, 250);
}

// Events

startTimer.addEventListener("click", () => {
  if (startTimer.innerText === "Start Timer") {
    beepAlert.volume = beepVolumeInput.value / 100;
    startTimer.innerText = "Cancel Timer";
    randomTime = getRandomMinutes();
    intervalId = setInterval(addTimeout, randomTime);
    timeInputsDiv.classList.toggle("hidden");
  } else {
    startTimer.innerText = "Start Timer";
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    clearInterval(intervalId);
    timeInputsDiv.classList.toggle("hidden");
  }
});

// Elements

const startTimer = document.querySelector("#start-timer");
const timeInputsDiv = document.querySelector(".time-inputs");
const minTimeInput = document.querySelector("#min-time-input");
const maxTimeInput = document.querySelector("#max-time-input");
const testButton = document.querySelector(".test");
const beepVolumeInput = document.querySelector("#volume");
const beepAlert = new Audio("./audio/beep.mp3");

let firstTimeout;
let secondTimeout;
let intervalId;
let randomTime;

// LocalStorage


const minTimeKey = "MinTime";
const maxTimeKey = "MaxTime";

minTimeInput.value = getValueFromLocalStorage(minTimeKey);
maxTimeInput.value = getValueFromLocalStorage(maxTimeKey);

if (minTimeInput.value === "") minTimeInput.value = 2;
if (maxTimeInput.value === "") maxTimeInput.value = 3;


minTimeInput.addEventListener("change", (e) => {
  saveValueToLocalStorage(minTimeKey, e.target.value);
});

maxTimeInput.addEventListener("change", (e) => {
  saveValueToLocalStorage(maxTimeKey, e.target.value);
});

// Functions

function getRandomMinutes() {
  const min = minTimeInput.value * 60000;
  const max = maxTimeInput.value * 60000;
  const randomNumberOfMinutes = Math.floor(Math.random() * (max - min) + min);
  return randomNumberOfMinutes;
}

function saveValueToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getValueFromLocalStorage(key) {
  return localStorage.getItem(key);
}

// function getRandomSeconds() {
//   const min = minTimeInput.value * 1000;
//   const max = maxTimeInput.value * 1000;
//   const randomNumberOfSeconds = Math.floor(Math.random() * (max - min) + min);
//   return randomNumberOfSeconds;
// }

function addTimeout() {
  firstTimeout = setTimeout(() => {
    clearInterval(intervalId);
    beepAlert.play();
    secondTimeout = setTimeout(() => {
      beepAlert.play();
      randomTime = getRandomMinutes();
      intervalId = setInterval(addTimeout, randomTime);
    }, 13000);
  }, 250);
}

// Events

startTimer.addEventListener("click", () => {
  if (startTimer.innerText === "Start Timer") {
    beepAlert.volume = beepVolumeInput.value / 100;
    startTimer.innerText = "Cancel Timer";
    randomTime = getRandomMinutes();
    console.log(randomTime);
    intervalId = setInterval(addTimeout, randomTime);
    timeInputsDiv.classList.toggle("hidden");
  } else {
    startTimer.innerText = "Start Timer";
    clearTimeout(firstTimeout);
    clearTimeout(secondTimeout);
    clearInterval(intervalId);
    timeInputsDiv.classList.toggle("hidden");
  }
});

// Elements

const startTimer = document.querySelector("#start-timer");
const timeInputsDiv = document.querySelector(".time-inputs");
const minTimeInput = document.querySelector("#min-time-input");
const maxTimeInput = document.querySelector("#max-time-input");
const testButton = document.querySelector(".test");
const resetButton = document.querySelector(".reset-button");

let firstTimeout;
let secondTimeout;
let intervalId;
let randomTime;

// Alert
const VOLUME_KEY = "RANDOM_TIMER_VOLUME";
const alertInput = document.querySelector("#volume");
const alertSound = new Audio("./audio/beep.mp3");
const alertVolume = getValueFromLocalStorage(VOLUME_KEY);

alertInput.value = alertVolume;

if (alertVolume === null) {
  alertSound.volume = 0.5;
} else {
  alertSound.volume = alertVolume / 100;
}

alertInput.addEventListener("change", (e) => {
  saveValueToLocalStorage(VOLUME_KEY, e.target.value);
  alertSound.volume = getValueFromLocalStorage(VOLUME_KEY) / 100;
});

// MinTime and MaxTime LocalStorage

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

function saveValueToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getValueFromLocalStorage(key) {
  return localStorage.getItem(key);
}

function resetToDefaultValues() {
  saveValueToLocalStorage(VOLUME_KEY, 50);
  saveValueToLocalStorage(minTimeKey, 2);
  saveValueToLocalStorage(maxTimeKey, 3);
  alertInput.value = 50;
  alertSound.volume = 0.5;
  minTimeInput.value = 2;
  maxTimeInput.value = 3;
}

function getRandomMinutes() {
  const min = minTimeInput.value * 60000;
  const max = maxTimeInput.value * 60000;
  const randomNumberOfMinutes = Math.floor(Math.random() * (max - min) + min);
  return randomNumberOfMinutes;
}

function addTimeout() {
  firstTimeout = setTimeout(() => {
    clearInterval(intervalId);
    alertSound.play();
    secondTimeout = setTimeout(() => {
      alertSound.play();
      randomTime = getRandomMinutes();
      intervalId = setInterval(addTimeout, randomTime);
    }, 13000);
  }, 250);
}

// Events

startTimer.addEventListener("click", () => {
  if (minTimeInput.value == false) {
    alert("Please type min time value");
    return;
  }

  if (maxTimeInput.value == false) {
    alert("Please type max time value");
    return;
  }

  if (startTimer.innerText === "Start Timer") {
    startTimer.innerText = "Cancel Timer";
    resetButton.style.display = "none";
    randomTime = getRandomMinutes();
    intervalId = setInterval(addTimeout, randomTime);
    timeInputsDiv.classList.toggle("hidden");
  } else {
    startTimer.innerText = "Start Timer";
    resetButton.style.display = "block";
    clearTimeout(firstTimeout);
    clearTimeout(secondTimeout);
    clearInterval(intervalId);
    timeInputsDiv.classList.toggle("hidden");
  }
});

resetButton.addEventListener("click", resetToDefaultValues)

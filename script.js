// Elements

const startTimer = document.querySelector("#start-timer");
const timeInputsDiv = document.querySelector(".time-inputs");
const minTimeInput = document.querySelector("#min-time-input");
const maxTimeInput = document.querySelector("#max-time-input");
const testButton = document.querySelector(".test");

let timeout1;
let timeout2;
let intervalId;

let randomTime;

let date = Date();

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

// Events

startTimer.addEventListener("click", () => {
  if (startTimer.innerText === "Start Timer") {
    startTimer.innerText = "Cancel Timer";
    randomTime = getRandomMinutes();

    intervalId = setInterval(addTimeout, randomTime);
    // timeInputsDiv.classList.toggle("hidden");
  } else {
    startTimer.innerText = "Start Timer";
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    clearInterval(intervalId);
    // timeInputsDiv.classList.toggle("hidden");
  }
});

// Functions

function addTimeout() {
  timeout1 = setTimeout(() => {
    clearInterval(intervalId);
    console.log("Pierwszy timeout");
    timeout2 = setTimeout(() => {
      console.log("Drugi timeout");
      randomTime = getRandomMinutes();
      intervalId = setInterval(addTimeout, randomTime);
      console.log(date);
    }, 10000);
  }, 250);
}

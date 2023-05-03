// Elements

const startTimer = document.querySelector("#start-timer");
const timeInputsDiv = document.querySelector(".time-inputs");
const minTimeInput = document.querySelector("#min-time-input");
const maxTimeInput = document.querySelector("#max-time-input");
const testButton = document.querySelector(".test");

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
  const randomNumberOfMinutes = Math.floor(Math.random() * (max - min) + min);
  return randomNumberOfMinutes;
}

// Events

startTimer.addEventListener("click", () => {
  if (startTimer.innerText === "Start Timer") {
    startTimer.innerText = "Cancel Timer";
    // timeInputsDiv.classList.toggle("hidden");
  } else {
    startTimer.innerText = "Start Timer";
    // timeInputsDiv.classList.toggle("hidden");
  }
});

// Functions

function repeatedTimeOut() {
  setTimeout(addTimeout, tenSeconds);
}

function addTimeout() {
  setTimeout(() => {
    console.log("Pierwszy timeout");
    setTimeout(() => {
      console.log("Drugi timeout");
      repeatedTimeOut();
    }, 10000);
  }, 250);
}

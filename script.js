// Elements

const startTimer = document.querySelector("#start-timer");
const minTimeInput = document.querySelector("#min-time-input");
const maxTimeInput = document.querySelector("#max-time-input");



// Functions

// Events

startTimer.addEventListener("click", () => {
  
    switch(startTimer.innerText) {
        case 'Start Timer':
            startTimer.innerText = "Cancel Timer"
            break;
        case 'Cancel Timer':
            startTimer.innerText = "Start Timer"
            break;
    }
});

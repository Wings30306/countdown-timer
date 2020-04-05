let countdown;
const timerDisplay = document.querySelector(".display__time-left")
const timerEndDisplay = document.querySelector(".display__end-time")
const buttons = document.querySelectorAll("[data-time")
const custom = document.querySelector("#custom")

function getTimezone() {
    const timezone = parseInt(new Date().toTimeString().slice(12, 17))/100
    return timezone
}

function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown)

    const now = Date.now();
    const then = now + seconds * 1000
    displayTimeLeft(seconds)

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        // check if time has run out
        if(secondsLeft < 0) {
            clearInterval(countdown)
            return
        }
        // display it
        displayTimeLeft(secondsLeft)
        displayTimerEnd(now, seconds)
    }, 1000)
}

function timeString(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    const timeString = `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(remainingSeconds)}`
    return timeString
}

function twoDigits(x) {
    if (x < 10) {
        return "0" + x
    } else {
        return x
    }
} 

function displayTimeLeft(seconds) {
    timerDisplay.textContent = timeString(seconds)
    document.title = timeString(seconds)
}

function displayTimerEnd(now, seconds) {
    const timerEnd = (now + seconds * 1000) % (3600 * 24 * 1000)
    const timerEndSeconds = timerEnd/1000 + (getTimezone() * 3600)
    timerEndDisplay.textContent = "BE BACK AT " + timeString(timerEndSeconds)
}

function getSeconds() {
    seconds = this.dataset.time
    timer(seconds)
} 


buttons.forEach(button => button.addEventListener("click", getSeconds))
document.customForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const minutes = this.minutes.value
    const seconds = minutes * 60
    this.reset()
    timer(seconds)
})

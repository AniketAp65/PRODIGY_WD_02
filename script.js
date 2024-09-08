let startTime,
  updatedTime,
  difference,
  tInterval,
  running = false,
  lapCount = 0;
const display = document.getElementById("display");
const lapList = document.getElementById("lapList");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");

function startTimer() {
  if (!running) {
    running = true;
    startTime = new Date().getTime();
    tInterval = setInterval(updateDisplay, 1);
  }
}

function stopTimer() {
  if (running) {
    running = false;
    clearInterval(tInterval);
  }
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  display.innerHTML = "00:00:00:000";
  lapList.innerHTML = "";
  lapCount = 0;
}

function recordLap() {
  if (running) {
    const lapTime = display.innerHTML;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${++lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
  }
}

function updateDisplay() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((difference % 1000) / 10); // Get milliseconds and divide by 10 for 2 decimal places

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

  display.innerHTML = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap); // Add event listener for the Lap button

let startTime = 0;
let elapsedTime = 0;
let interval = null;
let running = false;

const display = document.getElementById('display');
const laps = document.getElementById('laps');
const toggleBtn = document.getElementById('toggleBtn');

function timeFormat(ms) {
  const date = new Date(ms);
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const sec = String(date.getUTCSeconds()).padStart(2, '0');
  const ms10 = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  return `${min}:${sec}:${ms10}`;
}

function updateTime() {
  const now = Date.now();
  const diff = now - startTime + elapsedTime;
  display.textContent = timeFormat(diff);
}

toggleBtn.addEventListener('click', () => {
  if (!running) {
    // Start
    startTime = Date.now();
    interval = setInterval(updateTime, 10);
    running = true;
    toggleBtn.textContent = 'Pause';
  } else {
    // Pause
    clearInterval(interval);
    elapsedTime += Date.now() - startTime;
    running = false;
    toggleBtn.textContent = 'Start';
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(interval);
  startTime = 0;
  elapsedTime = 0;
  running = false;
  display.textContent = '00:00:00';
  laps.innerHTML = '';
  toggleBtn.textContent = 'Start'; // Reset toggle text
});

document.getElementById('lapBtn').addEventListener('click', () => {
  if (running) {
    const lapItem = document.createElement('li');
    const now = Date.now() - startTime + elapsedTime;
    lapItem.textContent = timeFormat(now);
    laps.appendChild(lapItem);
  }
});

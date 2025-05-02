const grid = document.querySelector('.grid');
const frog = document.querySelector('.frog');
const startPauseBtn = document.getElementById('start-pause');
const timerDisplay = document.getElementById('timer');
const overlay = document.getElementById('game-overlay');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');

let cars = [];
let logs = [];
let gameInterval;
let countdown;
let timeLeft = 30;
let isGameRunning = false;

const step = 40;
let frogX = 185;
let frogY = 370;

const resetFrog = () => {
  frogX = 185;
  frogY = 370;
  frog.style.left = `${frogX}px`;
  frog.style.top = `${frogY}px`;
};

const moveFrog = (e) => {
  if (!isGameRunning) return;
  if (e.key === 'ArrowUp' && frogY > 0) frogY -= step;
  if (e.key === 'ArrowDown' && frogY < 370) frogY += step;
  if (e.key === 'ArrowLeft' && frogX > 0) frogX -= step;
  if (e.key === 'ArrowRight' && frogX < 370) frogX += step;

  frog.style.left = `${frogX}px`;
  frog.style.top = `${frogY}px`;
};

const createCarsAndLogs = () => {
  cars.forEach(car => car.remove());
  logs.forEach(log => log.remove());
  cars = [];
  logs = [];

  for (let i = 0; i < 5; i++) {
    const car = document.createElement('div');
    car.classList.add('car');
    car.style.top = `${i * 80}px`;
    car.style.left = `${Math.random() * 360}px`;
    grid.appendChild(car);
    cars.push(car);

    const log = document.createElement('div');
    log.classList.add('log');
    log.style.top = `${i * 80 + 40}px`;
    log.style.left = `${Math.random() * 360}px`;
    grid.appendChild(log);
    logs.push(log);
  }
};

const moveElements = () => {
  cars.forEach(car => {
    let left = parseFloat(car.style.left);
    car.style.left = `${(left - 2 + 400) % 400}px`;
  });

  logs.forEach(log => {
    let left = parseFloat(log.style.left);
    log.style.left = `${(left + 2) % 400}px`;
  });
};

const checkWinLose = () => {
  const frogRect = frog.getBoundingClientRect();

  // Win
  if (frogY <= 0) {
    endGame("🎉 You Win!");
  }

  // Collision detection
  for (let car of cars) {
    const carRect = car.getBoundingClientRect();
    if (
      frogRect.left < carRect.right &&
      frogRect.right > carRect.left &&
      frogRect.top < carRect.bottom &&
      frogRect.bottom > carRect.top
    ) {
      endGame("💥 Game Over! You hit a car.");
    }
  }
};

const startTimer = () => {
  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame("⏰ Game Over! Time’s up.");
    }
  }, 1000);
};

const toggleGame = () => {
  if (isGameRunning) {
    clearInterval(gameInterval);
    clearInterval(countdown);
    startPauseBtn.textContent = 'Start';
  } else {
    resetFrog();
    createCarsAndLogs();
    gameInterval = setInterval(() => {
      moveElements();
      checkWinLose();
    }, 50);
    startTimer();
    startPauseBtn.textContent = 'Pause';
  }
  isGameRunning = !isGameRunning;
};

const endGame = (text) => {
  clearInterval(gameInterval);
  clearInterval(countdown);
  isGameRunning = false;
  message.textContent = text;
  overlay.classList.remove('hidden');
  startPauseBtn.textContent = 'Start';
};

const restartGame = () => {
  overlay.classList.add('hidden');
  timeLeft = 30;
  timerDisplay.textContent = timeLeft;
  toggleGame();
};

document.addEventListener('keydown', moveFrog);
startPauseBtn.addEventListener('click', toggleGame);
restartBtn.addEventListener('click', restartGame);

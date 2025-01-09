const grid = document.querySelector('.grid');
const frog = document.querySelector('.frog');
const startPauseBtn = document.getElementById('start-pause');
const timerDisplay = document.getElementById('timer');

let cars = [];
let logs = [];
let gameInterval;
let countdown;
let timeLeft = 30;
let isGameRunning = false;

// Initialize positions
const moveFrog = (e) => {
    const step = 40; // Movement step size
    const frogRect = frog.getBoundingClientRect();
    const gridRect = grid.getBoundingClientRect();

    if (e.key === 'ArrowUp' && frogRect.top > gridRect.top) frog.style.top = `${frog.offsetTop - step}px`;
    if (e.key === 'ArrowDown' && frogRect.bottom < gridRect.bottom) frog.style.top = `${frog.offsetTop + step}px`;
    if (e.key === 'ArrowLeft' && frogRect.left > gridRect.left) frog.style.left = `${frog.offsetLeft - step}px`;
    if (e.key === 'ArrowRight' && frogRect.right < gridRect.right) frog.style.left = `${frog.offsetLeft + step}px`;
};

// Add cars and logs to the grid
const createCarsAndLogs = () => {
    for (let i = 0; i < 5; i++) {
        const car = document.createElement('div');
        car.classList.add('car');
        car.style.top = `${i * 80}px`;
        car.style.left = `${Math.random() * 400}px`;
        grid.appendChild(car);
        cars.push(car);

        const log = document.createElement('div');
        log.classList.add('log');
        log.style.top = `${i * 80 + 40}px`;
        log.style.left = `${Math.random() * 400}px`;
        grid.appendChild(log);
        logs.push(log);
    }
};

// Move cars and logs
const moveElements = () => {
    cars.forEach(car => {
        car.style.left = `${(parseFloat(car.style.left) - 2 + 400) % 400}px`;
    });

    logs.forEach(log => {
        log.style.left = `${(parseFloat(log.style.left) + 2) % 400}px`;
    });
};

// Check win or lose conditions
const checkWinLose = () => {
    const frogRect = frog.getBoundingClientRect();

    if (frog.offsetTop === 0) {
        clearInterval(gameInterval);
        clearInterval(countdown);
        alert('You Win!');
    }

    cars.forEach(car => {
        const carRect = car.getBoundingClientRect();
        if (frogRect.left < carRect.right && frogRect.right > carRect.left &&
            frogRect.top < carRect.bottom && frogRect.bottom > carRect.top) {
            clearInterval(gameInterval);
            clearInterval(countdown);
            alert('Game Over! You hit a car.');
        }
    });
};

// Timer
const startTimer = () => {
    countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            clearInterval(countdown);
            alert('Game Over! Time’s up.');
        }
    }, 1000);
};

// Start/Pause Game
const toggleGame = () => {
    if (isGameRunning) {
        clearInterval(gameInterval);
        clearInterval(countdown);
    } else {
        gameInterval = setInterval(() => {
            moveElements();
            checkWinLose();
        }, 50);
        startTimer();
    }
    isGameRunning = !isGameRunning;
};

document.addEventListener('keydown', moveFrog);
startPauseBtn.addEventListener('click', toggleGame);
createCarsAndLogs();

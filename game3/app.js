const squares = document.querySelectorAll('.square');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPosition;
let currentTime = 60; // Timer starts at 60 seconds
let timerId = null;

// Function to randomly select a square for the mole
function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove('mole');
  });

  const randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('mole');
  hitPosition = randomSquare.id; // Set the current hit position
}

// Event listener for clicking squares
squares.forEach((square) => {
  square.addEventListener('mousedown', () => {
    if (square.id === hitPosition) {
      result++;
      score.textContent = result; // Update the score
      hitPosition = null; // Reset hit position
    }
  });
});

// Move the mole every 500ms
function moveMole() {
  timerId = setInterval(randomSquare, 500);
}

// Start the countdown timer
function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime; // Update timer display

  if (currentTime === 0) {
    clearInterval(countDownTimerId); // Stop countdown
    clearInterval(timerId); // Stop mole movement
    alert('GAME OVER! Your final score is ' + result);
  }
}

moveMole(); // Start moving the mole

let countDownTimerId = setInterval(countDown, 1000); // Start the countdown timer

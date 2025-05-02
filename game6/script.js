// script.js
const grid = document.querySelector('.grid');
const playerDisplay = document.getElementById('player');
const resetButton = document.getElementById('reset');
const playerOneScoreDisplay = document.getElementById('player-one-score');
const playerTwoScoreDisplay = document.getElementById('player-two-score');
const timerDisplay = document.getElementById('time-left');

let currentPlayer = 1;
let playerOneScore = 0;
let playerTwoScore = 0;
let timeLeft = 10;
let timer;

const squares = [];
for (let i = 0; i < 49; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  grid.appendChild(square);
  squares.push(square);
}

startTimer();

squares.forEach((square, index) => {
  square.addEventListener('click', () => {
    if (!squareEnabled()) return;

    const column = index % 7;

    for (let row = 5; row >= 0; row--) {
      const squareIndex = row * 7 + column;
      if (!squares[squareIndex].classList.contains('player-one') &&
          !squares[squareIndex].classList.contains('player-two')) {
        squares[squareIndex].classList.add(
          currentPlayer === 1 ? 'player-one' : 'player-two'
        );
        resetTimer();
        checkBoard();
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        playerDisplay.textContent = currentPlayer;
        break;
      }
    }
  });
});

function checkBoard() {
  const winningArrays = [
    ...[0, 7, 14, 21, 28, 35].flatMap(row =>
      [0, 1, 2, 3].map(offset => [
        row + offset,
        row + offset + 1,
        row + offset + 2,
        row + offset + 3
      ])
    ),
    ...[0, 1, 2, 3, 4, 5, 6].flatMap(column =>
      [0, 7, 14, 21].map(offset => [
        column + offset,
        column + offset + 7,
        column + offset + 14,
        column + offset + 21
      ])
    ),
    ...[0, 1, 2, 3].flatMap(start =>
      [0, 7, 14].map(offset => [
        start + offset,
        start + offset + 8,
        start + offset + 16,
        start + offset + 24
      ])
    ),
    ...[3, 4, 5, 6].flatMap(start =>
      [0, 7, 14].map(offset => [
        start + offset,
        start + offset + 6,
        start + offset + 12,
        start + offset + 18
      ])
    )
  ];

  for (const combination of winningArrays) {
    const [a, b, c, d] = combination;
    if (
      squares[a].classList.contains('player-one') &&
      squares[b].classList.contains('player-one') &&
      squares[c].classList.contains('player-one') &&
      squares[d].classList.contains('player-one')
    ) {
      alert('Player One Wins!');
      playerOneScore++;
      updateScores();
      resetBoard();
      return;
    }
    if (
      squares[a].classList.contains('player-two') &&
      squares[b].classList.contains('player-two') &&
      squares[c].classList.contains('player-two') &&
      squares[d].classList.contains('player-two')
    ) {
      alert('Player Two Wins!');
      playerTwoScore++;
      updateScores();
      resetBoard();
      return;
    }
  }
}

function updateScores() {
  playerOneScoreDisplay.textContent = playerOneScore;
  playerTwoScoreDisplay.textContent = playerTwoScore;
}

function resetBoard() {
  squares.forEach(square => {
    square.classList.remove('player-one', 'player-two');
  });
}

resetButton.addEventListener('click', () => {
  playerOneScore = 0;
  playerTwoScore = 0;
  updateScores();
  resetBoard();
  currentPlayer = 1;
  playerDisplay.textContent = currentPlayer;
  resetTimer();
});

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      switchPlayer();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 10;
  timerDisplay.textContent = timeLeft;
  startTimer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  playerDisplay.textContent = currentPlayer;
  resetTimer();
}

function squareEnabled() {
  return true;
}

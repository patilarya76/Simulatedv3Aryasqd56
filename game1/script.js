let playerScore = 0;
let computerScore = 0;
let timer;
let timeLeft = 10;

function computerChoice() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function decideWinner(player, computer) {
  if (player === computer) return "It's a tie!";
  if (
    (player === 'Rock' && computer === 'Scissors') ||
    (player === 'Paper' && computer === 'Rock') ||
    (player === 'Scissors' && computer === 'Paper')
  ) {
    playerScore++;
    return '🎉 You Win!';
  } else {
    computerScore++;
    return '😢 Computer Wins!';
  }
}

function getEmoji(choice) {
  if (choice === 'Rock') return '✊';
  if (choice === 'Paper') return '✋';
  if (choice === 'Scissors') return '✌️';
  return '❓';
}

function updateUI(player, computer, result) {
  document.getElementById('result').textContent = 
    `You chose: ${getEmoji(player)}, Computer chose: ${getEmoji(computer)}. ${result}`;
  document.getElementById('playerScore').textContent = playerScore;
  document.getElementById('computerScore').textContent = computerScore;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  timeLeft = 10;
  clearInterval(timer);
  document.getElementById('playerScore').textContent = playerScore;
  document.getElementById('computerScore').textContent = computerScore;
  document.getElementById('result').textContent = 'Make your choice!';
  document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;
  startTimer();
}

function startTimer() {
  const timerElement = document.getElementById('timer');
  clearInterval(timer);
  timer = setInterval(() => {
    timerElement.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      const computer = computerChoice();
      const result = decideWinner('No choice', computer);
      updateUI('No choice', computer, result);
    }
    timeLeft--;
  }, 1000);
}

['rock', 'paper', 'scissors'].forEach(choice => {
  document.getElementById(choice).addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 10;
    const player = choice.charAt(0).toUpperCase() + choice.slice(1);
    const computer = computerChoice();
    const result = decideWinner(player, computer);
    updateUI(player, computer, result);
    startTimer();
  });
});

document.getElementById('reset').addEventListener('click', resetGame);
startTimer();

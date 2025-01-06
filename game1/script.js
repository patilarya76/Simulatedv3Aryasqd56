// Initialize scores
let playerScore = 0;
let computerScore = 0;

// Function to get the computer's choice
function computerChoice() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Function to decide the winner
function decideWinner(player, computer) {
  if (player === computer) {
    return "It's a tie!";
  } else if (
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

// Function to update the UI
function updateUI(player, computer, result) {
  document.getElementById('result').textContent = `You chose: ${getEmoji(
    player
  )}, Computer chose: ${getEmoji(computer)}. ${result}`;
  document.getElementById('playerScore').textContent = playerScore;
  document.getElementById('computerScore').textContent = computerScore;
}

// Function to map choices to emojis
function getEmoji(choice) {
  if (choice === 'Rock') return '✊';
  if (choice === 'Paper') return '✋';
  if (choice === 'Scissors') return '✌️';
}

// Function to reset the game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  document.getElementById('playerScore').textContent = playerScore;
  document.getElementById('computerScore').textContent = computerScore;
  document.getElementById('result').textContent = 'Make your choice!';
}

// Add event listeners to buttons
document.getElementById('rock').addEventListener('click', () => {
  const player = 'Rock';
  const computer = computerChoice();
  const result = decideWinner(player, computer);
  updateUI(player, computer, result);
});

document.getElementById('paper').addEventListener('click', () => {
  const player = 'Paper';
  const computer = computerChoice();
  const result = decideWinner(player, computer);
  updateUI(player, computer, result);
});

document.getElementById('scissors').addEventListener('click', () => {
  const player = 'Scissors';
  const computer = computerChoice();
  const result = decideWinner(player, computer);
  updateUI(player, computer, result);
});

// Add event listener to reset button
document.getElementById('reset').addEventListener('click', resetGame);

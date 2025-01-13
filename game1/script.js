// Initialize scores
let playerScore = 0;
let computerScore = 0;

// Timer variables
let timer;
let timeLeft = 10;

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
  timeLeft = 10;
  document.getElementById('playerScore').textContent = playerScore;
  document.getElementById('computerScore').textContent = computerScore;
  document.getElementById('result').textContent = 'Make your choice!';
  
  // Stop any running timer and reset timeLeft
  clearInterval(timer);
  document.getElementById('timer').textContent = `Time left: ${timeLeft}s`; // Reset the timer display
  startTimer(); // Start a new timer
}

// Function to start the countdown timer
function startTimer() {
  const timerElement = document.getElementById('timer');

  // Clear the previous timer if one exists
  clearInterval(timer);

  // Set up the new timer
  timer = setInterval(() => {
    timerElement.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      const result = decideWinner('No choice', computerChoice());
      updateUI('No choice', computerChoice(), result);
    }
    timeLeft--;
  }, 1000);
}

// Add event listeners to buttons
document.getElementById('rock').addEventListener('click', () => {
  clearInterval(timer); // Stop the previous timer
  timeLeft = 10; // Reset timer
  const player = 'Rock';
  const computer = computerChoice();
  const result = decideWinner(player, computer);
  updateUI(player, computer, result);
  startTimer(); // Start a new timer
});

document.getElementById('paper').addEventListener('click', () => {
  clearInterval(timer); // Stop the previous timer
  timeLeft = 10; // Reset timer
  const player = 'Paper';
  const computer = computerChoice();
  const result = decideWinner(player, computer);
  updateUI(player, computer, result);
  startTimer(); // Start a new timer
});

document.getElementById('scissors').addEventListener('click', () => {
  clearInterval(timer); // Stop the previous timer
  timeLeft = 10; // Reset timer
  const player = 'Scissors';
  const computer = computerChoice();
  const result = decideWinner(player, computer);
  updateUI(player, computer, result);
  startTimer(); // Start a new timer
});

// Add event listener to reset button
document.getElementById('reset').addEventListener('click', resetGame);

// Start the initial countdown timer when the page loads
startTimer();

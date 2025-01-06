// Function to capture user's choice
function userChoice(choice) {
    console.log(`User chose: ${choice}`);
    document.getElementById('result').textContent = `You chose: ${choice}`;
  }
  
  // Add event listeners to buttons
  document.getElementById('rock').addEventListener('click', () => userChoice('Rock'));
  document.getElementById('paper').addEventListener('click', () => userChoice('Paper'));
  document.getElementById('scissors').addEventListener('click', () => userChoice('Scissors'));
  
  // Function to get computer's random choice
  function computerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const choice = choices[randomIndex];
    console.log(`Computer chose: ${choice}`);
    return choice;
  }
  
  // Testing the computer's random choice
  console.log(computerChoice());
  
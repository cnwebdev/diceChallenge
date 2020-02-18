///////////////////////////////////////////////////////////////////////////
// Roll The Dice Game - on ES6 and newer implementation
//

/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// Set global veriables
let scores = [0, 0];
let activeScore, activePlayer;
activeScore = 0;
activePlayer = 0;

// Seclect DOM Elements 
const diceImage = document.querySelector('.dice');
const player1 = document.querySelector('.player-0-panel');
const player2 = document.querySelector('.player-1-panel');
const newGame = document.querySelector('.btn-new');
const rollDice = document.querySelector('.btn-roll');
const hold = document.querySelector('.btn-hold');
let totalScore = document.getElementById('score-' + activePlayer);

// Function - rollTheDice
const rollTheDice = () => {
  if (gamePlaying) {
    // Sellect current user
    let actScore = document.getElementById('current-' + activePlayer);

    // Get the dice random number
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);

    // Display the correct dice image
    diceImage.style.display = 'block';
    diceImage.src = 'assets/img/dice-' + dice + '.png';

    // Update the active score
    if (dice === 1) {
      switchPlayer();
    } else {
      // Add Score
      activeScore += dice;
      console.log(activeScore);
    }
    actScore.textContent = activeScore;
  }
};


// Update totalScore
const updateTotalScore = () => {
  if (gamePlaying) {
    let totalScore = document.getElementById('score-' + activePlayer);
    let winner = document.getElementById('name-' + activePlayer);

    // Change the dice display when the dice is 1
    diceImage.style.display = 'none';

    // Add current score to totalScore
    scores[activePlayer] += activeScore;

    // Display the players total score.
    totalScore.textContent = scores[activePlayer];

    // Check total score and select winner
    if (scores[activePlayer] >= 100) {
      // Deplay the Winner Band
      winner.textContent = 'Winner!';
      gamePlaying = false;
    } else {
      // Change player 
      switchPlayer();
    }
    activeScore.textContent = 0;
  }
}

// Function - switch players
const switchPlayer = () => {
  // Sellect current user
  let actScore = document.getElementById('current-' + activePlayer);

  // Next Player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  // Reset activeScore to 0
  activeScore = 0;
  actScore.textContent = activeScore;
  console.log(activeScore);

  // Change active player display
  // player1.classList.remove('active');
  // player2.classList.add('active');
  player1.classList.toggle('active');
  player2.classList.toggle('active');

  // Change the dice display when the dice is 1
  // diceImage.style.display = 'none';
}

// Reset all game score on load or function call
const init = () => {
  scores = [0, 0];
  activeScore = 0;
  gamePlaying = true;
  activePlayer === 1 ? activePlayer = 0 : activePlayer = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  player1.classList.remove('active');
  player2.classList.remove('active');
  player1.classList.add('active');
  diceImage.style.display = 'none';
}
init();

rollDice.addEventListener('click', rollTheDice);
hold.addEventListener('click', updateTotalScore);
newGame.addEventListener('click', init);

///////////////////////////////////////////////////////////////////////////
// Roll The Dice Game - on ES6 and newer implementation
//

// Set global veriables
let scores = [0, 0];
let activeScore, activePlayer, winningScore;
activeScore = 0;
activePlayer = 0;
winningScore = 30;

// Sellect DOM Elements
let num = document.getElementById('win-score');

// Set Game Winning Number Function
num.addEventListener('keypress', function (key) {
  if (gamePlaying) {
    if (num.value >= 30 && key.keyCode === 13) {
      console.log(key.keyCode);
      winningScore = num.value;
      document.getElementById('num').textContent = winningScore;
      console.log(num.value);
    }
  }
});

// Function - rollTheDice
document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying) {
    // Sellect current user
    let actScore = document.getElementById('current-' + activePlayer);
    let totalScore = document.getElementById('score-' + activePlayer);

    // Get the dice random number
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    console.log(dice1, dice2);

    // Display the correct dice image
    document.querySelector('.dice1').style.display = 'block';
    document.querySelector('.dice2').style.display = 'block';
    document.querySelector('.dice1').src = 'assets/img/dice-' + dice1 + '.png';
    document.querySelector('.dice2').src = 'assets/img/dice-' + dice2 + '.png';

    // Update the active score
    if (dice1 === 6 && dice2 === 6) {
      activeScore = 0;
      scores[activePlayer] = 0;
      totalScore.textContent = 0;
      console.log(scores[activePlayer]);
      console.log(dice1, dice2);
      switchPlayer();
    } else if (dice1 === 1 || dice2 === 1) {
      switchPlayer();
    } else {
      // Add Score
      activeScore += (dice1 + dice2);
      console.log(activeScore);
    }
    actScore.textContent = activeScore;
  }
});


// Update totalScore
document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying) {
    let totalScore = document.getElementById('score-' + activePlayer);
    let winner = document.getElementById('name-' + activePlayer);

    // Change the dice display when the dice is 1
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    // Add current score to totalScore
    scores[activePlayer] += activeScore;

    // Display the players total score.
    totalScore.textContent = scores[activePlayer];

    // Check total score and select winner
    if (scores[activePlayer] >= winningScore) {
      // Deplay the Winner Band
      winner.textContent = 'Winner!';
      gamePlaying = false;
    } else {
      // Change player 
      switchPlayer();
    }
    activeScore.textContent = 0;
  }
});

// Function - switch players
const switchPlayer = () => {
  // Sellect current user
  let actScore = document.getElementById('current-' + activePlayer);

  // Next Player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  // Reset activeScore to 0, and lastRoll score
  lastRoll = 0;
  activeScore = 0;
  actScore.textContent = activeScore;
  console.log(activeScore);

  // Change active player display
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

// Reset all game score on load or function call
const init = () => {
  scores = [0, 0];
  lastRoll = 0;
  activeScore = 0;
  gamePlaying = true;
  activePlayer = 0;
  document.getElementById('num').textContent = winningScore;
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}
init();

document.querySelector('.btn-new').addEventListener('click', init);



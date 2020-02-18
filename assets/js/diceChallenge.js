///////////////////////////////////////////////////////////////////////////
// Roll The Dice Game - on ES6 and newer implementation
//

// Set global veriables
let scores = [0, 0];
let activeScore, activePlayer, lastRoll;
activeScore = 0;
activePlayer = 0;
lastRoll = 0;


// Function - rollTheDice
document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying) {
    // Sellect current user
    let actScore = document.getElementById('current-' + activePlayer);
    let totalScore = document.getElementById('score-' + activePlayer);

    // Get the dice random number
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);

    // Display the correct dice image
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice').src = 'assets/img/dice-' + dice + '.png';

    // Update the active score
    if (dice === 6 && dice === lastRoll) {
      activeScore = 0;
      scores[activePlayer] = 0;
      totalScore.textContent = 0;
      console.log(scores[activePlayer]);
      console.log(lastRoll);
      console.log(dice);
      switchPlayer();
    } else if (dice === 1) {
      switchPlayer();
    } else {
      // Add Score
      activeScore += dice;
      console.log(activeScore);

      // Save the dice value to lastRoll
      lastRoll = dice;
      console.log(lastRoll);
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
    document.querySelector('.dice').style.display = 'none';

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

  // Change the dice display when the dice is 1
  // diceImage.style.display = 'none';
}

// Reset all game score on load or function call
const init = () => {
  scores = [0, 0];
  lastRoll = 0;
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
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.dice').style.display = 'none';
}
init();

document.querySelector('.btn-new').addEventListener('click', init);



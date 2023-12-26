document.addEventListener('DOMContentLoaded', function () {
    const symbols = ['😀', '🌟', '🍎', '🚀', '🐯', '🌈', '🎉', '🦄', '😀', '🌟', '🍎', '🚀', '🐯', '🌈', '🎉', '🦄'];
    let flippedCards = [];
    let matchedCards = [];
    let wrongAttempts = 0;
    let previewTimeout;
  
    const gameContainer = document.getElementById('game-container');
  
    // Shuffle the symbols array
    symbols.sort(() => Math.random() - 0.5);
  
    // Create card elements and append them to the game container
    symbols.forEach((symbol, index) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.symbol = symbol;
      cardElement.dataset.index = index;
      cardElement.addEventListener('click', flipCard);
      gameContainer.appendChild(cardElement);
    });
  
    function flipCard() {
      if (!gameContainer.classList.contains('no-click') &&
          flippedCards.length < 2 &&
          !this.classList.contains('flipped') &&
          !this.classList.contains('matched')) {
  
        this.classList.add('flipped');
        this.textContent = this.dataset.symbol; // Show symbol on click
  
        flippedCards.push(this);
  
        if (flippedCards.length === 2) {
          setTimeout(checkMatch, 500);
        }
      }
    }
  
    function checkMatch() {
      const [card1, card2] = flippedCards;
  
      if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        checkWin();
      } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = ''; // Hide symbol on unmatched cards
        card2.textContent = ''; // Hide symbol on unmatched cards
        wrongAttempts++;
  
        if (wrongAttempts === 3) {
          alert('You lose! Try again.');
          resetGame();
        }
      }
  
      flippedCards = [];
    }
  
    function checkWin() {
      if (matchedCards.length === symbols.length) {
        alert('Congratulations! You won!');
        resetGame();
      }
    }
  
    function resetGame() {
      flippedCards = [];
      matchedCards = [];
      wrongAttempts = 0;
  
      // Clear all classes and symbols from cards
      document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped', 'matched');
        card.textContent = '';
      });
  
      // Reset the preview
      showPreview();
    }
  
    function showPreview() {
      symbols.forEach((symbol, index) => {
        const cardElement = gameContainer.children[index];
        cardElement.textContent = symbol;
  
        setTimeout(() => {
          cardElement.textContent = '';
          enableClicking();
        }, 2000);
      });
    }
  
    function enableClicking() {
      gameContainer.classList.remove('no-click');
    }
  
    // Show a 2-second preview at the beginning
    showPreview();
  });
  
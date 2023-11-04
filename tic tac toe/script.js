let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function makeMove(cell) {
  const index = Array.from(cell.parentElement.children).indexOf(cell);
  if (gameBoard[index] === '' && !gameOver) {
    gameBoard[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer);
    checkWinner();

    const turnDisplay = document.getElementById('turn-display');
    if (currentPlayer === 'X') {
      turnDisplay.textContent = "It's O's turn";
    } else {
      turnDisplay.textContent = "It's X's turn";
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameOver = true;
      const winDetails = `${gameBoard[a]} wins!`;
      displayWinningLine(a, b, c);

      setTimeout(() => {
        document.getElementById('winner-message').textContent = winDetails;
        const modal = document.getElementById('winner-modal');
        modal.style.display = 'block';
      }, 1000);
    }
  }
  if (!gameBoard.includes('') && !gameOver) {
    gameOver = true;
    const drawDetails = "It's a draw!";
    setTimeout(() => {
      document.getElementById('winner-message').textContent = drawDetails;
      const modal = document.getElementById('winner-modal');
      modal.style.display = 'block';
    }, 1000);
  }
}

function displayWinningLine(a, b, c) {
  const cells = document.querySelectorAll('.cell');
  cells[a].classList.add('winning-cell');
  cells[b].classList.add('winning-cell');
  cells[c].classList.add('winning-cell');

  const winningColor = '#ffcc00'; // New color for winning cells
  cells[a].style.backgroundColor = cells[b].style.backgroundColor = cells[c].style.backgroundColor = winningColor;

  if (gameBoard[a] === 'X') {
    cells[a].style.color = 'black'; // Change 'X' text color to black
  }
  if (gameBoard[b] === 'X') {
    cells[b].style.color = 'black'; // Change 'X' text color to black
  }
  if (gameBoard[c] === 'X') {
    cells[c].style.color = 'black'; // Change 'X' text color to black
  }
}



function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('X', 'O', 'winning-cell');
    cell.style.backgroundColor = ''; // Reset cell background color
    cell.style.color = ''; // Reset cell text color
  });

  const turnDisplay = document.getElementById('turn-display');
  turnDisplay.textContent = "It's X's turn";

  const modal = document.getElementById('winner-modal');
  modal.style.display = 'none';
}

// Close the modal when the 'X' is clicked
const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', function() {
  const modal = document.getElementById('winner-modal');
  modal.style.display = 'none';
});

resetGame();

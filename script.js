const board = document.querySelector('.board');
const squares = document.querySelectorAll('.square');
const restartBtn = document.querySelector('.restart');
const status = document.querySelector('.status');
let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `It's a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

status.innerHTML = currentPlayerTurn();

const handleSquareClick = (event) => {
  const clickedSquare = event.target;
  const clickedSquareIndex = parseInt(clickedSquare.getAttribute('data-cell-index'));

  if (gameState[clickedSquareIndex] !== '' || !gameActive) {
    return;
  }

  handleCellPlayed(clickedSquare, clickedSquareIndex);
  handleResultValidation();
};

const handleCellPlayed = (clickedSquare, clickedSquareIndex) => {
  gameState[clickedSquareIndex] = currentPlayer;
  clickedSquare.innerHTML = currentPlayer;
};

const handleResultValidation = () => {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winningCondition = winningConditions[i];
    let a = gameState[winningCondition[0]];
    let b = gameState[winningCondition[1]];
    let c = gameState[winningCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    status.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    status.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
};

const handlePlayerChange = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.innerHTML = currentPlayerTurn();
};

const handleRestartGame = () => {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  status.innerHTML = currentPlayerTurn();
  squares.forEach(square => square.innerHTML = '');
};

squares.forEach(square => square.addEventListener('click', handleSquareClick));
restartBtn.addEventListener('click', handleRestartGame);

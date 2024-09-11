//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/
const playerX = "X";
const playerO = "O";
const winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
];
/*---------------------------- Variables (state) ----------------------------*/
let board;
let currentTurn;
let winner;
let tie;
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");
/*-------------------------------- Functions --------------------------------*/
const updateBoard = function () {
  board.forEach((cell, idx) => {
    if (cell === "X") {
      squareEls[idx].textContent = "X";
    } else if (cell === "O") {
      squareEls[idx].textContent = "O";
    } else {
      squareEls[idx].textContent = "";
    }
  });
};
const updateMessage = function () {
  if (!winner && !tie) {
    if (currentTurn === "X") {
      messageEl.textContent = "X's turn";
    } else {
      messageEl.textContent = "O's turn";
    }
  } else if (!winner && tie) {
    messageEl.textContent = "its a tie!";
  } else {
    if (currentTurn === "X") {
      messageEl.textContent = "X is the winner!";
    } else {
      messageEl.textContent = "O is the winner";
    }
  }
};
const render = function () {
  updateBoard();
  updateMessage();
};
const init = function () {
  board = ["", "", "", "", "", "", "", "", ""];
  currentTurn = playerX;
  winner = false;
  tie = false;
  render();
};

const placePiece = function (index) {
  board[index] = currentTurn;
  console.log(board);
};
const checkForWinner = function () {
  winningCombo.forEach((combo) => {
    const [x, y, z] = combo;
    if (board[x] && board[x] === board[y] && board[x] === board[z]) {
      winner = currentTurn;
    }
  });
};
const checkForTie = function () {
  if (winner) {
    return;
  }
  if (!board.includes("")) {
    tie = true;
  }
};
const switchPlayerTurn = function () {
  if (winner) {
    return;
  }
  if (currentTurn === "X") {
    currentTurn = "O";
  } else {
    currentTurn = "X";
  }
};
const handleClick = function (event) {
  const squareIndex = event.target.id;
  if (board[squareIndex] !== "" || winner) {
    return;
  }
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
};
init();
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
  square.addEventListener("click", handleClick);
});
resetBtnEl.addEventListener("click", init);

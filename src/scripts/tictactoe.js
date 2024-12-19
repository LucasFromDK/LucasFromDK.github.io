let isLive = true;
let moves = 0;
let isTie = false;

const boardWidth = 3;
const boardHeight = 3;
let board = newEmptyBoard(boardWidth, boardHeight);

const players = ["X", "O"];
let currentPlayer = 0;

function setup() {
  let canvas = createCanvas(300, 300); // Set to 300x300
  canvas.parent('tictactoe'); // Attach the canvas to the div with id="sketch-holder"
}

function draw() {
  background(220);
  drawBoard();
  if (!isLive) {
    drawWinner();
  }
}

function newEmptyBoard(w, h) {
  let board = [];
  for (let i = 0; i < w; i++) {
    board[i] = [];
    for (let j = 0; j < h; j++) {
      board[i][j] = "";
    }
  }
  return board;
}

function drawWinner() {
  textSize(40);
  fill(0, 0, 255);
  textAlign(CENTER, CENTER);
  if (isTie == false) {
    text("Winner is " + players[currentPlayer] + "!", width / 2, height / 2);
  } else {
    text("Draw!", width / 2, height / 2);
  }
}

function drawBoard() {
  let tileWidth = width / boardWidth;
  let tileHeight = height / boardHeight;

  for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardHeight; j++) {
      let x = i * tileWidth;
      let y = j * tileHeight;
      drawTile(x, y, tileWidth, tileHeight, board[i][j]);
    }
  }
}

function drawTile(x, y, w, h, sign) {
  stroke(0);
  strokeWeight(2);
  fill(255);
  rectMode(CORNER);
  rect(x, y, w, h);

  textSize(min(w, h) / 2);
  textAlign(CENTER, CENTER);
  fill(0);
  text(sign, x + w / 2, y + h / 2);
}

function mouseClicked() {
  if (isLive) {
    let ij = indexesOfTileAtCoord(mouseX, mouseY);
    let i = ij[0];
    let j = ij[1];

    if (i >= 0 && i < boardWidth && j >= 0 && j < boardHeight && isTileEmpty(i, j)) {
      setSign(i, j, players[currentPlayer]);
      resolveGamestate();
    }
  } else {
    newGame();
  }
}

function indexesOfTileAtCoord(x, y) {
  let tileWidth = width / boardWidth;
  let tileHeight = height / boardHeight;
  let i = floor(x / tileWidth);
  let j = floor(y / tileHeight);
  return [i, j];
}

function isTileEmpty(i, j) {
  return board[i][j] === "";
}

function setSign(i, j, sign) {
  board[i][j] = sign;
}

function resolveGamestate() {
  moves++;
  if (isGameOver()) {
    isLive = false;
  } else {
    setNextPlayer();
  }
}

function setNextPlayer() {
  currentPlayer = 1 - currentPlayer;
}

function isGameOver() {
  for (let i = 0; i < boardWidth; i++) {
    if (
      board[i][0] !== "" &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return true;
    }
  }

  for (let j = 0; j < boardHeight; j++) {
    if (
      board[0][j] !== "" &&
      board[0][j] === board[1][j] &&
      board[1][j] === board[2][j]
    ) {
      return true;
    }
  }

  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return true;
  }

  if (
    board[0][2] !== "" &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return true;
  }

  if (moves === 9) {
    isTie = true;
    return true;
  }

  return false;
}

function newGame() {
  board = newEmptyBoard(boardWidth, boardHeight);
  moves = 0;
  isTie = false;
  isLive = true;
  currentPlayer = 0;
}
var board;
const human = "O";
const ai = "X";
// let endgame_select = document.querySelector(".finalgame");


const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
// Check the problem of 2,4,6.

const cells = document.querySelectorAll(".cell");
beginGame();
// document.querySelector(".finalgame.text").innerText = "cool";
function beginGame() {
  document.querySelector(".finalgame").style.display = "none";
  board = Array.from(Array(9).keys());
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
}

function turnClick(square) {
  if (typeof board[square.target.id] === "number") {
    console.log(square.target.id + 'cooler')
    console.log(human + 'human')
    turn(square.target.id, human);
    if (!checkTie()) {	
      turn(bestPos(), ai);
      console.log(bestPos()+"best")
    }
  }
}

function bestPos() {
  return emptySquaresfun()[0];
}

function emptySquaresfun() {
  return board.filter(s => typeof s === "number");
}

function checkTie() {
  if (emptySquaresfun().length === 0) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "green";
      cells[i].removeEventListener("click", turnClick, false);
    }
    announceWinner("Game Tied!");
    return true;
  }
  return false;
}

function announceWinner(who) {
  console.log(who);
  document.querySelector(".finalgame").style.display = "block";
  document.querySelector(".finalgame .text").innerText = who;
}

function turn(sid, player) {
  board[sid] = player;
  document.getElementById(sid).innerText = player;
  let ifwon = checkWin(board, player);
  // console.log(ifwon);
  if (ifwon) finishgame(ifwon);
}

function checkWin(general_board, player) {
  let p = general_board.reduce(
    (a, e, i) => (e === player ? a.concat(i) : a),
    []
  );
  let ifwon = null;
  for (let [index, win] of winCombinations.entries()) {
    if (win.every(elem => p.indexOf(elem) > -1)) {
      ifwon = { index: index, player: player };
      break;
    }
  }
  // console.log(ifwon);
  return ifwon;
}

function finishgame(ifwon) {
  for (let index of winCombinations[ifwon.index]) {
    document.getElementById(index).style.backgroundColor =
      ifwon.player === human ? "blue" : "red";
  }
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
  // console.log(ifwon);
  announceWinner(ifwon.player === human ? "You Win!" : "You Lose!");
}

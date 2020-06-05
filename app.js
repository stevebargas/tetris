document.addEventListener('DOMContentLoaded', () =>{

const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const width = 10;
const ScoreDisplay = document.querySelector('#score');
const StartBtn = document.querySelector('#start-button');
let nextRandom = 0;



// The  Tetrominoes
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2]
]

const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1]
]

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1]
]

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1]
]

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3]
]

const theTetrominoes = [ lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

let currentPosition = 4;
let currentRotation = 0;

// randomly select a Tetromino and its first rotation
let random = Math.floor(Math.random()*theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];

//draw the first rotation in the first Tetrominoes
function draw(){
  current.forEach(index =>{
    squares[currentPosition + index].classList.add('tetromino');
  })
}


// Undraw the Tetrominoes
function undraw(){
  current.forEach( index => {
    squares[currentPosition + index].classList.remove('tetromino');
  })
}


// make the terominio move down every second
timerId =  setInterval(moveDown, 400);


//assign functions to keyCodes
function control(e){
  if(e.keyCode === 37){
    moveLeft();
  } else if(e.keyCode === 38){
    rotate()
  } else if(e.keyCode === 39){
    moveRight()
  } else if(e.keyCode === 40){
     moveDown()
   }

}

document.addEventListener('keyup', control);



//move down function
function moveDown(){
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

// freeze function

function freeze(){
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    //start a new tetromino falling
    random = nextRandom
    nextRandom = Math.floor(Math.random()*theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
    displayShape();
  }
}


// move the tetromino left, unless its at the edge or there is blockage
function moveLeft(){
  undraw();
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
  if(!isAtLeftEdge) currentPosition -= 1;

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    currentPosition += 1;
  }

  draw();

}

// move piece to the moveright
function moveRight(){
  undraw();
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1);
  if(!isAtRightEdge) currentPosition +=1;
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    currentPosition -=1;
  }

  draw();

}



//rotate the piece
function rotate(){
  undraw();
  currentRotation ++;
  if(currentRotation === current.length){
    // if the current rotation gets to 4, make it go back to 0
    currentRotation = 0;
  }

  current = theTetrominoes[random][currentRotation];
  draw();

}



// show up next piece
const displaySquares = document.querySelectorAll('.mini-grid div');
const displayWidth = 4;
let displayIndex = 0;


// the pieces without Rotatons
const upNextTetrominoes = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2], // l pieces
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // z Piece
  [1, displayWidth, displayWidth + 1, displayWidth + 2], // t piece
  [0, 1, displayWidth, displayWidth + 1], // 0 piece
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] // i piece
]
// displat the mini shape

function displayShape(){
  // remove any trace of a piece from the entire grid
  displaySquares.forEach(square =>{
    square.classList.remove('tetromino')
  })
  upNextTetrominoes[nextRandom].forEach(index =>{
    displaySquares[displayIndex + index].classList.add('tetromino');
  })
}




})

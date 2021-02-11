
const grid = document.querySelector('.container');
const scoreDisplay = document.querySelector('#score');

let blockwidth = 100;
let blockheight = 20;
let score = 0;
let userStart = [270, 10];
let currentPos = userStart;

const boardWidth = 545;
const boardHeight = 500;
const ballDiameter = 24;
const ballStart = [305, 180];
let ballCurrentPos = ballStart;
let timerId;
let xDirection = 2;
let yDirection = 2;


// create block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockwidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockheight];
        this.topRight = [xAxis + blockwidth, yAxis + blockheight];
    }

}

// all blocks
const blocks = [
    new Block(10, 470),
    new Block(115, 470),
    new Block(220, 470),
    new Block(325, 470),
    new Block(430, 470),
    // new Block(535, 370),

    // second row

    new Block(10, 440),
    new Block(115, 440),
    new Block(220, 440),
    new Block(325, 440),
    new Block(430, 440),
    // new Block(535, 340),

    // 3rd row
    new Block(10, 410),
    new Block(115, 410),
    new Block(220, 410),
    new Block(325, 410),
    new Block(430, 410),
    // new Block(535, 310),
]


function addBlock() {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        grid.appendChild(block);
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
    }

}
addBlock();


// add user
const user = document.createElement('div');
user.classList.add('user');
user.style.left = currentPos[0] + 'px';
user.style.bottom = currentPos[1] + 'px';
grid.appendChild(user);

// move user
function moveUser(e) {
    switch (e.key) {
        case "ArrowLeft":
            if (currentPos[0] > 0) {
                currentPos[0] -= 10;
                user.style.left = currentPos[0] + 'px';

            }
            break;
        case "ArrowRight":
            if (currentPos[0] < 545 - blockwidth) {
                currentPos[0] += 10;
                user.style.left = currentPos[0] + 'px';

            }
            break;


    }
}



// draw ball
function drawBall() {
    ball.style.left = ballCurrentPos[0] + 'px';
    ball.style.bottom = ballCurrentPos[1] + 'px';
}

document.addEventListener('keydown', moveUser);


// creating ball
const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
drawBall();


// moving ball

function moveBall() {
    ballCurrentPos[0] += xDirection;
    ballCurrentPos[1] += yDirection;
    drawBall();
    checkCollisions();
    if(blocks.length==0){
        youwin();
    }
}
timerId = setInterval(moveBall, 15);

checkCollisions();



var startingX = xDirection;
// chng directions
function changeDirection() {
    
    if(xDirection===2 && yDirection===2){
        yDirection=-2;
        return
    }
    if(xDirection===-2 && yDirection===2){
        xDirection=2
        return
    }
    if(xDirection===-2 &&yDirection===-2){
        yDirection=2;
        return
    }
    if(xDirection===2 &&yDirection===-2){
        xDirection=-2;
        return
    }



    
    


}
// collisions checking
function checkCollisions() {

    //collisions with the blocks
    for (let i = 0; i < blocks.length; i++) {
        if ((ballCurrentPos[0] > blocks[i].bottomLeft[0] && ballCurrentPos[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPos[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPos[1] < blocks[i].topLeft[1])) {

            const allBlocks = Array.from(document.querySelectorAll('.block'));
            blocks.splice(i, 1);
            allBlocks[i].classList.remove('block');
            changeDirection();
            score++;
            scoreDisplay.innerHTML = "Your Score: " + score;

        }
    }

    // collisions with the walls
    if (ballCurrentPos[0] >= (boardWidth - ballDiameter) || ballCurrentPos[1] >= (boardHeight - ballDiameter)
        || ballCurrentPos[0] <= 0) {
        changeDirection();
    }

    if (ballCurrentPos[1] <= 0) {
        console.log("Game over")
        document.removeEventListener('keydown', moveUser);
        clearInterval(timerId);
        scoreDisplay.innerHTML = "You Lose";
        youwin();
    }


    // collisions with user paddle
    if ((ballCurrentPos[0] > currentPos[0] && ballCurrentPos[0] < currentPos[0] + blockwidth)
        && (ballCurrentPos[1] > currentPos[1] && ballCurrentPos[1] < currentPos[1] + 24)) {
        changeDirection();
    }

}


function youwin(){
    scoreDisplay.innerHTML="You win";
    clearInterval(timerId);
    document.removeEventListener('keydown',moveUser);
}
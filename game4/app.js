const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 700;
const boardHeight = 500;
let xDirection = 2;
let yDirection = -2;

let currentPosition = [290, 10]; // Paddle position
let ballCurrentPosition = [340, 60]; // Ball start position
let timerId;
let score = 0;

// Block class
class Block {
    constructor(x, y) {
        this.bottomLeft = [x, y];
        this.bottomRight = [x + blockWidth, y];
        this.topLeft = [x, y + blockHeight];
        this.topRight = [x + blockWidth, y + blockHeight];
    }
}

// All blocks
const blocks = [];
for (let y = 300; y >= 220; y -= 40) {
    for (let x = 10; x <= 580; x += 110) {
        blocks.push(new Block(x, y));
    }
}

// Draw blocks
function addBlocks() {
    blocks.forEach(block => {
        const blockElement = document.createElement('div');
        blockElement.classList.add('block');
        blockElement.style.left = block.bottomLeft[0] + 'px';
        blockElement.style.bottom = block.bottomLeft[1] + 'px';
        grid.appendChild(blockElement);
    });
}
addBlocks();

// User paddle
const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
drawUser();

// Ball
const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
drawBall();

// Draw user paddle
function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

// Draw ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

// Move user paddle
function moveUser(e) {
    if (e.key === 'ArrowLeft' && currentPosition[0] > 0) {
        currentPosition[0] -= 15;
    } else if (e.key === 'ArrowRight' && currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 15;
    }
    drawUser();
}
document.addEventListener('keydown', moveUser);

// Move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}
timerId = setInterval(moveBall, 20);

// Check for collisions
function checkForCollisions() {
    // Block collision
    blocks.forEach((block, index) => {
        if (
            ballCurrentPosition[0] > block.bottomLeft[0] &&
            ballCurrentPosition[0] < block.bottomRight[0] &&
            ballCurrentPosition[1] + ballDiameter > block.bottomLeft[1] &&
            ballCurrentPosition[1] < block.topLeft[1]
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[index].remove();
            blocks.splice(index, 1);
            changeDirection();
            score++;
            scoreDisplay.textContent = `Score: ${score}`;

            if (blocks.length === 0) {
                clearInterval(timerId);
                scoreDisplay.textContent = 'You Win!';
                document.removeEventListener('keydown', moveUser);
            }
        }
    });

    // Wall collision
    if (ballCurrentPosition[0] <= 0 || ballCurrentPosition[0] >= boardWidth - ballDiameter) {
        xDirection *= -1;
    }
    if (ballCurrentPosition[1] >= boardHeight - ballDiameter) {
        yDirection *= -1;
    }

    // Paddle collision
    if (
        ballCurrentPosition[0] > currentPosition[0] &&
        ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
        ballCurrentPosition[1] <= currentPosition[1] + blockHeight &&
        ballCurrentPosition[1] >= currentPosition[1]
    ) {
        yDirection *= -1;
    }

    // Game Over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.textContent = 'Game Over!';
        document.removeEventListener('keydown', moveUser);
    }
}

// Change ball direction
function changeDirection() {
    if (xDirection === 2 && yDirection === -2) {
        yDirection = 2;
    } else if (xDirection === 2 && yDirection === 2) {
        xDirection = -2;
    } else if (xDirection === -2 && yDirection === 2) {
        yDirection = -2;
    } else if (xDirection === -2 && yDirection === -2) {
        xDirection = 2;
    }
}

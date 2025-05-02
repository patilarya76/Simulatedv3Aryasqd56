const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#score");
const livesDisplay = document.querySelector("#lives");
const levelDisplay = document.querySelector("#level");
const message = document.querySelector(".message");

let currentShooterIndex = 202;
const width = 15;
let aliensRemoved = [];
let invadersId;
let isGoingRight = true;
let direction = 1;
let score = 0;
let lives = 3;
let level = 1;
let alienInvaders = [];
let boss = null;

// Create grid
for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

// Shooter
squares[currentShooterIndex].classList.add("shooter");

function drawAliens() {
    alienInvaders.forEach((invader, i) => {
        if (!aliensRemoved.includes(i)) {
            squares[invader].classList.add("invader");
        }
    });
}

function removeAliens() {
    alienInvaders.forEach(invader => squares[invader].classList.remove("invader"));
}

function setupLevel() {
    alienInvaders = [];
    aliensRemoved = [];

    for (let i = 0; i < 30; i++) {
        alienInvaders.push(i + Math.floor(i / 10) * 5);
    }

    if (level >= 3) {
        boss = {
            position: 7,
            health: 5
        };
        squares[boss.position].classList.add("boss");
    }

    drawAliens();
    invadersId = setInterval(moveInvaders, 600 - (level - 1) * 100);
}

// Shooter Movement
function moveShooter(e) {
    squares[currentShooterIndex].classList.remove("shooter");
    if (e.key === "ArrowLeft" && currentShooterIndex % width !== 0) currentShooterIndex -= 1;
    if (e.key === "ArrowRight" && currentShooterIndex % width < width - 1) currentShooterIndex += 1;
    squares[currentShooterIndex].classList.add("shooter");
}
document.addEventListener("keydown", moveShooter);

// Invader Movement
function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;

    removeAliens();

    if (rightEdge && isGoingRight) {
        alienInvaders.forEach((_, i) => (alienInvaders[i] += width + 1));
        direction = -1;
        isGoingRight = false;
    } else if (leftEdge && !isGoingRight) {
        alienInvaders.forEach((_, i) => (alienInvaders[i] += width - 1));
        direction = 1;
        isGoingRight = true;
    }

    alienInvaders.forEach((_, i) => (alienInvaders[i] += direction));
    drawAliens();

    if (squares[currentShooterIndex].classList.contains("invader") || alienInvaders.some(i => i >= currentShooterIndex)) {
        loseLife();
    }

    if (aliensRemoved.length === alienInvaders.length && (!boss || boss.health <= 0)) {
        clearInterval(invadersId);
        level++;
        levelDisplay.textContent = level;
        setupLevel();
    }
}

// Shoot
function shoot(e) {
    if (e.key !== "ArrowUp") return;

    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;

        if (currentLaserIndex >= 0) squares[currentLaserIndex].classList.add("laser");

        // Hit invader
        if (squares[currentLaserIndex]?.classList.contains("invader")) {
            squares[currentLaserIndex].classList.remove("laser", "invader");
            squares[currentLaserIndex].classList.add("boom");
            setTimeout(() => squares[currentLaserIndex]?.classList.remove("boom"), 300);
            clearInterval(laserId);

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
            aliensRemoved.push(alienRemoved);
            score += 10;
            resultDisplay.textContent = score;
        }

        // Hit boss
        if (boss && currentLaserIndex === boss.position) {
            squares[currentLaserIndex].classList.remove("laser");
            squares[currentLaserIndex].classList.add("boom");
            setTimeout(() => squares[currentLaserIndex]?.classList.remove("boom"), 300);
            clearInterval(laserId);

            boss.health -= 1;
            if (boss.health <= 0) {
                squares[boss.position].classList.remove("boss");
                score += 50;
                resultDisplay.textContent = score;
            }
        }

        if (currentLaserIndex < 0) clearInterval(laserId);
    }

    laserId = setInterval(moveLaser, 100);
}
document.addEventListener("keydown", shoot);

function loseLife() {
    lives--;
    livesDisplay.textContent = lives;
    clearInterval(invadersId);
    if (lives === 0) {
        message.textContent = "GAME OVER";
        message.style.color = "red";
    } else {
        message.textContent = "You were hit! Resetting level...";
        setTimeout(() => {
            message.textContent = "";
            setupLevel();
        }, 2000);
    }
}

setupLevel();

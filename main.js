const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car');

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

const setting = {
    start: false,
    score: 0,
    speed: 3
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', startMove);
document.addEventListener('keyup', stopMove);

function startGame() {
    setting.start = !setting.start;
    gameArea.appendChild(car);
    car.classList.remove('hide');
    start.textContent = "Pause";
    requestAnimationFrame(playGame);
};

function playGame(params) {
    if (setting.start) {
        console.log('Play game!');
        requestAnimationFrame(playGame);
    } else {
        console.log('Stop game!');
        start.textContent = "Start";
        car.classList.add('hide');
    }
}

function startMove(event) {
    event.preventDefault();
    keys[event.key] = true;

};

function stopMove(event) {
    event.preventDefault();
    keys[event.key] = false;
}
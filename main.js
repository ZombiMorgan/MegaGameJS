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
    speed: 3,
    traffic: 3
};

start.addEventListener('click', startGame);


function startGame(event) {
    setting.start = !setting.start;
    if (event.target.innerText == 'Start') {
        gameArea.appendChild(car);
        car.maxX = gameArea.offsetWidth - car.offsetWidth;
        car.maxY = gameArea.offsetHeight - car.offsetHeight;
        setting.x = car.offsetLeft = car.maxX / 2;
        setting.y = car.offsetTop = car.maxY - 10;
        setting.speed = 1;
        for (let i = 0; i < 6; i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            //line.style.top = (i * 100) + 'px';
            line.y = i * 100;
            gameArea.appendChild(line);
        };
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
        start.textContent = 'Pause';
        console.log('Play game!');
        requestAnimationFrame(playGame);
    } else {
        while (gameArea.lastChild)
            gameArea.removeChild(gameArea.lastChild);
        document.removeEventListener('keydown', keyDown);
        document.removeEventListener('keyup', keyUp);
        start.textContent = 'Start';
        console.log('Stop game!');
    };
};

function playGame() {
    moveRoad();
    if (keys.ArrowLeft && setting.x > 0) {
        setting.x -= setting.speed;
        if (setting.x < 0)
            setting.x = 0;
    };
    if (keys.ArrowRight && setting.x < car.maxX) {
        setting.x += setting.speed;
        if (setting.x > car.maxX)
            setting.x = car.maxX;
    };
    if (keys.ArrowDown && setting.y < car.maxY) {
        setting.y += setting.speed;
        if (setting.y > car.maxY)
            setting.y = car.maxY;
    };
    if (keys.ArrowUp && setting.y > 0) {
        setting.y -= setting.speed;
        if (setting.y < 0)
            setting.y = 0;
    };
    car.style.left = setting.x + 'px';
    car.style.top = setting.y + 'px';
    requestAnimationFrame(playGame);
};

function keyDown(event) {
    event.preventDefault();
    keys[event.key] = true;
};

function keyUp(event) {
    event.preventDefault();
    keys[event.key] = false;
};

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';
        if (line.y >= gameArea.clientHeight)
            line.y = 0;
    });
};

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
};
console.log(getQuantityElements(100));
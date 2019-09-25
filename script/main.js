const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div'),
    music = document.createElement('audio');
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
    speed: 5,
    traffic: 3
};

const models = [
    '../image/enemy.png',
    '../image/enemy2.png',
    '../image/enemy3.png',
    '../image/enemy4.png'
];

start.addEventListener('click', startGame);

function startGame(event) {
    while (gameArea.lastChild)
            gameArea.removeChild(gameArea.lastChild);
    setting.start = true;
    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    };
    for (let i = 0; i < getQuantityElements(100 * (4 - setting.traffic)); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        gameArea.appendChild(enemy);
        enemy.y = (setting.traffic - 4) * 100 * (i + 1);
        enemy.style.top = enemy.y + 'px';
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - enemy.offsetWidth)) + 'px';
        enemy.style.background = `transparent url(${models[[Math.floor(Math.random() * 4)]]}) center / cover no-repeat`;
    };
    setting.score = 0;
    gameArea.appendChild(car);
    music.setAttribute('autoplay', true);
    music.setAttribute('src', '../audio/audio.mp3');
    gameArea.appendChild(music);
    car.maxX = gameArea.offsetWidth - car.offsetWidth;
    car.maxY = gameArea.offsetHeight - car.offsetHeight;
    setting.x = car.style.left = car.maxX / 2;
    setting.y = car.style.top = car.maxY - 10;
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    start.classList.add('hide');
    score.style.top = 0;
    //console.log('Play game!');
    requestAnimationFrame(playGame);
};

function playGame() {
    if (setting.start) {
        setting.score = setting.score + Math.floor((setting.traffic + setting.speed) / 2);
        score.innerHTML = 'SCORE<br>' + setting.score;
        moveRoad();
        moveEnemy();
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
    }
};

function keyDown(event) {
    if (event.key in keys) {
        event.preventDefault();
        keys[event.key] = true;
    }
};

function keyUp(event) {
    if (event.key in keys) {  
        event.preventDefault();
        keys[event.key] = false;
}
};

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';
        if (line.y >= gameArea.offsetHeight)
            line.y = 0;
    });
};

function moveEnemy() {
    let enemies = document.querySelectorAll('.enemy');
    let carRect = car.getBoundingClientRect();
    enemies.forEach(function(enemy) {
        let enemyRect = enemy.getBoundingClientRect();
        if (carRect.top <= enemyRect.bottom &&
            carRect.bottom >= enemyRect.top &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right) {
                setting.start = false;
                start.classList.remove('hide');
                score.style.top = start.offsetHeight;
                keys.ArrowUp = false;
                keys.ArrowDown = false;
                keys.ArrowLeft = false;
                keys.ArrowRight = false;
                document.removeEventListener('keydown', keyDown);
                document.removeEventListener('keyup', keyUp);
                //console.log('Stop game!');
            }
        enemy.y += setting.speed / 2;
        enemy.style.top = enemy.y + 'px';
        if (enemy.y >= gameArea.offsetHeight) {
            enemy.y = (setting.traffic - 4) * 100;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - enemy.offsetWidth)) + 'px';
            enemy.style.background = models[Math.floor(Math.random() * 4)];
        };
    });
};

function getQuantityElements(heightElement) {
    return Math.floor(gameArea.offsetHeight / heightElement + 1);
};
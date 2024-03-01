let bgImg;
let omino1;
let omino3;
let pers;
let isPaused = false;
let scrollSpeed = 2;
let bgX1 = 0;
let bgX2;
let lastImageChange = 0;
let imageInterval = 250;
let ostacolo;

let obstacles = [];
let collisionTime = 0;
let collisionDelay = 10000; // 10 seconds in milliseconds

function preload() {
    bgImg = loadImage('./img/sfondo.png');
    omino1 = loadImage('./img/omino1.png');
    omino3 = loadImage('./img/omino3.png');
    
    ostacolo = loadImage('./img/ostacolo2.png');
}

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
    pers = new Player();
    bgX2 = width;

    // Creazione degli ostacoli
    for (let i = 0; i < 1; i++) {
        obstacles.push(new Obstacle(scrollSpeed));
    }
}

function draw() {
    background(255);
    if (!isPaused) {
        scrolling();
        pers.update();
    } else {
      pers.show();
      background(bgImg);
    }
    pers.show();
    if (keyIsDown(32)){
      pers.jump();
    }
    // Controllo intervallo per cambiare immagine del personaggio
    if (!isPaused && millis() - lastImageChange > imageInterval) {
        pers.toggleImage();
        lastImageChange = millis();
    }

    // Mostra e muove gli ostacoli
    for (let i = obstacles.length - 1; i >= 0; i--) {
        if (!isPaused) {
            obstacles[i].move();
        }
        obstacles[i].show();

        // Rimuove gli ostacoli fuori dallo schermo e ne crea di nuovi
        if (obstacles[i].isOffScreen()) {
            obstacles.splice(i, 1);
            obstacles.push(new Obstacle());
        }

        // Controllo se il personaggio è vicino a un ostacolo
        if (millis() - collisionTime > collisionDelay && pers.x + 95 > obstacles[i].x - 1 && pers.x < obstacles[i].x + 95) {
            pers.stop();
            window.location.href = 'figura2.html';
            isPaused = true;
            collisionTime = millis();
            setTimeout(function() {
                
                isPaused = false;
            }, collisionDelay);
        }
    }
}

function scrolling() {
    image(bgImg, bgX1, 0, width, height);
    image(bgImg, bgX2, 0, width, height);
    bgX1 -= scrollSpeed;
    bgX2 -= scrollSpeed;
    if (bgX1 <= -width) {
        bgX1 = width;
    }
    if (bgX2 <= -width) {
        bgX2 = width;
    }
}

function keyPressed() {
    if (keyCode === 32) { // 32 is the ASCII code for the spacebar
        isPaused = true;
    }
}
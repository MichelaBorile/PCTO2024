//dichiarazione varibili
let bgImg;
let omino1;
let omino3;
let pers;
let isPaused = false;
let scrollSpeed = 2;
let bgX1 = 0;//Coordinata X del primo sfondo 
let bgX2;//Coordinata X del scondo sfondo
let lastImageChange = 0;//Ultimo cambio dell'immagine
let imageInterval = 250;//Intervallo di tempo tra i cambi di immagine del personaggio
let ostacolo;//Immagine dell'ostacolo

let obstacles = [];//Array per gli ostacoli
let collisionTime = 0;//Ultima collisione con un ostacolo
let collisionDelay = 10000; // Intervallo di tempo tra le collisioni in millisecondi

function preload() {
    bgImg = loadImage('./img/sfondo.png');
    omino1 = loadImage('./img/omino1.png');
    omino3 = loadImage('./img/omino3.png');
    
    ostacolo = loadImage('./img/ostacolo2.png');
}

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);//Crea l'area di disegno
    pers = new Player();//Crea il personaggio
    bgX2 = width;//Imposta la coordinata X del secondo sfondo

    // Creazione degli ostacoli
    for (let i = 0; i < 1; i++) {
        obstacles.push(new Obstacle(scrollSpeed));//Crea un nuovo ostacolo
    }
}

function draw() {
    background(255);//Imposta il colore dello sfondo
    if (!isPaused) {//Se il gioco non è in pausa
        scrolling();//Fa scorre lo sfondo 
        pers.update();//Aggiorna il personaggio
    } else { // se il gico è in pausa
      pers.show();//Mostra il personaggio
      background(bgImg);//Mostra lo sfondo
    }
    pers.show();//Mostra il personaggio
    if (keyIsDown(32)){
      pers.jump();//Fa saltare il personaggio
    }
    // Controllo intervallo per cambiare immagine del personaggio
    if (!isPaused && millis() - lastImageChange > imageInterval) {
        pers.toggleImage();//Cambia l'immagine del personaggio
        lastImageChange = millis();//Aggiorna l'ultimo cambio di immagine
    }

    // Mostra e muove gli ostacoli
    for (let i = obstacles.length - 1; i >= 0; i--) {
        if (!isPaused) {//Se il gioco non è in pausa
            obstacles[i].move();//Muove l'ostacolo
        }
        obstacles[i].show();

        // Rimuove gli ostacoli fuori dallo schermo e ne crea di nuovi
        if (obstacles[i].isOffScreen()) {//Se l'ostacolo è fuori dallo schermo
            obstacles.splice(i, 1);//Rimuove l'ostacolo
            obstacles.push(new Obstacle());//Crea un nuovo ostacolo
        }

        // Controllo se il personaggio è vicino a un ostacolo
        if (millis() - collisionTime > collisionDelay && pers.x + 95 > obstacles[i].x - 1 && pers.x < obstacles[i].x + 95) {
            pers.stop();//Ferma il personaggio
            window.location.href = 'figura1.html';
            isPaused = true;//Mette il gico in pausa
            collisionTime = millis();//Aggiorna l'ultimo tempo di collisioneS
            setTimeout(function() {
                
                isPaused = false;//Riprende il gioco dopo un intervallo di tempo
            }, collisionDelay);
        }
    }
}

function scrolling() {
    image(bgImg, bgX1, 0, width, height);//Mostra i primo sfonfo
    image(bgImg, bgX2, 0, width, height);//Mostra il secondo sfondo
    bgX1 -= scrollSpeed;//Muove il primo sfodno
    bgX2 -= scrollSpeed;//Muove il secondo sfondo
    if (bgX1 <= -width) {//Se il primo sfondo è fuori dallo schermo
        bgX1 = width;//Riposiziona il primo sfondo
    }
    if (bgX2 <= -width) {//Se il secondo sfondo è fuori dallo schermo
        bgX2 = width;//Riposiziona il secondo sfondo
    }
}

function keyPressed() {
    if (keyCode === 32) { // 32 is the ASCII code for the spacebar
        isPaused = true;
    }
}
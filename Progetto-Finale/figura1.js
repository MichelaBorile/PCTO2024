// In class Example
// Training a hand pose classification model
// https://github.com/ml5js/Intro-ML-Arts-IMA-F21
// Definizione di una classe Line

// HandPose Model and video

//dichiarazione variabili
let handpose;
let video;

// Just using two finger points
let thumbX, thumbY;
let indexX, indexY;
let prevIndexX, prevIndexY;   //variabili che tengono conto della posizione precedente della mano in modo da riuscire a fare una linea conitnua

let drawingCanvas; // Canvas per il disegno

let resultP;

let brain;


// Creazione di un oggetto Line
let myLine;

let circleX = 340 ; // Coordinata x del cerchio con il numero 1
let circleY = 40;   // Coordinata y del cerchio con il numero 1
let circleRadius = 15; // Diametro del cerchio con il numero 1

let cont=0;

let imageModelURL = 'https://teachablemachine.withgoogle.com/models/OKVmzeLd9/';

let contGiusto =0;    //incremento punteggio
let contErrori=0;     //incremento errori

function modelLoaded() {
  console.log("handpose ready");
}

function setup() {
  document.addEventListener('keydown', (e) => { if (e.ctrlKey && e.key === '1') autorefresh.click();})  //ascoltatore degli eventi che controlla se l'utente preme contemporaneamente il tasto "Ctrl" e il tasto "1" sulla tastiera. In caso affermativo, l'evento click viene simulato sull'elemento con l'ID "autorefresh"

  createCanvas(windowWidth, windowHeight);

  // Start the video and hide it
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  
  // Load the model
  handpose = ml5.handpose(video, modelLoaded);
  
  // Listen to new 'predict' events
  handpose.on("predict", gotPose);
  
  // Crea una seconda canvas per il disegno
  drawingCanvas = createGraphics(windowWidth, windowHeight);
  // Create an ml5 neural network
  let options = {
    task: "classification",
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  
}


function gotPose(results) {
  
  // If there is a hand
  if (results.length > 0) {
    thumbX = 0.5 * results[0].annotations.thumb[3][0];
    thumbY = 0.5 * results[0].annotations.thumb[3][1];
    indexX = 0.5 * results[0].annotations.indexFinger[3][0];
    indexY = 0.5 * results[0].annotations.indexFinger[3][1];
  }
  // Creazione di un nuovo oggetto Line
  myLine = new Line(prevIndexX + 130, prevIndexY + 15, indexX + 130, indexY + 15);
  //verifica se si presenta la collisione con il cerchio numero 1
  if (myLine.collideCircle(circleX, circleY, circleRadius)){
    localStorage.setItem("contGiusto", contGiusto);   //comunicazione punteggio alla pagina finale
    localStorage.setItem("contErrore", contErrori);   //comunicazione errori alla pagina finale
    window.location.href = 'percorso1.html';    //quando collide torna al percorso
  }
}

function draw() {
  background(255);
  //togliere effetto specchio
  scale(-1, 1);
  translate(-width, 0);
  image(video, 0, 0);
  // fill(255, 0, 0);  //rosso
  // stroke(255);
  // circle(thumbX, thumbY, 16);
  fill(0, 0, 255);  //blu, simbolo che prende la mano
  stroke(255);
  circle(indexX, indexY, 16);
  
  // Disegna il tracciamento del dito sulla canvas di disegno
  drawingCanvas.stroke(0); // Colore nero
  drawingCanvas.strokeWeight(10); // Spessore della linea
  if (prevIndexX !== undefined && prevIndexY !== undefined) {   //verifica se le variabili prevIndexX e prevIndexY non sono undefined, quindi che contengano dei valori
    scale(3);   //abbiamo fatto una scala di 2 per ingrandire l'area di disegno
    myLine.draw(drawingCanvas);   //richiama la funzione draw, disegna la linea
  }

  // Aggiorna le posizioni precedenti del dito
  prevIndexX = indexX;
  prevIndexY = indexY;

  // Mostra la canvas di disegno sulla canvas principale
  image(drawingCanvas, 0, 0, windowWidth, windowHeight);

  // Use keypresses to collect data
  // 49 is keycode for '1'
  if (keyIsDown(49)) {
    console.log('close');
    let inputs = [indexX, indexY, thumbX, thumbY];
    let target = ['closed'];
    brain.addData(inputs, target);
  // 50 is keycode for '2'
  } else if (keyIsDown(50)) {
    console.log('open');
    let inputs = [indexX, indexY, thumbX, thumbY];
    let target = ['open'];
    brain.addData(inputs, target);  
  }
  //torna a prima di togliere lo specchio (se no numeri al contrario)
  scale(-1, 1);
  translate(-width, 0);
  quadrato();   //richiama funzione quadrato che disegna la figura
  calcolaPrecisione();    //calcola la precisione della linea disegnata
  

}

function keyPressed() {
  // Train the model when space bar is pressed
  if (key == ' ') {
    brain.normalizeData();
    brain.train({epochs: 15}, finishedTraining);
  } else if (key == 'd') {
    brain.saveData('dan-open-close-data');
  }
}

// Start classification when model is finished training
function finishedTraining() {
  console.log('finished');
  let inputs = [indexX, indexY, thumbX, thumbY];
  brain.classify(inputs, gotResults);
}


// Just log the results of classification
function gotResults(error, results) {
  // console.log(results[0].label);
  resultP.html(results[0].label);
  let inputs = [indexX, indexY, thumbX, thumbY];
  brain.classify(inputs, gotResults);  
}

function quadrato(){
     //QUADRATO
     noFill();
     stroke(190);
     strokeWeight(10); 
     rect(1300, 50, 150, 150);
     let x = 1300;  //posizione x di partenza
     let y = 50; // Posizione y di partenza
     let diameter = 30 // Diametro casuale tra 20 e 50
     fill(256, 12, 15); // Imposta il colore di riempimento del cerchio
     noStroke(); // Rimuove il contorno del cerchio
     ellipse(x, y, diameter, diameter); // Disegna il cerchio
     fill(255);
     // Posiziona il testo al centro del cerchio
     textAlign(CENTER, CENTER);
     textSize(20);
     // Scrive il numero all'interno del cerchio
     text(1, x, y);

     //aggiornamento coordinate per posizionare i cerchi in modo da realizzare correttamente la figura
     x+=150;    
     fill(256, 12, 15); // Imposta il colore di riempimento del cerchio
     noStroke(); // Rimuove il contorno del cerchio
     ellipse(x, y, diameter, diameter); // Disegna il cerchio
     fill(255);
     // Posiziona il testo al centro del cerchio
     textAlign(CENTER, CENTER);
     textSize(20);
     // Scrivi il numero casuale all'interno del cerchio
     text(2, x, y);
     y+=150;
     fill(256, 12, 15); // Imposta il colore di riempimento del cerchio
     noStroke(); // Rimuove il contorno del cerchio
     ellipse(x, y, diameter, diameter); // Disegna il cerchio
     fill(255);
     // Posiziona il testo al centro del cerchio
     textAlign(CENTER, CENTER);
     textSize(20);
     // Scrivi il numero casuale all'interno del cerchio
     text(3, x, y);
     x= x-150;
     fill(256, 12, 15); // Imposta il colore di riempimento del cerchio
     noStroke(); // Rimuove il contorno del cerchio
     ellipse(x, y, diameter, diameter); // Disegna il cerchio
     fill(255);
     // Posiziona il testo al centro del cerchio
     textAlign(CENTER, CENTER);
     textSize(20);
     // Scrivi il numero casuale all'interno del cerchio
     text(4, x, y);
    
}

function calcolaPrecisione(){
  // verifica se le coordinate della linea disegnata sono interne ai valori delle linee della figura
  if (prevIndexX <= 215 && prevIndexY >= 25 && prevIndexX >= 65 && prevIndexY<= 65){  //da 1 a 2
    contGiusto++;
  }else if(prevIndexX <= 80 && prevIndexY >= 40 && prevIndexX >= 50 && prevIndexY<= 183){   //da 2 a 3
    contGiusto++;
  }else if(prevIndexX <= 215 && prevIndexY >= 168 && prevIndexX >= 65 && prevIndexY<= 198){   //da 3 a 4
    contGiusto++;
  }else if(prevIndexX <= 230 && prevIndexY >= 40 && prevIndexX >= 200 && prevIndexY<= 183){   //da 4 a 1
    contGiusto++;
  }else{
    if (contGiusto > 3){
      contErrori++;
    }
  }

  // textSize(10);
  // fill(0);
  // text(contGiusto, 1350, 200);
  // text(contErrori, 1350, 250);
}

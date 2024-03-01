let img;
let contGiusto;
let contErrore;
function preload(){
    img= loadImage("img/sfondoWin.png");
    
}
  
function setup() {
    createCanvas(windowWidth, windowHeight);
    contGiusto = localStorage.getItem("contGiusto");        //salva i dati mandati dalla figura con il punteggio
    contErrore = localStorage.getItem("contErrore");        //salva i dati mandati dalla figura con il numero di errori
}
  
  
function draw() {

    background(img);

    fill(0);
    // Posiziona il testo al centro del cerchio
    textAlign(CENTER, CENTER);
    textSize(70);
    // Scrivi il numero casuale all'interno del cerchio
    text(contGiusto, 1515, 610);        //stampa punti
    fill(0);
    // Posiziona il testo al centro del cerchio
    textAlign(CENTER, CENTER);
    textSize(70);
    // Scrivi il numero casuale all'interno del cerchio
    text(contErrore, 1470, 720);        //stampa errori

}
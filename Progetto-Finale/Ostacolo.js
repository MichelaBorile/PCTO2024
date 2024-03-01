class Obstacle {
  constructor() {
      this.x = width;//Posizione iniziale dell'ostacolo sull'asse X
      this.y = 210;//Posiziona iniziale dell'ostacolo sull'asse Y
      this.speed = scrollSpeed; // La velocità degli ostacoli segue la velocità di scrolling
  }

  move() {
      this.x -= this.speed;//Muove l'ostacolo verso sinistra sulla mappa
  }

  show() {
      image(ostacolo, this.x, this.y, 680, 760);//Visualizza l'immagine dell'ostacolo
  }

  isOffScreen() {
      return this.x < -95;//Controlla se l'ostacolo è fuori dallo schermo
  }
}

// function keyPressed() {
//   if (keyCode === 32) { // Barra spaziatrice
//       if (pers.isStopped) {
//           pers.restart();
//           isPaused = false;
//       }
//   }
// }
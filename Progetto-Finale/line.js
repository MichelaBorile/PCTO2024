class Line {
    constructor(x1, y1, x2, y2) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
    }
  
    // Metodo per disegnare la linea
    draw(drawingCanvas) {
      drawingCanvas.line(this.x1, this.y1, this.x2, this.y2);
    }
  
    // Metodo per controllare la collisione con un cerchio
    collideCircle(circleX, circleY, circleRadius) {
      
      let distance= distToLine(circleX, circleY, this.x1, this.y1, this.x2, this.y2);
      if (distance <= circleRadius ){
        cont++;   //contatore dei frame, se la collissione avviene per un tot di frame allora si returna true
        if (cont >= 40){
          return true;;
        }
        else{
            return false;
        }
      }
      else {
        return false;
      }
  
    }
    

}
  // Calcola la distanza tra un punto (x, y) e una linea definita da due punti (x1, y1) e (x2, y2)
  function distToLine(x, y, x1, y1, x2, y2) {
    let A = x - x1;
    let B = y - y1;
    let C = x2 - x1;
    let D = y2 - y1;

    let dot = A * C + B * D;
    let len_sq = C * C + D * D;
    let param = -1;

    if (len_sq != 0) //in caso di divisione per zero evitiamo un errore
      param = dot / len_sq;

    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    let dx = x - xx;
    let dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  }
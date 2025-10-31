/*let posX = 0;
let posY = 0;

let threshold = 400;

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(220, 50);

  if (posX < threshold) {
    //farbe vor der Position 400

    fill(178, 212, 178)
  } else {
    //farbe nach der Postition 400
    fill(255, 182, 193)
  }


//Zufallswert für Y position 
//frameCount

if(frameCount% 10 == 0 ){

 posY = random(-100, 100)
}





  rect(posX, height / 2 + posY, 50, 50);

  // posX = posX +1; 

  /*
  
  exakt gleich         posX==350
  kleiner als          posX < 350
  grösser als          posX > 350
  kleiner oder gleich  posX <= 350 (wahr, falls posX 350 ist)
  grösser oder gleich  posX >= 350
  ungleich             posX != 350 (trifft immer zu, ausser posX hat den WErt von 350)
  
  
  */

/*

  if (posX < windowWidth - 50) {
    //falls die Bedingung zutrifft

    posX = posX + 5; //posX++
  }

}
*/

let posX = 0;
let posY = 0;
let heartbeat = true; // solange true → Herz schlägt
let linePoints = []; // speichert die Spur
let baseY;
let gridSpacing = 40; // Abstand der Linien

function setup() {
  createCanvas(windowWidth, windowHeight);
  baseY = height / 2;
  strokeWeight(1);
}

function draw() {
  // Hintergrund (schwarz) und Raster zeichnen
  background(0);
  drawGrid();

  // Herzschlag, falls aktiv
  if (heartbeat) {
    // Puls simulieren
    let t = frameCount * 0.05;
    let pulse = sin(t) * 50; // Grundschwingung
    if (frameCount % 120 < 5) {
      // kurzer "Peak" alle ~2 Sekunden
      pulse -= random(150, 200);
    }
    posY = baseY + pulse;
  }

  // Neuen Punkt hinzufügen
  linePoints.push({ x: posX, y: posY });
  if (linePoints.length > width) {
    linePoints.shift(); // alte Punkte entfernen
  }

  // Spur zeichnen (weiße Linie)
  noFill();
  stroke(255);
  beginShape();
  for (let p of linePoints) {
    vertex(p.x, p.y);
  }
  endShape();

  // Ball zeichnen
  fill(255);
  noStroke();
  ellipse(posX, posY, 12, 12);

  // Bewegung nach rechts
  posX += 4;
  if (posX > width) {
    posX = 0;
    linePoints = [];
  }
}

// Mausclick → Flatline (Herz hört auf)
function mousePressed() {
  heartbeat = !heartbeat;
}

// Rasterfunktion
function drawGrid() {
  stroke(80);
  strokeWeight(0.5);

  for (let x = 0; x < width; x += gridSpacing) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += gridSpacing) {
    line(0, y, width, y);
  }
}

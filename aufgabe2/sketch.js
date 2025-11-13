let points = [];
let baseY;
let heartbeat = true;
let speed = 4;
let gridOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  baseY = height / 2;
  strokeWeight(1);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  // --- bewegendes Raster ---
  drawMovingGrid();

  // --- neuen Punkt für die Linie berechnen ---
  let y;
 if (heartbeat) {
    // typisches Herzschlagmuster
    let phase = frameCount % 60;

    if (phase < 2) y = baseY - 190;        // steiler Peak
    else if (phase < 5) y = baseY + 100;   // tiefer Abfall
    else if (phase < 7) y = baseY - 100;   // kleine Erholung
    else y = baseY + random(-2, 2);        // Grundlinie mit leichtem Zittern
  } else {
    y = baseY; // Flatline
  }
    

 // Punkte verschieben und neuen hinzufügen
  points.push(y);
  if (points.length > width / speed + 2) {
    points.shift();
  }

  // Linie zeichnen 
  stroke(255);
  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    let x = i * speed;
    vertex(x, points[i]);
  }
  endShape();

  //  Herzanzeige oben rechts 
  push();
  translate(width - 100, 100); // obere rechte Ecke

  if (heartbeat) {
    //  pulsierendes Herz, im Beat der Linie
    let beat = (frameCount % 60 < 6) ? 1.3 : 1.0; // pulsiert im Rhythmus der Linie
    scale(beat);
    noStroke();
    fill(255, 0, 80);
    let r = 5;
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      const x = r * 16 * pow(sin(a), 3);
      const y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
      vertex(x, y);
    }
    endShape(CLOSE);
  } else {
    // Maus gedrückt → DEAD
    fill(0, 255, 0);
    noStroke();
    textSize(48);
    text("DEAD", 0, 0);
  }
  pop();
}

// Mausclick → Flatline solange gedrückt
function mousePressed() {
  heartbeat = false;
}

function mouseReleased() {
  heartbeat = true;
}

//  Funktion für bewegendes Raster
function drawMovingGrid() {
  stroke(80);
  strokeWeight(0.5);
  gridOffset -= speed / 2; // Bewegungsgeschwindigkeit des Rasters

  let spacing = 40;
  let offsetX = gridOffset % spacing;

  for (let x = offsetX; x < width; x += spacing) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += spacing) {
    line(0, y, width, y);
  }
}

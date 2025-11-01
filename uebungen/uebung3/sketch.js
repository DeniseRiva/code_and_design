/*let points = [];
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

    if (phase < 5) y = baseY - 190;        // steiler Peak
    else if (phase < 15) y = baseY + 100;   // tiefer Abfall
    else if (phase < 30) y = baseY - 80;   // kleine Erholung
    else y = baseY + random(-2, 2);        // Grundlinie mit leichtem Zittern
  } else {
    y = baseY; // Flatline
  }

  // Punkte verschieben und neuen hinzufügen
  points.push(y);
  if (points.length > width / speed + 2) {
    points.shift();
  }

  // --- Linie zeichnen ---
  stroke(255);
  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    let x = i * speed;
    vertex(x, points[i]);
  }
  endShape();

  // --- Herzanzeige oben rechts ---
  push();
  translate(width - 100, 100); // obere rechte Ecke

  if (heartbeat) {
    // ❤️ pulsierendes Herz, im Beat der Linie
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
    // 🟢 Maus gedrückt → DEAD
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

// --- Funktion für bewegendes Raster ---
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
*/

let offset = 0; //für die Bewegung des Grids
function setup() {
  createCanvas(windowWidth, windowHeight);


strokeWeight(1);

}

function draw() {
  background(0);
  //bewegendes Grid erstellen
  drawMovingGrid();
  offset += 2;
 


}

/*
let board;  
let ball;   
let pivot;  
let startTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  pivot = {
    x: width / 2,
    y: height - 50,
    r: 50
  };
  
  board = {
    w: 200,
    h: 20,
    angle: 0
  };
  
  ball = {
    x: width / 2,
    y: pivot.y - pivot.r - board.h/2 - 15,
    r: 15,
    vx: 0,
    vy: 0
  };
  
  startTime = millis();
}

function draw() {
  background(220);
  
  // Pivot-Ball
  fill(150);
  ellipse(pivot.x, pivot.y, pivot.r * 2);
  
  // Brett neigen anhand der Maus
  let maxAngle = PI / 6; 
  board.angle = map(mouseX, 0, width, -maxAngle, maxAngle);
  
  // Brett zeichnen
  push();
  translate(pivot.x, pivot.y - pivot.r);
  rotate(board.angle);
  rectMode(CENTER);
  fill(100, 200, 100);
  rect(0, 0, board.w, board.h);
  pop();
  
  // Ball Physik
  let boardY = pivot.y - pivot.r;
  let boardX = pivot.x;
  let angle = board.angle;
  
  let ax = sin(angle) * 0.5;
  let ay = 0.5;
  ball.vx += ax;
  ball.vy += ay;
  
  let relativeX = ball.x - boardX;
  let relativeY = ball.y - boardY;
  let boardHalfW = board.w/2;
  let boardHalfH = board.h/2;
  
  let rotatedX = cos(-angle) * relativeX - sin(-angle) * relativeY;
  let rotatedY = sin(-angle) * relativeX + cos(-angle) * relativeY;
  
  if (rotatedY > -ball.r - boardHalfH) {
    rotatedY = -ball.r - boardHalfH;
    ball.vy = 0;
    ball.vx *= 0.98; 
  }
  
  ball.x = cos(angle) * rotatedX - sin(angle) * rotatedY + boardX;
  ball.y = sin(angle) * rotatedX + cos(angle) * rotatedY + boardY;
  
  ball.x += ball.vx;
  ball.y += ball.vy;
  
  fill(200, 50, 50);
  ellipse(ball.x, ball.y, ball.r*2);
  
  // Timer
  let seconds = floor((millis() - startTime)/1000);
  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Time: " + seconds + "s", 10, 10);
  
  // Prüfen ob Ball runterfällt
  if (ball.y - ball.r > height) {
    noLoop();
    textSize(48);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Game Over!", width/2, height/2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

*/
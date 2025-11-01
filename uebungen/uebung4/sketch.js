/*let drehWinkel = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
angleMode(DEGREES);
rectMode (CENTER);
}

function draw(){
background (0);

push(); //rechtseck rechts
//Koordinatensystem verschieben
translate(width/2 +200, height/2);

//rotieren
rotate(drehWinkel);

fill(255, 182, 193)
rect (0,0,200,200)

pop()




push(); //rechtseck links
//Koordinatensystem verschieben
translate(width/2 - 200, height/2);

//hier rotation gegenuhrzeigersinn
rotate(-drehWinkel);

fill(178, 212, 178)
rect (0,0,200,200)


pop();


drehWinkel = drehWinkel + 1;
}*/

let valueSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  valueSlider = createSlider(-10, 38, 9);
  valueSlider.position(20, 20);
  valueSlider.style('width', '300px');
  noStroke();
}

function draw() {
  let val = valueSlider.value();
  let norm = map(val, -10, 38, 0, 1); // 0 = links, 1 = rechts
  let y = height / 2;

  // --- Hintergrund ---
  let bgHue = lerp(50, 0, norm);       // Gelb → Schwarz
  let bgSat = lerp(50, 0, norm);
  let bgBright = lerp(100, 0, norm);
  background(bgHue, bgSat, bgBright);

  // --- Kreispositionen ---
  let bounce = sin(frameCount * 0.15) * 12;

  // Linker Kreis: fliegt nach links raus, wird kleiner
  let leftX = lerp(width * 0.3, -200, norm);
  let leftSize = lerp(200, 100, norm);

  // Rechter Kreis: bleibt stehen, schrumpft leicht
  let rightX = width * 0.7;
  let rightSize = lerp(200, 150, norm);

  // --- Kreise ---
  if (norm < 0.7) {
    // Linke Seite: happy Farben, Sättigung 50%
    let leftHue = 330 + 10 * sin(frameCount * 0.1);  
    let rightHue = 30 + 10 * cos(frameCount * 0.1);

    fill(leftHue, 50, 100);
    ellipse(leftX, y + bounce, leftSize, leftSize);

    fill(rightHue, 50, 100);
    ellipse(rightX, y - bounce, rightSize, rightSize);
  } else {
    // Rechte Seite: dunkler, gefüllt
    let leftHue = 330;
    let rightHue = 30;
    let sat = lerp(50, 30, (norm - 0.7) / 0.3);
    let bright = lerp(100, 30, (norm - 0.7) / 0.3);

    fill(leftHue, sat, bright);
    ellipse(leftX, y, leftSize, leftSize);

    fill(rightHue, sat, bright);
    ellipse(rightX, y, rightSize, rightSize);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


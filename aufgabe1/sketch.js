// Globale Variable für den Slider
let beziehungsSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // VORGABE: HSB Farbmodus einstellen
  colorMode(HSB, 360, 100, 100);

  // Der Slider wird erstellt, der die Beziehung steuert.
  beziehungsSlider = createSlider(-10, 38, 9);
  beziehungsSlider.position(20, 20);
  beziehungsSlider.style('width', '300px');
}

function draw() {

  let sliderWert = beziehungsSlider.value();
  let beziehungsStatus = map(sliderWert, -10, 38, 0, 1);
  let bgHue = map(beziehungsStatus, 0, 1, 50, 0);
  let bgSat = map(beziehungsStatus, 0, 1, 50, 0);
  let bgBright = map(beziehungsStatus, 0, 1, 100, 0);
  let bounce = sin(frameCount * 0.1) * 15;
  let xLinks = map(beziehungsStatus, 0, 1, width * 0.5, -200);
  let groesseLinks = map(beziehungsStatus, 0, 1, 400, 25);
  let xRechts = width * 0.5;
  let groesseRechts = map(beziehungsStatus, 0, 1, 400, 38);
  let farbtonLinks, farbtonRechts, saettigung, helligkeit;

  if (beziehungsStatus < 0.7) {
    // ZUSTAND 1: "Harmonisch"
    farbtonLinks = 330 + 10 * sin(frameCount * 0.1);
    farbtonRechts = 30 + 10 * cos(frameCount * 0.1);
    saettigung = 50;
    helligkeit = 100;

  } else {
    // ZUSTAND 2: "Distanziert"
    let uebergang = map(beziehungsStatus, 0.7, 1.0, 0, 1);

    farbtonLinks = 330;
    farbtonRechts = 30;
    
    saettigung = map(uebergang, 0, 1, 50, 30);
    helligkeit = map(uebergang, 0, 1, 100, 30);
    
    bounce = 0; // Bewegung stoppt
  }

  background(bgHue, bgSat, bgBright);

  fill(farbtonLinks, saettigung, helligkeit);
  ellipse(xLinks, height / 2 + bounce, groesseLinks, groesseLinks);

  fill(farbtonRechts, saettigung, helligkeit);
  ellipse(xRechts, height / 2 - bounce, groesseRechts, groesseRechts);
}

// Stellt sicher, dass die Skizze die Fenstergrösse anpasst.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
let kreise = [];
let aktiv = true;
let lauf = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  // Drei Kreise mit zufälligem Startwinkel
  for (let i = 0; i < 3; i++) {
    kreise.push({
      winkel: random(TWO_PI),
      radius: 150,
      groesse: 120,
      farbe: (i * 120 + 30) % 360
    });
  }
}

function draw() {
  background(50, 50, 100);

  if (aktiv) {
    lauf += 0.02; // Animation läuft
  } else if (lauf > 0) {
    lauf = lerp(lauf, 0, 0.1); // sanft auslaufen
  }

  let bounce = sin(frameCount * 0.1) * 10 * lauf; // Gumpen
  let drehGeschwindigkeit = 0.02 * lauf;
  let abstand = 150 + bounce * lauf;

  for (let i = 0; i < kreise.length; i++) {
    let k = kreise[i];

    // Kreisposition auf Kreisbahn berechnen
    k.winkel += drehGeschwindigkeit;
    let x = width / 2 + cos(k.winkel + i * TWO_PI / 3) * abstand;
    let y = height / 2 + sin(k.winkel + i * TWO_PI / 3) * abstand;

    // Wenn deaktiviert, Kreise entfernen sich und werden kleiner/dunkler
    let distanzFaktor = aktiv ? 1 : map(lauf, 1, 0, 1, 2);
    let groesse = k.groesse * lauf;
    let helligkeit = map(lauf, 1, 0, 100, 20);

    fill(k.farbe, 80, helligkeit);
    ellipse(x * distanzFaktor, y * distanzFaktor, groesse, groesse);
  }
}

// Beim Klick: Animation stoppen oder starten
function mousePressed() {
  aktiv = !aktiv;
}

// Fenstergrösse anpassen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//Slider für Hintergrundfarbe
let sliderFarbe;

//Slider für Eckenradius
let sliderEcken;


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();

  //Slider mit Bereich und Startwert
  sliderFarbe = createSlider(0, 100, 0);
  sliderFarbe.position(20, 50);

  sliderEcken = createSlider(0, 15, 0);
  sliderEcken.position(20, 100);

}

function draw() {

  //Aktuelle Werte der Slider lesen
  let farbe = sliderFarbe.value();
  let radius = sliderEcken.value();

  //Hintergrundfarbe von Schwarz zu Weiss mappen
  let grau = map(farbe, 0, 100, 0, 255);
  background(grau);

  //Abstand der Maus zur Mitte
  let abstandX = (mouseX - width / 2) / 10;
  let abstandY = (mouseY - height / 2) / 10;

  //Farben der Formen definieren
  let blau = color(0, 200, 255);
  let pink = color(230, 0, 130);
  //eine Laufvariable für die Schleife
  let i = 0;


  //Formen in wechselnder Farbe gelistet
  fill(blau);
  stroke(0);
  for (let i = 0; i < 20; i++) {
    let faktor = 20 - i;
    if (i % 2 == 0) {fill(blau);}
    else {fill(pink);}  
    rect(width / 2 + abstandX * i, height / 2 + abstandY * i, faktor * 50, faktor * 50, radius);
  }

  /*fill(pink);
  rect(width / 2 + abstandX * 1, height / 2 + abstandY * 1, 5 * 50, 5 * 50, radius);


  fill(blau);
  rect(width / 2 + abstandX * 2, height / 2 + abstandY * 2, 4 * 50, 4 * 50, radius);


  fill(pink);
  rect(width / 2 + abstandX * 3, height / 2 + abstandY * 3, 3 * 50, 3 * 50, radius);


  fill(blau);
  rect(width / 2 + abstandX * 4, height / 2 + abstandY * 4, 2 * 50, 2 * 50, radius);


  fill(pink);
  rect(width / 2 + abstandX * 5, height / 2 + abstandY * 5, 1 * 50, 1 * 50, radius);

*/ 
  //Beschriftungen der Slider
  if (grau < 128) {
    fill(255); // heller Text auf dunklem Hintergrund
  } else {
    fill(0);   // dunkler Text auf hellem Hintergrund
  }

  textSize(12);
  text('Hintergrundfarbe', 160, 62);
  text('Eckenradius', 160, 112);


}
//Canvas an die Fenstergrösse anpassen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

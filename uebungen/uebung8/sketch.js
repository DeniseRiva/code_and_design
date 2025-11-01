

function setup() {
  createCanvas(windowWidth, windowHeight);



}

function draw() {
  background(0);
  noFill();
  stroke(225);

  for (let i = 0; i < 10; i++) {

/*
    //plan:yposition ist abhängig von Distanz von Maus zur Mitte der Elypse
    let diszanz = dist(mouseX, mouseY, i * 200, height / 2);
    let posY = map(diszanz, 0, width, -300, 300);

    ellipse(i * 200, height / 2 - posY, 200, 200);
    ellipse(i * 200, height / 2 + posY, 200, 200);
    ellipse(i * 200, height / 4 + posY, 200, 200);
    ellipse(i * 200, height / 4 - posY, 200, 200);
    ellipse(i * 200, height / 8 + posY, 200, 200);
    ellipse(i * 200, height / 8 - posY, 200, 200);
    ellipse(i * 200, height / 6 + posY, 200, 200);
    ellipse(i * 200, height / 6 - posY, 200, 200);*/

    // Distanz von Maus zur Mitte des Fensters
    let distMitte = dist(mouseX, mouseY, width / 2, height / 2);
    let durchmesser = map(distMitte, 0, width / 2, 10, 500);

    // Distanz von Maus zu jeder Ellipsensäule
    let distEllipse = dist(mouseX, mouseY, i * 200, height / 2);
    let posY = map(distEllipse, 0, width, -300, 300);

    ellipse(i * 200, height / 2 - posY, durchmesser, durchmesser);
    ellipse(i * 200, height / 2 + posY, durchmesser, durchmesser);
    ellipse(i * 200, height / 4 + posY, durchmesser, durchmesser);
    ellipse(i * 200, height / 4 - posY, durchmesser, durchmesser);
    ellipse(i * 200, height / 8 + posY, durchmesser, durchmesser);
    ellipse(i * 200, height / 8 - posY, durchmesser, durchmesser);
    ellipse(i * 200, height / 6 + posY, durchmesser, durchmesser);
    ellipse(i * 200, height / 6 - posY, durchmesser, durchmesser);
  }
}



  




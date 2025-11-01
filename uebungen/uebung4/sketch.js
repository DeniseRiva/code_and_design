let drehWinkel = 0

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
}

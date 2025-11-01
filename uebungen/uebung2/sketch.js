let posX = 0;
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
 

  if (posX < windowWidth - 50) {
    //falls die Bedingung zutrifft

    posX = posX + 5; //posX++
  }

}


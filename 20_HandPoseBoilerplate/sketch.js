let handpose;
let video;
let hands = [];
let ratio;
let isModelReady = false;

// Kleine Finger Funken
let pinkyTrails = [[], []]; // max. 2 Hände

// Fallende Funken für Peace
let fallingParticles = [];

function preload() {
  handpose = ml5.handPose();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  ratio = width / video.width;

  handpose.detectStart(video, gotHands);
}

function draw() {
  background(0);

  // Kamera + Spiegelung
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width * ratio, video.height * ratio);

  if (isModelReady) {
    drawHandPoints();
  }
  pop();

  // Peace-Text & fallende Funken
  for (let h = 0; h < hands.length; h++) {
    if (detectPeace(hands[h])) {
      drawPeaceText();
      spawnFallingParticles();
    }
  }

  // Update & zeichne fallende Funken
  updateFallingParticles();

  // Kleine Finger Funken-Spur
  drawPinkyTrails();
}

function gotHands(results) {
  hands = results;
  if (hands.length > 0) isModelReady = true;
}

// --- Punkte, Skelett, magische Kugel ---
function drawHandPoints() {
  for (let h = 0; h < hands.length; h++) {
    const hand = hands[h];

    // Punkte weiß
    for (let j = 0; j < hand.keypoints.length; j++) {
      const kp = hand.keypoints[j];
      fill(255);
      noStroke();
      circle(kp.x * ratio, kp.y * ratio, 10);
    }

    // Skelett
    stroke(255);
    strokeWeight(3);
    const fingers = [
      [0, 1, 2, 3, 4],
      [0, 5, 6, 7, 8],
      [0, 9, 10, 11, 12],
      [0, 13, 14, 15, 16],
      [0, 17, 18, 19, 20]
    ];
    for (let f = 0; f < fingers.length; f++) {
      for (let k = 0; k < fingers[f].length - 1; k++) {
        const a = hand.keypoints[fingers[f][k]];
        const b = hand.keypoints[fingers[f][k + 1]];
        line(a.x * ratio, a.y * ratio, b.x * ratio, b.y * ratio);
      }
    }

    // Magische Kugel beim Pinch
    const tips = getThumbAndIndex(hand);
    if (tips) {
      const tx = tips.thumb.x * ratio;
      const ty = tips.thumb.y * ratio;
      const ix = tips.index.x * ratio;
      const iy = tips.index.y * ratio;

      const d = dist(tx, ty, ix, iy);
      if (d < 40) drawMagicOrb((tx + ix) / 2, (ty + iy) / 2, 50);
    }

    // Kleine Finger Spur sammeln
    const pinkyTip = hand.keypoints[20];
    if (!pinkyTrails[h]) pinkyTrails[h] = [];
    pinkyTrails[h].push({
      x: pinkyTip.x * ratio,
      y: pinkyTip.y * ratio,
      t: millis()
    });
  }
}

// Thumb + Index Finger Spitze
function getThumbAndIndex(hand) {
  if (hand.annotations) {
    const t = hand.annotations.thumb[3];
    const i = hand.annotations.indexFinger[3];
    return { thumb: { x: t[0], y: t[1] }, index: { x: i[0], y: i[1] } };
  }
  if (hand.landmarks) {
    const t = hand.landmarks[4];
    const i = hand.landmarks[8];
    return { thumb: { x: t[0], y: t[1] }, index: { x: i[0], y: i[1] } };
  }
  if (hand.keypoints) {
    const t = hand.keypoints[4];
    const i = hand.keypoints[8];
    return { thumb: { x: t.x, y: t.y }, index: { x: i.x, y: i.y } };
  }
  return null;
}

// --- Magische Kugel ---
function drawMagicOrb(x, y, size) {
  push();
  noStroke();
  let t = millis() * 0.005;
  fill(50, 200, 255, 150 + 50 * sin(t * 10));
  ellipse(x, y, size * 1.5, size * 1.5);
  fill(0, 200, 255, 200);
  ellipse(x, y, size, size);
  pop();
}

// Peace-Erkennung
function detectPeace(hand) {
  const kp = hand.keypoints;
  const wrist = kp[0];
  const indexTip = kp[8];
  const middleTip = kp[12];
  const ringTip = kp[16];
  const pinkyTip = kp[20];

  const handSize = dist(wrist.x, wrist.y, middleTip.x, middleTip.y);

  const indexUp = wrist.y - indexTip.y > handSize * 0.4;
  const middleUp = wrist.y - middleTip.y > handSize * 0.4;
  const ringDown = wrist.y - ringTip.y < handSize * 0.2;
  const pinkyDown = wrist.y - pinkyTip.y < handSize * 0.2;

  const distIM = dist(indexTip.x, indexTip.y, middleTip.x, middleTip.y);
  const Vshape = distIM > handSize * 0.25;

  return indexUp && middleUp && ringDown && pinkyDown && Vshape;
}

// Peace Text
function drawPeaceText() {
  push();
  textAlign(CENTER, CENTER);
  fill(0, 255, 200);
  textSize(50);
  text("Good Vibes", width / 2, 100);
  pop();
}

// --- Fallende Funken für Peace ---
function spawnFallingParticles() {
  for (let i = 0; i < 3; i++) {
    fallingParticles.push({
      x: random(width),
      y: -10,
      size: random(5, 12),
      speed: random(2, 5),
      color: [random(100, 255), random(100, 255), 255]
    });
  }
}

function updateFallingParticles() {
  for (let i = fallingParticles.length - 1; i >= 0; i--) {
    let p = fallingParticles[i];
    fill(...p.color);
    noStroke();
    ellipse(p.x, p.y, p.size);
    p.y += p.speed;
    if (p.y > height + 10) fallingParticles.splice(i, 1);
  }
}

// Kleine Finger Funken-Spur
function drawPinkyTrails() {
  const now = millis();
  strokeWeight(3);

  for (let h = 0; h < pinkyTrails.length; h++) {
    if (!pinkyTrails[h]) continue;
    for (let i = pinkyTrails[h].length - 1; i > 0; i--) {
      let p1 = pinkyTrails[h][i];
      let p0 = pinkyTrails[h][i - 1];

      if (now - p1.t > 3000) {
        pinkyTrails[h].splice(i, 1);
        continue;
      }

      let alpha = map(now - p1.t, 0, 3000, 255, 0);
      stroke(255, 0, 255, alpha);
      line(p0.x, p0.y, p1.x, p1.y);
    }
  }
}

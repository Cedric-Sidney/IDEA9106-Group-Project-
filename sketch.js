function setup() {
  let size = Math.min(windowWidth, windowHeight);
  createCanvas(size,size);
}

function draw() {
  background(220);
  circle(0,0,size/6);
}



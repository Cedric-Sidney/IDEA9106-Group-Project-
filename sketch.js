class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  // Draw a single circle
  display() {
    stroke(0);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }

  // Draw multiple circles along a line
  static displayLine(count, startX, startY, stepX, stepY, r) {
    for (let i = 0; i < count; i++) {
      let x = startX + stepX * i;
      let y = startY + stepY * i;
      let c = new Circle(x, y, r);
      c.display();
    }
  }
}

function setup() {
  let size = min(windowWidth, windowHeight);
  createCanvas(size,size); // Initial canvas size
}

function draw() {
  background(220);

  let r = width / 8; // Radius adjusts based on canvas width
  let  

  // Draw 5 circles along the diagona
  Circle.displayLine(
    5,
    width / 7.1,
    height / 7.1,
    width / 4.8,
    height / 4.8,
    r
  );

  Circle.displayLine(
    4,
    width / 2,
    height * 2 / 20,
    width / 4.8,
    height / 4.8,
    r
  );

  Circle.displayLine(
    2,
    width * 4 / 5,
    0,
    width / 4.8,
    height / 4.8,
    r
  );

  Circle.displayLine(
    4,
    width / 20,
    height / 2.2,
    width / 4.8,
    height / 4.8,
    r
  );

  Circle.displayLine(
    2,
    0,
    height * 8 / 10,
    width / 4.8,
    height / 4.8,
    r
  );
}

// Automatically adjust canvas size when window is resized
function windowResized() {
  let size = min(windowWidth, windowHeight);
  resizeCanvas(size, size);
}

colors = {
  nightIndigo: color(30, 40, 80),      // dark indigo background
  desertRed: color(207, 60, 45),       // deep earthy red
  fireOrange: color(245, 140, 40),     // vibrant orange, warm contrast
  sandYellow: color(238, 200, 70),     // sandy yellow for connectors
  jungleGreen: color(76, 165, 60),     // bright leaf green
  coralPink: color(236, 100, 150),     // coral pink accent
  royalPurple: color(155, 80, 180),    // saturated purple
  oceanBlue: color(70, 130, 210),      // deep sky blue
  whiteClay: color(250, 245, 230),     // light clay white for dots
};

class innerCircle{
    constructor(startX, startY, stepX, stepY, count, mainR, smallR) {
    this.startX = startX;
    this.startY = startY;
    this.stepX = stepX;
    this.stepY = stepY;
    this.count = count;
    this.mainR = mainR;
    this.smallR = smallR;
  }
}


class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  // 画单个圆
  display() {
    stroke(0);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }

  // 在一条线上画多个圆
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
  createCanvas(size,size); // 初始画布大小
}

function draw() {
  background(220);

  let r = width / 8; // 半径随画布宽度变化

  // 在对角线上画 5 个圆
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

// 当窗口大小变化时自动调整画布
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

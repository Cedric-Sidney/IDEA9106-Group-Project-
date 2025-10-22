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
  let size = Math.min(windowWidth, windowHeight);
  createCanvas(size, size);
}

function draw() {
  background(220);

  let r = width / 7.4;

  // 在对角线上画 5 个圆
  Circle.displayLine(
    5,                  // 圆的数量
    width / 7.1,        // 起始 x
    height / 7.1,       // 起始 y
    width / 4.8,        // 每次 x 增量
    height / 4.8,       // 每次 y 增量
    r                   // 半径
  );
  Circle.displayLine(
    5,                  // 圆的数量
    width *2/ 5,        // 起始 x
    height *2/ 20,       // 起始 y
    width / 4.8,        // 每次 x 增量
    height / 4.8,       // 每次 y 增量
    r                   // 半径
  );
}

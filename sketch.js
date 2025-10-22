class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  // 画单个圆（最外层轮廓）
  display() {
    // 先画大圆底色
    fill("white");
    stroke(0);
    strokeWeight(2);
    ellipse(this.x, this.y, this.r * 2);
  }

displayDotPattern() {
  let dotSize = this.r * 0.04;   // 小点大小
  let dotSpacing = this.r * 0.1; // 点之间的目标间距（像素）
  fill("green");
  noStroke();

  let i = 0;
  for (let radius = this.r/1.8; radius < this.r; radius += dotSpacing) {
    // 每一圈的周长
    let circumference = TWO_PI * radius;
    // 这一圈的点数（向下取整）
    let dotCount = floor(circumference / dotSpacing);
    // 每个点的角度步长
    let angleStep = TWO_PI / dotCount;

    // 给每一圈一个固定偏移，避免对齐
    let offset = i * (TWO_PI / 36);

    for (let j = 0; j < dotCount; j++) {
      let angle = j * angleStep + offset;
      let px = this.x + cos(angle) * radius;
      let py = this.y + sin(angle) * radius;
      ellipse(px, py, dotSize * 2);
    }
    i++;
  }
}



  // 画内部同心圆（最内层）
  displayInnerDots() {
    fill("purple");
    stroke("orange");
    strokeWeight(10);
    ellipse(this.x, this.y, this.r);

    noFill();
    strokeWeight(4);
    ellipse(this.x, this.y, this.r / 1.2);

    strokeWeight(4);
    ellipse(this.x, this.y, this.r / 1.5);

    noStroke();
    fill("gray");
    ellipse(this.x, this.y, this.r / 2);
    fill("black");
    noStroke();
    ellipse(this.x, this.y, 2 * this.r / 5);
    fill("green");
    ellipse(this.x, this.y, this.r / 3.3);
    fill("white");
    ellipse(this.x, this.y, this.r / 6);
  }

  // 在一条线上画多个圆
  static displayLine(count, startX, startY, stepX, stepY, r) {
    for (let i = 0; i < count; i++) {
      let x = startX + stepX * i;
      let y = startY + stepY * i;
      let c = new Circle(x, y, r);
      
      // 按顺序画三层
      c.display();           // 1. 外层底色
      c.displayDotPattern(); // 2. 中层点状纹理
      c.displayInnerDots();  // 3. 内层同心圆
    }
  }
}

let colors;

function setup() {
  colors = {
    nightIndigo: color(0, 96, 137),
    desertRed: color(207, 60, 45),
    fireOrange: color(245, 140, 40),
    sandYellow: color(238, 200, 70),
    jungleGreen: color(76, 165, 60),
    coralPink: color(236, 100, 150),
    royalPurple: color(155, 80, 180),
    oceanBlue: color(70, 130, 210),
    whiteClay: color(250, 245, 230),
  };

  let size = min(windowWidth, windowHeight);
  createCanvas(size, size);
}

function draw() {
  background(colors.nightIndigo);

  let r = width / 8;

  // 在对角线上画 5 个圆
  Circle.displayLine(5, width / 7.1, height / 7.1, width / 4.8, height / 4.8, r);

  Circle.displayLine(4, width / 2, height * 2 / 20, width / 4.8, height / 4.8, r);

  Circle.displayLine(2, width * 4 / 5, 0, width / 4.8, height / 4.8, r);

  Circle.displayLine(4, width / 20, height / 2.2, width / 4.8, height / 4.8, r);

  Circle.displayLine(2, 0, height * 8 / 10, width / 4.8, height / 4.8, r);
}

// 当窗口大小变化时自动调整画布
function windowResized() {
  let size = min(windowWidth, windowHeight);
  resizeCanvas(size, size);
}
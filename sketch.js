class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.patternType = floor(random(14));
    this.colorScheme = floor(random(5));
    this.irregularity = random(0.02, 0.05);
  }

  getBackgroundColor() {
    const bgColors = [
      [245, 140, 40],
      [236, 100, 150],
      [155, 80, 180],
      [76, 165, 60],
      [238, 200, 70]
    ];
    return color(...bgColors[this.colorScheme]);
  }

  getPatternColors() {
    const patterns = [
      [[255, 30, 157], [255, 255, 255]],
      [[6, 255, 165], [255, 255, 255]],
      [[238, 200, 70], [255, 255, 255]],
      [[255, 107, 53], [0, 0, 0]],
      [[155, 80, 180], [255, 255, 255]]
    ];
    return [color(...patterns[this.colorScheme][0]), color(...patterns[this.colorScheme][1])];
  }

  drawHandDrawnCircle(x, y, r, fillCol, strokeCol, strokeW) {
    fill(fillCol);
    stroke(strokeCol);
    strokeWeight(strokeW);
    
    beginShape();
    let points = 60;
    for (let i = 0; i <= points; i++) {
      let angle = (TWO_PI / points) * i;
      let jitter = random(-r * this.irregularity, r * this.irregularity);
      let radius = r + jitter;
      let px = x + cos(angle) * radius;
      let py = y + sin(angle) * radius;
      curveVertex(px, py);
    }
    endShape(CLOSE);
  }

  display() {
    this.drawHandDrawnCircle(
      this.x, 
      this.y, 
      this.r, 
      this.getBackgroundColor(), 
      color(0), 
      2
    );
  }
  //pattern inside big cirlce
  //case 0 of 13
  displayDotPattern() {
    let dotSize = this.r * 0.04;
    let dotSpacing = this.r * 0.1;
    let colors = this.getPatternColors();
    fill(colors[0]);
    noStroke();

    let i = 0;
    for (let radius = this.r/1.8; radius < this.r; radius += dotSpacing) {
      let circumference = TWO_PI * radius;
      let dotCount = floor(circumference / dotSpacing);
      let angleStep = TWO_PI / dotCount;
      let offset = i * (TWO_PI / 36);

      for (let j = 0; j < dotCount; j++) {
        let angle = j * angleStep + offset;
        let jitterAngle = angle + random(-0.1, 0.1);
        let jitterRadius = radius + random(-this.r * 0.02, this.r * 0.02);
        let px = this.x + cos(jitterAngle) * jitterRadius;
        let py = this.y + sin(jitterAngle) * jitterRadius;
        let jitterSize = dotSize * random(0.8, 1.2);
        ellipse(px, py, jitterSize * 2);
      }
      i++;
    }
  }
  //case 1 of 13
  displayRadialLines() {
    let colors = this.getPatternColors();
    let numLines = 32;
    let innerRadius = this.r * 0.35;
    let outerRadius = this.r * 0.9;

    strokeWeight(this.r * 0.015);
    
    for (let i = 0; i < numLines; i++) {
      stroke(colors[i % 2]);
      let angle = (TWO_PI / numLines) * i;
      
      noFill();
      beginShape();
      
      for (let t = 0; t <= 1; t += 0.2) {
        let currentRadius = lerp(innerRadius, outerRadius, t);
        let jitterAngle = angle + random(-0.05, 0.05);
        let jitterRadius = currentRadius + random(-this.r * 0.02, this.r * 0.02);
        let px = this.x + cos(jitterAngle) * jitterRadius;
        let py = this.y + sin(jitterAngle) * jitterRadius;
        curveVertex(px, py);
      }
      
      endShape();
    }
  }
  //case 2 of 13
  displayConcentricRings() {
    let colors = this.getPatternColors();
    let numRings = 5;
    let startRadius = this.r * 0.6;
    let endRadius = this.r * 0.95;
    let ringSpacing = (endRadius - startRadius) / numRings;

    noFill();
    strokeWeight(this.r * 0.025);

    for (let i = 0; i < numRings; i++) {
      stroke(colors[i % 2]);
      let radius = startRadius + i * ringSpacing;
      
      beginShape();
      let points = 50;
      for (let j = 0; j <= points; j++) {
        let angle = (TWO_PI / points) * j;
        let jitter = random(-radius * 0.03, radius * 0.03);
        let r = radius + jitter;
        let px = this.x + cos(angle) * r;
        let py = this.y + sin(angle) * r;
        curveVertex(px, py);
      }
      endShape(CLOSE);
    }
  }
  //case 3 of 13
  displayDenseSmallDots() {
    let colors = this.getPatternColors();
    let dotSize = this.r * 0.025;
    let spacing = this.r * 0.08;
    
    fill(colors[0]);
    noStroke();

    for (let radius = this.r/2; radius < this.r; radius += spacing) {
      let circumference = TWO_PI * radius;
      let dotCount = floor(circumference / spacing);
      let angleStep = TWO_PI / dotCount;

      for (let j = 0; j < dotCount; j++) {
        let angle = j * angleStep;
        let jitterAngle = angle + random(-0.15, 0.15);
        let jitterRadius = radius + random(-this.r * 0.03, this.r * 0.03);
        let px = this.x + cos(jitterAngle) * jitterRadius;
        let py = this.y + sin(jitterAngle) * jitterRadius;
        let jitterSize = dotSize * random(0.7, 1.3);
        ellipse(px, py, jitterSize * 2);
      }
    }
  }
  //case 4 of 13
  displaySpiralDots() {
    let colors = this.getPatternColors();
    let dotSize = this.r * 0.035;
    let numDots = 80;
    let goldenAngle = 137.5;
    
    fill(colors[0]);
    noStroke();
    
    for (let i = 0; i < numDots; i++) {
      let angle = radians(i * goldenAngle);
      let radius = this.r * 0.9 * sqrt(i / numDots);
      let jitterAngle = angle + random(-0.15, 0.15);
      let jitterRadius = radius + random(-this.r * 0.03, this.r * 0.03);
      let px = this.x + cos(jitterAngle) * jitterRadius;
      let py = this.y + sin(jitterAngle) * jitterRadius;
      let jitterSize = dotSize * random(0.7, 1.3);
      ellipse(px, py, jitterSize * 2);
    }
  }
  //case 5 of 13
  displayCrossLines() {
    let colors = this.getPatternColors();
    let numLines = 16;
    let radius = this.r * 0.85;
    
    strokeWeight(this.r * 0.02);
    
    for (let i = 0; i < numLines; i++) {
      stroke(colors[i % 2]);
      let angle1 = (TWO_PI / numLines) * i;
      
      noFill();
      beginShape();
      for (let t = 0; t <= 1; t += 0.15) {
        let currentRadius = lerp(-radius, radius, t);
        let jitterAngle = angle1 + random(-0.05, 0.05);
        let jitterRadius = currentRadius + random(-this.r * 0.03, this.r * 0.03);
        let px = this.x + cos(jitterAngle) * jitterRadius;
        let py = this.y + sin(jitterAngle) * jitterRadius;
        curveVertex(px, py);
      }
      endShape();
    }
  }
  //case 6 of 13
  displayWavyRings() {
    let colors = this.getPatternColors();
    let numRings = 6;
    
    noFill();
    strokeWeight(this.r * 0.02);
    
    for (let ring = 0; ring < numRings; ring++) {
      stroke(colors[ring % 2]);
      let baseRadius = this.r * (0.55 + ring * 0.08);
      
      beginShape();
      let points = 60;
      for (let i = 0; i <= points; i++) {
        let angle = (TWO_PI / points) * i;
        let wave = sin(angle * 6) * this.r * 0.03;
        let jitter = random(-this.r * 0.015, this.r * 0.015);
        let radius = baseRadius + wave + jitter;
        let px = this.x + cos(angle) * radius;
        let py = this.y + sin(angle) * radius;
        curveVertex(px, py);
      }
      endShape(CLOSE);
    }
  }
  //case 7 of 13
  displayTriangleDots() {
    let colors = this.getPatternColors();
    let size = this.r * 0.08;
    let spacing = this.r * 0.15;
    
    fill(colors[0]);
    noStroke();
    
    for (let radius = this.r * 0.6; radius < this.r; radius += spacing) {
      let count = floor(TWO_PI * radius / spacing);
      let angleStep = TWO_PI / count;
      
      for (let j = 0; j < count; j++) {
        let angle = j * angleStep + random(-0.15, 0.15);
        let jitterRadius = radius + random(-this.r * 0.04, this.r * 0.04);
        let px = this.x + cos(angle) * jitterRadius;
        let py = this.y + sin(angle) * jitterRadius;
        
        push();
        translate(px, py);
        rotate(angle + random(-0.3, 0.3));
        
        beginShape();
        for (let i = 0; i < 3; i++) {
          let a = (TWO_PI / 3) * i - PI / 2;
          let jitter = random(-size * 0.15, size * 0.15);
          let s = size * random(0.8, 1.2);
          let vx = cos(a) * (s / 2 + jitter);
          let vy = sin(a) * (s / 2 + jitter);
          curveVertex(vx, vy);
        }
        for (let i = 0; i < 2; i++) {
          let a = (TWO_PI / 3) * i - PI / 2;
          let jitter = random(-size * 0.15, size * 0.15);
          let s = size * random(0.8, 1.2);
          let vx = cos(a) * (s / 2 + jitter);
          let vy = sin(a) * (s / 2 + jitter);
          curveVertex(vx, vy);
        }
        endShape(CLOSE);
        pop();
      }
    }
  }
  //case 8 of 13
  displayGridDots() {
    let colors = this.getPatternColors();
    let dotSize = this.r * 0.04;
    let spacing = this.r * 0.12;
    
    fill(colors[0]);
    noStroke();
    
    for (let x = -this.r; x <= this.r; x += spacing) {
      for (let y = -this.r; y <= this.r; y += spacing) {
        let px = this.x + x + random(-spacing * 0.25, spacing * 0.25);
        let py = this.y + y + random(-spacing * 0.25, spacing * 0.25);
        if (dist(this.x, this.y, px, py) < this.r * 0.9) {
          let jitterSize = dotSize * random(0.6, 1.4);
          ellipse(px, py, jitterSize * 2);
        }
      }
    }
  }
  //case 9 of 13
  displayDoubleRadial() {
    let colors = this.getPatternColors();
    let numLines = 24;
    let innerRadius = this.r * 0.35;
    let outerRadius = this.r * 0.9;
    
    for (let i = 0; i < numLines; i++) {
      stroke(colors[i % 2]);
      strokeWeight(i % 2 === 0 ? this.r * 0.025 : this.r * 0.01);
      let angle = (TWO_PI / numLines) * i;
      
      noFill();
      beginShape();
      for (let t = 0; t <= 1; t += 0.15) {
        let currentRadius = lerp(innerRadius, outerRadius, t);
        let jitterAngle = angle + random(-0.06, 0.06);
        let jitterRadius = currentRadius + random(-this.r * 0.03, this.r * 0.03);
        let px = this.x + cos(jitterAngle) * jitterRadius;
        let py = this.y + sin(jitterAngle) * jitterRadius;
        curveVertex(px, py);
      }
      endShape();
    }
  }
  //case 10 of 13
  displayArcLines() {
    let colors = this.getPatternColors();
    let numArcs = 12;
    
    noFill();
    strokeWeight(this.r * 0.02);
    
    for (let i = 0; i < numArcs; i++) {
      stroke(colors[i % 2]);
      let startAngle = (TWO_PI / numArcs) * i;
      let endAngle = startAngle + PI / 2;
      
      beginShape();
      for (let angle = startAngle; angle <= endAngle; angle += 0.08) {
        let radius = this.r * 0.75 + random(-this.r * 0.03, this.r * 0.03);
        let jitterAngle = angle + random(-0.05, 0.05);
        let px = this.x + cos(jitterAngle) * radius;
        let py = this.y + sin(jitterAngle) * radius;
        curveVertex(px, py);
      }
      endShape();
    }
  }
  //case 11 of 13
  displayStarRadial() {
    let colors = this.getPatternColors();
    let numPoints = 16;
    
    strokeWeight(this.r * 0.02);
    
    for (let i = 0; i < numPoints; i++) {
      stroke(colors[i % 2]);
      let angle = (TWO_PI / numPoints) * i;
      let innerR = this.r * 0.3;
      let outerR = i % 2 === 0 ? this.r * 0.9 : this.r * 0.7;
      
      noFill();
      beginShape();
      for (let t = 0; t <= 1; t += 0.2) {
        let currentRadius = lerp(innerR, outerR, t);
        let jitterAngle = angle + random(-0.06, 0.06);
        let jitterRadius = currentRadius + random(-this.r * 0.03, this.r * 0.03);
        let px = this.x + cos(jitterAngle) * jitterRadius;
        let py = this.y + sin(jitterAngle) * jitterRadius;
        curveVertex(px, py);
      }
      endShape();
    }
  }
  //case 12 of 13
  displayRingsWithDots() {
    let colors = this.getPatternColors();
    
    noFill();
    strokeWeight(this.r * 0.02);
    for (let i = 0; i < 3; i++) {
      stroke(colors[0]);
      let radius = this.r * (0.6 + i * 0.12);
      beginShape();
      let points = 50;
      for (let j = 0; j <= points; j++) {
        let angle = (TWO_PI / points) * j;
        let jitter = random(-radius * 0.04, radius * 0.04);
        let r = radius + jitter;
        let px = this.x + cos(angle) * r;
        let py = this.y + sin(angle) * r;
        curveVertex(px, py);
      }
      endShape(CLOSE);
    }
    
    fill(colors[1]);
    noStroke();
    let dotSize = this.r * 0.03;
    for (let i = 0; i < 3; i++) {
      let radius = this.r * (0.65 + i * 0.12);
      let dotCount = 16;
      let angleStep = TWO_PI / dotCount;
      for (let j = 0; j < dotCount; j++) {
        let angle = j * angleStep + random(-0.15, 0.15);
        let jitterRadius = radius + random(-this.r * 0.03, this.r * 0.03);
        let px = this.x + cos(angle) * jitterRadius;
        let py = this.y + sin(angle) * jitterRadius;
        let jitterSize = dotSize * random(0.7, 1.3);
        ellipse(px, py, jitterSize * 2);
      }
    }
  }
  //case 13 of 13
  displayHexagons() {
    let colors = this.getPatternColors();
    let hexSize = this.r * 0.1;
    
    noFill();
    stroke(colors[0]);
    strokeWeight(this.r * 0.015);
    
    for (let row = -4; row <= 4; row++) {
      for (let col = -4; col <= 4; col++) {
        let xOffset = col * hexSize * 1.5;
        let yOffset = row * hexSize * sqrt(3) + (col % 2) * hexSize * sqrt(3) / 2;
        let px = this.x + xOffset + random(-hexSize * 0.1, hexSize * 0.1);
        let py = this.y + yOffset + random(-hexSize * 0.1, hexSize * 0.1);
        
        if (dist(this.x, this.y, px, py) < this.r * 0.85) {
          beginShape();
          for (let i = 0; i <= 6; i++) {
            let angle = PI / 3 * i;
            let jitter = random(-hexSize * 0.08, hexSize * 0.08);
            let size = hexSize * 0.45 * random(0.9, 1.1);
            let vx = px + cos(angle) * (size + jitter);
            let vy = py + sin(angle) * (size + jitter);
            curveVertex(vx, vy);
          }
          endShape(CLOSE);
        }
      }
    }
  }
//pattern within big circle
  displayMiddlePattern() {
    switch(this.patternType) {
      case 0: this.displayDotPattern(); break;
      case 1: this.displayRadialLines(); break;
      case 2: this.displayConcentricRings(); break;
      case 3: this.displayDenseSmallDots(); break;
      case 4: this.displaySpiralDots(); break;
      case 5: this.displayCrossLines(); break;
      case 6: this.displayWavyRings(); break;
      case 7: this.displayTriangleDots(); break;
      case 8: this.displayGridDots(); break;
      case 9: this.displayDoubleRadial(); break;
      case 10: this.displayArcLines(); break;
      case 11: this.displayStarRadial(); break;
      case 12: this.displayRingsWithDots(); break;
      case 13: this.displayHexagons(); break;
    }
  }
  //
  displayInnerDots() {
    let colors = this.getPatternColors();
    
    this.drawHandDrawnCircle(
      this.x, 
      this.y, 
      this.r / 2, 
      colors[0], 
      colors[1], 
      this.r * 0.08
    );

    noFill();
    strokeWeight(this.r * 0.03);
    stroke(colors[0]);
    this.drawHandDrawnCircle(this.x, this.y, this.r / 2.4, color(0, 0), colors[0], this.r * 0.03);
    this.drawHandDrawnCircle(this.x, this.y, this.r / 3, color(0, 0), colors[0], this.r * 0.03);

    noStroke();
    this.drawHandDrawnCircle(this.x, this.y, this.r / 4, color(100), color(0, 0), 0);
    this.drawHandDrawnCircle(this.x, this.y, this.r / 5, color(0), color(0, 0), 0);
    this.drawHandDrawnCircle(this.x, this.y, this.r / 6.6, colors[0], color(0, 0), 0);
    this.drawHandDrawnCircle(this.x, this.y, this.r / 12, colors[1], color(0, 0), 0);
  }
  //red line
  static displayLine(count, startX, startY, stepX, stepY, r) {
    let circles = [];
    for (let i = 0; i < count; i++) {
      let x = startX + stepX * i;
      let y = startY + stepY * i;
      let c = new Circle(x, y, r);
      circles.push(c);

      c.display();
      c.displayMiddlePattern();
      c.displayInnerDots();
    }

    return circles;
  }
}

function drawConnectionDots() {
  let dotPositions = [
    {x: width * 0.15, y: height * 0.3},
    {x: width * 0.25, y: height * 0.15},
    {x: width * 0.45, y: height * 0.25},
    {x: width * 0.65, y: height * 0.15},
    {x: width * 0.75, y: height * 0.45},
    {x: width * 0.35, y: height * 0.55},
    {x: width * 0.15, y: height * 0.75},
    {x: width * 0.55, y: height * 0.65},
    {x: width * 0.85, y: height * 0.75}
  ];
  
  for (let pos of dotPositions) {
    fill(0);
    noStroke();
    let outerSize = width * 0.015;
    beginShape();
    for (let i = 0; i < 20; i++) {
      let angle = (TWO_PI / 20) * i;
      let jitter = random(-outerSize * 0.15, outerSize * 0.15);
      let r = outerSize / 2 + jitter;
      let px = pos.x + cos(angle) * r;
      let py = pos.y + sin(angle) * r;
      curveVertex(px, py);
    }
    endShape(CLOSE);
    
    fill(255);
    let innerSize = width * 0.008;
    beginShape();
    for (let i = 0; i < 20; i++) {
      let angle = (TWO_PI / 20) * i;
      let jitter = random(-innerSize * 0.15, innerSize * 0.15);
      let r = innerSize / 2 + jitter;
      let px = pos.x + cos(angle) * r;
      let py = pos.y + sin(angle) * r;
      curveVertex(px, py);
    }
    endShape(CLOSE);
  }
}

function addPaperTexture(circles) {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let noise = random(-20, 20);
    pixels[i] += noise;
    pixels[i + 1] += noise;
    pixels[i + 2] += noise;
  }
  updatePixels();

  console.log("圆的数量:", circles.length); // 调试：检查数组
  
  noStroke();
  // 为每个圆周围添加脏点
  for (let circle of circles) {
    let numDots = floor(random(6, 12)); // 每个圆6-12个脏点

    console.log("为圆添加", numDots, "个脏点"); // 调试：检查每个圆
    
    for (let i = 0; i < numDots; i++) {
      let angle = random(TWO_PI);
      let distance = circle.r + random(circle.r * 0.1, circle.r * 0.4); // 在圆外围分布
      let x = circle.x + cos(angle) * distance;
      let y = circle.y + sin(angle) * distance;
      let size = random(1, 4);
      fill(random(100, 150), random(40, 90));
      ellipse(x, y, size);
    }
  }
}



function setup() {
  let size = min(windowWidth, windowHeight);
  createCanvas(size, size);
  
  // 随机选择浅色背景
  const lightBackgrounds = [
    [175, 210, 180],  // 浅薄荷绿
    [180, 200, 210],  // 浅天空蓝
    [190, 165, 145],  // 浅土红色
    [210, 195, 165],  // 米黄色
    [165, 155, 185],  // 浅薰衣草紫
    [180, 195, 175],  // 浅橄榄绿
    [185, 180, 200],  // 浅灰紫色
    [200, 180, 170]   // 浅杏色
  ];
  
  bgColor = random(lightBackgrounds);
}

function draw() {
  background(bgColor[0], bgColor[1], bgColor[2]);

  let r = width / 8;
  let allCircles = [];

  allCircles = allCircles.concat(Circle.displayLine(5, width / 7.1, height / 7.1, width / 4.8, height / 4.8, r));
  allCircles = allCircles.concat(Circle.displayLine(4, width / 2, height * 2 / 20, width / 4.8, height / 4.8, r));
  allCircles = allCircles.concat(Circle.displayLine(2, width * 4 / 5, 0, width / 4.8, height / 4.8, r));
  allCircles = allCircles.concat(Circle.displayLine(4, width / 20, height / 2.2, width / 4.8, height / 4.8, r));
  allCircles = allCircles.concat(Circle.displayLine(2, 0, height * 8 / 10, width / 4.8, height / 4.8, r));
  
  drawConnectionDots();
  
  addPaperTexture(allCircles);
  
  noLoop();
}

function windowResized() {
  let size = min(windowWidth, windowHeight);
  resizeCanvas(size, size);
  redraw();
}
let placedCenters = [];
let bgColor;

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

  static displayLine(count, startX, startY, stepX, stepY, r) {
    for (let i = 0; i < count; i++) {
      let x = startX + stepX * i;
      let y = startY + stepY * i;
      let c = new Circle(x, y, r);
      c.display();
      c.displayMiddlePattern();
      c.displayInnerDots();
      placedCenters.push({ x, y, r });
    }
  }
}


function drawOuterNonOverlappingCircles() {
  if (placedCenters.length < 2) {
    const { x, y, r } = placedCenters[0] || {};
    if (x === undefined) return;
    const R = r * 1.25;
    noFill();
    stroke(0);
    strokeWeight(r * 0.06);
    const temp = new Circle(x, y, R);
    temp.drawHandDrawnCircle(x, y, R, color(0, 0, 0, 0), color(0), r * 0.06);
    return;
  }

  const gap = width * 0.01;
  const baseR = placedCenters[0].r;

  let minDist = Infinity;
  for (let i = 0; i < placedCenters.length; i++) {
    for (let j = i + 1; j < placedCenters.length; j++) {
      const dx = placedCenters[i].x - placedCenters[j].x;
      const dy = placedCenters[i].y - placedCenters[j].y;
      const d = Math.hypot(dx, dy);
      if (d < minDist) minDist = d;
    }
  }

  let Rmax = minDist / 2 - gap;
  const desired = baseR * 1.25;
  const R = Math.min(Rmax, desired);

  if (!(R > baseR)) {
    return;
  }

  noFill();
  stroke(0);
  strokeWeight(baseR * 0.06);

  for (const c of placedCenters) {
    const temp = new Circle(c.x, c.y, R);
    temp.drawHandDrawnCircle(c.x, c.y, R, color(0, 0, 0, 0), color(0), baseR * 0.06);
  }
}

// ===== 工具函数 =====

// 画珠子（黑外圈+白心）
function drawBead(x, y, s) {
  // 外圈 - 黑色
  fill(0);
  noStroke();
  let outerPoints = 20;
  beginShape();
  for (let i = 0; i < outerPoints; i++) {
    let angle = (TWO_PI / outerPoints) * i;
    let jitter = random(-s * 0.12, s * 0.12);
    let r = s / 2 + jitter;
    let px = x + cos(angle) * r;
    let py = y + sin(angle) * r;
    curveVertex(px, py);
  }
  // 闭合曲线
  for (let i = 0; i < 2; i++) {
    let angle = (TWO_PI / outerPoints) * i;
    let jitter = random(-s * 0.12, s * 0.12);
    let r = s / 2 + jitter;
    let px = x + cos(angle) * r;
    let py = y + sin(angle) * r;
    curveVertex(px, py);
  }
  endShape(CLOSE);
  
  // 内心 - 白色
  fill(255);
  let innerSize = s * 0.45;
  let innerPoints = 16;
  beginShape();
  for (let i = 0; i < innerPoints; i++) {
    let angle = (TWO_PI / innerPoints) * i;
    let jitter = random(-innerSize * 0.1, innerSize * 0.1);
    let r = innerSize / 2 + jitter;
    let px = x + cos(angle) * r;
    let py = y + sin(angle) * r;
    curveVertex(px, py);
  }
  for (let i = 0; i < 2; i++) {
    let angle = (TWO_PI / innerPoints) * i;
    let jitter = random(-innerSize * 0.1, innerSize * 0.1);
    let r = innerSize / 2 + jitter;
    let px = x + cos(angle) * r;
    let py = y + sin(angle) * r;
    curveVertex(px, py);
  }
  endShape(CLOSE);
}

// 画卵石状颗粒
function drawPebble(x, y, s, col) {
  fill(col);
  noStroke();
  let points = 12;
  beginShape();
  for (let i = 0; i < points; i++) {
    let angle = (TWO_PI / points) * i;
    let jitter = random(-s * 0.2, s * 0.2);
    let r = s / 2 * random(0.8, 1.2) + jitter;
    let px = x + cos(angle) * r;
    let py = y + sin(angle) * r;
    curveVertex(px, py);
  }
  for (let i = 0; i < 2; i++) {
    let angle = (TWO_PI / points) * i;
    let jitter = random(-s * 0.2, s * 0.2);
    let r = s / 2 * random(0.8, 1.2) + jitter;
    let px = x + cos(angle) * r;
    let py = y + sin(angle) * r;
    curveVertex(px, py);
  }
  endShape(CLOSE);
}

// 构建k近邻边
function buildNeighborEdges(k) {
  let edges = [];
  for (let i = 0; i < placedCenters.length; i++) {
    let neighbors = [];
    for (let j = 0; j < placedCenters.length; j++) {
      if (i === j) continue;
      let dx = placedCenters[i].x - placedCenters[j].x;
      let dy = placedCenters[i].y - placedCenters[j].y;
      let d = sqrt(dx * dx + dy * dy);
      neighbors.push({ index: j, dist: d });
    }
    neighbors.sort((a, b) => a.dist - b.dist);
    for (let n = 0; n < min(k, neighbors.length); n++) {
      let j = neighbors[n].index;
      // 避免重复边
      if (i < j) {
        edges.push({ i, j });
      }
    }
  }
  return edges;
}

// ===== 绘制珠子链路 =====
function drawBeadChains() {
  if (placedCenters.length < 2) return;
  
  const baseR = placedCenters[0].r;
  const edges = buildNeighborEdges(2); // k=2 近邻
  
  // 可调参数
  const amp = baseR * 0.10;           // 链路摆动幅度
  const beadSpacing = baseR * 0.35;   // 珠子间距
  const beadSize = baseR * 0.22;      // 珠子尺寸
  
  for (const edge of edges) {
    const c1 = placedCenters[edge.i];
    const c2 = placedCenters[edge.j];
    
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    const distance = sqrt(dx * dx + dy * dy);  // 改名避免冲突
    const angle = atan2(dy, dx);
    
    // 生成S形路径点
    let pathPoints = [];
    let steps = floor(distance / (beadSpacing * 0.5));
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let x = lerp(c1.x, c2.x, t);
      let y = lerp(c1.y, c2.y, t);
      
      // S形摆动
      let wave = sin(t * PI * 2) * amp;
      let perpX = -sin(angle);
      let perpY = cos(angle);
      
      x += perpX * wave;
      y += perpY * wave;
      
      pathPoints.push({ x, y });
    }
    
    // 沿路径放置珠子和卵石
    for (let i = 0; i < pathPoints.length - 1; i++) {
      let p1 = pathPoints[i];
      let p2 = pathPoints[i + 1];
      let segDist = dist(p1.x, p1.y, p2.x, p2.y);
      
      let numBeads = floor(segDist / beadSpacing);
      for (let b = 0; b < numBeads; b++) {
        let t = b / numBeads;
        let x = lerp(p1.x, p2.x, t);
        let y = lerp(p1.y, p2.y, t);
        
        // 交替放置珠子
        if (b % 2 === 0) {
          drawBead(x, y, beadSize);
        }
        
        // 随机夹杂橙黄卵石
        if (random() < 0.7) {
          let offsetX = random(-beadSpacing * 0.3, beadSpacing * 0.3);
          let offsetY = random(-beadSpacing * 0.3, beadSpacing * 0.3);
          let pebbleSize = baseR * random(0.16, 0.26);
          let pebbleColor = color(random(230, 250), random(150, 190), random(50, 90));
          drawPebble(x + offsetX, y + offsetY, pebbleSize, pebbleColor);
        }
      }
    }
  }
}

// ===== 绘制红色触须 =====
function drawTendrils() {
  if (placedCenters.length < 2) return;
  
  const baseR = placedCenters[0].r;
  const edges = buildNeighborEdges(3); // k=3 近邻用于触须
  
  for (let i = 0; i < placedCenters.length; i++) {
    // 触须出现概率
    if (random() < 0.55) {
      const c = placedCenters[i];
      
      // 找到相邻的边
      let relevantEdges = edges.filter(e => e.i === i || e.j === i);
      if (relevantEdges.length === 0) continue;
      
      // 随机选一条边
      let edge = random(relevantEdges);
      let target = (edge.i === i) ? placedCenters[edge.j] : placedCenters[edge.i];
      
      // 计算链路中点作为目标
      let midX = (c.x + target.x) / 2;
      let midY = (c.y + target.y) / 2;
      
      // 贝塞尔控制点
      let angle = atan2(target.y - c.y, target.x - c.x);
      let ctrlDist = dist(c.x, c.y, midX, midY) * random(0.3, 0.7);
      let ctrlAngle = angle + random(-PI/3, PI/3);
      let ctrlX = c.x + cos(ctrlAngle) * ctrlDist;
      let ctrlY = c.y + sin(ctrlAngle) * ctrlDist;
      
      // 绘制红色触须
      noFill();
      stroke(220, 40, 60);  // 红色
      strokeWeight(baseR * 0.06);
      
      // 手绘风贝塞尔曲线
      beginShape();
      let steps = 20;
      for (let t = 0; t <= 1; t += 1/steps) {
        let x = bezierPoint(c.x, ctrlX, ctrlX, midX, t);
        let y = bezierPoint(c.y, ctrlY, ctrlY, midY, t);
        let jitter = random(-baseR * 0.02, baseR * 0.02);
        curveVertex(x + jitter, y + jitter);
      }
      endShape();
    }
  }
}

function addPaperTexture() {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let noise = random(-20, 20);
    pixels[i] += noise;
    pixels[i + 1] += noise;
    pixels[i + 2] += noise;
  }
  updatePixels();
  
  noStroke();
  for (let i = 0; i < width * height / 500; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(1, 3);
    fill(random(100, 150), random(30, 80));
    ellipse(x, y, size);
  }
}

function setup() {
  let size = min(windowWidth, windowHeight);
  createCanvas(size, size);
  
  const lightBackgrounds = [
    [175, 210, 180],
    [180, 200, 210],
    [190, 165, 145],
    [210, 195, 165],
    [165, 155, 185],
    [180, 195, 175],
    [185, 180, 200],
    [200, 180, 170]
  ];
  
  bgColor = random(lightBackgrounds);
}

function draw() {
  background(bgColor[0], bgColor[1], bgColor[2]);

  let r = width / 8;

  placedCenters = [];
  
  // 1. 画主圆
  Circle.displayLine(5, width / 7.1, height / 7.1, width / 4.8, height / 4.8, r);
  Circle.displayLine(4, width / 2, height * 2 / 20, width / 4.8, height / 4.8, r);
  Circle.displayLine(2, width * 4 / 5, 0, width / 4.8, height / 4.8, r);
  Circle.displayLine(4, width / 20, height / 2.2, width / 4.8, height / 4.8, r);
  Circle.displayLine(2, 0, height * 8 / 10, width / 4.8, height / 4.8, r);
  
  // 2. 画外扩圆
 // drawOuterNonOverlappingCircles();
  
  // 3. 画珠子链路
  // drawBeadChains();
  
  // 4. 画红色触须
  drawTendrils();
  
  // 5. 添加纸张纹理
  addPaperTexture();
  
  noLoop();
}

function windowResized() {
  let size = min(windowWidth, windowHeight);
  resizeCanvas(size, size);
  redraw();
}
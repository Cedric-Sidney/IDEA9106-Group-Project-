
// ======================================================
// =================== CIRCLE CLASS ===================
// ======================================================

class Circle {
  /*
   * Each Circle object randomly selects pattern types for its outer, middle,
     and inner layers. This modular structure expands on the OOP techniques from class,
     enabling controlled variation through generative rules.
   */
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r; 

    this.outerPatternType = floor(random(4)); 
    this.middlePatternType = floor(random(4)); 
    this.innerPatternType = floor(random(2)); 

    this.irregularity = 0.02; 
  }

  // --- Drawing utilities ---
  drawIrregularBlob(x, y, size, col) {
    fill(col);
    noStroke();
    push();
    translate(x, y);
    rotate(random(TWO_PI));
    beginShape();
    let points = 8;
    for (let i = 0; i < points; i++) {
      let angle = TWO_PI / points * i;
      let r = size * 0.5 * random(0.85, 1.15); 
      curveVertex(cos(angle) * r, sin(angle) * r);
    }
    endShape(CLOSE);
    pop();
  }


  drawHandDrawnCircle(x, y, r, fillCol, strokeCol, strokeW) {
    if (fillCol) fill(fillCol); else noFill();
    if (strokeCol) stroke(strokeCol); else noStroke();
    if (strokeW) strokeWeight(strokeW);

    beginShape();
    let points = 50; 
    for (let i = 0; i <= points; i++) {
        let angle = (TWO_PI / points) * i;
        let jitter = random(-r * 0.01, r * 0.01); 
        let radius = r + jitter;
        curveVertex(x + cos(angle) * radius, y + sin(angle) * radius);
    }
    endShape(CLOSE);
  }


  drawHandDrawnEllipse(x, y, w, h, rotation, col) {
    fill(col);
    noStroke();
    push();
    translate(x, y);
    rotate(rotation);
    beginShape();
    let points = 12; 
    for (let i = 0; i <= points; i++) {
      let angle = (TWO_PI / points) * i;
      let rx = (w / 2) + random(-w * 0.2, w * 0.2); 
      let ry = (h / 2) + random(-h * 0.2, h * 0.2);
      let px = rx * cos(angle);
      let py = ry * sin(angle);
      curveVertex(px, py);
    }
    endShape(CLOSE);
    pop(); 
  }

  display() {
    this.drawHandDrawnCircle(this.x, this.y, this.r * 1.05, globalBgColor, null, 0);
    this.displayOuterPattern();  
    this.displayMiddlePattern(); 
    this.displayInnerPattern();  
  }

  // ================= OUTER PATTERNS =================
  displayOuterPattern() {
    let baseColor = random(circleBasePalette);
    this.drawHandDrawnCircle(this.x, this.y, this.r, baseColor, color(0, 50), 2);
    let patCol = random(dotPalette);

    switch (this.outerPatternType) {
      case 0: this.drawOuterDotsPattern(patCol); break;
      case 1: this.drawOuterRadiatingLinesPattern(patCol); break;
      case 2: this.drawOuterStripedRingPattern(patCol); break;
      case 3: this.drawOuterRadialDashPattern(patCol); break; 
    }
  }

  drawOuterDotsPattern(col) {
    let dotSize = this.r * 0.07; 
    let dotSpacing = this.r * 0.09; 
    for (let radius = this.r * 0.65; radius < this.r * 0.95; radius += dotSpacing) { 
      let count = floor((TWO_PI * radius) / dotSpacing);
      for (let i = 0; i < count; i++) {
        let angle = (TWO_PI / count) * i;
        let px = this.x + cos(angle) * radius;
        let py = this.y + sin(angle) * radius;
        this.drawIrregularBlob(px, py, dotSize, col);
      }
    }
  }

  drawOuterRadiatingLinesPattern(col) {
    let numLines = 40;
    stroke(col);
    strokeWeight(this.r * 0.015);
    strokeCap(ROUND);
    for (let i = 0; i < numLines; i++) {
      let angle = (TWO_PI / numLines) * i + random(-0.05, 0.05);
      let x1 = this.x + cos(angle) * this.r * 0.6;
      let y1 = this.y + sin(angle) * this.r * 0.6;
      let x2 = this.x + cos(angle) * this.r * 0.95;
      let y2 = this.y + sin(angle) * this.r * 0.95;
      line(x1, y1, x2, y2);
      noStroke();
      this.drawIrregularBlob(x2, y2, this.r * 0.03, col);
      stroke(col);
    }
  }

  // 2. Thick striped ring pattern – dense version
  drawOuterStripedRingPattern(col) {
    noFill();
    stroke(col);
    // Base stroke weight for the stripes
    let baseStrokeWeight = this.r * 0.025; 
    // Number of concentric rings
    let numRings = 5; 
    for (let i = 0; i < numRings; i++) {
        let radius = map(i, 0, numRings - 1, this.r * 0.65, this.r * 0.9);
        strokeWeight(baseStrokeWeight * random(0.8, 1.2)); 
        this.drawHandDrawnCircle(this.x, this.y, radius, null, col, null);
    }
  }

  // 3. Sine-wave “spring” outer contour
  /*
   * This outer pattern applies a sinusoidal modulation to the circle’s radius.
   
   * While sin() was covered in class, using it to deform a circular boundary is
     an extended generative-art technique that creates rhythmic, organic structures.
     
   */

  drawOuterRadialDashPattern(col) {
    noFill(); 
    stroke(col); 
    strokeWeight(this.r * 0.025);
    let baseRadius = this.r * 0.73;
    let waveHeight = baseRadius * 0.30;
    let waveFrequency = 60;
    let totalPoints = 240;
    beginShape();
    for (let j = 0; j <= totalPoints; j++) {
      let angle = (TWO_PI / totalPoints) * j;
      let offset = sin(angle * waveFrequency) * waveHeight;
      let finalRadius = baseRadius + offset;
      finalRadius += random(-this.r * 0.005, this.r * 0.005);
      let px = this.x + cos(angle) * finalRadius;
      let py = this.y + sin(angle) * finalRadius;
      curveVertex(px, py);
    }
    endShape(CLOSE); 
  }

  // ================= MIDDLE PATTERNS =================
  displayMiddlePattern() {
    let midBgColor = random(circleBasePalette);
    this.drawHandDrawnCircle(this.x, this.y, this.r * 0.55, midBgColor, null, 0);
    let patCol = random(dotPalette);

    switch (this.middlePatternType) {
      case 0: this.drawMiddleConcentricDotsPattern(patCol); break;
      case 1: this.drawMiddleUshapePattern(patCol); break;
      case 2: this.drawMiddleSolidRings(patCol); break;
      case 3: this.drawMiddleConcentricIrregularLines(patCol); break; 
    }
  }

  drawMiddleConcentricDotsPattern(col) {
    let dotSize = this.r * 0.04;
    for (let r = this.r * 0.2; r < this.r * 0.5; r += dotSize * 1.5) {
      let count = floor((TWO_PI * r) / (dotSize * 1.5));
      for (let i = 0; i < count; i++) {
        let angle = (TWO_PI / count) * i;
        this.drawIrregularBlob(this.x + cos(angle)*r, this.y + sin(angle)*r, dotSize, col);
      }
    }
  }

  drawMiddleUshapePattern(col) {
    noFill();
    stroke(col);
    strokeWeight(this.r * 0.02);
    let count = 8;
    let r = this.r * 0.35;
    for (let i = 0; i < count; i++) {
      let angle = (TWO_PI / count) * i;
      push();
      translate(this.x + cos(angle) * r, this.y + sin(angle) * r);
      rotate(angle + PI/2); 
      arc(0, 0, this.r*0.15, this.r*0.15, 0, PI); 
      pop();
    }
  }

  drawMiddleSolidRings(col) {
    this.drawHandDrawnCircle(this.x, this.y, this.r * 0.45, col, null, 0);
    let col2 = random(dotPalette);
    this.drawHandDrawnCircle(this.x, this.y, this.r * 0.3, col2, null, 0);
  }

  // 3. Concentric hand-drawn irregular lines – dense version
  drawMiddleConcentricIrregularLines(col) {
    noFill();
    stroke(col);
    // Base stroke weight for the irregular rings
    let baseStrokeWeight = this.r * 0.01; 
    // Number of concentric irregular rings
    let numRings = 7; 
    for (let j = 0; j < numRings; j++) {
        let currentRadius = map(j, 0, numRings - 1, this.r * 0.2, this.r * 0.5);
        strokeWeight(baseStrokeWeight * random(0.8, 1.2)); 
        beginShape();
        let points = 25; 
        for (let i = 0; i <= points; i++) {
            let angle = (TWO_PI / points) * i;
            let jitter = random(-this.r * 0.025, this.r * 0.025); 
            let radius = currentRadius + jitter;
            curveVertex(this.x + cos(angle) * radius, this.y + sin(angle) * radius);
        }
        endShape(CLOSE);
    }
  }

  // ================= INNER PATTERN =================
  displayInnerPattern() {
    this.drawHandDrawnCircle(this.x, this.y, this.r * 0.25, random(circleBasePalette), null, 0);
    let patCol = random(dotPalette);
    
    if (this.innerPatternType === 0) {
       this.drawIrregularBlob(this.x, this.y, this.r * 0.15, patCol);
    } else {
       noFill();
       stroke(patCol);
       strokeWeight(this.r * 0.015);
       beginShape();
       for (let i = 0; i < 50; i++) {
         let r = map(i, 0, 50, 0, this.r * 0.2);
         let angle = i * 0.4;
         curveVertex(this.x + cos(angle)*r, this.y + sin(angle)*r);
       }
       endShape();
    }
  }
}
let globalBgColor;   // Background colour
let circleBasePalette; // Base colours for the circles 
let dotPalette;        // Colours for patterns/details 
let circles = [];      // Stores all circle objects
let connectedNodes = []; // Stores the circles selected as connection nodes (key “VIP” nodes)

function setup() {
  let size = min(windowWidth, windowHeight);
  createCanvas(size, size);
  pixelDensity(2); 

  // --- 1. Colour palette system (Aboriginal-inspired style) ---
  globalBgColor = color(30, 20, 15); 

  circleBasePalette = [
    color(90, 40, 20),   // ochre red
    color(60, 30, 15),   // dark brown
    color(40, 45, 35),   // eucalyptus green
    color(110, 60, 30),  // burnt orange
    color(20, 20, 20)    // charcoal black
  ];

  dotPalette = [
    color(255, 255, 255), // pure white
    color(255, 240, 200), // off-white
    color(255, 215, 0),   // sun yellow
    color(255, 140, 80),  // bright ochre
    color(160, 180, 140), // light green
    color(200, 200, 210)  // greyish white
  ];
}

function draw() {
  background(globalBgColor); 

  // 1. Draw random white dots that fill the canvas as background texture 
  drawBackgroundDots();

  // 2. Generate the fixed layout of circle centres
  createFixedLayout();

  // 3. Draw wide network lines between selected circle centres
  drawNetworkLines();

  // 4. Draw all circles.
  for (let c of circles) {
    c.display();
  }
  
  noLoop(); 
}

function windowResized() {
  let size = min(windowWidth, windowHeight);
  resizeCanvas(size, size);
  draw();
}

// --- Layout generation ---
function createFixedLayout() {
  circles = []; 
  connectedNodes = []; 
  
  let r = width / 8; 

  addCirclesOnLine(5, width / 7.1, height / 7.1, width / 4.8, height / 4.8, r);
  addCirclesOnLine(4, width / 2, (height * 2) / 20, width / 4.8, height / 4.8, r);
  addCirclesOnLine(2, (width * 4) / 5, 0, width / 4.8, height / 4.8, r);
  addCirclesOnLine(4, width / 20, height / 2.2, width / 4.8, height / 4.8, r);
  addCirclesOnLine(2, 0, (height * 8) / 10, width / 4.8, height / 4.8, r);
}

function addCirclesOnLine(count, startX, startY, stepX, stepY, r) {
  for (let i = 0; i < count; i++) {
    let x = startX + stepX * i;
    let y = startY + stepY * i;
    
    if (x > -r * 2 && x < width + r * 2 && y > -r * 2 && y < height + r * 2) {
        let c = new Circle(x, y, r);
        circles.push(c);
        if (random(1) < 0.7) {
            connectedNodes.push(c);
        }
    }
  }
}

// --- Draw connecting lines ---
function drawNetworkLines() {
  let linkColor = color(240, 230, 200, 180); // overall a dark brown tone

  for (let i = 0; i < connectedNodes.length; i++) {
    for (let j = i + 1; j < connectedNodes.length; j++) {
        let c1 = connectedNodes[i];
        let c2 = connectedNodes[j];
        let d = dist(c1.x, c1.y, c2.x, c2.y);
        if (d < width / 2.8) { 
            drawWideLine(c1.x, c1.y, c2.x, c2.y, linkColor); 
        }
    }
  }
}

/*
   * Many of the custom patterns in this artwork rely on the combination of
     beginShape() and curveVertex() to construct irregular, hand-drawn outlines.
     By sampling points around a circle or along a path and adding random jitter
     to the radius or position, the code produces soft, organic contours that
     mimic the appearance of hand-painted lines and dots.
   
   * This generative-art approach is used for hand-drawn circles, ellipses, and
     the wide network lines, producing a cohesive, natural texture throughout the
     composition. The randomness is carefully controlled to avoid harshness while
     still emphasizing imperfection and individuality in each shape.
   
   * Technique reference:
     - p5.js beginShape(): https://p5js.org/reference/p5/beginShape/
     - p5.js curveVertex(): https://p5js.org/reference/p5/curveVertex/
*/

function drawWideLine(x1, y1, x2, y2, col) {
  stroke(col);
  strokeWeight(10); // 设置统一的线宽 (你可以修改这个数字来调整粗细)
  strokeCap(ROUND); // 线条两端保持圆润
  line(x1, y1, x2, y2); // 直接绘制直线
}

// --- Background texture: dense random scattered white dots ---
/*
 * This background texture uses probabilistic dot density to distribute thousands of 
   semi-transparent white dots across the canvas. Extends class examples by using area-based 
   density control to maintain consistent texture across canvas sizes
 */

function drawBackgroundDots() {
  noStroke();
  
  let density = 0.004; 
  let numDots = floor(width * height * density); 

  for (let i = 0; i < numDots; i++) {
    let x = random(width);
    let y = random(height);
    
    let dotSize = random(1.5, 4); 
    let alpha = random(100, 200); 
    
    fill(255, 255, 255, alpha); // Pure white, semi-transparent
    ellipse(x, y, dotSize);
  }
}

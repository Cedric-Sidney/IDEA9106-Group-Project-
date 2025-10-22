let colors;
let showGrid = false;

function setup() {
  let size = min(windowWidth, windowHeight);
  createCanvas(size, size);
  
  // Initialize color schemes
  colors = {
    background: color(42, 107, 111),
    
    nightIndigo: color(30, 40, 80),
    desertRed: color(207, 60, 45),
    fireOrange: color(245, 140, 40),
    sandYellow: color(238, 200, 70),
    jungleGreen: color(76, 165, 60),
    coralPink: color(236, 100, 150),
    royalPurple: color(155, 80, 180),
    oceanBlue: color(70, 130, 210),
    whiteClay: color(250, 245, 230),
    
    schemes: [
      {
        outer: color(245, 140, 40),
        dots: color(207, 60, 45),
        rings: [color(207, 60, 45), color(76, 165, 60), color(70, 130, 210)]
      },
      {
        outer: color(236, 100, 150),
        dots: color(238, 200, 70),
        rings: [color(155, 80, 180), color(70, 130, 210), color(76, 165, 60)]
      },
      {
        outer: color(238, 200, 70),
        dots: color(245, 140, 40),
        rings: [color(207, 60, 45), color(236, 100, 150), color(76, 165, 60)]
      },
      {
        outer: color(76, 165, 60),
        dots: color(236, 100, 150),
        rings: [color(155, 80, 180), color(207, 60, 45), color(76, 165, 60)]
      },
      {
        outer: color(155, 80, 180),
        dots: color(238, 200, 70),
        rings: [color(70, 130, 210), color(207, 60, 45), color(76, 165, 60)]
      },
      {
        outer: color(207, 60, 45),
        dots: color(238, 200, 70),
        rings: [color(236, 100, 150), color(76, 165, 60), color(70, 130, 210)]
      },
    ],
    
    connector: color(245, 140, 40),
    black: color(26, 26, 26),
    white: color(250, 245, 230)
  };
  
  noLoop();
}

function draw() {
  background(colors.background);
  
  let r = width / 8;
  
  // Line 1: Diagonal (5 circles)
  drawCircleLine(5, width / 7.1, height / 7.1, width / 4.8, height / 4.8, r, 
                 [0, 1, 2, 3, 4], ['dots', 'radial', 'dots', 'mixed', 'radial']);
  
  // Line 2: (4 circles)
  drawCircleLine(4, width / 2, height * 2 / 20, width / 4.8, height / 4.8, r,
                 [1, 2, 3, 0], ['radial', 'dots', 'mixed', 'dots']);
  
  // Line 3: (2 circles)
  drawCircleLine(2, width * 4 / 5, 0, width / 4.8, height / 4.8, r,
                 [4, 5], ['dots', 'mixed']);
  
  // Line 4: (4 circles)
  drawCircleLine(4, width / 20, height / 2.2, width / 4.8, height / 4.8, r,
                 [3, 0, 5, 1], ['mixed', 'dots', 'radial', 'dots']);
  
  // Line 5: (2 circles)
  drawCircleLine(2, 0, height * 8 / 10, width / 4.8, height / 4.8, r,
                 [2, 4], ['mixed', 'radial']);
  
  if (showGrid) {
    drawGrid();
  }
}

function drawCircleLine(count, startX, startY, stepX, stepY, r, colorIndices, patterns) {
  for (let i = 0; i < count; i++) {
    let x = startX + stepX * i;
    let y = startY + stepY * i;
    let colorScheme = colors.schemes[colorIndices[i] % colors.schemes.length];
    let pattern = patterns[i];
    
    drawCircle(x, y, r, colorScheme, pattern);
  }
}

function drawCircle(x, y, radius, colorScheme, patternType) {
  push();
  drawOuterPattern(x, y, radius, colorScheme, patternType);
  drawMiddleLayer(x, y, radius, colorScheme);
  drawInnerTriplet(x, y, radius, colorScheme);
  drawConcentricRings(x, y, radius, colorScheme);
  drawCenter(x, y, radius, colorScheme);
  pop();
}

function drawMiddleLayer(x, y, radius, colorScheme) {
  noStroke();
  let middleCol = (colorScheme.rings && colorScheme.rings[1]) ? colorScheme.rings[1] : colors.whiteClay;
  fill(middleCol);
  let middleR = radius * 0.78; // sits between outer circle and inner triplet
  ellipse(x, y, middleR * 2, middleR * 2);
}

function drawInnerTriplet(x, y, radius, colorScheme) {
  noStroke();
  let orbitR = radius * 0.55; // orbit on which 3 small circles sit
  let smallR = radius * 0.18;
  for (let i = 0; i < 3; i++) {
    let angle = i * (TWO_PI / 3) + 0.2; // 120° apart with slight offset for organic feel
    let px = x + cos(angle) * orbitR;
    let py = y + sin(angle) * orbitR;
    let col = (colorScheme.rings && colorScheme.rings.length)
      ? colorScheme.rings[i % colorScheme.rings.length]
      : colorScheme.dots;
    fill(col);
    ellipse(px, py, smallR * 2, smallR * 2);
  }
}

function drawOuterPattern(x, y, radius, colorScheme, patternType) {
  noStroke();
  fill(colorScheme.outer);
  ellipse(x, y, radius * 2, radius * 2);
  
  if (patternType === 'dots') {
    drawDotPattern(x, y, radius, colorScheme);
  } else if (patternType === 'radial') {
    drawRadialPattern(x, y, radius, colorScheme);
  } else if (patternType === 'mixed') {
    drawMixedPattern(x, y, radius, colorScheme);
  }
}

function drawDotPattern(x, y, radius, colorScheme) {
  let dotSize = 3;
  let spacing = 8;
  
  fill(colorScheme.dots);
  noStroke();
  
  for (let r = spacing; r < radius; r += spacing) {
    let circumference = TWO_PI * r;
    let numDots = floor(circumference / spacing);
    
    for (let i = 0; i < numDots; i++) {
      let angle = (i / numDots) * TWO_PI;
      let px = x + cos(angle) * r;
      let py = y + sin(angle) * r;
      ellipse(px, py, dotSize * 2, dotSize * 2);
    }
  }
}

function drawRadialPattern(x, y, radius, colorScheme) {
  let numLines = 60;
  stroke(colorScheme.dots);
  strokeWeight(2);
  
  for (let i = 0; i < numLines; i++) {
    let angle = (i / numLines) * TWO_PI;
    let startR = radius * 0.3;
    let endR = radius;
    
    line(
      x + cos(angle) * startR,
      y + sin(angle) * startR,
      x + cos(angle) * endR,
      y + sin(angle) * endR
    );
  }
}

function drawMixedPattern(x, y, radius, colorScheme) {
  let dotSize = 4;
  let spacing = 10;
  
  fill(colorScheme.dots);
  noStroke();
  
  for (let r = spacing; r < radius * 0.7; r += spacing) {
    let circumference = TWO_PI * r;
    let numDots = floor(circumference / spacing);
    
    for (let i = 0; i < numDots; i++) {
      let angle = (i / numDots) * TWO_PI;
      let px = x + cos(angle) * r;
      let py = y + sin(angle) * r;
      ellipse(px, py, dotSize * 2, dotSize * 2);
    }
  }
}

function drawConcentricRings(x, y, radius, colorScheme) {
  let ringCount = 3;
  let baseRingRadius = radius * 0.28;
  let ringWidth = baseRingRadius / (ringCount + 1);
  
  noFill();
  
  for (let i = 0; i < ringCount; i++) {
    let r = baseRingRadius - (i * ringWidth);
    stroke(colorScheme.rings[i % colorScheme.rings.length]);
    strokeWeight(ringWidth * 0.7);
    ellipse(x, y, r * 2, r * 2);
  }
}

function drawCenter(x, y, radius, colorScheme) {
  noStroke();
  fill(colors.black);
  ellipse(x, y, radius * 0.16, radius * 0.16);
  fill(colorScheme.rings[0]);
  ellipse(x, y, radius * 0.08, radius * 0.08);
}

function drawGrid() {
  let gridSize = 6;
  let cellW = width / gridSize;
  let cellH = height / gridSize;
  
  push();
  
  stroke(255, 255, 0, 150);
  strokeWeight(1);
  
  for (let i = 0; i <= gridSize; i++) {
    line(i * cellW, 0, i * cellW, height);
    line(0, i * cellH, width, i * cellH);
  }
  
  fill(255, 255, 0);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);
  
  for (let col = 0; col < gridSize; col++) {
    for (let row = 0; row < gridSize; row++) {
      text(`[${col},${row}]`, col * cellW + 3, row * cellH + 3);
    }
  }
  
  fill(255, 0, 0);
  for (let col = 0; col < gridSize; col++) {
    for (let row = 0; row < gridSize; row++) {
      let centerX = cellW * (col + 0.5);
      let centerY = cellH * (row + 0.5);
      ellipse(centerX, centerY, 5, 5);
    }
  }
  
  fill(255, 255, 255, 220);
  rect(10, height - 100, 160, 90, 5);
  
  fill(0);
  textAlign(LEFT, TOP);
  textSize(12);
  text('📐 Grid System ON', 15, height - 95);
  text(`Grid: ${gridSize}×${gridSize}`, 15, height - 75);
  text('Total circles: 17', 15, height - 55);
  text('Press G to toggle', 15, height - 35);
  text('Click for coords', 15, height - 15);
  
  pop();
}

function keyPressed() {
  if (key === 'g' || key === 'G') {
    showGrid = !showGrid;
    redraw();
  }
  
  if (key === 'h' || key === 'H') {
    console.log('=== Aboriginal Art - Help ===');
    console.log('');
    console.log('Keyboard Shortcuts:');
    console.log('  G - Toggle grid display');
    console.log('  H - Show this help');
    console.log('  Click - Show coordinates');
    console.log('');
    console.log('Circle Parameters:');
    console.log('  Base radius: width / 8');
    console.log('  Diagonal step: width / 4.8');
    console.log('  Total circles: 17 (5+4+2+4+2)');
    console.log('');
    console.log('Line Configuration:');
    console.log('  Line 1: 5 circles (main diagonal)');
    console.log('  Line 2: 4 circles');
    console.log('  Line 3: 2 circles (right edge)');
    console.log('  Line 4: 4 circles');
    console.log('  Line 5: 2 circles (bottom edge)');
  }
}

function mousePressed() {
  let gridSize = 6;
  let cellW = width / gridSize;
  let cellH = height / gridSize;
  
  let gridCol = floor(mouseX / cellW);
  let gridRow = floor(mouseY / cellH);
  
  console.log('=== Click Info ===');
  console.log(`Mouse Position: (${mouseX.toFixed(1)}, ${mouseY.toFixed(1)})`);
  console.log(`Grid Cell: [${gridCol}, ${gridRow}]`);
  console.log(`Cell Center: (${(cellW * (gridCol + 0.5)).toFixed(1)}, ${(cellH * (gridRow + 0.5)).toFixed(1)})`);
  console.log(`Relative: (width/${(width/mouseX).toFixed(2)}, height/${(height/mouseY).toFixed(2)})`);
}

function windowResized() {
  let size = min(windowWidth, windowHeight);
  resizeCanvas(size, size);
  redraw();
}
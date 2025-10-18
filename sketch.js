 
// =============================================================================
// Aboriginal Art - Group Base Code
// =============================================================================
// This sketch is inspired by Australian Aboriginal dot painting traditions
// and songline (Dreaming Path) art. It represents waterholes, meeting places,
// and the paths connecting them across the landscape.
//
// Cultural Elements:
// - Concentric circles: waterholes, campsites, or sacred meeting places
// - U-shapes: people sitting in ceremony or gathering
// - Lines with dots: songlines (ancestral paths across the land)
// - Dot patterns: landscape, story details, or sacred designs
// - Earth-tone palette: ochre, red earth, charcoal, white clay
// =============================================================================

// Global variables
let colors;
let waterholes = [];
let songlines = [];

// =============================================================================
// SETUP - Initialize the canvas and artwork
// =============================================================================
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Initialize traditional Aboriginal color palette
  // Based on natural earth pigments used in traditional art
  colors = {
    background: color(26, 22, 18),      // Dark earth/charcoal
    ochre: color(212, 165, 116),        // Yellow ochre
    redEarth: color(139, 58, 58),       // Red earth/oxide
    whiteGum: color(245, 245, 220),     // White clay/gum
    charcoal: color(45, 45, 45),        // Charcoal black
    yellowOchre: color(230, 184, 92),   // Bright yellow ochre
    
    // Color schemes for different waterholes/sites
    waterholes: [
      { 
        outer: color(139, 58, 58), 
        middle: color(212, 165, 116), 
        inner: color(45, 45, 45), 
        energy: color(230, 184, 92) 
      },
      { 
        outer: color(212, 165, 116), 
        middle: color(139, 58, 58), 
        inner: color(45, 45, 45), 
        energy: color(245, 245, 220) 
      },
      { 
        outer: color(230, 184, 92), 
        middle: color(139, 58, 58), 
        inner: color(45, 45, 45), 
        energy: color(212, 165, 116) 
      },
      { 
        outer: color(139, 58, 58), 
        middle: color(230, 184, 92), 
        inner: color(45, 45, 45), 
        energy: color(245, 245, 220) 
      },
    ]
  };
  
  // Create the artwork elements
  initializeArtwork();
  
  // Static image for group base code (remove noLoop() for animation)
  noLoop();
}

// =============================================================================
// DRAW - Main drawing loop
// =============================================================================
function draw() {
  // Draw dark earth background
  background(colors.background);
  
  // Add subtle textured background (traditional dotting)
  drawDottedBackground();
  
  // Draw songlines first (background layer - the paths)
  for (let line of songlines) {
    line.draw();
  }
  
  // Draw waterholes on top (foreground - the destinations)
  for (let waterhole of waterholes) {
    waterhole.draw();
  }
}

// =============================================================================
// INITIALIZE ARTWORK - Create waterholes and songlines
// =============================================================================
function initializeArtwork() {
  // Calculate base radius for waterholes based on canvas size
  let baseRadius = min(width, height) * 0.08;
  
  // Create waterholes (meeting places, water sources, sacred sites)
  // In Aboriginal art, concentric circles represent important places
  waterholes = [
    new Waterhole(width * 0.25, height * 0.2, baseRadius * 1.2, colors.waterholes[0], 'sacred'),
    new Waterhole(width * 0.65, height * 0.25, baseRadius, colors.waterholes[1], 'meeting'),
    new Waterhole(width * 0.85, height * 0.45, baseRadius * 0.9, colors.waterholes[2], 'journey'),
    new Waterhole(width * 0.4, height * 0.5, baseRadius * 1.1, colors.waterholes[3], 'sacred'),
    new Waterhole(width * 0.75, height * 0.65, baseRadius, colors.waterholes[0], 'meeting'),
    new Waterhole(width * 0.2, height * 0.7, baseRadius * 0.95, colors.waterholes[1], 'journey'),
    new Waterhole(width * 0.55, height * 0.8, baseRadius * 1.05, colors.waterholes[2], 'sacred'),
    new Waterhole(width * 0.15, height * 0.4, baseRadius * 0.85, colors.waterholes[3], 'meeting'),
  ];
  
  // Create songlines (paths connecting important sites)
  // Songlines are ancestral paths that cross the land, connecting places
  songlines = [
    new Songline([
      createVector(waterholes[0].x, waterholes[0].y),
      createVector(waterholes[1].x, waterholes[1].y),
      createVector(waterholes[2].x, waterholes[2].y)
    ], colors.ochre),
    new Songline([
      createVector(waterholes[3].x, waterholes[3].y),
      createVector(waterholes[4].x, waterholes[4].y),
      createVector(waterholes[5].x, waterholes[5].y)
    ], colors.redEarth),
    new Songline([
      createVector(waterholes[7].x, waterholes[7].y),
      createVector(waterholes[3].x, waterholes[3].y),
      createVector(waterholes[6].x, waterholes[6].y)
    ], colors.yellowOchre),
  ];
}

// =============================================================================
// WATERHOLE CLASS
// =============================================================================
// Represents a waterhole, campsite, or sacred meeting place
// Drawn using traditional concentric circle technique
class Waterhole {
  constructor(x, y, radius, colorScheme, significance) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colorScheme = colorScheme;
    this.significance = significance; // 'sacred', 'meeting', 'journey'
  }

  // Main draw method
  draw() {
    // Draw the concentric circles (the site marker)
    this.drawConcentricCircles();
    
    // Draw surrounding pattern based on site significance
    if (this.significance === 'sacred') {
      this.drawSacredDots();
    } else if (this.significance === 'meeting') {
      this.drawMeetingPattern();
    } else if (this.significance === 'journey') {
      this.drawJourneyLines();
    } else {
      this.drawWaterholeRipples();
    }
  }

  // Draw traditional concentric circles
  drawConcentricCircles() {
    let rings = 6;
    let ringWidth = this.radius / rings;
    
    noStroke();
    
    // Draw outer ring
    fill(this.colorScheme.outer);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    
    // Draw alternating colored rings
    for (let i = 1; i < rings; i++) {
      let r = this.radius - (ringWidth * i);
      fill(i % 2 === 0 ? this.colorScheme.middle : this.colorScheme.outer);
      ellipse(this.x, this.y, r * 2, r * 2);
    }
    
    // Draw center (the actual water source or fire)
    fill(this.colorScheme.inner);
    ellipse(this.x, this.y, ringWidth * 3, ringWidth * 3);
    
    // Draw inner energy center
    fill(this.colorScheme.energy);
    ellipse(this.x, this.y, ringWidth * 1.4, ringWidth * 1.4);
  }

  // Sacred site pattern - dense dotting technique
  drawSacredDots() {
    let dotSize = 2.5;
    let rings = 8;
    let spacing = 6;
    
    fill(this.colorScheme.energy);
    noStroke();
    
    // Draw concentric rings of dots
    for (let ring = 1; ring <= rings; ring++) {
      let r = this.radius + (ring * spacing);
      let circumference = TWO_PI * r;
      let numDots = floor(circumference / spacing);
      
      for (let i = 0; i < numDots; i++) {
        let angle = (i / numDots) * TWO_PI;
        let x = this.x + cos(angle) * r;
        let y = this.y + sin(angle) * r;
        
        ellipse(x, y, dotSize * 2, dotSize * 2);
      }
    }
  }

  // Meeting place pattern - U shapes representing people sitting
  drawMeetingPattern() {
    let numPeople = 8;
    let distance = this.radius + 15;
    
    stroke(this.colorScheme.energy);
    fill(this.colorScheme.energy);
    strokeWeight(3);
    noFill();
    
    // Draw people sitting in a circle
    for (let i = 0; i < numPeople; i++) {
      let angle = (i / numPeople) * TWO_PI;
      let x = this.x + cos(angle) * distance;
      let y = this.y + sin(angle) * distance;
      
      push();
      translate(x, y);
      rotate(angle + PI / 2);
      
      // Draw U-shape (traditional symbol for person sitting)
      arc(0, 0, 16, 16, 0, PI);
      
      // Draw dot for head
      fill(this.colorScheme.energy);
      noStroke();
      ellipse(0, -8, 5, 5);
      
      pop();
    }
  }

  // Journey lines - radiating paths from this place
  drawJourneyLines() {
    let numLines = 12;
    stroke(this.colorScheme.energy);
    strokeWeight(2);
    
    // Draw radiating lines
    for (let i = 0; i < numLines; i++) {
      let angle = (i / numLines) * TWO_PI;
      let startR = this.radius + 5;
      let endR = this.radius + 25;
      
      // Draw line
      line(
        this.x + cos(angle) * startR,
        this.y + sin(angle) * startR,
        this.x + cos(angle) * endR,
        this.y + sin(angle) * endR
      );
      
      // Draw dots along the path (footprints/journey markers)
      noStroke();
      fill(this.colorScheme.energy);
      for (let d = 0; d <= 3; d++) {
        let r = startR + (endR - startR) * (d / 3);
        ellipse(
          this.x + cos(angle) * r,
          this.y + sin(angle) * r,
          4, 4
        );
      }
    }
  }

  // Waterhole ripples - representing water flowing outward
  drawWaterholeRipples() {
    let dotSize = 3;
    let numRings = 5;
    let spacing = 10;
    
    fill(this.colorScheme.middle);
    noStroke();
    
    // Draw ripple pattern with dots
    for (let ring = 1; ring <= numRings; ring++) {
      let r = this.radius + (ring * spacing);
      let circumference = TWO_PI * r;
      let numDots = floor(circumference / (spacing * 0.8));
      
      for (let i = 0; i < numDots; i++) {
        let angle = (i / numDots) * TWO_PI;
        let x = this.x + cos(angle) * r;
        let y = this.y + sin(angle) * r;
        
        // Dots get smaller as ripples expand
        let size = dotSize * (1 - ring * 0.1);
        ellipse(x, y, size * 2, size * 2);
      }
    }
  }
}

// =============================================================================
// SONGLINE CLASS
// =============================================================================
// Represents a songline (Dreaming Path) connecting important sites
// These are ancestral paths that cross the landscape
class Songline {
  constructor(points, col) {
    this.points = points; // Array of p5.Vector positions
    this.col = col;       // Color of this songline
  }

  // Draw the songline path
  draw() {
    if (this.points.length < 2) return;
    
    // Draw the connecting path
    stroke(this.col);
    strokeWeight(4);
    noFill();
    
    beginShape();
    for (let point of this.points) {
      vertex(point.x, point.y);
    }
    endShape();
    
    // Draw journey markers along the path
    this.drawPathMarkers();
  }

  // Draw dots and markers along the songline
  drawPathMarkers() {
    noStroke();
    
    // Draw markers at each waypoint
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      
      // Endpoints are larger (starting/ending places)
      let isEndpoint = i === 0 || i === this.points.length - 1;
      let outerSize = isEndpoint ? 8 : 6;
      let innerSize = isEndpoint ? 4 : 3;
      
      // Draw outer circle (dark)
      fill(colors.charcoal);
      ellipse(point.x, point.y, outerSize * 2, outerSize * 2);
      
      // Draw inner circle (light)
      fill(colors.whiteGum);
      ellipse(point.x, point.y, innerSize * 2, innerSize * 2);
    }
    
    // Add intermediate dots between waypoints (footprints along the path)
    for (let i = 0; i < this.points.length - 1; i++) {
      let p1 = this.points[i];
      let p2 = this.points[i + 1];
      let numDots = 5;
      
      for (let j = 1; j < numDots; j++) {
        let t = j / numDots;
        let x = p1.x + (p2.x - p1.x) * t;
        let y = p1.y + (p2.y - p1.y) * t;
        
        fill(this.col);
        ellipse(x, y, 5, 5);
      }
    }
  }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// Create traditional dotted background texture
function drawDottedBackground() {
  let dotSize = 1.5;
  let spacing = 12;
  
  fill(colors.ochre);
  noStroke();
  
  // Use low opacity for subtle effect
  push();
  drawingContext.globalAlpha = 0.15;
  
  for (let x = spacing; x < width; x += spacing) {
    for (let y = spacing; y < height; y += spacing) {
      // Add slight randomness for organic, hand-painted feel
      let offsetX = random(-2, 2);
      let offsetY = random(-2, 2);
      
      ellipse(x + offsetX, y + offsetY, dotSize * 2, dotSize * 2);
    }
  }
  
  pop();
}

// =============================================================================
// WINDOW RESIZE HANDLER
// =============================================================================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeArtwork();
  redraw();
}

        let bgColor;
        let dotPositions = [];
        
        class Circle {
            constructor(x, y, r) {
                this.x = x;
                this.y = y;
                this.r = r;
                this.patternType = floor(random(8) + 1);
                this.colorScheme = floor(random(5)); // 0 到 4
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

            // *** 新增方法：绘制一个纯色背景圆，用于覆盖下方的椭圆 ***
            displayBackgroundMask() {
                fill(bgColor[0], bgColor[1], bgColor[2]); // 使用全局画布背景色
                noStroke();
                ellipse(this.x, this.y, (this.r + 9) * 2);
            }

            displayOutterCircle() {
                this.drawHandDrawnCircle(
                    this.x,
                    this.y,
                    this.r,
                    this.getBackgroundColor(),
                    color(0),
                    2
                );
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

            displayMiddlePattern() {
                switch (this.patternType) {
                    case 1: this.displayRadialLines(); break;
                    case 2: this.displayConcentricRings(); break;
                    case 3: this.displaySpiralDots(); break;
                    case 4: this.displayWavyRings(); break;
                    case 5: this.displayGridDots(); break;
                    case 6: this.displayDoubleRadial(); break;
                    case 7: this.displayArcLines(); break;
                    case 8: this.displayRingsWithDots(); break;
                }
            }

            displayInnerDots() {
                let colors = this.getPatternColors();
                this.drawHandDrawnCircle(this.x, this.y, this.r / 2, colors[0], colors[1], this.r * 0.08);
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
                let circles = [];
                for (let i = 0; i < count; i++) {
                    let x = startX + stepX * i;
                    let y = startY + stepY * i;
                    let c = new Circle(x, y, r);
                    circles.push(c);

                    // *** 新增调用：首先绘制背景遮罩 ***
                    c.displayBackgroundMask();

                    c.displayOutterCircle();
                    c.displayMiddlePattern();
                    c.displayInnerDots();
                }
                return circles;
            }
        }
        function drawGapFillPattern() {
            noStroke();

            // *** 修改：让椭圆大小和间距随画布大小缩放 ***
            let baseSize = width * 0.015; // 基础大小基于画布宽度
            let ovalWidth = baseSize;
            let ovalHeight = baseSize * 1.5;

            let xSpacing = ovalWidth * 2.2;
            let ySpacing = ovalHeight * 1.8;

            for (let y = 0; y < height; y += ySpacing) {
                for (let x = 0; x < width; x += xSpacing) {

                    let xOffset = (y % (ySpacing * 2)) < ySpacing ? 0 : xSpacing / 2;

                    let px = x + xOffset + random(-xSpacing * 0.2, xSpacing * 0.2);
                    let py = y + random(-ySpacing * 0.2, ySpacing * 0.2);

                    // 随机轻微旋转
                    push();
                    translate(px, py);
                    rotate(random(-PI / 8, PI / 8));

                    // *** 修改：使用随机颜色和100%不透明度 ***
                    fill(random(255), random(255), random(255)); // 随机R, G, B, 默认alpha为255
                    ellipse(0, 0, ovalWidth * random(0.8, 1.2), ovalHeight * random(0.8, 1.2));

                    pop();
                }
            }
        }
        function addPaperTexture(circles) {
            // 1. 添加纸张纹理 (像素噪点)
            loadPixels();
            for (let i = 0; i < pixels.length; i += 4) {
                let noise = random(-20, 20);
                pixels[i] += noise;
                pixels[i + 1] += noise;
                pixels[i + 2] += noise;
            }
            updatePixels();
            noStroke(); // 恢复默认
            fill(255); // 恢复默认填充
        }

        // p5.js setup 函数
        function setup() {
            let size = min(windowWidth, windowHeight) * 0.95; // 缩小一点以免贴边
            createCanvas(size, size);
            pixelDensity(1); // 确保像素密度为1，以避免一些纹理绘制问题

            // 随机选择浅色背景
            const lightBackgrounds = [
                [175, 210, 180], // 浅薄荷绿
                [180, 200, 210], // 浅天空蓝
                [190, 165, 145], // 浅土红色
                [210, 195, 165], // 米黄色
                [165, 155, 185], // 浅薰衣草紫
                [180, 195, 175], // 浅橄榄绿
                [185, 180, 200], // 浅灰紫色
                [200, 180, 170] // 浅杏色
            ];

            bgColor = random(lightBackgrounds);
        }

        // p5.js draw 函数
        function draw() {
            background(bgColor[0], bgColor[1], bgColor[2]);
            drawGapFillPattern();

            // 2. 绘制所有的圆 (覆盖在背景图案之上)
            let r = width / 8;
            let allCircles = [];

            allCircles = allCircles.concat(Circle.displayLine(5, width / 7.1, height / 7.1, width / 4.8, height / 4.8, r));
            allCircles = allCircles.concat(Circle.displayLine(4, width / 2, height * 2 / 20, width / 4.8, height / 4.8, r));
            allCircles = allCircles.concat(Circle.displayLine(2, width * 4 / 5, 0, width / 4.8, height / 4.8, r));
            allCircles = allCircles.concat(Circle.displayLine(4, width / 20, height / 2.2, width / 4.8, height / 4.8, r));
            allCircles = allCircles.concat(Circle.displayLine(2, 0, height * 8 / 10, width / 4.8, height / 4.8, r));

            // 3. (修改) 添加纸张纹理 (现在只添加噪点)
            addPaperTexture(allCircles);

            noLoop(); // 只画一次
        }

        // p5.js 窗口缩放函数
        function windowResized() {
            let size = min(windowWidth, windowHeight) * 0.95;
            resizeCanvas(size, size);
            redraw(); // 重新绘制
        }


void setup() {
    size(400, 400);
}

var state = "start";
var level = 1;
var level1objects = 2;
var g = [0, -2];
var mouseIsClicked = false;
var mouseClicked = function() {
    mouseIsClicked = true;
};
noStroke();
var button = function(x, y, w, h, s, color) {
    var Button = {//defines a new object: Button
    };
    Button.pressed = false;
    Button.x = x;
    Button.y = y;
    Button.w = w;
    Button.h = h;
    Button.state = s;
    Button.color = color;
    Button.drawIt = function() {
        if (!this.color) {
            fill(161, 135, 255);
            stroke(106, 0, 255);
            strokeWeight(5);
            rect(this.x, this.y, this.w, this.h, 20);
            noStroke();
        } else {
            fill(this.color);
            rect(this.x, this.y, this.w, this.h, 10);
        }
    };
    Button.checkIfPressed = function() {
        if (mouseIsClicked && mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h && state === this.state) {
            this.pressed = true;
        } else {
            this.pressed = false;
        }
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h && state === this.state) {
            this.mousedOver = true;
        } else {
            this.mousedOver = false;
        }
    };
    return Button;
};
var buttonCircle = function(x, y, r, s, color) {
    var Button = {//defines a new object: Button
    };
    Button.pressed = false;
    Button.x = x;
    Button.y = y;
    Button.r = r;
    Button.state = s;
    Button.color = color;
    Button.drawIt = function() {
        if (!this.color) {
            fill(161, 135, 255);
            stroke(106, 0, 255);
            strokeWeight(5);
            ellipse(this.x, this.y, this.r, this.r);
            noStroke();
        } else {
            fill(this.color);
            ellipse(this.x, this.y, this.r, this.r);
        }
    };
    Button.checkIfPressed = function() {
        if (mouseIsClicked && sq(mouseX-this.x) + sq(mouseY-this.y) <= sq(this.r) && state === this.state) {
            this.pressed = true;
        } else {
            this.pressed = false;
        }
        if (sq(mouseX-this.x) + sq(mouseY-this.y) <= sq(this.r) && state === this.stat) {
            this.mousedOver = true;
        } else {
            this.mousedOver = false;
        }
    };
    return Button;
};

var start = buttonCircle(200, 200, 100, "start", color(112, 171, 53));

var drawJeans = function(x, y, s) {
    fill(28, 57, 102);
    rect(x, y, 20*s, 8*s);
    rect(x, y, 8*s, 25*s);
    rect(x + (12*s), y, 8*s, 25*s);
};

var jeans = {};
jeans.x = 330;
jeans.y = 220;
jeans.shouldDraw = true;

var drawSpool = function(x, y, s) {
    fill(150, 97, 45);
    ellipse(x+(15*s), y+(26*s), 30*s, 15*s);
    fill(4, 9, 54);
    rect(x + (7.5*s), y, 15*s, 26 * s);
    ellipse(x+(15*s), y+(26*s), 15*s, 8*s);
    fill(150, 97, 45);
    ellipse(x+(15*s), y, 30*s, 15*s);
};

var spool = {};
spool.x = 50;
spool.y = 190;
spool.shouldDraw = true;

var character = {};
//character.x = 200;
//character.y = 300;
character.canGoDown = false;
character.speed = 2.5;
character.v = [0, 0];
character.v2 = [0, 0];
character.p = [200, 300];
character.p2 = [200, 300];
character.jump = 3.5;
character.k = [0, 0];
character.pk = 0;
character.elasticity = 0.4;
character.r = 15;
character.objects = [];
character.drawIt = function() {
    this.p = this.p2;
    //if (abs(this.v2[0]) < 10 && abs(this.v2[1]) < 10) {
        this.v = this.v2;
    //}
    fill(112, 171, 53);
    ellipse(this.p[0], 400-this.p[1], this.r*2, this.r*2);
};
character.moveIt = function() {
    if (keyIsPressed && keyCode === RIGHT) {
        this.k[0] = 5;
    } else if (keyIsPressed && keyCode === LEFT) {
        this.k[0] = -5;
    } else {
        this.k[0] = 0;
    }
    if (keyIsPressed && keyCode === UP) {
        this.k[1] = 5;
    } else {
        this.k[1] = 0;
    }
    if (this.p[1] <= this.r+1 && this.k[1] === 0) {
        if (abs(this.v[1]) >= 2) {
            this.v[1] = -this.elasticity * this.v[1];
        } else {
            this.v[1] = 0;
        }
    }
    if (this.p[0] <= this.r+1 && this.k[0] !== 5) {
        if (abs(this.v[0]) >= 1) {
            this.v[0] = -this.elasticity * this.v[0];
        } else {
            this.v[0] = 0;
        }
    }
    if (this.p[0] >= 401-this.r && this.k[0] !== -5) {
        if (abs(this.v[0]) >= 1) {
            this.v[0] = -this.elasticity * this.v[0];
        } else {
            this.v[0] = 0;
        }
    }
    if (this.p[1] + this.r >= 400) {
        this.v[1] = -this.v[1];
    }
    if (abs(this.v[0]) <= 2 && this.k[0] === 0) {
        this.v[0] = 0;
    }
};
character.findNextValue = function() {
    this.p2[0] = this.v[0] * 0.1 + this.p[0];
    this.p2[1] = this.v[1] * 0.1 + this.p[1];
    this.v2[0] = g[0] * 0.1 + this.k[0] * 0.1 + this.v[0];
    this.v2[1] = g[1] * 0.1 + this.k[1] * 0.1 + this.v[1];
    if (this.v2[1] >= 20) {
        this.v2[1] -= this.k[1] * 0.1;
    }
};
character.getObjects = function() {
    if (this.p[0] + this.r >= jeans.x && this.p[0] - this.r <= jeans.x + 40 && jeans.shouldDraw) {
        character.objects.push("jeans");
    }
    if (this.p[0] + this.r >= spool.x && this.p[0] - this.r <= spool.x + 40 && spool.shouldDraw) {
        character.objects.push("spool");
    }
};

var newPlatform = function(x, y, w, h) {
    var platform = {};
    platform.x = x;
    platform.y = y;
    platform.h = h;
    platform.w = w;
    platform.chon = false;
    platform.drawIt = function() {
        fill(115, 85, 38);
        rect(this.x, 400-this.y, this.w, this.h);
    };
    platform.moveIt = function() {
        this.y += 0.2;
        this.h += 0.2;
        if (this.chon) {
            character.p[1]+=0.2;
            if (character.p[1] + character.r >= 400) {
                state = "gameOver";
            }
        }
    };
    platform.interact = function() {
        if (character.p[1] <= this.y + character.r && character.p[1] >= this.y + character.r - 10 && character.p[0] + character.r >= this.x && character.p[0] - character.r <= this.x + this.w && character.k[1] !== 5) {
            if (abs(character.v[1]) >= 2) {
                character.v[1] = -character.elasticity * character.v[1];
            } else {
                character.v[1] = 0;
            }
            this.chon = true;
        } else {
            this.chon = false;
        }
        if (character.p[1] <= this.y && character.p[0] >= this.x+this.w && character.p[0] < this.x+this.w+character.r+5 && character.k[0] !== 5) {
            if (abs(character.v[0]) >= 2) {
                character.v[0] = -character.elasticity * character.v[0];
            } else {
                character.v[0] = 0;
            }
        }
        if (character.p[1] <= this.y && character.p[0] <= this.x && character.p[0] > this.x-character.r-5 && character.k[0] !== -5) {
            if (abs(character.v[0]) >= 2) {
                character.v[0] = -character.elasticity * character.v[0];
            } else {
                character.v[0] = 0;
            }
        }
    };
    return platform;
};

var platforms = [newPlatform(0, 120, 120, 120), newPlatform(120, 60, 200, 60), newPlatform(320, 170, 80, 170)];

var drawStart = function() {
    background(155, 240, 113);
    start.drawIt();
    start.checkIfPressed();
    if (start.pressed) {
        state = "game";
    }
    fill(41, 117, 0);
    textSize(30);
    text("Start", 167, 211);
};

var drawGame = function() {
    if (level === 1) {
        background(68, 91, 99);
        for (var i = 0; i < platforms.length; i++) {
            platforms[i].drawIt();
            platforms[i].moveIt();
            platforms[i].interact();
        }
        character.drawIt();
        character.moveIt();
        character.findNextValue();
        character.getObjects();
        for (var i = 0; i < character.objects.length; i++) {
            if (character.objects[i] === "jeans") {
                jeans.shouldDraw = false;
                drawJeans(365-(90*i), 20, 1);
            }
            if (character.objects[i] === "spool") {
                spool.shouldDraw = false;
                drawSpool(365-(90*i), 20, 1);
            }
        }
        if (character.objects.length === level1objects) {
            state = "won";
        }
        if (jeans.shouldDraw) {
            drawJeans(jeans.x, 400-jeans.y, 2);
            jeans.y += 0.2;
        }
        if (spool.shouldDraw) {
            drawSpool(spool.x, 400-spool.y, 2);
            spool.y += 0.2;
        }
    }
};

var drawGameOver = function() {
    background(0, 0, 0);
    fill(255, 0, 0);
    textSize(35);
    text("   You were crushed!", 30, 50);
    textSize(22);
    text("  If we don't take action to stop them, landfills will continue to grow at alarming rates. Americans alone throw out 4.5 pounds of trash per person per day. If we reused and recycled more these numbers would not be so high. Check out Help the Environment At Home on our main page to learn more about what you can do to make a difference.", 30, 88, 340, 340);
};

var drawWon = function() {
    background(155, 240, 113);
    fill(41, 117, 0);
    textSize(35);
    text("      You won!", 30, 50);
    textSize(22);
    text("  You were able to find all of the materials needed to make a purse before the landfill filled the screen. In the real world, we are also facing growing landfills, and in the real world we can also stop this problem by reusing and recycling. If you have a pair of jeans, some thread, and a pair of scissors you can make your own purse. Find the tutorial on the instructions page.", 30, 88, 340, 340);
};

void draw = function() {
    if (state === "start") {
        drawStart();
    }
    if (state === "game") {
        drawGame();
    }
    if (state === "gameOver") {
        drawGameOver();
    }
    if (state === "won") {
        drawWon();
    }
    mouseIsClicked = false;
};
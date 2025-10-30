var debug = false
var skiX = 100
var skiY = 100
var jump = 0
var rockX = 300
var rockY = 300
var rockSize = 100
var dir = 0
var skiSpeed = 5
var gspeed = 3
var coinX = 500
var coinY = 500
var score = 0
var treeX = 400
var treeY = 400
var treeSize = 50
var lives = 5
var gameOver = 0
var gameStart = false
var iFrames = 100

function setup() {
	print("### p5.fps v0.1.0 ###")
	createCanvas(windowWidth, windowHeight);
	background(0);
	angleMode(DEGREES)
	createFPS()
}

function keyPressed() {
	gameStart = true
	if (debug == true) {print(key)}
	if (key == "d") {
		dir = 1
	}
	if (key == "a") {
		dir = -1
	}
	if (key == " " && jump == 0) {
		print("space")
		jump = 50
	}
}
function mouseClicked(){if(debug==true){lives--}}
function keyReleased() {
	if (key == "d" && dir>0) {
		if (debug == true) {
			print("-- RELEASE --")
		}
		dir = 0
	}
	if (key == "a" && dir<0) {
		if (debug == true) {
			print("-- RELEASE --")
		}
		dir = 0
	}	
}
function checkTrees() {
	if (collideCircleCircle(skiX, skiY, 50, treeX, treeY, treeSize)) {
		lives-=1
		iFrames = 100
		if (lives < 1 && gameOver == 0) {
			gameOver = 100
		}
	}
}

function checkRocks() {
	if (collideCircleCircle(skiX, skiY, 50, rockX, rockY, rockSize)) {
		lives-=1
		iFrames= 100
		if (lives < 1 && gameOver == 0) {
			gameOver = 100
		}
	}
}

function drawSki() {
	push()
	translate(skiX, skiY)
	if(jump > 0) {
		jump--
		rotate(jump*10)
		var s = (-jump*jump+50*jump)* 0.003
		scale(1+s)
	}
	if(dir>0){rotate(-30)}
	if(dir<0){rotate(30)}
	
	fill(50,100,255, 255)
	rect(0-30, 0-42, 20, 80, 0, 0, 40, 40)
	rect(0+10, 0-42, 20, 80, 0, 0, 40, 40)
	fill(100,200,100, 255)
	ellipse(0, 0, 50, 50)
	// Collision test
	//fill(0,0,0)
	//ellipse(0, 0, 50, 50)
	//fill(255,255,255)
	//textSize2 = textSize()
	//textSize(20)
	//text("C", 0,0)
	//textSize(textSize2)
	pop()
	
}
function drawTree(x,y,size) {
	//print("TREE.")
	fill(112, 70, 60)
	rect(x - 10, y, 20, 20)
	fill(48, 81, 45)
	while (size>10) {
		triangle(x - size, y, x+size, y, x, y-size)
		size -=5
		y -=10
	}
}
function moveTree() {
	treeY -= gspeed
	if (treeY < -100) {
		treeY = windowHeight+200
		treeX = round(random(0, windowWidth))
		treeSize = round(random(20,200))
		if (debug == true) {
			print("moveTree(): Created tree at " + "(" + treeX + ", " + treeY + ")" + ", size=" + treeSize)
		}
	}
}

function drawRocks() {
	fill(200)
	if (debug == true) {
		print("function drawRocks(): Called 'ellipse'")
	}
	ellipse(rockX, rockY, rockSize, rockSize)
}

function moveRocks() {
	rockY -= gspeed
	if (rockY < -100) {
		rockY = windowHeight+200
		rockX = round(random(0, windowWidth))
		rockSize = round(random(10,200))
		if (debug == true) {
			print("moveRocks(): Created rock at " + "(" + rockX + ", " + rockY + ")" + ", size=" + rockSize)
		}
	}
}

function moveCoins() {
	coinY -= gspeed
	if (coinY < 0) {
		coinY = windowHeight+30
		coinX = random(800)
	}
}
function drawCoins() {
	fill(255, 253, 0)
	var loopNumber = frameCount%10
	if (debug == true) {
		print(loopNumber)
	}
	if (loopNumber < 3) { // 0,1,2 
	ellipse(coinX, coinY, 40, 40)
	}
	if ((loopNumber > 2) && (loopNumber < 6)) { // 3,4,5
			ellipse(coinX, coinY, 30, 40)
	}
	if ((loopNumber >= 6) && (loopNumber < 9)) { // 6,7,8
		ellipse(coinX, coinY, 20, 40)
	}
	if ((loopNumber >= 9) && (loopNumber < 12)) { // 9,10,11
		ellipse(coinX, coinY, 30, 40)
	}
}


function checkCoins() {
	if (collideCircleCircle(skiX, skiY, 50, coinX, coinY, 40)) {
		coinY = 600
		coinX = random(800)
		score +=100
		gspeed+=0.5
		skiSpeed+=0.5
	}
}
function moveSki() {
	skiX += skiSpeed * dir
	if (skiX < -50) {
		skiX = windowWidth+50
	}
	if (skiX > windowWidth+50) {
		skiX = -50
	}
}
function drawLives() {
	var i = 0
	while (i < lives) {
		fill(255, 100, 100)
		//fill(50,100,255, 255)
		rect(600-30 + (i*40), 80-42, 10, 40, 0, 0, 40, 40)
		rect(600+10-20 + (i*40), 80-42, 10, 40, 0, 0, 40, 40)
		//fill(100,200,100, 255)
		ellipse(600-15 + (i*40), 55, 20, 20)
		i++
	}
}

function checkLives() {
	if (lives < 1 && gameOver == 0) {
		gameOver = 100
	}
}

function timePoints() {
	if (frameCount % 60 == 0) {
		score += 1
	}
}


function reset() {
	lives = 5
	score = 0
	skiX = 400
	rockX = 600
	rockX = random(0, windowWidth)
	treeY = 500
	treeX = random(0, windowWidth)
	gameStart = false
	gspeed = 3
	skiSpeed = 5
}
function draw() {
	push()
	background(255,250,250)
	updateFPS();
	//drawSki()

	if (gameOver >100) {
		gameOver--
		if (gameOver == 0) {
			reset()
		}
	}
	drawTree(treeX, treeY, treeSize)
	drawRocks()
	if (iFrames == 0 || iFrames%10 < 5) {
		drawSki()
	}
	if (iFrames > 0 && gameStart) {iFrames--}
	if (gameOver == 0 && gameStart) {
		moveRocks()
		moveTree()
		moveCoins()
		moveSki()
		timePoints()
	}
	if (jump == 0 && iFrames == 0){checkRocks()}
	if (jump == 0 && iFrames == 0){checkTrees()}
	drawCoins()
	checkCoins()
	drawLives()
	textSize(50)
	if (gameOver > 0) { // gameover from [https://openprocessing.org/sketch/2754980]
		fill(0)
		textSize(70)
		text("Game Over", 500, 280)
		gameOver -= 1
		if (gameOver == 0) {
			reset()
		}
	}
	fill(0)
	text(score, 100, 100)
	//rect(100, 100, 50, 50)
	pop()
}

const canvas = document.getElementById("main_canvas");
const turtle = document.getElementById("turtle");

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

let isPenDown = false;

let x = 100;
let y = 100;
let angle = 0;	//in radians

ctx.moveTo(x, y);

function forward(distance) {
	console.log(angle);
	const dx = distance * Math.sin(angle);
	const dy = -distance * Math.cos(angle);
	
	const newX = x + dx;
	const newY = y + dy;
	
	draw(newX, newY);
	
	console.log(`dx: ${dx}, dy: ${dy}, x: ${x}, y: ${y}`);
}

function left(angleDeg) {
	rotate(-angleDeg)
}

function right(angleDeg) {
	rotate(angleDeg);
}

function rotate(angleDeg) {
	setAngle(toDeg(angle) + angleDeg);
}

function setAngle(angleDeg) {
	angle = toRad(angleDeg) % (2*Math.PI);
	turtle.style.transform = `translate(-15px, -15px) rotate(${angleDeg}deg)`;
}

window.forward = forward;
window.setAngle = setAngle;
window.left = left;
window.right = right;

penDown();

ctx.fillStyle = "rgb(200 0 0)";
ctx.fillRect(10, 10, 50, 50);

ctx.fillStyle = "rgb(0 0 200 / 50%)";
ctx.fillRect(30, 30, 50, 50);

function draw(destX, destY) {
	if(isPenDown) {
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(destX, destY);
		ctx.stroke();
		
		x = destX;
		y = destY;
	} else {
		ctx.moveTo(destX, destY);
	}
	
	turtle.style.left = destX + "px";
	turtle.style.top = destY + "px";
}

function penDown() {
	isPenDown = true;
}

function penUp() {
	isPenDown = false;
}

function toRad(deg) {
	return deg/180 * Math.PI;
}

function toDeg(rad) {
	return rad/Math.PI * 180;
}

function untilDone() {
	let startX = x;
	let startY = y;
	
	let count = 0;
	
	while(true) {
		for(let j = 0; j < 5; j++) {
			for(let i = 0; i < 10; i++) {
				forward(30);
				right(5);
			}
			
			right(89);
		}
		
		if(compare(startX, x) && compare(startY, y)) break;
		
		if(++count > 10000) break;
	}
}

window.untilDone = untilDone;

function compare(v1, v2) {	//check if two numbers are almost the same (considering floating point error)
	if(Math.abs(v1-v2) < 1e-10) return true;
	return false;
}
const canvas = document.querySelector("canvas");
const content = document.querySelector("#content");
canvas.height = content.offsetHeight;
canvas.width = content.offsetWidth;

let ctx = canvas.getContext("2d");
/*ctx.fillStyle= 'rgba(255, 0 ,30, 0.5)';
ctx.fillRect(100, 100, 199, 199);

ctx.fillStyle= 'rgba(25, 170 ,30, 0.5)';
ctx.fillRect(200, 90, 199, 199);

ctx.beginPath();
ctx.moveTo(50, 300);
ctx.lineTo(200,200);
ctx.strokeStyle= "#fa35a3";
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = `hsl(`+Math.random()*250+`, 80%, 40%)`;
ctx.arc(300, 300, 30, 0, Math.PI*3, false);
ctx.stroke();*/

var mouse = {
  x: 0,
  y: 0
};
var maxRad = 50;
var minRad = 5;

var color = ["#e8d3ff", "#deecff", "#ffe6eb", "#e6f9e0", "#fffcd1"];
window.addEventListener("mousemove", function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", function() {
  canvas.height = content.offsetHeight;
  canvas.width = content.offsetWidth;
  init();
});
function Circle(x, y, dx, dy, rad) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.rad = rad;
  this.color = color[Math.floor(Math.random() * 5)];
  this.minRad = rad;
  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = function() {
    if (this.x + this.rad > innerWidth || this.x - this.rad < 0) {
      this.dx *= -1;
    }
    this.y + this.rad > innerHeight || this.y - this.rad < 0
      ? (this.dy *= -1)
      : (this.dy *= 1);
    this.y += this.dy;
    this.x += this.dx;

    if (
      Math.abs(mouse.x - this.x) < 50 &&
      Math.abs(mouse.y - this.y) < 50 &&
      this.rad < maxRad
    ) {
      this.rad += 1;
    } else if (this.rad > this.minRad) {
      this.rad--;
    }
    this.draw();
  };
}

var circleArr = [];

function init() {
  circleArr = [];
  for (var i = 0; i < 300; i++) {
    var x = Math.random() * (innerWidth - rad * 2) + rad;
    var y = Math.random() * (innerHeight - rad * 2) + rad;
    var rad = Math.random() * 3 + 3;

    var dx = (Math.random() - 0.5) * 5;
    var dy = (Math.random() - 0.5) * 5;

    circleArr.push(new Circle(x, y, dx, dy, rad));
  }
}
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArr.length; i++) {
    circleArr[i].update();
  }
}
init();
animate();

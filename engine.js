var canvas = document.querySelector("canvas");
var cont = canvas.getContext("2d");

var vHeight = window.innerHeight;
var vWidth = window.innerWidth;

canvas.height = vHeight;
canvas.width = vWidth;

//Inputs (angles)
var xangleinput = document.getElementById("x");
var yangleinput = document.getElementById("y");
var zangleinput = document.getElementById("z");

var subtrinput = document.getElementById("subtr");
var fillInput = document.getElementById("fill");

//Plane variables
var screen = [0, 0, -300];
var screenSize = [100, 100];
var eye = [0, 0, -500];
var zn = 500;

//Cube corners coordinates
var pyramid = [
  [-180, -150, -180], //left front 0
  [-180, -150, 180], //left back 1
  [180, -150, -180], //right front 2
  [180, -150, 180], //right back 3
  [0, 230, 0] //head
]

var pyramids = [];
var subtr = subtrinput.value;
var fill = fillInput.value;

//Keeps track of the cube after it's rotation (used to draw the cube only)
var rotatedCube = [];
var rotatedPyramids = [];
var rotatedPyramid = [];

// Connects the edges of a pyramid
function drawPyram(pyraPoints){
  coordinatedi = coordinator([pyraPoints[0][0] * ((zn) / (zn+pyraPoints[0][2])), pyraPoints[0][1] * ((zn) / (zn+pyraPoints[0][2])), 0]);
  coordinatedj = coordinator([pyraPoints[1][0] * ((zn) / (zn+pyraPoints[1][2])), pyraPoints[1][1] * ((zn) / (zn+pyraPoints[1][2])), 0]);
  drawLine(coordinatedi, coordinatedj);

  coordinatedi = coordinator([pyraPoints[1][0] * ((zn) / (zn+pyraPoints[1][2])), pyraPoints[1][1] * ((zn) / (zn+pyraPoints[1][2])), 0]);
  coordinatedj = coordinator([pyraPoints[3][0] * ((zn) / (zn+pyraPoints[3][2])), pyraPoints[3][1] * ((zn) / (zn+pyraPoints[3][2])), 0]);
  drawLine(coordinatedi, coordinatedj);

  coordinatedi = coordinator([pyraPoints[3][0] * ((zn) / (zn+pyraPoints[3][2])), pyraPoints[3][1] * ((zn) / (zn+pyraPoints[3][2])), 0]);
  coordinatedj = coordinator([pyraPoints[2][0] * ((zn) / (zn+pyraPoints[2][2])), pyraPoints[2][1] * ((zn) / (zn+pyraPoints[2][2])), 0]);
  drawLine(coordinatedi, coordinatedj);

  coordinatedi = coordinator([pyraPoints[2][0] * ((zn) / (zn+pyraPoints[2][2])), pyraPoints[2][1] * ((zn) / (zn+pyraPoints[2][2])), 0]);
  coordinatedj = coordinator([pyraPoints[0][0] * ((zn) / (zn+pyraPoints[0][2])), pyraPoints[0][1] * ((zn) / (zn+pyraPoints[0][2])), 0]);
  drawLine(coordinatedi, coordinatedj);

  coordinatedi = coordinator([pyraPoints[4][0] * ((zn) / (zn+pyraPoints[4][2])), pyraPoints[4][1] * ((zn) / (zn+pyraPoints[4][2])), 0]);
  coordinatedj = coordinator([pyraPoints[0][0] * ((zn) / (zn+pyraPoints[0][2])), pyraPoints[0][1] * ((zn) / (zn+pyraPoints[0][2])), 0]);
  drawLine(coordinatedi, coordinatedj);

  coordinatedi = coordinator([pyraPoints[4][0] * ((zn) / (zn+pyraPoints[4][2])), pyraPoints[4][1] * ((zn) / (zn+pyraPoints[4][2])), 0]);
  coordinatedj = coordinator([pyraPoints[1][0] * ((zn) / (zn+pyraPoints[1][2])), pyraPoints[1][1] * ((zn) / (zn+pyraPoints[1][2])), 0]);
  drawLine(coordinatedi, coordinatedj);

  coordinatedi = coordinator([pyraPoints[4][0] * ((zn) / (zn+pyraPoints[4][2])), pyraPoints[4][1] * ((zn) / (zn+pyraPoints[4][2])), 0]);
  coordinatedj = coordinator([pyraPoints[2][0] * ((zn) / (zn+pyraPoints[2][2])), pyraPoints[2][1] * ((zn) / (zn+pyraPoints[2][2])), 0]);
  drawLine(coordinatedi, coordinatedj);

  coordinatedi = coordinator([pyraPoints[4][0] * ((zn) / (zn+pyraPoints[4][2])), pyraPoints[4][1] * ((zn) / (zn+pyraPoints[4][2])), 0]);
  coordinatedj = coordinator([pyraPoints[3][0] * ((zn) / (zn+pyraPoints[3][2])), pyraPoints[3][1] * ((zn) / (zn+pyraPoints[3][2])), 0]);
  drawLine(coordinatedi, coordinatedj);
}

// Used in the fillPyram function to fill a pyramid
function drawPolygon(points, fillStyle){
  cont.beginPath();
  cont.moveTo(points[0][0], points[0][1]);
  for (var i=1; i < points.length; i++){
    cont.lineTo(points[i][0], points[i][1]);
  }
  cont.lineTo(points[0][0], points[0][1]);
  cont.fillStyle = fillStyle;
  cont.fill();
}

// Fills a pyramid
function fillPyram(pyraPoints){
  // [0, 1, 2, 3, 4]
  var lf = coordinator([pyraPoints[0][0] * ((zn) / (zn+pyraPoints[0][2])), pyraPoints[0][1] * ((zn) / (zn+pyraPoints[0][2])), 0]);
  var lb = coordinator([pyraPoints[1][0] * ((zn) / (zn+pyraPoints[1][2])), pyraPoints[1][1] * ((zn) / (zn+pyraPoints[1][2])), 0]);
  var rf = coordinator([pyraPoints[2][0] * ((zn) / (zn+pyraPoints[2][2])), pyraPoints[2][1] * ((zn) / (zn+pyraPoints[2][2])), 0]);
  var rb = coordinator([pyraPoints[3][0] * ((zn) / (zn+pyraPoints[3][2])), pyraPoints[3][1] * ((zn) / (zn+pyraPoints[3][2])), 0]);
  var top = coordinator([pyraPoints[4][0] * ((zn) / (zn+pyraPoints[4][2])), pyraPoints[4][1] * ((zn) / (zn+pyraPoints[4][2])), 0]);

  drawPolygon([lf, rf, top], "white");
  drawPolygon([lb, lf, top], "white");
  drawPolygon([lb, rb, top], "white");
  drawPolygon([rb, rf, top], "white");
  drawPolygon([lf, lb, rb, rf], "white");
}

//Clears the screen
function clearScreen(){
  cont.clearRect(0, 0, vWidth, vHeight);
}

//Draw x and y axis
function drawCenter(){
  cont.strokeStyle = "#333333";
  cont.lineWidth = 3;

  cont.beginPath();
  cont.moveTo(vWidth/2, 0);
  cont.lineTo(vWidth/2, vHeight);
  cont.stroke();

  cont.beginPath();
  cont.moveTo(0, vHeight/2);
  cont.lineTo(vWidth, vHeight/2);
  cont.stroke();
}

//Draw a dot in a certain coordinates
function drawDot(coords){
  cont.beginPath();
  coordinated = [coords[0] * ((zn) / (zn+coords[2])), coords[1] * ((zn) / (zn+coords[2])), coords[2]];
  coordinated = coordinator(coordinated)
  cont.arc(coordinated[0], coordinated[1], 5, 0, Math.PI * 2, true);
  cont.fillStyle = "red";
  cont.fill();
}

//Draw a line between two points
function drawLine(p1, p2){
  cont.strokeStyle = "#FFFFFF";
  cont.lineWidth = 1;
  cont.beginPath();
  cont.moveTo(p1[0], p1[1]);
  cont.lineTo(p2[0], p2[1]);
  cont.stroke();
}

//Transforms math coordinates into screen coordinates ((0, 0) means the center of the screen)
function coordinator(coordinates){
  return [vWidth/2+coordinates[0], vHeight/2-coordinates[1], coordinates[2]];
}

//Rotates the cube around the x axis
function rotateX(vector, angle){
  matrix = [Math.cos(angle), -Math.sin(angle), 0, Math.sin(angle), Math.cos(angle), 0, 0, 0, 1];
  return matrixVectorMultiply(matrix, vector);
}

//Rotates the cube around the y axis
function rotateY(vector, angle){
  matrix = [Math.cos(angle), 0, Math.sin(angle), 0, 1, 0, -Math.sin(angle), 0, Math.cos(angle)];
  return matrixVectorMultiply(matrix, vector);
}

//Rotates the cube around the z axis
function rotateZ(vector, angle){
  matrix = [1, 0, 0, 0, Math.cos(angle), -Math.sin(angle), 0, Math.sin(angle), Math.cos(angle)];
  return matrixVectorMultiply(matrix, vector);
}

//Redraw/Refill the pyramid when any of the angles is changed
function angleChangedPyra(){
  clearScreen();
  drawCenter();
  rotatedPyramids = [];

  for (var i=0; i < pyramids.length; i++){ //for every pyramid
    rotatedPyramid = [];
    for (var j=0; j < pyramid.length; j++){ //for every dot
      rotatedPyramid.push(rotateX(rotateY(rotateZ(pyramids[i][j], zangleinput.value), yangleinput.value), xangleinput.value));
    }
    if (fill){
      fillPyram(rotatedPyramid);
    } else {
      drawPyram(rotatedPyramid);
    }
  }
}

function drawAllDots(dots){
  for (var i = 0; i<dots.length; i++){
    drawDot(dots[i]);
  }
}

function midPoint(p0, p1){
  return [(p0[0]+p1[0])/2, (p0[1]+p1[1])/2, (p0[2]+p1[2])/2]
}

function sierpinski(py, limit){
  if (limit > 0){
    var basecenter = midPoint(py[0], py[3]);

    var lft = midPoint(py[0], py[4]);
    var lflb = midPoint(py[0], py[1]);
    var lfrf = midPoint(py[0], py[2]);

    var lbt = midPoint(py[1], py[4]);
    var lbrb = midPoint(py[1], py[3]);

    var rbt = midPoint(py[3], py[4]);
    var rfrb = midPoint(py[2], py[3]);

    var rft = midPoint(py[2], py[4]);

    sierpinski([py[0], lflb, lfrf, basecenter, lft], limit - 1);
    sierpinski([lflb, py[1], basecenter, lbrb, lbt], limit - 1);
    sierpinski([basecenter, lbrb, rfrb, py[3], rbt], limit - 1);
    sierpinski([lfrf, basecenter, py[2], rfrb, rft], limit - 1);
    sierpinski([lft, lbt, rft, rbt, py[4]], limit - 1);

  } else {
    pyramids.push(py);
  }
}

xangleinput.addEventListener("input", function(){
  angleChangedPyra();
});

yangleinput.addEventListener("input", function(){
  angleChangedPyra();
});

zangleinput.addEventListener("input", function(){
  angleChangedPyra();
});

subtrinput.addEventListener("input", function(){
  subtr = subtrinput.value;
  pyramids = [];
  sierpinski(pyramid, subtr);
});

fillInput.addEventListener("input", function(){
  fill = fillInput.checked;
})

//Multiplies a vector by a matrix
function matrixVectorMultiply(matrix, vector){
  result = [
    matrix[0] * vector[0] + matrix[1] * vector[1] + matrix[2] * vector[2],
    matrix[3] * vector[0] + matrix[4] * vector[1] + matrix[5] * vector[2],
    matrix[6] * vector[0] + matrix[7] * vector[1] + matrix[8] * vector[2],
  ];
  return result;
}

//Increments the angles by a certain value every x ms
//var addX = setInterval(increaseX, 10);
var addY = setInterval(increaseY, 10);
//var addZ = setInterval(increaseZ, 10);

function increaseX(){
  if (zangleinput.value >= 3.14){
    zangleinput.value = -3.14;
  } else {
    value = parseFloat(zangleinput.value) + 0.01
    zangleinput.value = value;
  }
  angleChangedPyra();
}

function increaseY(){
  if (yangleinput.value >= 3.14){
    yangleinput.value = -3.14;
  } else {
    yangleinput.value = parseFloat(yangleinput.value) + 0.01;
  }
  angleChangedPyra();
}

function increaseZ(){
  if (xangleinput.value >= 3.14){
    xangleinput.value = -3.14;
  } else {
    xangleinput.value = parseFloat(xangleinput.value) + 0.01;
  }
  angleChangedPyra();
}

drawCenter();
sierpinski(pyramid, subtr);
angleChangedPyra();
var iterations = 0;		//row Count
var ruleNum ;			//rule Number
var cellsCount ;		// number of cells in a row
var height = 1000;  	//need to create a canvas
var intervalID;
var canvas;				//canvas object
var canvasData;
var ctx;
var startBtn;
var width;				//number of cells in a row

/*init process*/
var startProcess = function() {
	init();
	generatePoints();
};

var init = function(){
	iterations = 0;
	formInitialise();
	CA.initialize(cellsCount,ruleNum);
	start();
}

/*Initialise with specified parameters.*/
var formInitialise = function() {
	startBtn = $("#startBtn");
	ruleNum = $("#rule").val();
	cellsCount = $("#cellsCount").val();
	width = cellsCount;
	
	canvas = document.getElementById('ca');
	ctx = canvas.getContext("2d");
	ctx.restore();
	canvasData = ctx.createImageData(cellsCount, height);	
};

/*create rows*/
var generatePoints = function() {
    iterations++;
	var arr = CA.getCellsArray();
	//console.log(arr);
    drawPixels(CA.nextRow(arr),iterations);
    if ( iterations >= 1000) {
      stop();
    }
};

var drawPixels = function(bits,count) {
	//console.log('pixels '+ count);
	//console.log(bits);
	var rowOff = count*4*width;
    var v;
    for (var i=0; i < width; i++) {
      v = (1-bits[i]) * 255;
      canvasData.data[rowOff + i*4 ] = v;   // Red
      canvasData.data[rowOff + i*4 + 1] = v;   // Green
      canvasData.data[rowOff + i*4 + 2] = v;   // Blue
      canvasData.data[rowOff + i*4 + 3] = 255; // Alpha
    }
	updateCanvas();
};
 
function updateCanvas() {
    ctx.putImageData(canvasData, 0, 0);
}

var start = function() {
	ctx.save();
	drawPixels(CA.getCellsArray(),iterations);
	intervalID = setInterval(generatePoints, 0);
	startBtn.text("Start Again");
};

var stop = function(){
	//console.log("stopped");
	//alert('stopped');
	intervalID = clearInterval(intervalID);
	ctx.restore(); 	
};
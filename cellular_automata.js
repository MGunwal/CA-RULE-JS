var CA = function(){
//initialize variables
var w; //number of cells in a row
var ruleset; // array of rule bits
var cellsArray;

//make rule set
var buildRuleSet = function(ruleNum) {
	var num = parseInt(ruleNum);
    var binary = num.toString(2); //change to binary
	var ruleset = [];
    for (var i=binary.length-1; i>=0; i--) {		
      ruleset.push(parseInt(binary[i],2));
    }
    for (i=ruleset.length; i < 8; i++) {
      ruleset.push(0); // Padding to full 8 bits.
    }
	//console.log(ruleset);
    return ruleset;
};

//first row - keeping middle cell alive
var initRow = function(w) {
    var arr = [];
    for (var i=0; i < w; i++) {
      arr[i] = 0;
    }
	arr[Math.floor(w/2)] = 1;
    return arr;
};

var generate = function(cells) {
	var nextGen = new Array();
	var x; var y; var z;
    for (var i=0; i < w; i++) {
		x = i>0 ? cells[i-1] : 0;
		y = cells[i];
		z = i<w-1 ? cells[i+1] : 0;
		//var index = 4*x + 2*y +z;
		//nextGen[i] = ruleset[index];
		nextGen[i] = rules(x,y,z);
    }
	cells = nextGen.slice();
	return cells;
};

var rules = function(a,b,c){
	var string = "" + a + b + c;
	var index = parseInt(string,2);
    return ruleset[index];
};

return {
	getCellsArray : function() {
		return cellsArray;
	},
  
	nextRow : function() {
		cellsArray = generate(cellsArray);
		return cellsArray;
	},

	initialize : function (cellsCount, ruleNum){
		w = cellsCount;
		cellsArray = initRow(w);
		ruleset = buildRuleSet(ruleNum);
	}
};
}();
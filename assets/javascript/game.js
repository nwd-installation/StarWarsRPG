function placeFighter(index, lightSideDarkSide) {
	if (index < sith.name.length) {
/* var imageContainer = $("<div>");
    imageContainer.addClass("col");
	$("#"+lightSideDarkSide).append(imageContainer);
*/ 
 var imageFighter = $("<img>");
    imageFighter.addClass(lightSideDarkSide + "-image");
	imageFighter.attr('id', sith.name[index]);
    imageFighter.attr("src", sith.imagePath[index]);
	imageFighter.attr("attack-value", sith.attack[index]);
	imageFighter.attr("alt", sith.name[index]);
    $("#"+lightSideDarkSide).append(imageFighter);
	
	}	

}

function placeJedi(index, lightSideDarkSide) {

if (index < jedi.name.length) {
/*
var imageContainer = $("<div>");
    imageContainer.addClass("col");
	$("#"+lightSideDarkSide).append(imageContainer);
*/
 var imageFighter = $("<img>");
    imageFighter.addClass(lightSideDarkSide + "-image");
	imageFighter.attr('id', jedi.name[index]);
    imageFighter.attr("src", jedi.imagePath[index]);
	imageFighter.attr("attack-value", jedi.attack[index]);
	imageFighter.attr("alt", jedi.name[index]);
    $("#"+lightSideDarkSide).append(imageFighter);
	}	

}

var jedi = {
	
	name	: ["Obi-Wan Kenobi", "Qui-Gon Jinn", "Mace Windu", "Yoda", "Anakin Skywalker"],
	imagePath	: ["./assets/images/ObiWanKenobi.jpg","./assets/images/QuiGonJinn.jpg","./assets/images/MaceWindu.jpg","./assets/images/Yoda.jpg","./assets/images/Anakin.jpg"],
	attack	: [1,2,3,4,5]
};
	
var sith = {
	name	: ["Darth Maul", "Darth Plagueis", "Chancellor Palpatine", "Darth Vader", "Darth Sidious"],
	imagePath	: ["./assets/images/DarthMaul.jpeg","./assets/images/DarthPlagueis.jpg","./assets/images/Palpatine.jpg","./assets/images/DarthVader.jpg","./assets/images/DarthSidious.jpeg"],
	attack	: [1,2,3,4,5]
};
 

var gameOver = false;
var turnCounter = 0;


$("#next-turn").on("click", function() {
console.log ("Next Turn Clicked"); turnCounter++; placeFighter(turnCounter-1, "sith"); placeJedi(turnCounter-1, "jedi"); 
});

	
$(".jedi-image").on("click", function() {

var fighter = {
	name	:	$(this).attr("alt"),
	attack	:	$(this).attr("attack-value")
};
console.log ("You have chosen " + fighter.name);
console.log (fighter.name + " deals " + fighter.attack + " damage.") ;
});
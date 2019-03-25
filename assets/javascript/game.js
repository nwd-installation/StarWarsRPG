function placeFighter(index) {
	if (index < sith.name.length) {
var imageVillainContainer = $("<div>");
    imageVillainContainer.addClass("col");
	$("#sith").append(imageVillainContainer);

 var imageVillain = $("<img>");
    imageVillain.addClass("sith-image");
	imageVillain.attr('id', sith.name[index]);
    imageVillain.attr("src", sith.imagePath[index]);
	imageVillain.attr("attack-value", sith.attack[index]);
	imageVillain.attr("alt", sith.name[index]);
    $("#sith").append(imageVillain);
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
 
// for (var i = 0; i < 5; i++) {
/*
    var imageHeroContainer = $("<div>");
    imageHeroContainer.addClass("col");
	$("#jedi").append(imageHeroContainer);
	/*
	var imageHero = $("<img>");
    imageHero.addClass("jedi-image");
	imageHero.attr('id', jedi.name[i]);
    imageHero.attr("src", jedi.imagePath[i]);
	imageHero.attr("attack-value", jedi.attack[i]);
	imageHero.attr("alt", jedi.name[i]);
    $("#jedi").append(imageHero); */
/* }
for (var i = 0; i < 5; i++) {
	
	var imageVillainContainer = $("<div>");
    imageVillainContainer.addClass("col");
	$("#sith").append(imageVillainContainer);

    var imageVillain = $("<img>");
    imageVillain.addClass("sith-image");
	imageVillain.attr('id', sith.name[i]);
    imageVillain.attr("src", sith.imagePath[i]);
	imageVillain.attr("attack-value", sith.attack[i]);
	imageVillain.attr("alt", sith.name[i]);
    $("#sith").append(imageVillain); 
} */

var gameOver = false;
var turnCounter = 0;
var nextTurn = true;


$("#next-turn").on("click", function() {
console.log ("Next Turn Clicked"); turnCounter++; console.log(turnCounter); placeFighter(turnCounter-1);
});



while (!gameOver && nextTurn) {
// turnCounter++; console.log(turnCounter);
nextTurn = false;

var imageHeroContainer = $("<div>");
    imageHeroContainer.addClass("col");
	$("#jedi").append(imageHeroContainer);

var imageHero = $("<img>");
    imageHero.addClass("jedi-image");
	imageHero.attr('id', jedi.name[turnCounter]);
    imageHero.attr("src", jedi.imagePath[turnCounter]);
	imageHero.attr("attack-value", jedi.attack[turnCounter]);
	imageHero.attr("alt", jedi.name[turnCounter]);
    $("#jedi").append(imageHero); 
	
$(".jedi-image").on("click", function() {

var fighter = {
	name	:	$(this).attr("alt"),
	attack	:	$(this).attr("attack-value")
};
console.log ("You have chosen " + fighter.name);
console.log (fighter.name + " deals " + fighter.attack + " damage.") ;
});


	
	//pause for input
	//prompt for attack

/*   
$(".sith-image").on("click", function() {
var fighter = {
	name	:	$(this).attr("alt"),
	attack	:	$(this).attr("attack-value")
};

console.log ("You are fighting " + fighter.name);
console.log (fighter.name + " does " + fighter.attack + " damage.") ;

}); */ 



}
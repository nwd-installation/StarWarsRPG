
var jedi = {
	
	name	: ["Obi-Wan Kenobi", "Qui-Gon Jinn", "Yoda", "Mace Windu", "Anakin Skywalker"],
	imagePath	: ["./assets/images/ObiWanKenobi.jpg","./assets/images/QuiGonJinn.jpg","./assets/images/yoda.jpg","./assets/images/MaceWindu.jpg","./assets/images/anakin.jpg"],
	attack	: [1,2,3,4,5]
};
	
var sith = {
	name	: ["Darth Maul", "Darth Plagueis", "Chancellor Palpatine", "Darth Vader", "Darth Sidious"],
	imagePath	: ["./assets/images/DarthMaul.jpeg","./assets/images/DarthPlagueis.jpg","./assets/images/DarthSidious.jpeg","./assets/images/DarthVader.jpg","./assets/images/DarthSidious.jpeg"],
	attack	: [1,2,3,4,5]
};

for (var i = 0; i < 5; i++) {

    var imageHero = $("<img>");
    imageHero.addClass("jedi-image");
	imageHero.attr('id', jedi.name[i]);
    imageHero.attr("src", jedi.imagePath[i]);
	imageHero.attr("attack-value", jedi.attack[i]);
	imageHero.attr("alt", jedi.name[i]);
    $("#jedi").append(imageHero);
}
for (var i = 0; i < 5; i++) {

    var imageVillain = $("<img>");
    imageVillain.addClass("sith-image");
	imageVillain.attr('id', sith.name[i]);
    imageVillain.attr("src", sith.imagePath[i]);
	imageVillain.attr("attack-value", sith.attack[i]);
	imageVillain.attr("alt", sith.name[i]);
    $("#sith").append(imageVillain);
}

$(".jedi-image").on("click", function() {

var fighter = {
	name	:	$(this).attr("alt"),
	attack	:	$(this).attr("attack-value")
};

console.log ("You have chosen " + fighter.name);
console.log (fighter.name + " does " + fighter.attack + " damage.") ;
   
   
$(".sith-image").on("click", function() {
var fighter = {
	name	:	$(this).attr("alt"),
	attack	:	$(this).attr("attack-value")
};

console.log ("You are fighting " + fighter.name);
console.log (fighter.name + " does " + fighter.attack + " damage.") ;
})
});
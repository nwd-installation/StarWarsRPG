var opponentLife = 20;
var playerLife = 20;
// sides = ["sith", "jedi"];
// side = sides[Math.floor(Math.random * 2)]; // to randomize which side goes first. should also add logic for which side player is playing as


//definitions to be used: a turn is all phases of a single player's turn (whether it is player or opponent). A round is a complete round of all players' turns.
//game should inform player: your turn. Click "Attack to select attackers or click use ability to use a fighter's abilities"
//note: a fighter may not attack or use abilities until he has been out for one full round, although he can defend ("block")
//continued: if the fighter attacked during a player's last turn, that player may not block or use abilities until the player's next turn (technically, the untap phase)
//phases of a player's turn are untap, upkeep, attack/use abilities (note, what about abilities being played as "instant"?)

function placeFighter(index, lightSideDarkSide) {
	if (index < sith.name.length) { 
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
		var imageFighter = $("<img>");
		imageFighter.addClass(lightSideDarkSide + "-image");
		imageFighter.attr('id', jedi.name[index]);
		imageFighter.attr("src", jedi.imagePath[index]);
		imageFighter.attr("attack-value", jedi.attack[index]);
		imageFighter.attr("alt", jedi.name[index]);
		$("#"+lightSideDarkSide).append(imageFighter);
	}	
}

/*
var fighter = {
	
	Obi-Wan Kenobi: {rank:1,side:"jedi",justsummoned=true},
	Qui-Gon Jinn: {rank:2,side:"jedi",justsummoned=true},
	Mace Windu: {rank:3,side:"jedi",justsummoned=true},
	Yoda: {rank:4,side:"jedi",justsummoned=true},
	Anakin Skywalker: {rank:5,side:"jedi",justsummoned=true},
	Darth Maul: {rank:1,side:"sith",justsummoned=true},
	Darth Plagueis: {rank:2,side:"sith",justsummoned=true},
	Chancellor Palpatine: {rank:3,side:"sith",justsummoned=true},
	Darth Vader: {rank:4,side:"sith",justsummoned=true},
	Darth Sidious: {rank:5,side:"sith",justsummoned=true}
}
*/

var jedi = {
	
	name	: ["Obi-Wan Kenobi", "Qui-Gon Jinn", "Mace Windu", "Yoda", "Anakin Skywalker"],
	imagePath	: ["./assets/images/ObiWanKenobi.jpg","./assets/images/QuiGonJinn.jpg","./assets/images/MaceWindu.jpg","./assets/images/Yoda.jpg","./assets/images/Anakin.jpg"],
	attack	: [1,2,3,4,5],
	hp		: [1,2,3,4,5],
	attackedThisTurn	: [false, false, false, false, false]
};
	
var sith = {
	name	: ["Darth Maul", "Darth Plagueis", "Chancellor Palpatine", "Darth Vader", "Darth Sidious"],
	imagePath	: ["./assets/images/DarthMaul.jpeg","./assets/images/DarthPlagueis.jpg","./assets/images/Palpatine.jpg","./assets/images/DarthVader.jpg","./assets/images/DarthSidious.jpeg"],
	attack	: [1,2,3,4,5],
	hp		: [1,2,3,4,5],
	attackedThisTurn	: [false, false, false, false, false]
};
 

var gameOver = false;
var turnCounter = 0;
placeJedi(turnCounter, "jedi"); 



function nextTurn() { // add argument parameter: side, to be used in the various functions for each phase

//untapPhase(side)
//upkeepPhase(side)  // note, is this needed?
//attackphasePhase(side)
	
	for (i = 0; i < jedi.name.length; i++) {
	var targetDiv = document.getElementById(jedi.name[i]);
	if (targetDiv) targetDiv.classList.remove("selected-fighter");  }
	placeFighter(turnCounter, "sith");
	// opponent will attack if able, or use abilities, before next jedi is placed
	// need to indicate on screen what phase it is
	if (turnCounter > 0) {
		var attacking = [];
		var attackval = 0;
		var iteratorLimit;
		if (turnCounter > sith.name.length) iteratorLimit = sith.name.length; // only iterate up to the number of fighters
		else iteratorLimit = turnCounter;
		for (var i = 0; i < iteratorLimit; i++) {
			attacking.push(sith.name[i]);
			attackval += sith.attack[i];
		}
		console.log("Opponent is attacking with:");
		console.log(attacking);
		console.log("For a total of " + attackval + " attack points.");
		//need to implement a blocking mechanic.
		console.log("Select fighters to block.");
		
		playerLife -= attackval; console.log("Your life points have decreased to " + playerLife);
		if (playerLife < 1) {console.log ("You lose! Game Over"); gameOver = true;}
	}
	for (var i = 0; i <= turnCounter; i++) 
	{
		jedi.attackedThisTurn[i] = false;
		// jedi.hp[i] = jedi.attack[i]; //this is meant to restore fighter HP-- we may want to remove this if we decide that HP don't recover automatically, or recover slowly, etc
	}
	placeJedi(++turnCounter, "jedi");
}

document.addEventListener('click', clickListener);

function clickListener(event) {
if (gameOver) {document.removeEventListener('click', clickListener); return; }
	var clickedValue = event.target.attributes;
	if (clickedValue[0].value === "next-turn") nextTurn();
	if (clickedValue[0].value === "jedi-image") {	
		var fighter = {
			name	:	clickedValue[1].value,
			attack	:	clickedValue[3].value
		};
		
		if (turnCounter >= fighter.attack && jedi.hp[fighter.attack] > 0 && !jedi.attackedThisTurn[fighter.attack]) { //i.e., that means that the fighter has been out for at least one turn, and has positive hit points 
		var targetDiv = document.getElementById(fighter.name);
		targetDiv.setAttribute("class", "jedi-image selected-fighter");
		opponentLife -= fighter.attack;
		jedi.attackedThisTurn[fighter.attack] = true;
		console.log (fighter.name + " deals " + fighter.attack + " damage.") ;
		console.log("Opponent is now at " + opponentLife + " life.");
		}
		if (opponentLife < 1) { console.log("You won! Game Over"); gameOver = true;}
	}
}
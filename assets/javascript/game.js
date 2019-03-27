//definitions to be used: a turn is all phases of a single player's turn (whether it is player or opponent). A round is a complete round of all players' turns.
//game should inform player: your turn. Click "Attack to select attackers or click use ability to use a fighter's abilities"
//note: a fighter may not attack or use abilities until he has been out for one full round, although he can defend ("block")
//continued: if the fighter attacked during a player's last turn, that player may not block or use abilities until the player's next turn (technically, the untap phase)
//phases of a player's turn are untap, upkeep, attack/use abilities (note, what about abilities being played as "instant"?)

// note: once the blocking functionality is added, then I will need to add logic to allow the attacking player to decide how the damage gets spread out. or, just let the strongest absorb it first in order to simplify it. not sure yet about trample mechanics. i.e., should excess damage carry over to player? also, should attackers receive damage from their combatants (the blockers) as well as the blockers from the attackers?

//to automate the defense as much as possible, all damage points done to blockers will be divided evenly by applying them one point at a time to the blocking defenders, starting with the strongest blocker, and in descending order of hp.

//only one attack of x fighters per turn

//classes of fighter img elements will be of the pattern: fighter jedi or fighter sith

//its about time for a refactor


var textElements = {
	turnTrackerText : document.getElementById("turn-tracker"),
	roundTrackerText : document.getElementById("round-tracker"),
	playerHPText : document.getElementById("player-health"),
	opponentHPText : document.getElementById("opponent-health")
	// notificationText : document.getElementById("notifications")
};  

// sides = ["sith", "jedi"];
// side = sides[Math.floor(Math.random * 2)]; // to randomize which side goes first. should also add logic for which side player is playing as

var currentSideTurn = "jedi"; textElements.turnTrackerText.textContent = currentSideTurn;
var opponentLife = 20; textElements.opponentHPText.textContent = opponentLife;
var playerLife = 20; textElements.playerHPText.textContent = playerLife;
var roundCounter = 0; textElements.roundTrackerText.textContent = roundCounter+1;


var attackButtonClicked = false;
var abilityButtonClicked = false;

// function highlightFighterByElement() {} // function takes in an element of a fighter and colors its border in the indicated color
// function highlightFighterByName() {} // function takes in an name of a fighter and colors its border in the indicated color
// function selectFighterByElement() {} // function takes in an element of a fighter and "selects it" by adjusting its margins to move it down and right
// function selectFighterByName() {} // function takes in an name of a fighter and selects it" by adjusting its margins to move it down and right



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
		jedi.inPlay[index] = true;
		jedi.inPlay[index] = true;
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
	attackedThisTurn	: [false, false, false, false, false],
	inPlay	: [false, false, false, false, false]
};
	
var sith = {
	name	: ["Darth Maul", "Darth Plagueis", "Chancellor Palpatine", "Darth Vader", "Darth Sidious"],
	imagePath	: ["./assets/images/DarthMaul.jpeg","./assets/images/DarthPlagueis.jpg","./assets/images/Palpatine.jpg","./assets/images/DarthVader.jpg","./assets/images/DarthSidious.jpeg"],
	attack	: [1,2,3,4,5],
	hp		: [1,2,3,4,5],
	attackedThisTurn	: [false, false, false, false, false],
	inPlay	: [false, false, false, false, false]
};
 

var gameOver = false;
placeJedi(roundCounter, "jedi"); 



function nextTurn() { // add argument parameter: side, to be used in the various functions for each phase

//untapPhase(side)
//upkeepPhase(side)  // note, is this needed?
//attackphasePhase(side)
	
	for (i = 0; i < jedi.name.length; i++) {
		var targetDiv = document.getElementById(jedi.name[i]);
		if (targetDiv){
			targetDiv.classList.remove("highlighted-fighter");
			targetDiv.classList.replace("selected-fighter","unready");
		}
	}
	placeFighter(roundCounter, "sith");
	// opponent will attack if able, or use abilities, before next jedi is placed
	// need to indicate on screen what phase it is
	if (roundCounter > 0) {
		var attacking = [];
		var attackval = 0;
		var iteratorLimit;
		if (roundCounter > sith.name.length) iteratorLimit = sith.name.length; // only iterate up to the number of fighters
		else iteratorLimit = roundCounter;
		for (var i = 0; i < iteratorLimit; i++) {
			attacking.push(sith.name[i]);
			attackval += sith.attack[i];
		}
		console.log("Opponent is attacking with:");
		console.log(attacking);
		console.log("For a total of " + attackval + " attack points.");
		//need to implement a blocking mechanic.
		console.log("Select fighters to block.");
		
		playerLife -= attackval; console.log("Your life points have decreased to " + playerLife); textElements.playerHPText.textContent = playerLife;
		if (playerLife < 1) {console.log ("You lose! Game Over"); gameOver = true;}
	}
	targetDiv = document.getElementById("next-turn"); targetDiv.classList.replace("inactive-button","control-button2"); 
	attackButtonClicked = false; targetDiv = document.getElementById("attack-button"); targetDiv.classList.replace("inactive-button","control-button");
	abilityButtonClicked = false; targetDiv = document.getElementById("ability-button"); targetDiv.classList.replace("inactive-button","control-button");
	currentSideTurn = "jedi"; textElements.turnTrackerText.textContent = currentSideTurn;
	for (var i = 0; i <= roundCounter; i++) 
	{
		jedi.attackedThisTurn[i] = false;
		// jedi.hp[i] = jedi.attack[i]; //this is meant to restore fighter HP-- we may want to remove this if we decide that HP don't recover automatically, or recover slowly, etc
	}
	for (i = 0; i < jedi.name.length; i++) {
		var targetDiv = document.getElementById(jedi.name[i]);
		if (targetDiv) targetDiv.classList.remove("unready");
	}
	placeJedi(++roundCounter, "jedi");
	textElements.roundTrackerText.textContent = roundCounter+1;
}

function clickListener(event) {
	if (gameOver) {document.removeEventListener('click', clickListener); return; }
	var clickedValue = event.target;
	// console.log(clickedValue.attributes[0]);
	if (clickedValue.attributes[0]) { console.log(clickedValue.attributes[0].value); console.log(attackButtonClicked);
		if (clickedValue.attributes[0].value === "next-turn") { clickedValue.classList.replace("control-button2","inactive-button");  currentSideTurn = "sith"; textElements.turnTrackerText.textContent = currentSideTurn; nextTurn(); }
		else if (clickedValue.attributes[0].value === "attack-button" && abilityButtonClicked === false) {
			if (attackButtonClicked === false) {
				attackButtonClicked = true; clickedValue.classList.replace("control-button","inactive-button"); console.log("Select fighter(s) to attack opponent with");
				for (x = 0; x < jedi.name.length; x++) {
					if (roundCounter >= jedi.attack[x] && jedi.inPlay[x] === true){
						var targetDiv = document.getElementById(jedi.name[x]);
						targetDiv.classList.add("highlighted-fighter");
					}
				}
			}
				//highlight all fighters able to attack. if they get clicked, add them to the attacking party. if they get unclicked, remove them.
			else { attackButtonClicked = false; clickedValue.classList.replace("inactive-button","control-button");
				for (x = 0; x < jedi.name.length; x++) {
						if (roundCounter >= jedi.attack[x] && jedi.inPlay[x] === true){
							var targetDiv = document.getElementById(jedi.name[x]);
							targetDiv.classList.remove("highlighted-fighter");
						}
				}
			}
		}																					
		else if (clickedValue.attributes[0].value === "ability-button" && attackButtonClicked === false) {
			if(!abilityButtonClicked) { abilityButtonClicked = true; clickedValue.classList.replace("control-button","inactive-button"); console.log("Select fighter to use ability"); } //highlight all fighters able to use an ability. if they get clicked, select the fighter, then ask for target if applicable, then ask to confirm. if they get unclicked, remove him from selected fighter
			else {abilityButtonClicked = false; clickedValue.classList.replace("inactive-button","control-button"); } 
		}	
		else if (clickedValue.attributes[0].value === "jedi-image highlighted-fighter" && attackButtonClicked === true) {	
			var fighter = {
				name	:	clickedValue.attributes[1].value,
				attack	:	clickedValue.attributes[3].value
			};
		
			if (roundCounter >= fighter.attack && jedi.hp[fighter.attack] > 0) { //i.e., that means that the fighter has been out for at least one turn, and has positive hit points 
				var targetedDiv = document.getElementById(fighter.name);
				targetedDiv.setAttribute("class", "jedi-image highlighted-fighter selected-fighter");
				opponentLife -= fighter.attack; textElements.opponentHPText.textContent = opponentLife;
				jedi.attackedThisTurn[fighter.attack] = true;
				console.log (fighter.name + " deals " + fighter.attack + " damage.") ;
				console.log("Opponent is now at " + opponentLife + " life.");
				if (opponentLife < 1) { console.log("You won! Game Over"); gameOver = true;}
			}
		}
		else if (clickedValue.attributes[0].value === "jedi-image highlighted-fighter selected-fighter" && attackButtonClicked === true) {
			clickedValue.classList.remove("selected-fighter");
		}
	}
}

//note: need the ability to select / unselect attacking fighters and then a final confirm attack button
// also, need the ability to select only a single fighter at a time when attempting to use ability, including which fighter or player to target with ability, if there is a target of the ability. and a final confirm use ability button.
// need explanatory messages like "you can't attack with that fighter yet, he hasn't been out a full round yet. or, that fighter has no abilities. or, you can't block with that fighter, he attacked or used an ability during your last turn.


//these are simplified MtG mechanics. you can only use fighter abilities during your own turn, and it always causes the fighter to become unready just as though he had attacked.

//perhaps a gray overlay of fighter image for those who just came out that turn, to be removed as soon as the turn is over?

//ultimately, it would be nice to develop a visual library to simplify some of the operations I am performing here.


document.addEventListener('click', clickListener);
//definitions to be used: a turn is all phases of a single player's turn (whether it is player or opponent). A round is a complete round of all players' turns.
//game should inform player: your turn. Click "Attack to select attackers or click use ability to use a fighter's abilities"
//note: a fighter may not attack or use abilities until he has been out for one full round, although he can defend ("block")
//continued: if the fighter attacked or used abilities during a player's last turn, that fighter is "tapped" and may not block or use abilities until the player's next turn

// note: once the blocking functionality is added, then I will need to add logic to allow the attacking player to decide how the damage gets spread out. or, just let the strongest absorb it first in order to simplify it. not sure yet about trample mechanics. i.e., should excess damage carry over to player? also, should attackers receive damage from their combatants (the blockers) as well as the blockers from the attackers?

//to automate the defense as much as possible, all damage points done to blockers will be divided evenly by applying them one point at a time to the blocking defenders, starting with the strongest blocker, and in descending order of hp.

//only one attack of x fighters per turn

var attackCadre = [];

var forceUser = {};

var textElements = {
	turnTrackerText : document.getElementById("turn-tracker"),
	roundTrackerText : document.getElementById("round-tracker"),
	playerHPText : document.getElementById("player-health"),
	opponentHPText : document.getElementById("opponent-health"),
	notificationText : document.getElementById("notifications")
};

var abilities = [["none", false], ["Untap target fighter you control.", true]] // second value in pair is boolean: targeted ability?

var currentSideTurn = "jedi"; textElements.turnTrackerText.textContent = currentSideTurn;
var opponentLife = 20; textElements.opponentHPText.textContent = opponentLife;
var playerLife = 20; textElements.playerHPText.textContent = playerLife;
var roundCounter = 1; textElements.roundTrackerText.textContent = roundCounter;

var targetedAbility = 0;

const playerSide = "jedi";

var attackButtonClicked = false;
var abilityButtonClicked = false;
var sendButtonClicked = false;

// function highlightFighterByElement() {} // function takes in an element of a fighter and colors its border in the indicated color
// function highlightFighterByName() {} // function takes in an name of a fighter and colors its border in the indicated color
// function selectFighterByElement() {} // function takes in an element of a fighter and "selects it" by adjusting its margins to move it down and right
// function selectFighterByName() {} // function takes in an name of a fighter and selects it" by adjusting its margins to move it down and right


const fighters = {
	
	"Obi-Wan Kenobi"		: {rank:1,side:"jedi",inPlay:false,tapped:false,ability:1,imagePath:"./assets/images/ObiWanKenobi.jpg"},
	"Qui-Gon Jinn"			: {rank:2,side:"jedi",inPlay:false,tapped:false,ability:0,imagePath:"./assets/images/QuiGonJinn.jpg"},
	"Mace Windu"			: {rank:3,side:"jedi",inPlay:false,tapped:false,ability:0,imagePath:"./assets/images/MaceWindu.jpg"},
	"Yoda"					: {rank:4,side:"jedi",inPlay:false,tapped:false,ability:0,imagePath:"./assets/images/Yoda.jpg"},
	"Anakin Skywalker"		: {rank:5,side:"jedi",inPlay:false,tapped:false,ability:0,imagePath:"./assets/images/Anakin.jpg"},
	"Darth Maul"			: {rank:1,side:"sith",inPlay:false,tapped:false,ability:0,imagePath:"./assets/images/DarthMaul.jpeg"},
	"Darth Plagueis"		: {rank:2,side:"sith",inPlay:false,tapped:false,ability:0,imagePath:"./assets/images/DarthPlagueis.jpg"},
	"Chancellor Palpatine"	: {rank:3,side:"sith",inPlay:false,tapped:false,ability:0,imagePath:"./assets/images/Palpatine.jpg"},
	"Darth Vader"			: {rank:4,side:"sith",inPlay:false,tapped:false,ability:0,imagePath:"./assets/images/DarthVader.jpg"},
	"Darth Sidious"			: {rank:5,side:"sith",inPlay:false,tapped:false,ability:0,imagePath:"./assets/images/DarthSidious.jpeg"}
};
const fighterNames = Object.keys(fighters);


function placeFighter(strength, lightSideDarkSide) {
	var currentFighter;
for (let i = 0; i < fighterNames.length; i++)
{
	if (fighters[fighterNames[i]].rank === strength && fighters[fighterNames[i]].side === lightSideDarkSide) {currentFighter = fighters[fighterNames[i]]; currentFighter.name = fighterNames[i]; break;}
}
	if (currentFighter) { 
		imageFighter = $("<img>");
		imageFighter.addClass("fighter-image");
		imageFighter.attr('id', currentFighter.name);
		imageFighter.attr("src", currentFighter.imagePath);
		imageFighter.attr("attack-value", strength);
		imageFighter.attr("side", currentFighter.side);
		imageFighter.attr("alt", currentFighter.name);
		imageFighter.attr("played-during", roundCounter);
		fighters[currentFighter.name].playedDuring = roundCounter;
		$("#"+lightSideDarkSide + (strength)).append(imageFighter);
		fighters[currentFighter.name].inPlay = true;
	}	
}

var gameOver = false;
placeFighter(roundCounter, "jedi"); 

textElements.notificationText.textContent = "Your turn. Click End Turn because your fighters can't attack or use abilities on the same turn they enter play."

function nextTurn() { // add parameter: side, to be used in the various functions for each phase

	
	for (i = 0; i < fighterNames.length; i++) {
		if (fighters[fighterNames[i]].inPlay) 
		{
			targetDiv = document.getElementById(fighterNames[i]);
			if (targetDiv){
				targetDiv.classList.remove("highlighted-fighter");
				targetDiv.classList.remove("selected-fighter");
			}
		}
	}
	if (fighterNames.filter(x => !fighters[x].inPlay && fighters[x].side === "sith").length > 0) {
		textElements.notificationText.textContent = "Summoning fighter";
		placeFighter(roundCounter, "sith");
	}
	// opponent will attack if able, or use abilities, before next jedi is placed
	// need to indicate on screen what phase it is
	if (roundCounter > 1) {
		var attacking = [];
		var attackval = 0;
		var iteratorLimit = fighterNames.length;
		attacking = fighterNames.filter(x => fighters[x].inPlay && fighters[x].side === "sith" && !fighters[x].tapped && fighters[x].playedDuring < roundCounter);
		for (var i = 0; i < attacking.length; i++) {
			attackval += fighters[attacking[i]].rank;
		} 
		//need to implement a blocking mechanic.
		textElements.notificationText.textContent = "Opponent is attacking with: " + attacking + " for a total of " + attackval + " attack points. Select fighter(s) to block."
		
		playerLife -= attackval; textElements.playerHPText.textContent = playerLife;
		if (playerLife < 1) { textElements.notificationText.textContent = "You lose! Game Over"; gameOver = true;}
	}
	targetDiv = document.getElementById("next-turn"); if (targetDiv) targetDiv.classList.replace("pressed-button","control-button2"); 
	attackButtonClicked = false; targetDiv = document.getElementById("attack-button"); if (targetDiv) targetDiv.classList.replace("pressed-button","control-button");
	abilityButtonClicked = false; targetDiv = document.getElementById("ability-button"); if (targetDiv) targetDiv.classList.replace("pressed-button","control-button");
	sendButtonClicked = false; targetDiv = document.getElementById("send-button"); if (targetDiv) { targetDiv.classList.replace("pressed-button","control-button"); if (!targetDiv.classList.contains("invisible")) targetDiv.classList.add("invisible"); }
if (!gameOver){
		textElements.notificationText.textContent = "Your Turn.";
		currentSideTurn = "jedi"; textElements.turnTrackerText.textContent = currentSideTurn;
		for (var i = 0; i < fighterNames.length; i++) 
		{
			fighters[fighterNames[i]].tapped = false;
			targetDiv = document.getElementById(fighterNames[i]);
			if (targetDiv) targetDiv.classList.remove("tapped-fighter");
		
		}
		if (fighterNames.filter(x => !fighters[x].inPlay && fighters[x].side === "sith").length > 0) {
			textElements.notificationText.textContent = "Summoning fighter";
			placeFighter(++roundCounter, "jedi");
			textElements.roundTrackerText.textContent = roundCounter;
			}
		textElements.notificationText.textContent = "Your turn. You may 'Attack' or 'Use Abilities'."
	}
}

function clickListener(event) {
	if (gameOver) {document.removeEventListener('click', clickListener); return; }
	var clickedValue = event.target;
	if (clickedValue.attributes[0]) {
		if (clickedValue.attributes[0].value === "next-turn" && !targetedAbility) { clickedValue.classList.replace("control-button2","pressed-button");  currentSideTurn = "sith"; textElements.turnTrackerText.textContent = currentSideTurn; attackCadre = []; textElements.notificationText.textContent = "Opponent's Turn"; nextTurn(); }
		else if (clickedValue.attributes[0].value === "attack-button" && abilityButtonClicked === false && sendButtonClicked === false && !targetedAbility) {
			if (attackButtonClicked === false) {
				attackButtonClicked = true; attackCadre = []; clickedValue.classList.replace("control-button","pressed-button"); textElements.notificationText.textContent = "Select fighter(s) to attack opponent with";
				var alreadyPreset = false;
				targetDiv = document.getElementById("send-button");
				if (targetDiv.classList.contains("invisible")) targetDiv.classList.remove("invisible");
				
				for (var x = 0; x < fighterNames.length; x++)
				{
					if (fighters[fighterNames[x]].inPlay && fighters[fighterNames[x]].rank < roundCounter && fighters[fighterNames[x]].side === currentSideTurn && !fighters[fighterNames[x]].tapped) {
					targetDiv = document.getElementById(fighters[fighterNames[x]].name);
					if (!targetDiv.classList.contains("highlighted-fighter")) targetDiv.classList.add("highlighted-fighter");
					}
				} 
			}
				//highlight all fighters able to attack. if they get clicked, add them to the attacking party. if they get unclicked, remove them.
			else { attackButtonClicked = false; clickedValue.classList.replace("pressed-button","control-button");  textElements.notificationText.textContent = ""; attackCadre = [];
				for (x = 0; x < fighterNames.length; x++) {
						if (roundCounter >= fighters[fighterNames[x]].rank && fighters[fighterNames[x]].inPlay === true && fighters[fighterNames[x]].tapped === false){
							var targetDiv = document.getElementById(fighterNames[x]);
							if (targetDiv) { targetDiv.classList.remove("selected-fighter");
							targetDiv.classList.remove("highlighted-fighter");}
							targetDiv = document.getElementById("send-button");
							if (targetDiv) {if (!targetDiv.classList.contains("invisible")) targetDiv.classList.add("invisible"); }
						}
				}
			}
		}
		else if (clickedValue.attributes[0].value === "send-button" && attackButtonClicked === true && abilityButtonClicked === false && sendButtonClicked === false && attackCadre.length > 0) {
			if (clickedValue.classList.contains("control-button")) clickedValue.classList.replace("control-button","pressed-button");
			sendButtonClicked = true;
			var totalAttack = 0;
			for (var x = 0; x < attackCadre.length; x++) {
				totalAttack += parseInt(attackCadre[x].attack);
				fighters[attackCadre[x].name].tapped = true;
				var targetDiv = document.getElementById(attackCadre[x].name);
				if (targetDiv) targetDiv.classList.replace("highlighted-fighter", "tapped-fighter"); // replace highlighted with tapped indicator
			}				
			opponentLife -= totalAttack; textElements.opponentHPText.textContent = opponentLife;
			textElements.notificationText.textContent = "Your fighters did " + totalAttack + " damage to opponent, bringing him to " + opponentLife + " life.";
			attackCadre = [];
			// remove highlighted indicators
			for (var x = 0; x < fighterNames.length; x++)
				{
					if (fighters[fighterNames[x]].inPlay && fighters[fighterNames[x]].rank < roundCounter && fighters[fighterNames[x]].side === currentSideTurn && !fighters[fighterNames[x]].tapped) {
						targetDiv = document.getElementById(fighters[fighterNames[x]].name);
						if (targetDiv.classList.contains("highlighted-fighter")) targetDiv.classList.remove("highlighted-fighter");
					}
				}
			if (opponentLife < 1) { textElements.notificationText.textContent = "You won! Game Over"; gameOver = true;}
		}
		else if (clickedValue.attributes[0].value === "ability-button" && attackButtonClicked === sendButtonClicked) {
			clickedValue.classList.replace("control-button","pressed-button");
			if(!abilityButtonClicked) { abilityButtonClicked = true; clickedValue.classList.replace("control-button","pressed-button"); textElements.notificationText.textContent = "Select fighter to use ability"; //highlight all fighters able to use an ability.
				for (var x = 0; x < fighterNames.length; x++)
				{
					if (fighters[fighterNames[x]].inPlay && fighters[fighterNames[x]].ability > 0 && fighters[fighterNames[x]].rank < roundCounter && fighters[fighterNames[x]].side === currentSideTurn && !fighters[fighterNames[x]].tapped) {
						targetDiv = document.getElementById(fighters[fighterNames[x]].name);
						if (targetDiv) { if (!targetDiv.classList.contains("highlighted-fighter")) targetDiv.classList.add("highlighted-fighter"); }
					}
				}
			}
			else {
				abilityButtonClicked = false; targetedAbility = 0; clickedValue.classList.replace("pressed-button","control-button"); textElements.notificationText.textContent = "";
				for (var x = 0; x < fighterNames.length; x++)
				{
					if (fighters[fighterNames[x]].inPlay && fighters[fighterNames[x]].rank < roundCounter && fighters[fighterNames[x]].side === currentSideTurn && !fighters[fighterNames[x]].tapped && fighters[fighterNames[x]].ability > 0) {
						targetDiv = document.getElementById(fighters[fighterNames[x]].name);
						if (targetDiv) { if (targetDiv.classList.contains("highlighted-fighter")) targetDiv.classList.remove("highlighted-fighter"); }
						targetDiv = document.getElementById(forceUser.name);
						if (targetDiv) {if (targetDiv.classList.contains("selected-fighter")) targetDiv.classList.remove("selected-fighter"); }
						forceUser = {};
					}
				}
			} 
		}	
		else if (clickedValue.attributes[0].value === "fighter-image highlighted-fighter" && abilityButtonClicked === true && fighters[clickedValue.attributes[1].value].ability > 0) {
		
			if (roundCounter > clickedValue.attributes[6].value && !fighters[clickedValue.attributes[1].value].tapped) { //i.e., that means that the fighter has been out for at least one turn, and is not tapped
			
			forceUser = {
				name	:	clickedValue.attributes[1].value,
				ability 	:	fighters[clickedValue.attributes[1].value].ability,
				playedDuring: clickedValue.attributes[6].value
			};
				
				var targetDiv = document.getElementById(forceUser.name);
				if (targetDiv) targetDiv.setAttribute("class", "fighter-image highlighted-fighter selected-fighter");
				
				// put ability in notification area and ask for confirmation by clicking fighter again
				textElements.notificationText.textContent = abilities[fighters[clickedValue.attributes[1].value].ability][0] + " Click force user again to activate.";
			}
		}
		else if (clickedValue.attributes[0].value === "fighter-image highlighted-fighter selected-fighter" && abilityButtonClicked === true && targetedAbility===0) {
		
		forceUser = {
				name	:	clickedValue.attributes[1].value,
				ability 	:	fighters[clickedValue.attributes[1].value].ability,
				playedDuring: clickedValue.attributes[6].value
			};
			//execute ability, but don't tap forceUser until completed
			if (forceUser.ability === 1) { 
				textElements.notificationText.textContent = "Select ability target." ;
				targetedAbility = 1;	
			}
		}
		else if (clickedValue.attributes[0].value.includes("fighter-image") && abilityButtonClicked === true && targetedAbility > 0) {
			if (targetedAbility === 1) {
				if (clickedValue.attributes[0].value.includes("tapped-fighter") && clickedValue.attributes[1].value !== forceUser.name) {
					var targetDiv = document.getElementById(clickedValue.attributes[1].value);
					if (targetDiv) targetDiv.setAttribute("class", "fighter-image");
					targetedAbility = 0;
					var targetDiv = document.getElementById(forceUser.name);
					if (targetDiv) targetDiv.classList.replace("highlighted-fighter", "tapped-fighter");
					fighters[forceUser.name].tapped = true;
					forceUser = {};
					textElements.notificationText.textContent = "";
					abilityButtonClicked = false;
					var targetDiv = document.getElementById("ability-button");
					if (targetDiv) targetDiv.classList.replace("pressed-button","control-button");
				}
				else textElements.notificationText.textContent = "Not a valid target. Select target.";
			}
		}
		else if (clickedValue.attributes[0].value === "fighter-image highlighted-fighter" && attackButtonClicked === true) {
			
			var fighter = {
				name	:	clickedValue.attributes[1].value,
				attack	:	clickedValue.attributes[3].value,
				playedDuring: clickedValue.attributes[6].value
			}; 
		
			if (roundCounter > clickedValue.attributes[6].value && !fighters[clickedValue.attributes[1].value].tapped) { //i.e., that means that the fighter has been out for at least one turn, and is not tapped
				
				var targetDiv = document.getElementById(clickedValue.attributes[1].value);
				if (targetDiv) targetDiv.setAttribute("class", "fighter-image highlighted-fighter selected-fighter");
				
				// add him to the attacking cadre if he is not already in there
				var y = attackCadre.indexOf(fighter);
				if (y === -1) attackCadre.push(fighter);
				if (opponentLife < 1) { textElements.notificationText.textContent = "You won! Game Over"; gameOver = true;}
			}
		}
		else if (clickedValue.attributes[0].value === "fighter-image highlighted-fighter selected-fighter" && attackButtonClicked === true) {
			fighter = {
				name	:	clickedValue.attributes[1].value,
				attack	:	clickedValue.attributes[3].value,
				playedDuring: clickedValue.attributes[6].value
			};
			for (var z = 0 ; z < attackCadre.length; z++) {
				if (fighter.name === attackCadre[z].name) attackCadre.splice(z,1); //remove him from attack cadre
			}
			clickedValue.classList.remove("selected-fighter");			
		}
	}
}

//need blocking functions
// need the ability to select only a single fighter at a time when attempting to use ability, including which fighter or player to target with ability, if there is a target of the ability. and a final confirm use ability button.
// need explanatory messages like "you can't attack with that fighter yet, he hasn't been out a full round yet. or, that fighter has no abilities. or, you can't block with that fighter, he attacked or used an ability during your last turn.
//these are simplified MtG mechanics. you can only use fighter abilities during your own turn, and it always causes the fighter to become unready or "tapped" just as though he had attacked.
//perhaps a gray overlay of fighter image for those who just came out that turn, to be removed as soon as the turn is over?
//ultimately, it would be nice to develop a visual library to simplify some of the operations I am performing here.
//there is definitely room for more functional encapsulation

document.addEventListener('click', clickListener);
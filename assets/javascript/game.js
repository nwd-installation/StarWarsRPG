const domElements = {
	turnTrackerText	: document.getElementById("turn-tracker"),
	roundTrackerText: document.getElementById("round-tracker"),
	playerHPText	: document.getElementById("player-health"),
	opponentHPText	: document.getElementById("opponent-health"),
	notificationText: document.getElementById("notifications"),
	
	buttons			:	{
			attackButton	:	document.getElementById("attack-button"),
			abilityButton	:	document.getElementById("ability-button"),
			sendButton		:	document.getElementById("send-button"),
			nextTurnButton	:	document.getElementById("next-turn")
	}
};


let currentSideTurn = "jedi"; domElements.turnTrackerText.textContent = currentSideTurn;
let opponentLife = 20; domElements.opponentHPText.textContent = opponentLife;
let playerLife = 20; domElements.playerHPText.textContent = playerLife;
let roundCounter = 1; domElements.roundTrackerText.textContent = roundCounter;

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

Object.keys(fighters).forEach( x => {
	
	const imgNode = document.getElementById(fighters[x].side + fighters[x].rank);
	const newFighterNode = document.createElement("img");
	newFighterNode.classList.add("fighter-image");
	newFighterNode.setAttribute('id', x);
	newFighterNode.setAttribute('alt', x);
	newFighterNode.setAttribute("src", fighters[x].imagePath);
	newFighterNode.setAttribute("attack-value", fighters[x].rank);
	newFighterNode.setAttribute("side", fighters[x].side);
	imgNode.appendChild(newFighterNode);
	
});

function toggleFighterClass(node, className) {
	if (node.classList.contains(className)) node.classList.remove(className);
	else node.classList.add(className);
}

// function toggleButtonByElement(element) { //use .toggle for this?
// 	if (element !== null && element.classList.contains("control-button")) {
// 		if (element.classList.contains("pressed-button")) element.classList.remove("pressed-button");
// 		else if (!element.classList.contains("pressed-button")) element.classList.add("pressed-button");
// 	}
// }

// function toggleInvisbleByElement(element) {
// 	if (element !== null) {
// 		if (!element.classList.contains("invisible")) element.classList.add("invisible");
// 		else element.classList.remove("invisible");
// 	}
	
// }

document.addEventListener('click', (e) => {

	if (e.target.tagName === "IMG" && e.target.classList.contains("fighter-image")) {
		if (e.target.classList.contains("highlighted-fighter") && !e.target.classList.contains("tapped-fighter")) toggleFighterClass(e.target, "tapped-fighter");
		else toggleFighterClass(e.target, "highlighted-fighter");
	}
});

document.addEventListener('mouseup', (e) => {
	if(window.event.which == 1) console.log("left click");
	else if(window.event.which == 3) {
		console.log("right click");
		console.log(e.target.id);
		toggleFighterClass(e.target, "selected-fighter");
	}
});

document.body.addEventListener("contextmenu", function(evt){evt.preventDefault();return false;});
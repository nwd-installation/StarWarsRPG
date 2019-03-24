var imageHero = [];
var heroes = ["Obi-Wan Kenobi", "Qui-Gon Jinn", "Yoda", "Mace Windu", "Anakin Skywalker", 
var imageVillain = [];
var villains = ["Emperor Palpatine", "Darth Maul", "Darth Sidious", "Darth Vader", "Darth Plagueis"] 

for (var i = 0; i < heroes.length; i++) {

    imageHero[i] = $("<img>");
    imageHero.addClass("hero-image");
    imageHero.attr("src", "./assets/images/00261fda-4062-4096-81fd-8cf96b9034e8.jpg");
    imageHero.attr("hero-attackvalue", 1);
    $("#Heros").append(imageHero);
}


for (var i = 0; i < villains.length; i++) {

    imageVillain[i] = $("<img>");
    imageVillain.addClass("villain-image");
    imageVillain.attr("src", "./assets/images/00261fda-4062-4096-81fd-8cf96b9034e8.jpg");
	imageVillain.attr("villain-attackvalue", 1);
    $("#Villains").append(imageVillain);
}

$(".hero-image").on("click", function() {

    // Determining the crystal's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

    var heroAttackValue = ($(this).attr("hero-attackvalue"));
   crystalValue = parseInt(crystalValue);

    // We then add the crystalValue to the user's "counter" which is a global variable.
    // Every click, from every crystal adds to the global counter.
    counter += crystalValue;

    // All of the same game win-lose logic applies. So the rest remains unchanged.
    alert("New score: " + counter);

    if (counter === targetNumber) {
      alert("You win!");
    }

    else if (counter >= targetNumber) {
      alert("You lose!!");
    }

});
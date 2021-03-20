function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const itemDb = {
	"wooden_axe": new Tool("Wooden Axe", "tool", 1, 0),
	"wooden_pickaxe": new Tool("Wooden Pickaxe", "tool", 0, 1),
	"wooden_sword": new Weapon("Wooden Sword", "weapon", 1, 0, 0)
}

var enemies = new Array();

function addToGameLogs(message) {
	document.getElementById("gameLogs").innerHTML = message + "<br>" + document.getElementById("gameLogs").innerHTML;
}

var player = new Player("WogLad");
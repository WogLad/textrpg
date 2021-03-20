function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const itemDb = {
	"wooden_axe": new Tool("Wooden Axe", "Tool", 1, 0),
	"wooden_pickaxe": new Tool("Wooden Pickaxe", "Tool", 0, 1),
	"wooden_sword": new Weapon("Wooden Sword", "weapon", 1, 0, 0)
}

var enemies = new Array();

function addToGameLogs(message) {
	document.getElementById("gameLogs").innerHTML += "<br>" + message;
}

var player = new Player("WogLad");
// setTimeout(() => {
// 	addToGameLogs("<span style='color: red'>hola!</span>");
// }, 50);
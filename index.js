function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const itemDb = {
	// Axes
	"wooden_axe": new Tool("Copper Axe", "tool", 1, 0),

	// Pickaxes
	"wooden_pickaxe": new Tool("Copper Pickaxe", "tool", 0, 1),

	// Swords
	"wooden_sword": new Weapon("Copper Sword", "weapon", 1, 0, 0)
}

var enemies = new Array();

function addToGameLogs(message) {
	document.getElementById("gameLogs").innerHTML = message + "<br>" + document.getElementById("gameLogs").innerHTML;
}

var player = new Player("Player");

function loadSaveDataFromLocalStorage() {
	if (localStorage.getItem("saveData") != null) {
		player.loadSaveData(localStorage.getItem("saveData"));
		localStorage.setItem("saveData", JSON.stringify(player));
	}
}

loadSaveDataFromLocalStorage();

setInterval(() => {
	localStorage.setItem("saveData", JSON.stringify(player));
}, 1000);

// var saveData = '{"name":"WogLad","gold":0,"posX":0,"posY":8,"inventory":[{"name":"Wooden Axe","type":"tool","axePower":1,"pickaxePower":0}],"damage":2,"critRate":5,"critDamage":5,"defense":0,"kills":0,"currentHP":10,"maxHP":10,"movementSpeed":1,"canMove":true,"enemyEncounterRate":10,"equipment":{"head":null,"chest":null,"legs":null,"feet":null,"weapon":null,"tool":null}}'
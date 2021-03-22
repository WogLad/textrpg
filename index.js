function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const itemDb = {
	// Ores
	"copper_ore": new Item("Copper Ore", "item"),
	"iron_ore": new Item("Iron Ore", "item"),
	"mithril_ore": new Item("Mithril Ore", "item"),
	"adamant_ore": new Item("Adamant Ore", "item"),

	// Enemy Loot
	"bones": new Item("Bones", "item"),
	"slime": new Item("Slime", "item"),
	"spider_eye": new Item("Spider Eye", "item"),
	"rotten_flesh": new Item("Rotten Flesh", "item"),

	// Axes
	"copper_axe": new Tool("Copper Axe", "tool", 1, 0),
	"iron_axe": new Tool("Iron Axe", "tool", 2, 0),
	"mithril_axe": new Tool("Mithril Axe", "tool", 3, 0),
	"adamant_axe": new Tool("Adamant Axe", "tool", 4, 0),
	"obsidian_axe": new Tool("Obsidian Axe", "tool", 5, 0),

	// Pickaxes
	"copper_pickaxe": new Tool("Copper Pickaxe", "tool", 0, 1),
	"iron_pickaxe": new Tool("Iron Pickaxe", "tool", 0, 2),
	"mithril_pickaxe": new Tool("Mithril Pickaxe", "tool", 0, 3),
	"adamant_pickaxe": new Tool("Adamant Pickaxe", "tool", 0, 4),
	"obsidian_pickaxe": new Tool("Obsidian Pickaxe", "tool", 0, 5),

	// Swords
	"copper_sword": new Weapon("Copper Sword", "weapon", 5, 0, 0),
	"iron_sword": new Weapon("Iron Sword", "weapon", 11, 5, 5),
	"mithril_sword": new Weapon("Mithril Sword", "weapon", 16, 10, 10),
	"adamant_sword": new Weapon("Adamant Sword", "weapon", 23, 15, 15),
	"obsidian_sword": new Weapon("Obsidian Sword", "weapon", 45, 20, 25),

	// Armor (Head)
	"copper_helmet": new Equipment("Copper Helmet", "equipment", "head", 3),
	"iron_helmet": new Equipment("Copper Helmet", "equipment", "head", 5),
	"mithril_helmet": new Equipment("Copper Helmet", "equipment", "head", 11),
	"adamant_helmet": new Equipment("Copper Helmet", "equipment", "head", 16),
	"obsidian_helmet": new Equipment("Copper Helmet", "equipment", "head", 26),

	// Armor (Chest)
	"copper_chestplate": new Equipment("Copper Chestplate", "equipment", "chest", 9),
	"iron_chestplate": new Equipment("Iron Chestplate", "equipment", "chest", 12),
	"mithril_chestplate": new Equipment("Mithril Chestplate", "equipment", "chest", 38),
	"adamant_chestplate": new Equipment("Adamant Chestplate", "equipment", "chest", 55),
	"obsidian_chestplate": new Equipment("Obsidian Chestplate", "equipment", "chest", 60),

	// Armor (Legs)
	"copper_leggings": new Equipment("Copper Leggings", "equipment", "legs", 6),
	"iron_leggings": new Equipment("Iron Leggings", "equipment", "legs", 10),
	"mithril_leggings": new Equipment("Mithril Leggings", "equipment", "legs", 20),
	"adamant_leggings": new Equipment("Adamant Leggings", "equipment", "legs", 29),
	"obsidian_leggings": new Equipment("Obsidian Leggings", "equipment", "legs", 41),

	// Armor (Feet)
	"copper_boots": new Equipment("Copper Boots", "equipment", "feet", 3),
	"iron_boots": new Equipment("Copper Boots", "equipment", "feet", 4),
	"mithril_boots": new Equipment("Copper Boots", "equipment", "feet", 10),
	"adamant_boots": new Equipment("Copper Boots", "equipment", "feet", 12),
	"obsidian_boots": new Equipment("Copper Boots", "equipment", "feet", 20),
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
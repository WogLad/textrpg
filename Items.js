class Item {
	constructor(id, name, type) {
		this.id = id;
		this.name = name;
		this.type = type;
	}
}

class Enchantment {
	constructor(name, statsToBuff) {
		this.name = name;
		this.statsToBuff = statsToBuff;
	}

	enchant() {
		this.statsToBuff.forEach(stat => {
			console.log(stat);
		});
	}
}

class Tool extends Item {
	constructor(id, name, type, axePower, pickaxePower) {
		super(id, name, type);
		this.axePower = axePower;
		this.pickaxePower = pickaxePower;
	}
}

class Weapon extends Item {
	constructor(id, name, type, weaponPower, critRate, critDamage) {
		super(id, name, type);
		this.weaponPower = weaponPower;
		this.critRate = critRate;
		this.critDamage = critDamage;
	}
}

class Equipment extends Item {
	constructor(id, name, type, equipmentType, defenseBonus) {
		super(id, name, type);
		this.equipmentType = equipmentType;
		this.defenseBonus = defenseBonus;
	}
}

class Ore extends Item {
	constructor(id, name, type, miningExpToReceive) {
		super(id, name, type);
		this.miningExpToReceive = miningExpToReceive;
	}
}

class Bar extends Item {
	constructor(id, name, type, smeltingExpToReceive) {
		super(id, name, type);
		this.smeltingExpToReceive = smeltingExpToReceive;
	}
}

class Food extends Item {
	constructor(id, name, type, hpReceived, canBeCooked, cookedVersion) {
		super(id, name, type);
		this.hpReceived = hpReceived;
		this.canBeCooked = canBeCooked;
		this.cookedVersion = cookedVersion;
 	}
}

const itemDb = {
	"wood": new Item("wood", "Wood", "item"),

	// Ores
	"copper_ore": new Ore("copper_ore", "Copper Ore", "ore", 20),
	"iron_ore": new Ore("iron_ore", "Iron Ore", "ore", 35),
	"mithril_ore": new Ore("mithril_ore", "Mithril Ore", "ore", 80),
	"adamant_ore": new Ore("adamant_ore", "Adamant Ore", "ore", 95),

	// Enemy Loot
	"bones": new Item("bones", "Bones", "item"),
	"slime": new Item("slime", "Slime", "item"),
	"spider_eye": new Item("spider_eye", "Spider Eye", "item"),
	"rotten_flesh": new Item("rotten_flesh", "Rotten Flesh", "item"),

	// Axes
	"copper_axe": new Tool("copper_axe", "Copper Axe", "tool", 1, 0),
	"iron_axe": new Tool("iron_axe", "Iron Axe", "tool", 2, 0),
	"mithril_axe": new Tool("mithril_axe", "Mithril Axe", "tool", 3, 0),
	"adamant_axe": new Tool("adamant_axe", "Adamant Axe", "tool", 4, 0),
	"obsidian_axe": new Tool("obsidian_axe", "Obsidian Axe", "tool", 5, 0),

	// Pickaxes
	"copper_pickaxe": new Tool("copper_pickaxe", "Copper Pickaxe", "tool", 0, 1),
	"iron_pickaxe": new Tool("iron_pickaxe", "Iron Pickaxe", "tool", 0, 2),
	"mithril_pickaxe": new Tool("mithril_pickaxe", "Mithril Pickaxe", "tool", 0, 3),
	"adamant_pickaxe": new Tool("adamant_pickaxe", "Adamant Pickaxe", "tool", 0, 4),
	"obsidian_pickaxe": new Tool("obsidian_pickaxe", "Obsidian Pickaxe", "tool", 0, 5),

	// Swords
	"copper_sword": new Weapon("copper_sword", "Copper Sword", "weapon", 5, 0, 0),
	"iron_sword": new Weapon("iron_sword", "Iron Sword", "weapon", 11, 5, 5),
	"mithril_sword": new Weapon("mithril_sword", "Mithril Sword", "weapon", 16, 10, 10),
	"adamant_sword": new Weapon("adamant_sword", "Adamant Sword", "weapon", 23, 15, 15),
	"obsidian_sword": new Weapon("obsidian_sword", "Obsidian Sword", "weapon", 45, 20, 25),

	// Armor (Head)
	"copper_helmet": new Equipment("copper_helmet", "Copper Helmet", "equipment", "head", 3),
	"iron_helmet": new Equipment("iron_helmet", "Iron Helmet", "equipment", "head", 5),
	"mithril_helmet": new Equipment("mithril_helmet", "Mithril Helmet", "equipment", "head", 11),
	"adamant_helmet": new Equipment("adamant_helmet", "Adamant Helmet", "equipment", "head", 16),
	"obsidian_helmet": new Equipment("obsidian_helmet", "Obsidian Helmet", "equipment", "head", 26),

	// Armor (Chest)
	"copper_chestplate": new Equipment("copper_chestplate", "Copper Chestplate", "equipment", "chest", 9),
	"iron_chestplate": new Equipment("iron_chestplate", "Iron Chestplate", "equipment", "chest", 12),
	"mithril_chestplate": new Equipment("mithril_chestplate", "Mithril Chestplate", "equipment", "chest", 38),
	"adamant_chestplate": new Equipment("adamant_chestplate", "Adamant Chestplate", "equipment", "chest", 55),
	"obsidian_chestplate": new Equipment("obsidian_chestplate", "Obsidian Chestplate", "equipment", "chest", 60),

	// Armor (Legs)
	"copper_leggings": new Equipment("copper_leggings", "Copper Leggings", "equipment", "legs", 6),
	"iron_leggings": new Equipment("iron_leggings", "Iron Leggings", "equipment", "legs", 10),
	"mithril_leggings": new Equipment("mithril_leggings", "Mithril Leggings", "equipment", "legs", 20),
	"adamant_leggings": new Equipment("adamant_leggings", "Adamant Leggings", "equipment", "legs", 29),
	"obsidian_leggings": new Equipment("obsidian_leggings", "Obsidian Leggings", "equipment", "legs", 41),

	// Armor (Feet)
	"copper_boots": new Equipment("copper_boots", "Copper Boots", "equipment", "feet", 3),
	"iron_boots": new Equipment("iron_boots", "Iron Boots", "equipment", "feet", 4),
	"mithril_boots": new Equipment("mithril_boots", "Mithril Boots", "equipment", "feet", 10),
	"adamant_boots": new Equipment("adamant_boots", "Adamant Boots", "equipment", "feet", 12),
	"obsidian_boots": new Equipment("obsidian_boots", "Obsidian Boots", "equipment", "feet", 20),

	// Food
	"cooked_sardine": new Food("cooked_sardine", "Cooked Sardine", "food", 4, false, null),
	"raw_sardine": new Food("raw_sardine", "Raw Sardine", "food", 0, true, new Food("cooked_sardine", "Cooked Sardine", "food", 4, false, null)),
	"cooked_shrimp": new Food("cooked_shrimp", "Cooked Shrimp", "food", 3, false, null),
	"raw_shrimp": new Food("raw_shrimp", "Raw Shrimp", "food", 0, true, new Food("cooked_shrimp", "Cooked Shrimp", "food", 3, false, null)),

	// Bars
	"copper_bar": new Bar("copper_bar", "Copper Bar", "bar", 20),
	"iron_bar": new Bar("iron_bar", "Iron Bar", "bar", 35),
	"mithril_bar": new Bar("mithril_bar", "Mithril Bar", "bar", 80),
	"adamant_bar": new Bar("adamant_bar", "Adamant Bar", "bar", 95)
}

const craftingRecipesDb = {
	// Axes
	"copper_axe": {
		"materialsRequired": [
			{
				"item": itemDb["copper_bar"],
				"count": 3
			},
			{
				"item": itemDb["wood"],
				"count": 1
			}
		],
		"craftingExpToReceive": 25
	},
	"iron_axe": {
		"materialsRequired": [
			{
				"item": itemDb["iron_bar"],
				"count": 3
			},
			{
				"item": itemDb["wood"],
				"count": 1
			}
		],
		"craftingExpToReceive": 38
	},
	"mithril_axe": {
		"materialsRequired": [
			{
				"item": itemDb["mithril_bar"],
				"count": 3
			},
			{
				"item": itemDb["wood"],
				"count": 1
			}
		],
		"craftingExpToReceive": 50
	},
	"adamant_axe": {
		"materialsRequired": [
			{
				"item": itemDb["adamant_bar"],
				"count": 3
			},
			{
				"item": itemDb["wood"],
				"count": 1
			}
		],
		"craftingExpToReceive": 63
	},

	// Pickaxes
	"copper_pickaxe": {
		"materialsRequired": [
			{
				"item": itemDb["copper_bar"],
				"count": 3
			},
			{
				"item": itemDb["wood"],
				"count": 1
			}
		],
		"craftingExpToReceive": 25
	},
	"iron_pickaxe": {
		"materialsRequired": [
			{
				"item": itemDb["iron_bar"],
				"count": 3
			},
			{
				"item": itemDb["wood"],
				"count": 1
			}
		],
		"craftingExpToReceive": 38
	},
	"mithril_pickaxe": {
		"materialsRequired": [
			{
				"item": itemDb["mithril_bar"],
				"count": 3
			},
			{
				"item": itemDb["wood"],
				"count": 1
			}
		],
		"craftingExpToReceive": 50
	},
	"adamant_pickaxe": {
		"materialsRequired": [
			{
				"item": itemDb["adamant_bar"],
				"count": 3
			},
			{
				"item": itemDb["wood"],
				"count": 1
			}
		],
		"craftingExpToReceive": 63
	},

	// Swords
	"copper_sword": {
		"materialsRequired": [
			{
				"item": itemDb["copper_bar"],
				"count": 2
			},
			{
				"item": itemDb["wood"],
				"count": 1
			}
		],
		"craftingExpToReceive": 25
	},
	"iron_sword": {
		"materialsRequired": [
			{
				"item": itemDb["iron_bar"],
				"count": 2
			},
			{
				"item": itemDb["wood"],
				"count": 1
			}
		],
		"craftingExpToReceive": 38
	},
	"mithril_sword": {
		"materialsRequired": [
			{
				"item": itemDb["mithril_bar"],
				"count": 2
			},
			{
				"item": itemDb["wood"],
				"count": 1
			}
		],
		"craftingExpToReceive": 50
	},
	"adamant_sword": {
		"materialsRequired": [
			{
				"item": itemDb["adamant_bar"],
				"count": 2
			},
			{
				"item": itemDb["wood"],
				"count": 1
			}
		],
		"craftingExpToReceive": 63
	},

	// Armor (Head)
	"copper_helmet": {
		"materialsRequired": [
			{
				"item": itemDb["copper_bar"],
				"count": 5
			}
		],
		"craftingExpToReceive": 50
	},
	"iron_helmet": {
		"materialsRequired": [
			{
				"item": itemDb["iron_bar"],
				"count": 5
			}
		],
		"craftingExpToReceive": 75
	},
	"mithril_helmet": {
		"materialsRequired": [
			{
				"item": itemDb["mithril_bar"],
				"count": 5
			}
		],
		"craftingExpToReceive": 100
	},
	"adamant_helmet": {
		"materialsRequired": [
			{
				"item": itemDb["adamant_bar"],
				"count": 5
			}
		],
		"craftingExpToReceive": 125
	},

	// Armor (Chest)
	"copper_chestplate": {
		"materialsRequired": [
			{
				"item": itemDb["copper_bar"],
				"count": 8
			}
		],
		"craftingExpToReceive": 125
	},
	"iron_chestplate": {
		"materialsRequired": [
			{
				"item": itemDb["iron_bar"],
				"count": 8
			}
		],
		"craftingExpToReceive": 185
	},
	"mithril_chestplate": {
		"materialsRequired": [
			{
				"item": itemDb["mithril_bar"],
				"count": 8
			}
		],
		"craftingExpToReceive": 250
	},
	"adamant_chestplate": {
		"materialsRequired": [
			{
				"item": itemDb["adamant_bar"],
				"count": 8
			}
		],
		"craftingExpToReceive": 310
	},

	// Armor (Legs)
	"copper_leggings": {
		"materialsRequired": [
			{
				"item": itemDb["copper_bar"],
				"count": 7
			}
		],
		"craftingExpToReceive": 75
	},
	"iron_leggings": {
		"materialsRequired": [
			{
				"item": itemDb["iron_bar"],
				"count": 7
			}
		],
		"craftingExpToReceive": 110
	},
	"mithril_leggings": {
		"materialsRequired": [
			{
				"item": itemDb["mithril_bar"],
				"count": 7
			}
		],
		"craftingExpToReceive": 150
	},
	"adamant_leggings": {
		"materialsRequired": [
			{
				"item": itemDb["adamant_bar"],
				"count": 7
			}
		],
		"craftingExpToReceive": 185
	},
	
	// Armor (Feet)
	"copper_boots": {
		"materialsRequired": [
			{
				"item": itemDb["copper_bar"],
				"count": 4
			}
		],
		"craftingExpToReceive": 50
	},
	"iron_boots": {
		"materialsRequired": [
			{
				"item": itemDb["iron_bar"],
				"count": 4
			}
		],
		"craftingExpToReceive": 75
	},
	"mithril_boots": {
		"materialsRequired": [
			{
				"item": itemDb["mithril_bar"],
				"count": 4
			}
		],
		"craftingExpToReceive": 100
	},
	"adamant_boots": {
		"materialsRequired": [
			{
				"item": itemDb["adamant_bar"],
				"count": 4
			}
		],
		"craftingExpToReceive": 125
	},
}

const listOfOres = [
	itemDb["copper_ore"],
	itemDb["iron_ore"],
	itemDb["mithril_ore"],
	itemDb["adamant_ore"]
]

const listOfFishableItems = [
	{"fishObj": itemDb["raw_sardine"], "fishingExp": 20},
	{"fishObj": itemDb["raw_shrimp"], "fishingExp": 10}
]

const expForCookingRawFoodTable = {
	"raw_shrimp": 30,
	"raw_sardine": 40
}

const oreToBar = {
	"copper_ore": itemDb["copper_bar"],
	"iron_ore": itemDb["iron_bar"],
	"mithril_ore": itemDb["mithril_bar"],
	"adamant_ore": itemDb["adamant_bar"]
}
class Item {
	constructor(name, type) {
		this.name = name;
		this.type = type;
	}
}

class Tool extends Item {
	constructor(name, type, axePower, pickaxePower) {
		super(name, type);
		this.axePower = axePower;
		this.pickaxePower = pickaxePower;
	}
}

class Weapon extends Item {
	constructor(name, type, weaponPower, critRate, critDamage) {
		super(name, type);
		this.weaponPower = weaponPower;
		this.critRate = critRate;
		this.critDamage = critDamage;
	}
}

class Equipment extends Item {
	constructor(name, type, equipmentType, defenseBonus) {
		super(name, type);
		this.equipmentType = equipmentType;
		this.defenseBonus = defenseBonus;
	}
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

const listOfOres = [
	itemDb["copper_ore"],
	itemDb["iron_ore"],
	itemDb["mithril_ore"],
	itemDb["adamant_ore"]
]
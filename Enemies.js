class LootTable {
	constructor(lootTableData) {
		this.lootTableData = lootTableData;
	}

	getLoot() {
		var itemToReturn = null;
		var itemDataFromLootTable = null;
		this.lootTableData.forEach(item => {
			if (getRandomInt(0, 100) < item["drop_rate_percentage"]) {
				itemToReturn = item["item"];
				itemDataFromLootTable = item;
				return;
			}
		});
		if (itemToReturn != null) {
			return {
				"item": itemToReturn,
				"count": getRandomInt(itemDataFromLootTable["minimum_quantity"], (itemDataFromLootTable["maximum_quantity"]+1))
			};
		}
		else {
			return null;
		}
	}
}

class Enemy {
	constructor(name, encounterMessage, damage, maxHP, lootTables) {
		this.name = name;
		this.encounterMessage = encounterMessage;

		this.damage = damage;
		this.currentHP = maxHP;
		this.maxHP = maxHP;

		this.lootTables = lootTables;
	}

	die() {
		addToGameLogs("<span style='color:red;'>You killed the enemy!</span>");
		this.lootTables.forEach(lootTable => {
			if (lootTable.getLoot() != null) {
				var itemDropped = lootTable.getLoot();
				for (var i = 0; i < itemDropped["count"]; i++) {
					player.addToInventory(itemDropped["item"]);
				}
				addToGameLogs("<span style='color: #00861d; font-weight:bold;'>You received " + itemDropped["count"] + " " + itemDropped["item"].name + "!</span>");
			}
		});
	}

	takeDamage(damageToTake) {
		this.currentHP -= damageToTake;
	}
}

const skeletonLootTable = [
	{
		"item": itemDb["bones"],
		"drop_rate_percentage": 100,
		"minimum_quantity": 1,
		"maximum_quantity": 3
	}
]

const slimeLootTable = [
	{
		"item": itemDb["slime"],
		"drop_rate_percentage": 100,
		"minimum_quantity": 1,
		"maximum_quantity": 3
	}
]

const spiderLootTable = [
	{
		"item": itemDb["spider_eye"],
		"drop_rate_percentage": 100,
		"minimum_quantity": 1,
		"maximum_quantity": 3
	}
]

const zombieLootTable = [
	{
		"item": itemDb["rotten_flesh"],
		"drop_rate_percentage": 100,
		"minimum_quantity": 1,
		"maximum_quantity": 3
	}
]

const oreLootTable = [
	{
		"item": itemDb["copper_ore"],
		"drop_rate_percentage": 25,
		"minimum_quantity": 1,
		"maximum_quantity": 2
	},
	{
		"item": itemDb["iron_ore"],
		"drop_rate_percentage": 25,
		"minimum_quantity": 1,
		"maximum_quantity": 2
	},
	{
		"item": itemDb["mithril_ore"],
		"drop_rate_percentage": 25,
		"minimum_quantity": 1,
		"maximum_quantity": 2
	},
	{
		"item": itemDb["adamant_ore"],
		"drop_rate_percentage": 25,
		"minimum_quantity": 1,
		"maximum_quantity": 2
	}
]

const enemyDb = {
	"skeleton": new Enemy(
		"Skeleton",
		"You encountered a skeleton!",
		2,
		18,
		[
			new LootTable(skeletonLootTable),
			new LootTable(oreLootTable)
		]
	),
	"slime": new Enemy(
		"Slime",
		"You encountered a slime!",
		1,
		50,
		[
			new LootTable(slimeLootTable),
			new LootTable(oreLootTable)
		]),
	"spider": new Enemy(
		"Spider",
		"You encountered a spider!",
		1,
		2,
		[
			new LootTable(spiderLootTable),
			new LootTable(oreLootTable)
		]),
	"zombie": new Enemy(
		"Zombie",
		"You encountered a zombie!",
		2,
		22,
		[
			new LootTable(zombieLootTable),
			new LootTable(oreLootTable)
		])
}

function getRandomEnemy() {
	var enemyList = Object.keys(enemyDb);
	var randomEnemy = enemyDb[enemyList[getRandomInt(0, enemyList.length)]];
	var enemyToReturn = new Enemy(randomEnemy.name, randomEnemy.encounterMessage, randomEnemy.damage, randomEnemy.maxHP, randomEnemy.lootTables);
	return enemyToReturn;
}
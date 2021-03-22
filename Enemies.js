class Enemy {
	constructor(name, encounterMessage, damage, maxHP) {
		this.name = name;
		this.encounterMessage = encounterMessage;

		this.damage = damage;
		this.currentHP = maxHP;
		this.maxHP = maxHP;
	}

	die() {
		addToGameLogs("<span style='color:red;'>You killed the enemy!</span>");
	}

	takeDamage(damageToTake) {
		this.currentHP -= damageToTake;
	}
}

const enemyDb = {
	"skeleton": new Enemy("Skeleton", "You encountered a skeleton!", 2, 18),
	"slime": new Enemy("Slime", "You encountered a slime!", 1, 50),
	"spider": new Enemy("Spider", "You encountered a spider!", 1, 2),
	"zombie": new Enemy("Zombie", "You encountered a zombie!", 2, 22)
}

function getRandomEnemy() {
	var enemyList = Object.keys(enemyDb);
	var randomEnemy = enemyDb[enemyList[getRandomInt(0, enemyList.length)]];
	return randomEnemy;
}
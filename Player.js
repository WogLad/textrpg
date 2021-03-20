class Equipment {
	constructor() {
		this.head = null;
		this.chest = null;
		this.legs = null;
		this.feet = null;
		this.weapon = null;
		this.tool = null;
	}
}

class Player {
	constructor(name) {
		this.name = name;
		this.gold = 0;

		this.posX = 0;
		this.posY = 0;

		this.inventory = new Array();
		this.inventory.push(itemDb["wooden_axe"]);

		this.damage = 1;
		this.critRate = 5; // In percentage
		this.critDamage = 5; // In percentage
		this.defense = 0;

		this.currentHP = 10;
		this.maxHP = 10;

		this.movementSpeed = 1;
		this.canMove = true;
		this.enemyEncounterRate = 10;

		this.equipment = new Equipment();
	}

	updatePosText() {
		var posText = document.getElementById("posText");
		posText.innerHTML = "<b>x</b>: " + this.posX.toString() + "<br>" + "<b>y</b>: " + this.posY.toString();
	}

	move(x, y) {
		if (this.canMove) {
			this.posX += (x * this.movementSpeed);
			this.posY += (y * this.movementSpeed);
			this.updatePosText();

			if (getRandomInt(0, 100) < this.enemyEncounterRate) {
				this.battle(new Enemy());
			}
		}
	}

	tpHome() {
		if (this.canMove) {
			this.posX = 0;
			this.posY = 0;
			this.updatePosText();
		}
	}

	addToInventory(item) {
		this.inventory.push(item);
	}

	attack(enemyToAttack) {
		var finalDamage = this.damage;
		if (getRandomInt(0, 100) < this.critRate) {
			finalDamage += (finalDamage * (this.critDamage/100));
		}
		enemyToAttack.takeDamage(finalDamage);
	}

	die() {
		this.tpHome();
		this.currentHP = this.maxHP;
		addToGameLogs("<span style='color:red;'>You died!</span>");
	}

	takeDamage(damageToTake) {
		this.currentHP -= damageToTake;
		if (this.currentHP <= 0) {
			this.die();
		}
	}

	battle(enemy) {
		this.canMove = false;
		addToGameLogs("You encountered an enemy!");
		setTimeout(() => {
			console.log("hey");
			this.canMove = true;
		}, 5000);
		// for (let i = 0; i > -1; i++) {
		// 	break;
		// }
	}

	equip(equipment) {
		switch (equipment.type) {
			case "tool":
				this.equipment.tool = equipment;
				break;
			case "weapon":
				this.equipment.weapon = equipment;
				break;
		}
	}
}
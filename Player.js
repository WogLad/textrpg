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

		this.damage = 2;
		this.critRate = 5; // In percentage
		this.critDamage = 5; // In percentage
		this.defense = 0;

        this.kills = 0;

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
        finalDamage = Math.floor(finalDamage);
        addToGameLogs("You deal " + finalDamage.toString() + " damage to the enemy.");
		enemyToAttack.takeDamage(finalDamage);
	}

	die() {
		this.tpHome();
		this.currentHP = this.maxHP;
		addToGameLogs("<span style='color:red;'>You died!</span>");
	}

	takeDamage(damageToTake) {
		this.currentHP -= damageToTake;
        addToGameLogs("You lost " + damageToTake.toString() + " HP.");
		// if (this.currentHP <= 0) {
        //     this.canMove = true;
		// 	this.die();
		// }
	}

	battle(enemy) {
		this.canMove = false;
		addToGameLogs("You encountered an enemy!");
        var response = prompt("You encountered an enemy.\nDo you wish to fight it? (yes/no)");
        if (response.toLowerCase() == "no") {
            addToGameLogs("You escaped from the enemy.");
            this.canMove = true;
        }
        else {
            addToGameLogs("You begin to fight the enemy.");
            var turns = 0;
            var battleLoop = setInterval(() => {
                if (turns % 2 == 0) {
                    this.attack(enemy);
                    if (enemy.currentHP <= 0) {
                        this.canMove = true;
                        enemy.die();
                        this.kills++;
                        clearInterval(battleLoop);
                    }
                }
                else {
                    this.takeDamage(enemy.damage);
                    if (this.currentHP <= 0) {
                        this.canMove = true;
                    	this.die();
                        clearInterval(battleLoop);
                    }
                }
                turns++;
            }, 1000);
        }
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
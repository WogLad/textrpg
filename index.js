function loadJs(url) {
    var script = document.createElement('script');
    script.src = url;
    script.setAttribute('async', 'true');
    document.documentElement.firstChild.appendChild(script);
}

setTimeout(function () {
    loadJs("https://chancejs.com/chance.min.js");
}, 50);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

class Item {
	constructor(name) {
		this.name = name;
	}
}

class Tool extends Item {
	constructor(name, axePower, pickaxePower) {
		super(name);
		this.axePower = axePower;
		this.pickaxePower = pickaxePower;
	}
}

class Weapon extends Item {
	constructor(name, weaponPower) {
		super(name);
		this.weaponPower = weaponPower;
	}
}

const itemDb = {
	"wooden_axe": new Tool("Wooden Axe", 1, 0),
	"wooden_pickaxe": new Tool("Wooden Pickaxe", 0, 1),
	"wooden_sword": new Weapon("Wooden Sword", 1)
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
	}

	updatePosText() {
		var posText = document.getElementById("posText");
		posText.innerHTML = "<b>x</b>: " + this.posX.toString() + "<br>" + "<b>y</b>: " + this.posY.toString();
	}

	move(x, y) {
		if (!this.canMove) {
			return;
		}
		this.posX += (x * this.movementSpeed);
		this.posY += (y * this.movementSpeed);
		this.updatePosText();

		enemies.forEach(enemy => {
			if (enemy.posX == this.posX && enemy.posY == this.posY) {
				this.battle(enemy);
				return;
			}
		});
	}

	tpHome() {
		this.posX = 0;
		this.posY = 0;
		this.updatePosText();
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
		for (let i = 0; i > -1; i++) {
			
		}
	}
}

class Enemy {
	constructor() {
		this.posX = 0;
		this.posY = 0;

		this.damage = 1;
		this.currentHP = 10;
		this.maxHP = 10;
	}

	attack(playerToAttack) {
		var finalDamage = this.damage;
		if (getRandomInt(0, 100) < this.critRate) {
			finalDamage += (finalDamage * (this.critDamage/100));
		}
		playerToAttack.takeDamage(finalDamage);
	}

	die() {
		addToGameLogs("<span style='color:red;'>You died!</span>");
		delete this;
	}

	takeDamage(damageToTake) {
		this.currentHP -= damageToTake;
		if (this.currentHP <= 0) {
			this.die();
		}
	}
}

var enemies = new Array();

function addToGameLogs(message) {
	document.getElementById("gameLogs").innerHTML += "<br>" + message;
}

function parseCommand() {
	var commandInputBox = document.getElementById("commandInputBox");
	console.log(commandInputBox.value);
}

for (let i = 0; i < 5; i++) {
	var e = new Enemy();
	e.posX = getRandomInt(-10, 11);
	e.posY = getRandomInt(-10, 11);
	enemies.push(e);
	console.log(e.posX.toString() + " " + e.posY.toString());
}

var player = new Player("WogLad");
addToGameLogs("<span style='color: red'>hola!</span>");
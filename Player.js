class EquipmentSlots {
	constructor() {
		this.head = null;
		this.chest = null;
		this.legs = null;
		this.feet = null;
		this.weapon = null;
		this.tool = null;
	}
}

class Skill {
	constructor(name, maxLevel) {
		this.name = name;
		this.exp = 0;
		this.level = 1;
		this.maxLevel = maxLevel;
		this.firstLevelUpExp = 50; // The amount of exp required to go from level 1 to level 2.
	}

	getExpForNextLevel() {
		return Math.floor(this.firstLevelUpExp * (Math.pow(1.15, (this.level-1))))
	}

	addExp(amount) {
		if (this.level >= this.maxLevel) {return;}
		this.exp += amount;
		var expForNextLevel = this.getExpForNextLevel();
		if ((this.level == 1) && (this.exp >= this.firstLevelUpExp)) {
			// Level Up to Level 2.
			this.exp = (this.exp - this.firstLevelUpExp);
			this.level++;
			while (this.level < this.maxLevel && this.exp >= this.getExpForNextLevel()) {
				this.exp -= this.getExpForNextLevel();
				this.level++;
			}
		}
		else if (this.exp >= expForNextLevel) {
			// Level Up to the next level.
			this.exp = (this.exp - expForNextLevel);
			this.level++;
			while (this.level < this.maxLevel && this.exp >= this.getExpForNextLevel()) {
				this.exp -= this.getExpForNextLevel();
				this.level++;
			}
		}
		player.updateSkillsText();
	}
}

const Locations = Object.freeze({
	"OVERWORLD": "Overworld",
	"CAVE": "Cave",
	"LAKE": "Lake"
});

class Player {
	constructor(name) {
		this.name = name;
		this.gold = 0;

		this.posX = 0;
		this.posY = 0;
		this.location = Locations.OVERWORLD;

		this.inventory = new Array();

		this.damage = 2;
		this.critRate = 5; // In percentage
		this.critDamage = 5; // In percentage
		this.defense = 0;

		this.pickaxePower = 0;
		this.axePower = 0;

        this.kills = 0;

		this.currentHP = 10;
		this.maxHP = 10;

		this.movementSpeed = 1;
		this.canMove = true;

		this.enemyEncounterRate = 10;
		this.caveEncounterRate = 5;
		this.oreFindRate = 15;

		this.equipment = new EquipmentSlots();
		this.skills = [
			new Skill("Mining", 99),
			new Skill("Fishing", 99),
			new Skill("Woodcutting", 99),
			new Skill("Cooking", 99),
			new Skill("Farming", 99)
		]
	}

	updatePosText() {
		if (this.location == Locations.OVERWORLD) {
			document.getElementById("posText").innerHTML = "<b>x</b>: " + this.posX + "<br>" + "<b>y</b>: " + this.posY + "<br>" + "<b>Location</b>: " + this.location;
			document.getElementById("tpHomeButton").innerHTML = "Home Teleport";
		}
		else {
			document.getElementById("posText").innerHTML = "<b>Location</b>: " + this.location;
			document.getElementById("tpHomeButton").innerHTML = "Exit Cave";
		}
	}

	updateStatsText() {
		document.getElementById("playerStatsDiv").innerHTML = (
			"Damage: " + this.damage + "<br>" +
			"Health: " + this.currentHP + "/" + this.maxHP + "<br>" +
			"Defense: " + this.defense + "<br>" +
			"Kills: " + this.kills + "<br>" +
			"Crit Rate: " + this.critRate + "%" + "<br>" +
			"Crit Damage: " + this.critDamage + "%"
		);
	}

	updateSkillsText() {
		document.getElementById("playerSkillsDiv").innerHTML = (
			"<b><u>Skills:</u></b>" + "<br>" +
			this.skills[0].name + ": " + this.skills[0].level + " (" + this.skills[0].exp + "/" + this.skills[0].getExpForNextLevel() + ")" + "<br>" + 
			this.skills[1].name + ": " + this.skills[1].level + " (" + this.skills[1].exp + "/" + this.skills[1].getExpForNextLevel() + ")" + "<br>" + 
			this.skills[2].name + ": " + this.skills[2].level + " (" + this.skills[2].exp + "/" + this.skills[2].getExpForNextLevel() + ")" + "<br>" + 
			this.skills[3].name + ": " + this.skills[3].level + " (" + this.skills[3].exp + "/" + this.skills[3].getExpForNextLevel() + ")" + "<br>" + 
			this.skills[4].name + ": " + this.skills[4].level + " (" + this.skills[4].exp + "/" + this.skills[4].getExpForNextLevel() + ")"
		);
	}

	move(x, y) {
		if (this.canMove) {
			if (this.location == Locations.OVERWORLD) {
				this.posX += (x * this.movementSpeed);
				this.posY += (y * this.movementSpeed);
				if (getRandomInt(0, 100) < this.enemyEncounterRate) {
					this.battle(getRandomEnemy());
				}
				else if (getRandomInt(0, 100) < this.caveEncounterRate) {
					this.enterCave();
				}
			}
			else if (this.location == Locations.CAVE) {
				if (getRandomInt(0, 100) < this.oreFindRate) {
					var response = prompt("You found some ores.\nDo you want to mine it?");
					if (response == null || response.toLowerCase() == "no") {this.updatePosText(); return;}
					this.mine();
				}
			}
			// else if ()
			this.updatePosText();
		}
	}

	interactWithWorld() {
		alert("This doesn't do anything right now.");
	}

	tpHome() {
		if (this.canMove) {
			if (this.location == Locations.OVERWORLD) {
				this.posX = 0;
				this.posY = 0;
			}
			else if (this.location == Locations.CAVE) {
				this.location = Locations.OVERWORLD;
			}
			this.updatePosText();
		}
	}

	addToInventory(item) {
		this.inventory.push(item);
	}

	getInventory() {

	}

	attack(enemyToAttack) {
		var finalDamage = this.damage;
		if (getRandomInt(0, 100) < this.critRate) {
			finalDamage += (finalDamage * (this.critDamage/100));
		}
        finalDamage = Math.floor(finalDamage);
        addToGameLogs("<span style='color:#00861d;'>You deal " + finalDamage.toString() + " damage to the enemy.</span>");
		enemyToAttack.takeDamage(finalDamage);
		this.updateStatsText();
	}

	die() {
		this.tpHome();
		this.currentHP = this.maxHP;
		addToGameLogs("<span style='color:red;'><b>You died!</b></span>");
		this.updateStatsText();
	}

	takeDamage(damageToTake) {
		this.currentHP -= damageToTake;
        addToGameLogs("<span style='color:red'>You lost " + damageToTake.toString() + " HP.</span>");
		this.updateStatsText();
	}

	battle(enemy) {
		this.canMove = false;
		addToGameLogs(enemy.encounterMessage);
        var response = prompt(enemy.encounterMessage + "\nDo you wish to fight it? (yes/no)");
        if (response == null || response.toLowerCase() == "no") {
            addToGameLogs("You escaped from the " + enemy.name.toLowerCase() + ".");
            this.canMove = true;
        }
        else {
            addToGameLogs("You begin to fight the " + enemy.name.toLowerCase() + ".");
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
					this.updateStatsText();
                }
                else {
                    this.takeDamage(enemy.damage);
                    if (this.currentHP <= 0) {
                        this.canMove = true;
                    	this.die();
                        clearInterval(battleLoop);
                    }
					this.updateStatsText();
                }
                turns++;
				this.updateStatsText();
            }, 1000);
			this.updateStatsText();
        }
	}

	enterCave() {
		var response = prompt("You found the entrance to a cave.\nDo you want to enter the cave?");
		if (response == null || response.toLowerCase() == "no") {
			addToGameLogs("You avoided the cave.");
		}
		else {
			addToGameLogs("You entered the cave.");
			this.location = Locations.CAVE;
			this.updatePosText();
		}
	}

	mine() {
		var oreFound = listOfOres[getRandomInt(0, listOfOres.length)];
		var amountOfOresFound = getRandomInt(1, 4);
		for (var i = 0; i < amountOfOresFound; i++) {
			this.addToInventory(oreFound);
			this.skills[0].addExp(oreFound.miningExpToReceive);
		}
		addToGameLogs("<span style='color: #00861d; font-weight: bold;'>You received " + amountOfOresFound + " " + oreFound.name + "!</span>");
		addToGameLogs("<span style='color: gold; font-weight: bold;'>You received " + (oreFound.miningExpToReceive*amountOfOresFound) + " Mining EXP in total!</span>");
		this.updateSkillsText();
	}

	equip(equipment) {
		switch (equipment.type) {
			case "equipment":
				switch(equipment.equipmentType) {
					case "head":
						if (this.equipment.head == null) {
							this.equipment.head = equipment;
							this.defense += equipment.defenseBonus;
						}
						else {
							this.defense -= this.equipment.head.defenseBonus;
							this.equipment.head = equipment;
							this.defense += equipment.defenseBonus;
						}
						break;
					case "chest":
						if (this.equipment.chest == null) {
							this.equipment.chest = equipment;
							this.defense += equipment.defenseBonus;
						}
						else {
							this.defense -= this.equipment.chest.defenseBonus;
							this.equipment.chest = equipment;
							this.defense += equipment.defenseBonus;
						}
						break;
					case "legs":
						if (this.equipment.legs == null) {
							this.equipment.legs = equipment;
							this.defense += equipment.defenseBonus;
						}
						else {
							this.defense -= this.equipment.legs.defenseBonus;
							this.equipment.legs = equipment;
							this.defense += equipment.defenseBonus;
						}
						break;
					case "feet":
						if (this.equipment.feet == null) {
							this.equipment.feet = equipment;
							this.defense += equipment.defenseBonus;
						}
						else {
							this.defense -= this.equipment.feet.defenseBonus;
							this.equipment.feet = equipment;
							this.defense += equipment.defenseBonus;
						}
						break;
				}
			case "tool":
				if (this.equipment.tool == null) {
					this.equipment.tool = equipment;
					this.pickaxePower += equipment.pickaxePower;
					this.pickaxePower += equipment.axePower;
				}
				else {
					this.pickaxePower -= this.equipment.tool.pickaxePower;
					this.axePower -= this.equipment.tool.axePower;
					this.equipment.tool = equipment;
					this.pickaxePower += equipment.pickaxePower;
					this.axePower += equipment.axePower;
				}
				break;
			case "weapon":
				if (this.equipment.weapon == null) {
					this.equipment.weapon = equipment;
					this.damage += equipment.weaponPower;
					this.critRate += equipment.critRate;
					this.critDamage += equipment.critDamage;
				}
				else {
					this.damage -= this.equipment.weapon.weaponPower;
					this.critRate -= this.equipment.weapon.critRate;
					this.critDamage -= this.equipment.weapon.critDamage;
					this.equipment.weapon = equipment;
					this.damage += equipment.weaponPower;
					this.critRate += equipment.critRate;
					this.critDamage += equipment.critDamage;
				}
				break;
		}
		this.updateStatsText();
	}

	askForLoadData() {
		var saveData = prompt("Paste your save data here.");
		this.loadSaveData(saveData);
	}

    loadSaveData(saveDataString) {
		var saveData = JSON.parse(saveDataString);
        this.name = saveData["name"];
        this.gold = saveData["gold"];
        this.posX = saveData["posX"];
        this.posY = saveData["posY"];
		this.location = saveData["location"];
		this.updatePosText();

        // Inventory Loading
		saveData["inventory"].forEach(item => {
			if (item != null) {
				switch (item["type"]) {
					case "item":
						var newItem = new Item(item["name"], "item");
						this.inventory.push(newItem);
						break;
					case "tool":
						var tool = new Tool(item["name"], "tool", item["axePower"], item["pickaxePower"]);
						this.inventory.push(tool);
						break;
					case "weapon":
						var weapon = new Weapon(item["name"], "weapon", item["weaponPower"], item["critRate"], item["critDamage"]);
						this.inventory.push(weapon);
						break;
					case "equipment":
						var armor = new Equipment(item["name"], "equipment", item["equipmentType"], item["defenseBonus"]);
						this.inventory.push(armor);
						break;
					case "food":
						var food = new Food(item["name"], "food", item["hpReceived"], item["canBeCooked"], item["cookedVersion"]);
						this.inventory.push(food);
						break;
					case "ore":
						var ore = new Ore(item["name"], "ore", item["miningExpToReceive"]);
						this.inventory.push(ore);
						break;
				}
			}
		});

        // this.damage = saveData["damage"];
        // this.critDamage = saveData["critDamage"];
        // this.critRate = saveData["critRate"];
        // this.defense = saveData["defense"];
        this.kills = saveData["kills"];
        this.currentHP = saveData["currentHP"];
        this.maxHP = saveData["maxHP"];
        // this.movementSpeed = saveData["movementSpeed"];

        // Equipment Loading
		var headData = saveData["equipment"]["head"];
		if (headData != null) {
			var headObj = new Equipment(headData["name"], headData["type"], headData["equipmentType"], headData["defenseBonus"]);
			this.equip(headObj);
		}
		
		var chestData = saveData["equipment"]["chest"];
		if (chestData != null) {
			var chestObj = new Equipment(chestData["name"], chestData["type"], chestData["equipmentType"], chestData["defenseBonus"]);
			this.equip(chestObj);
		}
		
		var legsData = saveData["equipment"]["legs"];
		if (legsData != null) {
			var legsObj = new Equipment(legsData["name"], legsData["type"], legsData["equipmentType"], legsData["defenseBonus"]);
			this.equip(legsObj);
		}
		
		var feetData = saveData["equipment"]["feet"];
		if (feetData != null) {
			var feetObj = new Equipment(feetData["name"], feetData["type"], feetData["equipmentType"], feetData["defenseBonus"]);
			this.equip(feetObj);
		}
		
		var weaponData = saveData["equipment"]["weapon"];
		if (weaponData != null) {
			var weaponObj = new Weapon(weaponData["name"], weaponData["type"], weaponData["weaponPower"], weaponData["critRate"], weaponData["critDamage"]);
			this.equip(weaponObj);
		}
		
		var toolData = saveData["equipment"]["tool"];
		if (toolData != null) {
			var toolObj = new Tool(toolData["name"], toolData["type"], toolData["axePower"], toolData["pickaxePower"]);
			this.equip(toolObj);
		}

		// Player Stats Loading
		var skillsData = saveData["skills"];
		for (var i = 0; i < this.skills.length; i++) {
			this.skills[i].exp = skillsData[i]["exp"];
			this.skills[i].level = skillsData[i]["level"];
		}

		this.updateStatsText();
		this.updateSkillsText();
    }

	copySaveData() {
		const el = document.createElement('textarea');
		el.value = JSON.stringify(this);
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		alert("Successfully copied the save data to the clipboard.");
	}

	clearSaveData() {
		localStorage.setItem("saveData", JSON.stringify(new Player("Player")));
		location.reload();
	}
}

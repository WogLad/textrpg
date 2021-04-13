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

		this.lakeFindRate = 5;
		this.fishCatchRate = 25;
		this.canFish = true;

		this.treeFindRate = 5;

		this.equipment = new EquipmentSlots();
		this.skills = [
			new Skill("Mining", 99),
			new Skill("Fishing", 99),
			new Skill("Woodcutting", 99),
			new Skill("Cooking", 99),
			new Skill("Smelting", 99),
			new Skill("Crafting", 99)
		]
	}

	updatePosText() {
		switch (this.location) {
			case Locations.OVERWORLD:
				document.getElementById("posText").innerHTML = "<b>x</b>: " + this.posX + "<br>" + "<b>y</b>: " + this.posY + "<br>" + "<b>Location</b>: " + this.location;
				document.getElementById("tpHomeButton").innerHTML = "Home Teleport";
				break;
			case Locations.CAVE:
				document.getElementById("posText").innerHTML = "<b>Location</b>: " + this.location;
				document.getElementById("tpHomeButton").innerHTML = "Exit Cave";
				break;
			case Locations.LAKE:
				document.getElementById("posText").innerHTML = "<b>Location</b>: " + this.location;
				document.getElementById("tpHomeButton").innerHTML = "Leave Lake";
				break;
		}
	}

	updateStatsText() {
		document.getElementById("playerStatsDiv").innerHTML = (
			"<b><u>Stats:</u></b>" + "<br>" +
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
			this.skills[4].name + ": " + this.skills[4].level + " (" + this.skills[4].exp + "/" + this.skills[4].getExpForNextLevel() + ")" + "<br>" +
			this.skills[5].name + ": " + this.skills[5].level + " (" + this.skills[5].exp + "/" + this.skills[5].getExpForNextLevel() + ")"
		);
	}

	move(x, y) {
		if (this.canMove) {
			switch(this.location) {
				case Locations.OVERWORLD:
					this.posX += (x * this.movementSpeed);
					this.posY += (y * this.movementSpeed);
					if (getRandomInt(0, 100) < this.enemyEncounterRate) {
						this.battle(getRandomEnemy());
					}
					else if (getRandomInt(0, 100) < this.caveEncounterRate) {
						this.enterCave();
					}
					else if (getRandomInt(0, 100) < this.lakeFindRate) {
						this.findLake();
					}
					else if (getRandomInt(0, 100) < this.treeFindRate) {
						this.woodcut();
					}
					break;
				case Locations.CAVE:
					if (getRandomInt(0, 100) < this.oreFindRate) {
						this.mine();
					}
					break;
			}
		}
		this.updatePosText();
	}

	interactWithWorld() {
		if (this.location == Locations.LAKE) {
			this.fish();
		}
		else {
			alert("This doesn't do anything right now.");
		}
	}

	tpHome() {
		if (this.canMove) {
			switch (this.location) {
				case Locations.OVERWORLD:
					this.posX = 0;
					this.posY = 0;
					break;
				case Locations.CAVE:
					this.location = Locations.OVERWORLD;
					break;
				case Locations.LAKE:
					this.location = Locations.OVERWORLD;
					break;
			}
			this.updatePosText();
		}
	}

	addToInventory(item) {
		this.inventory.push(item);
	}

	equipFromInventory(index) {
		if (this.inventory[index] instanceof Tool || this.inventory[index] instanceof Weapon || this.inventory[index] instanceof Equipment) {
			var e = null;
			switch(this.inventory[index].type) {
				case "equipment":
					switch(this.inventory[index].equipmentType) {
						case "head":
							e = this.equipment.head;
							break;
						case "chest":
							e = this.equipment.chest;
							break;
						case "legs":
							e = this.equipment.legs;
							break;
						case "feet":
							e = this.equipment.feet;
							break;
					}
					break;
				case "weapon":
					e = this.equipment.weapon;
					break;
				case "tool":
					e = this.equipment.tool;
					break;
			}
			this.equip(this.inventory[index]);
			this.inventory.splice(index, 1);
			if (e != null) {
				this.inventory.push(e);
			}
			this.updateInventoryTextDiv();
		}
	}

	updateInventoryTextDiv() {
		var inventoryDivTextArea = document.getElementById("inventory-div-textarea");
		var inventoryText = "";
		for (var i = 0; i < this.inventory.length; i++) {
			inventoryText += "<p class='clickable' onclick='player.equipFromInventory(" + i + ");player.updateInventoryTextDiv();'>" + this.inventory[i].name + "</p>";
		}
		inventoryDivTextArea.innerHTML = inventoryText;
		// Add the code to update the 'equipment-div-textarea' text for the equipment text.
		var equipmentText = "<strong><u>Equipment</u></strong><br><br>";
		if (this.equipment.head != null) {
			equipmentText += "<b>Head:</b> " + this.equipment.head.name + "<br>";
		}
		else {
			equipmentText += "<b>Head:</b> " + "Empty<br>";
		}
		if (this.equipment.chest != null) {
			equipmentText += "<b>Chest</b>: " + this.equipment.chest.name + "<br>";
		}
		else {
			equipmentText += "<b>Chest:</b> " + "Empty<br>";
		}
		if (this.equipment.legs != null) {
			equipmentText += "<b>Legs</b>: " + this.equipment.legs.name + "<br>";
		}
		else {
			equipmentText += "<b>Legs:</b> " + "Empty<br>";
		}
		if (this.equipment.feet != null) {
			equipmentText += "<b>Feet</b>: " + this.equipment.feet.name + "<br>";
		}
		else {
			equipmentText += "<b>Feet:</b> " + "Empty<br>";
		}
		if (this.equipment.weapon != null) {
			equipmentText += "<b>Weapon</b>: " + this.equipment.weapon.name + "<br>";
		}
		else {
			equipmentText += "<b>Weapon:</b> " + "Empty<br>";
		}
		if (this.equipment.tool != null) {
			equipmentText += "<b>Tool</b>: " + this.equipment.tool.name;
		}
		else {
			equipmentText += "<b>Tool:</b> " + "Empty<br>";
		}
		document.getElementById("equipment-div-textarea").innerHTML = equipmentText;
	}

	eat() {
		var foodToEat = document.getElementById("food-to-eat-select-menu").value;
		if (this.inventory.includes(itemDb[foodToEat]) == true) {
			if (this.currentHP < this.maxHP) {
				removeFromArray(this.inventory, itemDb[foodToEat]);
				this.currentHP += itemDb[foodToEat].hpReceived;
				if (this.currentHP > this.maxHP) {this.currentHP = this.maxHP;}
				addToGameLogs("<span style='color:#00861d; font-weight: bold;'>You ate " + itemDb[foodToEat].name + " and received " + itemDb[foodToEat].hpReceived + " HP!</span>");
				this.updateStatsText();
			}
			else {
				addToGameLogs("<span style='color:red; font-weight: bold;'>You can't eat the " + itemDb[foodToEat].name + " since you're already at full HP.</span>");
			}
		}
		else {
			addToGameLogs("<span style='color:red; font-weight: bold;'>You don't have any " + itemDb[foodToEat].name + " to eat.</span>");
		}
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
		var response = prompt("You found some ores.\nDo you want to mine it?");
		if (response == null || response.toLowerCase() == "no") {
			this.updatePosText();
			return;
		}
		var oreFound = listOfOres[getRandomInt(0, listOfOres.length)];
		var amountOfOresFound = getRandomInt(1, 4);
		for (var i = 0; i < amountOfOresFound; i++) {
			this.addToInventory(oreFound);
			this.skills[0].addExp(oreFound.miningExpToReceive);
		}
		addToGameLogs("<span style='color: #00861d; font-weight: bold;'>You mined " + amountOfOresFound + " " + oreFound.name + "!</span>");
		addToGameLogs("<span style='color: gold; font-weight: bold;'>You received " + (oreFound.miningExpToReceive*amountOfOresFound) + " Mining EXP in total!</span>");
		this.updateSkillsText();
	}

	findLake() {
		var response = prompt("You find a lake.\nDo you want to fish there?");
		if (response == null || response.toLowerCase() == "no") {
			addToGameLogs("You avoided the lake.");
		}
		else {
			addToGameLogs("You sat near the lake.");
			this.location = Locations.LAKE;
			this.updatePosText();
		}
	}

	fish() {
		if (this.canFish) {
			this.canFish = false;
			addToGameLogs("You try to fish in the lake...");
			setTimeout(() => {
				if (getRandomInt(0, 100) < this.fishCatchRate) {
					var fishFound = listOfFishableItems[getRandomInt(0, listOfFishableItems.length)];
					this.addToInventory(fishFound.fishObj);
					this.skills[1].addExp(fishFound.fishingExp);
					addToGameLogs("<span style='color: #00861d; font-weight: bold;'>You fished 1 " + fishFound.fishObj.name + "!</span>");
					addToGameLogs("<span style='color: gold; font-weight: bold;'>You received " + (fishFound.fishingExp) + " Fishing EXP!</span>");
					this.updateSkillsText();
				}
				else {
					addToGameLogs("<span style='color: red'>You failed to catch anything!</span>");
				}
				this.canFish = true;
			}, 1000);
		}
	}

	woodcut() {
		var response = prompt("You see a tree.\nDo you want to cut it down?");
		if (response == null || response.toLowerCase() == "no") {
			addToGameLogs("You avoided the tree.");
			this.updatePosText();
			return;
		}
		addToGameLogs("You begin cutting down the tree...");
		setTimeout(() => {
			var amountOfWoodReceived = getRandomInt(1, 4);
			for (var i = 0; i < amountOfWoodReceived; i++) {
				this.addToInventory(itemDb["wood"]);
				this.skills[2].addExp(25);
			}
			addToGameLogs("<span style='color: #00861d; font-weight: bold;'>You cut down a tree and received " + amountOfWoodReceived + " " + "Wood" + "!</span>");
			addToGameLogs("<span style='color: gold; font-weight: bold;'>You received " + (25*amountOfWoodReceived) + " Woodcutting EXP in total!</span>");
			this.updateSkillsText();
		}, 1000);
	}

	cook() {
		var foodToCookSelectMenu = document.getElementById("food-to-cook-select-menu");
		var itemToCook = itemDb[foodToCookSelectMenu.value]
		if (this.inventory.includes(itemToCook) == true) {
			this.inventory = removeFromArray(this.inventory, itemToCook);
			this.addToInventory(itemDb[itemToCook.cookedVersion.id]);
			this.skills[3].addExp(expForCookingRawFoodTable[itemToCook.id]);
			addToGameLogs("<span style='color: gold; font-weight: bold;'>You received " + expForCookingRawFoodTable[itemToCook.id] + " Cooking EXP!</span>");
			addToGameLogs("<span style='color: #00861d; font-weight: bold;'>You successfully cooked the " + itemToCook.name + "!</span>");
		}
		else {
			addToGameLogs("<span style='color: red; font-weight: bold;'>You don't have any " + itemToCook.name + " in your inventory to cook.</span>");
		}
	}

	smeltOre() {
		var oreToSmelt = itemDb[document.getElementById("ores-to-smelt-select-menu").value];
		if (this.inventory.includes(oreToSmelt) == true) {
			this.inventory = removeFromArray(this.inventory, oreToSmelt);
			var barObtained = oreToBar[oreToSmelt.id];
			this.addToInventory(barObtained);
			this.skills[4].addExp(barObtained.smeltingExpToReceive);
			addToGameLogs("<span style='color: gold; font-weight: bold;'>You received " + barObtained.smeltingExpToReceive + " Smelting EXP!</span>");
		}
		else {
			addToGameLogs("<span style='color: red; font-weight: bold;'>You don't have any " + oreToSmelt.name + " in your inventory to smelt.</span>");
		}
	}

	craft() {
		var itemToCraft = document.getElementById("items-to-craft-select-menu").value;
		if (craftingRecipesDb[itemToCraft] == null) {return;}
		var canCraftItemToCraft = false;
		for (var i = 0; i < craftingRecipesDb[itemToCraft].length; i++) {
			if (this.inventory.includes(craftingRecipesDb[itemToCraft][i]) == true) {
				canCraftItemToCraft = true;
			}
			else {
				canCraftItemToCraft = false;
				break;
			}
		}
		if (canCraftItemToCraft == true) {
			craftingRecipesDb[itemToCraft].forEach(item => {
				removeFromArray(this.inventory, item);
			});
			this.addToInventory(itemDb[itemToCraft]);
			addToGameLogs("<span style='color: #00861d; font-weight: bold;'>You crafted the " + itemDb[itemToCraft].name + "!</span>");
		}
		else {
			addToGameLogs("<span style='color: red; font-weight: bold;'>You don't have all the materials required to craft the " + itemDb[itemToCraft].name + "!</span>");
		}
	}

	equip(equipment) {
		switch (equipment.type) {
			case "equipment":
				console.log("bob");
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
				break;
			case "tool":
				console.log("bub");
				if (this.equipment.tool == null) {
					this.equipment.tool = equipment;
					this.pickaxePower += equipment.pickaxePower;
					this.axePower += equipment.axePower;
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
				this.inventory.push(itemDb[item["id"]]);
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
			this.equip(itemDb[headData["id"]]);
		}
		
		var chestData = saveData["equipment"]["chest"];
		if (chestData != null) {
			this.equip(itemDb[chestData["id"]]);
		}
		
		var legsData = saveData["equipment"]["legs"];
		if (legsData != null) {
			this.equip(itemDb[legsData["id"]]);
		}
		
		var feetData = saveData["equipment"]["feet"];
		if (feetData != null) {
			this.equip(itemDb[feetData["id"]]);
		}
		
		var weaponData = saveData["equipment"]["weapon"];
		if (weaponData != null) {
			this.equip(itemDb[weaponData["id"]]);
		}
		
		var toolData = saveData["equipment"]["tool"];
		if (toolData != null) {
			this.equip(itemDb[toolData["id"]]);
		}

		// Player Stats Loading
		var skillsData = saveData["skills"];
		for (var i = 0; i < this.skills.length; i++) {
			if (skillsData[i] == null) {continue;}
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

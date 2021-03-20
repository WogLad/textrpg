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
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
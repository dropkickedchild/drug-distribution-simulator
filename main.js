var Game = {
	Player: {
		Money: 1000,
		MoneyPerProduct: 0,
		ProductSoldPerSecond: 0,
		MoneyMultiplier: 1,
		DistributeID: 0,
		DrugID: 0,
	},

	Drugs: {
		Weed: {
			ID: 1,
			UnlockCost: 0,
			CostPer: 5,
			Unlocked: false,
		},
	},

	Locations: {
		SchoolBathroom: {
			ID: 1,
			UnlockCost: 0,
			PriceMultiplier: 0.15,
			Unlocked: false,
		},
	},

	Workers: {
		Jesse: {
			UnlockCost: 500,
			ProductSoldPerSecond: 2,
			Unlocked: false,
		},
	},

	Upgrades: {
		WalterWhitePower: {
			UnlockCost: 1000,
			AddPriceMultiplier: 0.5,
			AddSpeedMultiplier: 0,
			Unlocked: false,
		},
	},
};

const moneyStat = document.getElementById("money_count");
const MPSStat = document.getElementById("MPS_count");

function update() {
	moneyStat.innerHTML = Game.Player.Money;
	MPSStat.innerHTML =
		Game.Player.MoneyPerProduct *
		Game.Player.MoneyMultiplier *
		Game.Player.ProductSoldPerSecond;
}

function purchaseDrug(drugName, button) {
	const drugObject = Game.Drugs[drugName];

	// Drug already unlocked
	if (drugObject.Unlocked === true) {
		alert("you already own this");
		return;
	}

	// Check if buying a level lower than current
	if (Game.Player.DrugID > drugObject.ID) {
		alert("you already own a product");
		return;
	}

	// Player has enough money
	if (drugObject.UnlockCost <= Game.Player.Money) {
		drugObject.Unlocked = true;
		Game.Player.Money -= drugObject.UnlockCost;
		Game.Player.MoneyPerProduct = drugObject.CostPer;
		Game.Player.DrugID = drugObject.ID;

		button.parentNode.removeChild(button);

		update();
	} else {
		alert("you arent rich enough");
		return;
	}
}

function purchaseDistributeLocation(distributeLocName, button) {
	const distributeLocObject = Game.Locations[distributeLocName];

	// Distribute location already unlocked
	if (distributeLocObject.Unlocked === true) {
		alert("you already own this");
		return;
	}

	// Check if buying a level lower than current
	if (Game.Player.DistributeID > distributeLocObject.ID) {
		alert("you already own a better distribute location");
		return;
	}

	// Player has enough money
	if (distributeLocObject.UnlockCost <= Game.Player.Money) {
		distributeLocObject.Unlocked = true;
		Game.Player.Money -= distributeLocObject.UnlockCost;
		Game.Player.DistributeID = distributeLocObject.ID;
		Game.Player.MoneyMultiplier += distributeLocObject.PriceMultiplier;

		button.parentNode.removeChild(button);

		update();
	} else {
		alert("you arent rich enough");
		return;
	}
}

function purchaseWorker(workerName, button) {
	const workerObject = Game.Workers[workerName];

	// Worker already unlocked
	if (workerObject.Unlocked === true) {
		alert("you already own them");
		return;
	}

	// Player has enough money
	if (workerObject.UnlockCost <= Game.Player.Money) {
		workerObject.Unlocked = true;
		Game.Player.Money -= workerObject.UnlockCost;
		Game.Player.ProductSoldPerSecond += workerObject.ProductSoldPerSecond;

		button.parentNode.removeChild(button);

		update();
	} else {
		alert("you arent rich enough");
		return;
	}
}

function purchaseUpgrade(upgradeName, button) {
	const upgradeObject = Game.Upgrades[upgradeName];

	// Upgrade already unlocked
	if (upgradeObject.Unlocked === true) {
		alert("you already own this");
		return;
	}

	// Player has enough money
	if (upgradeObject.UnlockCost <= Game.Player.Money) {
		upgradeObject.Unlocked = true;
		Game.Player.Money -= upgradeObject.UnlockCost;
		Game.Player.MoneyMultiplier += upgradeObject.AddPriceMultiplier;
		Game.Player.SpeedMultiplier += upgradeObject.AddSpeedMultiplier;

		button.parentNode.removeChild(button);

		update();
	} else {
		alert("you arent rich enough");
		return;
	}
}

function distributeDrug() {
	Game.Player.Money +=
		Game.Player.MoneyPerProduct * Game.Player.MoneyMultiplier;

	update();
}

function gameLoop() {
	Game.Player.Money +=
		Game.Player.MoneyPerProduct *
		Game.Player.MoneyMultiplier *
		Game.Player.ProductSoldPerSecond;
	update();
	setTimeout(gameLoop, 1000);
}

update();
gameLoop();

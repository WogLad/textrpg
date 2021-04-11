function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function removeFromArray(arr, value) { 
    arr.splice(arr.indexOf(value), 1);
	return arr;
}

function addToGameLogs(message) {
	document.getElementById("gameLogs").innerHTML = message + "<br>" + document.getElementById("gameLogs").innerHTML;
}

var player = new Player("Player");

function loadSaveDataFromLocalStorage() {
	if (localStorage.getItem("saveData") != null) {
		player.loadSaveData(localStorage.getItem("saveData"));
		localStorage.setItem("saveData", JSON.stringify(player));
	}
}

loadSaveDataFromLocalStorage();

setInterval(() => {
	localStorage.setItem("saveData", JSON.stringify(player));
}, 1000);

//#region POPUP MODALS

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById("overlay");

openModalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const modal = document.querySelector(button.dataset.modalTarget);
		openModal(modal);
	});
});

overlay.addEventListener('click', () => {
	const modals = document.querySelectorAll('.modal.active');
	modals.forEach(modal => {
		closeModal(modal);
	});
});

closeModalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const modal = button.closest('.modal');
		closeModal(modal);
	});
});

function openModal(modal) {
	if (modal == null) {return;}
	modal.classList.add('active');
	overlay.classList.add('active');
}

function closeModal(modal) {
	if (modal == null) {return;}
	modal.classList.remove('active');
	overlay.classList.remove('active');
}

setTimeout(() => {
	var es = document.getElementsByClassName("modal");
	for (var i = 0; i < es.length; i++) {
		const element = es[i];
		element.style.display = "block";
	}
}, 100);

//#endregion

//#region SETUP CRAFTING MENU OPTIONS DYNAMICALLY
var selectMenu = document.getElementById("items-to-craft-select-menu");
selectMenu.innerHTML = "";
Object.keys(craftingRecipesDb).forEach(recipeId => {
	selectMenu.innerHTML += ('<option value="' + recipeId + '">' + itemDb[recipeId].name + '</option>');
});
//#endregion
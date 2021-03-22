function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
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
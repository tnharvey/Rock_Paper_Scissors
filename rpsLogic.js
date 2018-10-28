// game() runs on click to one of the three choice buttons.

let isWinner = 0;
let round = 1;
let roundWinner = "";
let playerChoice = "";
let computerChoice = "";
let pNumInput = 0;
let cNumInput = 0;
let playerWins = 0;
let computerWins = 0;
let gameState = "initial";
let matchWinner = "";

function game(e) {

	if (gameState === "final") {
		initializeVars();
	}

	gameState = "inprogress";
	playerChoice = e.target.id;
	pNumInput = choiceToNum(playerChoice);

	determineWinner();
	setRoundResults();
	setRoundAvatars();
	setPlayerChoices();

	if (isWinner) {
		setMatchResults();
	}

	round += 1;
}

function initializeVars () {
	isWinner = 0;
	round = 1;
	roundWinner = "";
	playerChoice = "";
	computerChoice = "";
	pNumInput = 0;
	cNumInput = 0;
	playerWins = 0;
	computerWins = 0;
	gameState = "initial";
	matchWinner = "";

	clearPriorRoundWinner();
	clearClasses("playerChoice","choiceDisplay");
	clearClasses("computerChoice","choiceDisplay");
	document.getElementById("playerAvatar").classList.remove("matchWinner");
	document.getElementById("computerAvatar").classList.remove("matchWinner");

	document.getElementById("round").innerHTML = round;
	document.getElementById("currentPlayerScore").innerHTML = playerWins;
	document.getElementById("currentComputerScore").innerHTML = computerWins;

	setAvatar("player","pigeon");
	setAvatar("computer","happy");
}

function determineWinner (){
	computerPlay();
	let choices = pNumInput+cNumInput;
	if (pNumInput===cNumInput){
		roundWinner = "tie";
	}
	else if (choices === 3){
		if (pNumInput===2) {
				roundWinner = "player";
				playerWins += 1;
			}
		else {
				roundWinner = "computer";
				computerWins += 1;
			}
	}
	else if (choices == 4){
		if (pNumInput==1) {
				roundWinner = "player";
				playerWins += 1;
			}
		else {
				roundWinner = "computer";
				computerWins += 1;
			}
	}
	else if (choices === 5){
		if (pNumInput === 3) {
				roundWinner = "player";
				playerWins += 1;
			}
		else {
				roundWinner = "computer";
				computerWins += 1;
			}
	}
	else {
		alert ("An error has occurred in determineWinner.");
	}

	if ((playerWins >= 5)||(computerWins >= 5)) {
		if (playerWins >= 5) {
			// player wins
			isWinner = 1;
			matchWinner = "player";
		}
		else if (computerWins >= 5) {
			//computer wins
			isWinner = 1;
			matchWinner = "computer";
		}
	}
}

function computerPlay() {
	// uses random number to generate computer choice 1, 2, or 3 and stores both number and text choice
	cNumInput = Math.floor(Math.random() * 3)+1;
	if (cNumInput === 0) {
		cNumInput = 1;
	}
	computerChoice = numToChoice(cNumInput);
}

function setRoundResults () {
	clearPriorRoundWinner();
	document.getElementById("round").innerHTML = round;

	document.getElementById("currentPlayerScore").innerHTML = playerWins;
	document.getElementById("currentComputerScore").innerHTML = computerWins;

	if (roundWinner === "player") {
		clearPriorRoundWinner();
		document.getElementById("playerChoice").classList.add("roundWinner");
	}
	else if (roundWinner === "computer"){
		clearPriorRoundWinner();
		document.getElementById("computerChoice").classList.add("roundWinner");
	}
	else if (roundWinner === "tie") {
		clearPriorRoundWinner();
		document.getElementById("playerChoice").classList.add("roundWinner");
		document.getElementById("computerChoice").classList.add("roundWinner");
	}
	else {
		alert ("There has been an error! setRoundResults has received an other than acceptible value.");
	}
}

function setRoundAvatars () {
	if (roundWinner === "tie") {
		setAvatar("player","thinking");
		setAvatar("computer","annoyed");
	}
	else if (((computerWins - playerWins) < 2) || ((playerWins - computerWins) < 2)) {
		setAvatar("player","pigeon");
		setAvatar("computer","happy");
	}
	else if ((computerWins - playerWins) > 2) {
		setAvatar("player","child");
		setAvatar("computer","laughing");
	}
	else if ((playerWins - computerWins) > 2){
		setAvatar("player","vanna");
		setAvatar("computer","angry");
	}
}

function setPlayerChoices () {
	clearClasses("playerChoice","choiceDisplay");
	clearClasses("computerChoice","choiceDisplay");
	document.getElementById("playerChoice").classList.add(playerChoice+"-choice");
	document.getElementById("computerChoice").classList.add(computerChoice+"-choice");
}

function setMatchResults (){
	clearPriorRoundWinner();
	document.getElementById("finalPlayerScore").innerHTML = playerWins;
	document.getElementById("finalComputerScore").innerHTML = computerWins;

	if(matchWinner === "player") {
		setAvatar("player","mona");
		setAvatar("computer","crying");

		clearPriorRoundWinner();
		document.getElementById("playerAvatar").classList.add("matchWinner");
		document.getElementById("winnerHeader").innerHTML = "You";

		document.getElementById("finalStateContainer").classList.remove("hidden");
		togglePlayButtons();
		gameState = "final";
	}

	else if (matchWinner === "computer") {
		setAvatar("player","awful");
		setAvatar("computer","laughing");

		clearPriorRoundWinner();
		document.getElementById("computerAvatar").classList.add("matchWinner");
		document.getElementById("winnerHeader").innerHTML = "the Computer";

		document.getElementById("finalStateContainer").classList.remove("hidden");
		togglePlayButtons();
		gameState = "final";
	}
	else {
		alert ("An error has occurred during SetMatchResults.");
	}
}

function setAvatar(player,classChoice) {
	if (player === "player") {
		clearClasses("playerAvatar","player");
		document.getElementById("playerAvatar").classList.add(classChoice);
	}
	else if (player === "computer") {
		clearClasses("computerAvatar","computer");
		document.getElementById("computerAvatar").classList.add(classChoice);
	}
}

function clearPriorRoundWinner () {
	document.getElementById("playerChoice").classList.remove("roundWinner");
	document.getElementById("computerChoice").classList.remove("roundWinner");
}

function clearClasses (elementID, classType) {
	let targElem = document.getElementById(elementID);
	let playerClassArray = ["vanna","angry","awful","mona","thinking","child","pigeon"];
	let computerClassArray = ["happy","angry","annoyed","crying","laughing","surprised"];
	let choiceClassArray = ["rock","paper","scissors"];
	let choiceDisplayClassArray = ["rock-choice","paper-choice","scissors-choice"];
	let i = 0;

	if (classType === "player") {
		while (i <= (playerClassArray.length)){
			if (targElem.classList.contains(playerClassArray[i])){
				targElem.classList.remove(playerClassArray[i]);
			}
			i++;
		}
	}
	else if (classType === "computer") {
		while (i <= (computerClassArray.length)){
			if (targElem.classList.contains(computerClassArray[i])){
				targElem.classList.remove(computerClassArray[i]);
			}
			i++;
		}
	}
	else if (classType === "choice") {
		while (i <= (choiceClassArray.length)){
			if (targElem.classList.contains(choiceClassArray[i])){
				targElem.classList.remove(choiceClassArray[i]);
			}
			i++;
		}
	}
	else if (classType === "choiceDisplay") {
		while (i <= (choiceDisplayClassArray.length)){
			if (targElem.classList.contains(choiceDisplayClassArray[i])){
				targElem.classList.remove(choiceDisplayClassArray[i]);
			}
			i++;
		}
	}
}

function choiceToNum (choice = "invalid") {
	// converts text choice into integer of 1, 2, or 3
	let choiceNum = 0;

	if (choice.trim() === "rock")
		{
			choiceNum = 1;
		}
	else if (choice.trim() === "paper")
		{
			choiceNum = 2;
		}
	else if (choice.trim() === "scissors")
		{
			choiceNum = 3;
		}
	else
		{
			return;
		}

	return choiceNum;
}

function numToChoice(choiceNum)	{
		// takes integer and converts it to a text version of the choice
		let choice = "";
		if (choiceNum === 1)
			{
				choice = "rock";
			}
		else if (choiceNum === 2)
			{
				choice = "paper";
			}
		else if (choiceNum === 3)
			{
				choice = "scissors";
			}
		return choice;
	}

function togglePlayButtons () {
	document.getElementById("rock").classList.toggle("disabled");
	document.getElementById("paper").classList.toggle("disabled");
	document.getElementById("scissors").classList.toggle("disabled");
}

function togglePopup (elementID) {
	// toggles the given elementID class to "hidden"
	let elementToToggle = document.getElementById(elementID);
	elementToToggle.classList.toggle("hidden");
}

document.getElementById("rock").addEventListener("click",game);
document.getElementById("paper").addEventListener("click",game);
document.getElementById("scissors").addEventListener("click",game);
document.getElementById("restart").addEventListener("click",(e) => {
	togglePopup("finalStateContainer");
	initializeVars();
	togglePlayButtons();
	});
document.getElementById("start").addEventListener("click",(e) => {
	togglePopup("initialStateContainer");
	togglePlayButtons();
	});

let player = {
  name: "",
  chips: 50,
};

let cards = [];
let sum = 0;

let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let newCardEl = document.getElementById("newCard-el");
let startEl = document.getElementById("start-el");
let detailsEl = document.getElementById("details-el");
let transacEl = document.getElementById("transac-el");
// let sumEl = document.querySelector("#sum-el");

let playerEl = document.getElementById("player-el");
updateFinances();
newCardEl.style.display = "none";
cardsEl.style.display = "none";
sumEl.style.display = "none";
playerEl.style.display = "none";
startEl.style.display = "none";

function updateFinances() {
  if (player.chips < 1) {
    playerEl.textContent = player.name + ": " + "-$" + player.chips * -1;
  } else {
    playerEl.textContent = player.name + ": " + "$" + player.chips;
  }
}

function submitName() {
  player.name = document.getElementById("input-el").value;
  updateFinances();
  playerEl.style.display = "block";
  startEl.style.display = "inline-block";
  detailsEl.style.display = "none";
}

function startGame() {
  isAlive = true;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;

  submitName();

  newCardEl.style.display = "inline-block";
  cardsEl.style.display = "block";
  sumEl.style.display = "block";
  renderGame();
}

function getRandomCard() {
  let randomNum = Math.ceil(Math.random() * 13);
  if (randomNum === 1) {
    return 11;
  } else if (randomNum > 10) {
    return 1;
  } else {
    return randomNum;
  }
}

function renderGame() {
  startEl.style.display = "none";
  hasBlackJack = false;

  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    hasBlackJack = true;
    player.chips += 10;
    transacEl.textContent = "Won $" + 10;
    updateFinances();
    message = "Wohoo! You've got Blackjack!";
    newCardEl.style.display = "none";
    startEl.style.display = "inline-block";
  } else {
    isAlive = false;
    player.chips -= 10;
    transacEl.textContent = "Lost $" + 10;
    updateFinances();
    newCardEl.style.display = "none";
    startEl.style.display = "inline-block";
    message = "You're out of the game!";
  }

  messageEl.textContent = message;
  sumEl.textContent = "Sum: " + sum;
  cardsEl.textContent = "Cards: ";

  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }
}

function newCard() {
  startEl.style.display = "none";
  if (isAlive && !hasBlackJack) {
    let thirdCard = getRandomCard();
    sum += thirdCard;
    cards.push(thirdCard);
    renderGame();
  }
}

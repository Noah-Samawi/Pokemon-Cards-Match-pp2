
var errors = 0;
var cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
]

var cardSet;
var board = [];
var rows = 4;
var columns =5;
var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {

    cardSet = cardList.concat(cardList); //Git the two of each card
    console.log(cardSet);
    //shuffle card
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //get the random index
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}
     
function startGame() {

}

function hideCards() {

}

function selectCard() {

}


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
    // Loop through each row (r) and column (c) in the game grid
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // Generate the ID of the card based on its row and column, and retrieve the corresponding element
            let card = document.getElementById(r.toString() + "-" + c.toString());

            // Set the source (image) of the card to "back.jpg" to hide or reset its state
            card.src = "back.jpg";
        }
    }
}


function selectCard() {
    // Check if the source (image URL) of the clicked card includes the string "back"
    if (this.src.includes("back")) {
        // If card1 is not selected, assign the clicked card to card1Selected
        if (!card1Selected) {
            card1Selected = this;

            // Extract row and column coordinates from the card's ID
            let coords = card1Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            // Set the source of the selected card to a specific image based on its position on the game board
            card1Selected.src = board[r][c] + ".jpg";
        }
        // If card2 is not selected and the clicked card is different from card1
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            // Extract row and column coordinates from the card's ID
            let coords = card2Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            // Set the source of the selected card to a specific image based on its position on the game board
            card2Selected.src = board[r][c] + ".jpg";

            // After a brief delay (1000 milliseconds or 1 second), call the "update" function
            setTimeout(update, 1000);
        }
    }
}


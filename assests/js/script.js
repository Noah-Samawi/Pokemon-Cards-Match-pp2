 // Start timer
let timer = 60; // Initial time set to 60 seconds
document.getElementById("timer").innerText = timer; // Display initial time in an HTML element

// Set up a countdown timer that updates every second
let countdown = setInterval(function() {
    timer--; // Decrease the timer by 1 second
    document.getElementById("timer").innerText = timer; // Update the displayed timer value

    // Check if the timer has reached or fallen below 0
    if (timer <= 0) {
        clearInterval(countdown); // Stop the countdown timer
        alert("Game Over"); // Display a "Game Over" alert
    }

    // Check if two cards have been selected
    if (card1Selected && card2Selected) {
        errors += 1; // Increment the errors counter
        document.getElementById("errors").innerText = errors; // Update the displayed error count

        // Flip both selected cards back to their initial state
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";

        // Reset the references to the selected cards
        card1Selected = null;
        card2Selected = null;
    }
}, 1000); // Set the interval to 1000 milliseconds (1 second)


 
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
    // Duplicate the cardList to create a set of cards by concatenating it with itself
    cardSet = cardList.concat(cardList);
    console.log(cardSet);

    // Shuffle the cards using the Fisher-Yates (Knuth) algorithm
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); // Generate a random index

        // Swap the positions of the cards at indices i and j
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }

    console.log(cardSet);
}

     
function startGame() {
    // Arrange the board in a 4x5 grid (presumably determined by 'rows' and 'columns' variables)
    for (let r = 0; r < rows; r++) {
        let row = [];

        // For each column in the row
        for (let c = 0; c < columns; c++) {
            // Pop a card from the shuffled cardSet array
            let cardImg = cardSet.pop();
            row.push(cardImg);

            // Create an <img> element for the card
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".jpg";
            card.classList.add("card");

            // Attach a click event listener to the card, calling the 'selectCard' function
            card.addEventListener("click", selectCard);

            // Append the card element to the HTML element with the id "board"
            document.getElementById("board").append(card);
        }

        // Add the row to the 'board' array
        board.push(row);
    }

    // Log the initial state of the board to the console
    console.log(board);

    // After a delay of 1000 milliseconds (1 second), hide the cards
    setTimeout(hideCards, 1000);
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

function update() {
    // If the selected cards have different images, flip both cards back
    if (card1Selected.src != card2Selected.src) {
        // Set the source of both selected cards to "back.jpg"
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";

        // Increment the 'errors' counter and update the corresponding HTML element
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }

    // Reset the references to the selected cards
    card1Selected = null;
    card2Selected = null;
}

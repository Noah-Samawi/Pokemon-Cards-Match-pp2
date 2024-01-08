let instructions = document.getElementById("instructions-area");
let timerElement = document.getElementById('timer'); // Add this line
let welcomeArea = document.getElementById('welcome-area'); // Add this line
let timer = 0;
let timerInterval;

// When the DOM finishes loading, get the buttons and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
    // Show the Rules section
    let instructionsBtn = document.getElementById('instructions-btn');
    instructionsBtn.addEventListener('click', function () {
        instructions.classList.remove('hide');
        welcomeArea.classList.add('hide');
    });
});  
     

// Initialize variables to keep track of errors and matches
var errors = 0;
let matches = 0;

// List of card types
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
];

// Declare variables to be used in the game
var cardSet;
var board = [];
var rows = 4;
var columns = 5;
var card1Selected;
var card2Selected;

// Execute the shuffleCards function when the window has finished loading
window.onload = function () {
    shuffleCards();
};


// Function to start the timer using setInterval
function startTimer() {
    // Set an interval to execute the provided function every 1000 milliseconds (1 second)
    timerInterval = setInterval(() => {
        // Increment the timer variable representing elapsed seconds
        timer++;

        // Calculate minutes and seconds from the total elapsed time
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        // Update the content of the 'timer' element to display the formatted time
        document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

/**
 * in the shuffleCards cardList in the current game using the Fischer Yates Shuffle 
 * redit to this tutorial which I adapted for my own game: 
 * https://www.youtube.com/watch?v=hGRzVoaXqJI
 */
function shuffleCards() {
    // Duplicate the cardList to create a set of cards by concatenating it with itself
    cardSet = cardList.concat(cardList);
    //console.log(cardSet);

    // Shuffle the cards using the Fisher-Yates (Knuth) algorithm
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); // Generate a random index

        // Swap the positions of the cards at indices i and j
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }

    //console.log(cardSet);
}

     
function startGame() {
    // Start the timer
    startTimer();
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


    // After a delay of 1000 milliseconds (1 second), hide the cards
    setTimeout(hideCards, 1000);
    document.getElementById('scene-background').classList.add('no-background');
    document.getElementById('board-wrapper').classList.remove('hide');
    document.getElementById('welcome-area').classList.add('hide');
}

// Function to restart the game
function reStartGame() {
    // Reset error and match counters to zero
    errors = 0;
    matches = 0;

    // Clear the content of the 'board' element
    document.getElementById("board").innerHTML = '';

    // Reset the error display to zero
    document.getElementById('errors').innerText = 0;

    // Stop the timer
    stopTimer();

    // Shuffle the cards for a new game
    shuffleCards();

    // Start a new game
    startGame();
}

// Function to hide the cards
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

// Function to select the cards
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
            setTimeout(checkGameWon, 1000);
        }
    }
}

// Function to update the game state based on selected cards
function update() {
    // If the selected cards have different images, flip both cards back
    if (card1Selected.src !== card2Selected.src) {
        // Set the source of both selected cards to "back.jpg"
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";

        // Increment the 'errors' counter and update the corresponding HTML element
        errors += 1;
        document.getElementById("errors").innerText = errors;
    } else {
        // If the selected cards have the same image, increment the 'matches' counter
        matches += 1;
    }

    // Reset the references to the selected cards
    card1Selected = null;
    card2Selected = null;
}


// Add the following function to check if the game is won
function checkGameWon() {
    if (matches == 10){
        clearInterval(timerInterval);
        showModal();
    }
}

// Function to stop the timer
function stopTimer() {
    // Clear the interval previously set by setInterval
    clearInterval(timerInterval);

    // Reset the timer variable to zero
    timer = 0;

    // Set the timerInterval variable to null to indicate that the timer is stopped
    timerInterval = null;
}

/**
 * Function to display a modal with game results
 * Credit to this tutorial which I adapted for game: 
 * https://www.youtube.com/watch?v=hGRzVoaXqJI
 */
function showModal() {
    // Stop the timer when the game is over
    stopTimer();

    // Get the timer result text
    const timerText = document.getElementById('timer').textContent;

    // Create a custom dialog box element
    const modal = document.createElement('div');
    modal.className = 'dialog';

    // Add the timer result text to the dialog box
    const modalText = document.createElement('p');
    modalText.innerHTML = `<h3> Game Over </h3> <br> <h6>Timer result: ${timerText} </h6> <br> <h6>Incorrect attempts: ${errors} </h6>`;
    modal.appendChild(modalText);

    // Add a button to close the dialog box and restart the game
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Play Again';
    closeButton.onclick = () => {
        // Remove the modal from the document body
        document.body.removeChild(modal);

        // Restart the game
        reStartGame();
    };
    modal.appendChild(closeButton);

    // Add the dialog box to the body of the document
    document.body.appendChild(modal);
}



// Add event listener to the element with id 'resetBtn' to restart the game when clicked
document.getElementById('resetBtn').addEventListener('click', reStartGame);

// Add event listener to the element with id 'play-btn' to start the game when clicked
document.getElementById('play-btn').addEventListener('click', startGame);

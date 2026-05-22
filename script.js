const ROWS = 6;
const COLS = 5;

let currentRow = 0;
let currentCol = 0;

let gameState = "playing";

let board = Array.from({length:ROWS}, ()=>Array(COLS).fill(""));
// Create an array of length = ROWS, and fill it with empty subarrays of length = COLS
// Wordle gameState

document.querySelectorAll(".key").forEach( key => {
    key.addEventListener("click", ()=> handleKey(key.innerText));
});

document.addEventListener("keydown", event => handleKey(event.key));

function handleKey(key) {
    if (gameState !== "playing") return;

    if (key === "Enter") submitGuess();
    else if (key === "Backspace" || key === "⌫") deleteLetter();
    else if (/^[a-zA-Z]$/.test(key)) addLetter(key.toUpperCase());
}

function addLetter(letter) {
    if (currentCol < COLS) {
        board[currentRow][currentCol] = letter;
        const tile = document.querySelector(`.tile[data-row="${currentRow}"][data-col="${currentCol}"]`);
        tile.innerText = letter;
        currentCol++;
    }
    /* else {
        currentRow++;
        currentCol=0;
        addLetter(letter);
    } */
}

function deleteLetter() {
    if (currentCol > 0) {
        currentCol--;
        board[currentRow][currentCol] = "";

        const tile = document.querySelector(`.tile[data-row="${currentRow}"][data-col="${currentCol}"]`);
        tile.innerText = "";
    }
}

async function submitGuess() {
    if (currentCol != COLS) return; // Don't allow guesses before a complete word

    const guess = board[currentRow].join("").toLowerCase();

    const response = await fetch("http://localhost:8000/guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guess })
    });

    const data = await response.json();
    let result = data.result;
    if (result.error) { // To prevent invalid words
        alert(result.error);
        return;
    }

    result = Object.values(result).map(c => c.toLowerCase())
    // console.log(result); // Testing
    paintRow(result);
    if (
        result[0] === "green" &&
        result[1] === "green" &&
        result[2] === "green" &&
        result[3] === "green" &&
        result[4] === "green"
    ) {
        gameState = "won";
        alert("You won!");
    }

    currentRow++;
    if (currentRow === ROWS && gameState === "playing") {
        gameState = "lost";
        alert(`Game Over! The secret was ${data.secret}`);
    }
    currentCol = 0;
}

function paintRow(colours) {
    colours.forEach((colour, col) => {
        const tile = document.querySelector(`.tile[data-row="${currentRow}"][data-col="${col}"]`);
        tile.classList.add(colour);
    });
}
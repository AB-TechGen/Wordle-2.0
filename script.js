const ROWS = 6;
const COLS = 5;

let currentRow = 0;
let currentCol = 0;

let board = Array.from({length:ROWS}, ()=>Array(COLS).fill(""));
// Create an array of length = ROWS, and fill it with empty subarrays of length = COLS
// Wordle gameState

document.querySelectorAll(".key").forEach( key => {
    key.addEventListener("click", ()=> handleKey(key.innerText));
});

function handleKey(key) {
    if (key === "Enter") submitGuess();
    else if (key === "⌫") deleteLetter();
    else addLetter(key);
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
    if (currentCol != COLS) return;
    const guess = board[currentRow].join("").toLowerCase();

    const response = await fetch("http://localhost:8000/guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guess })
    });

    const result = await response.json();

    paintRow(Object.values(result).map(c => c.toLowerCase()));
    currentRow++;
    currentCol = 0;
}

function paintRow(colours) {
    colours.forEach((colour, col) => {
        const tile = document.querySelector(`.tile[data-row="${currentRow}"][data-col="${col}"]`);
        tile.classList.add(colour);
    });
}
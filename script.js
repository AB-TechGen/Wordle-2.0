const ROWS = 6;
const COLS = 5;

let currentRow = 0;
let currentCol = 0;

let gameState = "playing";
let animationsEnabled = true;

let board = Array.from({length:ROWS}, ()=>Array(COLS).fill(""));
// Create an array of length = ROWS, and fill it with empty subarrays of length = COLS

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
        if (animationsEnabled) {
            tile.classList.add("pop");
            // Pop animation for typing letters
            tile.addEventListener("animationend", () => {
                tile.classList.remove("pop");
            }, {once:true});
        }
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
    if (currentCol !== COLS) return; // Don't allow guesses before a complete word

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
        if (animationsEnabled) {
        const row = document.querySelectorAll(".row")[currentRow];
        row.classList.add("shake");
        row.addEventListener("animationend", () => {
            row.classList.remove("shake");
        }, {once:true});
        }
        return;
    }

    result = Object.values(result).map(c => c.toLowerCase())
    // console.log(result); // Testing
    paintRow(result);
    paintKeyboard(guess, result);
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

        if (!animationsEnabled) tile.classList.add(colour);
        else { setTimeout(() => { 
            tile.classList.add("flip");
            tile.addEventListener("animationstart", () => {
                tile.classList.add(colour);
            }, { once: true });
        }, col * 300);
        }
    });
}

function paintKeyboard(guess, colours) {
    for (let i=0; i<guess.length; i++) {
        const letter = guess[i].toUpperCase();
        const colour = colours[i];
        const key = document.querySelector(`.key[data-key="${letter}"]`);

        if (key.classList.contains("green")) continue;
        if (colour === "gray" && key.classList.contains("orange")) continue;
        if (colour === "green" && key.classList.contains("orange")) key.classList.remove("orange");
        if ((colour === "green" || colour === "orange") && key.classList.contains("gray")) key.classList.remove("gray");

        key.classList.add(colour);
    }
}

// Help Modal
const helpModal = document.querySelector("#help-modal")
const helpButton = document.querySelector("#help-button");
helpButton.addEventListener("click", () => helpModal.classList.remove("hidden"));
const closeHelp = document.querySelector("#close-help");
closeHelp.addEventListener("click", () => helpModal.classList.add("hidden"));

// Hint Modal
const hintModal = document.querySelector("#hint-modal");
const hintButton = document.querySelector("#hint-button");
let hintData = null;
hintButton.addEventListener("click", async () => {
    hintModal.classList.remove("hidden");
    
    if (!hintData) { // to provide consistency of hint
        const response = await fetch("http://localhost:8000/hint");
        hintData = await response.json();
    }
});
const closeHint = document.querySelector("#close-hint");
closeHint.addEventListener("click", () => hintModal.classList.add("hidden"));

const vowelBtn = document.querySelector("#vowel-btn");
const vowelDisplay = document.querySelector("#vowel-display");
vowelBtn.addEventListener("click", () => vowelDisplay.innerText = hintData.vow_hint.toUpperCase());
const consonantBtn = document.querySelector("#consonant-btn");
const consonantDisplay = document.querySelector("#consonant-display");
consonantBtn.addEventListener("click", () => consonantDisplay.innerText = hintData.cons_hint.toUpperCase());

// Settings Modal
const settingsModal = document.querySelector("#settings-modal");
const settingsButton = document.querySelector("#settings-button");
const closeSettings = document.querySelector("#close-settings");

settingsButton.addEventListener("click", () => settingsModal.classList.remove("hidden"));
closeSettings.addEventListener("click", () => settingsModal.classList.add("hidden"));

const animationToggle = document.querySelector("#animation-toggle");
animationToggle.addEventListener("change", () => animationsEnabled = animationToggle.checked);
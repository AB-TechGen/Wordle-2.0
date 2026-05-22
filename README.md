# Wordle 2.0
Recreation of Wordle but this time with 
1. HTML+CSS+JS (Frontend)
2. along with my old Python logic

## How to play?
Guess the 5-letter word within 6 tries.  
The colour of the tiles & keyboard will show you - how far your guess was from the secret!

## Gameplay
1. Random secret word generation
2. Validation for guesses
3. Playing/Win/Loss gameStates
4. Secret word reveal on loss
5. Physical keyboard support
6. On-screen keyboard support
7. Delete and enter functionality

## UI & UX
1. Tile colouring system
2. Keyboard colour indicators
3. Animations - Pop animation for typing, Flip animation for submitting guesses, Shake animation for invalid guesses
4. Help modal explaining gameplay
5. Hint modal with controlled information reveal
6. Settings modal - Animations toggle setting

---

## Frontend Concepts Used
- DOM manipulation
- Event-driven architecture
- Centralized input handling
- Stateful rendering
- Conditional styling
- UI synchronization across multiple components
- Reusable modal architecture
- Component reuse and semantic separation

---

## Backend Concepts Used
- FastAPI routes and API handling
- Frontend ↔ backend communication
- Async fetch requests
- JSON data exchange
- Backend game logic separation
- Validation flow handling

---

# Tech Stack

- HTML, CSS
- JavaScript
- FastAPI
- Python

---

## How to Run

1. Clone the repository  
```
git clone https://github.com/AB-TechGen/Wordle-2.0.git
cd Wordle-2.0
```

2. Install dependencies  
`pip install fastapi uvicorn`

3. Run the backend server  
`uvicorn backend:app --reload`  
Backend runs at `http://localhost:8000`

4. Open the frontend - Open index.html in your browser

---

# Author
Aarush Balaji

## License
This project is for personal learning experiences





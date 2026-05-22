from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from game import guesser
from word_gen import choose_secretword, words

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

secretword = choose_secretword()

@app.post("/guess")
def check_guess(data: dict):
    guess = data["guess"]
    result = guesser(guess, secretword)
    return result
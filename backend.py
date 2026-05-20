from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from game import guesser

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

secretword = 'ozone'

@app.post("/guess")
def check_guess(data: dict):
    guess = data["guess"]
    result = guesser(guess, secretword)
    return result
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from game import guesser
from word_gen import secret
from hints import hint

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/guess") # post: when frontend sends something to backend
def check_guess(data: dict):
    guess = data["guess"]
    result = guesser(guess)
    return {
        "result":result,
        "secret":secret
    }

@app.get("/hint") # get: when frontend requests something from backend
def get_hint():
    return hint


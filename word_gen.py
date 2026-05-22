import random

file = open("14855_valid_words.txt")
words = [word.strip() for word in file.readlines()]

def choose_secretword():
    secret = random.choice(words)
    # print(secret) # Testing
    return secret
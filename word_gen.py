import random

with open("14855_valid_words.txt") as file:
    words = set(word.strip() for word in file.readlines())

secret = random.choice(list(words))
# print(secret) # Testing
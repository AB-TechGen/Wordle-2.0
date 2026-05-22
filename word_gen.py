import random

with open("14855_valid_words.txt") as file:
    words = set(word.strip() for word in file.readlines())

with open("possible_answers_list.txt") as file:
    possible_answers = set(word.strip() for word in file.readlines())

secret = random.choice(list(possible_answers))
# print(secret) # Testing
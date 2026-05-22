from word_gen import secret
import random

vowels = []
consonants = []

for letter in secret:
    if letter in "aeiou":
        vowels.append(letter)
    else:
        consonants.append(letter)

vowel_hint = random.choice(vowels)
consonant_hint = random.choice(consonants)
hint = {
    "vow_hint":vowel_hint,
    "cons_hint":consonant_hint
}

from word_gen import words, secret

def check_guess(guess):
    if guess not in words:
        return {"error": "Invalid word"}

def guesser(guess):
    validation = check_guess(guess)
    if validation:
        return validation
    
    secretcopy = secret
    guesscopy = guess

    guess_info = {}
    for i in range(5):
        guess_info[i] = None

    for i in range(5):
        char = guess[i]

        z = secretcopy.find(char)
        secretcopy = secretcopy.replace(char, "", 1)
        # print(secretcopy)

        if z == -1 and char != secret[i]:
           # print(f'{char} not in secret')
            guess_info[i] = 'Gray'

        elif z != -1:
            if char == secret[i]:
                guess_info[i] = 'Green'
            elif char != secret[i]:
                guess_info[i] = "Orange"

        elif z == -1 and char == secret[i]:     # for 2nd repetition of same letter
            guess_info[i] = 'Green'
            for letter in range(i):

                guess_char_appearance = guesscopy.find(char)
                guesscopy = guesscopy.replace(char, "/", 1)
                #print(guess_char_appearance)

                if guess_info[guess_char_appearance] == 'Orange':
                    guess_info[guess_char_appearance] = 'Gray'
                    break
                elif guess_info[guess_char_appearance] == 'Green':
                    continue
                elif guess_char_appearance == i:
                    break

    return guess_info


if __name__ == "__main__":
    print(guesser("crane", "ozone"))
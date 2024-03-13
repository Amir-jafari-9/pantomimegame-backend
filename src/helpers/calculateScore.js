module.exports = (wordPoint, restTime, cheat, change, guess) => {
    console.log(wordPoint, restTime, cheat, change, guess);
    if (guess) {
        return wordPoint + restTime - cheat - change;
    } else {
        return 0;
    }
};

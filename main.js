let randomNumber;
let trialsLeft = 10;
let currentLanguage = 'en';

const translations = {
    en: {
        title: "Guessing Game",
        startButton: "Start Game",
        instructions: "You have 10 trials to guess the number between 1 and 100.",
        submitGuess: "Submit Guess",
        trialsLeft: "Trials left: ",
        correctGuess: "Congratulations! You guessed the correct number!",
        gameOver: number => `Game Over! The correct number was ${number}.`,
        larger: "Your guess is larger than the correct number.",
        smaller: "Your guess is less than the correct number."
    },
    ar: {
        title: "لعبة التخمين",
        startButton: "ابدأ اللعبة",
        instructions: "لديك 10 محاولات لتخمين الرقم بين 1 و 100.",
        submitGuess: "أرسل التخمين",
        trialsLeft: "المحاولات المتبقية: ",
        correctGuess: "تهانينا! لقد خمنت الرقم الصحيح!",
        gameOver: number => `انتهت اللعبة! الرقم الصحيح كان ${number}.`,
        larger: "تخمينك أكبر من الرقم الصحيح.",
        smaller: "تخمينك أقل من الرقم الصحيح."
    }
};

function init() {
    document.querySelector('.startButton').addEventListener('click', startGame);
    document.querySelector('.submitGuess').addEventListener('click', submitGuess);
    document.querySelector('.languageSelect').addEventListener('change', changeLanguage);
    startGame();
}

function changeLanguage() {
    currentLanguage = document.querySelector('.languageSelect').value;
    translatePage();
}

function translatePage() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (key in translations[currentLanguage]) {
            element.textContent = typeof translations[currentLanguage][key] === 'function' ?
                translations[currentLanguage][key]() :
                translations[currentLanguage][key];
        }
    });
}

function startGame() {
    randomNumber = generateRandomNumber();
    trialsLeft = 10;
    hide('.gameArea', false);
    setText('.resultMessage', '');
    setText('.trialsLeft', translations[currentLanguage].trialsLeft + '10');
    setValue('.userGuess', '');
    disable('.userGuess', false);
    disable('.submitGuess', false);
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function hide(className, isHide) {
    document.querySelector(className).style.display = isHide ? 'none' : 'block';
}

function disable(className, isDisabled) {
    document.querySelector(className).disabled = isDisabled;
}

function setText(className, text) {
    document.querySelector(className).textContent = text;
}

function setValue(className, value) {
    document.querySelector(className).value = value;
}

function clearScreen() {
    setText('.resultMessage', '');
    setValue('.userGuess', '');
}

function submitGuess() {
    const userGuess = parseInt(document.querySelector('.userGuess').value);
    trialsLeft--;

    if (userGuess === randomNumber) {
        setText('.resultMessage', translations[currentLanguage].correctGuess);
        disable('.userGuess', true);
        disable('.submitGuess', true);
    } else if (trialsLeft === 0) {
        setText('.resultMessage', translations[currentLanguage].gameOver(randomNumber));
        disable('.userGuess', true);
        disable('.submitGuess', true);
    } else {
        if (userGuess > randomNumber) {
            setText('.resultMessage', translations[currentLanguage].larger);
        } else {
            setText('.resultMessage', translations[currentLanguage].smaller);
        }
    }

    setText('.trialsLeft', translations[currentLanguage].trialsLeft + trialsLeft);
}

window.onload = init;

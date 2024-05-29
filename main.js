let randomNumber;
let trialsLeft = 10;
let currentLanguage = 'en';
let translationData = {};
let translationsLoaded = false; // Flag to check if translations are loaded

function init() {
    document.querySelector('.startButton').addEventListener('click', startGame);
    document.querySelector('.submitGuess').addEventListener('click', submitGuess);
    document.querySelector('.languageSelect').addEventListener('change', changeLanguage);
    loadTranslationData(currentLanguage);
}

function loadTranslationData(language) {
    const script = document.createElement('script');
    script.src = `translationData${language.toUpperCase()}.js`;
    script.onload = () => {
        translationData = language === 'en' ? translationDataEn : translationDataAr;
        translationsLoaded = true; // Set flag to true when translations are loaded
        translatePage();
        startGame(); // Call startGame after translations are loaded
    };
    document.head.appendChild(script);
}

function changeLanguage() {
    currentLanguage = document.querySelector('.languageSelect').value;
    loadTranslationData(currentLanguage);
}

function translatePage() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = typeof translationData[key] === 'function' ? translationData[key]() : translationData[key];
    });
}

function T(key) {
    return typeof translationData[key] === 'function' ? translationData[key]() : translationData[key];
}

function startGame() {
    if (!translationsLoaded) return; // Ensure translations are loaded before starting the game

    randomNumber = generateRandomNumber();
    trialsLeft = 10;
    hide('.gameArea', false);
    setText('.resultMessage', '');
    setText('.trialsLeft', T('trialsLeft') + '10');
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
        setText('.resultMessage', T('correctGuess'));
        disable('.userGuess', true);
        disable('.submitGuess', true);
    } else if (trialsLeft === 0) {
        setText('.resultMessage', T('gameOver')(randomNumber));
        disable('.userGuess', true);
        disable('.submitGuess', true);
    } else {
        if (userGuess > randomNumber) {
            setText('.resultMessage', T('larger'));
        } else {
            setText('.resultMessage', T('smaller'));
        }
    }

    setText('.trialsLeft', T('trialsLeft') + trialsLeft);
}

window.onload = init;

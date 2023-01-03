// DOM Elements

const result = document.getElementById('result');
const pwLength = document.getElementById('length');
const upperCases = document.getElementById('uppercase');
const lowerCases = document.getElementById('lowercase');
const pwNumbers = document.getElementById('numbers');
const pwSymbols = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('clipboard');
const lengthData = document.querySelector('.range-label')

let rangeData = [];

pwLength.addEventListener('input', () => {
        rangeData = pwLength.value;
        lengthData.innerHTML = `Longitud: ${rangeData}`;
})


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

generateBtn.addEventListener('click', () => {
    const length = +pwLength.value;
    const hasUpper = upperCases.checked;
    const hasLower = lowerCases.checked;
    const hasNumber = pwNumbers.checked;
    const hasSymbol = pwSymbols.checked;
    
    result.innerHTML = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

// Copy Password

copyBtn.addEventListener('click', () => {

    const textarea = document.createElement('textarea');
    const password = result.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();

    //execCommand es obsoleta, actualmente se usa la clipboard API

})

// Generate Password Function

function generatePassword(upper, lower, number, symbol, length) {

    let generatedPassword = '';

    const typesCount = upper + lower + number + symbol;

    const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(item => 
        Object.values(item)[0]);

    if (typesCount === 0) {
        return ''
    };

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcKeys = Object.keys(type)[0];
            generatedPassword += randomFunc[funcKeys]();
        });
    }

    const resultPassword = generatedPassword.slice(0, length);

    return resultPassword;
}

// Generator Functions

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}
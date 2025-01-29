let drawnNumber = [];
let limitDrawnNumber = 10;
let numberSecret = generateSecretNumber();
let tried = 1;

function generateSecretNumber() {
    let generateNumber = parseInt(Math.random() * limitDrawnNumber + 1);
    let generatedQuantity = drawnNumber.length;

    if (generatedQuantity == limitDrawnNumber){
        drawnNumber = [];
    }

    if (drawnNumber.includes(generateNumber)){
        return generateSecretNumber ();
    } else {
        drawnNumber.push(generateNumber);
        return generateNumber;
    }
}

function displayTextOnScreen(tag, text){
    let textField = document.querySelector(tag);
    textField.innerHTML = text;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

}

function messageInitial() {
    displayTextOnScreen('h1','Jogo do Número Secreto');
    displayTextOnScreen('p','Escolha um número entre 1 e 10');
}

function cleanScreen() {
    let guess = document.querySelector('input');
    guess.value = '';
}

function verifyGuess () {
    let guess = document.querySelector('input').value;
    if (numberSecret == guess){
        displayTextOnScreen('h1', 'Acertou!!');
        let wordTried = tried > 1 ? 'tentativas' : 'tentativa';
        let message = `Parabéns, você descobriu o número secreto com ${tried} ${wordTried}`;
        displayTextOnScreen('p',message);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (guess > numberSecret){
            displayTextOnScreen('p','O número é menor.');
        } else {
            displayTextOnScreen('p','O número é maior.')
        }
        tried++
        cleanScreen();
    }
}

function newGame() {
    numberSecret = generateSecretNumber();
    cleanScreen();
    messageInitial();
    tried = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

messageInitial();
// Define the list of words to choose from

const words=['LIBRO', 'CASA', 'ALBERO', 'STRADA', 'MARE', 'MONTAGNA', 'SOLE', 'LUNA', 'STELLA', 'FIORE',
'TEMPO', 'NOTTE', 'GIORNO', 'CIELO', 'VENTO', 'PIOGGIA', 'NEVE', 'FUOCO', 'TERRA', 'ACQUA',
'ARIA', 'OMBRA', 'LUCE', 'SOGNO', 'AMORE', 'ODIO', 'PAURA', 'CORAGGIO', 'FORZA', 'DEBOLEZZA',
'VOCE', 'SILENZIO', 'MUSICA', 'RUMORE', 'PENSIERO', 'IDEA', 'PAROLA', 'STORIA', 'LEGGE', 'GIUSTIZIA',
'ERRORE', 'BUGIA', 'FEDE', 'SPERANZA', 'DESIDERIO', 'CUORE', 'MENTE', 'CORPO', 'ANIMA', 'OCCHIO',
'MANO', 'VOLTO', 'SORRISO', 'LACRIMA', 'PASSIONE', 'CALORE', 'FREDDO', 'SABBIA', 'ROCCIA', 'BOSCO',
'FIUME', 'LAGO', 'CASCATA', 'ORIZZONTE', 'TRAMONTO', 'ALBA', 'CITTA', 'VILLAGGIO', 'PAESE', 'CONFINE',
'STRANIERO', 'VIAGGIO', 'RITORNO', 'PARTENZA', 'PORTO', 'STAZIONE', 'TRENO', 'AEREO', 'MACCHINA', 'BICICLETTA',
'MOTO', 'CAMMINO', 'DESTINAZIONE', 'AVVENTURA', 'PAESAGGIO', 'MEMORIA', 'RICORDO', 'FOTOGRAFIA', 'FILM', 'PAGINA',
'CAPITOLO', 'INIZIO', 'FINE', 'MOMENTO', 'ETERNITA', 'GIARDINO', 'CAMPO', 'SEME', 'FOGLIA', 'FRUTTO',
'LEGNO', 'PIETRA', 'FANGO', 'DESERTO', 'ISOLA', 'OCEANO', 'BARCA', 'NAVE', 'PONTE', 'TORRE',
'MURO', 'PORTA', 'FINESTRA', 'SCALA', 'SOFFITTO', 'PAVIMENTO', 'PARETE', 'TETTO', 'CUCINA', 'BAGNO',
'SALOTTO', 'CAMERA', 'LETTO', 'SPECCHIO', 'ARMADIO', 'TAVOLO', 'SEDIA', 'DIVANO', 'TAPPETO', 'QUADRO',
'STATUA', 'PENNA', 'MATITA', 'QUADERNO', 'FOGLIO', 'INCHIOSTRO', 'DISEGNO', 'COLORE', 'PENNELLO', 'ARTE',
'SCULTURA', 'TEATRO', 'CINEMA', 'SPETTACOLO', 'ATTORE', 'REGISTA', 'SCENA', 'PALCO', 'PUBBLICO', 'APPLAUSO',
'CORO', 'ORCHESTRA', 'STRUMENTO', 'PIANOFORTE', 'CHITARRA', 'VIOLINO', 'FLAUTO', 'BATTERIA', 'CANZONE', 'RITMO',
'MELODIA', 'ARMONIA', 'DANZA', 'BALLO', 'PASSO', 'MOVIMENTO', 'ENERGIA', 'SPAZIO', 'ATTIMO', 'SECONDO',
'MINUTO', 'ORA', 'SETTIMANA', 'MESE', 'ANNO', 'SECOLO', 'PASSATO', 'PRESENTE', 'FUTURO', 'ORIGINE',
'META', 'VIANDANTE', 'GUIDA', 'AVVISO', 'SEGNO', 'LIMITE', 'CARTA', 'GIOCO', 'VITTORIA', 'SCONFITTA',
'PREMIO', 'SFIDA', 'RISULTATO', 'PROBLEMA', 'SOLUZIONE', 'DOMANDA', 'RISPOSTA', 'OPINIONE', 'DUBBIO', 'CERTEZZA',
'FIDUCIA', 'SACRIFICIO', 'PROGETTO', 'MISSIONE', 'OBIETTIVO', 'TRAGUARDO', 'SUCCESSO', 'FALLIMENTO', 'RISCHIO', 'PRUDENZA',
'SAGGEZZA', 'ESPERIENZA', 'LEZIONE', 'INSEGNAMENTO', 'MAESTRO', 'STUDENTE', 'SCUOLA', 'UNIVERSITA', 'CLASSE', 'BANCO',
'STUDIO', 'ESAME', 'VOTO', 'MATERIA', 'SCIENZA', 'LETTERATURA', 'POESIA', 'ROMANZO', 'RACCONTO', 'FAVOLA',
'LEGGENDA', 'MITO', 'EPOCA', 'ERA', 'CRONACA', 'GIORNALE', 'NOTIZIA', 'TITOLO', 'PARAGRAFO', 'FRASE',
'LETTERA', 'NUMERO', 'CIFRA', 'CODICE', 'LINGUA', 'DIALETTO', 'TRADUZIONE', 'SCRITTURA', 'FIRMA', 'SIGILLO',
'DOCUMENTO', 'ARCHIVIO', 'BIBLIOTECA', 'SCAFFALE', 'VOLUME', 'INDICE', 'PREFEZIONE', 'CONCLUSIONE', 'TEMA', 'ARGOMENTO',
'SINTESI', 'ANALISI', 'TEORIA', 'PRATICA', 'ESPERIMENTO', 'LABORATORIO', 'RICERCA', 'SCOPERTA', 'INVENZIONE', 'TECNOLOGIA',
'MOTORE'];
  

// Define the maximum number of incorrect guesses allowed
const maxWrongGuesses = 6;
let attempts=maxWrongGuesses;

let wordToGuess = '';
let guessedLetters = [];
let wrongGuesses = 0;
let imageCount = 1;
let audio;

// Select random word from the list
function selectRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Initialize the game
function initializeGame() {
  wordToGuess = selectRandomWord();
  guessedLetters = Array(wordToGuess.length).fill('_');
  wrongGuesses = 0;
  attempts = maxWrongGuesses;
  updateAttemptsDisplay();

  // Hide the modal if it's visible
  document.getElementById('messageModal').style.display = 'none';

  // Update the word display
  updateWordDisplay();

  updateLadyDeathGraphic();

  // Remove any previously generated buttons
  const lettersContainer = document.querySelector('.letters');
  while (lettersContainer.firstChild) {
    lettersContainer.removeChild(lettersContainer.firstChild);
  }

  // Generate the letter buttons
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    const button = document.createElement('button');
    button.innerText = letter;
    button.addEventListener('click', function () {
      handleGuess(letter);
    });
    lettersContainer.appendChild(button);
  }

  // Clear any previous win/lose message
  const messageContainer = document.querySelector('.message');
  messageContainer.innerText = '';
}

// Update the word display
function updateWordDisplay() {
  const wordContainer = document.querySelector('.word');
  wordContainer.innerText = guessedLetters.join(' ');
}

// Handle a letter guess
function handleGuess(letter) {
  // If the letter has already been guessed, do nothing
  if (guessedLetters.includes(letter)) {
    
    return;
  }

  // Add the letter to the list of guessed letters
  guessedLetters.forEach((guessedLetter, index) => {
    if (wordToGuess[index] === letter) {
      guessedLetters[index] = letter;
    }
  });

  // If the letter is not in the hidden word, increment the wrong guesses count and update the Melting Snowman graphic
  if (!wordToGuess.includes(letter)) {
    wrongGuesses++;
    attempts--;
    audio = new Audio('sound/wrong.mp3');
    audio.play();
    updateAttemptsDisplay();
    updateLadyDeathGraphic();
  } else{
    audio = new Audio('sound/correct.mp3');
    audio.play();
  }

  // Update the word display
  updateWordDisplay();

  // Check if the game has been won or lost
  checkWinOrLose();
}

// Update the Melting Snowman graphic
function updateLadyDeathGraphic() {
  const LadyDeathContainer = document.querySelector('.LadyDeath');
  LadyDeathContainer.innerHTML = `<img src="images/death${imageCount}.jpeg" alt="death${imageCount}">`;
    imageCount++;
}


// Check if the game has been won or lost
function checkWinOrLose() {
  const modal = document.getElementById('messageModal');
  const modalMessage = modal.querySelector('.modal-message');
  const LadyDeathContainer = document.querySelector('.LadyDeath');

  if (guessedLetters.join('') === wordToGuess) {
    audio = new Audio('sound/win.mp3');
    audio.play();
    modalMessage.innerText = 'Hai vinto!';
    modal.style.display = 'flex';
    LadyDeathContainer.innerHTML = `<img src="images/death1.jpeg" alt="gameover">`;
    disableAllButtons();
  } else if (wrongGuesses >= maxWrongGuesses) {
    audio = new Audio('sound/sword.mp3');
    audio.play();
    modalMessage.innerText = `Hai perso! La parola era "${wordToGuess}".`;
    modal.style.display = 'flex';
    LadyDeathContainer.innerHTML = `<img src="images/gameover.jpeg" alt="gameover">`;
    disableAllButtons();
  }
}

// Helper function to disable all letter buttons
function disableAllButtons() {
  const letterButtons = document.querySelectorAll('.letters button');
  letterButtons.forEach(button => {
    button.disabled = true;
    button.removeEventListener('click', handleGuess);
  });
}


// Modal close button handler
document.querySelector('.close-modal').addEventListener('click', function() {
  document.getElementById('messageModal').style.display = 'none';
});

// Close modal when clicking outside
document.getElementById('messageModal').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});

function updateAttemptsDisplay() {
  const attemptsDisplay = document.getElementById('attemptsLeft');
  attemptsDisplay.textContent = attempts;
  
  // Aggiungi un effetto visivo quando i tentativi sono pochi
  const attemptsDiv = document.querySelector('.attempts');
  if (attempts <= 2) {
      attemptsDiv.classList.add('warning');
  } else {
      attemptsDiv.classList.remove('warning');
  }
}

// Initialize the game when the page loads
window.addEventListener('load', initializeGame);

// Add event listener for reset button
document.getElementById('resetButton').addEventListener('click', function() {
  imageCount = 1;  // Reset the image counter
  initializeGame(); // Restart the game
});
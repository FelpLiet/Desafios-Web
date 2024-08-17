let attempts = 3;
let randomNumber = Math.floor(Math.random() * 20) + 1;
let guessButton, inputField
let previousGuesses = [];

function checkGuess() {
  const guess = parseInt(document.getElementById("guess").value);
  const result = document.getElementById("result");
  result.classList.remove("correct", "wrong");
  result.value = "";
  
  if (isNaN(guess) || guess < 1 || guess > 20) {
    document.getElementById("result").innerHTML = "Digite um valor entre 1 e 20.";
    return;
  }

  if (previousGuesses.includes(guess)) {
    result.innerHTML = "Você já tentou este número. Tente outro.";
    return;
  }

  previousGuesses.push(guess);

  if (guess === randomNumber) {
    result.innerHTML = "Parabéns! Você acertou!";
    result.classList.add("correct");
    guessButton.innerHTML = "Jogar novamente";
    guessButton.removeEventListener("click", checkGuess);
    guessButton.addEventListener("click", resetGame);    
  } else if (guess < randomNumber) {
    result.innerHTML = "Muito baixo. Tente novamente.";
  } else {
    result.innerHTML = "Muito alto. Tente novamente.";
  }
  
  attempts--;
  document.getElementById("attempts").innerHTML = "Tentativas restantes: " + attempts;
  
  if (attempts === 0) {
    result.classList.add("wrong");
    result.innerHTML = "Você esgotou suas tentativas. O número correto era " + randomNumber;
    document.getElementById("attempts").innerHTML = "Tentativas restantes: 0";
    guessButton.innerHTML = "Jogar novamente";
    guessButton.removeEventListener("click", checkGuess);
    guessButton.addEventListener("click", resetGame);
  }
}

function resetGame() {
  attempts = 3;
  randomNumber = Math.floor(Math.random() * 20) + 1;
  guessButton.innerHTML = "Chutar";
  previousGuesses = [];
  document.getElementById("result").innerHTML = "";
  document.getElementById("attempts").innerHTML = "Tentativas restantes: " + attempts;
  guessButton.removeEventListener("click", resetGame);
  guessButton.addEventListener("click", checkGuess);

  document.querySelector('.container').classList.add('bounce');
  setTimeout(() => {
    document.querySelector('.container').classList.remove('bounce');
  }, 500);
}

function buildSquares(container, depth) {
  if (depth === 0) return;
  const square = document.createElement("div");
  square.className = "square" + (depth % 2 === 0 ? " black" : "");
  container.appendChild(square);
  buildSquares(square, depth - 1);
}

document.addEventListener("DOMContentLoaded", function() {
  inputField = document.getElementById("guess");
  guessButton = document.getElementById("guessButton");

  inputField.addEventListener("focus", function() {
    inputField.setAttribute("data-placeholder", inputField.getAttribute("placeholder"));
    inputField.setAttribute("placeholder", "");
  });

  inputField.addEventListener("blur", function() {
    if (inputField.value === "") {
      inputField.setAttribute("placeholder", inputField.getAttribute("data-placeholder"));
    }
  });
  
  inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      checkGuess();
    }
  });

  guessButton.addEventListener("click", checkGuess);

  const squareContainer = document.createElement("div");
  squareContainer.className = "square-container";
  document.body.appendChild(squareContainer);
  buildSquares(squareContainer, 28);
});
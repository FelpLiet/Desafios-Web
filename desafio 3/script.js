//h1
const h1 = document.querySelector("h1");

const letters = h1.textContent.split("");
h1.textContent = "";
console.log(letters);

letters.forEach((letter, index) => {
  const span = document.createElement("span");
  span.innerText = letter;
  span.className = `color-${index % 3}`;
  h1.appendChild(span);
});

//game
const INITIAL_TIME = 60;
const INITIAL_INTERVAL = 1000;
const REDUCED_INTERVAL = 500;
const SCORE_TO_REDUCE_INTERVAL = 20;
const TIME_TO_REDUCE_INTERVAL = 30;


const gameDiv = document.querySelector(".jogo");
const timeDiv = document.querySelector(".tempo");
const pontosDiv = document.querySelector(".pontos");
const startButton = document.querySelector(".iniciar");
const historicoDiv = document.querySelector(".pontoHistorico");

startButton.addEventListener("click", startGame);

function addBall() {
  const ball = document.createElement("div");
  ball.className = `ball ball-${Math.floor(Math.random() * 3)}`;
  ball.style.left = `${Math.random() * gameDiv.clientWidth - 10}px`;
  ball.style.top = `${Math.random() * gameDiv.clientHeight - 10}px`;
  console.log(ball.style.backgroundColor);
  gameDiv.appendChild(ball);
  if (ball.classList.contains("ball-0")) {
    ball.addEventListener("click", ballRemove);
  } else if (ball.classList.contains("ball-1")) {
    ball.addEventListener("mouseover", ballRemove);
  } else if (ball.classList.contains("ball-2")) {
    ball.addEventListener("mouseover", function () {
      hoveredBall = ball;
    });
    ball.addEventListener("mouseout", function () {
      hoveredBall = null;
    });
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "d" && hoveredBall) {
    ballRemove({ target: hoveredBall });
  }
});



let pontos = 0;

function ballRemove(event) {
  const isBall1 = event.target.classList.contains("ball-1");
  const isBall = event.target.classList.contains("ball");

  if (isBall1 || isBall) {
    event.target.remove();
    pontos = isBall1 && pontos > 0 ? pontos - 1 : pontos + 1;
    pontosDiv.innerText = `Pontos: ${pontos}`;
  }
}

let timerId = null;
let ballTimerId = null;

function startTimer() {
  let time = 60;
  let ballInterval = INITIAL_INTERVAL;

  ballTimerId = setInterval(() => {
    addBall();
    if (pontos >= SCORE_TO_REDUCE_INTERVAL && time <= TIME_TO_REDUCE_INTERVAL) {
      clearInterval(ballTimerId);
      ballInterval = REDUCED_INTERVAL;
      ballTimerId = setInterval(addBall, ballInterval);
    }
  }, INITIAL_INTERVAL);

  timerId = setInterval(() => {
    time--;
    timeDiv.innerText = `Tempo: ${time} segundos restantes`;
    console.log(`${time} segundos`);
    if (time == 0) {
      salvarHistorico();
      stopGame();
      iniciarButton();
    }
  }, INITIAL_INTERVAL);
}

function clearBalls() {
  const balls = document.querySelectorAll(".ball");
  balls.forEach((ball) => ball.remove());
}

function stopGame() {
  clearInterval(timerId);
  clearInterval(ballTimerId);
  timeDiv.innerText = `Tempo: ${INITIAL_TIME} segundos`;
  pontosDiv.innerText = "Pontos: 0";
  pontos = 0;
  clearBalls();
  iniciarButton();
}

function startGame() {
  startTimer();
  stopButton();
}

function iniciarButton() {
  startButton.removeEventListener("click", stopGame);
  startButton.addEventListener("click", startGame);
  startButton.innerText = "Iniciar";
  startButton.className = "iniciar";
}

function stopButton() {
  startButton.removeEventListener("click", startGame);
  startButton.addEventListener("click", stopGame);
  startButton.innerText = "Parar";
  startButton.className = "parar";
}

let Historico = [];

function salvarHistorico() {
  Historico.push(pontos);
  Historico.sort((a, b) => b - a);
  historicoDiv.innerHTML = "";
  Historico.forEach((pontos, index) => {
    const div = document.createElement("div");
    div.innerText = `${index + 1}º - ${pontos} pontos`;
    historicoDiv.appendChild(div);
  });
}

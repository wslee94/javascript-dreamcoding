class Timer {
  constructor(time, doSomething, expireSomething) {
    this.timer = null;
    this.initTime = time;
    this.time = time;
    this.doSomething = doSomething;
    this.expireSomething = expireSomething;
  }

  start() {
    this.timer = setInterval(() => {
      this.doSomething(this.time);
      if (this.time <= 0) this.expire();
      this.time = this.time - 1;
    }, 1000);
  }

  expire() {
    this.expireSomething();
    clearInterval(this.timer);
    this.timer = null;
    this.time = this.initTime;
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.time = this.initTime;
  }

  getIsRunning() {
    return !!this.timer;
  }
}

const COUNT = 10;

const playButton = document.querySelector(".play-button");
const pauseButton = document.querySelector(".pause-button");
const replayButton = document.querySelector(".reload-button");
const timerText = document.querySelector(".timer");
const gameZone = document.querySelector(".game-zone");
const popUp = document.querySelector(".pop-up");
const popUpMessage = document.querySelector(".result-text");
const counter = document.querySelector(".counter");

function initCount() {
  counter.textContent = COUNT;
}

initCount();

const timer = new Timer(10, countFunc, expireFunc);

function countFunc(time) {
  timerText.textContent = `0:${time}`;
}

function expireFunc() {
  openPopUp("you lost 😭");
}

function generateBugsAndCarrots() {
  const xMax = gameZone.offsetWidth - 50;
  const yMax = gameZone.offsetHeight - 50;

  for (let i = 0; i < COUNT; i++) {
    const x = Math.floor(Math.random() * xMax);
    const y = Math.floor(Math.random() * yMax);

    const carrotEl = document.createElement("i");
    carrotEl.setAttribute("class", "carrot");
    carrotEl.setAttribute("data-category", "carrot");
    carrotEl.style.left = `${x}px`;
    carrotEl.style.top = `${y}px`;
    gameZone.appendChild(carrotEl);
  }

  for (let i = 0; i < COUNT; i++) {
    const x = Math.floor(Math.random() * xMax);
    const y = Math.floor(Math.random() * yMax);

    const bugEl = document.createElement("i");
    bugEl.setAttribute("class", "bug");
    bugEl.setAttribute("data-category", "bug");
    bugEl.style.left = `${x}px`;
    bugEl.style.top = `${y}px`;
    gameZone.appendChild(bugEl);
  }
}

function removeBugsAndCarrots() {
  const iTags = document.querySelectorAll(".game-zone > i");
  iTags.forEach((iTag) => iTag.remove());
}

function openPopUp(message) {
  pauseButton.style.visibility = "hidden";
  playButton.style.visibility = "hidden";
  popUp.style.display = "block";
  popUpMessage.textContent = message;
}

function closePopUp() {
  pauseButton.style.visibility = "visible";
  playButton.style.visibility = "visible";
  popUp.style.display = "none";
  popUpMessage.textContent = "";
}

function carrotClick(carrot) {
  carrot.remove();
  const remainingCount = Number(counter.textContent);
  counter.textContent = remainingCount - 1;
  if (remainingCount - 1 === 0) {
    timer.stop();
    openPopUp("you won! 🎉");
  }
}

function bugClick() {
  timer.stop();
  openPopUp("you lost 😭");
}

playButton.addEventListener("click", (e) => {
  removeBugsAndCarrots();
  generateBugsAndCarrots();
  playButton.style.display = "none";
  pauseButton.style.display = "inline-block";
  timer.start();
});

pauseButton.addEventListener("click", (e) => {
  timer.stop();
  openPopUp("Replay?");
});

replayButton.addEventListener("click", (e) => {
  closePopUp();
  removeBugsAndCarrots();
  initCount();
  generateBugsAndCarrots();
  playButton.style.display = "none";
  pauseButton.style.display = "inline-block";
  timer.start();
});

gameZone.addEventListener("click", (e) => {
  if (e.target.dataset.category === "carrot") {
    carrotClick(e.target);
  } else if (e.target.dataset.category === "bug") {
    bugClick();
  }
});

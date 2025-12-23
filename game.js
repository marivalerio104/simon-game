const colors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
const buttons = document.getElementsByClassName("simon");
let level = 0;
let user = 0;
let startButton = document.getElementById("start");
let started = false;


// Add event listener to start the game
startButton.addEventListener("click", function() {
  setTimeout(() => {nextSequence()}, 500);
  started = true;
  this.classList.add("none");
})

// Add event listener for each of the simon buttons
for (const button of buttons) {
  button.addEventListener("click", function() {
    pressButton(this.id);

    if (started) {
      if (this.id === gamePattern[user]) {
        user++;

        if (user == gamePattern.length) {
          user = 0;
          setTimeout(() => {nextSequence()}, 1000);
        }
      } else {
        level = user = 0;
        document.getElementById("level").textContent = "Game over!";
        startButton.classList.remove("none");
        started = false;
        gamePattern.length = 0;
      }
    }
  })
}


async function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColor = colors[randomNumber];
  gamePattern.push(randomColor);
  level++;
  document.getElementById("level").textContent = "Level " + level;

  for (let color of gamePattern) {
    pressButton(color);
    await sleep(540);
  }
}


function pressButton(color) {
  let button = document.getElementById(color);
  button.classList.add("pressed");
  setTimeout(() => {button.classList.remove("pressed")}, 300);
  let audio = new Audio("./sounds/" + color + ".mp3");
  audio.play()
}


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

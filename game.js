const colors = ["red", "blue", "green", "yellow"];
const buttons = document.getElementsByClassName("simon");
const startButton = document.getElementById("start");
let gamePattern = [];
let level = 0;
let user = 0;
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

        if (user >= gamePattern.length) {
          user = 0;
          setTimeout(() => {nextSequence()}, 1000);
        }
      } else {
        gameOver();
      }
    }
  })
}

// Animation and sound when a simon button is pressed
function pressButton(color) {
  let button = document.getElementById(color);
  button.classList.add("pressed");
  setTimeout(() => {button.classList.remove("pressed")}, 300);
  let audio = new Audio("./sounds/" + color + ".mp3");
  audio.play()
}

// Starts the next sequence of the simon game
async function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColor = colors[randomNumber];
  gamePattern.push(randomColor);
  level++;
  document.getElementById("level").textContent = "Level " + level;

  for (let color of gamePattern) {
    pressButton(color);
    await sleep(530);
  }
}

// Game over screen and resets values
function gameOver() {
  document.body.classList.add("game-over");
  setTimeout(() => {document.body.classList.remove("game-over")}, 350);
  let audio = new Audio("./sounds/wrong.mp3");
  audio.play()
  level = user = gamePattern.length = 0;
  document.getElementById("level").textContent = "Game over!";
  startButton.classList.remove("none");
  started = false;
}


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

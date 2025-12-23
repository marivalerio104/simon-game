const colors = ["red", "blue", "green", "yellow"];
let gamePattern = [];

async function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColor = colors[randomNumber];
  gamePattern.push(randomColor)

  for (let color of gamePattern) {
    let button = document.getElementById(color);
    button.classList.add("pressed");
    setTimeout(() => {button.classList.remove("pressed")}, 300);
    let audio = new Audio("./sounds/" + randomColor + ".mp3");
    audio.play()
    await sleep(500);
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
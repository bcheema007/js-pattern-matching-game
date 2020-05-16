// need to apply a color to one box and then select another box randomly to apply the same color
// need to apply event listener to each button so that when clicked the color which was assigned to it will appear
// then when another box is clicked you must check whether the colors match. if they do then keep the colors applied and subtract 2 from the total of 16 boxes.
// When the total hits zero that's when you know you can restart the game

// in order to check whether two button sources colors are equivalent, create a stack like data structure where you push the two colors into an array, then check whether they match or not, if they do, keep the color applied to the elements, if they don't then "toggle" color class on/off

const h1 = document.querySelector("h1");

const gamearea = document.querySelector("#gamearea");
const allDivs = document.querySelectorAll("div");
const btn = document.querySelector("button");

let colorArr;

let divArray;

// save color of element to this array in order to toggle color on and off in applyColor function
let saveColor;

// If two colors match then subtract from total until it reaches zero which is when you know the game is over
let total;

let checkAnswer;

btn.addEventListener("click", setup);

function setup() {
  let index = 0;

  total = 16;

  saveColor = [];

  checkAnswer = [];

  divArray = [];

  h1.textContent = "Match the Pattern";
  btn.removeEventListener("click", setup);
  btn.style.backgroundColor = "red";

  for (let el of allDivs) {
    divArray[index++] = el;
  }

  colorArr = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink",
    "orange",
    "purple",
    "black",
  ];

  for (let i = 0; i < divArray.length; i++) {
    divArray[i].addEventListener("click", applyColor);
  }

  for (let i = 0; i < 8; i++) {
    let i1 = divRandom();
    let i2 = divRandom();
    let c1 = colorRandom();

    // check if element has a class of active, if it does then this element will likely have a color applied to it and therefore we need to find an element which doesn't have a class of active/color applied to it. Same thing for i2.
    if (document.getElementById(divArray[i1].id).classList.contains("active")) {
      while (
        document.getElementById(divArray[i1].id).classList.contains("active")
      ) {
        i1 = divRandom();
      }
    }
    if (document.getElementById(divArray[i2].id).classList.contains("active")) {
      while (
        document.getElementById(divArray[i2].id).classList.contains("active")
      ) {
        i2 = divRandom();
      }
    }

    if (i1 !== i2) {
      let el1 = document.getElementById(divArray[i1].id);
      let el2 = document.getElementById(divArray[i2].id);
      let color = colorArr[c1];

      el1.classList.toggle("active");
      el2.classList.toggle("active");

      // el1.classList.add(color);
      // el2.classList.add(color);

      saveColor[divArray[i1].id] = color;
      saveColor[divArray[i2].id] = color;

      // don't want same color being applied more than twice, therefore remove from colorArr
      colorArr.splice(c1, 1);
    } else {
      // if i1 === i2 then restart the iteration until they don't match
      i--;
    }
  }
}

function applyColor(event) {
  let color = saveColor[event.target.id];

  event.target.classList.toggle(color);

  checkAnswer.push(event);

  match();
}

function match() {
  console.log(total);

  if (checkAnswer.length < 2) {
    return;
  } else {
    let element1 = checkAnswer[0];
    let element2 = checkAnswer[1];

    let color1 = saveColor[element1.target.id];
    let color2 = saveColor[element2.target.id];

    if (color1 === color2) {
      total -= 2;
      checkAnswer = [];
    } else {
      setTimeout(function () {
        element1.target.classList.toggle(color1);
        element2.target.classList.toggle(color2);
        checkAnswer = [];
      }, 500);
    }
  }

  if (total === 0) {
    h1.textContent = "You win!";
    btn.textContent = "Play Again";
    btn.style.backgroundColor = "black";
    btn.addEventListener("click", reset);
  }
}

function reset() {
  btn.removeEventListener("click", reset);
  btn.textContent = "Start";
  h1.textContent = "Match the Pattern";
  for (let i = 0; i < divArray.length; i++) {
    divArray[i].classList.remove("active");
    divArray[i].classList.remove(saveColor[divArray[i].id]);
  }
  setup();
}

function divRandom() {
  return Math.floor(Math.random() * 16);
}

function colorRandom() {
  return Math.floor(Math.random() * colorArr.length);
}

let numSquares = 6;
let colors = generateRandomColors(numSquares);

let squares = document.querySelectorAll('.square');
let messageDisplay = document.querySelector('#message');
let h1 = document.querySelector('h1');
let resetButton = document.querySelector('#reset');
let modeButtons = document.querySelectorAll('.mode');

init();

function init() {
  //mode button event listeners
  setUpModeButtons();
  setUpSquares();
}

function setUpModeButtons() {
  //loop through modebuttons(easy and hard) and add/remove certain classes
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function() {
      modeButtons[0].classList.remove('selected');
      modeButtons[1].classList.remove('selected');
      this.classList.add('selected');
      
      this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;

      reset();
    });
  }
}

function setUpSquares() {
  //loop through the squares to assign a color to each one.
  for (let i = 0; i < squares.length; i++) {
    //add click listeners to squares
    squares[i].addEventListener('click', function() {
      //grab color of clicked square
      let clickedColor = this.style.backgroundColor;

      //compare color to pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        //If correct, all squares change to that color. So we call this function w/ the correct color(clickedColor).
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    })
  }
}

function reset() {
  //when button is clicked. generate all new colors
  colors = generateRandomColors(numSquares)
  //pick new random color from array
  pickedColor = pickColor();
  //change color display to match picked color
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";

  //so the correct message disappears after clicking new game
  messageDisplay.textContent = "";

  //change colors of squares
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = 'steelblue';
}

resetButton.addEventListener('click', function() {
  reset();
})

//To display the rgb color you need to guess
let pickedColor = pickColor();
let colorDisplay = document.getElementById('colorDisplay');

colorDisplay.textContent = pickedColor;

//loop through the squares to assign a color to each one.
for (let i = 0; i < squares.length; i++) {
  //add initial colors to squares
  squares[i].style.backgroundColor = colors[i];

  //add click listeners to squares
  squares[i].addEventListener('click', function() {
    //grab color of clicked square
    let clickedColor = this.style.backgroundColor;

    //compare color to pickedColor
    if (clickedColor === pickedColor) {
      messageDisplay.textContent = "Correct!";
      resetButton.textContent = "Play Again?";
      //If correct, all squares change to that color. So we call this function w/ the correct color(clickedColor).
      changeColors(clickedColor);
      h1.style.backgroundColor = clickedColor;
    } else {
      this.style.backgroundColor = "#232323";
      messageDisplay.textContent = "Try Again";
    }
  })
}

//function to change all squares to correct color
function changeColors(color) {
  //loop through all squares
  for (let i = 0; i < squares.length; i++) {
    //change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}

//function to choose a random color on the colors array
function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

//function to generate colors
function generateRandomColors(num) {
  //make an array
  let arr = [];
  //repeat num times
  for (let i = 0; i < num; i++) {
    //get random color, using the randomColor function below, and push into array
    arr.push(randomColor())
  }
  //return that array
  return arr;

}


function randomColor() {
  //pick a 'red' from 0-255
  let r = Math.floor(Math.random() * 256);
  //pick a 'green' from 0-255
  let g = Math.floor(Math.random() * 256);
  //pick a 'blue' from 0-255
  let b = Math.floor(Math.random() * 256);

  //here we return the random color, by putting it together in proper rgb color form
  return `rgb(${r}, ${g}, ${b})`;
}

// بسم الله نبدا

// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// get array from letters

let lettersArray = Array.from(letters);

// Select Letters Containers

let lettersContainer = document.querySelector(".letters");

// Generate letters

lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");
  // Create Text Node
  let letterTextNode = document.createTextNode(letter);
  // Append Letter To Span
  span.appendChild(letterTextNode);
  // Add Class To Span
  span.classList.add("letter-box");
  //   Append Span To Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words And Categories

const words = {
  programming: [
    "coding",
    "python",
    "ruby",
    "java",
    "programming",
    "javascript",
    "go",
    "text",
    "php",
    "jquery",
    "web",
  ],
  characters: [
    "Albert Einstein",
    "Cleopatra",
    "Adolf Hitler",
    "Thomas Edison",
    "Nikola Tesla",
    "Prophet Muhammad",
    "Jesus",
    "Alexander the Great",
    "Isaac Newton",
  ],
  games: [
    "Call Of Duty",
    "Fortnite",
    "Apex Legends",
    "Counter strike",
    "Minecraft",
    "God Of War",
    "Grand Theft Auto V",
    "Resident Evil",
    "Valorant",
    "Pubg",
  ],
  countries: [
    "Egypt",
    "Spain",
    "Germany",
    "Morroco",
    "Saudi Arabia",
    "United Kingdom",
    "Lebnon",
    "Italy",
    "Qatar",
    "Afghanistan",
    "Syria",
    "Iraq",
    "Kazakhstan",
    "Tunisia",
    "Algeria",
    "France",
  ],
};

// Get Random Property

let allKeys = Object.keys(words);
let randomPropertyNumber = Math.round(Math.random() * allKeys.length);
// random category name
let randomPropertyName = allKeys[randomPropertyNumber];
// random category words
let randomPropertyValue = words[randomPropertyName];

let randomValueNumber = Math.round(Math.random() * randomPropertyValue.length);
// random word form random category names => Choosen Word
let randomValueValue = randomPropertyValue[randomPropertyNumber];

// Get Game Category span

let gameCategory = document.querySelector(".category span");

gameCategory.innerHTML = randomPropertyName;

// Select Letters guess element

let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Choosen Word to Array

let lettersAndspace = Array.from(randomValueValue);

// Create Spans Depend On Word

lettersAndspace.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");
  // if letter is space
  if (letter === " ") {
    // Add class to span
    span.className = "spacing";
  }
  // Append Span To letters guess container
  lettersGuessContainer.appendChild(span);
});

// Handle CLicking On Letters

// Select All Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select Draw Element

let draw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
  // Set Status
  let theStatus = false;
  if (e.target.classList.contains("letter-box")) {
    e.target.classList.add("clicked");
    // letter clicked
    let letterClicked = e.target.innerHTML.toLowerCase();
    // Choosen Word
    let choosenWord = Array.from(randomValueValue.toLowerCase());
    choosenWord.forEach((letter, WordIndex) => {
      // If clicked letter equals to one of the choosen word letters
      if (letter === letterClicked) {
        // Set Status To Correct
        theStatus = true;
        // Loop On All Spans
        guessSpans.forEach((span, index) => {
          if (index === WordIndex) {
            span.innerHTML = letter;
            span.classList.add(`correct`);
          }
        });
      }
    });
    // if letter is wrong
    if (theStatus === false) {
      // Increase Wrong Attempts Number
      wrongAttempts++;
      // Add Class Wrong To Draw
      draw.classList.add(`wrong-${wrongAttempts}`);
      // play fail sound
      document.getElementById("fail").play();
      if (wrongAttempts === 6) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      // play success sound
      document.getElementById("success").play();
    }
    let spansCorrect = document.querySelectorAll("span.correct");
    if (spansCorrect.length === guessSpans.length) {
      WinnerChikenDinner();
    }
  }
});

// End Game Function

function endGame() {
  // Create Popup
  let div = document.createElement("div");
  // Create txt
  let txt = document.createTextNode(
    `Game Over! The Word is ${randomValueValue}`
  );
  // append txt to the div
  div.appendChild(txt);
  // add class to div
  div.className = "gameOver";
  // append div to document
  document.body.appendChild(div);
}

function WinnerChikenDinner() {
  // Create Popup
  let div = document.createElement("div");
  // Create txt
  let txt = document.createTextNode(`Congratulations! You Won`);
  if (wrongAttempts === 0) {
    txt = document.createTextNode(
      `Congratulations! You Won, Your Wrong Attempts is ${wrongAttempts}, Magnificient!`
    );
  } else if (wrongAttempts <= 3) {
    txt = document.createTextNode(
      `Congratulations! You Won, Your Wrong Attempts is ${wrongAttempts}, Good!`
    );
  } else if (wrongAttempts <= 4) {
    txt = document.createTextNode(
      `Congratulations! You Won, Your Wrong Attempts is ${wrongAttempts}, Not Bad`
    );
  } else if (wrongAttempts === 5) {
    txt = document.createTextNode(
      `Congratulations! You Won, Your Wrong Attempts is ${wrongAttempts}, But Not Good..`
    );
  }
  // append txt to the div
  div.appendChild(txt);
  // add class to div
  div.className = "winner";
  // append div to document
  document.body.appendChild(div);
}


window.onload = () => {
  let debugButton = document.getElementById("debug");
  let newGameBtn = document.getElementById("newGame");
  newGameBtn.onclick = function (event) {
    window.location.reload();
    event.preventDefault();
  };
  let correctAnswer = document.getElementById("correctAnswer");
  let bannerMessage = document.getElementById("bannerMessage");
  debugButton.addEventListener("click", function () {
    if (debugButton.innerHTML == "Debug Mode: Off") {
      debugButton.innerHTML = "Debug Mode: On";
      correctAnswer.innerHTML = "Correct Answer: " + word;
    } else {
      debugButton.innerHTML = "Debug Mode: Off";
      correctAnswer.innerHTML = "";
    }
  });

  let letters = [
    { letter: "A", state: "unused" },
    { letter: "B", state: "unused" },
    { letter: "C", state: "unused" },
    { letter: "D", state: "unused" },
    { letter: "E", state: "unused" },
    { letter: "F", state: "unused" },
    { letter: "G", state: "unused" },
    { letter: "H", state: "unused" },
    { letter: "I", state: "unused" },
    { letter: "J", state: "unused" },
    { letter: "K", state: "unused" },
    { letter: "L", state: "unused" },
    { letter: "M", state: "unused" },
    { letter: "N", state: "unused" },
    { letter: "O", state: "unused" },
    { letter: "P", state: "unused" },
    { letter: "Q", state: "unused" },
    { letter: "R", state: "unused" },
    { letter: "S", state: "unused" },
    { letter: "T", state: "unused" },
    { letter: "U", state: "unused" },
    { letter: "V", state: "unused" },
    { letter: "W", state: "unused" },
    { letter: "X", state: "unused" },
    { letter: "Y", state: "unused" },
    { letter: "Z", state: "unused" },
  ];

  let letterList = document.getElementById("letterList");
  for (let i = 0; i < letters.length; i++) {
    let letterValue = letters[i].letter;
    let state = letters[i].state;
    let letter = document.createElement("span");
    letter.setAttribute("class", "letter " + state);
    letter.setAttribute("id", letterValue);
    letter.innerHTML = letterValue;
    letterList.appendChild(letter);
  }

  const data = null;
  let word = null;

  function getNewWord() {
    /*
    const request = new XMLHttpRequest();
    request.withCredentials = true;
    request.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        word = this.responseText.toUpperCase();
      }
    });
    request.open(
      "GET",
      "https://random-words5.p.rapidapi.com/getRandom?wordLength=5"
    );
    request.setRequestHeader("X-RapidAPI-Host", "random-words5.p.rapidapi.com");
    request.setRequestHeader(
      "X-RapidAPI-Key",
      "3a0a5d475dmshabbcbfe953aa101p12e324jsn22f52d67a70a"
    );
    request.send(data);
    */
    // TODO: delete below later:
    word = "light".toUpperCase();
  }

  function checkWordExists(word) {
    let message = document.getElementById("guessMessage" + guessNumber);
    const request = new XMLHttpRequest();
    request.withCredentials = false;
    request.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        if (this.status != 200) {
          message.innerHTML =
            "That's not a real word. Please try a different word.";
        }
        if (this.status == 200) {
          message.innerHTML = "";
          assessGuess(word);
        }
      }
    });
    const url =
      "https://api.wordnik.com/v4/word.json/" +
      word +
      "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
    request.open("GET", url);
    request.send(data);
  }

  function checkIfCorrectLetter(guessedLetter, wordArray) {
    for (let i = 0; i < wordArray.length; i++) {
      if (guessedLetter == wordArray[i]) return true;
    }
    return false;
  }

  function assessGuess(guess) {
    let coloredLettersElement = document.getElementById(
      "coloredLetters" + guessNumber
    );
    let guessArray = guess.toUpperCase().split("");
    let wordArray = word.split("");

    if (guess.toUpperCase() == word.toUpperCase()) {
      bannerMessage.setAttribute("class", "won");
      bannerMessage.innerHTML = "Congrats! You figured out the word!";
    } else {
      for (let i = 0; i < guessArray.length; i++) {
        let singleLetter = document.createElement("span");
        singleLetter.innerHTML = guessArray[i];
        let letter = document.getElementById(guessArray[i]);
        letter.setAttribute("class", "letter used");
        if (guessArray[i] == wordArray[i]) {
          singleLetter.setAttribute("class", "letter correctPlacement");
        } else {
          let isFound = checkIfCorrectLetter(guessArray[i], wordArray);
          if (isFound) {
            singleLetter.setAttribute("class", "letter correctLetter");
          } else singleLetter.setAttribute("class", "letter used");
        }
        coloredLettersElement.appendChild(singleLetter);
      }
      if (guessNumber < 6) {
        guessNumber += 1;
        createGuessButton(guessNumber);
      } else if ((guessNumber = 6)) {
        bannerMessage.setAttribute("class", "lost");
        bannerMessage.innerHTML = "Sorry, you lost!";
      }
    }
  }

  getNewWord();

  let guessNumber = 1;
  guessesArray = [];
  let guessessArrayDiv = document.getElementById("guessesArray");

  const createGuessButton = (guessNumber) => {
    let guessForm = document.createElement("form");
    guessForm.setAttribute("id", "guessForm" + guessNumber);
    guessessArrayDiv.appendChild(guessForm);

    let guessLabel = document.createElement("label");
    guessLabel.setAttribute("for", "guess" + guessNumber);
    guessLabel.innerHTML = "Guess " + guessNumber + ":  &nbsp;";
    guessForm.appendChild(guessLabel);

    let guessInput = document.createElement("input");
    guessInput.setAttribute("type", "text");
    guessInput.setAttribute("id", "guess" + guessNumber);
    guessInput.setAttribute("name", "guess" + guessNumber);
    guessInput.setAttribute("maxlength", "5");
    guessInput.setAttribute("value", "");
    guessForm.appendChild(guessInput);

    let guessButton = document.createElement("button");
    guessButton.setAttribute("type", "button");
    guessButton.setAttribute("id", "guessButton" + guessNumber);
    guessButton.innerHTML = "Submit";
    guessForm.appendChild(guessButton);

    guessButton.onclick = function (event) {
      checkWordExists(guessInput.value.toLowerCase());
      event.preventDefault();
    };

    let guessMessage = document.createElement("span");
    guessMessage.setAttribute("id", "guessMessage" + guessNumber);
    guessForm.appendChild(guessMessage);

    let coloredLetters = document.createElement("span");
    coloredLetters.setAttribute("id", "coloredLetters" + guessNumber);
    guessForm.appendChild(coloredLetters);
  };

  createGuessButton(1);
};

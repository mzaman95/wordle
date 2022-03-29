window.onload = () => {
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let letterList = document.getElementById("letterList");
  for (let i = 0; i < letters.length; i++) {
    let letterValue = letters[i];
    let letter = document.createElement("span");
    letter.setAttribute("class", "positionNextTo letter default");
    letter.setAttribute("id", letterValue);
    letter.innerHTML = letterValue;
    letterList.appendChild(letter);
  }

  // Utilizing XMLHttpRequest to Random Word API w/ param for 5 letter word
  const data = null;
  let word = null;

  const getNewWord = () => {
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
  };

  getNewWord();

  let debugModeButton = document.getElementById("debugModeButton");
  let correctAnswer = document.getElementById("correctAnswer");
  debugModeButton.addEventListener("click", function () {
    if (debugModeButton.innerHTML == "Debug Mode: Off") {
      debugModeButton.innerHTML = "Debug Mode: On";
      correctAnswer.innerHTML = "Correct Answer: " + word;
    } else {
      debugModeButton.innerHTML = "Debug Mode: Off";
      correctAnswer.innerHTML = "";
    }
  });

  const checkIfWordExists = (word) => {
    const request = new XMLHttpRequest();
    request.withCredentials = false;
    request.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        if (this.status == 200) {
          console.log("The word exists");
        } else {
          alert(
            "The guess you entered is not a word. Please enter a different guess."
          );
        }
      }
    });
    const url =
      "https://api.wordnik.com/v4/word.json/" +
      word +
      "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
    request.open("GET", url);
    request.send(data);
  };

  checkIfWordExists(word);
};

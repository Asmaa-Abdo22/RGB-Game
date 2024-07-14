// ^----------HTML ELEMENTS ---------
var easyBtn = document.getElementById("easyBtn");
var hardBtn = document.getElementById("hardBtn");
var rgbSyntax = document.getElementById("rgbSyntax");
var colorsContainer = document.getElementById("colorsContainer");
var getColorsBtn = document.getElementById("getColorsBtn");

// &=======App Variables
var levels = {
  easy: {
    name: "easy",
    numberOfCards: 3,
  },
  hard: {
    name: "hard",
    numberOfCards: 6,
  },
};
var selectedLevel = "easy";
var correctAnswer = "";

// ?=======Functions
// * generate random color
function generateRandomColor() {
  var red = Math.trunc(Math.random() * 256);
  var green = Math.trunc(Math.random() * 256);
  var blue = Math.trunc(Math.random() * 256);

  var color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}


function getNewQuestion(level) {
  var numberOfCards = levels[level].numberOfCards;
  var colors = [];

  for (var i = 1; i <= numberOfCards; i++) {
    colors.push(generateRandomColor());
  }
  correctAnswer = colors[Math.trunc(Math.random() * numberOfCards)];

  rgbSyntax.innerHTML = correctAnswer;
  displayColors(colors);
}

function displayColors(colorsArr) {
  var colorCardsHTML = "";
  for (var i = 0; i < colorsArr.length; i++) {
    colorCardsHTML += `<div class="color-card col-md-4">
      <div class="inner h-100 rounded" 
      style="background-color: ${colorsArr[i]}">
      </div>     
    </div>
    `;
  }

  colorsContainer.innerHTML = `
  <div class="row g-4 py-4">
  ${colorCardsHTML}
  </div>
  `;

  var allColorCards = document.querySelectorAll(".color-card .inner");
  for (var i = 0; i < allColorCards.length; i++) {
    allColorCards[i].onclick = checkAnswer;
  }
}

function checkAnswer(e) {
  if (e.target.style.backgroundColor === correctAnswer) {
    alert("Congratulation 🎉");
    getNewQuestion(selectedLevel);
  } else {
    e.target.style.display = "none";
    alert("try again 🔁 ");
  }
}

//~========> EVENTS
easyBtn.onclick = function () {
  hardBtn.classList.remove("active");
  easyBtn.classList.add("active");

  selectedLevel = "easy";
  getNewQuestion(selectedLevel);
};

hardBtn.onclick = function () {
  easyBtn.classList.remove("active");
  hardBtn.classList.add("active");

  selectedLevel = "hard";
  getNewQuestion(selectedLevel);
};

getColorsBtn.onclick = function () {
  if (selectedLevel === "easy") {
    getNewQuestion("easy");
  } else {
    getNewQuestion("hard");
  }
};

getNewQuestion(selectedLevel);


const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const startBtn = document.getElementById("start-btn");
const timerEl = document.getElementById("timer");
const mistakesEl = document.getElementById("mistakes");

let timer;
let timeLeft = 60;
let isTyping = false;
let characterIndex = 0;
let mistakes = 0;
let currentLevel = 0;

const levels = [
  "The quick brown fox jumps over the lazy dog.",
  "JavaScript is a versatile and powerful programming language.",
  "Typing fast and accurately takes practice and patience.",
  "A journey of a thousand miles begins with a single step.",
  "Simplicity is the soul of efficiency.",
  "Good code is its own best documentation.",
  "Errors should never pass silently.",
  "To iterate is human, to recurse divine.",
  "Knowledge is power.",
  "You miss 100% of the shots you don't take.",
  "Creativity is intelligence having fun.",
  "Discipline equals freedom.",
  "Dream big. Work hard. Stay focused.",
  "A smooth sea never made a skilled sailor.",
  "Don't watch the clock; do what it does. Keep going.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Coding is not just about typing; it's about thinking.",
  "Always code as if the person who ends up maintaining your code is a violent psychopath who knows where you live.",
  "Success usually comes to those who are too busy to be looking for it."
];


function displayText() {
  textDisplay.innerHTML = "";
  levels[currentLevel].split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    textDisplay.appendChild(span);
  });
}

function startTest() {
  clearInterval(timer);
  textInput.disabled = false;
  textInput.value = "";
  timeLeft = 60;
  characterIndex = 0;
  mistakes = 0;
  isTyping = true;
  timerEl.textContent = timeLeft;
  mistakesEl.textContent = mistakes;
  document.getElementById("level-num").textContent = currentLevel + 1;
  function updateProgressBar() {
    const bar = document.getElementById("progress-bar");
    const progress = ((currentLevel + 1) / levels.length) * 100;
    bar.style.width = progress + "%";
  }

  displayText();
  textInput.focus();


  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
}

function endTest() {
  isTyping = false;
  textInput.disabled = true;
  currentLevel++;
  document.getElementById("level-num").textContent = currentLevel + 1;

  if (currentLevel >= levels.length) {
    alert("🎉 You’ve completed all 20 levels!");
    currentLevel = 0;
  }
  displayText();

}

textInput.addEventListener("input", () => {
  const chars = textDisplay.querySelectorAll("span");
  const typed = textInput.value.split("");
  if (textInput.value === levels[currentLevel] && mistakes === 0 && timeLeft > 0) {
    clearInterval(timer); // stop the current timer
    textInput.disabled = true;

    setTimeout(() => {
      alert("🎉 Congratulations! You completed Level " + (currentLevel + 1));

      currentLevel++;

      function updateProgressBar() {
        const bar = document.getElementById("progress-bar");
        const progress = ((currentLevel + 1) / levels.length) * 100;
        bar.style.width = progress + "%";
      }

      if (currentLevel >= levels.length) {
        alert("🏁 You've completed all 20 levels! Resetting to Level 1.");
        currentLevel = 0;
      } else {
        alert("👉 Get ready for Level " + (currentLevel + 1));
      }

      displayText();
      startTest(); // Start the next level automatically
    }, 300); // slight delay so the user can enjoy the win
  }

  characterIndex = 0;
  mistakes = 0;

  chars.forEach((char, i) => {
    if (!typed[i]) {
      char.classList.remove("correct", "incorrect");
    } else if (typed[i] === char.innerText) {
      char.classList.add("correct");
      char.classList.remove("incorrect");
    } else {
      char.classList.add("incorrect");
      char.classList.remove("correct");
      mistakes++;
    }
  });

  mistakesEl.textContent = mistakes;
});

startBtn.addEventListener("click", startTest);
window.addEventListener("load", displayText);



setTimeout(() => {
  alert("🎉 Congratulations! You completed Level " + (currentLevel + 1));

  currentLevel++;
  function generateLevelSelector() {
    const levelSelector = document.getElementById("level-selector");
    levelSelector.innerHTML = ''; // Clear previous buttons

    // Generate level buttons
    for (let i = 0; i < levels.length; i++) {
      const button = document.createElement("button");
      button.classList.add("level-button");
      button.textContent = `Level ${i + 1}`;

      // Check if the level is unlocked
      if (i < unlockedLevels) {
        button.classList.remove("locked");
        button.addEventListener("click", () => {
          // Set current level to clicked one and start that level
          currentLevel = i;
          document.getElementById("level-num").textContent = currentLevel + 1;
          updateProgressBar();
          displayText();
          startTest(); // Start the level
        });
      } else {
        button.classList.add("locked");
      }

      levelSelector.appendChild(button);
    }
  }
  window.onload = () => {
    generateLevelSelector(); // Call this on page load to initialize the level selector
  };
  let unlockedLevels = parseInt(localStorage.getItem("unlockedLevels")) || 1;


  if (currentLevel >= levels.length) {
    alert("🏁 You've completed all 20 levels! Resetting to Level 1.");
    currentLevel = 0;
  } else {
    alert("👉 Get ready for Level " + (currentLevel + 1));

  }
  if (currentLevel + 1 > unlockedLevels) {
    unlockedLevels = currentLevel + 1;
    localStorage.setItem("unlockedLevels", unlockedLevels);
  }
  unlockedLevels = parseInt(localStorage.getItem("unlockedLevels")) || 1;


  document.getElementById("level-num").textContent = currentLevel + 1; // ✅ THIS LINE

  displayText();
  startTest(); // Start the next level automatically
}, 300);

function updateProgressBar() {
  const bar = document.getElementById("progress-bar");
  const progress = ((currentLevel + 1) / levels.length) * 100;
  bar.style.width = progress + "%";
  function generateLevelSelector() {
    const levelSelector = document.getElementById("level-selector");
    levelSelector.innerHTML = ''; // Clear any previous buttons

    // Generate level buttons
    for (let i = 0; i < levels.length; i++) {
      const button = document.createElement("button");
      button.classList.add("level-button");
      button.textContent = `Level ${i + 1}`;

      // Check if the level is unlocked
      if (i < unlockedLevels) {
        button.classList.remove("locked");
        button.addEventListener("click", () => {
          currentLevel = i;
          document.getElementById("level-num").textContent = currentLevel + 1;
          updateProgressBar();
          displayText();
          startTest();
        });
      } else {
        button.classList.add("locked");
      }

      levelSelector.appendChild(button);
    }
  }

}

if (currentLevel + 1 > unlockedLevels) {
  unlockedLevels = currentLevel + 1;
  localStorage.setItem("unlockedLevels", unlockedLevels);
  generateLevelSelector(); // Refresh the level selector
}

function flashLevel() {
  const levelEl = document.getElementById("level-num");
  levelEl.classList.add("flash");
  setTimeout(() => levelEl.classList.remove("flash"), 400);


}
const successSound = new Audio('success.mp3');
const failSound = new Audio('fail.mp3');
successSound.play(); // on level complete
failSound.play(); // on wrong key (optional)

let unlockedLevels = 1;

let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
leaderboard.push({ name: "You", wpm: 52 });
leaderboard.sort((a, b) => b.wpm - a.wpm);
localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

document.getElementById("reset-levels").addEventListener("click", () => {
  if (confirm("Are you sure you want to restart from Level 1?")) {
    currentLevel = 0;
    unlockedLevels = 1;
    localStorage.setItem("unlockedLevels", unlockedLevels);
    document.getElementById("level-num").textContent = 1;
    updateProgressBar();
    displayText();
    startTest();
  }
});


const form = document.getElementById("scoreForm");
const leaderboard = document.getElementById("leaderboard");
const readModeButton = document.getElementById("readModeButton");
const readMode = document.getElementById("readMode");
const readContent = document.getElementById("readContent");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const extraButton = document.getElementById("extraButton");

let scores = [];
let currentReadIndex = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const score = parseInt(document.getElementById("score").value, 10);

  if (name && !isNaN(score)) {
    scores.push({ name, score });
    scores.sort((a, b) => a.score - b.score);
    updateLeaderboard();
    form.reset();
  }
});

extraButton.addEventListener("click", () => {
  const name = prompt("Name des Mitarbeiters:");
  if (name) {
    scores.push({ name, score: 5 });
    scores.sort((a, b) => a.score - b.score);
    updateLeaderboard();
  }
});

readModeButton.addEventListener("click", () => {
  if (scores.length > 0) {
    readMode.style.display = "flex";
    currentReadIndex = 0;
    showCurrentRead();
  }
});

nextButton.addEventListener("click", () => {
  if (currentReadIndex < scores.length - 1) {
    currentReadIndex++;
    showCurrentRead();
  }
});

prevButton.addEventListener("click", () => {
  if (currentReadIndex > 0) {
    currentReadIndex--;
    showCurrentRead();
  }
});

function showCurrentRead() {
  const current = scores[currentReadIndex];
  readContent.textContent = `${current.name}: ${current.score} Punkte`;

  if (currentReadIndex === 0) readContent.style.color = "#ffd700"; // Gold
  else if (currentReadIndex === 1) readContent.style.color = "#c0c0c0"; // Silber
  else if (currentReadIndex === 2) readContent.style.color = "#cd7f32"; // Bronze
  else readContent.style.color = "white";
}

function updateLeaderboard() {
  leaderboard.innerHTML = scores
    .map(
      (entry, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${entry.name}</td>
        <td>${entry.score}</td>
      </tr>`
    )
    .join("");
}

const form = document.getElementById("scoreForm");
const leaderboard = document.getElementById("leaderboard");
const readModeButton = document.getElementById("readModeButton");
const readMode = document.getElementById("readMode");
const readContent = document.getElementById("readContent");
const nextButton = document.getElementById("nextButton");

let scores = [];
let currentReadIndex = 0;

// Neue Punkte hinzufügen
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const score = parseInt(document.getElementById("score").value, 10);

  if (name && !isNaN(score)) {
    scores.push({ name, score });
    updateLeaderboard();
    form.reset();
  }
});

// Rangliste aktualisieren
function updateLeaderboard() {
  leaderboard.innerHTML = "";
  scores
    .sort((a, b) => a.score - b.score) // Sortieren (niedrigste Punktzahl gewinnt)
    .forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.name}</td>
        <td>${entry.score}</td>
      `;
      leaderboard.appendChild(row);
    });
}

// Vorlesemodus starten
readModeButton.addEventListener("click", () => {
  if (scores.length === 0) return alert("Keine Daten vorhanden!");
  currentReadIndex = 0;
  showReadContent();
  readMode.classList.add("active");
});

nextButton.addEventListener("click", () => {
  currentReadIndex++;
  if (currentReadIndex < scores.length) {
    showReadContent();
  } else {
    readMode.classList.remove("active");
  }
});

function showReadContent() {
  const entry = scores[currentReadIndex];
  const place = currentReadIndex + 1;
  readContent.textContent = `Platz ${place}: ${entry.name} mit ${entry.score} Punkten!`;
}

const form = document.getElementById("scoreForm");
const leaderboard = document.getElementById("leaderboard");
const readModeButton = document.getElementById("readModeButton");
const readMode = document.getElementById("readMode");
const readContent = document.getElementById("readContent");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
const extraButton = document.getElementById("extraButton");
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");

let scores = [];
let currentReadIndex = 0;

// Konfetti-Setup
const confetti = [];
function createConfetti() {
  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height,
      r: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
    particle.y += 2;
    if (particle.y > confettiCanvas.height) {
      particle.y = 0;
      particle.x = Math.random() * confettiCanvas.width;
    }
  });
  requestAnimationFrame(drawConfetti);
}

// Neue Punkte hinzufügen
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const score = parseInt(document.getElementById("score").value, 10);

  if (name && !isNaN(score)) {
    scores.push({ name, score });
    updateLeaderboard();
    form.reset();
    document.getElementById("name").focus(); // Fokus zurück auf Name
  }
});

// Extra Punkte für Mitarbeiter
extraButton.addEventListener("click", () => {
  const name = prompt("Mitarbeiter-Name?");
  if (name) {
    scores.push({ name, score: 5 });
    updateLeaderboard();
  }
});

// Sortieren und Rangliste aktualisieren
function updateLeaderboard() {
  scores.sort((a, b) => b.score - a.score);
  leaderboard.innerHTML = scores
    .map((entry, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${entry.name}</td>
   

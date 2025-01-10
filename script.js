document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("scoreForm");
  const leaderboard = document.getElementById("leaderboard");
  const readModeButton = document.getElementById("readModeButton");
  const readMode = document.getElementById("readMode");
  const readContent = document.getElementById("readContent");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const confettiCanvas = document.getElementById("confettiCanvas");
  let scores = [];
  let currentIndex = 0;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    let score = parseInt(document.getElementById("score").value);
    const isMitarbeiter = document.getElementById("isMitarbeiter").checked;

    if (isMitarbeiter) score += 5;
    scores.push({ name, score });
    scores.sort((a, b) => b.score - a.score); // Sort by score (highest first)
    renderLeaderboard();
    form.reset();
    document.getElementById("name").focus();
  });

  const renderLeaderboard = () => {
    leaderboard.innerHTML = "";
    scores.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.name}</td>
        <td>${entry.score}</td>
      `;
      leaderboard.appendChild(row);
    });
  };

  readModeButton.addEventListener("click", () => {
    currentIndex = 0;
    updateReadContent();
    readMode.style.display = "flex";
  });

  const updateReadContent = () => {
    if (currentIndex < scores.length) {
      const { name, score } = scores[currentIndex];
      readContent.innerHTML = `<strong>${name}</strong> hat <strong>${score}</strong> Punkte`;
      if (currentIndex === 0) triggerConfetti();
    } else {
      readContent.innerHTML = "Ende der Rangliste";
    }
  };

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) currentIndex--;
    updateReadContent();
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < scores.length - 1) currentIndex++;
    updateReadContent();
  });

  const triggerConfetti = () => {
    // Add confetti logic here
    confettiCanvas.classList.remove("hidden");
    setTimeout(() => confettiCanvas.classList.add("hidden"), 5000);
  };
});


document.addEventListener("DOMContentLoaded", function () {
    var startButton = document.querySelector(".welkom_start");
    if (startButton) {
        startButton.addEventListener("click", function () {
            var naamInput = document.querySelector(".welkom_input").value.trim();

            if (naamInput) {
                localStorage.setItem("spelerNaam", naamInput);
                window.location.href = "quiz.html";
            } else {
                alert("Vul alstublieft een naam in!");
            }
        });
    }

    var quizVraag = document.querySelector(".quiz-vraag");
    if (quizVraag) {
        var spelerNaam = localStorage.getItem("spelerNaam");
        if (spelerNaam) {
            quizVraag.textContent = "Hallo " + spelerNaam + ", welke quiz wil je spelen?";
        } else {
            quizVraag.textContent = "Hallo, welke quiz wil je spelen?";
        }
    }

    var teamNaamElement = document.querySelector(".teamnaam");
    if (teamNaamElement) {
        var spelerNaam = localStorage.getItem("spelerNaam");
        if (spelerNaam) {
            teamNaamElement.textContent = "Teamnaam: " + spelerNaam;
        } else {
            teamNaamElement.textContent = "Teamnaam: Onbekend";
        }
    }

    // JSON-bestand laden
    fetch('./json/vragen.json')  // Zorg ervoor dat je het juiste pad gebruikt
        .then(response => {
            if (!response.ok) {
                throw new Error(`Fout bij laden JSON: ${response.status}`);
            }
            return response.json(); // Converteer de inhoud naar een JSON-object
        })
        .then(data => {
            console.log("JSON succesvol geladen:", data);
            var themaData = data;  // Vervang 'vragenPerThema' door de geladen JSON

            // Hier gebruiken we de geladen data voor de vragen
            var themaButtons = document.querySelectorAll(".quiz_theme");
            themaButtons.forEach(function (button) {
                button.addEventListener("click", function () {
                    var geselecteerdThema = button.textContent.trim();
                    console.log("Geselecteerd thema:", geselecteerdThema);

                    if (themaData[geselecteerdThema]) {  // Gebruik de geladen JSON als 'themaData'
                        localStorage.setItem("gekozenThema", geselecteerdThema);
                        window.location.href = "vraag.html";
                    } else {
                        alert("Dit thema bestaat niet!");
                    }
                });
            });

            var geselecteerdThema = localStorage.getItem("gekozenThema");
            var vragen = themaData[geselecteerdThema] || [];

            var vraagIndex = 0;
            var score = 0;
            var maxScore = vragen.length;
            var vraagResultaten = [];

            function startTimer() {
                var timerElement = document.getElementById("timer");
                var timeLeft = 15;
                var timer;

                timeLeft = 15;
                timerElement.textContent = timeLeft;

                timer = setInterval(function () {
                    timeLeft--;
                    timerElement.textContent = timeLeft;

                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        vraagResultaten.push({
                            vraag: vragen[vraagIndex].vraag,
                            jouwAntwoord: "Geen antwoord",
                            juisteAntwoord: vragen[vraagIndex].correct,
                            isCorrect: false
                        });
                        vraagIndex++;
                        showNextQuestion();
                    }
                }, 1000);
            }

            function stopTimer() {
                clearInterval(timer);
            }

            function showNextQuestion() {
                stopTimer();
                if (vraagIndex < vragen.length) {
                    var vraag = vragen[vraagIndex];
                    var vraagElement = document.querySelector('.quizTitle');
                    vraagElement.innerText = "Vraag " + (vraagIndex + 1) + ": " + vraag.vraag;

                    var quizImage = document.querySelector('.quiz-image');
                    if (quizImage) {
                        quizImage.src = vraag.image;
                        quizImage.alt = "Afbeelding voor de vraag: " + vraag.vraag;
                    }

                    var antwoordButtons = document.querySelectorAll('.answer-button');
                    antwoordButtons.forEach(function (button, index) {
                        button.innerText = vraag.antwoorden[index];
                        button.disabled = false;
                        button.onclick = function () {
                            checkAntwoord(button.innerText, vraag);
                        };
                    });

                    startTimer();
                } else {
                    window.location.href = "eindscherm.html";
                    localStorage.setItem("score", score);
                    localStorage.setItem("maxScore", maxScore);
                    localStorage.setItem("vraagResultaten", JSON.stringify(vraagResultaten));
                }
            }

            function checkAntwoord(antwoord, vraag) {
                stopTimer();
                var antwoordButtons = document.querySelectorAll('.answer-button');
                antwoordButtons.forEach(function (button) {
                    button.disabled = true;
                });

                if (antwoord === vraag.correct) {
                    score++;
                    vraagResultaten.push({
                        vraag: vraag.vraag,
                        jouwAntwoord: antwoord,
                        juisteAntwoord: vraag.correct,
                        isCorrect: true
                    });
                } else {
                    vraagResultaten.push({
                        vraag: vraag.vraag,
                        jouwAntwoord: antwoord,
                        juisteAntwoord: vraag.correct,
                        isCorrect: false
                    });
                }

                vraagIndex++;
                showNextQuestion();
            }

            if (document.querySelector('.quizTitle')) {
                showNextQuestion();
            }

            var spelerNaamElement = document.querySelector(".speler-naam");
            var behaaldeScoreElement = document.querySelector(".behaalde-score");
            var maxScoreElement = document.querySelector(".max-score");
            var vraagResultatenContainer = document.getElementById("vraag-resultaten-container");

            if (spelerNaamElement) {
                spelerNaamElement.textContent = localStorage.getItem("spelerNaam") || "Gast";
            }
            if (behaaldeScoreElement) {
                behaaldeScoreElement.textContent = localStorage.getItem("score") || 0;
            }
            if (maxScoreElement) {
                maxScoreElement.textContent = localStorage.getItem("maxScore") || 0;
            }

            if (vraagResultatenContainer) {
                var vraagResultaten = JSON.parse(localStorage.getItem("vraagResultaten")) || [];
                vraagResultaten.forEach(function (resultaat, index) {
                    var vraagElement = document.createElement("div");
                    vraagElement.classList.add("vraag-resultaat");

                    var vraagText = document.createElement("p");
                    vraagText.textContent = "Vraag " + (index + 1) + ": " + resultaat.vraag;
                    vraagElement.appendChild(vraagText);

                    var antwoordText = document.createElement("p");
                    antwoordText.textContent = "Jouw antwoord: " + resultaat.jouwAntwoord + " (Correct: " + resultaat.juisteAntwoord + ")";
                    vraagElement.appendChild(antwoordText);

                    vraagResultatenContainer.appendChild(vraagElement);
                });
            }

            var scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];

            function updateScoreboard() {
                var spelerNaam = localStorage.getItem("spelerNaam");
                var score = localStorage.getItem("score");

                if (spelerNaam && score) {
                    scoreboard.push({ naam: spelerNaam, score: score });

                    if (scoreboard.length > 3) {
                        scoreboard = [{ naam: spelerNaam, score: score }];
                    } else {
                        scoreboard.sort(function (a, b) {
                            return b.score - a.score;
                        });
                    }

                    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
                }

                var scoreboardElement = document.getElementById("scoreboard");
                if (scoreboardElement) {
                    scoreboardElement.innerHTML = '';

                    scoreboard.forEach(function (entry, index) {
                        var li = document.createElement("li");
                        li.textContent = (index + 1) + ". " + entry.naam + ": " + entry.score;
                        scoreboardElement.appendChild(li);
                    });
                }
            }

            if (document.getElementById("scoreboard")) {
                updateScoreboard();
            }

        })
        .catch(error => {
            console.error("Fout bij laden van JSON:", error);
        });
});


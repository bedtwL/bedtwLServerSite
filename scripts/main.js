
function copyIP() {
    navigator.clipboard.writeText("bedtwL.com").then(() => {
        const button = document.querySelector('.copy-btn');
        button.innerText = "Copied!";
        button.style.backgroundColor = "#4CAF50";

        setTimeout(() => {
            button.innerText = "Copy IP";
            button.style.backgroundColor = "#007BFF";
        }, 2000);
    }).catch(err => {
        console.error("Error copying IP: ", err);
    });
}
const copybtn = document.querySelector('.copy-btn');
if (copybtn) copybtn.addEventListener('click', copyIP);~

function navbar() {
    const navbar = document.getElementById("navbar");
    navbar.innerHTML += `<div class="nav-button"><a href="/">Home</a></div>`;
    navbar.innerHTML += `<div class="nav-button"><a href="/api-docs.html">API Docs</a></div>`;
    navbar.innerHTML += `<div class="nav-button"><a href="/stats.html">Player Stats</a></div>`;
}
navbar();
const statsform = document.getElementById("statsform");

if (statsform) {
    statsform.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("stats").value.trim();
        const result = document.getElementById("result");

        if (!name) {
            result.innerText = "Please enter a player name.";
            return;
        }

        const url = `https://api.bedtwl.com/api/v1/player/bwffa?player=${encodeURIComponent(name)}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("API error: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                const datae = JSON.stringify(data, null, 2);
                // Replace this with how you want to display the result
                result.innerHTML = `<span>Kills: </span>${datae.kills}</span><span>Deaths: </span><span>${datae.deaths}</span><br><span>Best Kill Streak: </span><span>${datae.best_killstreak}</span><span>Last Kill Streak: </span><span>${datae.last_killstreak}</span><br><span>Skill: </span><span>${datae.skill}</span<br><span>Skill level: </span><span>${datae.skill_levl}</span><br>`;
            })
            .catch(error => {
                result.innerText = "Error fetching data: " + error.message;
            });
    });
}

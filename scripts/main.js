
// Copy IP
function copyIP() {
        const ip = "bedtwL.com";
        navigator.clipboard.writeText(ip).then(() => {
            const btn = document.querySelector('.copy-btn');
            const originalText = btn.innerText;
            btn.innerText = "Copied!";
            btn.style.background = "#00ff55";
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "";
            }, 2000);
        });
    }

// Staff list 框框
document.addEventListener("DOMContentLoaded", function() {
    const players = document.querySelectorAll('.player-name');

    players.forEach(player => {
        const ign = player.getAttribute('data-ign');
        const rank = player.getAttribute('data-rank') || "Staff";
        const skill = player.getAttribute('data-skill') || "玩家協助";
        
        const tooltip = document.createElement('div');
        tooltip.className = 'player-tooltip';
        
        tooltip.innerHTML = `
    <img class="tooltip-img" 
         src="https://visage.surgeplay.com/head/128/${ign}" 
         alt="${ign}">
    <span class="tooltip-ign">${ign}</span>
    <span class="tooltip-rank">${rank}</span>
    <span class="tooltip-skill">專長：${skill}</span>
`;
        
        player.appendChild(tooltip);
    });
});

// ========================================= //
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

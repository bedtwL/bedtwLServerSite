
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
    <span class="tooltip-skill">${skill}</span>
`;
        
        player.appendChild(tooltip);
    });
});

// ========================================= //
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


function updateThemeButtonText() {
            const themeBtn = document.getElementById('themeBtn');
            const isLight = document.body.classList.contains('light-mode');
            const mode = isLight ? 'light' : 'dark';

            const newText = themeBtn.getAttribute(`data-${currentLang}-${mode}`);
            if (newText) {
                themeBtn.innerText = newText;
            }
        }

        function toggleTheme() {
            const body = document.body;
            body.classList.toggle('light-mode');
            updateThemeButtonText();
        }

window.onload = function() {
    const currentPath = window.location.pathname;
    const homeBtn = document.getElementById('homeBtn');
    const statsBtn = document.getElementById('statsBtn');
    if (currentPath.includes('stats.html')) {
        statsBtn.classList.add('active');
        homeBtn.classList.remove('active');
    } else {
        homeBtn.classList.add('active');
        statsBtn.classList.remove('active');
    }
};
document.addEventListener('DOMContentLoaded', function() {
    const characterInfoList = document.getElementById('character-info-list');
    const backButton = document.getElementById('back-btn');
    const characters = [
        { name: 'Сестра1', background: '#d1e7ff' },
        { name: 'Сестра2', background: '#d7ffd1' },
        { name: 'Сестра3', background: '#ffd1d1' },
        { name: 'Финансист', background: '#d1e7ff' },
        { name: 'Разработчик', background: '#d7ffd1' },
        { name: 'Пиарщик', background: '#ffd1d1' },
        { name: 'Безопасник', background: '#d1e7ff' },
        { name: 'Юрист', background: '#d7ffd1' },
        { name: 'Производчик', background: '#ffd1d1' },
        { name: 'Отец', background: '#f1f1f1' },
        { name: 'Бизнес партнер', background: '#f1f1f1' },
        { name: 'Президент', background: '#f1f1f1' }
    ];
    let players = JSON.parse(localStorage.getItem('players')) || [];
    const currentPlayer = localStorage.getItem('currentPlayer');

    function displayCharacterInfo() {
        characterInfoList.innerHTML = ''; // Clear previous content

        characters.forEach(character => {
            const player = players.find(p => p.character === character.name);
            const playerInfo = document.createElement('div');
            playerInfo.classList.add('character-info');
            playerInfo.style.backgroundColor = character.background;

            if (player) {
                let stockInfo = '';
                if (player.stocks.blue > 0) stockInfo += `🔵 Синие акции: ${player.stocks.blue} `;
                if (player.stocks.green > 0) stockInfo += `🟢 Зеленые акции: ${player.stocks.green} `;
                if (player.stocks.red > 0) stockInfo += `🔴 Красные акции: ${player.stocks.red} `;

                playerInfo.innerHTML = `
                    <h3>${character.name}</h3>
                    <p>Имя: ${player.name}</p>
                    <p>Деньги: $${player.money}</p>
                    ${stockInfo ? `<p>${stockInfo}</p>` : ''}
                `;
            } else {
                playerInfo.innerHTML = `
                    <h3>${character.name}</h3>
                    <p>Этот персонаж еще не выбран.</p>
                `;
            }

            characterInfoList.appendChild(playerInfo);
        });
    }

    // Display character info initially
    displayCharacterInfo();

    // Refresh when localStorage changes (player names or other data)
    window.addEventListener('storage', function() {
        players = JSON.parse(localStorage.getItem('players')) || [];
        displayCharacterInfo();
    });

    // Back button functionality - returns to character page
    backButton.onclick = function() {
        if (currentPlayer) {
            window.location.href = 'character.html';
        } else {
            window.history.back();
        }
    };
});

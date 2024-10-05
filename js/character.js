document.addEventListener('DOMContentLoaded', function() {
    const characterInfo = document.getElementById('character-info');
    const currentPlayer = localStorage.getItem('currentPlayer');
    const players = JSON.parse(localStorage.getItem('players')) || [];

    const player = players.find(p => p.name === currentPlayer);

    characterInfo.innerHTML = `
        <h2>Привет, ${player.name}</h2>
        <p>Ты выбрал: ${player.character}</p>
        <p>Деньги: $${player.money}</p>
        <p>Акции:</p>
        <ul>
            <li>🔵 Синие акции: ${player.stocks.blue}</li>
            <li>🟢 Зеленые акции: ${player.stocks.green}</li>
            <li>🔴 Красные акции: ${player.stocks.red}</li>
        </ul>
    `;

    document.getElementById('market-btn').onclick = function() {
        window.location.href = 'market.html';
    };

    document.getElementById('general-info-btn').onclick = function() {
        window.location.href = 'general.html';
    };
});

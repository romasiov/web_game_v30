document.addEventListener('DOMContentLoaded', function() {
    const globalPlayerList = document.getElementById('global-player-list');

    // Assuming multiple players can be stored, we simulate player data here
    const players = [
        { name: localStorage.getItem('playerName'), character: localStorage.getItem('selectedCharacter'), money: localStorage.getItem('money'), stocks: localStorage.getItem('stocks') }
    ];

    // Populate the global player data
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.innerHTML = `
            <p><strong>${player.name}</strong> (${player.character}): Деньги: ${player.money}, Акции: ${player.stocks}</p>
        `;
        globalPlayerList.appendChild(playerDiv);
    });

    // Back button
    document.getElementById('back-btn').onclick = function() {
        window.history.back();
    };
});

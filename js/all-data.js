document.addEventListener('DOMContentLoaded', function() {
    const characterList = document.getElementById('character-list');
    
    // Simulate all players data from localStorage
    const players = [
        { name: localStorage.getItem('playerName'), character: localStorage.getItem('selectedCharacter'), money: localStorage.getItem('money'), stocks: localStorage.getItem('stocks') }
    ];

    players.forEach(player => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>Игрок: ${player.name}</h3>
                         <p>Персонаж: ${player.character}</p>
                         <p>Деньги: ${player.money}</p>
                         <p>Акции: ${player.stocks}</p>`;
        characterList.appendChild(div);
    });

    document.getElementById('back-btn').onclick = function() {
        window.location.href = 'character.html';
    };
});

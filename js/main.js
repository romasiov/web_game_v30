document.addEventListener('DOMContentLoaded', function() {
    const characterSelect = document.getElementById('character-select');
    const characters = [
        { name: 'Сестра1', background: 'blue' },
        { name: 'Сестра2', background: 'green' },
        { name: 'Сестра3', background: 'red' },
        { name: 'Финансист', background: 'blue' },
        { name: 'Разработчик', background: 'green' },
        { name: 'Пиарщик', background: 'red' },
        { name: 'Безопасник', background: 'blue' },
        { name: 'Юрист', background: 'green' },
        { name: 'Производчик', background: 'red' },
        { name: 'Отец', background: 'white' },
        { name: 'Бизнес партнер', background: 'white' },
        { name: 'Президент', background: 'white' }
    ];

    // Populate character dropdown with updated character names
    characters.forEach(character => {
        const option = document.createElement('option');
        option.value = character.name;
        option.text = character.name;
        option.style.backgroundColor = character.background;
        characterSelect.appendChild(option);
    });

    // Handle form submission (player registration logic)
    document.getElementById('registration-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const selectedCharacter = characterSelect.value;

        let players = JSON.parse(localStorage.getItem('players')) || [];

        // Check if the player is trying to log back in
        const existingPlayer = players.find(player => player.name === name && player.character === selectedCharacter);

        // If player exists, log them back in
        if (existingPlayer) {
            localStorage.setItem('currentPlayer', name);
            window.location.href = 'character.html';
            return;
        }

        const newPlayer = {
            name: name,
            character: selectedCharacter,
            money: 1000,
            stocks: {
                blue: 10,
                green: 10,
                red: 10
            }
        };

        // Save new player in localStorage
        players.push(newPlayer);
        localStorage.setItem('players', JSON.stringify(players));

        // Redirect to character page
        localStorage.setItem('currentPlayer', name);
        window.location.href = 'character.html';
    });

    // Admin direct access
    document.getElementById('admin-btn').addEventListener('click', function() {
        window.location.href = 'admin.html';
    });
});

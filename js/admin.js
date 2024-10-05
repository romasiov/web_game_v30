document.addEventListener('DOMContentLoaded', function() {
    const playerList = document.getElementById('player-list');
    const freeCharacters = document.getElementById('free-characters');
    const ordersList = document.getElementById('orders-list');
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

    let players = JSON.parse(localStorage.getItem('players')) || [];
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let characterNames = JSON.parse(localStorage.getItem('characterNames')) || {};
    let stockPrices = JSON.parse(localStorage.getItem('stockPrices')) || { blue: 100, green: 100, red: 100 };

    // Display current stock prices in the form (hidden initially)
    document.getElementById('price-blue').value = stockPrices.blue;
    document.getElementById('price-green').value = stockPrices.green;
    document.getElementById('price-red').value = stockPrices.red;

    // Toggle stock price update form visibility
    document.getElementById('edit-stock-prices').addEventListener('click', function() {
        const stockForm = document.getElementById('stock-prices-form');
        stockForm.style.display = stockForm.style.display === 'none' ? 'block' : 'none';
    });

    // Update stock prices
    document.getElementById('update-prices').addEventListener('click', function() {
        const newBluePrice = document.getElementById('price-blue').value;
        const newGreenPrice = document.getElementById('price-green').value;
        const newRedPrice = document.getElementById('price-red').value;

        // Save the updated stock prices in localStorage
        stockPrices.blue = newBluePrice;
        stockPrices.green = newGreenPrice;
        stockPrices.red = newRedPrice;
        localStorage.setItem('stockPrices', JSON.stringify(stockPrices));

        alert('Цены на акции обновлены!');
    });

    // Character and player management functionality
    characters.forEach((character, index) => {
        const row = document.createElement('tr');
        const player = players.find(p => p.character === character.name);
        const playerName = player ? player.name : '';
        const backgroundColor = character.background;

        row.innerHTML = `
            <td style="background-color: ${backgroundColor};">${character.name}</td>
            <td>${playerName ? playerName : 'Свободен'}</td>
            <td><input type="text" id="character-name-${index}" value="${characterNames[character.name] || ''}" placeholder="Имя персонажа"></td>
            <td><input type="number" id="money-${index}" value="${player ? player.money : 0}" placeholder="Деньги"></td>
            <td><label>🔵 Синие акции:</label> <input type="number" id="blue-stocks-${index}" value="${player ? player.stocks.blue : 0}" placeholder="Синие акции"></td>
            <td><label>🟢 Зеленые акции:</label> <input type="number" id="green-stocks-${index}" value="${player ? player.stocks.green : 0}" placeholder="Зеленые акции"></td>
            <td><label>🔴 Красные акции:</label> <input type="number" id="red-stocks-${index}" value="${player ? player.stocks.red : 0}" placeholder="Красные акции"></td>
            <td><button id="set-name-${index}">Обновить</button></td>
        `;

        playerList.appendChild(row);

        document.getElementById(`set-name-${index}`).addEventListener('click', function() {
            const characterName = document.getElementById(`character-name-${index}`).value;
            const money = parseInt(document.getElementById(`money-${index}`).value);
            const blueStocks = parseInt(document.getElementById(`blue-stocks-${index}`).value);
            const greenStocks = parseInt(document.getElementById(`green-stocks-${index}`).value);
            const redStocks = parseInt(document.getElementById(`red-stocks-${index}`).value);

            // Set the name and update stocks for the character in localStorage
            if (!player) {
                players.push({
                    name: characterName,
                    character: character.name,
                    money: money,
                    stocks: {
                        blue: blueStocks,
                        green: greenStocks,
                        red: redStocks
                    }
                });
            } else {
                player.name = characterName;
                player.money = money;
                player.stocks.blue = blueStocks;
                player.stocks.green = greenStocks;
                player.stocks.red = redStocks;
            }

            characterNames[character.name] = characterName;
            localStorage.setItem('players', JSON.stringify(players));
            localStorage.setItem('characterNames', JSON.stringify(characterNames));

            alert(`Данные для ${character.name} обновлены.`);
        });
    });

    // Display free characters
    const takenCharacters = players.map(player => player.character);
    const availableCharacters = characters.filter(character => !takenCharacters.includes(character.name));

    availableCharacters.forEach(char => {
        const li = document.createElement('li');
        li.innerText = char.name;
        li.style.backgroundColor = char.background;
        freeCharacters.appendChild(li);
    });

    // Display market orders
    document.getElementById('view-orders-btn').addEventListener('click', function() {
        ordersList.innerHTML = ''; // Clear previous order list

        if (orders.length === 0) {
            ordersList.innerHTML = '<p>На данный момент ордеров нет.</p>';
            return;
        }

        orders.forEach((order, index) => {
            const orderDiv = document.createElement('div');
            const color = order.color === 'blue' ? '🔵' : order.color === 'green' ? '🟢' : '🔴';
            const seller = players.find(p => p.name === order.seller);

            orderDiv.innerHTML = `
                <p>Ордер ${index + 1}: Продавец: ${order.seller} (${seller ? seller.character : 'неизвестный'}), ${order.quantity} ${color} акций, Сумма: $${order.total}</p>
                <button id="delete-order-${index}">Удалить ордер</button>
            `;
            ordersList.appendChild(orderDiv);

            document.getElementById(`delete-order-${index}`).addEventListener('click', function() {
                if (seller) {
                    // Return the stocks to the seller
                    seller.stocks[order.color] += order.quantity;
                }

                // Remove the order from the market
                orders.splice(index, 1);
                localStorage.setItem('orders', JSON.stringify(orders));
                localStorage.setItem('players', JSON.stringify(players));

                alert('Ордер удален, акции возвращены продавцу.');
                ordersList.innerHTML = ''; // Clear the orders list
            });
        });
    });

    // Redirect to the "Общая информация" page
    document.getElementById('view-info-btn').addEventListener('click', function() {
        window.location.href = 'general.html';
    });
});

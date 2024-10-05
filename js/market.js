document.addEventListener('DOMContentLoaded', function() {
    const marketInfo = document.getElementById('market-info');
    const orderList = document.getElementById('order-list');
    const currentPlayer = localStorage.getItem('currentPlayer');
    let players = JSON.parse(localStorage.getItem('players')) || [];
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let stockPrices = JSON.parse(localStorage.getItem('stockPrices')) || { blue: 100, green: 100, red: 100 };

    // Display current stock prices
    marketInfo.innerHTML = `
        <h2>Цены на акции</h2>
        <p>🔵 Синие акции: $${stockPrices.blue}</p>
        <p>🟢 Зеленые акции: $${stockPrices.green}</p>
        <p>🔴 Красные акции: $${stockPrices.red}</p>
    `;

    // Handle placing a new order
    document.getElementById('order-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const color = document.getElementById('stock-color').value;
        const quantity = parseInt(document.getElementById('stock-quantity').value);
        const seller = players.find(p => p.name === currentPlayer);

        if (!quantity || quantity < 1) {
            alert('Пожалуйста, введите правильное количество акций.');
            return;
        }

        // Check if seller has enough stocks to place the order
        if (seller.stocks[color] < quantity) {
            alert('У вас недостаточно акций для продажи.');
            return;
        }

        // Deduct stocks from the seller
        seller.stocks[color] -= quantity;

        // Create an order with total value based on stock price
        const price = stockPrices[color]; 
        const total = price * quantity;

        orders.push({
            seller: currentPlayer,
            color: color,
            quantity: quantity,
            total: total,
        });

        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('players', JSON.stringify(players));
        alert('Ордер размещен!');
        displayOrders();
    });

    // Display all orders on the market
    function displayOrders() {
        orderList.innerHTML = '';
        orders.forEach((order, index) => {
            const colorEmoji = order.color === 'blue' ? '🔵' : order.color === 'green' ? '🟢' : '🔴';

            orderDiv = document.createElement('div');
            orderDiv.innerHTML = `
                <p>${colorEmoji} ${order.quantity} акций за $${order.total}, продавец: ${order.seller}</p>
                <button id="buy-order-${index}">Купить все</button>
            `;
            orderList.appendChild(orderDiv);

            document.getElementById(`buy-order-${index}`).addEventListener('click', function() {
                buyOrder(index);
            });
        });
    }

    // Handle buying an order
    function buyOrder(index) {
        const order = orders[index];
        const buyer = players.find(p => p.name === currentPlayer);
        const seller = players.find(p => p.name === order.seller);

        if (buyer.money < order.total) {
            alert('У вас недостаточно денег для покупки этого ордера.');
            return;
        }

        // Deduct money from buyer and add stocks
        buyer.money -= order.total;
        buyer.stocks[order.color] += order.quantity;

        // Add money to seller
        seller.money += order.total;

        // Remove the order from the market
        orders.splice(index, 1);

        // Update localStorage
        localStorage.setItem('players', JSON.stringify(players));
        localStorage.setItem('orders', JSON.stringify(orders));

        alert('Покупка успешно завершена!');
        displayOrders();
    }

    // Display initial orders
    displayOrders();

    // Handle the back button to return to character page
    document.getElementById('back-btn').onclick = function() {
        window.location.href = 'character.html';
    };
});

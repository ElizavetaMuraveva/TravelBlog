let users = {
    "Anna": [
        {
            destination: "Париж, Франция",
            cost: { accommodation: 500, tickets: 300, food: 200, entertainment: 150, total: 1150 },
            heritage: "Эйфелева башня, Лувр",
            places: "Рестораны, кафе на Монмартре, сады Тюильри"
        }
    ],
    "Ivan": [
        {
            destination: "Рим, Италия",
            cost: { accommodation: 400, tickets: 250, food: 180, entertainment: 100, total: 930 },
            heritage: "Колизей, Пантеон",
            places: "Площади, рестораны с традиционной кухней"
        }
    ],
    "Maria": [
        {
            destination: "Барселона, Испания",
            cost: { accommodation: 450, tickets: 200, food: 220, entertainment: 120, total: 990 },
            heritage: "Саграда Фамилия, Парк Гуэль",
            places: "Пляжи, ночные клубы, рестораны с тапас"
        }
    ]
};
let currentUser = null; 


window.onload = function() {
    Object.keys(users).forEach(username => {
        addUserToSelect(username);
    });
};


document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    
    if (username && !users[username]) {
        users[username] = [];
        addUserToSelect(username);
        currentUser = username;
        document.getElementById('username').value = '';
        alert(`Пользователь ${username} создан и выбран.`);
        displayEntries(); 
    } else if (users[username]) {
        alert('Пользователь с таким именем уже существует.');
    }
});


function addUserToSelect(username) {
    const select = document.getElementById('userSelect');
    const option = document.createElement('option');
    option.value = username;
    option.textContent = username;
    select.appendChild(option);
}


document.getElementById('userSelect').addEventListener('change', function() {
    currentUser = this.value;
    displayEntries(); 
});


document.getElementById('travelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!currentUser) {
        alert('Пожалуйста, выберите пользователя для добавления записи.');
        return;
    }

    const destination = document.getElementById('destination').value;
    const accommodation = Math.abs(Number(document.getElementById('accommodation').value)) || 0;
    const tickets = Math.abs(Number(document.getElementById('tickets').value)) || 0;
    const food = Math.abs(Number(document.getElementById('food').value)) || 0;
    const entertainment = Math.abs(Number(document.getElementById('entertainment').value)) || 0;
    const heritage = document.getElementById('heritage').value;
    const places = document.getElementById('places').value;

    const totalCost = accommodation + tickets + food + entertainment;

    if (!destination || !heritage || !places || totalCost <= 0) {
        alert('Пожалуйста, заполните все поля и введите корректную стоимость.');
        return;
    }

    const travelEntry = {
        destination,
        cost: { accommodation, tickets, food, entertainment, total: totalCost },
        heritage,
        places
    };

    
    users[currentUser].push(travelEntry);
    document.getElementById('travelForm').reset();
    displayEntries();
});


function displayEntries() {
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = ''; 

    if (!currentUser || !users[currentUser].length) {
        entriesDiv.innerHTML = '<p>Нет записей о путешествиях.</p>';
        return;
    }

    users[currentUser].forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');

        entryDiv.innerHTML = `
            <h3>${entry.destination}</h3>
            <p><strong>Стоимость:</strong> ${entry.cost.total} рублей (Жилье: ${entry.cost.accommodation}, Билеты: ${entry.cost.tickets}, Еда: ${entry.cost.food}, Развлечения: ${entry.cost.entertainment})</p>
            <p><strong>Культурное наследие:</strong> ${entry.heritage}</p>
            <p><strong>Места для посещения:</strong> ${entry.places}</p>
        `;

        entriesDiv.appendChild(entryDiv);
    });
}

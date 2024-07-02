document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const userGrid = document.getElementById('userGrid');
    const clearButton = document.getElementById('clearData');
    const articleMessage = document.getElementById('articleMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const age = parseInt(document.getElementById('age').value.trim(), 10);

        if (firstName && lastName && !isNaN(age)) {
            const userData = { firstName, lastName, age };
            addUserToGrid(userData);
            storeUserData(userData);
            form.reset();

            if (age >= 18) {
                showArticleMessage();
            }
        } else {
            alert('Please enter valid data.');
        }
    });

    clearButton.addEventListener('click', () => {
        localStorage.removeItem('users');
        userGrid.innerHTML = '<div class="grid-header">First Name</div><div class="grid-header">Last Name</div><div class="grid-header">Age</div>';
        hideArticleMessage();
    });

    function addUserToGrid(userData) {
        const firstNameDiv = document.createElement('div');
        firstNameDiv.className = 'grid-item';
        firstNameDiv.textContent = userData.firstName;

        const lastNameDiv = document.createElement('div');
        lastNameDiv.className = 'grid-item';
        lastNameDiv.textContent = userData.lastName;

        const ageDiv = document.createElement('div');
        ageDiv.className = 'grid-item';
        ageDiv.textContent = userData.age;

        userGrid.appendChild(firstNameDiv);
        userGrid.appendChild(lastNameDiv);
        userGrid.appendChild(ageDiv);
    }

    function storeUserData(userData) {
        const storedData = JSON.parse(localStorage.getItem('users')) || [];
        storedData.push(userData);
        localStorage.setItem('users', JSON.stringify(storedData));
    }

    function loadUserData() {
        const storedData = JSON.parse(localStorage.getItem('users')) || [];
        storedData.forEach(userData => addUserToGrid(userData));
    }

    loadUserData();

    document.getElementById('sortFirstName').addEventListener('click', () => sortGrid(0));
    document.getElementById('sortLastName').addEventListener('click', () => sortGrid(1));
    document.getElementById('sortAge').addEventListener('click', () => sortGrid(2));

    function sortGrid(columnIndex) {
        const gridItems = Array.from(userGrid.getElementsByClassName('grid-item'));
        const rows = [];

        for (let i = 0; i < gridItems.length; i += 3) {
            rows.push([gridItems[i], gridItems[i + 1], gridItems[i + 2]]);
        }

        rows.sort((a, b) => {
            const cellA = a[columnIndex].innerText.toLowerCase();
            const cellB = b[columnIndex].innerText.toLowerCase();

            if (columnIndex === 2) {
                return parseInt(cellA) - parseInt(cellB);
            }

            if (cellA < cellB) {
                return -1;
            }
            if (cellA > cellB) {
                return 1;
            }
            return 0;
        });

        userGrid.innerHTML = '<div class="grid-header">First Name</div><div class="grid-header">Last Name</div><div class="grid-header">Age</div>';

        rows.forEach(row => {
            row.forEach(cell => userGrid.appendChild(cell));
        });
    }

    function showArticleMessage() {
        articleMessage.classList.remove('hidden');
    }

    function hideArticleMessage() {
        articleMessage.classList.add('hidden');
    }
});
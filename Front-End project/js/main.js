document.addEventListener('DOMContentLoaded', function () {
    // Event listener for "Toevoegen"-knop
    document.getElementById('js--add').addEventListener('click', function () {
        addPassword(); // Aanroep van de functie om een wachtwoord toe te voegen
    });

    // Add event listener for the "Show All" button
    var showAllButton = document.getElementById('show-all');
    showAllButton.addEventListener('mousedown', function () {
        toggleAllPasswords('text');  // Toont alle wachtwoorden als tekst
    });
    showAllButton.addEventListener('mouseup', function () {
        toggleAllPasswords('password');  // Verbergt alle wachtwoorden weer
    });

    // Function to toggle all passwords between visible and hidden
    function toggleAllPasswords(type) {
        var passwords = document.querySelectorAll('.SafetyLock__password');
        passwords.forEach(function (password) {
            password.type = type; // Wijzigt de type van elk wachtwoord naar 'text' of 'password'
        });
    }

    // Function to add a new password entry
    function addPassword() {
        var usernameInput = document.getElementById('username').value.trim();
        var passwordInput = document.getElementById('password').value.trim();

        // Controleer of er al 4 wachtwoorden zijn toegevoegd
        var passwordList = document.querySelectorAll('.SafetyLock__entry');
        if (passwordList.length >= 4) {
            alert('Je kunt maximaal 4 wachtwoorden toevoegen.'); // Waarschuwing bij 4 wachtwoorden
            return; // Stop de uitvoering van de functie
        }

        // Controleert of de invoervelden zijn ingevuld
        if (!usernameInput || !passwordInput) {
            alert('Vul zowel de gebruikersnaam als het wachtwoord in.');
            return;
        }

        var entry = createEntry(usernameInput, passwordInput); // Maak een nieuwe invoer
        document.querySelector('.SafetyLock__list').appendChild(entry); // Voeg de invoer toe aan de lijst
        resetInputs(); // Reset de invoervelden naar lege waarden
    }

    // Functie voor het creëren van een nieuwe invoer
    function createEntry(username, passwordValue) {
        var entry = document.createElement('div'); // Maak een nieuwe div voor de invoer
        entry.classList.add('SafetyLock__entry'); // Voeg een klasse toe voor styling

        var url = document.createElement('span'); // Maak een span voor de gebruikersnaam
        url.textContent = username; // Stel de tekst in op de gebruikersnaam
        entry.appendChild(url); // Voeg de gebruikersnaam toe aan de invoer

        var password = document.createElement('input'); // Maak een input voor het wachtwoord
        password.type = 'password'; // Zet het type op 'password' zodat het verborgen is
        password.value = passwordValue; // Stel de waarde in op het ingevoerde wachtwoord
        password.classList.add('SafetyLock__password'); // Voeg een klasse toe voor selectie
        entry.appendChild(password); // Voeg het wachtwoordveld toe aan de invoer

        // Show button to temporarily reveal the password
        var showButton = document.createElement('button'); // Maak een knop om het wachtwoord te tonen
        showButton.textContent = 'Show'; // Stel de knoptekst in
        showButton.classList.add('show-btn'); // Voeg een klasse toe voor styling
        showButton.addEventListener('mousedown', function () {
            password.type = 'text'; // Zet het type op 'text' om het wachtwoord te tonen
        });
        showButton.addEventListener('mouseup', function () {
            password.type = 'password'; // Zet het type terug op 'password' om het te verbergen
        });
        entry.appendChild(showButton); // Voeg de show-knop toe aan de invoer

        // Delete button to remove the entry
        var deleteButton = document.createElement('button'); // Maak een verwijderknop
        deleteButton.textContent = 'Verwijder'; // Stel de knoptekst in
        deleteButton.classList.add('delete-btn'); // Voeg een klasse toe voor styling
        deleteButton.addEventListener('click', function () {
            entry.remove(); // Verwijder de invoer uit de DOM
        });
        entry.appendChild(deleteButton); // Voeg de verwijderknop toe aan de invoer

        return entry; // Retourneer de gemaakte invoer
    }

    // Functie om invoervelden te resetten
    function resetInputs() {
        document.getElementById('username').value = ''; // Reset gebruikersnaamveld
        document.getElementById('password').value = ''; // Reset wachtwoordveld
    }

    // Voeg de event listener toe voor de "Fab" knop
    var fabButton = document.getElementById('js--fab');
    fabButton.addEventListener('click', function () {
        var safetyLock = document.querySelector('.SafetyLock');
        var safetyLockExtra = document.querySelector('.SafetyLock__extra');

        // Wissel de volgorde van de elementen in de DOM
        if (safetyLock.nextElementSibling === safetyLockExtra) {
            safetyLock.parentNode.insertBefore(safetyLockExtra, safetyLock); // Verplaats SafetyLock__extra vóór SafetyLock
        } else {
            safetyLock.parentNode.insertBefore(safetyLock, safetyLockExtra); // Verplaats SafetyLock vóór SafetyLock__extra
        }
    });
});


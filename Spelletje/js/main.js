function reverseWord() {
    var word = document.getElementById('wordInput').value;
    var reversed = word.split('').reverse().join('');
    var reversedElement = document.getElementById('reversedWord');
    var palindromeElement = document.getElementById('palindromeCheck');

    reversedElement.textContent = "Omgedraaid: " + reversed;

    if (word === reversed) {
        palindromeElement.textContent = "Dit is een palindroom!";
    } else {
        palindromeElement.textContent = "Dit is geen palindroom.";
    }
}


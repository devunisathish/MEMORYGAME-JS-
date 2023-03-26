// function to shuffle an array
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // while there remain elements to shuffle
    while (0 !== currentIndex) {

        // pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// game logic
(function () {
    const cardsArray = [
        {
            name: 'card1',
            img: 'https://picsum.photos/200',
        },
        {
            name: 'card2',
            img: 'https://picsum.photos/201',
        },
        {
            name: 'card3',
            img: 'https://picsum.photos/202',
        },
        {
            name: 'card4',
            img: 'https://picsum.photos/203',
        },
        {
            name: 'card5',
            img: 'https://picsum.photos/204',
        },
        {
            name: 'card6',
            img: 'https://picsum.photos/205',
        },
    {
        name: 'card7',
        img: 'https://picsum.photos/206',
    },
    {
        name: 'card8',
        img: 'https://picsum.photos/207',
    },
    {
        name: 'card9',
        img: 'https://picsum.photos/208',
    },
    {
        name: 'card10',
        img: 'https://picsum.photos/209',
    },
    {
        name: 'card11',
        img: 'https://picsum.photos/210',
    },
    {
        name: 'card12',
        img: 'https://picsum.photos/211',
    }
];

// double the cards array to create pairs
const cards = cardsArray.concat(cardsArray);

// shuffle the cards
shuffle(cards);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// create the game board
const container = document.querySelector('.container');
cards.forEach(card => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.name = card.name;

    const img = document.createElement('img');
    img.src = card.img;
    img.alt = card.name;

    const p = document.createElement('p');
    p.textContent = card.name;

    div.appendChild(img);
    div.appendChild(p);
    container.appendChild(div);
});

// function to flip a card
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('active');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // second click
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }
}

// function to check if two flipped cards match
function checkForMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        // cards match
        disableCards();
    } else {
        // cards don't match
        unflipCards();
    }
}

// function to disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// function to unflip unmatched cards
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('active');
        secondCard.classList.remove('active');

        resetBoard();
    }, 1000);
}

// function to reset the board after a move
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// add click event listeners to cards
const cardElements = document.querySelectorAll('.card');
cardElements.forEach(card => card.addEventListener('click', flipCard));
})();

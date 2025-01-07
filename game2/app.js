document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
    { name: 'fries', img: 'images/fries.png' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'pizza', img: 'images/pizza.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'fries', img: 'images/fries.png' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'pizza', img: 'images/pizza.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'hotdog', img: 'images/hotdog.png' }
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  function createBoard() {
    cardArray.forEach((_, i) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-id', i);

      const cardFront = document.createElement('div');
      cardFront.classList.add('card-front');

      const cardBack = document.createElement('div');
      cardBack.classList.add('card-back');
      cardBack.style.backgroundImage = "url('images/blank.png')";

      card.appendChild(cardFront);
      card.appendChild(cardBack);
      card.addEventListener('click', flipCard);

      grid.appendChild(card);
    });
  }

  function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const [optionOneId, optionTwoId] = cardsChosenId;

    if (optionOneId == optionTwoId) {
      alert('You clicked the same card!');
    } else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].classList.add('matched');
      cards[optionTwoId].classList.add('matched');
      cardsWon.push(cardsChosen);
    } else {
      setTimeout(() => {
        cards[optionOneId].classList.remove('flipped');
        cards[optionTwoId].classList.remove('flipped');
      }, 500);
    }

    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;

    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = 'Congratulations! You found them all!';
    }
  }

  function flipCard() {
    const cardId = this.getAttribute('data-id');
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);

    this.querySelector('.card-front').style.backgroundImage = `url('${cardArray[cardId].img}')`;

    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  createBoard();
});

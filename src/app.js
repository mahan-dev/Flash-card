// JAVASCRIPT

// State
let cards = [];

// DOM Elements
const addCardForm = document.getElementById('add-card-form');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const cardContainer = document.getElementById('card-container');

// Functions
function addCard(event) {
    event.preventDefault();
    
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (question && answer) {
        const newCard = {
            id: Date.now(),
            question: question,
            answer: answer,
            learned: false
        };
        
        cards.push(newCard);
        renderCards();
        
        // Clear form inputs
        addCardForm.reset();
    }
}

function renderCards() {
    cardContainer.innerHTML = '';

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        if (card.learned) {
            cardElement.classList.add('learned');
        }
        cardElement.dataset.id = card.id;

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = card.question;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.textContent = card.answer;

        const cardButtons = document.createElement('div');
        cardButtons.classList.add('card-buttons');

        const learnedButton = document.createElement('button');
        learnedButton.textContent = card.learned ? 'Unlearn' : 'Learned';
        learnedButton.classList.add('learned');
        learnedButton.addEventListener('click', (e) => {
            e.stopPropagation();
            markLearned(card.id);
        });

        cardButtons.appendChild(learnedButton);

        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);
        cardElement.appendChild(cardButtons);
        
        cardElement.addEventListener('click', () => flipCard(cardElement));
        
        cardContainer.appendChild(cardElement);
    });
}

function flipCard(cardElement) {
    cardElement.classList.toggle('flipped');
}

function markLearned(id) {
    const card = cards.find(c => c.id === id);
    if (card) {
        card.learned = !card.learned;
        renderCards();
    }
}

// Event Listeners
addCardForm.addEventListener('submit', addCard);

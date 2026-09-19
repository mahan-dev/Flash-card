/* JAVASCRIPT */

// State
let cards = [];
let currentFilter = 'all';

// DOM Elements
const addCardForm = document.getElementById('add-card-form');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const cardContainer = document.getElementById('card-container');
const filterButtons = document.querySelectorAll('.filter-btn');

// LocalStorage key
const STORAGE_KEY = 'flashcards';

// --- Storage Functions ---

/**
 * Load cards from localStorage into the state.
 */
function loadCards() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                cards = parsed;
            }
        } catch (e) {
            console.error('Failed to parse stored cards:', e);
        }
    }
}

/**
 * Persist current state of cards to localStorage.
 */
function saveCards() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
        console.error('Failed to save cards:', e);
    }
}

// --- State Functions ---

function createCard(question, answer) {
    return {
        id: Date.now(),
        question: question,
        answer: answer,
        learned: false
    };
}

function markLearned(id) {
    const card = cards.find(c => c.id === id);
    if (card) {
        card.learned = !card.learned;
        saveCards();
    }
}

function setFilter(filter) {
    currentFilter = filter;
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
}

function getFilteredCards() {
    return cards.filter(card => {
        if (currentFilter === 'learned') return card.learned;
        if (currentFilter === 'unlearned') return !card.learned;
        return true; // 'all'
    });
}

// --- DOM Functions ---

function createCardElement(card) {
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
        renderCards();
    });

    cardButtons.appendChild(learnedButton);

    cardElement.appendChild(cardFront);
    cardElement.appendChild(cardBack);
    cardElement.appendChild(cardButtons);

    cardElement.addEventListener('click', () => flipCard(cardElement));

    return cardElement;
}

function renderCards() {
    cardContainer.innerHTML = '';
    const filteredCards = getFilteredCards();
    filteredCards.forEach(card => {
        cardContainer.appendChild(createCardElement(card));
    });
}

function flipCard(cardElement) {
    cardElement.classList.toggle('flipped');
}

// --- Event Handlers ---

function addCard(event) {
    event.preventDefault();

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (question && answer) {
        cards.push(createCard(question, answer));
        saveCards();
        renderCards();
        addCardForm.reset();
    }
}

function handleFilterClick(event) {
    const filter = event.target.dataset.filter;
    if (filter) {
        setFilter(filter);
        renderCards();
    }
}

// --- Initialization ---

addCardForm.addEventListener('submit', addCard);
filterButtons.forEach(btn => {
    btn.addEventListener('click', handleFilterClick);
});

loadCards();
renderCards();

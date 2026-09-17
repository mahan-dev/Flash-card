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
        
        // Clear form inputs
        addCardForm.reset();
    }
}

// Event Listeners
addCardForm.addEventListener('submit', addCard);

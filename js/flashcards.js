const cardWord = document.querySelector("#card-word");
const translation = document.querySelector("#translation");
const cardProgress = document.querySelector(".card-progress");

const revealButton = document.querySelector("#reveal-button");
const nextButton = document.querySelector("#next-button");
const previousButton = document.querySelector("#previous-button");

const reviewButton = document.getElementById("review-button");
const shuffleButton = document.getElementById("shuffle-button");
const smartReviewMessage = document.getElementById("smart-review-message");
const smartReviewButton = document.getElementById("smart-review-button");
const playAudioButton = document.getElementById("play-audio-button");
const categorySelect = document.getElementById("category-select");
const studyDirectionSelect = document.getElementById("study-direction-select");

const difficultButton = document.getElementById("difficult-button");
const correctAnswerButton = document.getElementById("correct-answer-button");
const incorrectAnswerButton = document.getElementById("incorrect-answer-button");
const answerFeedback = document.getElementById("answer-feedback");

let isRevealed = false;

let studyDirection = "english-spanish";
const savedStudyDirection = localStorage.getItem("studyDirection");

if (savedStudyDirection !== null) {
    studyDirection = savedStudyDirection;
    studyDirectionSelect.value = savedStudyDirection;
}

studyDirectionSelect.addEventListener("change", () => {
    studyDirection = studyDirectionSelect.value;
    localStorage.setItem("studyDirection", studyDirection);
});

let flashcardList = [
    {
        word: "Apple",
        translation: "Manzana",
        category: "Food & Drinks",
        audio: "../audio/apple.ogg"
    },
    {
        word: "House",
        translation: "Casa",
        category: "Daily Life"
    },
    {
        word: "Dog",
        translation: "Perro",
        category: "Animals"
    },
    {
        word: "Water",
        translation: "Agua",
        category: "Food & Drinks"
    },
    {
        word: "Book",
        translation: "Libro",
        category: "School & Work"
    }
];

let difficultFlashcards = [];

const savedDifficultFlashcards = localStorage.getItem("difficultFlashcards");

if (savedDifficultFlashcards !== null) {
    const savedWords = JSON.parse(savedDifficultFlashcards);

    difficultFlashcards = flashcardList.filter(
        flashcard => savedWords.includes(flashcard.word)
    );
}

let currentCard = 0;
let flashcardOrder = flashcardList.map((_, index) => index);
let selectedCategory = "All Categories";
let filteredFlashcards = [...flashcardList];

correctAnswerButton.addEventListener("click", () => {

    const currentFlashcard = filteredFlashcards[flashcardOrder[currentCard]];

    registerAnswer(null, true, currentFlashcard.word, true);

    answerFeedback.textContent = "✓ Answer recorded.";
    answerFeedback.className = "correct";
});

incorrectAnswerButton.addEventListener("click", () => {

    const currentFlashcard = filteredFlashcards[flashcardOrder[currentCard]];

    registerAnswer(null, false, currentFlashcard.word, true);

    answerFeedback.textContent = "✗ Keep practicing this word.";
    answerFeedback.className = "incorrect";
});

difficultButton.addEventListener("click", () => {
    const currentFlashcard = filteredFlashcards[flashcardOrder[currentCard]];

    if (difficultFlashcards.includes(currentFlashcard)) {
        difficultFlashcards = difficultFlashcards.filter(
            flashcard => flashcard !== currentFlashcard
        );

        difficultButton.textContent = "⭐ Difficult";
    } else {
        difficultFlashcards.push(currentFlashcard);

        difficultButton.textContent = "⭐ Difficult ✓";
    }

    localStorage.setItem(
        "difficultFlashcards",
        JSON.stringify(difficultFlashcards.map(flashcard => flashcard.word))
    );
});

function getSmartReviewWords() {

    const smartReviewWords = [];

    for (const word in progressData.vocabularyStats) {

        const stats = progressData.vocabularyStats[word];

        if (stats.incorrect > stats.correct) {
            const flashcard = flashcardList.find(
                flashcard => flashcard.word === word
            );

            if (flashcard) {
                smartReviewWords.push(flashcard);
            }
        }
    }

    return smartReviewWords;
}

function updateCardWord() {

    const currentFlashcard = filteredFlashcards[flashcardOrder[currentCard]];

    if (studyDirection === "english-spanish") {
        cardWord.textContent = currentFlashcard.word;
    } else {
        cardWord.textContent = currentFlashcard.translation;
    }
}

function updateDifficultButton() {
    const currentFlashcard = filteredFlashcards[flashcardOrder[currentCard]];

    if (difficultFlashcards.includes(currentFlashcard)) {
        difficultButton.textContent = "⭐ Difficult ✓";
    } else {
        difficultButton.textContent = "⭐ Difficult";
    }
}

function filterFlashcards() {
    if (selectedCategory === "All Categories") {
        filteredFlashcards = [...flashcardList];
    } else {
        filteredFlashcards = flashcardList.filter(
            flashcard => flashcard.category === selectedCategory
        );
    }

    flashcardOrder = filteredFlashcards.map((_, index) => index);
    currentCard = 0;
}

function updateNavigationButtons() {

    previousButton.disabled = currentCard === 0;
    nextButton.disabled = currentCard === filteredFlashcards.length - 1;

    playAudioButton.disabled = !filteredFlashcards[flashcardOrder[currentCard]].audio;

}

function shuffleFlashcards() {
    flashcardOrder = filteredFlashcards.map((_, index) => index);
    flashcardOrder.sort(() => Math.random() - 0.5);
    currentCard = 0;

    updateCardWord();
    cardProgress.textContent = `Card ${currentCard + 1} / ${filteredFlashcards.length}`;

    translation.textContent = "";
    isRevealed = false;

    updateNavigationButtons();
    updateDifficultButton();
}

updateDifficultButton();
updateNavigationButtons();

cardProgress.textContent = `Card ${currentCard + 1} / ${filteredFlashcards.length}`;

updateCardWord();

revealButton.addEventListener("click", function () {

    const currentFlashcard = filteredFlashcards[flashcardOrder[currentCard]];

    if (isRevealed === false) {

        if (studyDirection === "english-spanish") {
            translation.textContent = currentFlashcard.translation;
        } else {
            translation.textContent = currentFlashcard.word;
        }

        isRevealed = true;
        revealButton.textContent = "Hide";

    } else {

        translation.textContent = "";
        isRevealed = false;
        revealButton.textContent = "Reveal";
    }
});

nextButton.addEventListener("click", function () {

    if (currentCard < filteredFlashcards.length - 1) {
        currentCard++;
    }

    updateCardWord();
    cardProgress.textContent = `Card ${currentCard + 1} / ${filteredFlashcards.length}`;

    translation.textContent = "";
    isRevealed = false;
    revealButton.textContent = "Reveal";

    updateNavigationButtons();
    updateDifficultButton();

});

previousButton.addEventListener("click", function () {

    if (currentCard > 0) {
        currentCard--;
    }

    updateCardWord();
    cardProgress.textContent = `Card ${currentCard + 1} / ${filteredFlashcards.length}`;
    translation.textContent = "";
    isRevealed = false;
    revealButton.textContent = "Reveal";

    updateNavigationButtons();
    updateDifficultButton();

});

shuffleButton.addEventListener("click", () => {
    shuffleFlashcards();
});

playAudioButton.addEventListener("click", () => {
    const currentFlashcard = filteredFlashcards[flashcardOrder[currentCard]];

    if (currentFlashcard.audio) {
        const audio = new Audio(currentFlashcard.audio);
        audio.play();
    }
});

categorySelect.addEventListener("change", () => {
    selectedCategory = categorySelect.value;
    filterFlashcards();

    updateCardWord();
    cardProgress.textContent = `Card ${currentCard + 1} / ${filteredFlashcards.length}`;

    translation.textContent = "";
    isRevealed = false;

    updateNavigationButtons();
    updateDifficultButton();
});

reviewButton.addEventListener("click", () => {
    if (difficultFlashcards.length === 0) {
        return;
    }

    filteredFlashcards = [...difficultFlashcards];
    flashcardOrder = filteredFlashcards.map((_, index) => index);
    currentCard = 0;

    updateCardWord();
    cardProgress.textContent = `Card ${currentCard + 1} / ${filteredFlashcards.length}`;
    translation.textContent = "";
    isRevealed = false;
    revealButton.textContent = "Reveal";

    updateNavigationButtons();
    updateDifficultButton();
});

smartReviewButton.addEventListener("click", () => {

    const smartReviewWords = getSmartReviewWords();

    if (smartReviewWords.length === 0) {
        smartReviewMessage.textContent =
        "🧠 No words need extra practice right now.";

        return;
    }

    smartReviewMessage.textContent = "";

    filteredFlashcards = [...smartReviewWords];
    flashcardOrder = filteredFlashcards.map((_, index) => index);
    currentCard = 0;

    updateCardWord();

    cardProgress.textContent = `Card ${currentCard + 1} / ${filteredFlashcards.length}`;

    translation.textContent = "";
    isRevealed = false;
    revealButton.textContent = "Reveal";

    updateNavigationButtons();
    updateDifficultButton();
});
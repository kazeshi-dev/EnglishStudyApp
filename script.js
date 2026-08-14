console.log("English Study App loaded!");

const flashcards = document.querySelector("#flashcards");
const flashcardsSection = document.querySelector("#flashcards-section");

const revealButton = document.querySelector("#reveal-button");
const nextButton = document.querySelector("#next-button");
const previousButton = document.querySelector("#previous-button");

const cardWord = document.querySelector("#card-word");
const translation = document.querySelector("#translation");

let isRevealed = false;

let flashcard = {
    word: "Apple",
    translation: "Manzana"
};

let flashcard2 = {
    word: "House",
    translation: "Casa"
};

let flashcardList = [];

flashcardList.push(flashcard);
flashcardList.push(flashcard2);

let currentCard = 0;

cardWord.textContent = flashcardList[currentCard].word;

revealButton.addEventListener("click", function () {

    if (isRevealed === false) {

        translation.textContent = flashcardList[currentCard].translation;
        isRevealed = true;

    } else {

        translation.textContent = "";
        isRevealed = false;

    }

});

nextButton.addEventListener("click", function () {

    if (currentCard < flashcardList.length - 1) {
        currentCard++;
    }

    cardWord.textContent = flashcardList[currentCard].word;

    translation.textContent = "";
    isRevealed = false;

});

previousButton.addEventListener("click", function () {

    if (currentCard > 0) {
        currentCard--;
    }

    cardWord.textContent = flashcardList[currentCard].word;
    translation.textContent = "";
    isRevealed = false;

});

flashcards.addEventListener("click", function () {
    flashcardsSection.style.display = "block";
});
console.log("English Study App loaded!");

const flashcards = document.querySelector("#flashcards");

const flashcardsSection = document.querySelector("#flashcards-section");

const revealButton = document.querySelector("#reveal-button");

const translation = document.querySelector("#translation");

const wordElement = document.getElementById("word");

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

wordElement.textContent = flashcardList[currentCard].word;

revealButton.addEventListener("click", function () {

    if (isRevealed === false) {

        translation.textContent = flashcardList[currentCard].translation;
        isRevealed = true;

    } else {

        translation.textContent = "";
        isRevealed = false;

    }

});

flashcards.addEventListener("click", function () {
    flashcardsSection.style.display = "block";
});
console.log("English Study App loaded!");

const flashcards = document.querySelector("#flashcards");
const flashcardsSection = document.querySelector("#flashcards-section");

const revealButton = document.querySelector("#reveal-button");
const nextButton = document.querySelector("#next-button");
const previousButton = document.querySelector("#previous-button");

const cardWord = document.querySelector("#card-word");
const translation = document.querySelector("#translation");
const cardProgress = document.querySelector(".card-progress");

let isRevealed = false;

let flashcardList = [
    {
        word: "Apple",
        translation: "Manzana"
    },
    {
        word: "House",
        translation: "Casa"
    },
    {
        word: "Dog",
        translation: "Perro"
    },
    {
        word: "Water",
        translation: "Agua"
    },
    {
        word: "Book",
        translation: "Libro"
    }
];

let currentCard = 0;

cardProgress.textContent = `Card ${currentCard + 1} / ${flashcardList.length}`;

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
    cardProgress.textContent = `Card ${currentCard + 1} / ${flashcardList.length}`;

    translation.textContent = "";
    isRevealed = false;

});

previousButton.addEventListener("click", function () {

    if (currentCard > 0) {
        currentCard--;
    }

    cardWord.textContent = flashcardList[currentCard].word;
    cardProgress.textContent = `Card ${currentCard + 1} / ${flashcardList.length}`;
    translation.textContent = "";
    isRevealed = false;

});

flashcards.addEventListener("click", function () {

    flashcardsSection.style.display = "block";

    const targetPosition = flashcardsSection.offsetTop;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;

    const duration = 1000;
    let startTime = null;

    function animation(currentTime) {

        if (startTime === null) {
            startTime = currentTime;
        }

        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        window.scrollTo(0, startPosition + distance * progress);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }

    }

    requestAnimationFrame(animation);

});
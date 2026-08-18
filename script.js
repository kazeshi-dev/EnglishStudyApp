console.log("English Study App loaded!");

const flashcards = document.querySelector("#flashcards");
const flashcardsSection = document.querySelector("#flashcards-section");

const reading = document.querySelector("#reading");
const readingSection = document.querySelector("#reading-section");
const readingTitle = document.querySelector("#reading-title");
const readingText = document.querySelector("#reading-text");
const questionText = document.querySelector("#question-text");
const answerOptions = document.querySelector(".answer-options");
const checkButton = document.querySelector("#check-button");
const answerResult = document.querySelector("#answer-result");

checkButton.addEventListener("click", function () {

    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer === null) {

        answerResult.textContent = "Please select an answer.";

        return;

    }

    if (Number(selectedAnswer.value) === readingList[currentReading].correctAnswer) {

        answerResult.textContent = "Correct!";

    } else {

        answerResult.textContent = "Incorrect!";

    }

    });

reading.addEventListener("click", function () {
    readingSection.style.display = "block";
});

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

let readingList = [
    {
        title: "A Day at the Park",
        text: "John went to the park. He met his friends and they played football.",
        question: "What did John do?",
        answers: [
            "He played football",
            "He went home",
            "He studied"
        ],
        correctAnswer: 0
    }
];

let currentReading = 0;

readingTitle.textContent = readingList[currentReading].title;
readingText.textContent = readingList[currentReading].text;
questionText.textContent = readingList[currentReading].question;

readingList[currentReading].answers.forEach(function (answer, index) {

    const label = document.createElement("label");
    label.classList.add("answer-option");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = index;

    const span = document.createElement("span");
    span.textContent = answer;

    label.appendChild(input);
    label.appendChild(span);

    answerOptions.appendChild(label);

});

let currentCard = 0;

function updateNavigationButtons() {

    previousButton.disabled = currentCard === 0;
    nextButton.disabled = currentCard === flashcardList.length - 1;

}

updateNavigationButtons();

cardProgress.textContent = `Card ${currentCard + 1} / ${flashcardList.length}`;

cardWord.textContent = flashcardList[currentCard].word;


revealButton.addEventListener("click", function () {

    if (isRevealed === false) {

        translation.textContent = flashcardList[currentCard].translation;
        isRevealed = true;
        revealButton.textContent = "Hide";

    } else {

        translation.textContent = "";
        isRevealed = false;
        revealButton.textContent = "Reveal";

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
    revealButton.textContent = "Reveal";

     updateNavigationButtons();

});

previousButton.addEventListener("click", function () {

    if (currentCard > 0) {
        currentCard--;
    }

    cardWord.textContent = flashcardList[currentCard].word;
    cardProgress.textContent = `Card ${currentCard + 1} / ${flashcardList.length}`;
    translation.textContent = "";
    isRevealed = false;

    updateNavigationButtons();

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
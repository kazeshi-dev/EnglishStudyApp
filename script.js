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
const readingProgress = document.querySelector(".reading-progress");

const previousReadingButton = document.querySelector("#previous-reading-button");
const nextReadingButton = document.querySelector("#next-reading-button");

function updateReadingNavigationButtons() {

    previousReadingButton.disabled = currentReading === 0;
    nextReadingButton.disabled = currentReading === readingList.length - 1;

}

nextReadingButton.addEventListener("click", function () {

    if (currentReading < readingList.length - 1) {
        currentReading++;
    }

    updateReading();
    updateReadingNavigationButtons();

});

previousReadingButton.addEventListener("click", function () {

    if (currentReading > 0) {
        currentReading--;
    }

    updateReading();
    updateReadingNavigationButtons();

});

checkButton.addEventListener("click", function () {

    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer === null) {

        answerResult.textContent = "Please select an answer.";
        answerResult.className = "no-answer";

        return;

    }

    if (Number(selectedAnswer.value) === readingList[currentReading].correctAnswer) {

        answerResult.textContent = "Correct!";
        answerResult.className = "correct";

    } else {

        answerResult.textContent = "Incorrect!";
        answerResult.className = "incorrect";

    }

});

reading.addEventListener("click", function () {

    readingSection.style.display = "block";

    const targetPosition = readingSection.offsetTop;
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
    },

    {
        title: "A Day at School",
        text: "Maria went to school early. She studied English and talked with her teacher.",
        question: "What did Maria study?",
        answers: [
            "English",
            "Math",
            "History"
        ],
        correctAnswer: 0
    },

    {
        title: "A Morning Walk",
        text: "David woke up early and went for a walk. He enjoyed the fresh air and saw many birds.",
        question: "What did David see?",
        answers: [
            "Many birds",
            "His teacher",
            "A football game"
        ],
        correctAnswer: 0
    },

    {
        title: "A Rainy Day",
        text: "Sofia stayed at home because it was raining. She read a book and drank some hot chocolate.",
        question: "Why did Sofia stay at home?",
        answers: [
            "Because it was raining",
            "Because she was studying",
            "Because she went to the park"
        ],
        correctAnswer: 0
    },

    {
        title: "A Visit to the Library",
        text: "Lucas visited the library after school. He found a book about animals and read it quietly.",
        question: "What kind of book did Lucas find?",
        answers: [
            "A book about animals",
            "A book about sports",
            "A book about music"
        ],
        correctAnswer: 0
    }

];

let currentReading = 0;
updateReadingNavigationButtons();

function updateReading() {

    readingTitle.textContent = readingList[currentReading].title;
    readingText.textContent = readingList[currentReading].text;
    questionText.textContent = readingList[currentReading].question;

    readingProgress.textContent = `Reading ${currentReading + 1} / ${readingList.length}`;

    answerOptions.innerHTML = "";

    answerResult.textContent = "";
    answerResult.className = "";

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

}

updateReading();

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
    revealButton.textContent = "Reveal";

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
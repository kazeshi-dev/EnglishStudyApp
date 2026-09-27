console.log("English Study App loaded!");

let progressData = {
    completed: 0,
    correct: 0,
    incorrect: 0,
    completedExercises: [],
    vocabularyStats: {}
};

const savedProgress = localStorage.getItem("progressData");

if (savedProgress !== null) {
    progressData = JSON.parse(savedProgress);
}

if (!progressData.vocabularyStats) {
    progressData.vocabularyStats = {};
}

function registerAnswer(exerciseId, isCorrect, vocabularyWord = null, allowRepeat = false) {

    if (!allowRepeat) {

        if (progressData.completedExercises.includes(exerciseId)) {
            return;
        }

        progressData.completedExercises.push(exerciseId);
    }

    progressData.completed++;

    if (isCorrect) {
        progressData.correct++;
    } else {
        progressData.incorrect++;
    }

    if (vocabularyWord !== null) {

        if (!progressData.vocabularyStats[vocabularyWord]) {
            progressData.vocabularyStats[vocabularyWord] = {
                correct: 0,
                incorrect: 0
            };
        }

        if (isCorrect) {
            progressData.vocabularyStats[vocabularyWord].correct++;
        } else {
            progressData.vocabularyStats[vocabularyWord].incorrect++;
        }
    }

    localStorage.setItem("progressData", JSON.stringify(progressData));

}
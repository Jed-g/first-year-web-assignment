const data = [{
    image: "./img/quiz/1.jpg",
    question: "Question no. 1",
    answers: [
        "Answer 1 Question 1",
        "Answer 2 Question 1",
        "Answer 3 Question 1",
        "Answer 4 Question 1",
    ],
    correct: 3,
},
{
    image: "./img/quiz/2.jpg",
    question: "Question no. 2",
    answers: [
        "Answer 1 Question 2",
        "Answer 2 Question 2",
        "Answer 3 Question 2",
        "Answer 4 Question 2",
    ],
    correct: 2,
},
{
    image: "./img/quiz/3.jpg",
    question: "Question no. 3",
    answers: [
        "Answer 1 Question 3",
        "Answer 2 Question 3",
        "Answer 3 Question 3",
        "Answer 4 Question 3",
    ],
    correct: 0,
},
];

const rightButton = document.querySelector("#right-button-nav");
rightButton.addEventListener("click", nextQuestion);

const leftButton = document.querySelector("#left-button-nav");
leftButton.addEventListener("click", previousQuestion);

const questionNumberIndicator = document.querySelector("main h1");
const image = document.querySelector("main img");
const question = document.querySelector("h2");
const answerButtonsArray = document.querySelectorAll(".answers p");

let currentQuestion = 0;

function nextQuestion() {
    document.body.style.overflow = "hidden";

    currentQuestion++;
    if (currentQuestion >= data.length) {
        currentQuestion = 0;
    }

    rightButton.removeEventListener("click", nextQuestion);
    leftButton.removeEventListener("click", previousQuestion);

    questionNumberIndicator.style.transform = "translate(-200%, 0) rotate(-25deg)";
    image.style.transform = "translate(200%, 0) rotate(25deg)";
    question.style.transform = "translate(-200%, 0) rotate(-25deg)";

    answerButtonsArray.forEach((button, index) => {
        if (index % 2 == 0) {
            button.style.transform = "translate(200%, 0) rotate(25deg)";
        } else {
            button.style.transform = "translate(-200%, 0) rotate(-25deg)";
        }
    });

    document.querySelectorAll("section *").forEach(element => {
        element.style.opacity = 0;
    });


    setTimeout(() => {
        document.querySelectorAll("section *").forEach(element => {
            element.style.transition = "0s";
        });

        setTimeout(() => {
            questionNumberIndicator.style.transform = "translate(200%, 0) rotate(25deg)";
            image.style.transform = "translate(-200%, 0) rotate(-25deg)";
            question.style.transform = "translate(200%, 0) rotate(25deg)";

            answerButtonsArray.forEach((button, index) => {
                if (index % 2 == 0) {
                    button.style.transform = "translate(-200%, 0) rotate(-25deg)";
                } else {
                    button.style.transform = "translate(200%, 0) rotate(25deg)";
                }
            });

            questionNumberIndicator.textContent = `Question no. ${currentQuestion + 1}`;
            image.src = data[currentQuestion].image;
            question.textContent = data[currentQuestion].question;
            
            answerButtonsArray.forEach((button, index) => {
                button.textContent = data[currentQuestion].answers[index];
            });

            setTimeout(() => {document.querySelectorAll("section *").forEach(element => {
                element.style.transition = "0.5s";
                element.style.transitionTmingFunction = "ease-out";
            });

            setTimeout(() => {
                questionNumberIndicator.style.transform = "";
                image.style.transform = "";
                question.style.transform = "";

                answerButtonsArray.forEach(button => button.style.transform = "");

                document.querySelectorAll("section *").forEach(element => {
                    element.style.opacity = "100%";
                });
            
                setTimeout(() => {
                    document
                        .querySelectorAll("section *")
                        .forEach(
                            element => element.style.transitionTimingFunction = "ease-in"
                        );
                    document.body.style.overflow = "visible";
                    rightButton.addEventListener("click", nextQuestion);
                    leftButton.addEventListener("click", previousQuestion);
                }, 500);
            }, 20);
        }, 20);        
        }, 20);
    }, 500);
}


function previousQuestion() {
    document.body.style.overflow = "hidden";

    currentQuestion--;
    if (currentQuestion < 0) {
        currentQuestion = data.length - 1;
    }

    rightButton.removeEventListener("click", nextQuestion);
    leftButton.removeEventListener("click", previousQuestion);

    questionNumberIndicator.style.transform = "translate(200%, 0) rotate(25deg)";
    image.style.transform = "translate(-200%, 0) rotate(-25deg)";
    question.style.transform = "translate(200%, 0) rotate(25deg)";

    answerButtonsArray.forEach((button, index) => {
        if (index % 2 == 0) {
            button.style.transform = "translate(-200%, 0) rotate(-25deg)";
        } else {
            button.style.transform = "translate(200%, 0) rotate(25deg)";
        }
    });

    document.querySelectorAll("section *").forEach(element => {
        element.style.opacity = 0;
    });


    setTimeout(() => {
        document.querySelectorAll("section *").forEach(element => {
            element.style.transition = "0s";
        });

        setTimeout(() => {
            questionNumberIndicator.style.transform = "translate(-200%, 0) rotate(-25deg)";
            image.style.transform = "translate(200%, 0) rotate(25deg)";
            question.style.transform = "translate(-200%, 0) rotate(-25deg)";

            answerButtonsArray.forEach((button, index) => {
                if (index % 2 == 0) {
                    button.style.transform = "translate(200%, 0) rotate(25deg)";
                } else {
                    button.style.transform = "translate(-200%, 0) rotate(-25deg)";
                }
            });

            questionNumberIndicator.textContent = `Question no. ${currentQuestion + 1}`;
            image.src = data[currentQuestion].image;
            question.textContent = data[currentQuestion].question;
            
            answerButtonsArray.forEach((button, index) => {
                button.textContent = data[currentQuestion].answers[index];
            });

            setTimeout(() => {document.querySelectorAll("section *").forEach(element => {
                element.style.transition = "0.5s";
                element.style.transitionTmingFunction = "ease-out";
            });

            setTimeout(() => {
                questionNumberIndicator.style.transform = "";
                image.style.transform = "";
                question.style.transform = "";

                answerButtonsArray.forEach(button => button.style.transform = "");

                document.querySelectorAll("section *").forEach(element => {
                    element.style.opacity = "100%";
                });
            
                setTimeout(() => {
                    document
                        .querySelectorAll("section *")
                        .forEach(
                            element => element.style.transitionTimingFunction = "ease-in"
                        );
                    document.body.style.overflow = "visible";
                    rightButton.addEventListener("click", nextQuestion);
                    leftButton.addEventListener("click", previousQuestion);
                }, 500);
            }, 20);
        }, 20);        
        }, 20);
    }, 500);
}
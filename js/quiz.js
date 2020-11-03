const data = [{
    image: "./img/quiz/quiz-1.jpg",
    question: "What is this activation function called?",
    answers: [
        "Leaky ReLU",
        "Sigmoid",
        "Tanh",
        "ReLU",
    ],
    correct: 3,
},
{
    image: "./img/quiz/quiz-2.jpg",
    question: "What is salt in cryptography?",
    answers: [
        "NaCl",
        "Random data added to a password before being hashed",
        "A military grade symmetric encryption technique",
        "An acronym for Storage-Abundant-Limit-Trouble",
    ],
    correct: 1,
},
{
    image: "./img/quiz/quiz-3.jpg",
    question: "Which of the following will AI NEVER be able to do?",
    answers: [
        "Simulate human intelligence",
        "Pass the Turing Test",
        "Determine for every possible program, whether it halts or not",
        "Explain the reason for our existence",
    ],
    correct: 2,
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

answerButtonsArray.forEach(button => button.addEventListener("click", buttonClicked));

let currentQuestion = 0;

function nextQuestion() {
    document.body.style.overflow = "hidden";
    answerButtonsArray.forEach(button => {
        button.style.backgroundColor = "#403D39";
        button.style.color = "#CCC5B9";
    });

    currentQuestion++;
    if (currentQuestion >= data.length) {
        currentQuestion = 0;
    }

    rightButton.removeEventListener("click", nextQuestion);
    leftButton.removeEventListener("click", previousQuestion);

    document.querySelectorAll("section *").forEach(element => {
        element.style.transition = "all 0.5s ease-in 0s";
    });

    questionNumberIndicator.style.transform = "translate(-200%, 0) rotate(-25deg)";
    image.style.transform = "translate(200%, 0) rotate(25deg)";
    question.style.transform = "translate(-200%, 0) rotate(-25deg)";

    answerButtonsArray.forEach((button, index) => {
        if (index % 2 === 0) {
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
                if (index % 2 === 0) {
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
                    answerButtonsArray.forEach(button => button.addEventListener("click", buttonClicked));
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
        if (index % 2 === 0) {
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
                if (index % 2 === 0) {
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

function buttonClicked(){
    // remember to disable hover animation
    answerButtonsArray.forEach(button => button.removeEventListener("click", buttonClicked));
    this.style.transitionTimingFunction = "ease-out";
    this.style.color = "#252422";
    if (this.textContent === data[currentQuestion].answers[data[currentQuestion].correct]){
        this.style.backgroundColor = "#32CD32";
        this.style.transition = "all 640ms ease-out 0s";
        this.style.transform = "scale(1.1, 1.1)";

        let audio = new Audio("./sounds/correct-sound-fx.mp3");
        audio.currentTime = 0.35;
        audio.volume = 0.1;
        audio.play();

        setTimeout(() => {
            this.style.transform = "";
            nextQuestion();
        }, 1500);

    } else{
        this.style.backgroundColor = "#DC143C";
        answerButtonsArray[data[currentQuestion].correct].style.backgroundColor = "#32CD32";
        answerButtonsArray[data[currentQuestion].correct].style.color = "#252422";
        answerButtonsArray[data[currentQuestion].correct].style.transitionTimingFunction = "ease-out";
        this.style.transition = "all 80ms linear 0s";

        let audio = new Audio("./sounds/wrong-sound-fx.mp3");
        audio.currentTime = 1.2;
        audio.volume = 0.1;
        audio.play();

        wrongPressed(this, 0);
    }
    rightButton.removeEventListener("click", nextQuestion);
    leftButton.removeEventListener("click", previousQuestion);
}

function wrongPressed(button, recursiveIndex) {
    if (recursiveIndex < 8){
    if (recursiveIndex % 2 === 0) {
        button.style.transform = "rotate(10deg) scale(1.05, 1.05)";
    } else {
        button.style.transform = "rotate(-10deg) scale(1.05, 1.05)";
    }
    setTimeout(() => wrongPressed(button, ++recursiveIndex), 80);
} else {
    button.style.transform = "";
    setTimeout(nextQuestion, 860);
}
}
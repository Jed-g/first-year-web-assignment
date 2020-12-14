// author: Jedrzej Golebiewski

// I learned async/await & "promises" after writing this code (as well as the entire project)
// so the implementation here is somewhat convoluted.

// Data object
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

// Declare all relevant elements from DOM as variables for easy access & assign event listeners.
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

// Function for transitioning to next question.
// The next and previous question functions are very similar, therefore I will avoid duplicating comments.
function nextQuestion() {
    // Prevent user from scrolling during animation
    document.body.style.overflow = "hidden";

    // Reset button colours.
    answerButtonsArray.forEach(button => {
        button.style.backgroundColor = "#403D39";
        button.style.color = "#CCC5B9";
    });

    // Increment question no. and return to "0" if iterator >= data length.
    currentQuestion++;
    if (currentQuestion >= data.length) {
        currentQuestion = 0;
    }

    // Prevent switching between questions during transition.
    rightButton.removeEventListener("click", nextQuestion);
    leftButton.removeEventListener("click", previousQuestion);

    document.querySelectorAll("section *").forEach(element => {
        element.style.transition = "all 0.5s ease-in 0s";
    });

    // Logic for transition animation. Element will move to the correct location while reducing opacity to 0.
    // Then they will move to the opposite side behind the scenes (so that the user doesn't see it) and emerge
    // normally so that they give the illusion of a carousel.
    // The 20ms setTimeouts' function is to ensure that the transition properties have the correct values before
    // proceeding with the transformations.

    questionNumberIndicator.style.transform = "translate(-60%, 0) rotate(-5deg)";
    image.style.transform = "translate(60%, 0) rotate(5deg)";
    question.style.transform = "translate(-60%, 0) rotate(-5deg)";

    answerButtonsArray.forEach((button, index) => {
        if (index % 2 === 0) {
            button.style.transform = "translate(60%, 0) rotate(5deg)";
        } else {
            button.style.transform = "translate(-60%, 0) rotate(-5deg)";
        }
    });

    document.querySelectorAll("section *").forEach(element => {
        element.style.opacity = 0;
    });


    setTimeout(() => {
        // So that elements are not visible during position switch
        document.querySelectorAll("section *").forEach(element => {
            element.style.transition = "0s";
        });

        setTimeout(() => {
            // Switch positions
            questionNumberIndicator.style.transform = "translate(60%, 0) rotate(5deg)";
            image.style.transform = "translate(-60%, 0) rotate(-5deg)";
            question.style.transform = "translate(60%, 0) rotate(5deg)";

            answerButtonsArray.forEach((button, index) => {
                if (index % 2 === 0) {
                    button.style.transform = "translate(-60%, 0) rotate(-5deg)";
                } else {
                    button.style.transform = "translate(60%, 0) rotate(5deg)";
                }
            });

            // Load new data
            questionNumberIndicator.textContent = `Question no. ${currentQuestion + 1}`;
            image.src = data[currentQuestion].image;
            question.textContent = data[currentQuestion].question;
            
            answerButtonsArray.forEach((button, index) => {
                button.textContent = data[currentQuestion].answers[index];
            });

            setTimeout(() => {
                
                // Emerge as normal
                document.querySelectorAll("section *").forEach(element => {
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
                    
                    // Once transition ends, prepare elements for next transition & add event listeners to enable question switch
                    // by the use of nav buttons.
                    setTimeout(() => {
                        document
                            .querySelectorAll("section *")
                            .forEach(
                                element => element.style.transitionTimingFunction = "ease-in"
                            );
                        document.body.style.overflow = "";
                        rightButton.addEventListener("click", nextQuestion);
                        leftButton.addEventListener("click", previousQuestion);
                        answerButtonsArray.forEach(button => button.addEventListener("click", buttonClicked));
                    }, 500);
                }, 20);
            }, 20);        
        }, 20);
    }, 500);
}

// Function for transitioning to previous question.
function previousQuestion() {
    document.body.style.overflow = "hidden";

    currentQuestion--;
    if (currentQuestion < 0) {
        currentQuestion = data.length - 1;
    }

    rightButton.removeEventListener("click", nextQuestion);
    leftButton.removeEventListener("click", previousQuestion);

    questionNumberIndicator.style.transform = "translate(60%, 0) rotate(5deg)";
    image.style.transform = "translate(-60%, 0) rotate(-5deg)";
    question.style.transform = "translate(60%, 0) rotate(5deg)";

    answerButtonsArray.forEach((button, index) => {
        if (index % 2 === 0) {
            button.style.transform = "translate(-60%, 0) rotate(-5deg)";
        } else {
            button.style.transform = "translate(60%, 0) rotate(5deg)";
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
            questionNumberIndicator.style.transform = "translate(-60%, 0) rotate(-5deg)";
            image.style.transform = "translate(60%, 0) rotate(5deg)";
            question.style.transform = "translate(-60%, 0) rotate(-5deg)";

            answerButtonsArray.forEach((button, index) => {
                if (index % 2 === 0) {
                    button.style.transform = "translate(60%, 0) rotate(5deg)";
                } else {
                    button.style.transform = "translate(-60%, 0) rotate(-5deg)";
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
                    document.body.style.overflow = "";
                    rightButton.addEventListener("click", nextQuestion);
                    leftButton.addEventListener("click", previousQuestion);
                }, 500);
            }, 20);
        }, 20);        
        }, 20);
    }, 500);
}

// Function for handling answer button click.
function buttonClicked(){
    answerButtonsArray.forEach(button => button.removeEventListener("click", buttonClicked));

    // Check for answer correctness.
    if (this.textContent === data[currentQuestion].answers[data[currentQuestion].correct]){
        // Animation logic if answer correct
        this.style.transition = "all 80ms ease-in 0s, transform 1500ms ease-in 0s";
        this.style.backgroundColor = "#32CD32";
        this.style.color = "#252422";
        this.style.transform = "scale(1.1)";

        let audio = new Audio("./sounds/correct-sound-fx.mp3");
        audio.currentTime = 0.4;
        audio.volume = 0.1;
        audio.play();

        setTimeout(() => {
            this.style.transform = "";
            nextQuestion();
        }, 1500);

    } else{
        // Animation logic if answer wrong
        
        // Turn correct button green, and the one pressed (wrong) red.
        this.style.transition = "all 80ms linear 0s";
        this.style.backgroundColor = "#DC143C";
        this.style.color = "#252422";
        answerButtonsArray[data[currentQuestion].correct].style.transition = "all 80ms ease-out 0s";
        answerButtonsArray[data[currentQuestion].correct].style.backgroundColor = "#32CD32";
        answerButtonsArray[data[currentQuestion].correct].style.color = "#252422";

        let audio = new Audio("./sounds/wrong-sound-fx.mp3");
        audio.currentTime = 1.2;
        audio.volume = 0.1;
        audio.play();

        // "Wiggle" function (recursive implementation)
        wrongPressed(this, 0);
    }

    // Prevent question switch while question answers are being shown. Question switch will be enable after the nexQuestion
    // function has finished.
    rightButton.removeEventListener("click", nextQuestion);
    leftButton.removeEventListener("click", previousQuestion);
}

// Self-explanatory
function wrongPressed(button, recursiveIndex) {
    if (recursiveIndex < 8){
        if (recursiveIndex % 2 === 0) {
            button.style.transform = "rotate(5deg) scale(1.05)";
        } else {
            button.style.transform = "rotate(-5deg) scale(1.05)";
        }
        setTimeout(() => wrongPressed(button, ++recursiveIndex), 80);
    } else {
        button.style.transform = "";
        setTimeout(nextQuestion, 860);
    }
}
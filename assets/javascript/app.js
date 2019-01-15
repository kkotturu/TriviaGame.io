// PSUEDOCODE
// Click Start to begin the Trivia game
// Display the timer on the top for each question
// Disply the question with options
// A message is displayed when an answer is right, wrong and if no selection is made

// User selects a choice
// If selected choice is right, then the timer stops and an image is displayed with the selected answer
// If selected letter is wrong, then the timer stops and an image is displayed with the right answer
// If there is no selection is made, then the timer decreases and after the time runs out an image is displayed with the right answer 

// Game ends when:
// All questions are done 
// The game shows the results for correct answers, incorrect answers and unanswered questions
// Game resets 

$(document).ready(function () {
    // ----------------------------TRIVIA GAME----------------------------

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 16;
    var indexQandA = 0;
    var intervalID;
    var answered = false; //variable to stop the timer if user has clicked an answer
    var correct;

    var triviaGame = [{
        question: "Who does Harry go to live with afer his parents died ?",
        answer: ["Durselys", "Dodgers", "Deboiis", "Dursetts"],
        correct: "0",
        image: ("assets//images/DursleyFamily.jpg")
    },
    {
        question: "Who was mistakenly accused of opening the chamber of secrets the first time?",
        answer: ["Ginny Weasly", "Tom Riddle", "Hagrid", "Albus Dumbledore"],
        correct: "2",
        image: ("assets//images/Hagrid.png")
    },
    {
        question: "What kind of anamangus was Sirius Black?",
        answer: ["Black Sheep", "Black Cat", "Black Wolf", "Black Dog"],
        correct: "3",
        image: ("assets//images/SiriusBlack.jpg")
    },
    {
        question: "The Tri-Wizard tournament consisted of what events in what order?",
        answer: ["Flying, Dragons, Maze", "Swimming, Maze, Flying", "Dragons, Dememtors, Swimming", "Dragons, Swimming, Maze"],
        correct: "3",
        image: ("assets//images/Tri_WizardCup.jpg")
    },
    {
        question: "In the 5th year of Hogwarts, who became Prefect? ",
        answer: ["Harry and Hermoine", "Ron and Hermoine", "Dean and Hermoine", "Harry and Parvati"],
        correct: "1",
        image: ("assets/images/PrefectCouple.jpg")
    },
    {
        question: "Who killed Albus Dumbledore?",
        answer: ["Lucius Malfoy", "Bellatrix Lestrange", "Severus Snape", "He sacrificed himself for the greater good"],
        correct: "2",
        image: ("assets//images/Snape.jpg")
    },
    {
        question: "In what order were the Horcruxes destroyed?",
        answer: ["Dairy, Locket, Cup, Nagini, Diadem, Harry, Ring", "Locket, Cup, Ring, Diadem, Dairy, Nagini, harry", "Nagini, Cup, Ring, Diadem, Locket, Diary, Harry", "Dairy, Ring, Locket, Cup, Diadem, Harry, Nagini"],
        correct: "3",
        image: ("assets//images/Horcrux.jpg")
    },
    {
        question: "How many yearrs after The Deathly Hallows does the Cursed Child take place?",
        answer: ["18", "19", "20", "21"],
        correct: "1",
        image: ("assets//images/CursedChild.jpg"),

    }];

    // ------------- FUNCTION DECLARATIONS ----------------------------

    function startGame() {
        console.log("game has begun");
        $('.start-button').remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false; // will allow timeRemaining to be pushed back to <h5> after round reset....else statement in function timer()
        timeRemaining = 15;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }

        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++) {
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }

        $('h4').click(function () {
            var id = $(this).attr('id');
            if (id === correct) {
                answered = true; // stops the timer
                $('.question').text("The answer is : " + triviaGame[indexQandA].answer[correct]);
                correctAnswer();
            }
            else {
                answered = true; //stops the timer
                $('.question').text("Your choice: " + triviaGame[indexQandA].answer[id] + ".....The Correct answer is: " + triviaGame[indexQandA].answer[correct]);
                incorrectAnswer();
            }
        });
    }

// timer display

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $('.question').text("The Correct answer is: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        }
        else if (answered === true) {
            clearInterval(intervalID);
        }

        // for if (answered === false) {timer();}, the below code will run

        else {
            timeRemaining--;
            $('.timeRemaining').text('YOU HAVE ' + timeRemaining + ' SECONDS TO CHOOSE');
        }
    }

    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("You answered CORRECTLY!");
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $('.timeRemaining').text("You answered INCORRECTLY!");
        resetRound();
    }

    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("You failed to chose an ANSWER")
        resetRound();
    }

    function resetRound() {
        $('.answersAll').remove();
        $('.answers').append('<img class=answerImage src="' + triviaGame[indexQandA].image + ' ">'); // adds answer image
        indexQandA++; // increments index which will load next question when loadQandA() is called again
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
                $('.answerImage').remove();
            }, 2000); // removes answer image from previous round
        }
        else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answerImage').remove();
                $('.answers').append('<h4 class= answersAll>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');

                setTimeout(function () {
                    location.reload();
                }, 3000);
            }, 2000);
        }
    };

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();
    });

});

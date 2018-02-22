var triviaQuestions = [{
	question: "In what year did World War 2 begin?",
	answerList: ["1914", "1939", "1950", "1937"],
	answer: 1
},{
	question: "Which of these countries were not part of the 'Axis' Powers?",
	answerList: ["France", "Germany", "Romania", "Italy"],
	answer: 0
},{
	question: "What year did the U.S.A enter World War 2?",
	answerList: ["1941", "1916", "1944", "1950"],
	answer: 0
},{
	question: "How many people (soldiers and civilians) died during or as a result of World War 2?",
	answerList: ["50 million", "60 million", "80 million", "100 million"],
	answer: 2
},{
	question: "What was the name of the fasict leader of Nazi Germany?",
	answerList: ["Benito Mussolini", "Winston Churchill", "Hermann Göring", "Adolf Hitler"],
	answer: 3
},{
	question: "The bombing of Pearl Harbor occured on what date?",
	answerList: ["December 7, 1941", "December 20, 1941", "April 15, 1945", "February 10th, 1942"],
	answer: 0
},{
	question: "Which country had the largest amount of casualties? (civilian and military)",
	answerList: ["Germany", "Soviet Union (Russia)", "U.S.A", "China"],
	answer: 1
},{
	question: "Which two countries were already involved in a conflict prior to WW2?",
	answerList: ["Germany & France", "Japan & India", "Japan & China", "Germany & Poland"],
	answer: 2
},{
	question: "In which battle did the Axis powers lose about a quarter of their total troops on the Eastern Front?",
	answerList: ["Battle of Leningrad", "Battle of Stalingrad", "Battle of Jutland", "Battle of Kursk"],
	answer: 1
},{
	question: "What research and development project produced the first nuclear weapons during World War II?",
	answerList: ["Alan Parsons Project", "Philadelphia Project", "Oppenheimer Project", "Mahnattan Project"],
	answer: 3
},{
	question: "What was the code name for the Battle of Normandy?",
	answerList: ["Operation Overlord", "Operation Piledriver", "Operation Omaha", "Operation Panther"],
	answer: 0
},{
    question: "What was the last major battle of World War II?",
    answerList: ["Battle of Peleliu", "Battle of Iwo Jima", "Battle of Berlin", "Battle of Okinawa"],
    answer: 3
},{
    question: "What was the second city of the United States dropped a nuclear bomb on?",
    answerList: ["Hiroshima", "Tokyo", "Nagasaki", "Yokohama"],
    answer: 2
}
];

// var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
    $(this).hide();
        // This hides the start button once its clicked
	newGame();
});

$('#startOverBtn').on('click', function(){
    $(this).hide();
        // This hides the start over button once it is clicked
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	// $('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
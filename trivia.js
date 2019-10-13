$(document).ready(function() {
    // console.log( "ready!" );

    // track which question we are on
    var questionCounter = 0;
    // initial time of 15 seconds for each question
    var time = 15;
    // will keep tally of right guesses for end game
    var correctGuesses = 0;
    //will keep tally of wrong guesses for end game
    var incorrectGuesses = 0;

    // question & answer array
    var questions = [
      {
	    question: "what is the smallest state in U.S?",
	    choices: ["Rhode Island ", "Vermont", "Maine", "New Hempshire"],
	    correctAnswer: "Rhode Island",
	    
	  }, 
	  {
	    question: "In which State is Mt.Rushmore located?",
	    choices: ["Utah", "South Dakota", "Wyoming", "Montana"],
	    correctAnswer: "South Dakota",
	    
	  }, 
	  {
	    question: "Name the tallest mountain in the U.S!",
	    choices: ["Mount Rainier ", "Rocky Mountains", "Sierra Nevada Mountain:", "Mount Mckinely"],
	    correctAnswer: "Mount Mckinely",
	    
	  }, 
	  {
	    question: "Name the largest Lake in the U.S ?",
	    choices: ["Lake Erie", "Lake Michigan", "Lake Superior", "Lake Tahoe"],
	    correctAnswer: "Lake Superior",
	    
	  }, 
	  {
	    question: "What is the longest river in the United States?",
	    choices: ["Yukon River", "Rio Grande River ", "Arkansas River", "Missouri River"],
	    correctAnswer: "Missouri River",
	    
	  },
	  {
	    question: "Name the U.S State nicknamed as The Land of 10,000 Lakes?",
	    choices: ["Wisconsin ", "Minnesota", "Michigan", "Illinois"],
	    correctAnswer: "Minnesota",
	   
	  },
	  {
	    question: "How many States border with Mexico?",
	    choices: ["2", "3", "5", "4"],
	    correctAnswer: "4",
	    
	  },
	  {
	    question: "Which place has 43 buildings with their own zip code? ",
	    choices: ["Las Vegas, Nevada", "San Francisco, California ", "Manhattan, New York", "Dallas, Texas"],
	    correctAnswer: "Manhattan, New York",
	    
	  },
	  {
	    question: "Which two states donated land for the creation of Washington D.C  ?",
	    choices: ["New York & Maine", "Maryland & Virginia", "Vermont & New Hampshire", "Connecticut & Delaware"],
	    correctAnswer: "Maryland & Virginia",
	
	  },
	  {
	    question: "Which country covers 9% of the fresh water of the world ?",
	    choices: ["Switzerland", "Sweeden", "Canada", "Australia"],
	    correctAnswer: "Canada",
	    
	  },
	  {
	    question: "who owns the land of Antartica?",
	    choices: ["Canada", "No one ", "Russia", "USA"],
	    correctAnswer: "No one",
	    
	  },
	  {
	    question: "Which only city that is present in Asia and Europe?",
	    choices: ["Venice ", "Istanbul", "Milan", "London"],
	    correctAnswer: "Istanbul",
	    
	  },
	  {
	  
	    question: "Which U.S city has the largest population of Polish?",
	    choices: ["Dallas", "New York", "Chicago", "New Orleans"],
	    correctAnswer: "Chicago",
	    
	  },
	  {
	    question: "Name the country which has a boot-shaped?",
	    choices: ["France", "Spain", "Italy", "Malta"],
	    correctAnswer: "Italy",
	    
	  }];
	  

	// create question contents according to question count
	function questionContent() {
		// a for loop would be cool here...
    	$("#gameScreen").append("<p><strong>" + 
    		questions[questionCounter].question + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[0] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[1] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[2] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[3] + 
    		"</strong></p>");
	}

	// user guessed correctly
	function userWin() {
		$("#gameScreen").html("<p>You got it right!</p>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user guessed incorrectly
	function userLoss() {
		$("#gameScreen").html("<p>Nope, that's not it!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user ran out of time
	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>You ran out of time!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>" + 
				questions[questionCounter].image);
			setTimeout(nextQuestion, 4000);
			questionCounter++;
		}
	}

	// screen that shows final score and nice message :)
	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "Perfection! Might want to keep going though";
			var bottomText = "#Boom Shacka-lacka!";
		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "Nice work! But better luck next time...";
			var bottomText = "all your base are belong to us";
		}
		else {
			var endMessage = "Oh Noo!! try again! ";
			var bottomText = "#YouCanDoThis!";
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
			correctGuesses + "</strong> right.</p>" + 
			"<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
		$("#bottomText").html(bottomText);
		gameReset();
		$("#start").click(nextQuestion);
	}

	// Geography clock currently set to 15 seconds
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}

	// moves question counter forward to show next question
	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 15;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
	// console.log(questionCounter);
	// console.log(questions[questionCounter].correctAnswer);
	}

	// reset score and counter parameters on restart
	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();
    	// $("#gameScreen").append("<div id='question'>");
    	// var nextQuestion = questionContent(questionCounter);
    	// $("#gameScreen").append(nextQuestion);

		// $("#gameScreen").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
		// questionCounter++;
		questionContent();
    	timer();
    	userTimeout();
    }

    // this starts the game
    $("#start").click(nextQuestion);

    // click function to trigger right or wrong screen
	$("#gameScreen").on("click", ".choices", (function() {
		// alert("clicked!");
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});

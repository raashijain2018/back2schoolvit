
var quiz = [
    {
        question: "What does HTML stand for?",
        option: [
            "Hyper Tag Markup Language",
            "Hyper Text Markup Language",
            "Hyperlinks Text Mark Language",
            "Hyperlinking Text Marking Language",
        ],
        answer: 2,
    },
    {
        question: "What does CSS stand for?",
        option: [
            "Computing Style Sheet",
            "Creative Style System",
            "Cascading Style Sheet",
            "Creative Styling Sheet",
        ],
        answer: 3,
    },
    {
        question: "Where should a CSS file be referenced in a HTML file?",
        option: [
            "Before any HTML code",
            "After all HTML code",
            "Inside the head section",
            "Inside the body section",
        ],
        answer: 3,
    },
    {
        question:
            "What is the correct format for aligning written content to the center of the page in CSS?",
        option: [
            "Text-align:center;",
            "Font-align:center;",
            "Text:align-center;",
            "Font:align-center;",
        ],
        answer: 1,
    },
    {
        question:
            "What is the correct format for changing the background colour of a div in CSS?",
        option: [
            "Bg-color:red;",
            "bg:red;",
            "Background-colour:red;",
            "Background-color:red;",
        ],
        answer: 4,
    },
    {
        question: "Choose the correct HTML tag for the largest heading",
        option: ["<heading>", "<h6>", "<head>", "<h1>"],
        answer: 4,
    },
    {
        question: "Which is the correct CSS syntax?",
        option: [
            "Body {color: black}",
            "{body;color:black}",
            "{body:color=black(body}",
            "body:color=black",
        ],
        answer: 1,
    },
    {
        question:
            "In CSS, what is the correct option to select all the tags on a page?",
        option: ["<p> { }", ".p { }", "#p { }", "* { }"],
        answer: 4,
    },
    {
        question: "Select the correct HTML tag to make a text italic?",
        option: ["Italic", "II", "IT", "I"],
        answer: 4,
    },
    {
        question: "Select the correct HTML tag to make a text bold.",
        option: ["bo", "bb", "b", "bold"],
        answer: 3,
    },
];

//------------------------------------------------------------------------------
let index = 0;
let attempt = 0;
let score = 0;
let wrong = 0;



let questions = quiz.sort(function(){
  return 0.5 - Math.random();
});

let totalQuestion = questions.length;
// $(function () {
//  
  // let totalTime = 300; // 300 seconds for the timer
  // let minute = 0;
  // let second = 0;
  // let counter=0;
  // sessionStorage.setItem("time",counter)
  // let timer = setInterval(function () {
// 
    // counter++
// 
    // counter=sessionStorage.getItem("time")
    // minute = Math.floor((totalTime - counter) / 60); // calculating minutes
    // second = totalTime - minute * 60 - counter;
// 
  // 
    // $(".timerBox span").text(minute + ":" + second);
    // if (counter==totalTime) {
      // alert("Time's Up. Press OK to get your Result");
      // result();
      // sessionStorage.clear();
      // clearInterval(timer);
    // }
  // }, 1000) // timer set for 1 second interval
  var interval = 300;
setInterval(function()
{
    var remaining = sessionStorage.endTime - new Date;
    if( remaining >= 0 )
    {
      minute = Math.floor((interval/ 60000)); // calculating minutes
      second = Math.floor((remaining - minute * 60000)/1000);
      $('.timerBox span').text( minute + ":" + second);
    } else
    {
      sessionStorage.clear();
      alert("time is up ")
      result();
      console.log(remaining) 
      console.log(sessionStorage.endTime)
      clearInterval();
    }
}, 100);
  // Questions
  printQuestion(index);
// });
 

// Function for Printing Questions
function printQuestion(i) {
  $(".questionBox").text(questions[i].question);
  $(".optionBox span").eq(0).text(questions[i].option[0]);
  $(".optionBox span").eq(1).text(questions[i].option[1]);
  $(".optionBox span").eq(2).text(questions[i].option[2]);
  $(".optionBox span").eq(3).text(questions[i].option[3]);
}

// Function to Check Answers
function checkAnswer(option) {
  attempt++;
  let optionClicked = $(option).data("opt");
  if(optionClicked == questions[index].answer) {
    $(option).addClass("right");
    score++;
  } else {
    $(option).addClass("wrong");
    wrong++;
  }

  $(".optionBox span").attr("onclick", "");
}


// Function for Next Question
function showNext() {
  if (index >= questions.length - 1) {
    showResult(0);
    return;
  }
  index++;
  $(".optionBox span").removeClass();

  $(".optionBox span").attr("onclick", "checkAnswer(this)");
  printQuestion(index);
}

// Function for Prev Question
function showPrev() {
  if (index === 0) {
    index = 0;
    return;
  }
  index--;
  $(".optionBox span").removeClass();

  $(".optionBox span").attr("onclick", "checkAnswer(this)");
  printQuestion(index);
}

// Function to Show result
function showResult(j) {
  if (j == 1 && index < questions.length - 1 && !confirm("All Questions have not been attempted. Press OK to Submit anyway")) {
    return;
  }
  result();
}

// When Timer gets Over
function result() {
  $("#questionScreen").hide();
  $("#resultScreen").show();

  $("#totalQuestion").text(totalQuestion);
  $("#attemptQuestion").text(attempt);
  $("#correctAnswers").text(score);
  $("#wrongAnswers").text(wrong);
}

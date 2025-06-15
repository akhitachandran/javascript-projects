document.addEventListener("DOMContentLoaded",()=>{
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choiceList = document.getElementById("choices-list");
  const nextBtn = document.getElementById("next-btn");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  const restartBtn = document.getElementById("restart-btn");
  const startBtn = document.getElementById("start-btn");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  startBtn.addEventListener("click" , startQuiz);

  function startQuiz(){
    startBtn.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion(){
     questionText.innerHTML = questions[currentQuestionIndex].question;
     choiceList.innerHTML = "";
     questions[currentQuestionIndex].choices.forEach(option =>{
      let button = document.createElement("button");
      button.classList.add("options");
      button.innerHTML = `${option}`;
      console.log(button);
      choiceList.appendChild(button);
     })
     choiceList.addEventListener("click",(e)=>{
      options=choiceList.children;
      if(e.target.tagName == "BUTTON"){
        e.stopPropagation();
        checkAnswer(e.target);
      }} ,{once:true});
  }   

  function checkAnswer(choice){
    console.log(choice);
    if(choice.innerHTML == questions[currentQuestionIndex].answer){
      score++;
      choice.classList.add("correct");
    }else{
      choice.classList.add("wrong");
    }
    nextBtn.classList.remove("hidden");
  }

   nextBtn.addEventListener("click",()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){ 
     showQuestion();
    }else{
      showResult();
    }
   });

   function showResult(){
    resultContainer.classList.remove("hidden");
    questionContainer.classList.add("hidden");
    scoreDisplay.innerHTML=`${score}/${questions.length}`;
   }

   restartBtn.addEventListener("click",()=>{
    resultContainer.classList.add("hidden");
    currentQuestionIndex = 0;
    score = 0;
    startQuiz();
   });
  })

//Quizz
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");

const questions = [{
    question: "Warum sind Kamille und Kümmel gut bei Bauchschmerzen?",
    answers: [
      {text:"erfrischend", correct: true},
      {text:"fettreich", correct: false},
      {text:"krampflösend", correct: false},
      {text:"schmerzstillend", correct: false}
    ]},
  
    {question: "Pektin ist ein Ballaststoff und hilft bei Durchfall. In welchen Lebensmitteln ist er enthalten?",
    answers: [
      {text:"Banane", correct: false},
      {text:"Brot", correct: false},
      {text:"Apfel", correct: false},
      {text:"Karotte", correct: true}
    ]},
  
    {question: "Was entsteht beim Kochen von Karotten?",
      answers: [
        {text:"Oligopole", correct: false},
        {text:"Orthogonale", correct: false},
        {text:"Omniglucoide", correct: true},
        {text:"Oligosaccharide", correct: false}
      ]},
  
      {question: "Welches Lebensmittel kann bei Blähungen Abhilfe schaffen?",
        answers: [
          {text:"Gurke", correct: true},
          {text:"Paprika", correct: false},
          {text:"Fenchel", correct: false},
          {text:"Tomaten", correct: false}
        ]},
  
        {question: "Welches Hausmittel hilft oft bei Übelkeit?",
          answers: [
            {text:"Schokolade", correct: false},
            {text:"Ingwer", correct: true},
            {text:"Mais", correct: false},
            {text:"Fleisch", correct: false}
          ]}
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  function showQuestion(question){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer =>  {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btns");
      answerButton.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct; //addiert "true" oder "false"
      }
      button.addEventListener("click", selectAnswer);
    });
  }

  function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Nächste Frage";
    showQuestion();
  }

function resetState(){
  nextButton.style.display = "none"
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true"; //kontrolliert ob dataset ist true
  if(isCorrect){
    selectedBtn.classList.add("correct"); //addiert class basiert auf dataset true or false
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `Du hast ${score} von ${questions.length} Fragen richtig beantwortet!`
  nextButton.innerHTML = "Nochmal";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
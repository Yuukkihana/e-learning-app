//Quizz
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");

const questions = [{
    question: "Wie viel Wasser solltest du (besonders nach übermäßigem Alkoholkonsum) am Tag trinken?",
    answers: [
      {text:"0,75 Liter", correct: false},
      {text:"1,5 Liter", correct: false},
      {text:"2 Liter", correct: true},
      {text:"5 Liter", correct: false}
    ]},
  
    {question: "Wofür solltest du fettreiche und salzhaltige Lebensmittel essen?",
    answers: [
      {text:"Alkoholabbau", correct: true},
      {text:"Kopfschmerzen", correct: false},
      {text:"Verdauung", correct: false},
      {text:"Erkältung", correct: false}
    ]},
  
    {question: "Welche fettreichen und salzhaltigen Lebensmittel kommen dafür beispielsweise in Frage?",
      answers: [
        {text:"Pommes", correct: false},
        {text:"Fisch", correct: true},
        {text:"saurer Weingummi", correct: false},
        {text:"Burger", correct: false}
      ]},
  
      {question: "Welcher Inhaltsstoff aus den vorher aufgeführten Lebensmitteln hilft dir beim Kater?",
        answers: [
          {text:"Glutamat", correct: false},
          {text:"Zucker", correct: false},
          {text:"Omgea-3-Fettsäuren", correct: true},
          {text:"Buttersäure", correct: false}
        ]},
  
        {question: "Welcher Tee kann deinen Magen beruhigen?",
          answers: [
            {text:"Rooibos", correct: false},
            {text:"Früchtetee", correct: false},
            {text:"Grüner Tee", correct: false},
            {text:"Ingwer", correct: true}
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
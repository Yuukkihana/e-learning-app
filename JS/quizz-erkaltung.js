//Quizz
//Elementen aus HTML werden selektiert
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");

//Frafgen sind im Objekt gespeichert
const questions = [{
    question: "Aus welcher Kombination kannst du einen Hustensirup herstellen?",
    answers: [
      {text:"Salz und Öl", correct: false},
      {text:"Holunder und Zucker", correct: false},
      {text:"Petersilie und Schmand", correct: false},
      {text:"Honig und Zwiebel", correct: true}
    ]},
  
    {question: "Was benötigst du für das Inhalieren?",
    answers: [
      {text:"Zucker, Wasser, Handtuch", correct: false},
      {text:"Nasendusche, Wasser, Salz", correct: false},
      {text:"Waschlappen, Wasser", correct: false},
      {text:"Schüssel, Handtuch, Wasser", correct: true}
    ]},
  
    {question: "Wobei hilft das Inhalieren?",
      answers: [
        {text:"Fieber", correct: false},
        {text:"Kopfschmerz", correct: false},
        {text:"Schnupfen", correct: true},
        {text:"schleimiger Husten", correct: false}
      ]},
  
      {question: "Welche ätherischen Öle können erwachsenen Menschen bei einem Schnupfen helfen?",
        answers: [
          {text:"Eukalyptus, Orange", correct: false},
          {text:"Jasmin, Menthol", correct: false},
          {text:"Menthol, Eukalyputs", correct: true},
          {text:"Menthol, Rosmarin", correct: false}
        ]},
  
        {question: "In welcher Form sollte man die ätherischen Öle zu sich nehmen?",
          answers: [
            {text:"Trinken", correct: false},
            {text:"Auf der Haut", correct: true},
            {text:"Auf dem Kopf", correct: false},
            {text:"Ins Auge", correct: false}
          ]}
  ];

  let currentQuestionIndex = 0; //variable zum aufrufen von fragen
  let score = 0; 

  function showQuestion(question){ //fragen generieren
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer =>  { //buttons zum antworten generieren
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

  function startQuiz(){ //wird aufgerufen wenn man die seite offnet
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

function selectAnswer(e){ //funktion zum evaluierung der gegebene antwort vom user
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

function showScore(){ //funktion zeigt ergebnis am ende
  resetState();
  questionElement.innerHTML = `Du hast ${score} von ${questions.length} Fragen richtig beantwortet!`
  nextButton.innerHTML = "Nochmal";
  nextButton.style.display = "block";
}

function handleNextButton(){  //je nachdem ob es mehr fragen gibt, wird hier der score oder frage gezeigt 
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{ //button um zu der nachste frage zu gehen
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
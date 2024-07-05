//Quizz
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons")

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

  function showQuestion(question){
    questionElement.innerText = question.question;
  }
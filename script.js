const QUESTIONS = [
  {
    text: 'Welke Japanse term betekent letterlijk "zen-meditatie"?',
    answers: [
      { label: 'Zazen', correct: true },
      { label: 'Satori', correct: false },
      { label: 'Koan', correct: false },
      { label: 'Ikigai', correct: false },
    ],
    explanation:
      'Zazen is een meditatieve oefening die centraal staat in het zenboeddhisme en letterlijk "zittende meditatie" betekent.',
  },
  {
    text: 'Wat is het doel van een koan in zenboeddhistische trainingen?',
    answers: [
      { label: 'Het ontwikkelen van logische redenering', correct: false },
      { label: 'Het doorbreken van rationeel denken', correct: true },
      { label: 'Het verbeteren van fysieke conditie', correct: false },
      { label: 'Het leren van sutra\'s uit het hoofd', correct: false },
    ],
    explanation:
      'Koans zijn paradoxale vragen of verhalen die bedoeld zijn om de rationele geest te overschrijden en inzicht te krijgen.',
  },
  {
    text: 'Welke kleur staat symbool voor sereniteit en kalmte in veel culturen?',
    answers: [
      { label: 'Rood', correct: false },
      { label: 'Blauw', correct: true },
      { label: 'Geel', correct: false },
      { label: 'Paars', correct: false },
    ],
    explanation:
      'Blauw wordt vaak geassocieerd met rust en stabiliteit en bevordert een gevoel van kalmte.',
  },
  {
    text: 'Wat betekent het begrip "mindfulness"?',
    answers: [
      { label: 'Volledig aanwezig zijn in het huidige moment', correct: true },
      { label: 'Je gedachten analyseren', correct: false },
      { label: 'Meditatie in stilte', correct: false },
      { label: 'Concentratie op de toekomst', correct: false },
    ],
    explanation:
      'Mindfulness verwijst naar een toestand van volledig bewust aanwezig zijn zonder oordeel.',
  },
  {
    text: 'Welke plant wordt traditioneel in zen-tuinen gebruikt vanwege zijn symbool van flexibiliteit?',
    answers: [
      { label: 'Bamboe', correct: true },
      { label: 'Lavendel', correct: false },
      { label: 'Aloë vera', correct: false },
      { label: 'Palm', correct: false },
    ],
    explanation:
      'Bamboe staat symbool voor veerkracht en flexibiliteit, eigenschappen die in zen worden gewaardeerd.',
  },
  {
    text: 'Wat is een kenmerk van een traditionele Japanse zen-tuin?',
    answers: [
      { label: 'Gebruik van veel bloemen', correct: false },
      { label: 'Minimalistische compositie met stenen en grind', correct: true },
      { label: 'Heldere neonkleuren', correct: false },
      { label: 'Waterpartijen met fonteinen', correct: false },
    ],
    explanation:
      'Zen-tuinen bestaan vaak uit zorgvuldig gerangschikte stenen, grind en minimalistische elementen om contemplatie te stimuleren.',
  },
  {
    text: 'Welke ademhalingstechniek helpt stress te verlagen door de uitademing te verlengen?',
    answers: [
      { label: 'Box breathing', correct: false },
      { label: '4-7-8 ademhaling', correct: true },
      { label: 'Hyperventilatie', correct: false },
      { label: 'Kapalabhati', correct: false },
    ],
    explanation:
      'Bij de 4-7-8 ademhaling adem je vier tellen in, houd je zeven tellen vast en adem je acht tellen uit voor ontspanning.',
  },
  {
    text: 'Hoeveel tijd wordt in zen aangeraden om elke dag te mediteren voor beginners?',
    answers: [
      { label: '2 minuten', correct: false },
      { label: '5 tot 10 minuten', correct: true },
      { label: '30 minuten', correct: false },
      { label: '1 uur', correct: false },
    ],
    explanation:
      'Korte sessies van 5 tot 10 minuten zijn ideaal om meditatie regelmatig vol te houden als beginner.',
  },
  {
    text: 'Welke kwaliteit beschrijft het woord "equanimity" dat vaak wordt gebruikt in meditatiepraktijk?',
    answers: [
      { label: 'Creativiteit', correct: false },
      { label: 'Gelijkmoedigheid', correct: true },
      { label: 'Intelligentie', correct: false },
      { label: 'Ambitie', correct: false },
    ],
    explanation:
      'Equanimity staat voor innerlijke balans en gelijkmoedigheid, zelfs in uitdagende situaties.',
  },
  {
    text: 'Welke factor helpt volgens onderzoek het meest bij het opbouwen van een duurzame meditatiegewoonte?',
    answers: [
      { label: 'Dure accessoires kopen', correct: false },
      { label: 'Consistente dagelijkse routine', correct: true },
      { label: 'Langdurige retraites volgen', correct: false },
      { label: 'Meditatie-apps wisselen', correct: false },
    ],
    explanation:
      'Een vaste dagelijkse routine zorgt voor automatisering en maakt het eenvoudiger om meditatie vol te houden.',
  },
];

const appState = {
  currentQuestionIndex: 0,
  score: 0,
  answered: false,
  shuffledQuestions: [],
};

const elements = {
  score: document.getElementById('score'),
  questionIndex: document.getElementById('questionIndex'),
  progressFill: document.getElementById('progressFill'),
  answers: document.getElementById('answers'),
  questionText: document.getElementById('questionText'),
  feedback: document.getElementById('feedback'),
  nextButton: document.getElementById('nextButton'),
  resetButton: document.getElementById('resetButton'),
  questionCard: document.getElementById('questionCard'),
  resultScreen: document.getElementById('resultScreen'),
  resultMessage: document.getElementById('resultMessage'),
  playAgain: document.getElementById('playAgain'),
  answerTemplate: document.getElementById('answerTemplate'),
};

const totalQuestions = () => appState.shuffledQuestions.length;

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function prepareGame() {
  appState.shuffledQuestions = shuffle(QUESTIONS).slice(0, 8);
  appState.currentQuestionIndex = 0;
  appState.score = 0;
  appState.answered = false;
  elements.resultScreen.classList.add('hidden');
  elements.questionCard.classList.remove('hidden');
  elements.nextButton.disabled = true;
  elements.feedback.textContent = '';
  elements.feedback.className = 'feedback';
  updateScore();
  renderQuestion();
}

function updateScore() {
  elements.score.textContent = `Score: ${appState.score}`;
}

function renderQuestion() {
  const question = appState.shuffledQuestions[appState.currentQuestionIndex];
  if (!question) {
    showResults();
    return;
  }

  elements.questionText.textContent = question.text;
  elements.answers.innerHTML = '';
  const shuffledAnswers = shuffle(question.answers);
  shuffledAnswers.forEach((answer) => {
    const answerNode = elements.answerTemplate.content.firstElementChild.cloneNode(true);
    const button = answerNode.querySelector('button');
    button.textContent = answer.label;
    button.addEventListener('click', () => handleAnswer(button, answer.correct));
    elements.answers.appendChild(answerNode);
  });

  appState.answered = false;
  elements.nextButton.disabled = true;
  elements.feedback.textContent = '';
  elements.feedback.className = 'feedback';
  updateProgress();
}

function handleAnswer(button, isCorrect) {
  if (appState.answered) return;
  appState.answered = true;

  const buttons = elements.answers.querySelectorAll('button');
  buttons.forEach((btn) => btn.setAttribute('disabled', 'true'));

  if (isCorrect) {
    button.classList.add('correct');
    elements.feedback.textContent = 'Goed gedaan!';
    elements.feedback.classList.add('correct');
    appState.score += 10;
    updateScore();
  } else {
    button.classList.add('incorrect');
    elements.feedback.textContent = 'Niet helemaal. Volgende keer beter!';
    elements.feedback.classList.add('incorrect');

    // Highlight correct answer for feedback
    buttons.forEach((btn) => {
      const correctAnswer = btn.textContent === getCorrectAnswer().label;
      if (correctAnswer) {
        btn.classList.add('correct');
      }
    });
  }

  elements.feedback.insertAdjacentHTML(
    'beforeend',
    `<p class="explanation">${
      appState.shuffledQuestions[appState.currentQuestionIndex].explanation
    }</p>`
  );

  elements.nextButton.disabled = false;
}

function getCorrectAnswer() {
  const currentQuestion = appState.shuffledQuestions[appState.currentQuestionIndex];
  return currentQuestion.answers.find((answer) => answer.correct);
}

function updateProgress() {
  const index = appState.currentQuestionIndex + 1;
  elements.questionIndex.textContent = `Vraag ${index} van ${totalQuestions()}`;
  const progressPercentage = Math.round((index / totalQuestions()) * 100);
  elements.progressFill.style.width = `${progressPercentage}%`;
}

function goToNextQuestion() {
  if (!appState.answered) return;
  appState.currentQuestionIndex += 1;

  if (appState.currentQuestionIndex >= totalQuestions()) {
    showResults();
    return;
  }

  renderQuestion();
}

function showResults() {
  elements.questionCard.classList.add('hidden');
  elements.resultScreen.classList.remove('hidden');
  const maxScore = totalQuestions() * 10;
  const percentage = Math.round((appState.score / maxScore) * 100);

  let message = `Je behaalde ${appState.score} van de ${maxScore} punten (${percentage}%).`;
  if (percentage === 100) {
    message += ' Perfecte zen-meester!';
  } else if (percentage >= 70) {
    message += ' Je bent goed op weg naar innerlijke rust.';
  } else {
    message += ' Blijf oefenen voor nog meer zen!';
  }

  elements.resultMessage.textContent = message;
}

elements.nextButton.addEventListener('click', goToNextQuestion);
elements.resetButton.addEventListener('click', prepareGame);
elements.playAgain.addEventListener('click', prepareGame);

document.addEventListener('DOMContentLoaded', prepareGame);

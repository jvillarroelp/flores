let currentQuestion = 0;
let answers = {};
let petalTimer = null;

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  const target = document.getElementById(id);
  target.classList.add('active');
}

function startGame() {
  showScreen('question1');
}

function answer(question, value) {
  answers[question] = value;

  if (question === 1) {
    currentQuestion = 2;
    setTimeout(() => showScreen('question2'), 250);
  } else {
    showScreen('loading');
    startLoading();
  }
}

function startLoading() {
  const bar = document.getElementById('progressBar');
  const text = document.getElementById('loadingText');

  let progress = 0;

  const messages = [
    'Preparando tu regalo...',
    'Buscando las flores más bonitas...',
    'Agregando un poquito de amor...',
    'Casi listo, Bebé...',
    'Tu regalo está listo 💛'
  ];

  const interval = setInterval(() => {
    progress += 2.5;
    bar.style.width = `${progress}%`;

    const index = Math.min(
      Math.floor(progress / 25),
      messages.length - 1
    );

    text.textContent = messages[index];

    if (progress >= 100) {
      clearInterval(interval);

      setTimeout(() => {
        showScreen('final');
        startPetals();
      }, 600);
    }
  }, 65);
}

function createPetal() {
  const container = document.getElementById('petals');
  const petal = document.createElement('div');

  petal.className = 'petal';
  petal.textContent = Math.random() > 0.5 ? '✦' : '•';

  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.fontSize = `${8 + Math.random() * 13}px`;
  petal.style.animationDuration = `${5 + Math.random() * 7}s`;
  petal.style.opacity = `${0.25 + Math.random() * 0.65}`;

  container.appendChild(petal);

  setTimeout(() => petal.remove(), 13000);
}

function startPetals() {
  if (petalTimer) clearInterval(petalTimer);

  for (let i = 0; i < 25; i++) {
    setTimeout(createPetal, i * 120);
  }

  petalTimer = setInterval(createPetal, 350);
}

document.addEventListener('DOMContentLoaded', () => {
  // Nada que configurar: la página funciona directamente.
});

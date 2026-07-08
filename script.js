const root = document.documentElement;
const themeToggle = document.querySelector('#themeToggle');
const spinButton = document.querySelector('#spinButton');
const wheel = document.querySelector('.prize-wheel');
const wheelResult = document.querySelector('#wheelResult');
const leadForm = document.querySelector('#request');

const prizes = [
  'скидка 25%',
  'бесплатная доставка',
  'подарок',
  'скидка 10%',
  'попробуйте ещё раз',
  'бонус 100 баллов',
  'эксклюзивное предложение',
  'скидка 15%',
];

let currentRotation = 0;

const getSavedTheme = () => {
  try {
    return localStorage.getItem('agarta-wheel-theme-v2');
  } catch {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem('agarta-wheel-theme-v2', theme);
  } catch {
    // Theme persistence is optional for restricted browser modes.
  }
};

const setTheme = (theme) => {
  root.dataset.theme = theme;
  themeToggle.checked = theme === 'dark';
  saveTheme(theme);
};

setTheme(getSavedTheme() || 'light');

themeToggle.addEventListener('change', () => {
  setTheme(themeToggle.checked ? 'dark' : 'light');
});

spinButton.addEventListener('click', () => {
  const prizeIndex = Math.floor(Math.random() * prizes.length);
  const segment = 360 / prizes.length;
  const segmentOffset = prizeIndex * segment + segment / 2;

  currentRotation += 360 * 4 + (360 - segmentOffset);
  wheel.style.transform = `rotate(${currentRotation}deg)`;
  spinButton.disabled = true;
  wheelResult.textContent = 'Колесо вращается...';

  window.setTimeout(() => {
    wheelResult.textContent = `В демо выпало: ${prizes[prizeIndex]}. Контакт можно отправить в форму справа.`;
    spinButton.disabled = false;
  }, 1850);
});


leadForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = leadForm.querySelector('button[type="submit"]');
  submitButton.textContent = 'Заявка готова к отправке';
  submitButton.disabled = true;

  window.setTimeout(() => {
    submitButton.textContent = 'Получить план запуска';
    submitButton.disabled = false;
    leadForm.reset();
  }, 2200);
});

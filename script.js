const spinButton = document.querySelector('#spinButton');
const wheel = document.querySelector('.wheel');
const wheelResult = document.querySelector('#wheelResult');

const prizes = ['скидка 10%', 'демо-разбор', 'бонусный модуль', 'скидка 20%', 'гайд по запуску', 'подарок клиенту'];
let currentRotation = 0;

spinButton.addEventListener('click', () => {
  const prizeIndex = Math.floor(Math.random() * prizes.length);
  const fullTurns = 4 * 360;
  const segmentOffset = prizeIndex * 60 + 30;

  currentRotation += fullTurns + (360 - segmentOffset);
  wheel.style.transform = `rotate(${currentRotation}deg)`;
  spinButton.disabled = true;
  wheelResult.textContent = 'Колесо вращается...';

  window.setTimeout(() => {
    wheelResult.textContent = `Пример результата: ${prizes[prizeIndex]}. После этого открывается форма заявки.`;
    spinButton.disabled = false;
  }, 1850);
});

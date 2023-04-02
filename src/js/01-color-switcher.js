let isActive = false;
let switchColorId;

const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('.btn[data-btn="start"]'),
  btnStop: document.querySelector('.btn[data-btn="stop"]'),
};

refs.btnStart.addEventListener('click', handleStartSwitch);
refs.btnStop.addEventListener('click', handleStopSwitch);

function handleStartSwitch() {
  refs.btnStart.classList.add('disabled');
  isActive = true;
  switchColorId = setInterval(() => {
    const colorBgr = getRandomHexColor();
    refs.body.style.backgroundColor = colorBgr;
  }, 1000);
}

function handleStopSwitch() {
  if (isActive === false) return;
  refs.btnStart.classList.remove('disabled');
  clearInterval(switchColorId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

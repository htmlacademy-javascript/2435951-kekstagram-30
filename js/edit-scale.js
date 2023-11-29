const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const uploadImage = document.querySelector('.img-upload');
const imagePreveiw = document.querySelector('.img-upload__preview img');
const decreaseButton = uploadImage.querySelector('.scale__control--smaller');
const increaseButton = uploadImage.querySelector('.scale__control--bigger');
const scaleInput = uploadImage.querySelector('.scale__control--value');

const scaleImage = (value) => {
  imagePreveiw.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onDecreaseButtonClick = () => {
  scaleImage(Math.max(parseInt(scaleInput.value, 10)) - SCALE_STEP, MIN_SCALE);
  const decreaseScaleValue = Math.max(parseInt(scaleInput.value, 10));

  if (decreaseScaleValue < MIN_SCALE) {
    scaleImage(MIN_SCALE);
  }
};

const onIncreaseButtonClick = () => {
  scaleImage(Math.max(parseInt(scaleInput.value, 10)) + SCALE_STEP, MAX_SCALE);
  const increaseScaleValue = Math.max(parseInt(scaleInput.value, 10));

  if (increaseScaleValue > MAX_SCALE) {
    scaleImage(MAX_SCALE);
  }
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

decreaseButton.addEventListener('click', onDecreaseButtonClick);
increaseButton.addEventListener('click', onIncreaseButtonClick);

export { resetScale };

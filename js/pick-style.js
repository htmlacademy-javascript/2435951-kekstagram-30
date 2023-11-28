const Effects = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const filterEffects = {
  [Effects.CHROME]: {
    style: 'grayscale',
    unit: ''
  },
  [Effects.SEPIA]: {
    style: 'sepia',
    unit: ''
  },
  [Effects.MARVIN]: {
    style: 'invert',
    unit: '%'
  },
  [Effects.PHOBOS]: {
    style: 'blur',
    unit: 'px'
  },
  [Effects.HEAT]: {
    style: 'brightness',
    unit: ''
  }
};

const sliderOptionsSettings = {
  [Effects.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effects.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effects.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effects.MARVIN]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effects.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1
  },
  [Effects.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1
  }
};

const uploadImage = document.querySelector('.img-upload');
const uploadImagePreview = uploadImage.querySelector('.img-upload__preview img');
const imageEffects = uploadImage.querySelector('.effects');
const sliderContainer = uploadImage.querySelector('.img-upload__effect-level');
const effectValue = uploadImage.querySelector('.effect-level__value');

let pickedEffect = Effects.DEFAULT;

const isDefault = () => pickedEffect === Effects.DEFAULT;

const setStyle = () => {
  if(isDefault()) {
    uploadImagePreview.style.filter = null;
    return;
  }

  const {value} = effectValue;
  const {style, unit} = filterEffects[pickedEffect];
  uploadImagePreview.style.filter = `${style}(${value}${unit})`;
};

function showSlider() {
  sliderContainer.classList.remove('hidden');
}

function hideSlider() {
  sliderContainer.classList.add('hidden');
}

function onSliderUpdate() {
  effectValue.value = sliderContainer.noUiSlider.get();
  setStyle();
}

const createSlider = ({min, max, step}) => {
  noUiSlider.create(sliderContainer, {
    range: {min, max},
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });
  sliderContainer.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({min, max, step}) => {
  sliderContainer.noUiSlider.updateOptions({
    range: {min,max},
    step,
    start: max,
  });
};

const setSlider = () => {
  if(isDefault()) {
    hideSlider();
  } else {
    updateSlider(sliderOptionsSettings[pickedEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  pickedEffect = effect;
  updateSlider(sliderOptionsSettings[pickedEffect]);
  setSlider();
  setStyle();
};

const reset = () => {
  setEffect(Effects.DEFAULT);
};

const onEffectsChange = (e) => {
  setEffect(e.target.value);
};

const init = () => {
  createSlider(sliderOptionsSettings[pickedEffect]);
  imageEffects.addEventListener('change', onEffectsChange);
  setStyle();
  setSlider();
};

export {init, reset};

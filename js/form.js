import { init as initEffect} from './pick-style.js';
import { sendPicture } from './api.js';
import { hideLoadPopup } from './load-picture.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const MAX_HASHTAG_COUNT = 5;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const errorNotice = {
  INVALID_QUANTITY: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег'
};

const SubmitButtonCaption = {
  SUBMIT: 'Отправляю...',
  IDLE: 'Опубликовать',
};

const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');

function toggleSubmitButton(isDisabled) {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled
    ? SubmitButtonCaption.SUBMIT
    : SubmitButtonCaption.IDLE;
}

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => HASHTAG_PATTERN.test(tag));

const hasValidQuntity = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const sendForm = async (formElement) => {
  if (! pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendPicture(new FormData(formElement));
    toggleSubmitButton(false);
    hideLoadPopup();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
};

const onFormSubmit = (e) => {
  e.preventDefault();
  sendForm(e.target);
};

pristine.addValidator(hashtagInput, hasValidQuntity, errorNotice.INVALID_QUANTITY, 3, true);
pristine.addValidator(hashtagInput, hasUniqueTags, errorNotice.NOT_UNIQUE, 1, true);
pristine.addValidator(hashtagInput, hasValidTags, errorNotice.INVALID_PATTERN, 2, true);

form.addEventListener('submit', onFormSubmit);
initEffect();

export { pristine };

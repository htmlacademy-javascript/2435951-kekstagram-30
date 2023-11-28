import { init as initEffect} from './pick-style.js';

const MAX_HASHTAG_COUNT = 5;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const errorNotice = {
  INVALID_QUANTITY: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег'
};

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => HASHTAG_PATTERN.test(tag));

const hasValidQuntity = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const onFormSubmit = (e) => {
  e.preventDefault();
  pristine.validate();
};

pristine.addValidator(hashtagInput, hasValidQuntity, errorNotice.INVALID_QUANTITY, 3, true);
pristine.addValidator(hashtagInput, hasUniqueTags, errorNotice.NOT_UNIQUE, 2, true);
pristine.addValidator(hashtagInput, hasValidTags, errorNotice.INVALID_PATTERN, 1, true);

form.addEventListener('submit', onFormSubmit);
initEffect();

export {pristine};

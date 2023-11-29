import { resetScale } from './edit-scale.js';
import { reset as resetEffect } from './pick-style.js';
import { pristine } from './form.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const uploadInput = document.querySelector('.img-upload__input');
const imagePreveiw = document.querySelector('.img-upload__preview img');
const imagePreviews = document.querySelectorAll('.effects__preview');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

function showLoadPopup() {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadImage();
  document.addEventListener('keydown', onDocumentKeydown);
}

function hideLoadPopup() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetScale();
  resetEffect();
  pristine.reset();
  form.reset();
  document.removeEventListener('keydown', onDocumentKeydown);

}

const isCommentInputFocused = () =>
  document.activeElement === hashtagInput || document.activeElement === commentInput;

function isErrorMessageExists() {
  return Boolean(document.querySelector('.error'));
}

function onDocumentKeydown(e) {
  if(e.key === 'Escape' && !isCommentInputFocused() && !isErrorMessageExists()) {
    e.preventDefault();
    hideLoadPopup();
  }
}

function isValidType(file) {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
}

function uploadImage() {
  const file = uploadInput.files[0];

  if (file && isValidType(file)) {
    imagePreveiw.src = URL.createObjectURL(file);
    imagePreviews.forEach((item) => {
      item.style.backgroundImage = `url(${imagePreveiw.src})`;
    });
  }
}

uploadInput.addEventListener('change', showLoadPopup);
closeButton.addEventListener('click', hideLoadPopup);

export { hideLoadPopup };

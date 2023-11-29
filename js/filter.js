import { renderGallery, loadPictures } from './gallery.js';
import { debounce } from './utils.js';

const filterElement = document.querySelector('.img-filters');
const filterContainer = document.querySelector('.img-filters__form');
const filterDefault = filterContainer.querySelector('#filter-default');
const filterRandom = filterContainer.querySelector('#filter-random');
const filterPopular = filterContainer.querySelector('#filter-discussed');

const MAX_RANDOM_FILTER = 10;

const filters = {
  DEFAULT: 'default',
  RANDOM: 'random',
  POPULAR: 'popular',
};

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [filters.DEFAULT]: (data) => data,
  [filters.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [filters.POPULAR]: (data) => [...data].sort((itemA, itemB) => itemB.comments.length - itemA.comments.length)
};

let currentFilter = filters.DEFAULT;

const renderFilter = (event, filter, data) => {
  if (currentFilter !== filter) {
    const filerData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    const currentFilterEl = filterContainer.querySelector('.img-filters__button--active');
    pictures.forEach((item) => item.remove());
    const container = document.querySelector('.pictures');
    container.removeEventListener('click', renderGallery);
    loadPictures(filerData, container);
    currentFilterEl.classList.remove('img-filters__button--active');
    event.target.classList.add('img-filters__button--active');
    currentFilter = filter;
  }
};

const debouncedRender = debounce(renderFilter);

const initFilter = (data) => {
  filterElement.classList.remove('img-filters--inactive');

  filterDefault.addEventListener('click', (evt) => {
    debouncedRender(evt, filters.DEFAULT, data);
  });
  filterRandom.addEventListener('click', (evt) => {
    debouncedRender(evt, filters.RANDOM, data);
  });
  filterPopular.addEventListener('click', (evt) => {
    debouncedRender(evt, filters.POPULAR, data);
  });
};

export { initFilter };

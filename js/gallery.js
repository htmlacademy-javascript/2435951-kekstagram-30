import {renderPictures} from './thumbnail.js';
import { showPicture } from './popup.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (e) => {
    const picture = e.target.closest('[data-image-id]');

    if (! picture) {
      return;
    }

    e.preventDefault();
    const imageId = +picture.dataset.imageId;
    const pictureData = pictures.find(({id}) => id === imageId);
    showPicture(pictureData);
  });

  renderPictures(pictures, container);
};

export {renderGallery};

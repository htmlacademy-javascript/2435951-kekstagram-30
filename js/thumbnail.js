const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = ({id, url, description, likes, comments}) => {
  const image = imageTemplate.cloneNode(true);
  image.querySelector('.picture__img').src = url;
  image.querySelector('.picture__img').alt = description;
  image.querySelector('.picture__likes').textContent = likes;
  image.querySelector('.picture__comments').textContent = comments.length;
  image.dataset.imageId = id;

  return image;
};

const renderPictures = (pictures, container) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnails = createPicture(picture);
    fragment.append(thumbnails);
  });

  container.append(fragment);
};

export {renderPictures};

const imagesContainer = document.querySelector('.pictures');
const imageTemplate = document.querySelector('#picture').content;

const createPicture = ({url, description, likes, comments}) => {
  const image = imageTemplate.cloneNode(true);
  const imageItem = image.querySelector('img');
  imageItem.src = url;
  imageItem.alt = description;

  const imageLikes = image.querySelector('.picture__likes');
  imageLikes.textContent = likes;

  const imageComments = image.querySelector('.picture__comments');
  imageComments.textContent = comments.length;

  return image;
};

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnails = createPicture(picture);
    fragment.append(thumbnails);
  });

  imagesContainer.append(fragment);
};

export {renderPictures};

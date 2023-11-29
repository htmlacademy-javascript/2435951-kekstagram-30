const SHOWN_COMMENTS_QUANTITY = 5;

const picturePeviewContainer = document.querySelector('.big-picture');
const popupContainer = document.querySelector('body');
const popupClose = document.querySelector('.big-picture__cancel');
const commentCountContainer = picturePeviewContainer.querySelector('.social__comment-count');
const commentList = picturePeviewContainer.querySelector('.social__comments');
const commentCount = picturePeviewContainer.querySelector('.social__comment-shown-count');
const commentsTotalCounter = picturePeviewContainer.querySelector('.social__comment-total-count');
const commentsLoader = picturePeviewContainer.querySelector('.comments-loader');

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

let commentsCountShown = 0;
let comments = [];

const createComment = ({avatar, message, name}) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = () => {
  commentsCountShown += SHOWN_COMMENTS_QUANTITY;

  if (commentsCountShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsCountShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsCountShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);

  commentCount.textContent = commentsCountShown;
  commentsTotalCounter.textContent = comments.length;
};

const onSubmitLoaderClick = () => renderComments();

const renderPicture = ({url, description, likes}) => {
  picturePeviewContainer.querySelector('.big-picture__img img').src = url;
  picturePeviewContainer.querySelector('.big-picture__img img').alt = description;
  picturePeviewContainer.querySelector('.likes-count').textContent = likes;
  picturePeviewContainer.querySelector('.social__caption').textContent = description;
};

const showPicture = (pictureData) => {
  picturePeviewContainer.classList.remove('hidden');
  popupContainer.classList.add('modal-open');

  renderPicture(pictureData);

  comments = pictureData.comments;

  if (comments.length > 0) {
    renderComments();
  } else if (comments.length === 0) {
    const emptyCommentsList = document.createElement('li');
    emptyCommentsList.classList.add('social__comment');
    emptyCommentsList.textContent = 'Нет комментариев';
    commentList.innerHTML = '';
    commentList.append(emptyCommentsList);
    commentCountContainer.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  }

  document.addEventListener('keydown', onDocumentKeydown);
};

const hidePicture = () => {
  commentsCountShown = 0;
  picturePeviewContainer.classList.add('hidden');
  popupContainer.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(e) {
  if (e.key === 'Escape') {
    e.preventDefault();
    hidePicture();
  }
}

const onClosePopup = () => {
  hidePicture();
};

popupClose.addEventListener('click', onClosePopup);
commentsLoader.addEventListener('click', onSubmitLoaderClick);

export { showPicture, renderComments };

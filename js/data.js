import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './utils.js';

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 10;
const LIKE_MAX_COUNT = 200;
const COMMENTS_COUNT = 30;
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION = [
  'Если чётко сформулировать желание для Вселенной, то всё обязательно сбудется. Верьте в себя. Главное хотеть и мечтать.....',
  'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
  '#fun #party #cool #young',
  'Тестим новую камеру! #camera #test #new #newcameratest #pic #photo #instaphoto',
  'Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
  'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка',
];

const NAMES = [
  'Андрей',
  'Виталий',
  'Александр',
  'Михаил',
  'Кирилл',
  'Татьяна',
];

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from(
  {length: getRandomInteger(1, 2)},
  () => getRandomArrayElement(COMMENTS),
).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  name: getRandomArrayElement(NAMES),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage()
});

const generatePhotoId = createIdGenerator();

const createPicture = (index) => ({
  id: generatePhotoId(),
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from(
    {length: getRandomInteger(0, COMMENTS_COUNT)},
    createComment,
  ),
});

const getPictures = () => Array.from(
  {length: PICTURE_COUNT},
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);

export {getPictures};

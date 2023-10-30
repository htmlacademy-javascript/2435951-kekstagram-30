const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 0;
const LIKE_MAX_COUNT = 500;

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION = [
  'Если чётко сформулировать желание для Вселенной, то всё обязательно сбудется. Верьте в себя. Главное хотеть и мечтать..... / I\'ve bought some potatoes.',
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


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGenerated = 0;

  return () => {
    lastGenerated += 1;
    return lastGenerated;
  };
};

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
    {length: getRandomInteger(0, COMMENTS.length)},
    createComment,
  ),
});

const getPictures = () => Array.from(
  {length: PICTURE_COUNT},
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);
getPictures();

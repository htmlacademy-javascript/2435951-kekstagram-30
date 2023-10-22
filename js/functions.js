function isLessOrEqual(string, length) {
  return string.length <= length;
}

isLessOrEqual('проверяемая строка', 20); // true
isLessOrEqual('проверяемая строка', 18); // true
isLessOrEqual('проверяемая строка', 10); // false

function isPalindrome(value) {
  const string = value.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < string.length / 2; i++) {
    if (string.at(i) !== string.at(- i - 1)) {
      return false;
    }
    return true;
  }
}

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true


function extractNumber(arg) {
  const string = arg.toString();
  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
}
extractNumber('2023 год'); // 2023
extractNumber('ECMAScript 2022'); // 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('агент 007'); // 7
extractNumber('а я томат'); // NaN

function compareLength(string, length) {
  return string.length <= length;
}

compareLength('проверяемая строка', 20); // true
compareLength('проверяемая строка', 18); // true
compareLength('проверяемая строка', 10); // false

function checkReflectivity(value) {
  const string = value.replaceAll(' ', '').toLowerCase();
  let reflexCond = true;
  for (let i = 0; i < string.length / 2; i++) {
    if (string.at(i) !== string.at(string.length - i - 1)) {
      reflexCond = false;
    }
  }
  return reflexCond;
}

checkReflectivity('топот'); // true
checkReflectivity('ДовОд'); // true
checkReflectivity('Кекс'); // false
checkReflectivity('Лёша на полке клопа нашёл '); // true


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

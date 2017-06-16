export function getElementFromTemplate(html) {
  const template = document.createElement(`div`);
  template.innerHTML = html;
  return template.firstChild;
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function arrayShuffle(array) {
  for (let i = array.length; i; i--) {
    let j = getRandomInt(0, i);
    [array[i - 1], array[j]] = [array[j], array[i - 1]];
  }

  return array;
}

export function padLeft(value = 0) {
  return value > 9 ? value.toString() : `0${value}`;
}

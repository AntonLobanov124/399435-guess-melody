export function getElementFromTemplate(html) {
  const template = document.createElement(`div`);
  template.innerHTML = html;
  return template.firstChild;
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function arrayShuffle(array) {
  const ar = array.slice(0);
  for (let i = ar.length; i; i--) {
    let j = getRandomInt(0, i);
    [ar[i - 1], ar[j]] = [ar[j], ar[i - 1]];
  }

  return ar;
}

export function padLeft(value = 0) {
  return value > 9 ? value.toString() : `0${value}`;
}

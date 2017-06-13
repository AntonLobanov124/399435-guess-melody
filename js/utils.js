export function getElementFromTemplate(html) {
  const template = document.createElement(`div`);
  template.innerHTML = html;
  return template.firstChild;
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function arrayShuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }

  return a;
}

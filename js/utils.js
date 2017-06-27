export function getElementFromTemplate(html) {
  const template = document.createElement(`div`);
  template.innerHTML = html;
  return template.firstChild;
}

export function padLeft(value = 0) {
  return value > 9 ? value.toString() : `0${value}`;
}

export function preloadAudio(urls = []) {
  if (!Array.isArray(urls)) {
    throw new Error(`Invalid parameter.`);
  }

  urls = urls.filter((value, index, self) => value !== `` && self.indexOf(value) === index);

  return Promise.all(urls.map((url) => new Promise((resolve) => {
    const audio = new Audio();
    audio.addEventListener(`canplaythrough`, resolve, false);
    audio.src = url;
  })));
}

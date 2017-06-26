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

export function preloadAudio(urls = []) {
  if (!Array.isArray(urls)) {
    throw new Error(`Invalid parameter.`);
  }

  urls = urls.filter((value, index, self) => value != `` && self.indexOf(value) === index);

  let loaded = 0;
  return new Promise((resolve, reject) => {
    const loadNextAudio = () => {
      loadAudio(urls[loaded]);
    };

    const loadedAudio = () => {
      loaded++;
      if (loaded === urls.length) {
        resolve(loaded);
      } else {
        loadNextAudio();
      }
    };

    const loadAudio = (url) => {
      const audio = new Audio();

      audio.addEventListener(`canplaythrough`, loadedAudio, false);
      audio.src = url;
    };

    loadNextAudio();
  });
}

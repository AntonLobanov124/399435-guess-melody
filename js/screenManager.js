const mainNode = document.querySelector(`.main`);

export function clearScreen() {
  mainNode.innerHTML = ``;
}

export function showScreen(screen) {
  if (!screen) {
    return;
  }

  clearScreen();
  mainNode.appendChild(screen);
}

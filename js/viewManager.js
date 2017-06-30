const mainNode = document.querySelector(`.main`);

export function clearView() {
  mainNode.innerHTML = ``;
}

export function changeView(view) {
  if (!view || !view.element) {
    return;
  }

  clearView();
  mainNode.appendChild(view.element);
}

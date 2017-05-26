window.main = function () {
  const _mainNode = document.querySelector(`.main`);
  const _templatesNodeList = document.querySelector(`#templates`).content.children;
  const _screenIndexes = [5, 0, 1, 4, 3, 2];

  let _currentScreen = 0;

  function keyPressHandler(evt) {
    const KEY_LEFT = 37;
    const KEY_RIGHT = 39;
    if (evt.altKey) {
      if (evt.keyCode === KEY_LEFT) {
        showScreen(_currentScreen - 1);
      } else if (evt.keyCode === KEY_RIGHT) {
        showScreen(_currentScreen + 1);
      }
    }
  }

  function clearMainNode() {
    while (_mainNode.lastChild) {
      _mainNode.removeChild(_mainNode.lastChild);
    }
  }

  function showScreen(index = 0) {
    if (index > _templatesNodeList.length - 1 || index > _screenIndexes.length - 1 || index < 0) {
      return;
    }

    _currentScreen = index;

    clearMainNode();

    _mainNode.appendChild(_templatesNodeList[_screenIndexes[index]].cloneNode(true));
  }

  function init() {
    showScreen(_currentScreen);
    document.addEventListener(`keyup`, keyPressHandler);
  }

  init();
}();

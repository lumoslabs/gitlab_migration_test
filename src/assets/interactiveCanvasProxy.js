function interactiveCanvasProxy() {
  var storage = {
    onUpdate: [],
  }
  var bindings = {}
  var callbacks = {
    onUpdate(data) {
      bindings.onUpdate ? bindings.onUpdate(data) : storage.onUpdate.push(data)
    },
    onTtsMark(markName) {
      bindings.onTtsMark ? bindings.onTtsMark(markName) : null
    },
    onListeningModeChanged(data, reason) {
      bindings.onListeningModeChanged ? bindings.onListeningModeChanged(data, reason) : null
    },
    onPhraseMatched(data) {
      bindings.onPhraseMatched ? bindings.onPhraseMatched(data) : null
    },
    onPhraseUnmatched() {
      bindings.onPhraseUnmatched ? bindings.onPhraseUnmatched() : null
    },
  }
  window.interactiveCanvas.ready(callbacks)
  return {
    ready: function (realCallbacks) {
      Object.keys(callbacks).forEach((key) => {
        if (realCallbacks && realCallbacks[key] && (typeof realCallbacks[key] === 'function')) {
          bindings[key] = realCallbacks[key]
          if (storage[key]) {
            storage[key].forEach((data) => {
              realCallbacks[key](data)
            })
          }
        }
      })
    }
  }
}
window.interactiveCanvasProxy = new interactiveCanvasProxy()

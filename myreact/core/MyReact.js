import { debounce } from "../utils/debounce.js";

export function MyReact () {
  const options = {
    states: [],
    currentState: 0,
    renderCount: 0,
    rootComponent: null,
    root: null,
  }

  function useState (initState) {
    const { currentState: key, states } = options;
    if (states.length === key) {
      states.push(initState);
    }
    const state = states[key];
    const setState = (newState) => {
      if (newState === state) return;
      if (JSON.stringify(newState) === JSON.stringify(state)) return;
      states[key] = newState;
      _render();
    }
    options.currentState += 1;
    return [state, setState];
  }

  const _render = debounce(() => {
    const { root, rootComponent } = options;
    if (!root || !rootComponent) return;
    root.innerHTML = rootComponent();
    options.renderCount += 1;
    options.currentState = 0;
  });

  function render (rootComponent, root) {
    options.rootComponent = rootComponent;
    options.root = root;
    _render();
  }

  return { useState, render };
}

export const { useState, render } = MyReact();

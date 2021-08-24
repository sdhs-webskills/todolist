import {TodoItems} from "./components/TodoItems.js";
import {FilterTypes} from "./constants.js";

const $root = document.querySelector('#root');

let state = {
  items: [
    { id: 0, completed: true, content: '완료됨' },
    { id: 1, completed: false, content: '해야됨' },
    { id: 2, completed: true, content: 'test' },
  ],
  selectedFilter: FilterTypes.COMPLETED,
};

const setState = (newState) => {
  state = { ...state, ...newState };
  render();
}

const render = () => {
  $root.innerHTML = `
    <div id="wrap">
      <h1>todos</h1>
      <div id="input">
        <div id="all_sel"></div>
        <input type="text" placeholder="What needs to be done?" id="main" size="45">
      </div>
      ${TodoItems(state)}
    </div>
    <p class="set_text">Double-click to edit a todo</p>
  `;

  bindEvent($root);
}

const bindEvent = ($el) => {

  $el.querySelector('#main').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    setState({
      items: [
        ...state.items,
        { id: Date.now(), activation: false, content: e.target.value }
      ]
    });
  })

  $el.querySelectorAll('.check').forEach(el => {
    el.addEventListener('click', (event) => {
      const id = event.target.closest('[data-id]').dataset.id;
      const index = state.items.findIndex(v => v.id === Number(id));
      const activation = state.items[index].activation;
      state.items[index].activation = !activation;
      setState({ items: state.items });
    })
  });

  $el.querySelectorAll('.list').forEach(el => {
    el.addEventListener('mouseenter', ({ target }) => {
      target.classList.add('hov');
    })

    el.addEventListener('mouseleave', ({ target }) => {
      target.classList.remove('hov');
    })
  });

  $el.querySelectorAll('.close').forEach(el => {
    el.addEventListener('click', (event) => {
      const id = Number(event.target.closest('[data-id]').dataset.id);
      setState({
        items: state.items.filter(v => v.id !== id)
      });
    })
  });

  $el.querySelectorAll('.close').forEach(el => {
    el.addEventListener('click', (event) => {
      const id = Number(event.target.closest('[data-id]').dataset.id);
      setState({
        items: state.items.filter(v => v.id !== id)
      });
    })
  });

  $el.querySelectorAll('.filter-control').forEach(el => {
    el.addEventListener('click', () => {
      setState({
        selectedFilter: el.dataset.filterType
      })
    })
  })
}

render();

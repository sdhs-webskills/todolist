export const TodoItem = ({
  completed,
  content,
  id
}) => {
  return `
    <li class="list ${completed ? 'li_ac' : ''}" data-id="${id}">
      <div class="check">${completed ? '✓' : ''}</div>
      <p class="text">${content}</p>
      <p class="close">X</p>
    </li>
  `
}
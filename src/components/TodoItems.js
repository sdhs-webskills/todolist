import {TodoItem} from "./TodoItem.js";
import {FilterTypes} from "../constants.js";

export const FilterLabels = [
  { type: FilterTypes.ALL, id: 'all', label: 'All' },
  { type: FilterTypes.ACTIVE, id: 'act', label: 'Active' },
  { type: FilterTypes.COMPLETED, id: 'com', label: 'Completed' },
];

export const TodoItems = ({ items, selectedFilter }) => {

  const filterItem = ({ completed }) => {
    return selectedFilter === FilterTypes.COMPLETED ? completed  :
           selectedFilter === FilterTypes.ACTIVE    ? !completed : true
  }

  return `
    <ul id="list">
      ${items.filter(filterItem).map(TodoItem).join('')}
      <li id="controll" style="display: flex">
        <span id="item"></span>
        <div id="flex">
          ${FilterLabels.map(({ type, id, label }) => `
            <span
              id="${id}"
              class="filter-control ${type === selectedFilter ? 'sp_ac' : '' }"
              data-filter-type="${type}"
            >
              ${label}
            </span>
          `).join('')}
        </div>
        <span id="cle">Clear completed</span>
      </li>
    </ul>
  `
}

const $ = e => document.querySelector(e);
const $all = e =>  [...document.querySelectorAll(e)];
let year = new Date().getFullYear();
let month = new Date().getMonth();
const w = `<div class="w">일</div><div class="w">월</div><div class="w">화</div><div class="w">수</div><div class="w">목</div><div class="w">금</div><div class="w">토</div>`
let YMD = undefined;
let todos;

const modalPopup = e => {
    if(!e.target.dataset.ymd) return;
    YMD = e.target.dataset.ymd;
    todos = JSON.parse(localStorage.getItem(YMD)) || {
        input: '',
        items: [],
        status: 'all',
    }
    $('#todoList').classList.remove('none');
    setTodos();
    $('.modalClose').addEventListener('click', () => {
        $('#todoList').classList.add('none');
        [...$list.children].forEach(e => {
            if(e.classList.contains('list')) e.parentNode.removeChild(e);
        })
    });
}

const render = (year, month) => {
    $('#calendar').innerHTML = ``;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    add(firstDay.getDay(), lastDay.getDate(), prevLastDay.getDate(), ++month, year);
   
    $('.calendar').addEventListener('click', modalPopup);
}
const add = (firstDay, lastDay, prevLastDay, month, year) => {
    $('.year').innerText = year;
    $('.month').innerText = month;
    const c = document.createElement('div');
    c.innerHTML = `
        <div class="calendar grid">
            ${w}
            ${Array.from(Array(firstDay), (_, idx) => `<div class="toDay prevDay">${prevLastDay - firstDay + 1 + idx}</div>`).join('')}
            ${Array.from(Array(lastDay), (_, idx) => `<div class="toDay" data-ymd="${year}-${month}-${idx + 1}"><a href="sub.html">${idx + 1}</a></div>`).join('')}
            </div>
        `;
    $('#calendar').append(c);
}
const btnClick = function() {
    if(+this.dataset.m === 1) {
        month++;
        if(month >= 0 && month < 12) {
            render(year, month);
        } else if(month > 11) {
            month = 0;
            year++;
            render(year, month);
        }
    } else {
        month--;
        if(month >= 0 && month < 12) {
            render(year, month);
        } else if(month < 0) {
            month = 11;
            year--;
            render(year, month);
        }
    }
}

render(year, month);
$all('.monthBtn').forEach(ele => ele.addEventListener('click', btnClick))

const $allSel = $('#all_sel');
const $main = $('#main');
const $list = $('#list');
const $item = $('#item');
const $ctrl = $('#controll');
const $ctrlBtn = $all('#controll > div > span');
const $cle = $('#cle');

const setTodos = (state = {}) => {
    if(!YMD) return;
    todos = {...todos, ...state};
    const {items, status} = todos;
    localStorage.setItem(YMD, JSON.stringify(todos));
    todos.items = todos.items.filter(({date}) => date === YMD);
    todos.preview = (
        status === 'all' ? items :
        status === 'act' ? items.filter(({isChecked}) => !isChecked) :
        status === 'com' ? items.filter(({isChecked}) => isChecked) : items
    )
    todoRender();
}

const addTodo = (name = '') => {
    setTodos({items : [...todos.items, {
        name,
        isEdit: false,
        isChecked: false,
        date: YMD
    }]})
}

const removeTodo = (removeIdx) => {
    setTodos({items: todos.items.filter((_, idx) => idx !== removeIdx)});
}

function init() {
    setEvent();
    setTodos();
}

function setEvent() {
    $main.addEventListener('keydown', function(event) {
        const keyCode = event.keyCode;
        const isAdd = [13].includes(keyCode);
        if(isAdd && this.value === '') {
            alert('내용을 입력해 주세요.');
            return;
        }
        isAdd && addTodo(this.value);
        if(isAdd && this.value !== '') $main.value = '';
    })
    $ctrlBtn.forEach(($btn, idx) => {
        $btn.dataset.status = (
            idx === 0 ? 'all' :
            idx === 1 ? 'act' :
            idx === 2 ? 'com' : ''
        )
        $btn.addEventListener('click', function() {
            todos.status = this.dataset.status;
            setTodos();
        })
    })
    $cle.addEventListener('click', () => {
        todos.items = todos.items.filter(({isChecked}) => !isChecked);
        setTodos();
    })
    $allSel.addEventListener('click', () => {
        const {preview} = todos;
        const isBoolean = preview.every(({isChecked}) => isChecked);
        preview.forEach(item => item.isChecked = !isBoolean);
        setTodos();
    })
}

function todoRender() {
    const {items, status, preview} = todos;
    let $ctrlTemp = [...$list.children].filter(e => !e.classList.contains('list'));
    $list.innerHTML = '';
    $list.appendChild($ctrlTemp[0]);
    $item.textContent = preview.length + '개';
    $ctrlBtn.forEach($btn => {
        $btn.dataset.status === status ?
        $btn.classList.add('sp_ac') :
        $btn.classList.remove('sp_ac');
    })
    if(items.length > 0) $ctrl.classList.add('flex');
    else $ctrl.classList.remove('flex');

    preview.forEach((item, idx) => {
        const {name, isChecked, isEdit} = item;

        const $todo = document.createElement('li');
        $todo.className = `list ${isChecked ? 'li_ac' : ''}`;
        $todo.innerHTML = `
            <div class="check">${isChecked ? '✓' : ''}</div>
            ${
                isEdit
                ? `<input type="text" class="edit" value="${name}"/>
                <p class="text none">${name}</p>`
                : `<input type="text" class="edit none" value="${name}"/>
                <p class="text">${name}</p>`
            }
            <p class="close">X</p>
        `;
        $list.append($todo);

        const $check = $todo.querySelector('.check');
        const $text = $todo.querySelector('.text');
        const $edit = $todo.querySelector('.edit');
        const $close = $todo.querySelector('.close');

        $check.addEventListener('click', () => {
            item.isChecked = !isChecked;
            setTodos();
        })

        if($text) {
            $text.addEventListener('dblclick', () => {
                item.isEdit = true;
                setTodos();
            })
        }

        if($edit) {
            let bool = false;
            let len = $edit.value.length;
            $edit.focus();
            $edit.setSelectionRange(len, len);
            const setEdit = function() {
                if(bool) return;
                item.isEdit = false;
                item.name = this.value;
                setTodos();
            }
            $edit.addEventListener('keydown', function(event) {
                const keycode = event.keyCode;
                const isEdit = [13].includes(keycode);
                if(isEdit && this.value === '') {
                    alert('내용을 입력해 주세요.');
                    bool = true;
                    return;
                }
                if(isEdit) {
                    bool = false;
                    setEdit();
                }
                if(isEdit && this.value !== '') {
                    bool = false;
                    $edit.value = '';
                };
            })
            $edit.addEventListener('blur', setEdit);
        }

        $todo.addEventListener('mousemove', () => {
            $todo.classList.add('hov');
        })

        $todo.addEventListener('mouseleave', () => {
            $todo.classList.remove('hov');
        })

        $close.addEventListener('click', () => {
            removeTodo(idx);
        })
    })
}
init();
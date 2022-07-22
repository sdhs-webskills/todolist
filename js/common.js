const $ = query => document.querySelector(query);
const $all = query => [...document.querySelectorAll(query)];

const $allSel = $('#all_sel');
const $main = $('#main');
const $list = $('#list');
const $item = $('#item');
const $ctrl = $('#controll');
const $ctrlBtn = $all('#controll > div > span');
const $cle = $('#cle');

let todos = JSON.parse(localStorage.getItem('todos')) || {
    input: '',
    items: [
        // {
        //     name: 'What needs to be done?',
        //     isEdit: false,
        //     isChecked: false
        // }
    ],
    status: 'all'
}

const setTodos = (state = {}) => {
    todos = {...todos, ...state};
    const {items, status} = todos;
    todos.preview = (
        status === 'all' ? items :
        status === 'act' ? items.filter(({isChecked}) => !isChecked) :
        status === 'com' ? items.filter(({isChecked}) => isChecked) : items
    )
    localStorage.setItem('todos', JSON.stringify(todos));
    todoRender();
}

const addTodo = (name = '') => {
    setTodos({items: [...todos.items, {
        name,
        isEdit: false,
        isChecked: false
    }]})
}

const removeTodo = (removeIdx) => {
    setTodos({
        items: todos.items.filter((_, idx) => idx !== removeIdx)
    })
}

function init() {
    setEvent();
    setTodos();
}

function setEvent() {
    //투두 생성
    $main.addEventListener('keydown', function(event) {
        const keyCode = event.keyCode;
        const isAdd = [13].includes(keyCode);
        if(isAdd && this.value === '') {
            alert('내용을 입력해 주세요.');
            return;
        } else if (isAdd && this.value !== '') {
            todos.input = '';
            addTodo(this.value);
        }
    })
    // 투두 인풋값 저장
    $main.addEventListener('input', function() {
        todos.input = this.value;
        setTodos();
    })
    // 투두 상태 변경
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
    // 투두 선택 제거
    $cle.addEventListener('click', () => {
        todos.items = todos.items.filter(({isChecked}) => !isChecked);
        setTodos();
    })
    // 투두 전체 선택
    $allSel.addEventListener('click', () => {
        const {preview} = todos;
        const isBoolean = preview.every(({isChecked}) => isChecked);
        preview.forEach(item => item.isChecked = !isBoolean);
        setTodos();
    })
}

function todoRender() {
    const {status, items, input, preview} = todos;
    // 기본 설정
    $main.value = input; // 인풋 기본 값 추가
    [...$list.children].forEach(e => { // 내용 초기화
        if(e.classList.contains("list")) e.parentNode.removeChild(e);
    })
    $item.textContent = preview.length + '개'; // 카운트 추가
    $ctrlBtn.forEach($btn => { // 상태 클래스 추가
        $btn.dataset.status === status ?
        $btn.classList.add('sp_ac') :
        $btn.classList.remove('sp_ac')
    })

    if(items.length > 0) {
        $ctrl.classList.add('flex');
    } else {
        $ctrl.classList.remove('flex');
    }

    // 투두 리스트 렌더링
    preview.forEach((item, idx) => {
        const {name, isChecked, isEdit} = item;

        // 투두 리스트에 투두 추가
        const $todo = document.createElement('li');
        $todo.className = `list ${isChecked ? 'li_ac' :  ''}`;
        $todo.innerHTML = `
            <div class="check">${isChecked ? '✓' : ''}</div>
            ${
                isEdit
                ? `<input type="text" class="edit" value="${name}"/>`
                : `<p class="text">${name}</p>`
            }
            <p class="close">X</p>
        `;
        $list.append($todo);

        
        // 투두 리스트의 아이템 엘리먼트
        const $check = $todo.querySelector('.check');
        const $text = $todo.querySelector('.text');
        const $edit = $todo.querySelector('.edit');
        const $close = $todo.querySelector('.close');
        
        $check.addEventListener('click', () => { // 체크 박스
            item.isChecked = !isChecked;
            setTodos();
        })

        if($text) { // 수정이 아닐 때
            $text.addEventListener('dblclick', () => {
                item.isEdit = true;
                setTodos();
            })
        }

        if($edit) { // 수정일 때
            let len = $edit.value.length;
            $edit.focus();
            $edit.setSelectionRange(len, len);
            const setEdit = function() {
                item.isEdit = false;
                item.name = this.value;
                setTodos();
            }
            $edit.addEventListener('keydown', function(event) {
                if(!this.value) return;
                const keycode = event.keyCode;
                const isEdit = [13].includes(keycode);
                isEdit && setEdit();
            })
            $edit.addEventListener('blur', setEdit);
        }


        $todo.addEventListener('mousemove', () => {
            $todo.classList.add('hov');
        })

        $todo.addEventListener('mouseleave', () => {
            $todo.classList.remove('hov');
        })
        
        $close.addEventListener('click', () => { // 투두 삭제
            removeTodo(idx);
        })

    })
    
}

init();
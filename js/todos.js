const $ = query => document.querySelector(query);
const $all = query => [...document.querySelectorAll(query)];

const $todoInput = $('.todo-input');
const $todoAllChecked = $('.todo-all-checked');
const $todoContents = $('.todo-contents');
const $todoStatus = $all('.todo-status>li');
const $todoCount = $('.todo-count');
const $todoClearCompleteBtn = $('.todo-clear-complete-btn');

let todos = JSON.parse(localStorage.getItem('todos')) || {
    input:'',
    items:[
        {
            name:'제목', 
            isEdit:false,
            isChekced:false,
        }
    ],
    status:'all'
};

const setTodos = (state={}) => {
    todos = { ...todos, ...state };
    const { items, status } = todos;
    todos.preview = (
        status === 'all' ? items :
        status === 'active' ? items.filter( ({isChekced}) => !isChekced ) :
        status === 'complete' ? items.filter( ({isChekced}) => isChekced ) : items
    );
    localStorage.setItem('todos',JSON.stringify(todos));
    todoRender();
};


const addTodo = (name="") => {
    setTodos({ items: [...todos.items,{
        name,
        isEdit:false,
        isChekced:false
    }] })
};

const removeTodo = (removeIdx) => {
    setTodos({
        items: todos.items.filter( (_,idx) => idx !== removeIdx )
    });
};

function init(){
    setEvent();
    setTodos();
}
function setEvent(){
    // 투두 생성
    $todoInput.addEventListener('keydown',function(event){ 
        const keyCode = event.keyCode;
        const isAdd = [13].includes(keyCode);
        if( isAdd ){
            todos.input = ''
            addTodo(this.value);
        }
    });
    // 투두 인풋값 저장
    $todoInput.addEventListener('input',function(){
        todos.input = this.value;
        setTodos();
    });

    // 투두 상태 변경
    $todoStatus.forEach( $item => $item.addEventListener('click',function(){
        todos.status = this.dataset.status;
        setTodos();
    }) );

    // 투두 선택 제거
    $todoClearCompleteBtn.addEventListener('click',()=>{
        todos.items = todos.items.filter( ({isChekced}) => !isChekced );
        setTodos();
    });

    // 투두 전체 선택
    $todoAllChecked.addEventListener('click',()=>{
        const { preview } = todos;
        const isBoolean = preview.every( ({isChekced}) => isChekced );
        isBoolean ? 
            $todoAllChecked.classList.remove('selected') :
            $todoAllChecked.classList.add('selected')
        preview.forEach( item => item.isChekced = !isBoolean );
        setTodos();
    })
}

function todoRender(){
    const { status, items, input, preview } = todos;
    // 기본 설정
    $todoInput.value = input; // 인풋 기본 값 추가
    $todoContents.innerHTML = ''; // 내용 초기화
    $todoCount.textContent = preview.length; // 카운트 추가
    $todoStatus.forEach( item => { // 상태 클래스 추가
        item.dataset.status === status ? 
            item.classList.add('active') :
            item.classList.remove('active') 
    } )

    items.some( ({isChekced}) => isChekced ) ?  // 선택된 투두 보이기 설정
        $todoClearCompleteBtn.classList.add('show') :
        $todoClearCompleteBtn.classList.remove('show')

    // 투두 리스트 렌더링
    preview.forEach( (item,idx) =>{
        const { name, isChekced, isEdit } = item;

        // 투두 리스트에 투두 추가
        const $item = document.createElement('div');
        $item.className = 'flex';
        $item.innerHTML = `
            <button class="active-btn ${ isChekced && 'checked' }">체크박스</button>
            ${ isEdit 
                ? `<input type="text" class="edit-input" value="${name}" />`
                : `<p class="todo-name">${name}</p>`
             }
            <button class="remove-btn"> X </button>
        `;
        $todoContents.append($item);


        // 투투 리스트의 아이템 엘리먼트
        const $activeBtn = $item.querySelector('.active-btn');
        const $todoName = $item.querySelector('.todo-name');
        const $editInput = $item.querySelector('.edit-input');
        const $removeBtn = $item.querySelector('.remove-btn');

        $activeBtn.addEventListener('click',() => { // 체크 박스
            item.isChekced = !isChekced;
            setTodos();
        });

        if( $todoName ){ // 수정이 아닐 때
            $todoName.addEventListener('dblclick',() => {
                item.isEdit = true;
                setTodos();
            });
        }

        if( $editInput ){ // 수정일 때 
         $editInput.focus();
         const setEdit = function(){
            item.isEdit = false;
            item.name = this.value;
            setTodos();
         }
         $editInput.addEventListener('keydown',function(event){
            const keycode = event.keyCode;
            const isEdit = [13].includes(keycode);
            isEdit && setEdit();
         });
         $editInput.addEventListener('blur',setEdit);
        }

        $removeBtn.addEventListener('click',()=>{ // 투두 삭제
            removeTodo(idx);
        });

    });
}

init();
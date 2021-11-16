// 전역 변수들
const searchBox = document.querySelector("#wrap #input input");
const listBox = document.querySelector("#wrap #list");
const controll = document.querySelector("#wrap #list #controll");
const itemLen = document.querySelector("#wrap #list #controll #item");

const allCheckBtn = document.querySelector("#wrap #input #all_sel");
const allBtn = document.querySelector("#wrap #list #controll #all");
const actBtn = document.querySelector("#wrap #list #controll #act");
const comBtn = document.querySelector("#wrap #list #controll #com");
const cleBtn = document.querySelector("#wrap #list #controll #cle");

const btns = [allBtn, actBtn, comBtn];                          // 컨트롤바에 있는 버튼 3개를 담고 있는 배열
let todoList = JSON.parse(localStorage.getItem('Todo')) || [];  // TodoList localStorage에서 가져오기 || 아님 초기값
let todoCount = todoList[todoList.length - 1] || 0;     // TodoList의 번호

const getLocal = () => {    // localStorage에 todoList를 저장하는 함수
    localStorage.setItem('Todo', JSON.stringify(todoList));     
}

const highBtn = (btn) => {  // 버튼에 하이라이트를 주는 함수
    btns.forEach((ele) => {
        ele.classList.remove("sp_ac");
    })
    btn.classList.add("sp_ac");
}

const controllDis = () => { // todoList가 있으면 컨트롤바 보이게 하는 함수
    controll.style.display = listBox.children.length > 1 ? "flex" : "none";
};

const createTodo = () => {  // todoList를 만드는 함수
    [...listBox.children].forEach((ele, idx) => {   // 컨트롤바를 제외한 모든 listBox의 자식요소 지우기
        if(idx !== 0){
            ele.remove();
        }
    })

    todoList = todoList.filter((ele) => {   // todoList 배열에 빈값 지우기
        if(ele){ return ele }
    })

    todoList.forEach((ele, idx) => {    // todoList 그리기
        let list = document.createElement('li');
        list.classList.add("list");
        if(ele.check){
            list.classList.add("li_ac");
        }
        list.dataset.num = ele.num;
        list.innerHTML = `
        <div class="check">${ele.check ? "✓": ""}</div>
        <p class="text">${ele.text}</p>
        <p class="close">X</p>
        `;
        listBox.appendChild(list);
    })
    itemLen.innerHTML = listBox.children.length > 1 ? listBox.children.length - 1 : ""; //todoList의 갯수를 표기하기
    controllDis();
    getLocal();
};

const btnEvent = (bool) => {    // createTodo랑 비슷하지만 체크 되었있거나 안되었있는 todo끼리만 나타내는 함수
    [...listBox.children].forEach((ele, idx) => {
        if(idx !== 0){
            ele.remove();
        }
    })

    for(const todo of todoList){
        if(bool != todo.check){
            continue;
        }
        let list = document.createElement('li');
        list.classList.add("list");
        if(todo.check){
            list.classList.add("li_ac");
        }
        list.dataset.num = todo.num;
        list.innerHTML = `
        <div class="check">${todo.check ? "✓": ""}</div>
        <p class="text">${todo.text}</p>
        <p class="close">X</p>
        `;
        listBox.appendChild(list);
    }
    getLocal();
};

searchBox.addEventListener("keydown", ({key}) => {  // input에 엔터 입력시 todoList배열안에 정보 입력하는 함수
    if(key === "Enter"){
        if(searchBox.value === ""){     // 빈값은 안들어가게 막기
            alert("내용을 입력해 주세요")
            return false;
        }
        if(typeof(todoCount) !== "number"){
            todoCount = todoCount.num + 1;
        }
        todoList.push({num: todoCount, text: searchBox.value, check: false});
        todoCount += 1;
        createTodo();
        searchBox.value = "";
    }
})

listBox.addEventListener("click", ({target}) => {   // check박스 클릭시 체크되거나 체크 해제되게 만듦
    if(target.classList[0] === "check"){
        for(const todo of todoList){
            if(todo.num == target.parentNode.dataset["num"]){
                todo.check = !todo.check;
            }
        }
        createTodo();
    }
})

allCheckBtn.addEventListener("click", () => {   // 모든 todo 체크 or 체크해제로 만듦
    let allTrue = false;
    let count = 0;
    for(const todo of todoList){
        if(todo.check === true){
            count += 1;
        }
    }
    if(count === todoList.length){
        allTrue = true;
    }
    todoList.forEach((ele) => {
        if(allTrue){
            ele.check = false;
        } else {
            ele.check = true;
        }
    })
    createTodo();
})

listBox.addEventListener("mouseenter", () => {  // listBox에 마우스 올리면 실행
    [...listBox.children].forEach((ele) => {    // listBox에 자식요소들 forEach 돌리기
        ele.addEventListener("mouseenter", ({target}) => {  // listBox에 자식요소들 위로 마우스 올리면 실행
            if(target.classList[0] === "list"){    // 올린 곳이 list면 실행
                target.classList.add("hov");    // list에 hov 클래스 추가
            }
            target.children[2].addEventListener("click", ({target}) => {    // x버튼 클릭시 실행
                todoList.forEach((ele, idx) => {
                    if(ele.num == target.parentNode.dataset["num"]){
                        delete todoList[idx];   // 해당 todo 배열에서 삭제
                    }
                })
                createTodo();
            })
        })
        ele.addEventListener("mouseleave", ({target}) => {  // 마우스가 list에서 벗어나면 실행
            target.classList.remove("hov");     // list에서 hov 클래스 삭제
        })
    })
})

allBtn.addEventListener("click", () => {    // allBtn 클릭시 실행
    highBtn(allBtn);
    createTodo();
})

actBtn.addEventListener("click", () => {    // actBtn 클릭시 실행
    highBtn(actBtn);
    btnEvent(false);
})

comBtn.addEventListener("click", () => {    // comBtn 클릭시 실행
    highBtn(comBtn);
    btnEvent(true);
})

cleBtn.addEventListener("click", () => {    // cleBtn 클릭시 실행
    todoList.forEach((ele, idx) => {
        if(ele.check){
            delete todoList[idx];
        }
    })

    allBtn.click();
})

window.onload = () => { // 윈도우 로드 완료시 실행
    createTodo();
}
const todoList = document.querySelector("#list");
const mainInput = document.querySelector("#main");
const controll = document.querySelector("#controll");
const allSel = document.querySelector('#all_sel');
const allBtn = document.querySelector('.sp_ac');
const activeBtn = document.querySelector('#act');
const completedBtn = document.querySelector('#com');
const dleAllBtn = document.querySelector('#cle');
const count = document.querySelector('#item');
const create = element => document.createElement(element);


let itemsArray = JSON.parse(localStorage.getItem('items')) || [];
//items를 오브젝트로 변환
let data = JSON.parse(localStorage.getItem('items'));

//count실행 버튼
const todoCounter = () => {
    const button = document.querySelector(".sp_ac");
    const id = button.id;

    switch (id) {
        case "all":
            normalCount();
            allBtn.click();
            break;
        case "act":
            actCount();
            activeBtn.click();
            break;
        case "com":
            comCount();
            completedBtn.click();
            break;
    };
};

const addDate = function (text, num) {
    itemsArray.push({ "text": text, "num": num });
    localStorage.setItem('items', JSON.stringify(itemsArray));
    data = JSON.parse(localStorage.getItem('items'));
}

const item = function (text) {
    const todoLi = create("li");
    const todoDiv = create("div");
    const todoP = create("p");
    const todoP2 = create("p");

    todoLi.classList.add('list');
    todoDiv.classList.add('check');
    todoP.classList.add('text');
    todoP2.classList.add('close');
    // 인자로 받은 값을 넣는다
    todoP.innerHTML = text;
    todoLi.appendChild(todoDiv);
    todoLi.appendChild(todoP);
    todoLi.appendChild(todoP2);
    todoP2.innerHTML = 'X';
    // localStorage()
    // 함수 종료
    return todoLi;
}

const controllDisplay = () => {
    controll.style.display = list.children.length ? "flex" : "none";
};

const todoListIf = function (e, className, block, none) {
    if (todoList.children[e].classList.contains(className)) {
        todoList.children[e].style.display = block;
    } else {
        todoList.children[e].style.display = none;
    };
};

const btnBordre = function (This) {
    [...This.parentNode.children].forEach((element) => {
        //배열안에 들어있는 value들 마다 함수 실행
        element.classList.remove("sp_ac");
    });
    This.classList.add("sp_ac");
}

const normalCount = () => {
    // conut에 list 길이 넣어주기
    count.innerHTML = document.querySelectorAll(".list").length;
};

const actCount = () => {
    count.innerHTML = [...document.querySelectorAll(".list")].filter(list => list.classList.length === 1).length;
};

const comCount = () => {
    count.innerHTML = document.querySelectorAll(".li_ac").length;
};

const cleCount = () => {
    let countNum = 0;
    [...todoList.children].forEach(function (element) {
        if (element.classList.contains("list")) {
            countNum++;
        } else {
            count.innerHTML = 0;
        }
        count.innerHTML = countNum;
    });
};

const dblClick = function ({ target }) {

    if (target.classList.contains("text")) {
        // input 생성
        let inputText = create("input");

        // this.children에 class가 text인것만 telist에 저장
        let telist = [...this.children].filter(function (ele) {
            return ele.classList.contains("text"); // 어차피 1개
        });

        // 만들어 놓은 input에 원래 p값 집어넣기
        inputText.value = telist[0].innerText;

        inputText.classList.add("text");

        // p태그 지우기
        this.children[1].remove();


        // this에 자식중 0번쨰 다음에 input 집어 넣기 
        this.children[0].after(inputText);

        // 더블 클릭시 발동
        inputText.addEventListener("keydown", function ({ key }) {
            // 엔터키를 눌렀을때
            if (key == "Enter") {
                // 넣을 p 태그 생성
                let p = create("p");

                // p 태그에 input 값 넣기, 클래스명 넣기
                p.innerHTML = this.value;
                p.classList.add("text");


                const thisId = this.parentNode.dataset.id;
                const thisNum = this.parentNode.dataset.num;
                const thisText = this.value;


                itemsArray.splice(thisId, 1);
                itemsArray.splice(thisId, 0, { "text": thisText, "num": thisNum });

                localStorage.setItem('items', JSON.stringify(itemsArray));

                // input을 첫번째 자식뒤에 넣고, 첫번쨰 자식 지우기
                this.parentNode.children[1].after(p);
                this.parentNode.children[1].remove();


            }
            // Esc를 눌렀을때
            if (key == "Escape") {
                let p = Create("p");

                // p 태그에 바꾸기 전 input값 그대로 넣기 
                p.innerHTML = telist[0].innerText;
                p.classList.add("text");


                // input을 첫번째 자식뒤에 넣고, 첫번쨰 자식 지우기
                this.parentNode.children[1].after(p);
                this.parentNode.children[1].remove();
            }
        });
    }

};
// list 생성해주는 해서 todoLi를 보내주는 함수


// 엔터치면 실행하는 이벤트
mainInput.addEventListener('keydown', function (e) {
    let key = e.key.toLowerCase();
    if (key === "enter") {
        if (mainInput.value === '') {
            alert("정보를 입력하세요");
            return false;
        }

        const todoLi = item(this.value);
        todoList.children[0].before(todoLi);

        addDate(this.value, 0);

        todoLi.dataset.id = list.children.length - 2;
        todoLi.dataset.num = 0;

        input.value = "";

        todoList.insertAdjacentElement('afterbegin', todoLi);
        this.value = '';
        controll.style.display = 'flex';

        normalCount();
        // hover
        todoLi.addEventListener("mouseover", function () {
            this.classList.add('hov');
        });

        todoLi.addEventListener("mouseleave", function () {
            this.classList.remove('hov');
        });
    };
});



todoList.addEventListener('click', function ({ target }) {
    if (target.classList.contains('check')) {
        const active = target.parentNode.classList.toggle('li_ac');
        console.log(active)
        target.parentNode.children[0].innerText = active ? "✓" : "";

        // target에 부모요소의 class 중 li_ac가 있으면 1 없으면 0으로 설정
        if (target.parentNode.classList.contains("li_ac")) {
            target.parentNode.dataset.num = 1;
            const thisId = target.parentNode.dataset.id;
            const thisText = target.parentNode.children[1].innerText;

            itemsArray.splice(target.parentNode.dataset.id, 1);

            itemsArray.splice(thisId, 0, { "text": thisText, "num": target.parentNode.dataset.num })
            localStorage.setItem('items', JSON.stringify(itemsArray));
        } else {
            target.parentNode.dataset.num = 0;
            const thisId = target.parentNode.dataset.id;
            const thisText = target.parentNode.children[1].innerText;

            itemsArray.splice(target.parentNode.dataset.id, 1);

            itemsArray.splice(thisId, 0, { "text": thisText, "num": target.parentNode.dataset.num })
            localStorage.setItem('items', JSON.stringify(itemsArray));
        }
        todoCounter();
    };
});

todoList.addEventListener('click', function ({ target }) {
    if (target.classList.contains('close')) {
        target.parentNode.remove()
    }
})


allBtn.addEventListener("click", function () {
    if (!this.classList.contains('sp_ac')) { //없으면 sp_ac
        this.classList.add('sp_ac')
    }
    for (let i = 0; i < todoList.children.length; i++) {
        if (todoListIf(i, 'list', 'block', 'none'));
    }

    btnBordre(this);
    controllDisplay();
    todoCounter();
})

activeBtn.addEventListener("click", function () {
    for (let i = 0; i < todoList.children.length; i++) {
        if (todoListIf(i, 'li_ac', 'none', 'block'));
    };

    btnBordre(this);
    controllDisplay();
    todoCounter();
});

completedBtn.addEventListener('click', function () {
    for (let i = 0; todoList.children.length > i; i++) {
        if (!todoListIf(i, 'li_ac', 'block', 'none'));
    };

    btnBordre(this);
    controllDisplay();
    todoCounter();
});

dleAllBtn.addEventListener('click', function () {
    [...document.querySelectorAll('.li_ac')].forEach(element => {
        element.remove();
    });
    // clearBtn버튼 클릭시 완료된 모든 리스트 삭제 시키는 것
    [...document.querySelectorAll(".li_ac")].forEach((list) => {
        list.remove();
        console.log(list)

        itemsArray.splice(list.dataset.id, 1);


    });
    const reverse = [...list.children].reverse();
    // .controll 삭제
    reverse.shift();

    // li 삭제 할때마다 id값 재설정
    reverse.forEach(function (ele, idx) {
        if (ele == undefined) {
            return false;
        }
        ele.dataset.id = "";
        ele.dataset.id = idx;
    });


    localStorage.setItem('items', JSON.stringify(itemsArray));

    allBtn.click();
    cleCount();
    controllDisplay();
})

allSel.addEventListener("click", function () {

    // 전체선택시 모든 체크 박스가 선택 되게 하는거
    allSel.classList.toggle("all_ac");
    let lists = [...todoList.children].filter(function (ele) {
        return ele.classList.contains("list")
    })
    if (allSel.classList.contains("all_ac")) {
        lists.forEach(function (el) {
            el.classList.add("li_ac")
            el.children[0].innerHTML = `✓`;
            el.dataset.num = 1;

            const thisId = el.dataset.id;
            const thisText = el.children[1].innerText;

            itemsArray.splice(thisId, 1);
            itemsArray.splice(thisId, 0, { "text": thisText, "num": 1 });
            localStorage.setItem('items', JSON.stringify(itemsArray));
        });
    } else {
        lists.forEach(function (el) {
            el.classList.remove("li_ac")
            el.children[0].innerHTML = ``;
            el.dataset.num = 0;

            const thisId = el.dataset.id;
            const thisText = el.children[1].innerText;

            itemsArray.splice(thisId, 1);

            itemsArray.splice(thisId, 0, { "text": thisText, "num": 0 });
            localStorage.setItem('items', JSON.stringify(itemsArray));
        });
    }

});











window.onload = function () {

    data.forEach(function (ele, idx) {

        const text = ele.text;
        const num = ele.num;
        const addLi = item(text);
        addLi.dataset.id = idx;
        addLi.dataset.num = num;

        if (ele.num == "1") {
            addLi.classList.add("li_ac");
            addLi.children[0].innerText = "✓";
        } else {
            addLi.classList.remove("li_ac");
            addLi.children[0].innerText = "";
        }
        list.children[0].before(addLi);

        // allCount();

        addLi.addEventListener("mouseover", function () {
            this.classList.add("hov");
        });


        addLi.addEventListener("mouseleave", function () {
            this.classList.remove("hov");
        });
        addLi.addEventListener("dblclick", dblClick);

        allBtn.click();
        controllDisplay();
    });


}




todoList.addEventListener("click", function ({ target }) {

    // X버튼 누를시 리스트 삭제하는거 
    if (target.classList.contains("close")) {

        target.parentNode.remove();
        // reverse에 list.children 거꾸로 뒤집어 저장
        const reverse = [...todoList.children].reverse();
        // .controll 삭제
        reverse.shift();

        // localStorage에서 삭제
        itemsArray.splice(target.parentNode.dataset.id, 1);

        // li 삭제 할때마다 id값 재설정
        reverse.forEach(function (ele, idx) {
            if (ele == undefined) {
                return false;
            }
            ele.dataset.id = "";
            ele.dataset.id = idx;
        });


        localStorage.setItem('items', JSON.stringify(itemsArray));

        controllDisplay();
        normalCount();
    };
});
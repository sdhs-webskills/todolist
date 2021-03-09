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

function controllDisplay() {
    if (list.children.length > 1) {
        controll.style.display = "flex";
    } else {
        controll.style.display = "none";
    };
};

function todoListIf(e, className, block, none) {
    if (todoList.children[e].classList.contains(className)) {
        todoList.children[e].style.display = block;
    } else {
        todoList.children[e].style.display = none;
    };
};

function btnBordre(This) {
    [...This.parentNode.children].forEach((element) => {
        //배열안에 들어있는 value들 마다 함수 실행
        element.classList.remove("sp_ac");
    });
    This.classList.add("sp_ac");
}

function normalCount() {
    return count.innerHTML = list.children.length - 1;
};

function actCount() {
    let countNum = 0;
    [...todoList.children].forEach(function (element) {
        if (!element.classList.contains("li_ac")) {
            countNum++;
        }
        count.innerHTML = countNum - 1;
    });
};

function comCount() {
    let countNum = 0;
    [...todoList.children].forEach(function (element) {
        if (element.classList.contains("li_ac")) {
            countNum++;
        }
        count.innerHTML = countNum;
    });
};

function cleCount() {
    [...todoList.children].forEach(function (element) {
        console.log(element)
        if (element.classList.contains("list")) {
            countNum++;
        } else {
            count.innerHTML = 0;
        }
        count.innerHTML = countNum;
    });
};
mainInput.addEventListener('keydown', function (e) {
    let key = e.key.toLowerCase();
    if (key === "enter") {
        if (mainInput.value === '') {
            alert("정보를 입력하세요");

            return false;
        }
        const todoLi = create("li");
        const todoDiv = create("div");
        const todoP = create("p");
        const todoP2 = create("p");

        todoLi.classList.add('list');
        todoDiv.classList.add('check');
        todoP.classList.add('text');
        todoP2.classList.add('close');
        todoP.innerHTML = mainInput.value;
        todoLi.appendChild(todoDiv);
        todoLi.appendChild(todoP);
        todoLi.appendChild(todoP2);
        todoList.insertAdjacentElement('afterbegin', todoLi);
        todoP2.innerHTML = 'X';
        mainInput.value = '';
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
        target.parentNode.classList.add('li_ac');
        target.parentNode.children[0].innerText = '✓';
    };
});;

todoList.addEventListener('click', function ({ target }) {
    if (target.classList.contains('close')) {
        target.parentNode.remove()
    }
})


allBtn.addEventListener("click", function () {
    if (!this.classList.contains('sp_ac')) { //없으면 sp_ac
        console.log(1)
        this.classList.add('sp_ac')
    }
    for (let i = 0; i < todoList.children.length; i++) {
        if (todoListIf(i, 'list', 'block', 'none'));
    }
    normalCount();
    btnBordre(this);
    controllDisplay();
})

activeBtn.addEventListener("click", function () {
    for (let i = 0; i < todoList.children.length; i++) {
        if (todoListIf(i, 'li_ac', 'none', 'block'));
    };
    actCount();
    btnBordre(this);
    controllDisplay();
});

completedBtn.addEventListener('click', function () {
    for (let i = 0; todoList.children.length > i; i++) {
        if (!todoListIf(i, 'li_ac', 'block', 'none'));
    };
    comCount();
    btnBordre(this);
    controllDisplay();
});

dleAllBtn.addEventListener('click', function () {
    [...document.querySelectorAll('.li_ac')].forEach(element => {
        element.remove();
    });
    cleCount();
    controllDisplay();
})


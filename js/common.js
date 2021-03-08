const todoList = document.querySelector("#list");
const mainInput = document.querySelector("#main");
const controll = document.querySelector("#controll");
const allSel = document.querySelector('#all_sel');
const allBtn = document.querySelector('.sp_ac');
const activeBtn = document.querySelector('#act');
const completedBtn = document.querySelector('#com');

const create = element => document.createElement(element);

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
function todoListIf(e, className, block, none) {
    if (todoList.children[e].classList.contains(className)) {
        todoList.children[e].style.display = block;
    } else {
        todoList.children[e].style.display = none;
    };
};

allBtn.addEventListener("click", function () {
    for (let i = 0; i < todoList.children.length; i++) {
        if (todoListIf(i, 'list', 'block', 'none'));
    }
    controllDisplay();
});



activeBtn.addEventListener("click", function () {
    for (let i = 0; i < todoList.children.length; i++) {
        if (todoListIf(i, 'li_ac', 'none', 'block'));
    };
    controllDisplay();
});

completedBtn.addEventListener('click', function () {
    for (let i = 0; todoList.children.length > i; i++) {
        if (!todoListIf(i, 'li_ac', 'none', 'block'));
        controllDisplay();
    };
});

function controllDisplay() {
    if (list.children.length > 1) {
        controll.style.display = "flex";
    } else {
        controll.style.display = "none";
    };
};
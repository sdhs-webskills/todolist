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

todoList.addEventListener('dblclick', function ({ target }) {
    if (target.classList.contains('text')) {
        const textInput = create('input');
        const parent = target.parentNode;
        let text = target.innerText
        textInput.value = target.innerText;
        textInput.classList.add('text');

        parent.appendChild(textInput);
        target.remove();
        textInput.addEventListener('keydown', function (e) {
            let key = e.key;

            // const isKey = ['Enter','Escape'].includes(key);
            if (key === 'Escape') {
                const textP = create('p');
                textP.classList.add('text');
                textP.innerHTML = text
                parent.appendChild(textP);
                this.parentNode.children[2].remove();
            }
            if (key === 'Enter') {
                const textP = create('p');
                textP.classList.add('text');
                textP.innerHTML = this.value;
                parent.appendChild(textP)
                textInput.remove();
            }
        })
    }
})


// function start(){
//     let json = JSON.parse(localStorage.getItem("json")) || [];

//     let a = [
//         {
//             text:"가나다라",
//             active:true
//         }
//     ]
//     // css
//     // li.active .check{ background:red }

//     json.forEach( ({text,active}) => {
//         const Li = item(text);
//         if( active ){
//             Li.classList.add("active");
//         }
//         todoList.insertAdjacentElement('afterbegin', Li);
//     } );

// }

// let json = JSON.parse(localStorage.getItem("json")) || [];


// function setLocalJSON(data){
//     localStorage.setItem("json",JSON.stringify(data));
// }

// json = [1,321312];

// setLocalJSON(json);


function item(text) {
    const todoLi = create("li");
    const todoDiv = create("div");
    const todoP = create("p");
    const todoP2 = create("p");

    todoLi.classList.add('list');
    todoDiv.classList.add('check');
    todoP.classList.add('text');
    todoP2.classList.add('close');
    todoP.innerHTML = text;
    todoLi.appendChild(todoDiv);
    todoLi.appendChild(todoP);
    todoLi.appendChild(todoP2);
    todoP2.innerHTML = 'X';
    return todoLi;
}

mainInput.addEventListener('keydown', function (e) {
    let key = e.key.toLowerCase();
    if (key === "enter") {
        if (mainInput.value === '') {
            alert("정보를 입력하세요");
            return false;
        }


        const todoLi = item(this.value);

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
        target.parentNode.classList.toggle('li_ac');
        if (target.parentNode.classList.contains('li_ac')) {
            target.parentNode.children[0].innerText = '✓';
        } else {
            target.parentNode.children[0].innerText = '';
        };
        const button = document.querySelector(".sp_ac");
        const id = button.id;

        switch (id) {
            case "all": allBtn.click();
                break;
            case "act": activeBtn.click();
                break;
            case "com": completedBtn.click();
                break;
        };
    };
});

todoList.addEventListener('click', function ({ target }) {
    if (target.classList.contains('close')) {
        target.parentNode.remove()
    }
    cleCount()
})


allBtn.addEventListener("click", function () {
    if (!this.classList.contains('sp_ac')) { //없으면 sp_ac
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

allSel.addEventListener('click', function () {
    [...todoList.children].forEach(list => {
        if (list.classList.contains('list')) {
            list.children[0].innerText = '✓';
            list.classList.toggle('li_ac');
            if (!todoList.children[0].classList.contains('li_ac')) {
                list.children[0].innerText = '';
            };
        }
    });
});
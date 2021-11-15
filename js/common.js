const searchBox = document.querySelector("#wrap #input input");
const listBox = document.querySelector("#wrap #list");
const allCheckBtn = document.querySelector("#wrap #input #all_sel");
const controll = document.querySelector("#wrap #list #controll");
const itemLen = document.querySelector("#wrap #list #controll #item");

let todoList = [];
// [
//     {
//         num: 1
//         text: "dasdasd",
//         active: false,

//     }
// ]

const controllDis = () => {
    controll.style.display = listBox.children.length > 1 ? "flex" : "none";
};

const createTodo = () => {
    [...listBox.children].forEach((ele, idx) => {
        if(idx !== 0){
            ele.remove();
        }
    })

    todoList.forEach((ele, idx) => {
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
    itemLen.innerHTML = listBox.children.length > 1 ? listBox.children.length - 1 : "";
    controllDis();
};

searchBox.addEventListener("keydown", ({key}) => {
    if(key === "Enter"){
        if(searchBox.value === ""){
            alert("내용을 입력해 주세요")
            return false;
        }
        todoList.push({num: todoList.length, text: searchBox.value, check: false});
        createTodo();
        searchBox.value = "";
    }
})


listBox.addEventListener("click", ({target}) => {
    if(target.classList[0] === "check"){
        for(const todo of todoList){
            if(todo.num == target.parentNode.dataset["num"]){
                todo.check = !todo.check;
            }
        }
    }
    createTodo();
})

allCheckBtn.addEventListener("click", () => {
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


listBox.addEventListener("mouseenter", () => {
    [...listBox.children].forEach((ele) => {
        ele.addEventListener("mouseenter", ({target}) => {
            if(target.classList[0] === "list"){
                target.classList.add("hov");
            }
            target.children[2].addEventListener("click", ({target}) => {
                // console.log(target);
                let removeTodoIdx = 0;
                for(const todo of todoList){
                    if(todo.num === target.parentNode.dataset["num"]){
                        removeTodoIdx = target.parentNode.dataset["num"];
                    }
                }
                todoList.splice(removeTodoIdx, 1);
                createTodo();
            })
        })
        ele.addEventListener("mouseleave", ({target}) => {
            target.classList.remove("hov");
        })
    })
})
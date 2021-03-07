let todoList = document.querySelector("#list");
let mainInput = document.querySelector("#main");
let controll = document.querySelector("#controll");

mainInput.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        if (mainInput.value === "") {
            alert("정보를 입력하세요");

            return false;
        }
        let todoLi = document.createElement('li');
        let todoDiv = document.createElement('div');
        let todoP = document.createElement('p');
        let todoP2 = document.createElement('p')
        todoLi.classList.add('list');
        todoDiv.classList.add('check');
        todoP.classList.add('text');
        todoP2.classList.add('close');
        todoP.innerHTML = mainInput.value
        todoLi.appendChild(todoDiv);
        todoLi.appendChild(todoP);
        todoLi.appendChild(todoP2);
        todoList.append(todoLi);
        mainInput.value = "";
        controll.style.display = 'flex';

        // hover
        todoLi.addEventListener("mouseover", function () {
            this.classList.add("hov");
        });

        todoLi.addEventListener("mouseleave", function () {
            this.classList.remove("hov");
        });
    }
});


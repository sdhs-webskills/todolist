function start(){
    let json = JSON.parse(localStorage.getItem("json")) || [];

    let a = [
        {
            text:"가나다라",
            active:true
        }
    ]
    // css
    // li.active .check{ background:red }

    json.forEach( ({text,active}) => {
        const Li = item(text);
        if( active ){
            Li.classList.add("active");
        }
        todoList.insertAdjacentElement('afterbegin', Li);
    } );
    
}

let json = JSON.parse(localStorage.getItem("json")) || [];


function setLocalJSON(data){
    localStorage.setItem("json",JSON.stringify(data));
}

json = [1,321312];

setLocalJSON(json);


function item(text){
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


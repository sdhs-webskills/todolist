const create = element => document.createElement(element);
const one = element => document.querySelector(element);


let todoData = JSON.parse(localStorage.getItem("datas")) || [];

const todoInput = one(".todoInput");
const todoList = one(".todoList");
todoInput.addEventListener("keydown",function(e){
    const {keyCode} = e;
    const isEnter = [13].includes(keyCode);

    if( isEnter ){
        todoData = [...todoData,{
            active:false,
            text:this.value
        }];
        todoList.append(new Item(false,this.value).li)
        this.value = "";
    }
})


/* 


[
    {
        active:false,
        text:'가나다라'
    }
]


*/


class Item{
    constructor(active,text){
        this.active = active;


        this.li = create("li");
        this.li.innerHTML = `
        <button class="actvieBtn"></button>
        <span class="text">${text}</span>
        <button class="deleteBtn">X</button>
        `;

        this.actvieBtn = this.li.querySelector(".actvieBtn");
        this.text = this.li.querySelector(".text");
        this.deleteBtn = this.li.querySelector(".deleteBtn");

        this.event();
    }

    event(){
        this.actvieBtn.addEventListener("click",function(e){
            this.active = this.classList.toggle("active");
        });
        this.deleteBtn.addEventListener("click",function(){

        })
    }
}
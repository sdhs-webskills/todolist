const list = document.querySelector("#list");
const input = document.querySelector("#main");
const li  = document.querySelector("li.list");
const controll = document.querySelector("#controll");
let count = document.querySelector("#item");

const allBtn = document.querySelector("#all");
const activeBtn = document.querySelector("#act");
const completedBtn = document.querySelector("#com");
const clearBtn = document.querySelector("#cle");

const Menu = function(){
    if(list.children.length > 1) {
        controll.style.display = "flex";
    } else {
        controll.style.display = "none";
    }
};

window.addEventListener("click", function(){
    // console.log("as");
});

const Border = function(th){
    [...th.parentNode.children].forEach((element) => {
        element.classList.remove("sp_ac");
    });
    th.classList.add("sp_ac");
};

const Create = function(tag){
    return document.createElement(tag);
};

const Count = function(){
    return count.innerHTML = list.children.length - 1;
};

const ActCount = function(){
    let pos = 0;
    [...list.children].forEach(function(ele){
        if(!ele.classList.contains("li_ac")){
            pos++;
        }
        count.innerHTML = pos - 1;
    });
};

const ComCount = function(){
    let pos = 0;
    [...list.children].forEach(function(ele){
        if(ele.classList.contains("li_ac")){
            pos++;
        }
        count.innerHTML = pos;
    });
};

const CleCount = function(){
    [...list.children].forEach(function(ele){
    //     if(ele.classList.contains("list")){
    //         pos++;
    //     } else {
    //         count.innerHTML = 0;
    //     }
    //     count.innerHTML = pos;
    });
};

clearBtn.addEventListener("click", function(){
    [...document.querySelectorAll(".li_ac")].forEach((list) => {
        list.remove();
    });
    allBtn.click();
    CleCount();
    Menu();
});


allBtn.addEventListener("click", function(){
    [...list.children].forEach(function(ele){
        if(ele.classList.contains("list")){
            ele.style.display = "block";
        } else {
            ele.style.display = "none";
        }
    });
    Count();
    Border(this);
    Menu();
});

activeBtn.addEventListener("click", function(){
    [...list.children].forEach(function(ele){
        if(ele.classList.contains("li_ac")){
            ele.style.display = "none";
        } else {
            ele.style.display = "block";
        }
    });
    ActCount();
    Border(this);
    Menu();
});


completedBtn.addEventListener("click", function(){
    [...list.children].forEach(function(ele){
        if(!ele.classList.contains("li_ac")){
            ele.style.display = "none";
        } else {
            ele.style.display = "block";
        }
    });
    ComCount();
    Border(this);
    Menu();
});


input.addEventListener("keydown", function({ key }){
    if(key == "Enter"){
        if(input.value === ""){
            alert("입력하실 내용 입력하세요");
            
            return false;
        }
        const li = Create("li");
        const div = Create("div");
        const p = Create("p");
        const p2 = Create("p");
        li.classList.add("list");
        div.classList.add("check");
        p.classList.add("text");
        p2.classList.add("close");
        p.innerHTML = input.value;
        p2.innerText = `X`;
        li.appendChild(div);
        li.appendChild(p);
        li.appendChild(p2);
        list.insertAdjacentElement("afterbegin", li);
        input.value = "";
        
        Count();
        
        li.addEventListener("mouseover", function(){ // 마우스가 위로 올라가면 실행
            this.classList.add("hov");
        });
        
        li.addEventListener("mouseleave", function(){// 마우스에서 사라지면 실행
            this.classList.remove("hov");
        });
        activeBtn.click();
    }
    Menu();
});


list.addEventListener("click", function({ target }){
    if(target.classList.contains("check")) {
        // contains(): 지정한 클래스 값이 엘리먼트의 class 속성에 존재하는지 확인한다.
        // target된 곳에 class가 "check"이면 밑에 있는 거 실행
        target.parentNode.classList.add("li_ac");
        // target된 곳에 부모 요소에 class 추가
        target.parentNode.children[0].innerText = `✓`;

        // allBtn.click();
        activeBtn.click();
    };
});

list.addEventListener("click", function({ target }){
    if(target.classList.contains("close")) {
        target.parentNode.remove();
        Menu();
    };
});



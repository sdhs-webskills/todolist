let list = document.querySelector("#list");
let input = document.querySelector("#main");
let li  = document.querySelector("li.list");
let controll = document.querySelector("#controll");

let allBtn = document.querySelector("#all");
let actBtn = document.querySelector("#act");
let comBtn = document.querySelector("#com");
let cleBtn = document.querySelector("#cle");


allBtn.addEventListener("click", function(){
    for(let i=0; i<list.children.length; i++){
        if(list.children[i].classList.contains("list")){
            list.children[i].style.display = "block";
        } else {
            list.children[i].style.display = "none";
        }
    }
    menu();
});


actBtn.addEventListener("click", function(){
    for(let i=0; i<list.children.length; i++){
        if(list.children[i].classList.contains("li_ac")){
            list.children[i].style.display = "none";
        } else {
            list.children[i].style.display = "block";
        }
    }
    menu();
});


comBtn.addEventListener("click", function(){
    for(let i=0; i<list.children.length; i++){
        if(!list.children[i].classList.contains("li_ac")){
            list.children[i].style.display = "none";
        } else {
            list.children[i].style.display = "block";
        }
    }
    menu();
});

cleBtn.addEventListener("click", function(){
    [...document.querySelectorAll(".li_ac")].forEach(list => {
        list.remove();
    });

    menu();
});

input.addEventListener("keydown", function({ key }){
    if(key == "Enter"){
        if(input.value === ""){
            alert("입력하실 내용 입력하세요");
            
            return false;
        }
        let li = document.createElement("li");
        let div = document.createElement("div");
        let p = document.createElement("p");
        let p2 = document.createElement("p");
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
        
        
        li.addEventListener("mouseover", function(){ // 마우스가 위로 올라가면 실행
            this.classList.add("hov");
        });
        
        li.addEventListener("mouseleave", function(){// 마우스에서 사라지면 실행
            this.classList.remove("hov");
        });
    }
    menu();
});

list.addEventListener("click", function({ target }){
    if(target.classList.contains("check")) {
        // contains(): 지정한 클래스 값이 엘리먼트의 class 속성에 존재하는지 확인한다.
        // target된 곳에 class가 "check"이면 밑에 있는 거 실행
        target.parentNode.classList.add("li_ac");
        // target된 곳에 부모 요소에 class 추가
        target.parentNode.children[0].innerText = `✓`;
    };
});


let menu = function(){
    if(list.children.length > 1) {
        controll.style.display = "flex";
    }else{
        controll.style.display = "none";
    }
};

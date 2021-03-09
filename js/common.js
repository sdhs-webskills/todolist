const list = document.querySelector("#list");
const input = document.querySelector("#main");
const li  = document.querySelector("li.list");
const controll = document.querySelector("#controll");
let count = document.querySelector("#item");

const allBtn = document.querySelector("#all");
const activeBtn = document.querySelector("#act");
const completedBtn = document.querySelector("#com");
const clearBtn = document.querySelector("#cle");
const allCheck = document.querySelector("#all_sel");

const Menu = function(){
    if(list.children.length > 1) {
        controll.style.display = "flex";
    } else {
        controll.style.display = "none";
    }
};


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


clearBtn.addEventListener("click", function(){

    //clearBtn버튼 클릭시 완료된 모든 리스트 삭제 시키는 것
    [...document.querySelectorAll(".li_ac")].forEach((list) => {
        list.remove();
    });
    allBtn.click();
    Menu();
});


allBtn.addEventListener("click", function(){

    //allBtn버튼 클릭시 모든 리스트를 표시 시키는거
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

    //activeBtn버튼 클릭시 완료되지 않는 것만 표시 시키는거
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

    //completedBtn버튼 클릭시 완료된것만 표시 시키는거
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
    // input에세 엔터시 리스트 추가 하는거 
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
        
        // 마우스가 위로 올라가면 실행
        li.addEventListener("mouseover", function(){ 
            this.classList.add("hov");
        });
        
        // 마우스에서 사라지면 실행
        li.addEventListener("mouseleave", function(){
            this.classList.remove("hov");
        });

        //리스트 더블 클릭시 수정 하게 하는 거 [미완성]
        li.addEventListener("dblclick", function({ target }){
            
            let inputText = Create("input");
            
            let telist = [...this.children].filter(function(ele){
                return ele.classList.contains("text");
            })
            
            inputText.value = telist[0].innerText;

            this.children[1].remove();

            this.children[0].after(inputText);

            inputText.addEventListener("keydown", function({ key }){
                if(key == "Enter"){
                    // let p = Create("p");
                    // p.innerHtml = inputText.value;
                    // // console.log(li.children[1])
                    // li.children[1].remove();
                    // li.children[0].after(p);
                }
            });

            console.log(this.children[1]);

        });

        allBtn.click();
    }
    Menu();
});


list.addEventListener("click", function({ target }){
    if(target.classList.contains("check")) {
        // contains(): 지정한 클래스 값이 엘리먼트의 class 속성에 존재하는지 확인한다.
        // target된 곳에 class가 "check"이면 밑에 있는 거 실행
        target.parentNode.classList.toggle("li_ac");
        // target된 곳에 부모 요소에 class 추가

        // 체크표시 해놓는거
        if(target.parentNode.classList.contains("li_ac")){
            target.parentNode.children[0].innerText = `✓`;
        } else {
            target.parentNode.children[0].innerText = ``;
        }
    };


    let lists = [...list.children].filter(function(ele){
        return ele.classList.contains("li_ac")
    })

    // 모든 체크박스가 선택되면 전체선택 되게 하는거
    if(lists.length === list.children.length-1){
        allCheck.classList.add("all_ac");
    } else {
        allCheck.classList.remove("all_ac");
    }
});

allCheck.addEventListener("click", function(){
    
    // 전체선택시 모든 체크 박스가 선택 되게 하는거
    allCheck.classList.toggle("all_ac");
    let lists = [...list.children].filter(function(ele){
        return ele.classList.contains("list")
    })
    if(allCheck.classList.contains("all_ac")){
        lists.forEach(function(el){
            el.classList.add("li_ac")
            el.children[0].innerHTML = `✓`;
        });
    } else {
        lists.forEach(function(el){
            el.classList.remove("li_ac")
            el.children[0].innerHTML = ``;
        });
    }

});


list.addEventListener("click", function({ target }){

    // X버튼 누를시 리스트 삭제하는거 
    if(target.classList.contains("close")) {
        target.parentNode.remove();
        Menu();
    };
});
const list = document.querySelector("#list");
const input = document.querySelector("#main");
const li  = document.querySelector("li.list");
const controll = document.querySelector("#controll");
let count = document.querySelector("#item");

const allCheck = document.querySelector("#all_sel");
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
    const blockList = [...list.children].filter(function(ele){
        return !ele.classList.contains("li_ac");
    })

    blockList.pop();

    return count.innerHTML = blockList.length;
};

const allCount = function(){
    const blockList = [...list.children].filter(function(ele){
        return ele.classList.contains("list");
    })

    return count.innerHTML = blockList.length;
};


const ActCount = function(){
    const blockList = [...list.children].filter(function(ele){
        return !ele.classList.contains("li_ac");
    })

    blockList.pop();

    count.innerHTML = blockList.length;
};

const ComCount = function(){
    const blockList = [...list.children].filter(function(ele){
        return ele.classList.contains("li_ac");
    })

    count.innerHTML = blockList.length;
};


const checkBox =  function({ target }){
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

        const button = document.querySelector(".sp_ac");
        const id = button.id;

        switch(id) {
            case "all" : allBtn.click();
                break;
            case "act" : activeBtn.click();
                break;
            case "com" : completedBtn.click();
                break;       
        };
    };

    
    // 모든 체크박스가 선택되면 전체선택 되게 하는거
    let lists = [...list.children].filter(function(ele){
        return ele.classList.contains("li_ac")
    })

    if(lists.length === list.children.length-1){
        allCheck.classList.add("all_ac");
    } else {
        allCheck.classList.remove("all_ac");
    }

};

// 리스트 더블 클릭시 수정 하게 하는 거
const dblClick =  function({ target }){
    
    if(target.classList.contains("text")){
        // input 생성
        let inputText = Create("input");
        
        // this.children에 class가 text인것만 telist에 저장
        let telist = [...this.children].filter(function(ele){
            return ele.classList.contains("text"); // 어차피 1개
        });
        
        // 만들어 놓은 input에 원래 p값 집어넣기
        inputText.value = telist[0].innerText;
        
        inputText.classList.add("text");
        
        // p태그 지우기
        this.children[1].remove();
        
        
        // this에 자식중 0번쨰 다음에 input 집어 넣기 
        this.children[0].after(inputText);
        
        // 더블 클릭시 발동
        inputText.addEventListener("keydown", function({ key }){
            // 엔터키를 눌렀을때
            if(key == "Enter"){
                // 넣을 p 태그 생성
                let p = Create("p");
                
                // p 태그에 input 값 넣기, 클래스명 넣기
                p.innerHTML = this.value;
                
                p.classList.add("text");
                // console.log(this.parentNode.dataset.id) // index값
                let liid = this.parentNode.dataset.id

                // let afterArr = itemsArray[liid-1];

                itemsArray.splice(liid, 1)
                console.log(liid)

                // itemsArray.splice(target.parentNode.dataset.id,1);
                localStorage.setItem('items', JSON.stringify(itemsArray));
                
                // input을 첫번째 자식뒤에 넣고, 첫번쨰 자식 지우기
                this.parentNode.children[1].after(p);
                this.parentNode.children[1].remove();
            }
            // Esc를 눌렀을때
            if(key == "Escape"){
                let p = Create("p");
        
                // p 태그에 바꾸기 전 input값 그대로 넣기 
                p.innerHTML = telist[0].innerText;
                p.classList.add("text");
        
            
                // input을 첫번째 자식뒤에 넣고, 첫번쨰 자식 지우기
                this.parentNode.children[1].after(p);
                this.parentNode.children[1].remove();
            }
        });
    }

};

let itemsArray = JSON.parse(localStorage.getItem('items')) || [];




// li(리스트) 만들어주는 거
const createLi = function(text){
    const li = Create("li");
    const div = Create("div");
    const p = Create("p");
    const p2 = Create("p");
    li.classList.add("list");
    div.classList.add("check");
    p.classList.add("text");
    p2.classList.add("close");
    p.innerText = text;
    p2.innerText = `X`;
    li.appendChild(div);
    li.appendChild(p);
    li.appendChild(p2);
    
    return li;
};



allBtn.addEventListener("click", function(){
    Border(this);

    // allBtn버튼 클릭시 모든 리스트를 표시 시키는거
    [...list.children].forEach(function(ele){
        if(ele.classList.contains("list")){
            ele.style.display = "block";
        } else {
            ele.style.display = "none";
        }
    });
    list.addEventListener("click", checkBox);
    allCount();
    Menu();
});

activeBtn.addEventListener("click", function(){
    Border(this);
    if(this.classList.contains("sp_ac")){

    }

    // activeBtn버튼 클릭시 완료되지 않는 것만 표시 시키는거
    [...list.children].forEach(function(ele){
        if(ele.classList.contains("li_ac")){
            ele.style.display = "none";
        } else {
            ele.style.display = "block";
        }
    });
    list.addEventListener("click", checkBox);
    ActCount();
    Menu();
});


completedBtn.addEventListener("click", function(){
    Border(this);

    // completedBtn버튼 클릭시 완료된것만 표시 시키는거
    [...list.children].forEach(function(ele){
        if(!ele.classList.contains("li_ac")){
            ele.style.display = "none";
        } else {
            ele.style.display = "block";
        }
    });
    list.addEventListener("click", checkBox);
    ComCount();
    Menu();
});

clearBtn.addEventListener("click", function(){
    
    // clearBtn버튼 클릭시 완료된 모든 리스트 삭제 시키는 것
    [...document.querySelectorAll(".li_ac")].forEach((list) => {
        list.remove();
    });
    allBtn.click();
    Menu();
});



const data = JSON.parse(localStorage.getItem('items'));



input.addEventListener("keydown", function({ key }){
    // input에세 엔터시 리스트 추가 하는거
    
    if(key == "Enter"){
        if(input.value === ""){
            alert("입력하실 내용 입력하세요");
            
            return false;
        }
        
        
        const addLi = createLi(this.value);
        list.children[0].before(addLi);
        
        
        itemsArray.push(this.value);
        localStorage.setItem('items', JSON.stringify(itemsArray)); 

        [...list.children].forEach(function(ele, idx){
            ele.dataset.id = "";
            ele.dataset.id = idx;
        })
        // console.log(itemsArray);
        // console.log(localStorage.getItem("items"));
        
        input.value = "";

        
        Count();
        // 마우스가 위로 올라가면 실행
        addLi.addEventListener("mouseover", function(){ 
            this.classList.add("hov");
        });
        
        // 마우스에서 사라지면 실행
        addLi.addEventListener("mouseleave", function(){
            this.classList.remove("hov");
        });
        
        addLi.addEventListener("dblclick", dblClick);
        
        allBtn.click();
    }
    Menu();
});

// localStorage 에서 불러와 리스트 작성
data.forEach(function(ele, idx){
    const addLi = createLi(ele);

    // console.log(addLi)
    addLi.dataset.id = idx;
    // dataSet(addLi, idx);
    addLi.dataset.num = 0;
    list.children[0].before(addLi);

    Count();
    
    addLi.addEventListener("mouseover", function(){ 
        this.classList.add("hov");
    });
    
    
    addLi.addEventListener("mouseleave", function(){
        this.classList.remove("hov");
    });
    addLi.addEventListener("dblclick", dblClick);
        
    allBtn.click();
    Menu();
})




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
        // let ii = itemsArray.indexOf(target.parentNode.children[1].innerText)
        // console.log(target.parentNode.dataset.id)
        itemsArray.splice(target.parentNode.dataset.id,1);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        Menu();
        Count();
    };
});
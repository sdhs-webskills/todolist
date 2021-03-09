const $mainInput = document.querySelector("#main");
const $list = document.querySelector("#list");
const $controll = document.querySelector("#controll");
const $allSell = document.querySelector("#all_sel");
const $itemCount = document.querySelector("#item");
const $all = document.querySelector("#all");
const $act = document.querySelector("#act");
const $com = document.querySelector("#com");
const $cle = document.querySelector("#cle");

let itemList = JSON.parse(localStorage.getItem("todosItemList")) ?? new Array();
let pageType = localStorage.getItem("todosPageType") ?? "all";
let escape = false;

itemList.forEach(item => {
    addItem(item.text, item.completed);
})

$all.classList.remove("sp_ac");
$act.classList.remove("sp_ac");
$com.classList.remove("sp_ac");

if(pageType === "all") {
    $all.classList.add("sp_ac");
    $list.classList.remove("act");
    $list.classList.remove("com");
}
if(pageType === "act") {
    $act.classList.add("sp_ac");
    $list.classList.add("act");
    $list.classList.remove("com");
}
if(pageType === "com") {
    $com.classList.add("sp_ac");
    $list.classList.remove("act");
    $list.classList.add("com");
}

function controllButtonClassReset($click) {
    $all.classList.remove("sp_ac");
    $act.classList.remove("sp_ac");
    $com.classList.remove("sp_ac");

    $click.classList.add("sp_ac");
}

function changeList() {
    const list = $list.querySelectorAll(".list");
    const listCount = list.length;
    const ActiveListCount = $list.querySelectorAll(".li_ac").length;
    const leftItem = listCount - ActiveListCount;

    if(pageType === "all") {
        $itemCount.innerHTML = `${listCount} items left`;
    }else if(pageType === "act") {
        $itemCount.innerHTML = `${leftItem} items left`;
    }else if(pageType === "com") {
        $itemCount.innerHTML = `${ActiveListCount} items left`;
    }

    if(listCount === ActiveListCount) {
        $allSell.classList.add("all_ac");
    }else {
        $allSell.classList.remove("all_ac");
    }

    if(listCount >= 1) {
        $allSell.innerHTML = "❯";
        $controll.style.display = "flex";
    }else{
        $allSell.innerHTML = "";
        $controll.style.display = "none";
    }

    itemList = new Array();

    list.forEach(item => {
        const itemData = new Object();

        itemData.completed = hasClass(item, "li_ac");
        itemData.text = item.querySelector(".text").innerHTML;

        itemList.push(itemData);
    })

    localStorage.setItem("todosItemList", JSON.stringify(itemList));
    localStorage.setItem("todosPageType", pageType);
}

function addItemEvent($item) {
    $item.addEventListener("mouseenter", e => {
        $item.classList.add("hov");
    })

    $item.addEventListener("mouseleave", e => {
        $item.classList.remove("hov");
    })

    $item.querySelector(".check").addEventListener("click", e => {
        if(hasClass($item, "li_ac")) {
            e.target.innerHTML = "";
            $item.classList.remove("li_ac");
        }else {
            e.target.innerHTML = "&check;";
            $item.classList.add("li_ac");
        }

        changeList();
    })

    addTextEvent($item.querySelector(".text"));

    $item.querySelector(".close").addEventListener("click", e => {
        $item.remove();

        changeList();
    })
}

function addTextEvent(text) {
    const item = text.closest(".list");

    text.addEventListener("dblclick", e => {
        const input = document.createElement("input");

        input.size = 44;
        input.type = "text";
        input.value = e.target.innerHTML;
        input.dataset.value = e.target.innerHTML;
        input.classList.add("li_inp");

        item.classList.add("list_input");

        e.target.after(input);
        addinputEvent(input);

        e.target.remove();

        input.focus();
    })
}

function addinputEvent(input) {
    const item = input.closest(".list");

    input.addEventListener("keydown", e => {
        const key = e.key.toLowerCase();

        if(key === "escape") {
            escape = true;
            input.blur();
        }
        if(key === "enter") {
            input.blur();
        }
    })

    input.addEventListener("blur", e => {
        const text = document.createElement("p");

        text.classList.add("text");
        e.target.after(text);

        addTextEvent(text);

        if(escape) {
            text.innerHTML = e.target.dataset.value;
            escape = false;
        }else {
            text.innerHTML = e.target.value;
        }

        e.target.remove();

        item.classList.remove("list_input");
        if(text.innerHTML === "") item.remove();

        changeList();
    })
}

function addItem(value, com = false) {
    const $item = document.createElement("li");
    const check = document.createElement("div");
    const text = document.createElement("p");
    const close = document.createElement("p");

    $item.classList.add("list");
    check.classList.add("check");
    text.classList.add("text");
    close.classList.add("close");

    $item.append(check);
    $item.append(text);
    $item.append(close);

    text.innerHTML = value;
    close.innerHTML = "X";

    if(com) {
        $item.classList.add("li_ac");
        check.innerHTML = "&check;";
    }

    addItemEvent($item);

    $controll.before($item);

    changeList();
}

function hasClass(element, className) {
    return element.classList.contains(className);
}

changeList();

$mainInput.addEventListener("keydown", e => {
    const key = e.key.toLowerCase();
    const value = e.target.value;

    if(key === "enter" && value !== "") {
        addItem(e.target.value);
        e.target.value = "";
    }
})

$all.addEventListener("click", e => {
    $list.classList.remove("act");
    $list.classList.remove("com");
    controllButtonClassReset($all);

    pageType = "all";
    changeList();
})

$act.addEventListener("click", e => {
    $list.classList.add("act");
    $list.classList.remove("com");
    controllButtonClassReset($act);

    pageType = "act";
    changeList();
})

$com.addEventListener("click", e => {
    $list.classList.remove("act");
    $list.classList.add("com");
    controllButtonClassReset($com);

    pageType = "com";
    changeList();
})

$cle.addEventListener("click", e => {
    $items = $list.querySelectorAll(".li_ac");

    $items.forEach(item => {
        item.remove();
    })

    changeList();
})

$allSell.addEventListener("click", e => {
    $items = $list.querySelectorAll(".list");

    if(hasClass($allSell, "all_ac")) {
        $items.forEach(item => {
            item.classList.remove("li_ac");
            item.querySelector(".check").innerHTML = "";
        })
    }else {
        $items.forEach(item => {
            item.classList.add("li_ac");
            item.querySelector(".check").innerHTML = "&check;";
        })
    }

    changeList();
})
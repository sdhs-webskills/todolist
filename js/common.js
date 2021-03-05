// window.onload() = function(){
const mainInput = document.querySelector('#main');
const todoList = document.querySelector('list');

mainInput.addEventListener('keydown',function(e){
    if(e.keyCode == 13){
        let li = document.createElement('li')
        let todoElemnt = li.classList.add('controll')
        let hh = document.todoList.appendChild(todoElemnt)
        // console.log(1)
    }
})
// }
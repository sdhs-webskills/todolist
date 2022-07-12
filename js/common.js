const $ = e => document.querySelector(e);
const $all = e => [...document.querySelectorAll(e)];

function render() {
    const state = {
        chk: false
    }
    const todoAdd = ({key, code, keyCode}) => {
        if(key === 'enter' || code === 'enter' || keyCode === 13) {
            try {
                if($('#main').value === '')
                throw '공백 안됩니다.';
            } catch(e) {
                alert(e);
                return;
            }
            create($('#main').value);
            $('#main').value = '';
        }
    }
    const create = e => {
        const li = document.createElement('li');
        li.classList.add('list');
        li.innerHTML = `
            <div class="check"></div>
            <p class="text">${e}</p>
            <p class="close">X</p>
        `
        $('#list').appendChild(li);
        addFlex();
        $all('.check').forEach(e => e.addEventListener('click', toggleChk));
        $all('.list').forEach(e => e.addEventListener('mouseover', liOver));
        $all('.list').forEach(e => e.addEventListener('mouseleave', liLeave));
    }
    const addFlex = () => {
        if($all('.list').length > 0) {
            $('#controll').classList.add('flex');
            $('#item').innerText = $all('.list').length + '개';
        }
    }
    const allChk = () => {
        state.chk = state.chk ? state.chk = false : state.chk = true;
        $all('.list').forEach(e => {
            if(state.chk) {
                $all('.check').forEach(e => e.innerText = '✓');
                e.classList.add('li_ac');
            } else {
                $all('.check').forEach(e => e.innerText = '');
                e.classList.remove('li_ac');
            }
        })
    }
    const toggleChk = function() {
        if(this.innerText === '') {
            this.innerText = '✓';
            this.parentNode.classList.add('li_ac');
        } else {
            this.innerText = '';
            this.parentNode.classList.remove('li_ac');
        }
    }
    const allBtnClick = () => {
        $('#all').classList.add('sp_ac');
        $('#act').classList.remove('sp_ac');
        $('#com').classList.remove('sp_ac');
        $all('.list').forEach(e => e.classList.remove('none'));
    }
    const actBtnClick = () => {
        $('#all').classList.remove('sp_ac');
        $('#act').classList.add('sp_ac');
        $('#com').classList.remove('sp_ac');
        $all('.list').forEach(e => {
            if(e.classList.contains('li_ac')) e.classList.add('none');
            else e.classList.remove('none');
        })
    }
    const comBtnClick = () => {
        $('#all').classList.remove('sp_ac');
        $('#act').classList.remove('sp_ac');
        $('#com').classList.add('sp_ac');
        $all('.list').forEach(e => {
            if(!e.classList.contains('li_ac')) e.classList.add('none');
            else e.classList.remove('none');
        })
    }
    const clear = () => {
        $all('.list').forEach(e => {
            if(e.classList.contains('li_ac')) e.parentNode.removeChild(e);
        })
    }
    const liOver = function() {
        this.classList.add('hov');
    }
    const liLeave = function() {
        this.classList.remove('hov');
    }
    $('#main').addEventListener('keydown', e => todoAdd(e));
    $('#all_sel').addEventListener('click', allChk);
    $('#all').addEventListener('click', allBtnClick);
    $('#act').addEventListener('click', actBtnClick);
    $('#com').addEventListener('click', comBtnClick);
    $('#cle').addEventListener('click', clear);
}
render();
(function(){
let data = JSON.parse(localStorage.getItem('data')) || [];
const listTasks = document.querySelector(".list-tasks");
const addBox = document.getElementById('addBox');


render();


function saveData() {
    localStorage.setItem('data', JSON.stringify(data));
}

function sortData() {
    data.sort((a, b) => b.prio - a.prio);
}

function render() {
    listTasks.innerHTML = "";
    let index = 0;
    data.forEach(item => {

        const $task = document.createElement("div");
        $task.classList.add('task');

        const $cbx = document.createElement("input");
        $cbx.type = 'checkbox';
        $cbx.checked = item.done;
        $cbx.id = `cbx-${index}`;

        const $doing = document.createElement('input');
        $doing.type = 'text';
        $doing.value = item.title;
        $doing.id = `txt-${index}`;
        if($cbx.checked) {
            $doing.classList.add('task-done');
        }

        const $prio = document.createElement('select');
        for(let i = 1; i <= 5; i++) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.text = i;
            opt.selected = (item.prio == i);
            $prio.appendChild(opt);
        }
        $prio.id = `prio-${index}`;

        const $span = document.createElement('span');
        $span.innerHTML = `&times;`;
        $span.id = `span-${index}`;

        $task.appendChild($cbx);
        $task.appendChild($doing);
        $task.appendChild($prio);
        $task.appendChild($span);

        listTasks.appendChild($task);

        index++;
    })
}

function addItem() {
    const newTitle = addBox.value;
    data.push({title : newTitle, done : false, prio : 3});
    sortData();
    render();
    saveData();
}

addBox.addEventListener('keypress', (e) => {
    // console.log(e.key);
    if(e.key === 'Enter') {
        addItem();
        addBox.value = "";
    }
});

function getIndex(id) {
    const spl = id.split('-');
    return parseInt(spl[1]);
}

listTasks.addEventListener('click', (e) => {
    const tar = e.target;
    if (tar.matches('input[type="checkbox"]')) {
        const index = getIndex(tar.id);
        data[index].done = tar.checked; 
        saveData();
        const inp = listTasks.querySelector(`#txt-${index}`);
        if(tar.checked) {
            inp.classList.add('task-done');
        } else {
            inp.classList.remove('task-done');
        }
    }
    else if (tar.matches('span')) {
        const index = getIndex(tar.id);
        data.splice(index, 1);
        saveData();
        render();
    }
});

listTasks.addEventListener('change', (e) => {
    const tar = e.target;
    if (tar.matches('input[type="text"]')) {
        const index = getIndex(tar.id);
        data[index].title = tar.value;
        saveData();
    } else if (tar.matches('select')) {
        const index = getIndex(tar.id);
        data[index].prio = tar.value;
        sortData();
        render();
    }
});

const allButtons = document.querySelector('.wp-filter');

let lastFilter = null;

allButtons.addEventListener('click', (e) => {
    const allCbx = listTasks.querySelectorAll('input[type="checkbox"]');
    if(e.target.matches('span')) {
        if(e.target.id === 'all') {
            console.log('hello');
            allCbx.forEach(item => {
                item.parentNode.classList.remove('task-hidden');
            })
        }
        else if (e.target.id === 'active') {
            allCbx.forEach(item => {
                if(item.checked) {
                    item.parentNode.classList.add('task-hidden');
                } else {
                    item.parentNode.classList.remove('task-hidden');
                }
            })
        } else if (e.target.id === 'completed') {
            allCbx.forEach(item => {
                if(!item.checked) {
                    item.parentNode.classList.add('task-hidden');
                } else {
                    item.parentNode.classList.remove('task-hidden');
                }
            })
        } else {
            return;
        }
        if (lastFilter != null) {
            lastFilter.classList.remove('filter-active');
        }
        lastFilter = e.target;
        e.target.classList.add('filter-active');
    }
});

})()
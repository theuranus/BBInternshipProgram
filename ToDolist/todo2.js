class ToDo {
    constructor(id, data) {
        this.el = document.getElementById(id);
        this.data = data || [];
        this.el.classList.add('container');
        this.initialize();
    }
    initialize() {
        this.el.innerHTML = this.constructor.template;
        this.listTasks = this.el.querySelector('.list-tasks');
        this.addBox = this.el.querySelector('.addBox');
        this.render();
        this.listTasks.addEventListener('click', this.handleClick.bind(this));
        this.listTasks.addEventListener('change', this.handleChange.bind(this));
        this.addBox.addEventListener('keypress', this.handleAddTask.bind(this));
        this.allButtons = this.el.querySelector('.wp-filter');
        this.lastFilter = null;
        this.allButtons.addEventListener('click', this.handleFilterButtons.bind(this));
    }
    saveData() {
        if (this.el.id === 'todo1') {
            localStorage.setItem('data1', JSON.stringify(this.data));
        } else if (this.el.id === 'todo2') {
            localStorage.setItem('data2', JSON.stringify(this.data));
        }
    }
    sortData() {
        this.data.sort((a, b) => b.prio - a.prio);
    }
    render() {
        this.listTasks.innerHTML = "";
        let index = 0;
        this.data.forEach(item => {
            const $task = document.createElement("div");
            $task.classList.add('task');

            const $cbx = document.createElement("input");
            $cbx.type = 'checkbox';
            $cbx.checked = item.done;
            $cbx.id = `${this.el.id}-cbx-${index}`;

            const $doing = document.createElement('input');
            $doing.type = 'text';
            $doing.value = item.title;
            $doing.id = `${this.el.id}-txt-${index}`;
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
            $prio.id = `${this.el.id}-prio-${index}`;

            const $span = document.createElement('span');
            $span.innerHTML = `&times;`;
            $span.id = `${this.el.id}-span-${index}`;

            $task.appendChild($cbx);
            $task.appendChild($doing);
            $task.appendChild($prio);
            $task.appendChild($span);

            this.listTasks.appendChild($task);

            index++;
        });
    }
    getIndex(id) {
        const spl = id.split('-');
        return parseInt(spl[2]);
    }
    removeItem() {

    }
    addItem() {
        const newTitle = this.addBox.value;
        this.data.push({title : newTitle, done : false, prio : 3});
        this.sortData();
        this.render();
        this.saveData();
    }
    handleClick(e) {
        const tar = e.target;
        if (tar.matches('input[type="checkbox"]')) {
            const index = this.getIndex(tar.id);
            this.data[index].done = tar.checked; 
            this.saveData();
            const inp = this.listTasks.querySelector(`#${this.el.id}-txt-${index}`);
            if(tar.checked) {
                inp.classList.add('task-done');
            } else {
                inp.classList.remove('task-done');
            }
        }
        else if (tar.matches('span')) {
            const index = this.getIndex(tar.id);
            this.data.splice(index, 1);
            this.saveData();
            this.render();
        }
    }
    handleChange(e) {
        const tar = e.target;
        if (tar.matches('input[type="text"]')) {
            const index = this.getIndex(tar.id);
            this.data[index].title = tar.value;
            this.saveData();
        } else if (tar.matches('select')) {
            const index = this.getIndex(tar.id);
            this.data[index].prio = tar.value;
            this.sortData();
            this.saveData();
            this.render();
        }
    }
    handleAddTask(e) {
        if(e.key === 'Enter') {
            this.addItem();
            this.addBox.value = "";
        } 
    }
    handleFilterButtons(e) {
        const allCbx = this.listTasks.querySelectorAll('input[type="checkbox"]');
        if(e.target.matches('span')) {
            if(e.target.getAttribute('data') === 'all') {
                allCbx.forEach(item => {
                    item.parentNode.classList.remove('task-hidden');
                })
            }
            else if (e.target.getAttribute('data') === 'active') {
                allCbx.forEach(item => {
                    if(item.checked) {
                        item.parentNode.classList.add('task-hidden');
                    } else {
                        item.parentNode.classList.remove('task-hidden');
                    }
                })
            } else if (e.target.getAttribute('data') === 'completed') {
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
            if (this.lastFilter != null) {
                this.lastFilter.classList.remove('filter-active');
            }
            this.lastFilter = e.target;
            e.target.classList.add('filter-active');
        }
    }
}

ToDo.template = `
    
    <div class="list-tasks">
    </div>   
    <div class="wp-add-task">
        <input type="text" class="addBox" placeholder="+ Add to list"/>
    </div>
    <div class="wp-filter">
        <span data="all">All</span>
        <span data="active">Active</span>
        <span data="completed">Completed</span>
    </div>
`

new ToDo('todo1', JSON.parse(localStorage.getItem('data1')))
new ToDo('todo2', JSON.parse(localStorage.getItem('data2')))
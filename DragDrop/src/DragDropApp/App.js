import React from 'react'
import Item from './Item'
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.placeholder = document.createElement('div')
        this.placeholder.id = 'temp'
        this.state = {
            list1 : [
                {id: 'a', name: 'Item A'},
                {id: 'b', name: 'Item B'},
                {id: 'g', name: 'Item G'},
            ],
            list2 : [
                {id: 'c', name: 'Item C'},
                {id: 'd', name: 'Item D'},
                {id: 'h', name: 'Item H'},
            ],
            list3 : [
                {id: 'e', name: 'Item E'},
                {id: 'f', name: 'Item F'},
                {id: 'r', name: 'Item R'},
            ]
        };
    }
    activeList = null

    handleDragOver = (e) => {
        e.preventDefault()
        const target = e.target.closest('.dataitem')
        
        if (target) {
            const pos = target.getBoundingClientRect();
            if (e.clientX >= pos.x 
                && e.clientX <= pos.right 
                && e.clientY >= pos.y 
                && e.clientY <= (pos.bottom + pos.y)/2) 
            {
                target.parentNode.insertBefore(this.placeholder, target)

            } else if (e.clientX >= pos.x 
                        && e.clientX <= pos.right 
                        && e.clientY > (pos.bottom + pos.y)/2 
                        && e.clientY <= pos.bottom) 
            {
                target.parentNode.insertBefore(this.placeholder, target.nextSibling)

            }
        } else if ( e.target != this.placeholder) {
            e.target.closest('.dropzone').append(this.placeholder)
        }
       
    }   

    handleDragEnter = (e) => {
        const list = e.target.closest('.dropzone')
        if (this.activeList && this.activeList !== list) {
            this.activeList.classList.remove('dropzoneslt')
        }
        this.activeList = list
        this.activeList.classList.add('dropzoneslt')
    }

    handleDragLeave = (e) => {
        if (!e.relatedTarget.closest('.dropzone')) {
            this.activeList.classList.remove('dropzoneslt')
            this.activeList = null  
        }

    }

    handleDragStart = (evt) => {

        evt.target.classList.add('itemslt');
        const id = evt.target.id;
        const parent = evt.target.closest('.dropzone')
        const parentList = parent.dataset.list
        evt.dataTransfer.setData('todo/id', id)
        evt.dataTransfer.setData('todo/list', parentList)
        evt.persist()
        setTimeout(() => {
            evt.target.classList.add('hidden-item')
        }, 20)
    }

    handleDrop = (evt) => {
        const fromList = evt.dataTransfer.getData('todo/list')
        const toList = evt.currentTarget.dataset.list
        const childs = Array.from(evt.currentTarget.childNodes)
        const ind = childs.indexOf(childs.find(i => i.id === 'temp'));
        if (fromList !== toList) {
            evt.preventDefault()
            const list1 = this.state[fromList].slice()
            const list2 = this.state[toList].slice()
            const id = evt.dataTransfer.getData('todo/id');
            const item = list1.find(i => i.id === id)
            const itemIndex = list1.indexOf(item)
            list2.splice(ind, 0, item)
            list1.splice(itemIndex, 1)
            this.setState({
                [fromList]: list1, 
                [toList]: list2
            });
        } else {
            const listItem = this.state[fromList].slice()
            const id = evt.dataTransfer.getData('todo/id');
            const itemSend = listItem.find(i => i.id === id)
            const indexSend = listItem.indexOf(itemSend)
            listItem.splice(ind, 0, itemSend);
            if (ind < indexSend) {
                listItem.splice(indexSend+1, 1)
            } else {
                listItem.splice(indexSend, 1)
            }
            this.setState({
                [fromList]: listItem
            })
        }
    }

    componentDidUpdate() {
        const drzslt = document.querySelector('.dropzoneslt')
        if (drzslt) {
            drzslt.classList.remove('dropzoneslt'); 
        } 
        const itmslt = document.querySelector('.itemslt')
        if (itmslt) {
            itmslt.classList.remove('itemslt');
        }
        const temp = document.getElementById('temp')
        if (temp) {
            temp.remove()
        }

        const hiddenItem = document.querySelector('.hidden-item')
        if (hiddenItem) {
            hiddenItem.classList.remove('hidden-item')
        }
    }

    renderList(data) {
        return data.map(itm => {
            return <Item
                key = {itm.id}
                id = {itm.id}
                name = {itm.name}
                onDragStart = {this.handleDragStart }
            />
        })
    }

    render() {
        return(
            <div >
                <div 
                    className='dropzone'
                    data-list="list1"
                    onDragOver = {this.handleDragOver }
                    onDragEnter = {this.handleDragEnter.bind(this)}
                    onDragLeave = {this.handleDragLeave.bind(this)}
                    onDrop = {this.handleDrop}
                >
                    {
                        this.renderList(this.state.list1)
                    }
                </div>
                <div 
                    className='dropzone'
                    data-list="list2"
                    onDragOver = {this.handleDragOver }
                    onDragEnter = {this.handleDragEnter}
                    onDragLeave = {this.handleDragLeave}
                    onDrop={this.handleDrop}
                >
                    {
                        this.renderList(this.state.list2)
                    }
                </div>
                <div 
                    className='dropzone'
                    data-list="list3"
                    onDragOver = {this.handleDragOver }
                    onDragEnter = {this.handleDragEnter}
                    onDragLeave = {this.handleDragLeave}
                    onDrop={this.handleDrop}
                >
                    {
                        this.renderList(this.state.list3)
                    }
                </div>
            </div>
        )
        
    }
}
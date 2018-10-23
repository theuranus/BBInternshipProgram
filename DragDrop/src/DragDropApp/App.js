import React from 'react'
import Item from './Item'
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list1 : [
                {id: 'a', name: 'Item A'},
                {id: 'b', name: 'Item B'},
            ],
            list2 : [
                {id: 'c', name: 'Item C'},
                {id: 'd', name: 'Item D'},
            ],
            list3 : [
                {id: 'e', name: 'Item E'},
                {id: 'f', name: 'Item F'},
            ]
        };
    }

    handleDragOver(e) {
        e.preventDefault()
    }

    handleDragEnter(e) {
        // console.log(e.target, e.currentTarget) 
        // if (e.target.id != "") {
        //     e.target.parentNode.classList.add('dropzoneslt');
        // } else {
        //     e.target.classList.add('dropzoneslt');
        // }
        e.currentTarget.classList.add('dropzoneslt');
        // console.log("Enter ", e.currentTarget)
    }

    handleDragLeave(e) {
        // e.target.parentNode.classList.remove('dropzoneslt');
        // e.target.classList.remove('dropzoneslt');
        if (e.target.id == "") {
            e.currentTarget.classList.remove('dropzoneslt');
        }
        
        // console.log("Leave ", e.currentTarget)
    }

    handleDragStart = (evt) => {

        evt.target.classList.add('itemslt');
        const id = evt.target.id;
        const parent = evt.target.closest('.dropzone')
        const parentList = parent.dataset.list
        evt.dataTransfer.setData('todo/id', id)
        evt.dataTransfer.setData('todo/list', parentList)
    }

    handleDrop = (evt) => {
        const fromList = evt.dataTransfer.getData('todo/list')
        const toList = evt.currentTarget.dataset.list
        if (fromList !== toList) {
            evt.preventDefault()
            const list1 = this.state[fromList].slice()
            const list2 = this.state[toList].slice()
            const id = evt.dataTransfer.getData('todo/id');
            const item = list1.find(i => i.id === id)
            const itemIndex = list1.indexOf(item)
            list2.push(item)
            list1.splice(itemIndex, 1)
            this.setState({
                [fromList]: list1, 
                [toList]: list2
            });
        }
        evt.target.classList.remove('dropzoneslt'); 
        document.querySelector('.itemslt').classList.remove('itemslt');
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
            <div onDragOver = {this.handleDragOver }>
                <div 
                    className='dropzone'
                    data-list="list1"
                    onDragEnter = {this.handleDragEnter}
                    onDragLeave = {this.handleDragLeave}
                    onDrop = {this.handleDrop}
                >
                    {
                        this.renderList(this.state.list1)
                    }
                </div>
                <div 
                    className='dropzone'
                    data-list="list2"
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
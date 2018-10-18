import React from 'react'

import Task from './Task'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        window.app = this
        this.state = {
            data: JSON.parse(localStorage.getItem('data')) || [],
            filtering: 'all'
        };
    }

    saveData(data) {
        localStorage.setItem('data', JSON.stringify(data));
    }

    sortData(data) {
        data.sort((a,b) =>  b.prio - a.prio);
        return data;
    }

    addTaskHandler(title) {
        const dataChanged = this.state.data.slice();
        dataChanged.push({ done: false, title: title, prio: 3});
        this.sortData(dataChanged);
        this.saveData(dataChanged);
        this.setState({data: dataChanged});
    }

    handleEnter(e, tit) {
        if (e.key == 'Enter') {
            this.addTaskHandler(tit);
            e.target.value = "";
        }
    }

    render() {
        const renderTask = this.state.data.map((el, index) => {
            return <Task
                key = {index}
                filtering = {this.state.filtering}
                {...el}
                onChange = {(type, value) => {
                    const dataChanged = this.state.data.slice();
                    if (type == 'done') {
                        dataChanged[index].done = value;
                    } else if (type == 'title') {
                        dataChanged[index].title = value;
                    } else if (type == 'prio') {
                        dataChanged[index].prio = value;
                        this.sortData(dataChanged);
                    }
                    this.saveData(dataChanged);
                    this.setState({data: dataChanged});
                }}
                onRemove={() => {
                    const dataChanged = this.state.data.slice();
                    dataChanged.splice(index, 1);
                    this.saveData(dataChanged);
                    this.setState({ data: dataChanged});
                }}
            />
        })
        return(
            <div className="container">
                <div className="list-tasks">
                    {renderTask}
                </div>
                <div className="wp-add-task">
                    <input 
                        type="text" 
                        placeholder="+ Add to list"
                        onKeyPress={(e) => this.handleEnter(e, e.target.value) }
                    />
                </div>
                <div className="wp-filter">
                    <span onClick={() => {this.setState({filtering: 'all'})}}>All</span>
                    <span onClick={() => {this.setState({filtering: 'active'})}}>Active</span>
                    <span onClick={() => {this.setState({filtering: 'completed'})}}>Completed</span>
                </div>
            </div>
        )
    }
}
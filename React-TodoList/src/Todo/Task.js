import React from 'react'
import Types from 'prop-types'

const prios = [1,2,3,4,5]
export default class Task extends React.Component {
    static propTypes = {
        title: Types.string,
        done: Types.bool,
        prio: Types.any,
        onChange: Types.func,
        onRemove: Types.func,
        filtering: Types.string
    }

    // true => hidden
    checkHidden() {
        if(this.props.filtering == 'active') {
            return this.props.done;
        } else if (this.props.filtering == 'completed') {
            return !this.props.done;
        } 
        return false;
    }

    render() {
        return ( 
            <div className={this.checkHidden()?"task task-hidden" : "task"}>
                <input
                    type="checkbox"
                    checked={this.props.done}
                    onChange={(e) => this.props.onChange('done', e.target.checked)}
                />
                <input
                    type="text"
                    className={this.props.done?"task-done":""}
                    value={this.props.title}
                    onChange={e => this.props.onChange('title', e.target.value)}
                />
                <select 
                    value={this.props.prio}
                    onChange={e => this.props.onChange('prio', e.target.value)}
                >
                    {prios.map(i =>  <option>{i}</option>)}
                </select>
                <span  onClick={() => this.props.onRemove()}>&times;</span>
            </div>
        )
    }
}
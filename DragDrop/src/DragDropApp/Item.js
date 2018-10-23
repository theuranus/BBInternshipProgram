import React from 'react'

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div 
                className='dataitem' 
                draggable='true' 
                id = {this.props.id}
                onDragStart = {(evt) => this.props.onDragStart(evt)}
            >
                {this.props.name}
            </div>
        )
    }
}
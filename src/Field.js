import React, {Component} from "react";
import {DropTarget} from 'react-dnd';

class Field extends Component {
    constructor(props) {
        super(props);
        this.state = props.state;
    }

    render() {
        const { isOver, canDrop, connectDropTarget, droppedItem } = this.props;
        return connectDropTarget(
            <div style={{'borderStyle':'dotted','borderColor':'blue','margin':'20px','padding':'20px'}}>
                {this.state.id +": " +this.state.name}
            </div>
        )
    }
}

const spec = {
    drop(props, monitor, component) {
        const item = monitor.getItem()
        
        var state = component.props.state;
        console.log(state);
        state.data = item.data;
        state.name = item.name;
        component.setState(state)
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({shallow: true}),
        canDrop: monitor.canDrop()
    }
}

export default DropTarget("FEATURE", spec, collect)(Field);
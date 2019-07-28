import React, {Component} from "react";
import {DropTarget} from 'react-dnd';
import Variable from "./Variable";

class Field extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'id':props.id,
            'variables':[]
        }
        this.onVariableDelete = this.onVariableDelete.bind(this);
    }

    onVariableDelete = (name) => {
        var state = this.state;
        var variables = state.variables.filter((v) => v.name!=name)
        state.variables = variables;
        this.setState(state);
    }

    render() {
        const { isOver, canDrop, connectDropTarget, droppedItem } = this.props;
        var variables = this.state.variables.map((v)=>{
            return (<Variable name={v.name} mode={v.mode||'all'} key={v.name} onDelete={this.onVariableDelete}/>)
        })
        return connectDropTarget(
            <div style={{'borderStyle':'dotted','borderColor':'blue','margin':'20px','padding':'20px'}}>
                {this.state.id}
                {variables}
            </div>
        )
    }
}

const spec = {
    drop(props, monitor, component) {
        const item = monitor.getItem()
        
        var state = component.state;
        if (state['variables'].filter((v)=>v.name==item.name).length ==0) {
            state['variables'].push(item);
            component.props.onUpdate(state);
            component.setState(state);
        }
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
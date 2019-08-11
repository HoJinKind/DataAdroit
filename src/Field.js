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
        this.onVariableChange = this.onVariableChange.bind(this);
    }

    onVariableDelete = (name) => {
        var vars = JSON.parse(JSON.stringify(this.props.vars));
        var vars = vars.filter((v) => v.name!=name)
        this.props.onUpdate(this.props.id,vars);
    }

    onVariableChange = (variable) => {
        var vars = JSON.parse(JSON.stringify(this.props.vars));
        var vars = vars.map((v) => {
            if (v.name==variable.name) {
                return variable;
            } else {
                return v;
            }
        })
        console.log('change',vars)
        this.props.onUpdate(this.props.id,vars);
    }

    render() {
        const { isOver, canDrop, connectDropTarget, droppedItem } = this.props;
        var variables = this.props.vars.map((v)=>{
            return (<Variable name={v.name} mode={v.mode||'all'} key={v.name} onDelete={this.onVariableDelete} onChange={this.onVariableChange}/>)
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
        
        var vars = component.props.vars;
        if (vars.filter((v)=>v.name==item.name).length ==0) {
            vars.push(item);
            component.props.onUpdate(component.props.id,vars);
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
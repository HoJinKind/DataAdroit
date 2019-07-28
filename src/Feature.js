import React, { Component } from "react";
import {DragSource} from "react-dnd";

class Feature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': props.name,
            'type':props.type
        }
    }
    render() {
        // mean, mode, median, average, sum, all
        const {name, connectDragSource} = this.props;
        return connectDragSource(
            <div>{`${this.state.name}:${this.state.type}`}</div>
        )
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource()
    };
}

const source = {
    beginDrag(props, monitor, component) {
        const item = component.state;
        return item;
    }
}

export default DragSource("FEATURE", source, collect)(Feature)

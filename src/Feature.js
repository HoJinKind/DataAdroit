import React, { Component } from "react";
import {DragSource} from "react-dnd";
import { connect } from "net";

class Feature extends Component {
    constructor(props) {
        super(props);
        this.state = props.state
    }
    render() {
        // mean, mode, median, average, sum, all
        const {name, connectDragSource} = this.props;
        return connectDragSource(
            <div>{this.state.name}</div>
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
        const item = props.state;
        return item;
    }
}

export default DragSource("FEATURE", source, collect)(Feature)

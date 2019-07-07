import React, {Component} from "react";
import {CSVReader} from "react-papaparse";
import {DragSource} from "react-dnd";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class Source extends Component {

    constructor(props) {
        super(props);
        this.state = props.state
    }
    

    render() {
        const {name, connectDragSource} = this.props;
        return connectDragSource(
            <div className="Source">{this.state.filename}</div>
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

//const ContainerWrapper = DragDropContext(HTML5Backend)(Container);

export default DragSource("SOURCE", source, collect)(Source);
import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import "./source.css";

class Source extends Component{
    constructor(props) {
        super(props);
        this.state = props.state;
    }
  render(){
    const { name, connectDragSource } = this.props;
    return connectDragSource(
      <li className="square">
        {name}
      </li>
    )
    
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

const cardSource = {
    beginDrag(props, monitor, component) {
        const item = { id: props.id, name:props.name };
        return item;
    }
};



export default DragSource("SOURCE", cardSource, collect)(Source);
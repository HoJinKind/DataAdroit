import React, { Component } from 'react';
import Source from './DragSource';
import Target from './Target';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';

class Container extends Component {
  constructor(){
    super();
    this.state = {
      droppedItem: {}
    }
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(item){
    this.setState({
      droppedItem: item
    })
  }

  render() {
    return (
      <div className="App">
        <div className="source">
          <Source name="Block A" id="a"/>
          <Source name="Block B" id="b"/>
        </div>
        <div className="destination">
          <Target 
            droppedItem={this.state.droppedItem} 
            onDrop={this.onDrop}/>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container);
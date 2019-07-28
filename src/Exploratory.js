import React, { Component } from "react";
import Ribbon from "./Ribbon";
import Board from "./Board";
import { simpleSwitch } from "react-tabtab/lib/helpers/move";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class Exploratory extends Component {
    constructor(props) {
        super(props);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleTabSequenceChange = this.handleTabSequenceChange.bind(this);
        this.state = {
            name: "Exploratory",
            activeIndex: 0,
            boards: [{ name: "Board 1" }],
            sources: []
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange = state => {
        this.setState(state);
    }

    handleAddBoard = state => {
        
        this.setState(state);
    };

    handleTabChange = index => {
        //var state = this.state;
        //state.activeIndex = index;
        this.setState({'activeIndex':index});
    };

    handleTabSequenceChange({ oldIndex, newIndex }) {
        const { boards } = this.state;
        const updateTabs = simpleSwitch(boards, oldIndex, newIndex);
        console.log(updateTabs);
        console.log('exit E')
        this.setState({ boards: updateTabs, activeIndex: newIndex });
    }

    handleEdit = ({ type, index }) => {
        this.setState(state => {
            let { tabs, activeIndex } = state;
            if (type === "delete") {
                tabs = [...tabs.slice(0, index), ...tabs.slice(index + 1)];
            }
            if (index - 1 >= 0) {
                activeIndex = index - 1;
            } else {
                activeIndex = 0;
            }
            return { tabs, activeIndex };
        });
    };

    render() {
        // console.log(this.state);

        // const closable = this.state.boards.length > 1;
        // var tabLists = this.state.boards.map((board, i) => (
        //     <DragTab key={i} closable={closable}>
        //         {board.name}
        //     </DragTab>
        // ));
        // var tabPanels = this.state.boards.map((board, i) => (
        //     <Panel cache={true} key={i}>
        //         <div><Board onChange={this.onChange}/></div>
        //     </Panel>
        // ));
        // console.log(tabLists);
        return (
            <div className="Exploratory" style={{'display':'flex'}}>
                <Ribbon state={this.state} onAddBoard={this.handleAddBoard}/>
                <Board onChange={this.onChange}/>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Exploratory);

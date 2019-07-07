import React, { Component } from "react";
import Ribbon from "./Ribbon";
import Board from "./Board";
import { Tabs, DragTabList, DragTab, PanelList, Panel } from "react-tabtab";
import { simpleSwitch } from "react-tabtab/lib/helpers/move";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TabList from "react-tabtab/lib/TabList";
import * as customStyle from "react-tabtab/lib/themes/bootstrap";

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
    }

    handleAddBoard = state => {
        
        this.setState(state);
    };

    handleTabChange = index => {
        var state = this.state;
        state.activeIndex = index;
        this.setState(state);
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
        console.log(this.state);

        const closable = this.state.boards.length > 1;
        var tabLists = this.state.boards.map((board, i) => (
            <DragTab key={i} closable={closable}>
                {board.name}
            </DragTab>
        ));
        var tabPanels = this.state.boards.map((board, i) => (
            <Panel key={i}>
                <Board state={board} />
            </Panel>
        ));
        console.log(tabLists);
        return (
            <div className="Exploratory">
                <Ribbon state={this.state} onAddBoard={this.handleAddBoard} />
                <Tabs
                    activeIndex={this.state.activeIndex}
                    onTabChange={this.handleTabChange}
                    onTabSequenceChange={this.handleTabSequenceChange}
                    customStyle={customStyle}
                    onTabEdit={this.handleEdit}
                >
                    <DragTabList>{tabLists}</DragTabList>
                    <PanelList>{tabPanels}</PanelList>
                </Tabs>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Exploratory);

import React, { Component } from "react";
import Ribbon from "./Ribbon";
import ChartHandler from "./ChartHandler";
import Source from "./Source";
import Space from "./Space";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = props.state;
        if (this.state.spaces == null) {
            this.state.spaces = [{}];
        }
    }

    handleAddSpace = () => {
        let state = this.state;
        state.spaces.push({});
        this.setState(state);
    };

    render() {
        var spaces = this.state.spaces.map((space, i) => (
            <Space key={i} state={space} />
        ));
        return (
            <div>
                <button
                    style={{
                        float: "right",
                        marginRight: "20px",
                        display: "block"
                    }}
                    onClick={this.handleAddSpace}
                >
                    + Space
                </button>
                <br />
                {spaces}
            </div>
        );
    }
}

export default Board;

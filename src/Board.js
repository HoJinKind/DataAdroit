import React, {Component} from "react";
import Ribbon from "./Ribbon"
import Chart from "./Chart"
import Source from "./Source"
import Space from "./Space"

class Board extends Components {

    constructor(props) {
        super(props);
        this.state = {
            spaces:[]
        }
    }

    render() {
        <div>
            <Ribbon/>
        </div>
    }
}

export default Board;
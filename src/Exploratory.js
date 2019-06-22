import React, {Component} from "react"
import Ribbon from "./Ribbon"

class Exploratory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boards = []
        }
    }
    render() {
        return (
            <Ribbon/>
            
        )
    }
}

export default Exploratory;




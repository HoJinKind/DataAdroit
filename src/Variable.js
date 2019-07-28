import React, {Component} from "react";

class Variable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'name':props.name,
            'mode':props.mode,
            'data':props.data
        }
    }

    render() {
        return (
            <div>
                {`${this.state.name} (${this.state.mode})`}
            </div>
        )

    }
}

export default Variable;
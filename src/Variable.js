import React, {Component} from "react";
import Dropdown from 'react-bootstrap/Dropdown';

class Variable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'name':props.name,
            'mode':props.mode,
            'data':props.data
        }
        this.setModeAll = this.setModeAll.bind(this);
        this.setModeMean = this.setModeMean.bind(this);
        this.setModeMedian = this.setModeMedian.bind(this);
    }

    setModeAll = () => {
        var state = this.state;
        state.mode = 'all';
        this.setState(state);
    }

    setModeMean = () => {
        var state = this.state;
        state.mode = 'mean';
        this.setState(state);
    }

    setModeMedian = () => {
        var state = this.state;
        state.mode = 'median';
        this.setState(state);
    }

    render() {
        return (
            <div style={{'display':'inline-block','width':'auto','padding':'5px'}}>
                <Dropdown style={{'display':'flex','width':'auto'}}>
                    <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" size="sm">
                    {`${this.state.name} (${this.state.mode})`}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item key={1} onClick={this.setModeAll}>all</Dropdown.Item>
                        <Dropdown.Item key={2} onClick={this.setModeMean}>mean</Dropdown.Item>
                        <Dropdown.Item key={3} onClick={this.setModeMedian}>median</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
                
        )

    }
}

export default Variable;
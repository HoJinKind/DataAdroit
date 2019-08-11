import React, {Component} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from "semantic-ui-react";

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
        this.delete = this.delete.bind(this);
    }

    setModeAll = () => {
        var state = {
            'name':this.props.name,
            'mode':'all',
            'data':this.props.data
        };
        this.props.onChange(state);
        // this.setState(state);
    }

    setModeMean = () => {
        var state = {
            'name':this.props.name,
            'mode':'mean',
            'data':this.props.data
        };
        this.props.onChange(state);
        // this.setState(state);
    }

    setModeMedian = () => {
        var state = {
            'name':this.props.name,
            'mode':'median',
            'data':this.props.data
        };
        this.props.onChange(state);
        // this.setState(state);
    }

    delete = () => {
        this.props.onDelete(this.state.name);
    }

    render() {
        return (
            <div style={{'display':'inline-block','width':'auto','padding':'5px'}}>
                <Dropdown style={{'display':'inline','width':'auto'}}>
                    <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" size="sm">
                    {`${this.props.name} (${this.props.mode})`}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item key={1} onClick={this.setModeAll}>all</Dropdown.Item>
                        <Dropdown.Item key={2} onClick={this.setModeMean}>mean</Dropdown.Item>
                        <Dropdown.Item key={3} onClick={this.setModeMedian}>median</Dropdown.Item>
                    </Dropdown.Menu>
                    <Button variant='outline-primary' onClick={this.delete} style={{'display':'inline','width':'auto'}} size="sm">x</Button>
                </Dropdown>
                
            </div>
                
        )

    }
}

export default Variable;
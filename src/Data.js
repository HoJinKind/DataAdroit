import React, {Component} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';

class Data extends Component {
    constructor(props) {
        super(props);
        this.state = props.state;
    }

    render() {
        var features =this.state.features.map((feature,i)=><Dropdown.Item key={i}>{feature}</Dropdown.Item>)
        return (
            <div>
                close
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {this.state.filename}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {features}
                </Dropdown.Menu>
            </Dropdown>
            </div>
        )
        
    }
}

export default Data;
import React, {Component} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Feature from "./Feature";
import 'bootstrap/dist/css/bootstrap.css';

class Data extends Component {
    constructor(props) {
        super(props);
        this.state = props.state;
    }

    render() {
        console.log(this.state)
        var features =this.state.features.map((feature,i)=>{
            var fd = this.state.data.map((d)=>d[feature])
            var state = {
                "name":feature,
                "data":fd
            }
            return (
                <Dropdown.Item key={i}><Feature state={state}/></Dropdown.Item>
            )
        })
        return (
            <div>
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
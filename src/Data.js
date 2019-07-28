import React, {Component} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Feature from "./Feature";
import 'bootstrap/dist/css/bootstrap.css';

class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "name":props.name,
            "features":props.features,
            "data":props.data
        }
    }

    render() {
        var features =this.state.features.map((feature,i)=>{
            var type = 'num'
            var fd = this.state.data.map((d)=>{
                if (isNaN(d[feature])) {
                    type = 'str'
                }
                return d[feature];
            })
            return (
                <Dropdown.Item key={i}><Feature name={feature} data={fd} type={type}/></Dropdown.Item>
            )
        })
        return (
            <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {this.state.name}
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
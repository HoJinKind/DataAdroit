import React, {Component} from "react";

class SIXTable extends Component {
    componentDidMount() {
        fetch('https://jiffy.ddns.net:4000/user',{
            method:'get'
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }
}

export default SIXTable;
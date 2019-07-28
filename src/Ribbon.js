import React, { Component } from "react";
import {CSVReader} from "react-papaparse";
import Source from "./Source";
import Dropdown from 'react-bootstrap/Dropdown';

class Ribbon extends Component {
    constructor(props) {
        super(props)
        this.fileInput = React.createRef();
        this.state = props.state;
        this.style = props.style;
    }

    handleReadCSV = data => {
        
        var raw_data = data.data;
                
        var data = []
        for (var i=1; i<raw_data.length;i++) {
            var line = {};
            for (var j=0;j<raw_data[0].length;j++) {
                line[raw_data[0][j]] = raw_data[i][j];
            }
            data.push(line)
        }
        
        let state = this.state;
        let source = {};
        source.name = this.fileInput.current.files[0].name;
        source.data = data;
        source.features = raw_data[0];
        state.sources.push(source);
        this.setState(state);
    };
            
    handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    };
            
    handleImportOffer = () => {
        const file = this.fileInput.current.click();  
    };

    handleAddBoard = () => {
        let state = this.state;
        var n = this.state.boards.length+1;
        state.boards.push({name:'Board '+n});
        console.log(state.boards)
        this.props.onAddBoard(state);
    }

    handleExport = () => {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(this.state)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = `${this.state.name}.json`;
        a.click();
    }

    render() {

        var state = this.state
        console.log(state.sources)
        var sources = state.sources.map((source,i)=>{return <Source key={i} state={source}/>})
        return (
            
            <div style={{'position':'fixed','width':'25vw','height':'100vh','padding':'20px','backgroundColor':'rgb(154, 252, 243'}}>
                <big><b>{this.state.name}</b></big>
                <CSVReader
                    onFileLoaded={this.handleReadCSV}
                    inputRef={this.fileInput}
                    style={{ display: "none" }}
                    onError={this.handleOnError}
                />
                <Dropdown style={{'float':'right'}}>
                    <Dropdown.Toggle style={{'width':'100px'}} variant="outline-primary" id="dropdown-basic" size="sm">
                        File
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item key={1} onClick={this.handleImportOffer}>+ Source</Dropdown.Item>
                        <Dropdown.Item key={2} onClick={this.handleExport}>Export</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
                
                
                <div style={{'overflowY':'scroll','height':'70px','width':'300px','display':'block','position':'relative','float':'right'}}>
                    {sources}
                </div>

            </div>
        )
    }
}

export default Ribbon;
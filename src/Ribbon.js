import React, { Component } from "react";
import {CSVReader} from "react-papaparse";
import Source from "./Source";

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

        source.filename = this.fileInput.current.files[0].name;
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
        state.boards.push({});
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
        // similar to Excel or Word ribbon (top part)

        var state = this.state

        var sources = this.state.sources.map((source,i)=>{console.log(source);return <Source key={i} state={source}/>})
        return (
            <div style={{'width':'calc(100vw - 40px)','height':'7vh','padding':'20px','border-color':'red'}}>
                {this.state.name}
                <CSVReader
                    onFileLoaded={this.handleReadCSV}
                    inputRef={this.fileInput}
                    style={{ display: "none" }}
                    onError={this.handleOnError}
                />
                <button style={{'float':'right'}} onClick={this.handleImportOffer}>+ Source</button>
                <button style={{'float':'right'}} onClick={this.handleAddBoard}>+ Board</button>
                <button style={{'float':'right'}} onClick={this.handleExport}>Export</button>
                
                <div style={{'overflow-y':'scroll','height':'70px','width':'300px'}}>
                    {sources}
                </div>

            </div>
        )
    }
}

export default Ribbon;
import React, {Component} from "react";
import {CSVReader} from "react-papaparse";

class Source extends Component {

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            filename : null,
            data:null,
            features:[]
        }
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
        state.filename = this.fileInput.current.files[0].name;
        state.data = data;
        state.features = raw_data[0];
        this.setState(state);
    };
    
    handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    };
    
    handleImportOffer = () => {
        const file = this.fileInput.current.click();  
    };
    

    render() {
        // display dragable features
        if (this.state.filename==null) {
            return (
                <div>
                    <CSVReader
                        onFileLoaded={this.handleReadCSV}
                        inputRef={this.fileInput}
                        style={{ display: "none" }}
                        onError={this.handleOnError}
                    />
                    <button onClick={this.handleImportOffer}>+</button>
                </div>
            )
        } else {
            const a = this.state.features.map((data)=>{return <li>{data}</li>});
            return (
                a
            )
        }
        
    }
}

export default Source;
import React, {Component} from "react";
import ReactMarkdown from "react-markdown/with-html";
// import {Tabs, DragTabList, DragTab, PanelList, Panel, Tab} from 'react-tabtab';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/github';
import * as customStyle from "react-tabtab/lib/themes/bootstrap";

class MDHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        if (this.state.content == null) {
            this.state.content = '';
            this.state.activeIndex = 0;
        }
        
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange = index => {
        console.log(this.props);
        let state = this.state;
        state.activeIndex = index;
        console.log('tab change '+index)
        this.setState(state);
    };

    onChange = (value) =>{
        console.log(this);
        let state = this.state;
        state.content = value;
        console.log('messagfe '+this.state.content)
        this.setState(state);
    };

    render() {
        var state = this.state
        var Remarkable = require('remarkable');
// Actual default values
var md = new Remarkable();
console.log(this.state)

        var show =  md.render(this.state.content);

        return (
            <div style={{'margin':10}}>
            <Tabs 
                    activeIndex={this.state.activeIndex}
                    onTabChange={this.handleTabChange}
                    customStyle={customStyle}
                    onTabEdit={this.handleEdit}
                >
                <TabList>
                
                  <Tab>Markdown</Tab>
                  <Tab>Raw</Tab>
                </TabList>
                      <TabPanel>
                      <div dangerouslySetInnerHTML={{__html:show}} />
                      </TabPanel>
                      <TabPanel>
                      <AceEditor style={{'width':'100%','height':'300px'}}
  placeholder="Write your markdown here!"
  mode="markdown"
  theme="github"
  name="blah2"
  onChange={this.onChange}
  fontSize={14}
  showPrintMargin={true}
  showGutter={true}
  highlightActiveLine={true}
  value={this.state.content}
editorProps={{
    $blockScrolling: Infinity
  }}
  setOptions={{
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: false,
  showLineNumbers: true,
  tabSize: 2,
  }}/>
                      </TabPanel>

                </Tabs>
                </div>
            
        )
    }
}

export default MDHandler;
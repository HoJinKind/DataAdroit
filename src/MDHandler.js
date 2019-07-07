import React, {Component} from "react";
import ReactMarkdown from "react-markdown/with-html";
import {Tabs, DragTabList, DragTab, PanelList, Panel, Tab} from 'react-tabtab';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/github';
import * as customStyle from "react-tabtab/lib/themes/bootstrap";

class MDHandler extends Component {
    constructor(props) {
        super(props);
        console.log('this is from James')
        this.state = props.state;
        if (this.state.content == null) {
            console.log('in')
            this.state.content = 'aa';
            this.state.activeIndex = 0;
        }
        console.log(props.state)
        console.log(this.state)
        
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
            <Tabs 
                    activeIndex={this.state.activeIndex}
                    onTabChange={this.handleTabChange}
                    customStyle={customStyle}
                    onTabEdit={this.handleEdit}
                >
                <DragTabList>
                
                  <Tab>Markdown</Tab>
                  <Tab>Raw</Tab>
                </DragTabList>
                    <PanelList>
                      <Panel>
                      <div dangerouslySetInnerHTML={{__html:show}} />
                      </Panel>
                      <Panel>
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
                      </Panel>
                    </PanelList>

                </Tabs>
            
        )
    }
}

export default MDHandler;
import React, {Component} from "react"
import Ribbon from "./Ribbon"
import Board from "./Board"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Exploratory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Exploratory',
            tabIndex:0,
            boards: [{}],
            sources: []
        }
    }

    handleAddBoard = (state) => {
        this.setState(state);
    }

    render() {
        console.log(this.state)
        var idx = this.state.boards.map((board)=>{
            if (board.name) {
                return 1;
            } else {
                return 0;
            }
        }).reduce((a,b)=>a+b);
        var tabLists = this.state.boards.map((board,i)=>(<Tab key={i}>{board.name || 'Board '+ (i-idx +1)}</Tab>))
        var tabPanels = this.state.boards.map((board,i)=>(<TabPanel key={i}><Board state={board}/></TabPanel>))
        return (
           
            <div className="Exploratory">
                <Ribbon state={this.state} onAddBoard={this.handleAddBoard}/>
                <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                    <TabList>
                        {tabLists}
                    </TabList>
                    {tabPanels}
                </Tabs>
            </div>
            
        )
    }
}

export default Exploratory;




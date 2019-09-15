import React, { Component } from "react";
import ReactWordcloud from "react-wordcloud";
import Loader from "./Loader";

const negOptions = {
    colors: ["#FF0000"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [20, 70],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1.5,
    rotations: 3,
    rotationAngles: [90, 0],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };
  
  const posOptions = {
    colors: ["#008000"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [20, 100],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1.5,
    rotations: 3,
    rotationAngles: [90, 0],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };

class Cloud extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:true,
        pos:[],
        neg:[]
      }
    }
  
    parse() {
      // console.log(this.props.posList)
      var posDict = {};
      (this.props.posList || []).forEach(word => {
        if (word in posDict) {
          posDict[word] += 1
        } else {
          posDict[word] = 1
        }
      });
      var pos = (Object.keys(posDict) || []).map((word)=> {
        return {'text':word,'value':posDict[word]};
      })

  
      var negDict = {};
      (this.props.negList || []).forEach(word => {
        if (word in negDict) {
          negDict[word] += 1
        } else {
          negDict[word] = 1
        }
      })
      var neg = (Object.keys(negDict) || []).map((word)=> {
        return {'text':word,'value':negDict[word]}
      })
      // this.setState({
      //   loading:false,
      //   pos:pos,
      //   neg:neg
      // })
      return (
        <div>
            <ReactWordcloud options={posOptions} words={pos}/>
            <ReactWordcloud options={negOptions} words={neg}/>
        </div>
        
      )
    }
  
    render() {
        return (
          <div>
            {this.parse()}
          </div>
        )
      // return (
      //   <div>
      //     {this.state.loading?<Loader/>:null}
      //     <ReactWordcloud options={posOptions} words={this.state.pos}/>
      //     <ReactWordcloud options={negOptions} words={this.state.neg}/>
            
      //   </div>
        
      // )
    }
}

export default Cloud;
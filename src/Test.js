import React, {Component} from "react";

class Children extends Component {
    constructor(props) {
        super(props);
        this.state = {'title':props.title};
        this.clicked = this.clicked.bind(this)
    }

    clicked() {
        let state = {}
        if (this.state.title=='a') {
            state['title'] = 'b';
        } else {
            state['title'] = 'a';
        }
        this.setState(state);
    }

    render() {
        return (
            <button onClick={this.clicked}>{this.state.title}</button>
        )
    }
}

function increment(state,props) {
    return {
        value: 1,
    }
}

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state= {
            'value':0,
        }
    }

    handleIncrement = () => {
        this.setState(increment);
    }

    render() {
        return (
            <div>
                <h1>{this.state.value}</h1>
                <button onclick={this.handleIncrement}>+</button>
            </div>
        )
    }
}



class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {'value':10}
    }

    clicked() {
        this.setState({'feel':'angry','child':'a'})
    }

    render() {
        return (
            <Counter step={1}/>
        )
        
    }

}

export default Test;
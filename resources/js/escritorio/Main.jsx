import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//holds reservation state
export default class Main extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        
        return (
            <div className="container">
                <div className="row">
                    culo
                </div>
            </div>
        );
    }
}

if (document.getElementById('escritorio-container')) {
    ReactDOM.render(<Main />, document.getElementById('escritorio-container'));
}

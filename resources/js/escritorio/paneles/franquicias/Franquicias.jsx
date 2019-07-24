import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Franquicias extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps) {
        return this.props.panel || nextProps.panel;
    }

    render() {
        return (
            <div className={this.props.panel ? "container" : "hidden"}>
                Franquicias
            </div>
        );
    }
}

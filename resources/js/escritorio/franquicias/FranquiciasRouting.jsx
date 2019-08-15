/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class FranquiciasRouting extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps) {
        return this.props.panel || nextProps.panel;
    }

    componentDidMount() {
        console.log('franquiciasMount');
    }

    componentWillUnmount() {
        console.log('franquiciasUnmount');
    }
    
    render() {
        return (
            <div className={this.props.panel ? "container" : "hidden"}>
                Franquicias
            </div>
        );
    }
}

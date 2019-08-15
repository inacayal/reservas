/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class EscritorioRouting extends Component {
    constructor(props){ 
        super(props);
    }

    componentDidMount() {
        console.log('escritorioMount');
    }

    componentWillUnmount() {
        console.log('escritorioUnmount');
    }

    render () {
        return (
            <div className="container">
                Escritorio
            </div>
        );
    }
}

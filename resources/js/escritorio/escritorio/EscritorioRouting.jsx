/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * form sub elements
 */
import Escritorio from './sub/Escritorio';
import {Route} from 'react-router-dom';

export default class EscritorioRouting extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log('configuracionMount');
    }

    componentWillUnmount(){
        console.log('configuracionUnmount');
    }

    render() {
        return (
            <>
                <Route
                    path={this.props.match.url}
                    exact
                    component={
                        (match) =>
                            <Escritorio
                                {...match} />
                    } />
            </>
        );
    }
}

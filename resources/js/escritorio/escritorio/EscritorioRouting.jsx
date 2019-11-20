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

export default function EscritorioRouting (props) {
    return (
        <>
            <Route
                path={props.match.url}
                exact
                render={
                    (match) =>
                        <Escritorio data={props.data} {...match} />
                } />
        </>
    );
}

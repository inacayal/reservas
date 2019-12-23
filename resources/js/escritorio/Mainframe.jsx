/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router'
import BarraNavegacion from '../componentes/control/BarraNavegacion';
import {BrowserRouter as Router} from 'react-router-dom';
//Routring
import AppRouting from './AppRouting';
import DataHandler from '../hocs/DataHandler';
import Profile from '../componentes/control/Profile';
import {handlers} from '../handlers/index';

function Mainframe (props) {
    return (
        <>
            <div className="dark-border-bottom dark-background full-width" style={{position:"absolute",height:'40%'}}>
            </div>
            <div className="container-fluid full-width full-height" style={{position:'absolute',padding:"25px"}}>
                <div className="row" style={{height:'5%'}}>
                    <BarraNavegacion />
                </div>
                <div className="row round-border" style={{height:'95%',overflow:'hidden'}}>
                    <DataHandler>
                        <AppRouting/>
                    </DataHandler>
                    <div className="col-md-2 hidden-sm white-background">
                        <Profile {...props}/>
                    </div>
                </div>
            </div>
        </>

    )
}

if (document.getElementById('escritorio-container')) {
    ReactDOM.render(
    <Router basename="/escritorio">
        <Mainframe/>
    </Router>
    , document.getElementById('escritorio-container'));
}
/*
sidebarElem={props.current}
route={match}
location={location.pathname}
handler={handler}
history={props.history}
global={props.match}
*/

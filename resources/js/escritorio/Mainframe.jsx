/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BarraNavegacion from '../componentes/control/BarraNavegacion';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRouting from './AppRouting';
import MessageHandler from '../hocs/MessageHandler';
import Profile from '../componentes/control/Profile';
import DataHandler from '../hocs/DataHandler';
import {withRouter} from 'react-router-dom'

const Mainframe =  withRouter(
    (props)  => {
        return (
            <MessageHandler {...props}>
                <div className="dark-border-bottom dark-background full-width" style={{position:"absolute",height:'40%'}}>
                </div>
                <div className="container-fluid full-width full-height" style={{position:'absolute',padding:"25px"}}>
                    <div className="row" style={{height:'5%'}}>
                        <BarraNavegacion />
                    </div>
                    <div className="row round-border" style={{height:'95%',overflow:'hidden'}}>
                        <DataHandler {...props}>
                            <AppRouting/>
                        </DataHandler>
                        <div className="col-md-2 hidden-sm white-background">
                            <Profile {...props}/>
                        </div>
                    </div>
                </div>
            </MessageHandler>
        )
    }
)

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

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
                <div className="container-fluid">
                    <div className="dark-background row fixed-top" style={{height:"7vh"}}>
                        <BarraNavegacion />
                    </div>
                    <div className="row" style={{marginTop:"7vh"}}>
                        <DataHandler {...props}>
                            <AppRouting/>
                        </DataHandler>
                        <div className="col-md-1 hidden-sm white-background d-none d-md-block">
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

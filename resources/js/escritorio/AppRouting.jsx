/**
 * react basic
 */
import React, { Component, createContext } from 'react';
import ReactDOM from 'react-dom';
/**
 * navigation
 */
import MainFrame from '../hocs/MainFrame';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BarraNavegacion from '../componentes/control/BarraNavegacion';
import Profile from '../componentes/control/Profile'
/**
 * paneles
 */
import ConfiguracionRouting from './configuracion/ConfiguracionRouting';
import EscritorioRouting from './escritorio/EscritorioRouting';
import EventosRouting from './eventos/EventosRouting';
import HorariosRouting from './horarios/HorariosRouting';
import LocalesRouting from './locales/LocalesRouting';

import {
    handlers as reservasHandlers,
    ReservasRouting
} from './reservas/ReservasRouting';

import {
    handlers as ubicacionesHandlers,
    UbicacionesRouting
} from './ubicaciones/UbicacionesRouting';

import FranquiciasRouting from './franquicias/FranquiciasRouting';
import PromocionesRouting from './promociones/PromocionesRouting';

export default function AppRouting (props) {
    return (
        <div className="container-fluid no-margin" style={{overflow:"hidden"}}>
            <div className="row mh-30 dark-border-bottom dark-background" style={{height:'15vh'}}>
                <BarraNavegacion />
            </div>
            <div className="row mh-70" style={{height:'85vh'}}>
                <div className="col-md-10">
                    <Switch>
                        <Route
                            path='/'
                            exact
                            component={
                                (match) =>
                                    <MainFrame current = {'0'} >
                                        <EscritorioRouting {...match} />
                                    </MainFrame>
                            }/>
                        <Route
                            path='/reservas'
                            component={
                                (match) =>
                                    <MainFrame current={'1'} handlers={reservasHandlers}>
                                        <ReservasRouting {...match} />
                                    </MainFrame>
                            } />
                        <Route
                            path='/horarios'
                            component={
                                (match) =>
                                    <MainFrame current={'2'}>
                                        <HorariosRouting {...match} />
                                    </MainFrame>
                                }
                            />
                        <Route
                            path='/ubicaciones'
                            render={
                                (match) =>
                                    <MainFrame
                                        current = {'3'}
                                        handlers={ubicacionesHandlers}>
                                        <UbicacionesRouting {...match} />
                                    </MainFrame>
                            } />
                        <Route
                            path='/eventos'
                            component={
                                (match) =>
                                    <MainFrame current={'4'}>
                                        <EventosRouting {...match} />
                                    </MainFrame>
                            } />
                        <Route
                            path='/promociones'
                            component={
                                (match) =>
                                    <MainFrame current={'5'}>
                                        <PromocionesRouting {...match} />
                                    </MainFrame>
                            } />
                        <Route
                            path='/locales'
                            component={
                                (match) =>
                                    <MainFrame current={'6'}>
                                        <LocalesRouting {...match} />
                                    </MainFrame>
                            } />
                        <Route
                            path='/configuracion'
                            component={
                                (match) =>
                                    <MainFrame current={'7'}>
                                        <ConfiguracionRouting {...match} />
                                    </MainFrame>
                            } />
                        <Route
                            path='/franquicias'
                            component={
                                (match) =>
                                    <MainFrame current={'8'}>
                                        <FranquiciasRouting {...match}/>
                                    </MainFrame>
                            } />
                    </Switch>
                </div>
                <div className="col-md-2 hidden-s background-border">
                    <Profile />
                </div>
            </div>
        </div>
    )
}

if (document.getElementById('escritorio-container')) {
    ReactDOM.render(
    <Router basename="/escritorio">
        <AppRouting />
    </Router>
    , document.getElementById('escritorio-container'));
}

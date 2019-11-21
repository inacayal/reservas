/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainFrame from '../hocs/MainFrame';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BarraNavegacion from '../componentes/control/BarraNavegacion';
//Routring
import PromocionesRouting from './promociones/PromocionesRouting';
import LocalesRouting from './locales/LocalesRouting';
import ReservasRouting from './reservas/ReservasRouting';
import UbicacionesRouting from './ubicaciones/UbicacionesRouting';
import FranquiciasRouting from './franquicias/FranquiciasRouting';
import EventosRouting from './eventos/EventosRouting';
import HorariosRouting from './horarios/HorariosRouting';
import FeriadosRouting from './horarios/FeriadosRouting';
import ConfiguracionRouting from './configuracion/ConfiguracionRouting';
import EscritorioRouting from './escritorio/EscritorioRouting';

import {handlers} from '../handlers/index';

export default function AppRouting (props) {
    return (
        <>
            <div className="dark-border-bottom dark-background full-width" style={{position:"absolute",height:'40%'}}>
            </div>
            <div className="container-fluid full-width full-height" style={{position:'absolute',padding:"25px"}}>
                <div className="row" style={{height:'5%'}}>
                    <BarraNavegacion />
                </div>
                <Switch>
                    <Route
                        path='/'
                        exact
                        render={
                            (match) =>
                                <MainFrame
                                    handlers = {handlers.escritorio}
                                    current = {'0'} {...match}>
                                    <EscritorioRouting {...match}/>
                                </MainFrame>
                        }/>
                    <Route
                        path='/reservas'
                        component={
                            (match) =>
                                <MainFrame
                                    current={'1'}
                                    handlers={handlers.reservas} {...match}>
                                    <ReservasRouting {...match} />
                                </MainFrame>
                        } />
                    <Route
                        path='/horarios/feriados'
                        render={
                            (match) =>(
                                <MainFrame
                                    current={'2'}
                                    handlers={handlers['horarios/feriados']}{...match}>
                                    <FeriadosRouting {...match}/>
                                </MainFrame>
                            )
                        }/>
                    <Route
                        path='/horarios'
                        component={
                            (match) => (
                                <MainFrame
                                    current={'2'}
                                    handlers={handlers.horarios}{...match}>
                                    <HorariosRouting {...match} />
                                </MainFrame>
                            )
                        }/>
                    <Route
                        path='/ubicaciones'
                        render={
                            (match) =>
                                <MainFrame
                                    current = {'3'}
                                    handlers={handlers.ubicaciones}{...match}>
                                    <UbicacionesRouting {...match} />
                                </MainFrame>
                        } />
                    <Route
                        path='/eventos'
                        withRouter
                        component={
                            (match) =>
                                <MainFrame
                                    current={'4'}
                                    handlers={handlers.eventos}{...match}>
                                    <EventosRouting {...match}/>
                                </MainFrame>
                        } />
                    <Route
                        path='/promociones'
                        component={
                            (match) =>
                                <MainFrame
                                    current={'5'}
                                    handlers={handlers.promociones}{...match}>
                                    <PromocionesRouting {...match} />
                                </MainFrame>
                        } />
                    <Route
                        path='/locales'
                        component={
                            (match) =>
                                <MainFrame
                                    current={'6'}
                                    handlers={handlers.locales}{...match}>
                                    <LocalesRouting {...match} />
                                </MainFrame>
                        } />
                    <Route
                        path='/configuracion'
                        render={
                            (match) =>
                                <MainFrame
                                    handlers={handlers.configuracion}
                                    current={'7'}{...match}>
                                    <ConfiguracionRouting {...match} />
                                </MainFrame>
                        } />
                    <Route
                        path='/franquicias'
                        render={
                            (match) =>
                                <MainFrame
                                    current={'8'}
                                    handlers={handlers.franquicias}{...match}>
                                    <FranquiciasRouting {...match}/>
                                </MainFrame>
                            }/>
                </Switch>
            </div>
        </>

    )
}

if (document.getElementById('escritorio-container')) {
    ReactDOM.render(
    <Router basename="/escritorio">
        <AppRouting />
    </Router>
    , document.getElementById('escritorio-container'));
}

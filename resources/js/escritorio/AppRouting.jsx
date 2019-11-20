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
            <div className="container-fluid full-width" style={{position:'absolute',height:"100vh",padding:"25px"}}>
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
                                    current = {'0'} >
                                    <EscritorioRouting {...match} />
                                </MainFrame>
                        }/>
                    <Route
                        path='/reservas'
                        component={
                            (match) =>
                                <MainFrame
                                    current={'1'}
                                    handlers={handlers.reservas}>
                                    <ReservasRouting {...match} />
                                </MainFrame>
                        } />
                    <Route
                        path='/horarios/feriados'
                        render={
                            (match) =>(
                                <MainFrame
                                    current={'2'}
                                    handlers={handlers.feriados}>
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
                                    handlers={handlers.horarios}>
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
                                    handlers={handlers.ubicaciones}>
                                    <UbicacionesRouting {...match} />
                                </MainFrame>
                        } />
                    <Route
                        path='/eventos'
                        component={
                            (match) =>
                                <MainFrame
                                    current={'4'}
                                    handlers={handlers.eventos}>
                                    <EventosRouting {...match} />
                                </MainFrame>
                        } />
                    <Route
                        path='/promociones'
                        component={
                            (match) =>
                                <MainFrame
                                    current={'5'}
                                    handlers={handlers.promociones}>
                                    <PromocionesRouting {...match} />
                                </MainFrame>
                        } />
                    <Route
                        path='/locales'
                        component={
                            (match) =>
                                <MainFrame
                                    current={'6'}
                                    handlers={handlers.locales}>
                                    <LocalesRouting {...match} />
                                </MainFrame>
                        } />
                    <Route
                        path='/configuracion'
                        render={
                            (match) =>
                                <MainFrame
                                    handlers={handlers.configuracion}
                                    current={'7'}>
                                    <ConfiguracionRouting {...match} />
                                </MainFrame>
                        } />
                    <Route
                        path='/franquicias'
                        render={
                            (match) =>
                                <MainFrame
                                    current={'8'}
                                    handlers={handlers.franquicias}>
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

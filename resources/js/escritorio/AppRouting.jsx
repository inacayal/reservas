/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MessageHandler from '../hocs/MessageHandler';
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
                    <Route  path='/'
                            exact
                            render={
                                (match) =>
                                    <MessageHandler  handlers = {handlers.escritorio.list}
                                                current = {'0'}
                                                {...match}>
                                        <EscritorioRouting  handlers={handlers.escritorio.form}/>
                                    </MessageHandler>
                            }/>
                    <Route  path='/reservas'
                            render={
                                (match) =>
                                    <MessageHandler  current={'1'}
                                                handlers={handlers.reservas.list}
                                                {...match}>
                                        <ReservasRouting handlers = {handlers.reservas.form}
                                                         {...match}/>
                                    </MessageHandler>
                            } />
                    <Route  path='/horarios/feriados'
                            render={
                                (match) =>(
                                    <MessageHandler  current={'2'}
                                                handlers={handlers['horarios/feriados'].list}
                                                {...match}>
                                        <FeriadosRouting handlers = {handlers['horarios/feriados'].form}
                                                         {...match}/>
                                    </MessageHandler>
                                )
                            }/>
                    <Route  path='/horarios'
                            render={
                                (match) => (
                                    <MessageHandler  current={'2'}
                                                handlers={handlers.horarios.list}{...match}>
                                        <HorariosRouting handlers = {handlers.horarios.form}
                                                         {...match}/>
                                    </MessageHandler>
                                )
                            }/>
                    <Route  path='/ubicaciones'
                            render={
                                (match) =>
                                    <MessageHandler  current = {'3'}
                                                handlers={handlers.ubicaciones.list}{...match}>
                                        <UbicacionesRouting  handlers = {handlers.ubicaciones.form}
                                                             {...match}/>
                                    </MessageHandler>
                            } />
                    <Route  path='/eventos'
                            render={
                                (match) =>
                                    <MessageHandler  current={'4'}
                                                handlers={handlers.eventos.list}
                                                {...match}>
                                        <EventosRouting handlers = {handlers.eventos.form}/>
                                    </MessageHandler>
                            } />
                    <Route  path='/promociones'
                            render={
                                (match) =>
                                    <MessageHandler  current={'5'}
                                                handlers={handlers.promociones.list}{...match}>
                                        <PromocionesRouting handlers = {handlers.promociones.form}
                                                            {...match} />
                                    </MessageHandler>
                            } />
                    <Route  path='/locales'
                            component={
                                (match) =>
                                    <MessageHandler  current={'6'}
                                                handlers={handlers.locales.list}{...match}>
                                        <LocalesRouting handlers = {handlers.locales.form}
                                                        {...match} />
                                    </MessageHandler>
                            } />
                    <Route  path='/configuracion'
                            render={
                                (match) =>
                                    <MessageHandler  handlers={handlers.configuracion.list}
                                                current={'7'}{...match}>
                                        <ConfiguracionRouting   handlers = {handlers.configuracion.form}
                                                                {...match} />
                                    </MessageHandler>
                            } />
                    <Route  path='/franquicias'
                            render={
                                (match) =>
                                    <MessageHandler  current={'8'}
                                                handlers={handlers.franquicias.list}{...match}>
                                        <FranquiciasRouting handlers = {handlers.franquicias.form}
                                                            {...match} />
                                    </MessageHandler>
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

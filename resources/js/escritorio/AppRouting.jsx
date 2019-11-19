/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * navigation
 */
import MainFrame from '../hocs/MainFrame';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BarraNavegacion from '../componentes/control/BarraNavegacion';
import Profile from '../componentes/control/Profile'

import {PromocionesRouting} from './promociones/PromocionesRouting';
import {handlers as promocionesHandlers} from '../handlers/promocionesHandlers';

import {LocalesRouting} from './locales/LocalesRouting';
import {handlers as localesHandlers} from '../handlers/localesHandlers';

import {ReservasRouting} from './reservas/ReservasRouting';
import {handlers as reservasHandlers} from '../handlers/reservasHandlers';

import {handlers as ubicacionesHandlers} from '../handlers/ubicacionesHandlers';
import {UbicacionesRouting} from './ubicaciones/UbicacionesRouting';

import {handlers as franquiciasHandlers} from '../handlers/franquiciasHandlers';
import {FranquiciasRouting} from './franquicias/FranquiciasRouting';

import {handlers as eventosHandlers} from '../handlers/eventosHandlers';
import {EventosRouting} from './eventos/EventosRouting';

import {HorariosRouting} from './horarios/HorariosRouting';
import {handlers as horariosHandlers} from '../handlers/horariosHandlers';

import {FeriadosRouting} from './horarios/FeriadosRouting';
import {handlers as feriadosHandlers} from '../handlers/feriadosHandlers';

import ConfiguracionRouting from './configuracion/ConfiguracionRouting';

import EscritorioRouting from './escritorio/EscritorioRouting';





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
                                    <MainFrame
                                        current={'1'}
                                        handlers={reservasHandlers}>
                                        <ReservasRouting {...match} />
                                    </MainFrame>
                            } />
                        <Route
                            path='/horarios/feriados'
                            render={
                                (match) =>(
                                    <MainFrame
                                        current={'2'}
                                        handlers={feriadosHandlers}>
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
                                        handlers={horariosHandlers}>
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
                                        handlers={ubicacionesHandlers}>
                                        <UbicacionesRouting {...match} />
                                    </MainFrame>
                            } />
                        <Route
                            path='/eventos'
                            component={
                                (match) =>
                                    <MainFrame
                                        current={'4'}
                                        handlers={eventosHandlers}>
                                        <EventosRouting {...match} />
                                    </MainFrame>
                            } />
                        <Route
                            path='/promociones'
                            component={
                                (match) =>
                                    <MainFrame
                                        current={'5'}
                                        handlers={promocionesHandlers}>
                                        <PromocionesRouting {...match} />
                                    </MainFrame>
                            } />
                        <Route
                            path='/locales'
                            component={
                                (match) =>
                                    <MainFrame
                                        current={'6'}
                                        handlers={localesHandlers}>
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
                            render={
                                (match) =>
                                    <MainFrame
                                        current={'8'}
                                        handlers={franquiciasHandlers}>
                                        <FranquiciasRouting {...match}/>
                                    </MainFrame>
                                }/>
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

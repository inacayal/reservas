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
import ReservasRouting from './reservas/ReservasRouting';
import UbicacionesRouting from './ubicaciones/UbicacionesRouting';
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
                                    <MainFrame
                                        render={(props) => (
                                            <EscritorioRouting {...props} />
                                        )}
                                        current={'0'}
                                        {...match}/>
                            }/>
                        <Route
                            path='/reservas'
                            component={
                                (match) =>
                                    <MainFrame
                                        render={(props)=>(
                                            <ReservasRouting {...props} />
                                        )}
                                        current={'1'}
                                        {...match}/>
                            } />
                        <Route
                            path='/horarios'
                            component={
                                (match) =>
                                    <MainFrame
                                        render={(props) => (
                                            <HorariosRouting {...props} />
                                        )}
                                        current={'2'}
                                        {...match}/>
                                }
                            />
                        <Route
                            path='/ubicaciones'
                            component={
                                (match) =>
                                    <MainFrame
                                        render={(props) => (
                                            <UbicacionesRouting {...props} />
                                        )}
                                        current={'3'}
                                        {...match}/>
                            } />
                        <Route
                            path='/eventos'
                            component={
                                (match) =>
                                    <MainFrame
                                        render={(props) => (
                                            <EventosRouting {...props} />
                                        )}
                                        current={'4'}
                                        {...match}/>
                            } />
                        <Route
                            path='/promociones'
                            component={
                                (match) =>
                                    <MainFrame
                                        render={(props) => (
                                            <PromocionesRouting {...props} />
                                        )}
                                        current={'5'}
                                        {...match} />
                            } />
                        <Route
                            path='/locales'
                            component={
                                (match) =>
                                    <MainFrame
                                        render={(props) => (
                                            <LocalesRouting {...props} />
                                        )}
                                        current={'6'}
                                        {...match}/>
                            } />
                        <Route
                            path='/configuracion'
                            component={
                                (match) =>
                                    <MainFrame
                                        render={(props) => (
                                            <ConfiguracionRouting {...props} />
                                        )}
                                        current={'7'}
                                        {...match}/>
                            } />
                        <Route
                            path='/franquicias'
                            component={
                                (match) =>
                                    <MainFrame
                                        render={(props) => (
                                            <FranquiciasRouting {...props} />
                                        )}
                                        current={'8'}
                                        {...match}/>
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

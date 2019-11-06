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
//holds reservation state
export default function AppRouting (props) {
    return (
        <div className="container-fluid no-margin">
            <BarraNavegacion />
            <Switch>
                <Route
                    path='/'
                    exact
                    component={
                        (props) =>
                            <MainFrame
                                render={(props) => (
                                    <EscritorioRouting {...props} />
                                )}
                                current={'0'}
                                {...props}/>
                    }/>
                <Route
                    path='/reservas'
                    component={
                        (props) =>
                            <MainFrame
                                render={(props)=>(
                                    <ReservasRouting {...props} />
                                )}
                                current={'1'}
                                {...props}/>
                    } />
                <Route
                    path='/horarios'
                    component={
                        (props) =>
                            <MainFrame
                                render={(props) => (
                                    <HorariosRouting {...props} />
                                )}
                                current={'2'}
                                {...props}/>
                        }
                    />
                <Route
                    path='/ubicaciones'
                    component={
                        (props) =>
                            <MainFrame
                                render={(props) => (
                                    <UbicacionesRouting {...props} />
                                )}
                                current={'3'}
                                {...props}/>
                    } />
                <Route
                    path='/eventos'
                    component={
                        (props) =>
                            <MainFrame
                                render={(props) => (
                                    <EventosRouting {...props} />
                                )}
                                current={'4'}
                                {...props}/>
                    } />
                <Route
                    path='/promociones'
                    component={
                        (props) =>
                            <MainFrame
                                render={(props) => (
                                    <PromocionesRouting {...props} />
                                )}
                                current={'5'}
                                {...props} />
                    } />
                <Route
                    path='/locales'
                    component={
                        (props) =>
                            <MainFrame
                                render={(props) => (
                                    <LocalesRouting {...props} />
                                )}
                                current={'6'}
                                {...props}/>
                    } />
                <Route
                    path='/configuracion'
                    component={
                        (props) =>
                            <MainFrame
                                render={(props) => (
                                    <ConfiguracionRouting {...props} />
                                )}
                                current={'7'}
                                {...props}/>
                    } />
                <Route
                    path='/franquicias'
                    component={
                        (props) =>
                            <MainFrame
                                render={(props) => (
                                    <FranquiciasRouting {...props} />
                                )}
                                current={'8'}
                                {...props}/>
                    } />
            </Switch>
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

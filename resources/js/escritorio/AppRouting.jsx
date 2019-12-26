/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
import FeriadosRouting from './feriados/FeriadosRouting';
import ConfiguracionRouting from './configuracion/ConfiguracionRouting';
import EscritorioRouting from './escritorio/EscritorioRouting';

export default function AppRouting (props) {
    return (
        <Switch>
            <Route  path='/'
                    exact
                    render={
                        (match) => <EscritorioRouting   data={props.data} {...match}/>
                    }/>
            <Route  path='/reservas'
                    render={
                        (match) => <ReservasRouting data={props.data} {...match}/>
                    } />
            <Route  path='/feriados'
                    render={
                        (match) => <FeriadosRouting data={props.data} {...match}/>
                    }/>
            <Route  path='/horarios'
                    render={
                        (match) => <HorariosRouting data={props.data} {...match}/>
                    }/>
            <Route  path='/ubicaciones'
                    render={
                        (match) => <UbicacionesRouting  data={props.data} {...match}/>
                    } />
            <Route  path='/eventos'
                    render={
                        (match) => <EventosRouting data={props.data} {...match}/>

                    } />
            <Route  path='/promociones'
                    render={
                        (match) => <PromocionesRouting data={props.data} {...match} />
                    } />
            <Route  path='/locales'
                    component={
                        (match) => <LocalesRouting data={props.data} {...match} />
                    } />
            <Route  path='/configuracion'
                    render={
                        (match) => <ConfiguracionRouting data={props.data}{...match} />
                    } />
            <Route  path='/franquicias'
                    render={
                        (match) => <FranquiciasRouting data={props.data} {...match} />
                    }/>
        </Switch>
    )
}

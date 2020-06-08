/**
 * react basic
 */
import React, {
    Component
} from 'react';
import {
    Redirect,
    Switch,
    Route
} from 'react-router-dom';
import ReactDOM from 'react-dom';

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

import MessageHandler from '../app/hocs/MessageHandler';
import Profile from '../app/componentes/control/Profile';
import DataHandler from '../app/hocs/DataHandler';
import BarraNavegacion from '../app/componentes/control/BarraNavegacion';

function BaseRouting (props) {
    return (
        <Switch>
            <Route path=""
                exact
                render={
                    (match) =>
                        <EscritorioRouting data={props.data}
                            {...match}/>
                }/>
            <Route path="reservas"
                render={
                    (match) =>
                        <ReservasRouting data={props.data}
                            {...match}/>
                } />
            <Route path="feriados"
                render={
                    (match) =>
                        <FeriadosRouting data={props.data}
                            {...match}/>
                }/>
            <Route path="horarios"
                render={
                    (match) =>
                        <HorariosRouting data={props.data}
                            {...match}/>
                }/>
            <Route path="ubicaciones"
                render={
                    (match) =>
                        <UbicacionesRouting data={props.data}
                            {...match}/>
                } />
            <Route path="eventos"
                render={
                    (match) =>
                        <EventosRouting data={props.data}
                            {...match}/>

                    } />
            <Route path="promociones"
                render={
                    (match) =>
                        <PromocionesRouting data={props.data}
                            {...match} />
                } />
            <Route path="locales"
                component={
                    (match) =>
                        <LocalesRouting data={props.data}
                            {...match} />
                } />
            <Route path="configuracion"
                render={
                    (match) =>
                        <ConfiguracionRouting data={props.data}
                            {...match} />
                } />
            <Route path="franquicias"
                render={
                    (match) =>
                        <FranquiciasRouting data={props.data}
                        {...match} />
                }/>
        </Switch>
    )
}


export default function Escritorio (props){
    return (
        props.auth
        ?
            <MessageHandler {...props}>
                <div className="container-fluid">
                    <div className="dark-background row" style={{height:"100%"}}>
                        <BarraNavegacion user={props.user}/>
                    </div>
                    <div className="row">
                        <DataHandler user={props.user}
                            {...props}>
                            <BaseRouting/>
                        </DataHandler>
                    </div>
                </div>
            </MessageHandler>
        :
            <Redirect to="/login"/>
    )
}

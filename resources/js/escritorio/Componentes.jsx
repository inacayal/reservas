/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

const COMPONENTES = {
    escritorio:(props) => (
        <EscritorioRouting {...props} />
    ),
    reservas:(props) => (
        <ReservasRouting {...props} />
    ),
    horarios:(props) => (
        <HorariosRouting {...props}/>
    ),
    ubicaciones:(props) => (
        <UbicacionesRouting {...props} />
    ),
    eventos:(props) => (
        <EventosRouting {...props} />
    ),
    locales:(props) => (
        <LocalesRouting {...props} />
    ),
    configuracion:(props) => (
        <ConfiguracionRouting {...props} />
    ),
    franquicias:(props) => (
        <FranquiciasRouting {...props} />
    )
};       
export default COMPONENTES;
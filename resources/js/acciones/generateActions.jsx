/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componmentes
 */
import Actions from '../componentes/basic/Actions';
/**
 * dictionaries
 */
import { ReservasActions } from './ReservasActions';
import { FeriadosActions } from './FeriadosActions';
import { HorariosActions } from './HorariosActions';
import { EventosActions } from './EventosActions';
import { UbicacionesActions } from './UbicacionesActions';

export const GenerateActions = {
    reservas: (
        data,
        actions,
        strDate,
        type,
        index
    ) => {
        const acciones = ReservasActions[type][index](
            actions,
            strDate,
            data
        );
        return (
            <Actions
                links={acciones.links}
                buttons={acciones.buttons} />
        );
    },
    feriados: (
        data,
        actions,
        key,
        type
    ) => {
        const index = data ? 'data' : 'no_data',
            acciones = FeriadosActions[type][index](
                key,
                actions
            );
        return (
            <Actions
                links={acciones.links}
                buttons={acciones.buttons} />
        );
    },
    horarios: (
        data,
        key,
        actions
    ) => {
        const index = data ? 'data' : 'no_data',
            acciones = HorariosActions[index](
                key,
                actions
            );
        return (
            <Actions 
                links={acciones.links}
                buttons={acciones.buttons}/>
        );
    },
    ubicaciones: (
        key,
        actions
    ) => {
        const acciones = UbicacionesActions(
            key,
            actions
        );
        return (
            <Actions
                links={acciones.links}
                buttons={acciones.buttons} />
        );
    },
    eventos: (
        key,
        actions
    ) => {
        const acciones = EventosActions(
            key,
            actions
        );
        return (
            <Actions
                links={acciones.links}
                buttons={acciones.buttons} />
        );
    }
};

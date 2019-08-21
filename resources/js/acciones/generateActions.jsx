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
  
import { ReservasActions } from './ReservasDictionary';
import { FeriadosActions } from './FeriadosDictionary';
import { HorariosActions } from './HorariosDictionary';

export const generateActions = {
    reservas: (
        data,
        actions,
        strDate,
        type
    ) => {
        const index = data ? 'data' : 'no_data',
            // reservasActions must be an object with data and no_data indexes
            acciones = ReservasActions[type][index](
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
    }
};

/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elements
 */
import Feriados from './sub/Feriados';
import HorarioSemana from './sub/HorarioSemana';
import { Route } from 'react-router-dom';

export function HorariosRouting ({match}) {
    return (
        <>
            <Route 
                path={match.url}
                exact
                component = {
                    () => <HorarioSemana />
                }/>
            <Route 
                path={match.url+'/feriados'}
                exact
                component = {
                    () => <Feriados/>
                }/>
        </>
    );
}
export default HorariosRouting;

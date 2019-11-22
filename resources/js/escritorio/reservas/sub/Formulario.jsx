/**
 * react basic
 */
import React, { Component,useContext } from 'react';
import ReactDOM from 'react-dom';
import EventoFrame from '../../../reserva/pasos/evento/EventoFrame';
import Titulo from '../../../componentes/basic/Titulo';
import {WaitsLoading} from '../../../hocs/RouterTransition';

export function Formulario (props) {
    const context = useContext(WaitsLoading),
        data = props.data;
    return (
        <>
            <Titulo
                title='Agregar Reservación'
                links={props.nav.links} />
            <form className="full-width">
                <div className="container">
                    <div className="row">
                        <EventoFrame
                            displayTitles={false}
                            current={true}
                            fecha={data.date}
                            fetch = {context}
                            data={data.data}
                            fields={props.fields}
                            change={props.change}
                            errors={props.errors}/>
                    </div>
                </div>
            </form>
        </>
    );
}

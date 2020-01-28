/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import Titulo from '../../../componentes/basic/Titulo';
import PromocionesTable from '../../../componentes/tables/PromocionesTable';
import {GenerateActions} from '../../../acciones/GenerateActions';
import {CommaList} from '../../../componentes/basic/CommaList';

const format = (
    promociones,
    actions
) => Object.values(promociones).map(
        e => {
            const   acciones = GenerateActions.promociones(e.id,actions),
                    eventos = Object.values(e.eventos.list);
            return {
                ...e,
                eventos:eventos.length>0
                    ? <CommaList list={e.eventos.list} route="eventos"/>
                    : <span>sin asignar</span>,
                acciones:acciones
            }
        }
    );

export default function Promociones (props) {
    const promociones = format(
        props.data,
        {eliminar: props.toggleModal}
    );
    return (
        <>
            <Titulo title="Promociones"
                    links={props.nav.links} />
            <div className="container">
                <div className="row">
                    <div className="m-font top-padding">
                    {`Mostrando ${promociones.length} promociones encontradas`}
                    </div>
                </div>
                <div className="row">
                    <PromocionesTable data={promociones} showEventos filter showActions/>
                </div>
            </div>
        </>
    );
}

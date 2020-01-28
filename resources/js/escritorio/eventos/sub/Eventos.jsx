/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Titulo from '../../../componentes/basic/Titulo';
import EventosTable from '../../../componentes/tables/EventosTable';
import {CommaList} from '../../../componentes/basic/CommaList';
import {GenerateActions} from '../../../acciones/GenerateActions';
import {assignHorarios} from '../../../utils/Helper';

const format = (eventos,actions) =>
    Object.values(eventos).map(
        e => {
            const promo = e.promociones.list,
                  horarios = e.horarios.list;
            return {
                ...e,
                promociones:Object.keys(promo).length>0
                    ? <CommaList list={promo} endpoint="/promociones"/>
                    : <span>Sin asignar</span>,
                horarios: Object.keys(horarios).length>0
                    ? <CommaList list={assignHorarios(horarios)[0]} endpoint="/horarios"/>
                    : <span>Sin asignar</span>,
                acciones:GenerateActions.eventos(
                    e.id,
                    actions
                )
            }
        });

function NoMemoEventos (props) {
    const eventos = format(
        props.data,
        {eliminar: props.toggleModal}
    );
    return (
        <>
            <Titulo title="Eventos"
                    links={props.nav.links} />
            <div className="container">
                <div className="m-font top-padding row">
                    {`Mostrando ${eventos.length} eventos encontrados`}
                </div>
                <div className="row">
                    <EventosTable data={eventos} showPromociones showHorarios showActions filter/>
                </div>
            </div>
        </>
    );
}
export default React.memo(NoMemoEventos);

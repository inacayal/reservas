/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';
import FranquiciasTable from '../../../componentes/tables/FranquiciasTable'

const links = (key) => [
    {
        title: (
            <div className="smaller-text text bold">
                <i className="fas fa-eye" />
                Ver
            </div>
        ),
        to: '/franquicias/' + key,
        params:{id:key}
    },
    {
        title: (
            <div className="smaller-text text bold">
                <i className="fas fa-pen" />
                Editar
            </div>
        ),
        to: '/franquicias/editar/' + key,
        params:{id:key}
    },
    ,
    {
        title:(
            <div className="smaller-text text bold">
                <i className="fas fa-plus-circle inline-box side-margin" /> Agregar Local
            </div>
        ),
        to:"/locales/agregar"
    }
];

export function Franquicias (props) {
    const data = Object.keys(props.data).map(
        e => ({
            ...props.data[e],
            acciones: <Actions links={links(e)} buttons={[]} />
        })
    );
    return (
        <>
            <Titulo
                title="Franquicias"
                links={props.nav.links} />
            <div className="container">
                <div className="row">
                    <FranquiciasTable data={data}/>
                </div>
            </div>
        </>
    );
}

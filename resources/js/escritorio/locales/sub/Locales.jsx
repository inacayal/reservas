import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import Titulo from '../../../componentes/basic/Titulo';
 import Actions from '../../../componentes/basic/Actions';
import { Navegacion } from '../../../acciones/ActionsByView';
import LocalesTable from '../../../componentes/tables/LocalesTable';

const links = (key) =>
    [
        {
            title: (
                <div className="smaller-text text bold">
                    <i className="fas fa-eye" />
                    Ver
                </div>
            ),
            to: `/locales/${key}`,
            params:{id:key},
            route:'locales'
        },
        {
            title: (
                <div className="smaller-text text bold">
                    <i className="fas fa-pen" />
                    Editar
                </div>
            ),
            to: `/locales/editar/${key}`,
            params:{id:key},
            route:'locales'
        }
    ];

export function Locales (props) {
    const data = Object.values(props.data).map(
            e => ({
                ...e,
                acciones: <Actions  links={links(e.id)} 
                                    buttons={[]}/>
            })
        );
    return (
        <>
            <Titulo title="Locales"
                    links={props.nav.links} />
            <div className="container">
                <div className="row">
                    <LocalesTable data={data}/>
                </div>
            </div>
        </>
    )
}

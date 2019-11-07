/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import {Link} from 'react-router-dom';

const map = {
    escritorio:   () => (
        <>
            <i className="fas fa-tachometer-alt inline-box side-margin" />
            <span className="text bold">Escritorio</span>
        </>
    ),
    reservas: () => (
        <>
            <i className="fas fa-book inline-box side-margin" />
            <span className="text bold">Reservaciones</span>
        </>
    ),
    horarios: () => (
        <>
            <i className="fas fa-calendar-week inline-box side-margin" />
            <span className="text bold">Horarios</span>
        </>
    ),
    ubicaciones: () => (
        <>
            <i className="fas fa-store-alt inline-box side-margin" />
            <span className="text bold">Ubicaciones</span>
        </>
    ),
    eventos: () => (
        <>
          <i className="fas fa-glass-cheers inline-box side-margin" />
          <span className="text bold">Eventos</span>
        </>
    ),
    configuracion: () => (
        <>
          <i className="fas fa-cog inline-box side-margin" />
          <span className="text bold">Configuración</span>
        </>
    ),
    franquicias: () => (
        <>
            <i className="fas fa-tag inline-box side-margin" />
            <span className="text bold">Franquicias</span>
        </>
    ),
    feriados: () => (
        <>
            <i className="fas fa-calendar-day inline-box side-margin" />
            <span className="text bold">Feriados</span>
        </>
    ),
    locales: () => (
        <>
            <i className="fas fa-store inline-box side-margin" />
            <span className="text bold">Locales</span>
        </>
    ),
    promociones: () => (
        <>
            <i className="fas fa-percentage inline-box side-margin" />
            <span className="text bold">Promociones</span>
        </>
    ),
    editar: () => (
      <>
          <i className="fas fa-pen inline-box side-margin" />
          <span className="text bold">Editar</span>
      </>
    ),
    agregar: () => (
        <>
            <i className="fas fa-plus-circle inline-box side-margin" />
            <span className="text bold">Agregar</span>
        </>
    ),
    usuario: () => (
        <>
            <i className="fas fa-user inline-box side-margin" />
            <span className="text bold">Usuario</span>
        </>
    ),
    establecimiento: () => (
        <>
            <i className="fas fa-store inline-box side-margin" />
            <span className="text bold">Establecimiento</span>
        </>
    )
};

function BreadCrumb(props) {
    let stored = '',
      display = null;
    return (
        <>
            <ul className="flex-row nav-list white-background full-width h-padding">
                {
                    props.items.map(
                        (e,i) => {
                            stored += e==='escritorio' ? '/' : e + '/';
                            display = map[e] ? map[e]():'';
                            return (
                                <li key={i} className="margin-box ">
                                    {
                                        i === props.items.length-1 || e === 'editar' || e === 'agregar'
                                        ?
                                            <div className="inline-block line-v-middle smaller-text margin-box">{display}</div>
                                        :
                                            <>
                                                <Link to={stored}>
                                                    <span className="bold decorate-blue-hover smaller-text text bold inline-block">
                                                        {display}
                                                    </span>
                                                </Link>
                                                <i className={
                                                    map[props.items[i+1]]
                                                    ?
                                                        "h-padding inline-block margin-box line-v-middle highlight middle-font fas fa-angle-right"
                                                    :
                                                        "hidden h-padding"
                                                }/>
                                            </>
                                    }
                                </li>
                            );
                        }
                    )
                }
            </ul>
        </>
    );
}
export default BreadCrumb;

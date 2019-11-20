/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import {Link} from 'react-router-dom';
import {waitCallback} from '../basic/Actions';

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
    editar: (nombre) => (
      <>
          <i className="fas fa-pen inline-box side-margin" />
          <span className="text bold">{"Editar "+nombre||''}</span>
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
    ),
    ver:(nombre) => (
        <>
            <i className="fas fa-eye inline-box side-margin" />
            <span className="text bold">{nombre}</span>
        </>
    )
};

export default class BreadCrumb extends Component {
    constructor(props){
        super(props)
    }

    shouldComponentUpdate(pp,ns){
        return pp.url !== this.props.url || pp.nombre !== this.props.nombre;
    }
    render (){
        let stored = '',
            display = null;
        const props = this.props;
        return (
            <>
                <ul className="flex-row top-padding nav-list white-background full-width h-padding">
                    {
                        props.items.map(
                            (e,i) => {
                                stored = e==='escritorio' ? '' : `${stored}/${e}`;
                                display = map[e] ? map[e](props.nombre): map.ver(props.nombre);

                                const clickCallback =  ((st) => {
                                    return (ev) =>
                                        waitCallback(ev,{to:`${st}`,params:{}},props.load)
                                })(stored);

                                if (props.items[i-1] === 'editar')
                                    display = '';

                                return (
                                    <li key={i} className="margin-box ">
                                        {
                                            i === props.items.length-1 || e === 'editar' || e === 'agregar'
                                            ?
                                                <div className="inline-block line-v-middle smaller-text margin-box">{display}</div>
                                            :
                                                <>
                                                    <Link
                                                        to={stored||'/'}
                                                        onClick={
                                                            e==='escritorio'|| (e==='horarios'&& props.items[i+1] === 'feriados')
                                                            ?
                                                                () => false
                                                            :
                                                                clickCallback
                                                        }>
                                                        <span className="bold decorate-blue-hover smaller-text text bold inline-block">
                                                            {display}
                                                        </span>
                                                    </Link>
                                                    <i className={"h-padding inline-block margin-box line-v-middle highlight middle-font fas fa-angle-right"}/>
                                                </>
                                        }
                                    </li>
                                );
                            }
                        )
                    }
                </ul>
            </>
        )
    };
}

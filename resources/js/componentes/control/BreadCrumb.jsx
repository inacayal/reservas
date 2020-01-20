/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CustomLink from '../basic/CustomLink';

const map = {
    escritorio:   () => (
        (weight) =>
            <>
                <i className="fas fa-tachometer-alt inline-box side-margin" />
                <span className={`text ${weight}`}>Escritorio</span>
            </>
    ),
    reservas: () => (
        (weight) =>
            <>
                <i className="fas fa-book inline-box side-margin" />
                <span className={`text ${weight}`}>Reservaciones</span>
            </>
    ),
    horarios: () => (
        (weight) =>
            <>
                <i className="fas fa-calendar-week inline-box side-margin" />
                <span className={`text ${weight}`}>Horarios</span>
            </>
    ),
    ubicaciones: () => (
        (weight) =>
            <>
                <i className="fas fa-store-alt inline-box side-margin" />
                <span className={`text ${weight}`}>Ubicaciones</span>
            </>
    ),
    eventos: () => (
        (weight) =>
            <>
              <i className="fas fa-glass-cheers inline-box side-margin" />
              <span className={`text ${weight}`}>Eventos</span>
            </>
    ),
    configuracion: () => (
        (weight) =>
            <>
              <i className="fas fa-cog inline-box side-margin" />
              <span className={`text ${weight}`}>Configuración</span>
            </>
    ),
    franquicias: () => (
        (weight) =>
            <>
                <i className="fas fa-tag inline-box side-margin" />
                <span className={`text ${weight}`}>Franquicias</span>
            </>
    ),
    feriados: () => (
        (weight) =>
            <>
                <i className="fas fa-calendar-day inline-box side-margin" />
                <span className={`text ${weight}`}>Feriados</span>
            </>
    ),
    locales: () => (
        (weight) =>
            <>
                <i className="fas fa-store inline-box side-margin" />
                <span className={`text ${weight}`}>Locales</span>
            </>
    ),
    promociones: () => (
        (weight) =>
            <>
                <i className="fas fa-percentage inline-box side-margin" />
                <span className={`text ${weight}`}>Promociones</span>
            </>
    ),
    editar: (nombre) => (
        (weight) =>
            <>
                <i className="fas fa-pen inline-box side-margin" />
                <span className={`text ${weight}`}>{"Editar "+nombre||''}</span>
            </>
    ),
    agregar: () => (
        (weight) =>
            <>
                <i className="fas fa-plus-circle inline-box side-margin" />
                <span className={`text ${weight}`}>Agregar</span>
            </>
    ),
    usuario: () => (
        (weight) =>
            <>
                <i className="fas fa-user inline-box side-margin" />
                <span className={`text ${weight}`}>Usuario</span>
            </>
    ),
    establecimiento: () => (
        (weight) =>
            <>
                <i className="fas fa-store inline-box side-margin" />
                <span className={`text ${weight}`}>Establecimiento</span>
            </>
    ),
    ver:(nombre) => (
        (weight) =>
            <>
                <i className="fas fa-eye inline-box side-margin" />
                <span className={`text ${weight}`}>{nombre}</span>
            </>
    )
};

const externalRoutes = ['escritorio','horarios']

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
        const   props = this.props,
                items = this.props.url.split('/');
        return (
            <>
                <ul className="flex-row nav-list no-padding">
                    {
                        items.map(
                            (e,i) => {
                                stored = e==='escritorio' ? '' : `${stored}/${e}`;
                                display = map[e] ? map[e](props.nombre): map.ver(props.nombre);
                                const linkParam = {
                                    to:`${stored}`||'/',
                                    params:{},
                                    route:e
                                };
                                if (items[i-1] === 'editar')
                                    display = () => false;
                                return (
                                    <li key={i} className="margin-box ">
                                        {
                                            i === items.length-1 || e === 'editar' || e === 'agregar'
                                            ?
                                                <div className="inline-block line-v-middle smaller-text margin-box">{display()}</div>
                                            :
                                                <>
                                                    <CustomLink params={linkParam}>
                                                        <span className="decorate-blue-hover smaller-text text inline-block" style={{fontWeight:"bold !important"}}>
                                                            {display('bold')}
                                                        </span>
                                                    </CustomLink>
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

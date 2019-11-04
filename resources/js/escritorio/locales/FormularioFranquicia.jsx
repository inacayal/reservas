/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import { Text } from '../../componentes/input/Text';
import { Select } from '../../componentes/input/Select';
import Actions from '../../componentes/basic/Actions';

const SelectData = {
    franquicia: {
        name: "id_franquicia",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: {}
    }
};

export const FormularioFranquicia = (props) => {
    SelectData.franquicia.selected = (props.data.franquicia || {}).id || "";
    if (props.agregarLocal)
        SelectData.franquicia.list = props.data
    else{
        SelectData.franquicia.list[SelectData.franquicia.selected]=props.data.franquicia.nombre;
    }

    const franquicia = SelectData.franquicia,
        agregar = [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar
                    </div>
                ),
                to: '/franquicias/agregar'
            }
        ];

    return (
        <>
            <div className="row top-padding">
                <h6 className="highlight no-margin bold">Franquicia</h6>
            </div>
            <div className="row top-padding">
            <div className="col-md-12 text-left relative visible h-padding">
                <div
                    className={props.agregarLocal ? "hidden" : "top-padding full-width overlay"} />
                    <Select
                        select={franquicia}
                        titulo="selecciona la franquicia" />
                </div>
            </div>
            {
                props.agregarLocal
                ?
                    <div className="row v-padding justify-content-end">
                        <span className="smaller-text">
                            si no existe
                        </span>
                        <Actions links={agregar}/>
                    </div>
                :
                    ""
            }
        </>
    )
}

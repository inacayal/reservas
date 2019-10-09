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
    SelectData.franquicia.list = props.data;
    const franquicia = SelectData.franquicia,
        agregar = [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar nueva
                    </div>
                ),
                to: '/franquicias/agregar'
            }
        ];

    return (
        <div className="row v-padding justify-content-end">
            <div className="col-md-6 text-right">
                <h6 className="highlight no-margin bold">Franquicia</h6>
                <Select
                    select={franquicia}
                    titulo="selecciona la franquicia" />
                <div> 
                    <span className="smaller-text">
                        si no existe
                    </span>
                    <Actions links={agregar}/>
                </div>
            </div>
        </div>
    )
}
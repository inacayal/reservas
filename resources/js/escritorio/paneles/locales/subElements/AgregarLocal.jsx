import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Text from '../../../../componentes/input/Text';
import Select from '../../../../componentes/input/Select';
import ButtonList from '../../../../componentes/complex/allUse/ButtonList';

export default function AgregarLocal(props){
    return (
        <form className="full-width box-padding">
            <div className="container">
                <div className="row sub-title border-bottom">
                    Agregar un nuevo local
                </div>
                <div className="row box-padding">
                    <div className="col-md-4">
                        <Text
                            container="full-width"
                            changeValue={props.onTextChange}
                            titulo="Nombre del Local"
                            name="nombre"
                            rows={1}
                            value={props.text.nombre}
                            classes="border-box input-text margin-box full-width" />
                    </div>
                    <div className="col-md-4">
                        <Text
                            container="full-width"
                            changeValue={props.onTextChange}
                            titulo="Correo de usuario"
                            name="email"
                            rows={1}
                            value={props.text.email}
                            classes="border-box input-text margin-box full-width" />
                    </div>
                    <div className="col-md-4">
                        <Text
                            container="full-width"
                            changeValue={props.onTextChange}
                            titulo="Contraseña"
                            name="password"
                            rows={1}
                            value={props.text.password}
                            classes="border-box input-text margin-box full-width" />
                    </div>
                </div>
                <div className="row box-padding">
                    <div className="col-md-6">
                        <Text
                            container="full-width"
                            changeValue={props.onTextChange}
                            titulo="Dirección"
                            name="direccion"
                            rows={1}
                            value={props.text.direccion}
                            classes="border-box input-text margin-box full-width" />
                    </div>
                    <div className="col-md-6">
                        <div className="no-padding bold light-danger">
                            Provincia
                        </div>
                        <Select
                            {...props.select.provincia}
                            titulo="Selecciona la provincia"
                            change={props.selectOption}
                            toggle={props.showOptions} />
                    </div>
                </div>
                <div className="row text-right justify-content-end">
                    <ButtonList
                        displayList="flex-row nav-list no-padding inline-block  align-center"
                        container="side-margin inline-block"
                        elems={props.formActions} />
                </div>
            </div>
        </form>
    )
}

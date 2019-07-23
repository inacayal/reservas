import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Text from '../../../../componentes/input/Text';

export default function Usuario(props) {
    return (
        <div className={props.show ? "full-width" : "hidden"}>
            <div className="sub-title full-width border-bottom">Datos del usuario</div>
            <form action="">
                <div className="container">
                    <div className="row box-padding">
                        <div className="col-sm-6">
                            <Text
                                container="full-width"
                                changeValue={props.onTextChange}
                                titulo="Email de usuario"
                                name="email_local"
                                rows={1}
                                value={props.text.email_local}
                                readOnly={true}
                                classes="border-box input-text margin-box full-width" />
                        </div>
                        <div className="col-sm-6">
                            <Text
                                container="full-width"
                                changeValue={props.onTextChange}
                                titulo="Contraseña de usuario"
                                name="password_local"
                                rows={1}
                                value={props.text.password_local}
                                classes="border-box input-text margin-box full-width" />
                        </div>
                    </div>
                    <div className="row box-padding">
                        <div className="col-sm-6">
                            <Text
                                container="full-width"
                                changeValue={props.onTextChange}
                                titulo="Razón Social"
                                name="razon_social"
                                rows={1}
                                value={props.text.razon_social}
                                classes="border-box input-text margin-box full-width" />
                        </div>
                        <div className="col-sm-6">
                            <Text
                                container="full-width"
                                changeValue={props.onTextChange}
                                titulo="CUIT / CUIL"
                                name="cuit_cuil"
                                rows={1}
                                value={props.text.cuit_cuil}
                                classes="border-box input-text margin-box full-width" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
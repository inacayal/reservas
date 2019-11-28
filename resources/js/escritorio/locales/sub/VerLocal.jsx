import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import { Navegacion } from '../../../acciones/ActionsByView';
import Titulo from '../../../componentes/basic/Titulo';
import FranquiciasTable from '../../../componentes/tables/FranquiciasTable';
import {ExpandableComponent} from '../../../hocs/ExpandableComponent';
import Actions from '../../../componentes/basic/Actions';

const links = (key) => [
    {
        title: (
            <div className="smaller-text text bold">
                <i className="fas fa-eye" />
                Ver
            </div>
        ),
        to: `/franquicias/${key}`,
        params:{id:key},
        route:'franquicias'
    },
    {
        title: (
            <div className="smaller-text text bold">
                <i className="fas fa-pen" />
                Editar
            </div>
        ),
        to: `/franquicias/editar/${key}`,
        params:{id:key},
        route:'franquicias'
    }
];

export function VerLocal (props) {
    const data = props.data;
    props.nav.buttons[0].click = props.toggleModal;
    data.franquicia.acciones= <Actions otherSection links={links(data.franquicia.id)}/>;
    return (
        <>
            <Titulo title={data.nombre}
                    links={props.nav.links}
                    buttons ={props.nav.buttons}/>
            <div className="container">
                <div className="v-padding row">
                    <FranquiciasTable   data={[data.franquicia]} 
                                        withPagination={false}/>
                </div>
                <ExpandableComponent    title = 'Información'
                                        show={true}>
                    <div className="row v-padding">
                        <div className="col-md-4">
                            <h6 className="full-width light-danger bold">
                                Nombre
                            </h6>
                            <div>
                                {data.nombre}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h6 className="full-width light-danger bold">
                                Correo
                            </h6>
                            <div>
                                {data.correoLocal}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h6 className="full-width light-danger bold">
                                Teléfono
                            </h6>
                            <div>
                                {data.telefonoLocal}
                            </div>
                        </div>
                    </div>
                    <div className="row v-padding">
                        <div className="col-md-6">
                            <h6 className="full-width light-danger bold">
                                Razón Social
                            </h6>
                            <div>
                                {data.razonSocial}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h6 className="full-width light-danger bold">
                                CUIT / CUIL
                            </h6>
                            <div>
                                {data.cuitCuil}
                            </div>
                        </div>
                    </div>
                </ExpandableComponent>
                <ExpandableComponent title = 'Ubicación'>
                    <div className="row v-padding margin-box">
                        <div className="col-md-6">
                            <h6 className="full-width light-danger bold">
                                Provincia
                            </h6>
                            <div>
                                {data.provincia.nombre}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h6 className="full-width light-danger bold">
                                Dirección del local
                            </h6>
                            <div>
                                {data.direccionLocal}
                            </div>
                        </div>
                    </div>
                </ExpandableComponent>
                <ExpandableComponent title = 'Encargado'>
                    <div className="row v-padding margin-v">
                        <div className="col-md-4">
                            <h6 className="full-width light-danger bold">
                                Nombre
                            </h6>
                            <div>
                                {data.admNombre}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h6 className="full-width light-danger bold">
                                Teléfono
                            </h6>
                            <div>
                                {data.admTelefono}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h6 className="full-width light-danger bold">
                                Correo
                            </h6>
                            <div>
                                {data.admEmail}
                            </div>
                        </div>
                    </div>
                </ExpandableComponent>
                <ExpandableComponent title = 'Usuario'>
                    <div className="row v-padding">
                        <div className="col-md-4">
                            <h6 className="full-width light-danger bold">
                                Username
                            </h6>
                            <div>
                                {data.username}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h6 className="full-width light-danger bold">
                                Correo
                            </h6>
                            <div>
                                {data.email}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h6 className="full-width light-danger bold">
                                Contraseña de usuario
                            </h6>
                        </div>
                    </div>
                </ExpandableComponent>
            </div>
        </>
    );
}

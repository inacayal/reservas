/**
 * react basic
 */
import React, {
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch} from 'react-router-dom';
import {Navegacion} from '../../acciones/ActionsByView';
import Formulario from './sub/Formulario';
import Franquicias from './sub/Franquicias';
import VerFranquicia from './sub/VerFranquicia';
import ConfirmarModal from '../../componentes/modal/Modal';
import ValidationHandler from '../../hocs/ValidationHandler';
import validation from './validation';

export default function FranquiciasRouting (props) {
    const   [open,toggle] = useState(false),
            openModal = (e) => {
                e.preventDefault();
                toggle(true);
            },
            closeModal = (e) => {
                e.preventDefault();
                toggle(false);
            };
    return (
        <>
            <ConfirmarModal open={open}
                            closeModal={closeModal}
                            title={"Eliminar Franquicia"}
                            content={"¿estás seguro de eliminar este franquicia?"} />
            <Route  path={props.match.url}
                    exact
                    render={
                        (match) =>
                            <Franquicias    toggleModal={openModal}
                                            data={props.data}
                                            nav={Navegacion.listado('franquicias')} {...match}/>
                    } />
            <Switch>
                <Route  path={`${props.match.url}/editar/:id`}
                        exact
                        render={
                            (match) => {
                                const fields = {
                                    id:props.data.id,
                                    nombre:props.data.nombre,
                                    correo:props.data.correoLocal||'',
                                    telefono:props.data.telefonoLocal||'',
                                    username: props.data.username||'',
                                    email: props.data.email||'',
                                    razon_social:props.data.razonSocial||'',
                                    cuit_cuil:props.data.cuitCuil||''
                                };
                                return (
                                    <Validator  form={fields}
                                                sendRequest={()=> false}
                                                validation={validation}>
                                        <Formulario data={props.data}
                                                    toggleModal={openModal}
                                                    nav={Navegacion.formulario(()=>false,match.match.params.id,'franquicias')}
                                                    editar={true} {...match} />
                                    </Validator>

                                )
                            }
                        } />
                <Route  path={`${props.match.url}/agregar`}
                        render={
                            (match) => {
                                const fields = {
                                    id:'',
                                    franquicia:'',
                                    nombre:'',
                                    correo:'',
                                    telefono:'',
                                    username: '',
                                    email: '',
                                    razon_social:'',
                                    cuit_cuil:''
                                };
                                return (
                                    <Validator  form={fields}
                                                sendRequest={()=> false}
                                                validation={validation}>
                                        <Formulario data={props.data}
                                                    toggleModal={openModal}
                                                    nav={Navegacion.agregar('franquicias')}
                                                    editar={false} {...match} />
                                    </Validator>

                                )
                            }
                        } />
                <Route  path={`${props.match.url}/:id`}
                        render={
                            (match) =>
                                <VerFranquicia
                                    data={props.data}
                                    toggleModal={openModal}
                                    nav={Navegacion.singular(()=>false,match.match.params.id,'franquicias')} {...match} />
                        } />
            </Switch>
        </>
    );
}

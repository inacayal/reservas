/**
 * react basic
 */
import React, {
    Component,
    useState
} from 'react';
import {Navegacion} from '../../acciones/ActionsByView';
import ReactDOM from 'react-dom';
import Formulario from './sub/Formulario';
import Promociones from './sub/Promociones';
import VerPromocion from './sub/VerPromocion';
import ConfirmarModal from '../../componentes/modal/Modal';
import { Route, Switch } from 'react-router-dom';
import ValidationHandler from '../../hocs/ValidationHandler';
import validation from './validation';
import {promocionesHandlers} from '../../handlers/sub/promocionesHandlers';

export default function PromocionesRouting (props) {
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
                            title={"Eliminar Promoción"}
                            content={"¿estás seguro de eliminar este promoción?"} />
            <Route  path={props.match.url}
                    exact
                    component={
                        (match) =>
                            <Promociones    data={props.data}
                                            toggleModal={openModal}
                                            nav={Navegacion.listado('promociones')}/>
                    }/>
            <Switch>
                <Route  path={`${props.match.url}/editar/:id`}
                        exact
                        component={
                            (match) => {
                                const   selected = props.data.selected,
                                        fields = {
                                            id:selected.id,
                                            id_usuario:user.id,
                                            eventos:Object.keys(selected.eventos.list).join(','),
                                            descuento:selected.descuento,
                                            descripcion:selected.descripcion,
                                            nombre:selected.nombre,
                                            scope: selected.estado === 'Activo' ? 1 : 2
                                        }
                                return (
                                    <ValidationHandler  form={fields}
                                                        sendRequest={promocionesHandlers.form.edit}
                                                        validation={validation}>
                                        <Formulario data={props.data}
                                                    editar={true}
                                                    toggleModal={openModal}
                                                    nav={Navegacion.formulario(()=>false,match.match.params.id,'promociones')} {...match} />
                                    </ValidationHandler>
                                )
                            }
                        }/>
                <Route  path={`${props.match.url}/agregar`}
                        component={
                            (match) => {
                                const fields = {
                                    id_usuario:user.id,
                                    eventos:'',
                                    descuento:'',
                                    descripcion:'',
                                    nombre:'',
                                    scope: 1
                                };
                                return (
                                    <ValidationHandler  form={fields}
                                                        sendRequest={promocionesHandlers.form.add}
                                                        validation={validation}>
                                        <Formulario data={{all:props.data}}
                                                    editar={false}
                                                    toggleModal={openModal}
                                                    nav={Navegacion.agregar('promociones')} {...match} />
                                    </ValidationHandler>
                                )
                            }
                        }/>
                <Route  path={`${props.match.url}/:id`}
                        component={
                            (match) =>
                                <VerPromocion   data={props.data}
                                                toggleModal={openModal}
                                                nav={Navegacion.singular(()=>false,match.match.params.id,'promociones')} {...match} />
                        }/>
            </Switch>
        </>
    );
}

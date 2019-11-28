/**
 * react basic
 */
import React, {
    Component,
    useState
} from 'react';
import {Navegacion} from '../../acciones/ActionsByView';
import ReactDOM from 'react-dom';
import {Formulario} from './sub/Formulario';
import {Promociones} from './sub/Promociones';
import {VerPromocion} from './sub/VerPromocion';
import {ConfirmarModal} from '../../componentes/modal/Modal';
import { Route, Switch } from 'react-router-dom';
import Validator from '../../hocs/Validator';
import validation from './validation';

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
                                            nav={Navegacion.listado('promociones')} {...match} />
                    }/>
            <Switch>
                <Route  path={`${props.match.url}/editar/:id`}
                        exact
                        component={
                            (match) => {
                                const   selected = props.data.selected,
                                        fields = {
                                            id:selected.id,
                                            eventos:Object.keys(selected.eventos.list).join(','),
                                            descuento:selected.descuento,
                                            descripcion:selected.descripcion,
                                            nombre:selected.nombre
                                        }
                                return (
                                    <Validator  form={fields}
                                                validation={validation}>
                                        <Formulario data={props.data}
                                                    editar={true}
                                                    toggleModal={openModal}
                                                    nav={Navegacion.formulario(()=>false,match.match.params.id,'promociones')} {...match} />
                                    </Validator>
                                )
                            }
                        }/>
                <Route  path={`${props.match.url}/agregar`}
                        component={
                            (match) => {
                                const fields = {
                                    id:'',
                                    eventos:'',
                                    descuento:'',
                                    descripcion:'',
                                    nombre:''
                                };
                                return (
                                    <Validator  form={fields}
                                                validation={validation}>
                                        <Formulario data={{all:props.data}}
                                                    editar={false}
                                                    toggleModal={openModal}
                                                    nav={Navegacion.agregar('promociones')} {...match} />
                                    </Validator>
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

/**
 * react basic
 */
import React, {
    Component,
    useState
} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {Navegacion} from '../../acciones/ActionsByView'
import ReactDOM from 'react-dom';
import {Formulario} from './sub/Formulario';
import {Eventos} from './sub/Eventos';
import {VerEvento} from './sub/VerEvento';
import {ConfirmarModal} from '../../componentes/modal/Modal';
import Validator from '../../hocs/Validator';
import validation from './validation';

export default function EventosRouting (props) {
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
                            <Eventos    data={props.data}
                                        toggleModal={openModal}
                                        nav={Navegacion.listado('eventos')} {...match} />
                    } />
            <Switch>
                <Route  path={`${props.match.url}/editar/:id`}
                        exact
                        render={
                            (match) => {
                                const   selected = props.data.selected,
                                        fields = {
                                            id:selected.id,
                                            promociones:Object.keys(selected.promociones.list).join(','),
                                            horarios:Object.keys(selected.horarios.list).join(','),
                                            feriados:Object.keys(selected.feriados.list).join(','),
                                            descripcion:selected.descripcion,
                                            nombre:selected.nombre
                                        };
                                return (
                                    <Validator  form={fields}
                                                validation={validation}>
                                        <Formulario data={props.data}
                                                    editar={true}
                                                    toggleModal={openModal}
                                                    nav={Navegacion.formulario(()=>false,match.match.params.id,'eventos')}
                                                    {...match} />
                                    </Validator>
                                )
                            }
                        } />
                <Route  path={`${props.match.url}/agregar`}
                        render={
                            (match) => {
                                const fields = {
                                    id:'',
                                    promociones:'',
                                    horarios:'',
                                    feriados:'',
                                    descripcion:'',
                                    nombre:''
                                };
                                return (
                                    <Validator  form={fields}
                                                validation={validation}>
                                        <Formulario data={{all:props.data}}
                                                    toggleModal={openModal}
                                                    nav={Navegacion.agregar('eventos')}
                                                    editar={false} {...match} />
                                    </Validator>
                                )
                            }
                    } />
                <Route  path={`${props.match.url}/:id`}
                        render={
                            (match) => (
                                <VerEvento  data={props.data}
                                            toggleModal={openModal}
                                            nav={Navegacion.singular(()=>false,match.match.params.id,'eventos')} {...match} />
                                )
                        }/>
            </Switch>
        </>
    );
}

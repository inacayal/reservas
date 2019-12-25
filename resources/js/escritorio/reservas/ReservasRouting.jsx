import React,
{
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch} from 'react-router-dom';
import {Formulario} from './sub/Formulario';
import {Calendario} from './sub/Calendario';
import {VerReserva} from './sub/VerReserva';
import{Navegacion} from '../../acciones/ActionsByView';
import Validator from '../../hocs/Validator';
import validation from './validation';

const ReservasRouting = (props) => (
    <>
        <Route  path={props.match.url}
                exact
                render={
                    (match) =>
                        <Calendario data={props.data}
                                    nav={Navegacion.listado('reservas')} {...match}/>
                } />
        <Switch>
            <Route  path={`${props.match.url}/agregar`}
                    render={
                        (match) => {
                            const form ={
                                fecha_reserva: new Date(),
                                id_ubicacion:"",
                                id_evento:"",
                                id_promocion:"",
                                hora_reserva:"",
                                minuto_reserva:"",
                                cantidad_personas:"",
                                nombre:"",
                                apellido:"",
                                email:"",
                                telefono:"",
                                descripcion_evento:""
                            };
                            return (
                                <Validator  form={form} 
                                            sendRequest={()=> false}
                                            validation={validation}>
                                    <Formulario data={props.data}
                                                nav={Navegacion.agregar('reservas')} {...match}/>
                                </Validator>
                            );
                        }
                } />
            <Route  path={`${props.match.url}/:id`}
                    render={
                        (match) =>
                            <VerReserva data={props.data}
                                        nav={Navegacion.singular(()=>false,match.match.params.id,'reservas')} {...match}/>
                    } />
        </Switch>
    </>
)

export default ReservasRouting;

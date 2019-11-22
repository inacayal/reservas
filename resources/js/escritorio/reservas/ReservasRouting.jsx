import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch} from 'react-router-dom';
import {Formulario} from './sub/Formulario';
import {Calendario} from './sub/Calendario';
import {VerReserva} from './sub/VerReserva';
import{Navegacion} from '../../acciones/ActionsByView';
import Validator from '../../hocs/Validator';

const validation = {
    id_ubicacion:{
        rules:{
            required:true,
            numeric:true
        },
        fieldName:"Ubicación"
    },
    id_evento:{
        rules:{
            required:true,
            numeric:true
        },
        fieldName:"Ocasión"
    },
    id_promocion:{
        rules:{
            required:false,
            numeric:true
        },
        fieldName:"Promoción"
    },
    hora_reserva:{
        rules:{
            required:true,
            numeric:true
        },
        fieldName:"Hora de la reserva"
    },
    minuto_reserva:{
        rules:{
            required:true,
            numeric:true
        },
        fieldName:"Minuto de la reserva"
    },
    cantidad_personas:{
        rules:{
            required:true,
            numeric:true,
            min:1
        },
        fieldName:"Cantidad de personas"
    },
    nombre:{
        rules:{
            required:true,
            max:100,
            alphabetic:true
        },
        fieldName:"Nombre"
    },
    apellido:{
        rules:{
            required:true,
            max:100,
            alphabetic:true
        },
        fieldName:"Nombre"
    },
    email:{
        rules:{
            required:true,
            email:true,
            max:100
        },
        fieldName:"Correo electrónico"
    },
    telefono:{
        rules:{
            required:true,
            max:20,
            numeric:true
        },
        fieldName:"Teléfono"
    },
    descripcion_evento:{
        rules:{
            required:false
        },
        fieldName:"Observaciones"
    },
    fecha_reserva:{
        rules:{
            required:true
        },
        fieldName:"Fecha de la reserva"
    }
}

export default function ReservasRouting (props) {
    return (
        <>
            <Route
                path={props.match.url}
                exact
                render={
                    (match) =>
                        <Calendario
                            data={props.data}
                            nav={Navegacion.listado('reservas')} {...match}/>
                } />
            <Switch>
                <Route
                    path={`${props.match.url}/agregar`}
                    render={
                        (match) => {
                            const form ={
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
                                descripcion_evento:"",
                                fecha_reserva:""
                            };
                            return (
                                <Validator form={form} validation={validation}>
                                    <Formulario
                                        data={props.data}
                                        nav={Navegacion.agregar('reservas')} {...match}/>
                                </Validator>
                            );
                        }
                    } />
                <Route
                    path={`${props.match.url}/:id`}
                    render={
                        (match) =>
                            <VerReserva
                                data={props.data}
                                nav={Navegacion.singular(()=>false,match.match.params.id,'reservas')} {...match}/>
                    } />
            </Switch>
        </>
    );
}

import React, {
    Component,
    useState
} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {
    Navegacion,
    FormActions
} from '../../acciones/ActionsByView';
import ReactDOM from 'react-dom';
import {FeriadoFormulario} from './feriados/FeriadoFormulario';
import {Feriados} from './feriados/Feriados';
import {VerFeriado} from './feriados/VerFeriado';
import {ConfirmarModal} from '../../componentes/modal/Modal';
import Validator from '../../hocs/Validator';
import {feriadoValidation as validation} from './validation';

export default function FeriadosRouting (props) {
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
                            title={"Eliminar Feriado"}
                            content={"¿estás seguro de eliminar este feriado?"} />
            <Route  path={props.match.url}
                    exact
                    render={
                        (match) =>
                            <Feriados   data={props.data}
                                        toggleModal={openModal}
                                        nav={Navegacion.listado('horarios/feriados')} {...match} />
                    } />
            <Switch>
                <Route  path={`${props.match.url}/editar/:id`}
                        exact
                        render={
                            (match) => {
                                const   feriado = props.data.feriados,
                                        form ={
                                            nombre:                    feriado.nombre,
                                            fecha_feriado:             props.data.date,
                                            id_evento:                 Object.keys(props.data.eventos.list).join(','),
                                            apertura_reserva_hora:     feriado.apertura.reserva.hora,
                                            apertura_reserva_minuto:   feriado.apertura.reserva.minuto,
                                            cierre_reserva_hora:       feriado.cierre.reserva.hora,
                                            cierre_reserva_minuto:     feriado.cierre.reserva.minuto,
                                            apertura_atencion_hora:    feriado.apertura.atencion.hora,
                                            apertura_atencion_minuto:  feriado.apertura.atencion.minuto,
                                            cierre_atencion_hora:      feriado.cierre.atencion.hora,
                                            cierre_atencion_minuto:    feriado.cierre.atencion.minuto,
                                            descripcion:               props.data.descripcion||"",
                                            id_estado:                 feriado.estado === 'laboral'
                                        };
                                return (
                                    <Validator  form={form}
                                                validation={validation}>
                                        <FeriadoFormulario  data={props.data}
                                                            toggleModal={openModal}
                                                            nav={Navegacion.formulario(()=>false,match.match.params.id,'horarios/feriados')}
                                                            formActions={FormActions()}
                                                            editar={true} {...match} />
                                    </Validator>
                                )
                            }
                        } />
                <Route  path={`${props.match.url}/agregar`}
                        component={
                            (match) => {
                                const form ={
                                    fecha_feriado:             new Date(props.data.date),
                                    nombre:                    "",
                                    id_evento:                 "",
                                    apertura_reserva_hora:     "",
                                    apertura_reserva_minuto:   "",
                                    cierre_reserva_hora:       "",
                                    cierre_reserva_minuto:     "",
                                    apertura_atencion_hora:    "",
                                    apertura_atencion_minuto:  "",
                                    cierre_atencion_hora:      "",
                                    cierre_atencion_minuto:    "",
                                    descripcion:               "",
                                    id_estado:                 true
                                };
                                return (
                                    <Validator  form={form}
                                                validation={validation}>
                                        <FeriadoFormulario
                                            data={props.data}
                                            toggleModal={openModal}
                                            nav={Navegacion.agregar('horarios/feriados')}
                                            editar={false} {...match} />
                                    </Validator>
                                )
                            }
                        } />
                <Route  path={`${props.match.url}/:id`}
                        component={
                            (match) =>
                                <VerFeriado data={props.data}
                                            toggleModal={openModal}
                                            nav={Navegacion.singular(()=>false,match.match.params.id,'horarios/feriados')} {...props} />
                        } />
            </Switch>
        </>
    );
}

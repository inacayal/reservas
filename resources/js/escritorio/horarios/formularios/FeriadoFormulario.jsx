/**
 * react basic
 */
import React, {
    Component,
    useState,
    useContext
} from 'react';
import ReactDOM from 'react-dom';
import {
    DAYS,
    MONTHS
} from '../../../constantes/DaysMonths';
import {Calendario} from './Calendario';
import { SelectFields } from './SelectFields';
import { EventoFields } from './EventoFields';
import Titulo from '../../../componentes/basic/Titulo';
import { Toggle } from '../../../componentes/input/Toggle';
import Actions from '../../../componentes/basic/Actions';
import {generateHoursFromInterval} from '../../../utils/Helper';
import {WaitsLoading} from '../../../hocs/RouterTransition';

export function FeriadoFormulario (props) {
    const   context = useContext(WaitsLoading),
            [side,toggle] = useState(props.fields.id_estado),
            data = props.data;
    if (props.editar)
        props.nav.buttons[0].click = toggle;
    return (
        <>
            <Titulo title={
                    props.editar
                        ? data.feriados.nombre
                        : "Agregar Feriado"
                    }
                    links={props.nav.links}
                    buttons={props.nav.buttons} />
            <div className="bold">
                {
                    props.editar
                        ? `${MONTHS[data.date.getMonth()]} de ${data.date.getFullYear()}`
                        : ""
                }
            </div>
            <div className="container">
                <div className="row v-padding">
                    <div className="col-md-6">
                        <Calendario editar={props.editar}
                                    date={props.fields.fecha_feriado}
                                    data={data}
                                    change={props.change}
                                    fetch={context}/>
                        <div className="bold smaller-text v-padding margin-box">
                            * Los días inhabilitados ya tienen feriados asignados
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="container">
                            <div className="row sub-title">
                                {data.title}
                            </div>
                            <div className="row justify-content-end">
                                <Toggle rightTitle="Laboral"
                                        leftTitle="No laboral"
                                        name="estado"
                                        side={side}
                                        changeSide={toggle}/>
                            </div>
                            <div className="row relative visible">
                                <div className={
                                    side
                                        ? "hidden"
                                        : "top-padding full-width overlay"
                                    }/>
                                <SelectFields   editar ={props.editar}
                                                data={data.feriados}
                                                minutos = {data.minutes}
                                                fields={props.fields}
                                                change={props.change}
                                                errors={props.errors}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row v-padding">
                    <EventoFields   side={side}
                                    editar = {props.editar}
                                    eventos={data.eventos}
                                    class={{ type: "feriado", col: "col-md-4" }}
                                    data={data.feriados}
                                    fields={props.fields}
                                    change={props.change}
                                    errors={props.errors}/>
                </div>
            </div>
        </>
    );
}

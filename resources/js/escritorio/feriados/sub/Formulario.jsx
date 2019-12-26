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
import {Calendario} from '../../../form/Calendario';
import { SelectFields } from '../../../form/SelectFields';
import { EventoFields } from '../../../form/EventoFields';
import Titulo from '../../../componentes/basic/Titulo';
import { Toggle } from '../../../componentes/input/Toggle';
import Actions from '../../../componentes/basic/Actions';
import {generateHoursFromInterval} from '../../../utils/Helper';
import {WaitsLoading} from '../../../hocs/DataHandler';
import {Text} from '../../../componentes/input/Text'

export default function Formulario (props) {
    const   context = useContext(WaitsLoading),
            [side,toggle] = useState(props.fields.id_estado),
            data = props.data;
    if (props.editar)
        props.nav.buttons[0].click = toggle;
    return (
        <>
            <Titulo title={
                    props.editar
                        ? props.fields.nombre
                        : "Agregar Feriado"
                    }
                    links={props.nav.links}
                    buttons={props.nav.buttons} />
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
                        <div className="h-padding v-padding">
                            <Text   rows={4}
                                    titulo="Descripción"
                                    holder="Descripción del día hasta 100 caracteres"
                                    name="descripcion"
                                    errors={props.errors.descripcion}
                                    value={props.fields.descripcion}
                                    changeHandler={props.change}/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="container">
                            <div className="row justify-content-end">
                                <div className="sub-title seventy inline-block bold">
                                    {
                                        props.editar
                                            ? `${data.date.getDate()} de ${MONTHS[data.date.getMonth()]} de ${data.date.getFullYear()}`
                                            : ""
                                    }
                                </div>
                                <div className="thirty inline-block text-right">
                                    <Toggle rightTitle="Laboral"
                                            leftTitle="No laboral"
                                            name="estado"
                                            side={side}
                                            changeSide={toggle}/>
                                </div>
                            </div>
                            <div className="row relative visible top-padding">
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
                                                errors={props.errors}
                                                type='feriado'/>
                            </div>
                            <EventoFields   side={side}
                                            editar = {props.editar}
                                            eventos={data.eventos}
                                            data={data.feriados}
                                            fields={props.fields}
                                            change={props.change}
                                            errors={props.errors}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

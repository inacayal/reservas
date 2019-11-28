import React,
{
    Component,
    useState
} from 'react';
import {
    DAYS,
    MONTHS
} from '../../../constantes/DaysMonths';
import ReactDOM from 'react-dom';
import { Calendario } from '../formularios/Calendario';
import { SelectFields } from '../formularios/SelectFields';
import { EventoFields } from '../formularios/EventoFields';
import Titulo from '../../../componentes/basic/Titulo';
import { Toggle } from '../../../componentes/input/Toggle';
import Actions from '../../../componentes/basic/Actions';

export function HorarioFormulario (props) {
    const   data = props.data,
            [side,toggle] = useState(props.fields.id_estado);
    if(props.editar)
        props.nav.buttons[0].click = props.toggleModal;
    return (
        <>
            <Titulo    title={
                            props.editar
                                ? `Editar horario del ${DAYS[parseInt(data.horarios.diaSemana) - 1]}`
                                : `Agregar horario al ${DAYS[parseInt(props.match.params.day) - 1]}`
                        }
                        links={props.nav.links}
                        buttons={props.nav.buttons} />
            <div className="container">
                <div className="row v-padding">
                    <div className="col-lg-6 relative visible">
                        <div className={
                            side
                                ? "hidden"
                                : "top-padding full-width overlay"
                        } />
                        <SelectFields   editar = {props.editar}
                                        data={data.horarios}
                                        minutos={data.minutes}
                                        fields={props.fields}
                                        change={props.change}
                                        errors={props.errors} />
                    </div>
                    <div className="col-lg-6">
                        <div className="container">
                            <div className="row justify-content-end">
                                <Toggle rightTitle="Laboral"
                                        leftTitle="No laboral"
                                        name="estado"
                                        side={side}
                                        changeSide={toggle} />
                            </div>
                            <div className="row v-padding">
                                <EventoFields   side={side}
                                                editar={props.editar}
                                                eventos={data.eventos}
                                                class={{type:"horario",col:"col-md-12"}}
                                                data={data.horarios}
                                                fields={props.fields}
                                                change={props.change}
                                                errors={props.errors} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

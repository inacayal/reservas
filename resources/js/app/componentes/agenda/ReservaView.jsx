import React, {
    Component,
    useState,
    useContext,
    useRef,
    useEffect
 } from 'react';
import {
    withRouter
} from 'react-router';
import {
    reservaGenerator
} from '../../generators/reservaGenerator';
import {
    getMonthLength
} from '../../utils/Helper';
import {
    DAYS,
    MONTHS
} from '../../constantes/DaysMonths';
import {
    Select
} from '../input/Select';
import {
    processData
} from '../../utils/Helper';
import ReservasTable from '../tables/ReservasTable';
import AttentionSchedule from '../basic/AttentionSchedule';
import GraphicHolder from '../graphics/GraphicHolder';

function View(props) {
    const loc = props.location.state||{},
        date = loc.date || new Date(),
        horarios = props.data.horarios.data[date.getDay()+1],
        data = loc.first
            ? processData(props.data.data)
            : props.data.data[props.num]||[];
    return (
        <div className="container-fluid">
            <div className="row">
                <GraphicHolder titulo="Métricas para las reservas"
                    monthly="/reservas/resumen/mensual/$month/$year"
                    yearly="/reservas/resumen/anual/$year"
                    receivesDate={true}
                    date={date}/>
            </div>
            {
                (horarios)
                ?
                    <>
                        <div className="row top-padding">
                            <AttentionSchedule data={horarios}
                                displayQty={`${data.length} reservas encontradas`}/>
                        </div>
                        <div className="row v-padding">
                            <ReservasTable data={data} actions={props.actions}/>
                        </div>
                    </>
                :
                    <div>
                        Aun no has asignado los horarios de trabajo de tu local
                    </div>
            }
        </div>
    )
}

export const ReservaView = withRouter( React.memo(View) );

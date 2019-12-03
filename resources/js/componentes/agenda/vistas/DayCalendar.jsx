import React, {
    Component,
    useState,
    useContext,
    useEffect
 } from 'react';
import ReactDOM from 'react-dom';import generateDay from '../procedimientos/generateDay';
import generateWeek from '../procedimientos/generateWeek';import ButtonList from '../../basic/ButtonList';
import calendarNavigation from '../calendarNavigation';
import {CardList} from '../../basic/CardList';
import {Toggle} from '../../input/Toggle';import {DAYS,MONTHS} from '../../../constantes/DaysMonths';
import {getMonthLength} from '../../../utils/Helper';
import { evaluateDateChange } from '../../../utils/Helper';
import {WaitsLoading} from '../../../hocs/RouterTransition';

const WeekDisplay = React.memo(
    (props) =>{
        const   week = generateWeek(
            props.date,
            props.data,
            props.actions,
            props.type
        );
        return week.map(
            (elem, index) => {
                return (
                    <div key={index}
                        className={
                            elem.data == props.date.getDate()
                                ? `${elem.class} selected`
                                : elem.class
                        }
                        data={elem.data}
                        onClick={props.verDia}>
                        <elem.content />
                    </div>
                )
            }
        );
    }
);

function DayCalendar(props) {
    const   context = useContext(WaitsLoading),
            [nDate, changeDate] = useState(new Date(props.date)),
            changeIndex = (e) => {
                e.preventDefault();
                const   offset = parseInt(e.currentTarget.getAttribute('data')),
                        change = offset < 0
                            ? {
                                o: new Date(nDate),
                                n: new Date(nDate.setDate(nDate.getDate() + offset + (6 - nDate.getDay()))),
                                m: getMonthLength(nDate.getMonth() + 1, nDate.getFullYear())
                            }
                            : {
                                o: new Date(nDate),
                                n: new Date(nDate.setDate(nDate.getDate() + offset - nDate.getDay())),
                                m: 1
                            };
                evaluateDateChange (
                    change,
                    context,
                    (obj) => {changeDate(obj.date);},
                    '/reservas',
                    "3",
                    'reservas'
                );
            };
    useEffect(()=>changeDate(props.date),[props.date])
    if (props.horarios){
        const [
                dayReservationHours,
                foundLength
            ] = generateDay(
                props.horarios.data,
                props.horarios.intervalo,
                props.horarios.caida,
                props.date,
                props.data,
                props.type,
                props.actions
            ),
            [side,changeToggleSide] = useState(true),
            sideTitles = calendarNavigation(
                {
                    left: -7,
                    right: 7
                },
                'semana'
            );
            return (
                <div className="container">
                    <div className="row v-padding m-font">
                        {`Mostrando ${DAYS[props.date.getDay()]} ${props.date.getDate()} de ${MONTHS[props.date.getMonth()]}`}
                    </div>
                    <div className="row">
                        <div className="col-md-2 no-padding">
                            <WeekDisplay    date={nDate}
                                            data={props.data}
                                            actions={props.actions}
                                            type={props.type}
                                            verDia ={props.verDia}
                                            fetch ={props.fetch}/>
                        </div>
                        <div className="col-md-10">
                        {
                            foundLength>0
                            ?
                                <>
                                    <div className="row justify-content-end border-bottom">
                                        <div className="col-md-6 m-font no-padding">
                                            {`${foundLength} reservaciones encontradas`}
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <Toggle     leftTitle="Ver listado"
                                                        rightTitle="Ver tabla"
                                                        name="estado"
                                                        side={side}
                                                        changeSide={changeToggleSide} />
                                        </div>
                                    </div>
                                    <div className="row v-padding" style={{height:'65vh',overflow:'auto',marginTop:'10px'}}>
                                        {
                                            side
                                                ?
                                                    <CardList   displayList="nav-list full-width no-h-padding v-padding"
                                                                elems={dayReservationHours} />
                                                : "tabla"
                                        }
                                    </div>
                                </>
                            :
                                <div className="row bold box-padding border-bottom">
                                    No se ha encontrado reservaciones
                                </div>
                        }
                        </div>

                </div>
                <div className="row">
                    <ButtonList clickHandler={changeIndex}
                                elemClass="box-transparent"
                                displayList="flex-row margin-box no-padding nav-list full-width"
                                elems={sideTitles} />
                </div>
            </div>
        );
    }
    return (
        <div className={"full-width"}>
            <div className="bold">
                {`Mostrando ${DAYS[props.date.getDay()]} ${props.date.getDate()} de ${MONTHS[props.date.getMonth()]}`}
            </div>
            <div>
                Aun no has asignado los horarios de trabajo de tu local
            </div>
        </div>
    )
}


export default React.memo(DayCalendar);

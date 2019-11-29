import {
    DAYS,
    MONTHS
} from '../../../constantes/DaysMonths';
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import Titulo from '../../../componentes/basic/Titulo';
import generateWeek from '../../../componentes/agenda/procedimientos/generateWeek';

const links = [
    {
        title: (
            <div className="smaller-text text bold">
                <i className="fas fa-calendar-day inline-box side-margin" />
                Feriados
            </div>
        ),
        to:`/horarios/feriados`,
        params:{},
        route:`horarios/feriados`
    }
];

export function Horarios (props) {
    const week = generateWeek(
            null,
            props.data,
            {eliminar: props.toggleModal},
            'horarios'
        );
    return (
        <>
            <Titulo title="Horarios"
                    links={links}/>
            <div className="v-padding">
                <ul className="v-padding justify no-padding full-width flex-column nav-list h-center">
                    {
                        week.map(
                            (elem, index) =>
                                <li key={index} className={elem.class}><elem.content /></li>
                        )
                    }
                </ul>
            </div>
        </>
    );
}

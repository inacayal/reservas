/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * vistas
 */
import YearCalendar from './vistas/YearCalendar';
import DayCalendar from './vistas/DayCalendar';
import WeekCalendar from './vistas/WeekCalendar';
import MonthCalendar from './vistas/MonthCalendar';
/**
 * constantes
 */
import { DAYS, MONTHS, monthRows, monthIndex } from '../../constantes/DaysMonths';
import {getMonthLength} from '../../utils/Helper';

export const Elements = {
    3 : (parent) => (
        <DayCalendar    data = { parent.props.data }
                        type = { parent.props.type }
                        actions = { parent.props.actions }
                        horarios = { parent.props.horariosReserva }
                        render = { parent.props.dayRender }
                        date = { parent.state.date }
                        verDia = {parent.verDia}
                        fetch= {parent.props.fetchNewMonth}/>
    ),
    2: (parent) => (
        <WeekCalendar   render={parent.props.weekRender}
                        type={parent.props.type}
                        actions={parent.props.actions}
                        date={parent.state.date}
                        changeCurrentWeek={parent.changeWeekCalendar}
                        data={parent.props.data}
                        dataTitle={"Días feriados de " + MONTHS[parent.state.date.getMonth()] + " " + parent.state.date.getFullYear()} />
    ),
    1: (parent) => (
        <MonthCalendar  type={parent.props.type}
                        changeCurrentMonth={parent.changeMonthCalendar}
                        date={parent.state.date}
                        data={parent.props.data}
                        actions={parent.props.actions}
                        verDia={parent.verDia} />
    ),
    0: (parent) => (
        <YearCalendar   handleMonthClick={parent.changeSelectedMonth}
                        changeCurrentYear={parent.changeYearCalendar}
                        date={parent.state.date} />
    )
}

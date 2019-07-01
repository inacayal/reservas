import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Day from './views/Day';
import DayCalendar from './views/DayCalendar';
import WeekCalendar from './views/WeekCalendar';
import MonthCalendar from './views/MonthCalendar';
import ButtonList from '../allUse/ButtonList';
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';
import getMonthLength from '../../../funciones/getMonthLength';

export default class Calendar extends Component {
    constructor(props){
        super(props);
        let date = new Date();
        this.state={
            show:"2",
            date: date,
            controls: [
                {
                    title: "Meses",
                    data: "0",
                    class: "box-transparent highlight-hover h-padding small-v-padding bordered transparent-border"
                },
                {
                    title: "Semanas",
                    data: "1",
                    class: "box-transparent highlight-hover bordered h-padding small-v-padding transparent-border"
                },
                {
                    title: "Días",
                    data: "2",
                    class: "blue-background highlight-border h-padding small-v-padding"
                }
            ]
        };
        this.changeWeekCalendar = this.changeWeekCalendar.bind(this);
        this.changeDayCalendar = this.changeDayCalendar.bind(this);
        this.changeView = this.changeView.bind(this);
    }

    changeView(e){
        let show = e.currentTarget.getAttribute('data');
        let controls = this.state.controls.map(
            (e,i) => {
                e.class = (i == show) ? 
                    "blue-background highlight-border h-padding small-v-padding" :
                    "box-transparent highlight-hover h-padding small-v-padding bordered transparent-border";
                return e;
            }
        );
        this.setState({show:show,controls:controls});
    }

    changeDayCalendar(e) {
        e.preventDefault();
        let offset = parseInt(e.currentTarget.getAttribute('data'));
        let date = new Date(this.state.date);
        date.setDate(date.getDate() + offset);
        this.setState({ date: date });
    }

    changeWeekCalendar(e) {
        e.preventDefault();
        let offset = parseInt(e.currentTarget.getAttribute('data'));
        let date = new Date(this.state.date);
        date.setMonth(date.getMonth() + offset);
        this.setState({date:date});
    }

    render(){
        return(
            <div className="container">
                <div className="row justify-content-end box-padding">
                    <ButtonList
                        clickHandler={this.changeView}
                        displayList="flex-row h-center nav-list no-padding"
                        elems={this.state.controls} />
                </div>
                <div className={(this.state.show === "2") ? "row" : "hidden"}>
                    <DayCalendar 
                        actions={this.props.actions}
                        show={this.state.show === "2"}
                        date={this.state.date}
                        changeCurrentWeek={this.changeDayCalendar}
                        data={this.props.data}
                        dataTitle={"Días feriados de " + MONTHS[this.state.date.getMonth()] + " " + this.state.date.getFullYear()}/>
                </div>
                <div className={(this.state.show === "1") ? "row" : "hidden"}>
                    <WeekCalendar 
                        changeCurrentMonth={this.changeWeekCalendar}
                        show={this.state.show === "2"}
                        date={this.state.date}
                        data={this.props.data}
                        actions={this.props.actions}/>
                </div>
                <div className={(this.state.show === "2") ? "row" : "hidden"}>
                    {/*<MonthCalendar 
                            show={this.state.side}
                            info={this.state.feriados}
                            date={this.state.date}
                            dateChange={this.onDateChange}
                            daySelection={this.paintSelectedDay}/>*/}
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YearCalendar from './views/YearCalendar';
import DayCalendar from './views/DayCalendar';
import WeekCalendar from './views/WeekCalendar';
import MonthCalendar from './views/MonthCalendar';

import ButtonList from '../allUse/ButtonList';
import {MONTHS,monthRows,monthIndex} from '../../../constantes/DaysMonths';

export default class Calendar extends Component {
    constructor(props){
        super(props);
        let date = new Date();
        this.state={
            show:this.props.show,
            date: date,
            controls:this.props.controls
        };
        this.changeWeekCalendar = this.changeWeekCalendar.bind(this);
        this.changeDayCalendar = this.changeDayCalendar.bind(this);
        this.changeView = this.changeView.bind(this);
        this.changeYearCalendar = this.changeYearCalendar.bind(this);
        this.handleMonthClick = this.handleMonthClick.bind(this);
    }

    changeCurrentMonth(date){
        let index = monthIndex[date.getMonth()];
        monthRows[index[0]][index[1]].class = "";
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
        if(this.state.date.getMonth()!==date.getMonth())
            this.changeCurrentMonth(this.state.date);
        this.setState({ date: date });
    }

    changeWeekCalendar(e) {
        e.preventDefault();
        let offset = parseInt(e.currentTarget.getAttribute('data'));
        let date = new Date(this.state.date);
        this.changeCurrentMonth(date);
        date.setMonth(date.getMonth() + offset);
        this.setState({date:date});
    }

    changeYearCalendar(e){
        e.preventDefault();
        let offset = parseInt(e.currentTarget.getAttribute('data'));
        let date = new Date(this.state.date);
        date.setFullYear(parseInt(date.getFullYear())+offset);
        this.setState({date:date});
    }

    /*static getDerivedStateFromProps(props,state){
        console.log(props.show,state.date);
        return {
            show:props.show,
            controls:state.controls,
            date:state.date
        }
    }*/

    handleMonthClick(e){
        e.preventDefault();
        let newMonth = e.currentTarget.getAttribute('data');
        let date = new Date(this.state.date);
        this.changeCurrentMonth(date);
        date.setMonth(newMonth-1);
        let controls = this.state.controls.map(
            (e,i)=> {
                e.class = (i===1) ? 
                    "blue-background highlight-border h-padding small-v-padding":
                    "box-transparent highlight-hover bordered h-padding small-v-padding transparent-border";
                return e;
            }
        )
        this.setState({show:"1",date:date, controls:controls});
    }
    render(){
        return(
            <div className="container">
                <div className="row justify-content-end box-padding">
                    <ButtonList
                        clickHandler={this.changeView}
                        displayList="flex-row h-center nav-list no-padding"
                        elems={this.state.controls} />
                    <DayCalendar
                        horarios={this.props.horariosReserva} 
                        render={this.props.dayRender}
                        show={this.state.show === "3"}
                        data={this.props.data}
                        date={this.state.date}/>
                    <WeekCalendar
                        render={this.props.weekRender}
                        type={this.props.type} 
                        actions={this.props.actions}
                        show={this.state.show === "2"}
                        date={this.state.date}
                        changeCurrentWeek={this.changeDayCalendar}
                        data={this.props.data}
                        dataTitle={"Días feriados de " + MONTHS[this.state.date.getMonth()] + " " + this.state.date.getFullYear()}/>
                    <MonthCalendar 
                        type={this.props.type}
                        changeCurrentMonth={this.changeWeekCalendar}
                        show={this.state.show === "1"}
                        date={this.state.date}
                        data={this.props.data}
                        actions={this.props.actions}/>
                    <YearCalendar
                        handleMonthClick={this.handleMonthClick}
                        show={this.state.show==="0"}
                        changeCurrentYear={this.changeYearCalendar}
                        date={this.state.date}/>
                </div>
            </div>
        );
    }
}
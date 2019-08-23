/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import {Elements} from './Elements';
import ButtonList from '../basic/ButtonList';
/**
 * constantes
 */
import {DAYS,MONTHS,monthRows,monthIndex} from '../../constantes/DaysMonths';
import getMonthLength from '../../funciones/getMonthLength';

export default class Agenda extends Component {
    constructor(props){
        super(props);
        this.state={
            show:this.props.show,
            date: this.props.date,
            controls:this.props.controls
        };
        this.changeWeekCalendar = this.changeWeekCalendar.bind(this);
        this.changeMonthCalendar = this.changeMonthCalendar.bind(this);
        this.changeView = this.changeView.bind(this);
        this.changeYearCalendar = this.changeYearCalendar.bind(this);
        this.handleMonthClick = this.handleMonthClick.bind(this);
    }

    changeCurrentMonth(date,offset){
        let index = monthIndex[this.state.date.getMonth()],
            isPrev = offset <0; 

        date.setDate(
            isPrev 
                ? date.getDate() + offset + (6 - date.getDay())
                : date.getDate() + offset - date.getDay()
        );

        if (this.state.date.getMonth() !== date.getMonth()){
            date.setDate(isPrev ? getMonthLength(date.getMonth()+1,date.getFullYear()) : 1);
            monthRows[index[0]][index[1]].class = "";
            this.props.fetchNewMonth(date);
        }
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

    changeWeekCalendar (e) {
        e.preventDefault();
        let offset = parseInt(e.currentTarget.getAttribute('data'));
        let date = new Date(this.state.date);
        this.changeCurrentMonth(date,offset);
        this.setState({ date: date });
    }

    changeMonthCalendar (e) {
        e.preventDefault();
        let offset = parseInt(e.currentTarget.getAttribute('data'));
        let date = new Date(this.state.date);
        date.setMonth(date.getMonth() + offset);
        this.changeCurrentMonth(date,offset);
        this.setState({date:date});
    }

    changeYearCalendar (e) {
        e.preventDefault();
        let offset = parseInt(e.currentTarget.getAttribute('data'));
        let date = new Date(this.state.date);
        date.setFullYear(parseInt(date.getFullYear())+offset);
        this.setState({date:date});
    }

    handleMonthClick (e) {
        e.preventDefault();
        let newMonth = e.currentTarget.getAttribute('data');
        let date = new Date(this.state.date);
        date.setMonth(newMonth-1);
        this.changeCurrentMonth(date);
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

    componentDidUpdate(prevProps){
        if (
            (
                prevProps.date !== this.props.date 
                || prevProps.show !== this.props.show
            ) && this.props.type==='reservas'
        )
            this.setState({ date: this.props.date, show: this.props.show});
    }

    render(){
        return(
            <div className="container">
                <div className="row justify-content-end v-padding">
                    <ButtonList
                        clickHandler={this.changeView}
                        displayList="flex-row h-center nav-list no-padding"
                        elems={this.state.controls} />
                </div>
                <div className="row">
                    {Elements[this.state.show](this)}
                </div>
            </div>
        );
    }
}
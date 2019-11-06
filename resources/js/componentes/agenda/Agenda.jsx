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
import { evaluateDateChange, getMonthLength} from '../../utils/Helper';

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
        this.verDia = this.verDia.bind(this);
    }

    verDia(e) {
        e.preventDefault();
        let day = parseInt(e.currentTarget.getAttribute('data')),
            date = this.state.date.setDate(day);
        this.state.controls[this.state.show].class = "box-transparent highlight-hover h-padding small-v-padding bordered transparent-border";
        this.setState({ show: "3", date: new Date(date)});
    }

    changeView(e){
        let show = e.currentTarget.getAttribute('data'),
            controls = this.state.controls;
        controls[this.state.show].class = "box-transparent highlight-hover h-padding small-v-padding bordered transparent-border";
        this.setState({show,controls});
    }

    changeWeekCalendar (e) {
        e.preventDefault();
        let offset = parseInt(e.currentTarget.getAttribute('data'));
        let date = new Date(this.state.date);
        evaluateDateChange(date,offset,this.props.fetchNewMonth,null);
        this.setState({ date: date });
    }

    changeMonthCalendar (e) {
        e.preventDefault();
        let offset = parseInt(e.currentTarget.getAttribute('data'));
        let date = new Date(this.state.date);
        date.setMonth(date.getMonth() + offset);
        evaluateDateChange(date, offset, this.props.fetchNewMonth,null);
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
        let newMonth = e.currentTarget.getAttribute('data'),
            date = new Date(this.state.date);
        date.setMonth(newMonth-1);
        evaluateDateChange(date, 0, this.props.fetchNewMonth,null);
        this.setState({show:"2",date:date});
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
        this.state.controls[this.state.show].class = "blue-background highlight-border h-padding small-v-padding" ;
        return(
            <>
                <div className="row justify-content-end v-padding">
                    <ButtonList
                        clickHandler={this.changeView}
                        displayList="flex-row h-center nav-list no-padding"
                        elemClass="box-transparent highlight-hover h-padding small-v-padding bordered transparent-border"
                        elems={Object.values(this.state.controls)} />
                </div>
                <div className="row">
                    {Elements[this.state.show](this)}
                </div>
            </>
        );
    }
}

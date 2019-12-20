import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Elements} from './Elements';
import ButtonList from '../basic/ButtonList';
import {DAYS,MONTHS,monthRows,monthIndex} from '../../constantes/DaysMonths';
import { getMonthLength} from '../../utils/Helper';
import {evaluateDateChange} from '../../utils/Helper';
import {WaitsLoading} from '../../hocs/DataHandler';

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
        this.changeYearCalendar = this.changeYearCalendar.bind(this);
        this.changeSelectedMonth = this.changeSelectedMonth.bind(this);
        this.changeView = this.changeView.bind(this);
        this.verDia = this.verDia.bind(this);
    }

    static contextType = WaitsLoading;

    verDia(e) {
        e.preventDefault();
        let day = parseInt(e.currentTarget.getAttribute('data')),
            date = this.state.date.setDate(day);
        this.setState({ show: "3", date: new Date(date)});
    }

    changeView(e){
        let show = e.currentTarget.getAttribute('data'),
            controls = this.state.controls;
        this.setState({show});
    }

    changeWeekCalendar (e) {
        e.preventDefault();
        const offset = parseInt(e.currentTarget.getAttribute('data')),
            date = new Date(this.state.date),
            change = offset < 0
            ?
                {
                    o: new Date(this.state.date),
                    n: new Date(date.setDate(date.getDate() + offset + (6 - date.getDay()))),
                    m: getMonthLength(date.getMonth() + 1, date.getFullYear())
                }
            :
                {
                    o: new Date(this.state.date),
                    n: new Date(date.setDate(date.getDate() + offset - date.getDay())),
                    m: 1
                };

        evaluateDateChange(
            change,
            this.context,
            this.setState.bind(this),
            `/${this.props.endpoint}`,
            "2",
            this.props.endpoint
        );
    }

    changeMonthCalendar (e) {
        e.preventDefault();
        const offset = parseInt(e.currentTarget.getAttribute('data')),
            date = new Date(this.state.date),
            change = {
                o: new Date(date),
                n: new Date(date.setMonth(date.getMonth() + offset)),
                m: 1
            };
        evaluateDateChange(
            change,
            this.context,
            this.setState.bind(this),
            `/${this.props.endpoint}`,
            "1",
            this.props.endpoint
        );
    }

    changeSelectedMonth(e){
        e.preventDefault();
        const month = parseInt(e.currentTarget.getAttribute('data')),
            date = this.state.date,
            change = {
                o: new Date(date),
                n: new Date(date.setMonth(month-1)),
                m: 1
            };
        evaluateDateChange(
            change,
            this.context,
            this.setState.bind(this),
            `/${this.props.endpoint}`,
            "1",
            this.props.endpoint
        );
    }

    changeYearCalendar (e) {
        e.preventDefault();
        const offset = parseInt(e.currentTarget.getAttribute('data')),
            date = new Date(this.state.date),
            change = {
                o: new Date(date),
                n: new Date(date.setFullYear(parseInt(date.getFullYear())+offset)),
                m: 1
            };
        evaluateDateChange(
            change,
            this.context,
            this.setState.bind(this),
            `/${this.props.endpoint}`,
            "1",
            this.props.endpoint
        );
    }

    componentDidUpdate(prevProps){
        if (
            (
                prevProps.date !== this.props.date
                || prevProps.show !== this.props.show
            ) && this.props.type==='reservas'
        ) {
            this.setState({ date: this.props.date, show: this.props.show});
        }
    }

    render(){
        return(
            <>
                <div className="row justify-content-end v-padding">
                    <ButtonList selected = {this.state.show}
                                selectedClass="blue-background highlight-border h-padding small-v-padding"
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

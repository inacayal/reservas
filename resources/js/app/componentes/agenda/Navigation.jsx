import React, {
    Component,
    useState,
    useContext,
    useRef,
    useEffect
 } from 'react';
import {withRouter} from 'react-router';
import {MONTHS} from '../../constantes/DaysMonths';
import {Select} from '../input/Select';
import ButtonList from '../basic/ButtonList';
import Search from '../search/Search';
import {getMonthLength} from '../../utils/Helper';

const generateDays =
    (month,year) => (
        Array.from(Array(getMonthLength(month,year)+1).keys()).reduce(
            (t,x) => {
                if (x)
                    t[x] = x;
                return t;
            },{}
        )
    );

const generateYears = () => (
    Array.from(Array(10).keys()).reduce(
        (t,x) => {
            t[2018+x] = 2018+x;
            return t;
        },{}
    )
);

export default function Navigation (props){
    const date = new Date( props.date ),
        day = {
            name: "date",
            selected: date.getDate(),
            list: generateDays(date.getMonth(),date.getFullYear())
        },
        month = {
            name: "month",
            selected: date.getMonth(),
            list: MONTHS
        },
        year = {
            name: "year",
            selected: date.getFullYear(),
            list:generateYears()
        };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className={props.fromGraphic ? "col-md-12 text-left no-padding" : "col-md-5 no-padding"}>
                    <div className="inline-block margin-box text-super v-padding m-font " style={{marginLeft:"0"}}>
                        Mostrando
                    </div>
                    {
                        !props.hideDate
                        ?
                            <>
                                <div className="inline-block margin-box ten">
                                    <Select titulo="día"
                                        changeSelect={props.changeDate}
                                        errors={[]}
                                        {...day}/>
                                </div>
                                <div className="inline-block margin-box text-super v-padding m-font ">
                                    de
                                </div>
                            </>
                        :
                            <></>
                    }
                    <div className="inline-block margin-box thirty">
                        <Select titulo="mes"
                            changeSelect={props.changeMonth}
                            errors={[]}
                            {...month}/>
                    </div>
                    <div className="inline-block margin-box text-super v-padding m-font ">
                        del
                    </div>
                    <div className="inline-block margin-box twenty">
                        <Select titulo="año"
                            changeSelect={props.changeYear}
                            errors={[]}
                            {...year}/>
                    </div>
                </div>
                {
                    !props.hide
                    ?
                        <div className="col-md-3 flex h-center">
                            <ButtonList selected = {props.show}
                                selectedClass="blue-background highlight-border small-v-padding"
                                clickHandler={props.changeView}
                                displayList="flex-row nav-list no-padding align-center"
                                elemClass="background-border highlight-hover small-v-padding bordered"
                                elems={props.controls} />
                        </div>
                    :
                        <></>
                }
                {
                    !props.hideSearch
                    ?
                        <div className="col-md-4 flex no-padding">
                            <Search route={props.route}/>
                        </div>
                    :
                        <></>

                }
            </div>
        </div>
    )
}

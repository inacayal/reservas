import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonList from './ButtonList';
import generateWeek from '../../funciones/generateWeek';
import weekNavigation from '../../funciones/weekNavigation';

function WeeklyCalendar (props){
    //show current week as it goes, highlighting today
    //pass today in props
    var sideTitles = weekNavigation(props);
    let [week,feriados] = generateWeek(props.date,props.offset,props.data);
    return (
        <div className={props.show ? "container" : "hidden"}>
            <ButtonList 
                clickHandler={props.click}
                displayList="flex-row h-center nav-list"
                elems={week} 
                container="nav-reserva no-padding"/>
            <ButtonList
                displayList="flex-row nav-list"
                elemClass="box-transparent"
                container="half"
                clickHandler={props.changeCurrentWeek}
                elems={sideTitles}/>
            <div className="padding-box">
                <div className="highlight-title">{props.dataTitle}</div>
                <ButtonList
                    clickHandler={props.clickInfo}
                    displayList="flex-column h-center nav-list no-padding"
                    elems={feriados}
                    container={props.elemClass} />
            </div>
        </div> 
    );
}
export default React.memo(WeeklyCalendar);
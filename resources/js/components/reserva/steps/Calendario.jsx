import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

function Calendario(props) {
    return (
        <div className={(props.show) ? "align-center" : "hidden"}>
            <h1 className="highlight-title">¿Qué dia quieres reservar?</h1>
            <input type="date" value={props.value} className="hidden"/>
            <Calendar value={props.value} onChange={props.onChange}/>
        </div>
    );
}
export default Calendario;

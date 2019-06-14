import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//holds reservation state

function Select(props) {
    const options = Object.keys(props.list).map(function(ind) {
        return <li keyvalue={ind} name={props.name} onClick={props.change} className={(ind === props.selected) ? "option selected" : "option"}>{props.list[ind]}</li>
    });
    return (
        <div>
            <select name={props.name} className="hidden" >
                <option value={props.selected}></option>
            </select> 
            <label htmlFor={props.name} className="select">
                <div className={(props.show) ? "flex-row bottom-transparent" : "border-box flex-row"} onClick={props.toggle} name={props.name}>
                    <div className="select-title">{(props.selected) ? props.list[props.selected] : props.titulo}</div>
                    <div className="margin-left"><i className="highlight fas fa-angle-down"></i></div>
                </div>
                <ul className={(props.show) ? "option-list" : "hidden"}>{options}</ul> 
            </label>
        </div>
    );
}
export default Select;
/**
 * react basic
 */
import React, {Component,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
/**
 * 
 * @param {*} e 
 * handler
 */
export function showOptions(select) {
    const selectMimic = Object.assign({},select);
    selectMimic.show = !selectMimic.show;
    return selectMimic;
}
/**
 * 
 * @param {*} e 
 * component
 */
export function selectOption(select,value) {
    const selectMimic = Object.assign({}, select);
    selectMimic.selected = (value !== selectMimic.selected) ? value : null;
    return selectMimic;
}
const noMemoSelect = (props) => {
    const 
        selectOption = (select, value) => {
            const selectMimic = Object.assign({}, select);
            selectMimic.selected = (value !== selectMimic.selected) ? value : null;
            changeSelect(selectMimic);
        },
        showOptions = (select) => {
            const selectMimic = Object.assign({}, select);
            selectMimic.show = !selectMimic.show;
            changeSelect(selectMimic);
        },
        [select,changeSelect] = (props.changeSelect) 
            ? [props.select,props.changeSelect] 
            : useState(props.select);
    
    useEffect (
        () => {
            if (select.show)
                select.input.current.focus();
        },[select.show]
    );

    return(
        <div className="relative" style={select.show ? { zIndex: 2 } : { zIndex: 0}}>
            <select name={select.name} className="hidden" disabled ={select.readOnly}>
                <option defaultValue={select.selected}></option>
            </select>
            <label htmlFor={select.name} className="select inherit-width">
                <div className={(select.show) ? "full-width flex-row relative" : "full-width relative border-bottom top-padding flex-row"} onClick={() => showOptions(select)} select={ select.name}>
                    <div className="select-title">
                        <span className={(select.show) ? "hidden" : ""}>{(select.selected) ? select.list[select.selected] : props.titulo}</span>
                        <input type="text" defaultValue={(select.selected) ? select.list[select.selected] : select.search} ref={select.input} onBlur={() => showOptions(select) } className={(select.show) ? "" : "hidden"} select={select.name} />
                    </div>
                    <div className="margin-left v-align-center"><i className={(select.show) ? "fas fa-search" : "fas fa-angle-down"} style={{ color:"#bfbfbf"}}></i></div>
                </div>
                <div className="absolute full-width">
                    <ul className={(select.show) ? "option-list box-shadow max-height" : "hidden"} >
                        {
                            Object.keys(select.list).map(function (ind) {
                                return <li key={ind} keyvalue={ind} select={select.name} onMouseDown={(e) => selectOption(select, e.currentTarget.getAttribute('keyvalue'))} className={(ind === select.selected) ? "option selected" : "option"}>{select.list[ind]}</li>;
                            })
                        }
                    </ul>
                </div>
            </label>
        </div>
    );
}

export const Select = React.memo(noMemoSelect);
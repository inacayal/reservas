/**
 * react basic
 */
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


const noMemoMultipleSelect = (props) => {
    const
        [select, changeSelect] = (props.changeSelect)
            ? [props.select, props.changeSelect]
            : useState(props.select),
        [hover,changeHover] = useState(""),
        selectOption = (select, value) => {
            const 
                selectMimic = Object.assign({}, select);
            let 
                list = selectMimic.selected,
                index = selectMimic.selected.indexOf(value);

            if (index !== -1) {
                list = excludeOption(list,index);
            } else
                list.push(value);

            selectMimic.selected = list;
            changeSelect(selectMimic);
        },
        showOptions = (select) => {
            const selectMimic = Object.assign({}, select);
            selectMimic.show = !selectMimic.show;
            changeSelect(selectMimic);
        },
        excludeOption = (
            list,
            index
        ) => {
            let excerpt = [];
            excerpt = list.splice(0, index);
            return excerpt.concat(list.splice(1, list.length - 1));
        };

    useEffect(
        () => {
            if (select.show)
                select.input.current.focus();
        }, [select.show]
    );

    return (
        <div 
            className="relative"
            style={
                select.show 
                    ? { zIndex: 2 } 
                    : { zIndex: 0 }
            }>
            <ul className="nav-list no-padding full-width justify-text">
                {
                    select.selected.map(
                        (e,i) => 
                            <li 
                                key={i}
                                className="bold highlight-title inline-block side-margin small-v-margin smaller-text button-border border-box">
                                <i
                                    onClick={(e) => {
                                        const selectMimic = Object.assign({}, select);
                                        selectMimic.selected = excludeOption(
                                            select.selected, 
                                            select.selected.indexOf(e.currentTarget.getAttribute('keyvalue'))
                                        );
                                        changeSelect(selectMimic);
                                    }}
                                    className="fas fa-times pointer"
                                    style={{ color: "#bfbfbf",paddingRight:"5px" }} />
                                {props.optionData[e].nombre}
                            </li>
                    )
                }
            </ul>
            <select 
                name={select.name} 
                className="hidden" 
                disabled={select.readOnly}>
                <option 
                    defaultValue={select.selected.join(',')}/>
            </select>
            <label 
                htmlFor={select.name} 
                className="select inherit-width">
                <div 
                    className={
                        (select.show) 
                            ? "full-width flex-row relative" 
                            : "full-width relative border-bottom flex-row"
                    } 
                    onClick={
                        (select.show) 
                            ? () => false 
                            : () => showOptions(select)
                    } 
                    select={select.name}>
                    <div 
                        className="select-title">
                        <span 
                            className={
                                (select.show) 
                                ? "hidden" 
                                : ""
                            }>
                            {
                                (select.selected.length>0) 
                                    ? select.selected.length + " "+select.name + " seleccionados"
                                    : props.titulo
                            }
                        </span>
                        <input 
                            type="text" 
                            defaultValue={
                                select.search 
                                    ? select.search 
                                    : ""
                            }
                            ref={select.input} 
                            className={
                                (select.show) 
                                    ? "" 
                                    : "hidden"
                            } 
                            select={select.name} />
                    </div>
                    <div 
                        className="margin-left v-align-center">
                        <i 
                            onClick={() => showOptions(select)} 
                            className={
                                (select.show) 
                                    ? "fas fa-times" 
                                    : "fas fa-angle-down"
                            } 
                            style={{ color: "#bfbfbf" }}/>
                    </div>
                </div>
                <div className="absolute full-width">
                    <ul className={
                        (select.show) 
                            ? "option-list box-shadow max-height" 
                            : "hidden"
                        }>
                        {
                            Object.values(props.optionData).map(
                                (e, ind) => {
                                    return (
                                        <li 
                                            key={ind} 
                                            keyvalue={e.id} 
                                            select={select.name} 
                                            onMouseDown={
                                                (e) => 
                                                    selectOption(
                                                        select, 
                                                        e.currentTarget.getAttribute('keyvalue')
                                                    )
                                            } 
                                            className={
                                                (select.selected.indexOf(e.id.toString()) !== -1) 
                                                    ? "option selected" 
                                                    : "option"
                                            }>
                                            {e.nombre}
                                        </li>
                                    )
                                }
                            )
                        }
                    </ul>
                </div>
            </label>
        </div>
    );
}

export const MultipleSelect = React.memo(noMemoMultipleSelect);
/**
 * react basic
 */
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
/**
 * react router
 */
import Actions from '../componentes/basic/Actions';

export const ExpandableComponent = (props) => {
    let buttons = props.buttons||[];
    const   [more,toggle] = useState(props.show),
            title = more
            ?
                <div className="smaller-text text bold">
                    menos <i className="fas fa-minus-circle inline-box side-margin" />
                </div>
            :
                <div className="smaller-text text bold">
                    más <i className="fas fa-plus-circle inline-box side-margin" />
                </div>,
            action = [
                {
                    title:title,
                    click: (e) =>{
                        e.preventDefault();
                        toggle(!more);
                    }
                }
            ];

    if (buttons.length>0)
        buttons = buttons.concat(action);
    else
        buttons = action;

    return (
        <div className="container v-padding" style={{paddingLeft:"0",paddingRight:"0"}}>
            <div className="row mid-title ">
                <div className="col-md-6 no-padding">
                    {props.title}
                </div>
                <div className="col-md-6 text-right no-padding">
                    <Actions links={props.links} buttons={buttons}/>
                </div>
            </div>
            <div className={more ? "row" : "hidden"}>
                <div className="container">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

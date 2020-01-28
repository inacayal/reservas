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
        <div className="container-fluid no-padding">
            <div className="row mid-title ">
                <div className="col-md-8">
                    {props.title}
                </div>
                <div className="col-md-4 text-right">
                    <Actions links={props.links} buttons={buttons}/>
                </div>
            </div>
            <div className={more ? "container-fluid" : "hidden"}>
                {props.children}
            </div>
        </div>
    )
}

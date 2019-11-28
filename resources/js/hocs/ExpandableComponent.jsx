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
    const [more,toggle] = useState(props.show),
        title = more
        ?
            <div className="smaller-text text bold">
                menos <i className="fas fa-minus-circle inline-box side-margin" />
            </div>
        :
            <div className="smaller-text text bold">
                más <i className="fas fa-plus-circle inline-box side-margin" />
            </div>,
        action = [{
            title:title,
            click: (e) =>{
                e.preventDefault();
                toggle(!more);
            }
        }];
    return (
        <div className="container no-padding ">
            <div className="row sub-title bold top-padding">
                <div className="col-md-6 no-padding">
                    {props.title}
                </div>
                <div className="col-md-6 text-right no-padding">
                    <Actions links={props.links} buttons={action}/>
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

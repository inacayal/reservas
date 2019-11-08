/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * navigation
 */
import BreadCrumb from '../componentes/control/BreadCrumb';
import Lateral from '../escritorio/Lateral';

//holds reservation state
export default function MainFrame (props) {
    const current = window.location.href.replace(/((http:\/\/|https:\/\/)localhost\/|\/$)/gi, '');
    return (
        <div className="row">
            <div className="col-md-3 no-padding">
                <Lateral
                    current={props.current}
                    items={sidebar}/>
            </div>
            <div className="col-md-9 container-fluid background-border" style={{height:"85vh"}}>
                <div className="row extra-box-padding">
                    <BreadCrumb items={current.split('/')}/>
                </div>
                <div className="row extra-h-padding" style={{height:'90%'}}>
                    <div className="col-md-12 container-fluid white-background h-overflow-auto"  style={{height:'100%'}}>
                        <props.render
                            {...props} />
                    </div>
                </div>
            </div>
        </div>
    );
}

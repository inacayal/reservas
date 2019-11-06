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
            <div className="col-md-2 no-padding border-right">
                <Lateral
                    current={props.current}
                    items={sidebar}/>
            </div>
            <div className="col-md-10 container-fluid">
                <div className="row">
                    <BreadCrumb
                        items={current.split('/')}/>
                </div>
                <div className="row medium-left-padding">
                    <div className="col-md-12 container-fluid v-padding">
                        <props.render
                            {...props} />
                    </div>
                </div>
            </div>
        </div>
    );
}

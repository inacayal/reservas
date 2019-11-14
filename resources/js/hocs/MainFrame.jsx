/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    useRouteMatch,
    useLocation
} from 'react-router-dom';
/**
 * navigation
 */
import BreadCrumb from '../componentes/control/BreadCrumb';
import Lateral from '../escritorio/Lateral';
import RouterTransition from './RouterTransition';

const searchHandler = (handlerArray,path) =>
    handlerArray.filter((c,i) => {
        if (path.match(c.match))
            return c;
    });

export default function MainFrame (props) {
    const current = window.location.href.replace(/((http:\/\/|https:\/\/)localhost\/|\/$)/gi, ''),
        location = useLocation(),
        [routeData] = searchHandler(props.handlers,location.pathname);
    return (
        <div className="row">
            <div className="col-md-2 no-padding">
                <Lateral
                    current={props.current}
                    items={sidebar}/>
            </div>
            <div className="col-md-10 container-fluid background-border" style={{height:"85vh"}}>
                <div className="row extra-box-padding">
                    <BreadCrumb items={current.split('/')}/>
                </div>
                <div className="row extra-h-padding" style={{height:'87.5%'}}>
                    <div className="col-md-12 container-fluid white-background no-padding" style={{height:'100%'}}>
                        <RouterTransition
                            dataConfig = {routeData}
                            routeConfig={{...useRouteMatch(routeData.endpoint)}}>
                            {props.children}
                        </RouterTransition>
                    </div>
                </div>
            </div>
        </div>
    );
}

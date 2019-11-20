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
import Profile from '../componentes/control/Profile';
import {RouterTransition} from './RouterTransition';

export const searchHandler = (handlerArray,path) => {
    const handler = handlerArray.filter((c,i) => {
        if (path.match(c.match))
            return c;
    });
    return handler[0];
}

const searchRoute = (handler) => {
    return useRouteMatch(handler.endpoint);
}

export default function MainFrame (props) {
    const location = useLocation(),
        handler =searchHandler(props.handlers,location.pathname),
        route = searchRoute(handler);
    return (
        <div className="row" style={{height:'95%',borderRadius:"5px",overflow:'hidden'}}>
            <RouterTransition
                url={window.location.href.replace(/((http:\/\/|https:\/\/)localhost\/|\/$)/gi, '')}
                sidebarElem={props.current}
                route={route}
                location={location.pathname}
                handlerArray = {props.handlers}>
                {props.children}
            </RouterTransition>
            <div className="col-md-2 hidden-sm white-background">
                <Profile />
            </div>
        </div>
    );
}

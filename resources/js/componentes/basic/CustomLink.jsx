import React, { Component,useContext } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {WaitsLoading} from '../../hocs/RouterTransition';

const waitCallback = (
    ev,
    {to,params,route},
    contextCallback
) => {
    ev.preventDefault();
    contextCallback(to,route);
}

function CustomLink(props) {
    const context = useContext(WaitsLoading),
        params = props.params;
    return (
        <Link to={params.to} onClick={(ev) => waitCallback(ev,params,context)}>
            {props.children}
        </Link>
    );
}
export default React.memo(CustomLink);

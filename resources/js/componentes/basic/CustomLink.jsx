import React, { Component,useContext } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {WaitsLoading} from '../../hocs/DataHandler';

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
        <Link to={params.to}>
            {props.children}
        </Link>
    );
}
// onClick={(ev) => waitCallback(ev,params,context)}>
export default React.memo(CustomLink);

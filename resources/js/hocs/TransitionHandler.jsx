import React, {
    Component,
} from 'react';
import ReactDOM from 'react-dom';

let children = null;

function TransitionHandler (props) {
    children = props.dataRendered
        ? props.children
        : children;
    return (<>{children}</>)
}
export default React.memo(TransitionHandler);

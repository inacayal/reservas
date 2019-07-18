import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonList from '../complex/allUse/ButtonList';

function BreadCrumb(props) {
    return (
        <div className="full-width">
            <ButtonList
                clickHandler={props.change}
                displayList="nav-list no-padding flex-row"
                container="inline-block v-align-center v-padding"
                elems={props.items} />
        </div>
    );
}
export default BreadCrumb;

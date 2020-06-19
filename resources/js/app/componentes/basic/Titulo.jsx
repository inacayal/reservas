/**
 * react basic
 */
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import ButtonList from './ButtonList';
import Actions from './Actions';

export default function Titulo (props){
    return (
        <>
            <h1 className="inline-block no-margin"
                style={{overflow:"hidden",verticalAlign:"bottom"}}>
                {props.title}
            </h1>
            <div className="inline-block">
                <Actions links={props.links}
                    buttons={props.buttons}
                    toggle={props.changeView}/>
            </div>
        </>
    );
}

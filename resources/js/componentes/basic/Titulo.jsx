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
        <div className="container-fluid">
            <div className="row">
                <div    className="col-md-6 c-title no-padding"
                        style={{overflow:"hidden"}}>
                    {props.title}
                </div>
                <div className="col-md-6 text-right no-padding" >
                    <Actions    links={props.links}
                                buttons={props.buttons}/>
                </div>
            </div>
        </div>
    );
}

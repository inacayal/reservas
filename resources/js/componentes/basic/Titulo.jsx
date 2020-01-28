/**
 * react basic
 */
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import ButtonList from './ButtonList';
import Actions from './Actions';
import {Toggle} from '../input/Toggle';

export default function Titulo (props){
    const config = props.changeView;
    return (
        <div className="container-fluid">
            <div className="row">
                <div    className="col-md-6 c-title no-padding"
                        style={{overflow:"hidden"}}>
                    {props.title}
                </div>
                <div className="col-md-6 text-right no-padding align-center">
                    {
                        config
                        ?
                            <Toggle rightTitle={config.left}
                                    leftTitle={config.right}
                                    side={config.side}
                                    changeSide={config.change}/>
                        : <></>
                    }
                    <Actions    links={props.links}
                                buttons={props.buttons}/>
                </div>
            </div>
        </div>
    );
}

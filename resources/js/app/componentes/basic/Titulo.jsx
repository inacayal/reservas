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
        {
            props.alignEnd
            ?
                <div className="container-fluid">
                    <div className="row justify-content-between">
                        <h1 className="inline-block no-margin"
                            style={{overflow:"hidden",verticalAlign:"bottom"}}>
                            {props.title}
                        </h1>
                        <div className="inline-block">
                            <Actions links={props.links}
                                buttons={props.buttons}
                                toggle={props.changeView}/>
                        </div>
                    </div>
                </div>
            :
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
        }
        </>
    );
}

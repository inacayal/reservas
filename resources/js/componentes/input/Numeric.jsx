/**
 * react basic
 */
import React, {
    Component,
    useState
} from 'react';
import DisplaysErrors from '../../hocs/DisplaysErrors';
import ReactDOM from 'react-dom';

function noMemoNumeric(props) {
    console.log('render')
    const   hasError = props.hasError;
    return (
        <div className="full-width">
            <h6 className={
                props.description
                ? "highlight bold no-margin"
                : "highlight bold"}>
                {props.titulo}
            </h6>
            {props.description||""}
            <div className={
                hasError
                    ? "light-input error-box error"
                    : "light-input "
                }>
                <input  type="number"
                        name={props.name}
                        placeholder={props.holder}
                        className={
                            hasError && props.value !==''
                                ? "full-width box-transparent error"
                                : "full-width box-transparent"
                        }
                        onChange={props.changeHandler}
                        value={props.value}
                        needsvalue={1}/>
            </div>
        </div>
    );
}

const Number = React.memo(noMemoNumeric);

export const Numeric = (props) => (
    <DisplaysErrors errors = {props.errors}>
        <Number titulo={props.titulo}
                holder={props.holder}
                name={props.name}
                value={props.value}
                changeHandler={props.changeHandler}/>
    </DisplaysErrors>
)

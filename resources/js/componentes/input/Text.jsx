/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 *
 * @param {*} props
 * component
 */
const noMemoText = (props) => {
    const hasError = (props.errors||[]).length>0;
    return (
        <div className="full-width">
            <h6 className="highlight bold">{props.titulo}</h6>
            <div className={hasError ? "light-input error-box error" : "light-input "}>
                <textarea
                    name={props.name}
                    rows={props.rows}
                    readOnly = {props.readOnly}
                    placeholder={props.holder}
                    className={hasError && props.errors[0].type!=='required' ? "full-width box-transparent error" : "full-width box-transparent"}
                    onChange={props.changeHandler}
                    value={props.value}/>
            </div>
            {
                hasError
                ?
                    <ul className="nav-list no-padding">
                        {
                            props.errors.map(
                                (e,i) => <li key={i} className="smaller-text error">{e.description}</li>
                            )
                        }
                    </ul>
                :
                    <></>
            }
        </div>
    );
}
export const Text = React.memo(noMemoText);

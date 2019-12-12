
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {searchErrors} from '../hocs/Validator';

export function displayGetRequestErrors(error){
    const errorMessage = error.response ? error.response : error;
    //console.log(errorMessage)
    this.props.displayMessage({
        message:{
            data:(
                <div className="h-padding">
                    <div className="inline-block ">
                        <span className="side-margin bold">código</span>
                        <span className="side-margin bold">{(errorMessage||{}).status||504}</span>
                    </div>
                    <div className="inline-block side-margin">
                        {(errorMessage||{}).statusText||errorMessage+''}
                    </div>
                </div>
            ),
            title:(
                <>
                    <i className="far fa-exclamation-triangle bold sub-title side-margin" />
                    <span className="side-margin">Errores</span>
                </>
            ),
            type:'failure'
        }
    });
}


export function displayFrontendErrors ([hasErrors,errors]){
    this.setState(
        {errors},
        () =>
            this.context({
                message:{
                    data:(
                        <ul className="h-padding nav-list">
                            {hasErrors}
                        </ul>
                    ),
                    title:(
                        <>
                            <i className="far fa-exclamation-triangle bold sub-title side-margin" />
                            <span className="side-margin">Errores</span>
                        </>
                    ),
                    type:'failure',
                    update:false
                }
            })
    );
}

function rewriteErrors (errors) {
    return Object.keys(errors).reduce(
        (tot,cur) => {
            const ind = cur.match(/\./gi)
                ? cur.split('.')[0]
                : cur;
            if (tot[ind])
                tot[ind].push(errors[cur][0]);
            else
                tot[ind] = [errors[cur][0]]
            return tot;
        },
        {}
    )
}

export function displayBackendErrors(errors){
    if (errors.response.data.errors){
        const   rewrittenErrors = rewriteErrors(errors.response.data.errors),
                [hasErrors,err] = searchErrors(
                    rewrittenErrors,
                    this.state.validation,
                    this.state.form
                );
        this.requestSent(
            false,
            this.displayFrontendErrors([hasErrors,err])
        )
    } else
        this.context({
            message:{
                data:errors.response.data,
                type:'failure',
                update:false
            }
        });
}

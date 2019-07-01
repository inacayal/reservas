import React, { Component } from 'react';
import ReactDOM from 'react-dom';
export default function generateActions(hasEvents,actions,data){
    return (hasEvents) ? [
        {
            title: (
                <div className="smaller-text text-center">
                    <i className="fas fa-eye inline-box side-margin" />
                </div>
            ),
            click: actions.ver,
            data: data
        },
        {
            title: (
                <div className="smaller-text text-center">
                    <i className="fas fa-pen inline-box side-margin" />
                </div>
            ),
            click: actions.editar,
            data: data
        },
        {
            title: (
                <div className="smaller-text text-center">
                    <i className="fas fa-trash inline-box side-margin" />
                </div>
            ),
            click: actions.eliminar,
            data: data
        }
    ] : [
        {
            title: (
                <div className="smaller-text">
                    <i className="fas fa-plus-circle inline-box side-margin" />
                </div>
            ),
            click: actions.agregar,
            data: data
        }
    ]
}
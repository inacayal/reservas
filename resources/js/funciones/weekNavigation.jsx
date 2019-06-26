import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default function weekNavigation (props){
    return [
        {
            title: (
                <div>
                    <i className="line-v-middle highlight middle-font fas fa-angle-left" />
                    <span className="text ">{" ver la semana anterior"}</span>
                </div>
            ),
            data: String(parseInt(props.offset) - 7)
        },
        {
            title: (
                <div>
                    <span className="text">{"ver próxima semana "}</span>
                    <i className="line-v-middle middle-font highlight fas fa-angle-right" />
                </div>
            ),
            data: String(parseInt(props.offset) + 7),
            container: "half text-right"
        }
    ];
}
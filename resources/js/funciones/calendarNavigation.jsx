import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default function calendarNavigation (offset,titulo){
    return [
        {
            title: (
                <div>
                    <i className="line-v-middle highlight middle-font fas fa-angle-left" />
                    <span className="text ">{titulo+" anterior"}</span>
                </div>
            ),
            data: String(offset.left),
            container:"half"
        },
        {
            title: (
                <div>
                    <span className="text">{titulo+" siguiente"}</span>
                    <i className="line-v-middle middle-font highlight fas fa-angle-right" />
                </div>
            ),
            data: String(offset.right),
            container: "half text-right"
        }
    ];
}
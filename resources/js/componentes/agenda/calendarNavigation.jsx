import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default function calendarNavigation (offset,titulo){
    return [
        {
            title: (
                <div>
                    <i className="line-v-middle highlight middle-font fas fa-angle-left side-margin inline-block" />
                    <span className="side-margin inline-block bold">
                        {`${titulo} anterior`}
                    </span>
                </div>
            ),
            data: String(offset.left),
            container:"half"
        },
        {
            title: (
                <div>
                    <span className="side-margin inline-block bold">
                        {`${titulo} siguiente`}
                    </span>
                    <i className="side-margin inline-block line-v-middle middle-font highlight fas fa-angle-right" />
                </div>
            ),
            data: String(offset.right),
            container: "half text-right"
        }
    ];
}

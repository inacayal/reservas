import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function CommaListMemo(props) {
    return (
        <>
            {
                Object.keys(props.data).map(
                    (el, ind) =>
                        <div key={ind} id={el} className="subrayado smaller-text side-margin bold highlight-title inline-block">
                            {props.data[el] + (ind !== props.data.length - 1 ? "," : ".")}
                        </div>
                )
            }
        </>
    );
}
export const CommaList = React.memo(CommaListMemo);
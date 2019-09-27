import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function CommaListMemo(props) {
    return (
        <>
            {
                props.data.map(
                    (el, ind) =>
                        <div key={ind} className="subrayado smaller-text side-margin bold highlight-title inline-block">
                            {el + (ind !== props.data.length - 1 ? "," : ".")}
                        </div>
                )
            }
        </>
    );
}
export const CommaList = React.memo(CommaListMemo);
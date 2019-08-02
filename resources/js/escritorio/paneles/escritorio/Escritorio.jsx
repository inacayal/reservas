/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Escritorio(props) {
    return (
        <div className={props.classes}>
            <div className="small-v-padding box-transparent h-padding highlight-title full-width text-left c-title">Escritorio</div>
        </div>
    );
}
export default React.memo(Escritorio);

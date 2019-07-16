import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//holds reservation state

function Text(props) {
    return (
        <div className={props.container ? props.container : ""}>
            <h6 className="highlight no-margin bold">{props.titulo}</h6>
            <div className={props.classes}>
                <textarea 
                    name={props.name} 
                    rows={props.rows} 
                    className="full-width box-transparent"
                    onChange={props.changeValue}
                    defaultValue={props.value}/>
            </div>
        </div>
    );
}
export default React.memo(Text);
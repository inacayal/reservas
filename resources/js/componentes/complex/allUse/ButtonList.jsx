import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../../basic/Button'

function ButtonList(props) {
    //props.elems is an object array with properties title and icon
    //props.elemClass is a set of classes for list
    return (
        <ul className={props.displayList}>
            {
                props.elems.map((e, i) =>
                    <li key={i} className ={(e.container) ? e.container : (props.container) ? props.container : ""}>
                        <Button
                            data={e.data}
                            icon={e.icon}
                            class={(e.class) ? e.class : props.elemClass}
                            click={(e.click) ? e.click : props.clickHandler}
                            disabled={e.disabled}  
                            title={e.title} />
                    </li>
                )
            }
        </ul>
    );
}
export default ButtonList;
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonList from '../../componentes/basic/ButtonList';

function Lateral(props) {
    return (
        <div>
            <ul className="nav-list no-padding">
                {
                    props.items.map(
                        (e, i) => (
                            <li className="full-width" key={i}>
                                <button onClick={props.changePanel} data={i} className={props.current == i ? "selected no-border bold full-width text-left box-padding": "box-transparent full-width text-left box-padding highlight-hover"}>
                                    {e.title}
                                </button>
                                <div>
                                    <ButtonList
                                        clickHandler={props.changeSub}
                                        displayList={(props.current == i) ? "nav-list medium-left-padding" : "hidden"}
                                        container="full-width no-padding"
                                        elemClass="box-transparent box-padding highlight-hover full-width text-left"
                                        elems={e.sub} />
                                </div>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
}
export default Lateral;

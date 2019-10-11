/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
/**
 * componentes
 */
import ButtonList from '../componentes/basic/ButtonList';

function Lateral(props) {
    return (
        <nav>
            <ul className="nav-list no-padding">
                {
                    props.items.map(
                        (e, i) => {
                            return (
                                <li className="full-width" key={i}>
                                    <Link to={e.route}>
                                        <button
                                            title={e.title}
                                            data={i}
                                            className={
                                                props.current == i ?
                                                    "selected no-border bold full-width text-left box-padding"
                                                    : "box-transparent full-width text-left box-padding highlight-hover"
                                            }>
                                            {e.title}
                                        </button>
                                    </Link>
                                    <ul className={(props.current == i) ? "nav-list no-padding" : "hidden"}>
                                        {
                                            e.sub.map(
                                                (sub, ind) => (
                                                    <li key={ind} className={sub.class}>
                                                        <Link className={sub.class} to={sub.route}>
                                                            {sub.title}
                                                        </Link>
                                                    </li>
                                                )
                                            )
                                        }
                                    </ul>
                                </li>
                            )
                        }
                    )
                }
            </ul>
        </nav>
    );
}
export default Lateral;

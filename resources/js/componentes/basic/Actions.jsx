/**
 * react basic
 */
import React, { Component, useContext,useState } from 'react';
import ReactDOM from 'react-dom';
import {WaitsLoading} from '../../hocs/RouterTransition';
import {withRouter,Redirect} from 'react-router-dom';
/**
 * componentes
 */
import Button from './Button';
/**
 * react router
 */
import {Link} from 'react-router-dom';

export const waitCallback = (ev,e,context) => {
    ev.preventDefault();
    context(e.to,e.params);
}

export default function Actions (props) {
    const context = useContext(WaitsLoading),
        [showOptions,changeHover] = useState(false),
        format = props.overlay
        ?
        {
            overHandler: (e) => changeHover(true),
            leaveHandler: (e) => changeHover(false),
            container: "overlay-gradient full-cover",
            list: showOptions ? "nav-list text-super flex-row no-padding " : "hidden",
            element: {
                link: "align-center stick-bottom decorate-hover",
                button: "no-padding no-margin box-transparent",
                container:{
                    button:"align-center stick-bottom decorate-hover"
                }
            }
        }
        :
        {
            overHandler: (e) => false,
            leaveHandler: (e) => false,
            container: "inline-block side-margin",
            list: "flex-row nav-list side-margin no-padding align-center",
            element: {
                link: "box-transparent highlight-hover border-box button-border side-margin",
                button: "box-transparent highlight-hover full-width text-right button-border border-box"
            }
        };
    return (
        <div
            onMouseOver={format.overHandler}
            onMouseLeave={format.leaveHandler}
            className={format.container}>
            <ul className={format.list}>
                {
                    props.links
                    ?
                        props.links.map(
                            (e,ind) =>
                                <li
                                    key={ind}
                                    className= {format.element.link}>
                                    <Link
                                        to={e.to}
                                        onClick={props.otherSection ? () => false : (ev) => waitCallback(ev,e,context)}>
                                        {e.title}
                                    </Link>
                                </li>
                        )
                    :
                        <></>
                }
                {
                    props.buttons
                    ?
                        props.buttons.length > 0
                        ?
                            props.buttons.map(
                                (e,i) =>
                                    <li
                                        key={i}
                                        className={format.element.container ? format.element.container.button : "highlight-hover button-border border-box side-margin"}>
                                        <Button
                                            data={e.data}
                                            class={"block no-border no-background no-padding"}
                                            click={e.click}
                                            title={e.title} />
                                    </li>
                            )
                        :
                        <></>
                    :
                        <></>
                }
            </ul>
        </div>
    );
}

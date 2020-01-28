/**
 * react basic
 */
import React, { Component, useContext,useState } from 'react';
import ReactDOM from 'react-dom';
import {withRouter,Redirect} from 'react-router-dom';
/**
 * componentes
 */
import Button from './Button';
/**
 * react router
 */
import CustomLink from './CustomLink';

export default function Actions (props) {
    const [showOptions,changeHover] = useState(false),
        format = props.overlay
        ?
        {
            overHandler: (e) => changeHover(true),
            leaveHandler: (e) => changeHover(false),
            container: "overlay-gradient full-cover",
            list: showOptions ? "nav-list text-super flex-row no-padding total-center" : "hidden",
            element: {
                link: "align-center small-margin decorate-hover",
                button: " no-padding small-margin stick-bottom box-transparent",
                container:{
                    button:"no-padding small-margin  box-transparent align-center"
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
                            (e,ind) => {
                                const linkParam = {
                                    to:e.to,
                                    params:e.params,
                                    route:e.route
                                }
                                return (
                                    <li
                                        key={ind}
                                        className= {format.element.link}>
                                        <CustomLink params={linkParam}>
                                            {e.title}
                                        </CustomLink>
                                    </li>
                                )
                            }
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

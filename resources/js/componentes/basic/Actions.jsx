/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import Button from './Button';
/**
 * react router
 */
import {Link} from 'react-router-dom';

export default function Actions(props) {
    console.log(props.buttons);
    return (
        <div className="inline-block side-margin">
            <ul className="flex-row nav-list side-margin no-padding align-center">
            {
                props.links
                    ?
                        props.links.map(
                            (e,ind) => 
                                <li 
                                    key={ind}
                                    className="box-transparent highlight-hover border-box button-border side-margin inline-block">
                                    <Link 
                                        to={e.to}>
                                        {e.title}
                                    </Link>
                                </li>
                        )   
                        :
                        <>
                    </>
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
                                    className='side-margin '>
                                    <Button
                                        data={e.data}
                                        class="box-transparent highlight-hover full-width text-right button-border border-box"
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
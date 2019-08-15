/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import {Link} from 'react-router-dom';

function BreadCrumb(props) {
    let stored = '';
    return (
        <div className="full-width">
            <ul className="flex-row nav-list box-padding">
                {
                    props.items.map(
                        (e,i) => {
                            stored += e==='escritorio' ? '/' : e + '/';
                            return (
                                <li key={i} className="margin-box">
                                    {
                                        i === props.items.length-1 
                                        ? 
                                            <div className='inline-block margin-box'>{e}</div>
                                        : 
                                            <>
                                                <Link to={stored}>{e}</Link>
                                                <div className="margin-box inline-block">/</div>
                                            </>
                                    }
                                </li>
                            );
                        }
                    )
                }
            </ul>
        </div>
    );
}
export default BreadCrumb;

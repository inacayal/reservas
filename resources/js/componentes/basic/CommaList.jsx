import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CustomLink from './CustomLink';

function CommaListMemo(props) {
    const   list = Object.keys(props.list).map(
                (e,i) =>
                <li key={i}
                    className="bold highlight-title inline-block side-margin small-v-margin smaller-text button-border border-box">
                    <CustomLink params={{
                                    to:`/${props.route}/${e}`,
                                    params:{id:e},
                                    route:props.route
                                }}>
                        {props.list[e]}
                    </CustomLink>
                </li>
            );
    return (
        <ul className="nav-list no-padding">
            {list}
        </ul>
    )

}
export const CommaList = React.memo(CommaListMemo);

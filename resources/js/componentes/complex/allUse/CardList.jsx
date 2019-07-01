import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from '../../basic/Card';

function CardList(props) {
    //props.elems is an object array with properties title and icon
    //props.elemClass is a set of classes for list
    return (
        <ul className={props.displayList}>
            {
                props.elems.map((e, i) =>
                    <li key={i} className={(e.container.class) ? e.container.class : (props.container) ? props.container : ""}>
                        <Card
                            data={e.container.data}
                            title={e.title.data}
                            titleClass={e.title.class}
                            description={e.description.data}
                            descriptionClass={e.description.class}
                            content={e.content.data}
                            contentClass={e.content.class}
                            footer={e.footer.data}
                            footerClass={e.footer.class}/>
                    </li>
                )
            }
        </ul>
    );
}
export default CardList;
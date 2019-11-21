/**
 * react basic
 */
import React, { Component,useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
/**
 * componentes
 */
import ButtonList from '../basic/ButtonList';

export default class Lateral extends Component {
    constructor (props){
        super(props);
        this.state={hover:null};
        this.hoverToggle=this.hoverToggle.bind(this);
    }

    hoverToggle(e){
        this.setState({hover:e});
    }

    shouldComponentUpdate(pp,ns){
        return pp.current !== this.props.current || ns.hover !== this.state.hover
    }

    render(){
        const hover = this.state.hover,
            hoverToggle = this.hoverToggle,
            props = this.props;
        return (
            <ul className="nav-list no-padding" style={{height:'93.1%'}}>
            {
                props.items.map(
                    (e, i) => (
                        <li
                            className="full-width relative"
                            key={i}
                            onMouseOver ={()=>hoverToggle(i)}
                            onMouseLeave ={()=>hoverToggle()}>
                            <button
                                title={e.title}
                                data={i}
                                className={
                                    props.current == i
                                    ?
                                    "selected bold full-width text-left bold no-border no-padding"
                                    :
                                    "box-transparent full-width text-left box-padding highlight-hover bold-hover"
                                }>
                            <Link to={e.route}>
                                <div className={props.current == i ? "fat-border box-padding" : ""}>
                                    <span className="half inline-block">
                                        {e.title}
                                    </span>
                                    <span className="inline-block text-right half">
                                        <i className={
                                            props.current == i||hover === i
                                            ?

                                            "line-v-middle middle-font highlight fas fa-angle-right"
                                            :
                                            e.sub.length>0
                                            ?
                                            "line-v-middle middle-font border-font fas fa-angle-right"
                                            :
                                            "hidden"
                                        }/>
                                    </span>
                                </div>
                            </Link>
                            {
                                (e.sub.length>0)
                                ?
                                    <SubElements
                                        isCurrent={props.current == i}
                                        isHover={hover===i}
                                        index ={i}
                                        sub={e.sub}
                                        {...props}/>
                                :
                                    <div></div>
                            }
                        </button>
                    </li>
                    )
                )
            }
            </ul>
        );
    }
}

const SubElements = (props) => {
    const i=props.index,
        sub=props.sub,
        [hover,hoverToggle] = useState();

    let eClass = "";

    if (props.isCurrent) {
        eClass = "nav-list no-padding border-background";
    } else if (!props.isHover){
        eClass="hidden"
    } else
        eClass="absolute float-right full-width nav-list no-padding dark-background"

    return (
        <ul className={eClass}>
            {
                sub.map(
                    (sub, ind) => (
                        <li
                            key={ind}
                            className={sub.class+" border-transparent bold-hover text"}
                            onMouseOver ={()=>hoverToggle(ind)}
                            onMouseLeave ={()=>hoverToggle()}>
                            <Link to={sub.route}>
                                <span className="inline-block half">
                                    <span>{sub.title}</span>
                                </span>
                                <span className="inline-block text-right half">
                                    <i className={hover===ind ? "line-v-middle middle-font highlight fas fa-angle-right" : "hidden"}/>
                                </span>
                            </Link>
                        </li>
                    )
                )
            }
        </ul>
    )
}
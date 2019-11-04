/**
 * react basic
 */
import React, { Component,useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
/**
 * componentes
 */
import ButtonList from '../componentes/basic/ButtonList';
const mapRoutes = {
    escritorio:{},
    reservas:{},
    horarios:{},
    ubicaciones:{},
    eventos:{},
    promociones:{},
    locales:{},
    configuracion:{},
    franquicias:{}
}
function Lateral(props) {
    const [hover,hoverToggle] = useState();
    return (
        <nav>
            <ul className="nav-list no-padding">
                {
                    props.items.map(
                        (e, i) => {
                            return (
                                <li
                                    className="full-width relative"
                                    key={i}
                                    onMouseOver ={()=>hoverToggle(i)}
                                    onMouseLeave ={()=>hoverToggle()}>
                                    <Link to={e.route}>
                                        <button
                                            title={e.title}
                                            data={i}
                                            className={
                                                props.current == i ?
                                                    "selected bold full-width text-left bold no-border no-padding"
                                                    :
                                                        "box-transparent full-width text-left box-padding highlight-hover bold-hover"
                                            }>
                                            <div className={props.current == i ? "border-blue box-padding" : ""}>
                                                <span className="half inline-block">
                                                    {e.title}
                                                </span>
                                                <span className="inline-block text-right half">
                                                    <i className={hover===i && props.current!= i ? "line-v-middle middle-font highlight fas fa-angle-right" : "hidden"}/>
                                                </span>
                                            </div>
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
                                    </Link>
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

const SubElements = (props) => {
    const i=props.index,
        sub=props.sub,
        [hover,hoverToggle] = useState();

    let eClass = "";

    if (props.isCurrent) {
        eClass = "nav-list no-padding";
    } else if (!props.isHover){
        eClass="hidden"
    } else
        eClass="absolute float-right full-width nav-list no-padding "

    return (
        <ul className={eClass} style={{backgroundColor:'rgba(0,59,120,0.95)'}}>
            {
                sub.map(
                    (sub, ind) => (
                        <li
                            key={ind}
                            className={sub.class+" border-transparent"}
                            onMouseOver ={()=>hoverToggle(ind)}
                            onMouseLeave ={()=>hoverToggle()}>
                            <Link to={sub.route} className='bold-hover'>
                                <span className="inline-block half">
                                    <span style={{color:'white'}}>{sub.title}</span>
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

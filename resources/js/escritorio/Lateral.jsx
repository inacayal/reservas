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
                                    className="full-width" 
                                    key={i} 
                                    onMouseOver ={()=>hoverToggle(i)}
                                    onMouseLeave ={()=>hoverToggle()}>
                                    <Link to={e.route}>
                                        <button
                                            title={e.title}
                                            data={i}
                                            className={
                                                props.current == i ?
                                                    "selected no-border bold full-width text-left box-padding bold"
                                                    : "box-transparent full-width text-left box-padding highlight-blue bold-hover"
                                            }>
                                            {e.title}
                                        </button>
                                    </Link>
                                    {
                                        (e.sub.length>0)
                                        ?
                                            <SubElements show ={(props.current == i || hover===i)} index ={i} sub={e.sub} {...props}/>
                                        :
                                            <div></div>
                                    }
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

    return (
        <ul className={ props.show ? "nav-list no-padding" : "hidden"} style={{backgroundColor:'#003b78'}}>
            {
                sub.map(
                    (sub, ind) => (
                        <li 
                            key={ind} 
                            className={sub.class}
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
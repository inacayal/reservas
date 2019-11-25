import React,
    {
        Component,
        useState,
        useRef
    } from 'react';
import ReactDOM from 'react-dom';

const noMemoSelect = (props) => {
    const hasError = (props.errors||[]).length>0,
        input = useRef(null),
        [show,toggle] = useState(false),
        [term,updateSearch] = useState(props.list[props.selected]||""),
        select = props,
        showCallback = (e) => {
            toggle(true);
            setTimeout(()=>input.current.focus(),10)
        };

    return(
        <div
            className="relative"
            style={
                show
                ? { zIndex: 2 }
                : { zIndex: 0}}>
            <select
                name={select.name}
                className="hidden"
                disabled ={select.readOnly}>
                <option defaultValue={select.selected}></option>
            </select>
            <label
                htmlFor={select.name}
                className="select inherit-width">
                <div className={
                    (show)
                        ? "full-width flex-row relative"
                        : "full-width relative border-bottom flex-row"
                    }
                    onClick={showCallback}
                    select={ select.name}>
                    <div className="select-title v-padding">
                        <span className={(show) ? "hidden" : ""}>
                        {
                            (select.selected)
                                ? select.list[select.selected]
                                : <span style={{color:"gray"}}>{props.titulo}</span>
                        }
                        </span>
                        <input
                            type="text"
                            defaultValue={term}
                            ref={input}
                            onChange = {e => updateSearch(e.currentTarget.value)}
                            onBlur={() => toggle(false) }
                            className={
                                (show)
                                ? "small-v-padding"
                                : "hidden"
                            }/>
                    </div>
                    <div className="margin-left v-align-center">
                        <i className={
                            (show)
                                ? "fas fa-search"
                                : "fas fa-angle-down"
                            }
                            style={{ color:"#bfbfbf"}}/>
                    </div>
                </div>
                <div className="absolute full-width">
                    <ul
                        className={
                            (show)
                            ? "option-list box-shadow max-height"
                            : "hidden"}>
                        {
                            Object.keys(select.list).reduce(
                                function (tot,ind) {
                                    const element = (
                                        <li
                                            key={ind}
                                            name={select.name}
                                            value={ind == select.selected ? "" : ind}
                                            onMouseDown={
                                                (e) => {
                                                    toggle(false);
                                                    props.changeSelect(e)
                                                }
                                            }
                                            className={
                                                (ind == select.selected)
                                                ? "option selected"
                                                : "option"
                                            }>
                                            {select.list[ind]}
                                        </li>
                                    );
                                    if (term){
                                        const search = select.list[ind].toString(),
                                            el = search.match(new RegExp(term,'gi')) ? element : null;
                                        if (el)
                                            tot.push(el);
                                    }else
                                        tot.push(element);
                                    return tot;
                                },[]
                            )
                        }
                    </ul>
                </div>
            </label>
            {
                hasError
                ?
                    <ul className="nav-list no-padding">
                        {
                            props.errors.map(
                                (e,i) => <li key={i} className="smaller-text error">{e.description}</li>
                            )
                        }
                    </ul>
                :
                    <></>
            }
        </div>
    );
}

export const Select = React.memo(noMemoSelect);

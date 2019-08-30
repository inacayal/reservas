/**
 * react basic
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
/**
 * 
 * @param {*} e 
 * handler
 */
export function showOptions(e) {
    let name = e.currentTarget.getAttribute('select');
    let select = this.state.select;
    let trigger = select[name];
    trigger.show = !trigger.show;
    select[name] = trigger;
    this.setState({ select });
}
/**
 * 
 * @param {*} e 
 * component
 */
export function selectOption(e) {
    let value = e.target.getAttribute('keyvalue'),
        name = e.target.getAttribute('select'),
        select = this.state.select,
        trigger = select[name];
    trigger.selected = (value !== select[name].selected) ? value : null;
    select[name] = trigger;
    this.setState({ select });
}
class noMemoSelect extends Component{
    constructor(props){
        super(props);
    }
    componentDidUpdate(newProps){
        if(!newProps.show){
            this.props.input.current.focus();
        }
    }
    render(){
        return(
            <div className="relative" style={this.props.show ? { zIndex: 2 } : { zIndex: 0}}>
                <select name={this.props.name} className="hidden" disabled ={this.props.readOnly}>
                    <option defaultValue={this.props.selected}></option>
                </select>
                <label htmlFor={this.props.name} className="select inherit-width">
                    <div className={(this.props.show) ? "full-width flex-row relative" : "full-width relative border-bottom top-padding flex-row"} onClick={(!this.props.show) ? this.props.toggle : e => e.preventDefault()} select={this.props.name}>
                        <div className="select-title">
                            <span className={(this.props.show) ? "hidden" : ""}>{(this.props.selected) ? this.props.list[this.props.selected] : this.props.titulo}</span>
                            <input type="text" defaultValue={(this.props.selected) ? this.props.list[this.props.selected] : this.props.search} ref={this.props.input} onBlur={this.props.toggle} className={(this.props.show) ? "" : "hidden"} select={this.props.name} />
                        </div>
                        <div className="margin-left v-align-center"><i className={(this.props.show) ? "fas fa-search" : "fas fa-angle-down"} style={{ color:"#bfbfbf"}}></i></div>
                    </div>
                    <div className="absolute full-width">
                        <ul className={(this.props.show) ? "option-list box-shadow max-height" : "hidden"} >
                            {
                                Object.keys(this.props.list).map(function (ind) {
                                    return <li key={ind} keyvalue={ind} select={this.props.name} onMouseDown={this.props.change} className={(ind === this.props.selected) ? "option selected" : "option"}>{this.props.list[ind]}</li>;
                                },this)
                            }
                        </ul>
                    </div>
                </label>
            </div>
        );
    }
}

export const Select = React.memo(noMemoSelect);
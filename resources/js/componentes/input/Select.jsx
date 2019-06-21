import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//holds reservation state

class Select extends Component{
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
            <div className="relative">
                <select name={this.props.name} className="hidden" >
                    <option value={this.props.selected}></option>
                </select>
                <label htmlFor={this.props.name} className="select inherit-width">
                    <div className={(this.props.show) ? "full-width flex-row bottom-transparent relative" : "full-width relative border-box flex-row"} onClick={(!this.props.show) ? this.props.toggle : e => e.preventDefault()} select={this.props.name}>
                        <div className="select-title">
                            <span className={(this.props.show) ? "hidden" : ""}>{(this.props.selected) ? this.props.list[this.props.selected] : this.props.titulo}</span>
                            <input type="text" defaultValue={(this.props.selected) ? this.props.list[this.props.selected] : this.props.search} ref={this.props.input} onBlur={this.props.toggle} className={(this.props.show) ? "" : "hidden"} select={this.props.name} />
                        </div>
                        <div className="margin-left"><i className={(this.props.show) ? "highlight fas fa-search" : "highlight fas fa-angle-down"}></i></div>
                    </div>
                    <div className="absolute full-width">
                        <ul className={(this.props.show) ? "option-list b-left b-right b-down" : "hidden"}>
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

export default Select;
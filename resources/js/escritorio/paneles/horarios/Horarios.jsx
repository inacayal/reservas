import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DiasFeriados from './subElements/DiasFeriados';
import HorarioAtencion from './subElements/HorarioAtencion';
import ButtonList from '../../../componentes/complex/allUse/ButtonList';

export class Horarios extends Component {
    constructor(props){
        super(props);
        this.state = {
            show:"0"
        };
    }
    render(){
        return (
            <div className={(this.props.panel) ? "full-width container" : "hidden"}>
                <div className={(!this.props.currentSub) ? "row" : "hidden"}>
                    <ButtonList 
                        clickHandler={this.props.selectInnerElement}
                        displayList="flex-row h-center nav-list"
                        elems={this.props.subElements}
                        container="nav-reserva"/>
                </div>
                <div className="row">
                    <DiasFeriados show={this.props.currentSub==="1"}/>
                    <HorarioAtencion show={this.state.show === "2"} />
                </div>
            </div>
        );
    }
}
export default Horarios;

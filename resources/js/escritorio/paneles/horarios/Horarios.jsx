/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elements
 */
import DiasFeriados from './subElements/DiasFeriados';
import HorarioSemana from './subElements/HorarioSemana';
export class Horarios extends Component {
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps) {
        return this.props.panel || nextProps.panel;
    }
    render() {
        if (this.props.currentSub !== "0") 
            return (
                <HorarioSemana 
                    show = {true}/>
            );
        else 
            return (
                <DiasFeriados
                    show={true}
                    changePanel={this.props.changePanel} />
            );
    }
}
export default Horarios;

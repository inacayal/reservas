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
        this.state = {};
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
                <div className={(this.props.panel) ? "full-width container" : "hidden"}>
                    <div className="row">
                        <DiasFeriados
                            show={true}
                            changePanel={this.props.changePanel} />
                    </div>
                </div>
            );
    }
}
export default Horarios;

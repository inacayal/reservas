/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input components
 */
import {Select} from '../../../../componentes/input/Select';
/**
 * components
 */
import ButtonList from '../../../../componentes/basic/ButtonList';
export default class Configuracion extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <form className="full-width"> 
                <div className="container">
                    <div className="row v-padding">
                        <div className="col-md-6">
                            <h6 className="highlight bold no-margin">
                                Defina el intervalo permitido para la reserva.
                            </h6>
                            <Select 
                                {...this.props.intervalo} 
                                titulo="selecciona el intervalo de la reserva" 
                                toggle={this.props.showOptions} 
                                change={this.props.selectOption} />
                        </div>
                        <div className="col-md-6">
                            <h6 className="highlight bold no-margin">
                                Defina la duración máxima de la reserva.
                            </h6>
                            <Select 
                                {...this.props.caida}
                                titulo="selecciona la duración máxima de la reserva"
                                toggle={this.props.showOptions}
                                change={this.props.selectOption} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-right no-padding">
                            <ButtonList
                                displayList="flex-row nav-list no-padding inline-block  align-center"
                                container="side-margin inline-block"
                                elems={this.props.formActions} />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
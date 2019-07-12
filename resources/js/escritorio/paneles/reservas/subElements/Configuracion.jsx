import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from '../../../../componentes/input/Select';
export default class Configuracion extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h6 className="highlight bold no-margin">
                            Defina el intervalo permitido para la reserva.
                        </h6>
                        <Select 
                            {...this.props.intervalo} 
                            titulo="selecciona el intervalo de la reserva" 
                            change={this.props.change} 
                            toggle={this.props.showToggle} />
                    </div>
                    <div className="col-md-6">
                        <h6 className="highlight bold no-margin">
                            Defina la duración máxima de la reserva.
                        </h6>
                        <Select 
                            {...this.props.caida}
                            titulo="selecciona la duración máxima de la reserva"
                            change={this.props.change}
                            toggle={this.props.showToggle} />
                    </div>
                </div>
            </div>
        );
    }
}
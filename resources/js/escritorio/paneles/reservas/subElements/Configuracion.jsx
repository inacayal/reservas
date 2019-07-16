import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from '../../../../componentes/input/Select';
import Button from '../../../../componentes/basic/Button';
export default class Configuracion extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <form className="full-width"> 
                <div className="container no-padding">
                    <div className="row v-padding">
                        <Button
                            title={(
                                <div className="smaller-text text bold">
                                    <i className="fas fa-arrow-left inline-box side-margin" />
                                    Volver
                                </div>
                            )}
                            data="1"
                            click={this.props.changePanel}
                            class="box-transparent highlight-hover border-box button-border inline-block"
                            disabled={false} />
                    </div>
                    <div className="row">
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
                            <Button
                                title={(
                                    <div className="smaller-text text bold">
                                        <i className="fas fa-times-circle inline-box side-margin" />
                                        Cancelar
                                </div>
                                )}
                                data="1"
                                click={this.props.changePanel}
                                container="inline-block side-margin"
                                class="box-transparent highlight-hover border-box button-border"
                                disabled={false} />
                            <Button
                                title={(
                                    <div className="smaller-text text bold">
                                        <i className="fas fa-check-circle inline-box side-margin" />
                                        Guardar
                                    </div>
                                )}
                                type="submit"
                                click={this.props.guardarConfiguracion}
                                container="inline-block side-margin"
                                class="box-transparent highlight-hover border-box button-border"
                                disabled={false} />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
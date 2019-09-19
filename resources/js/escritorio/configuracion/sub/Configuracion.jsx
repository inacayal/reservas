/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import {CardList} from '../../../componentes/basic/CardList';
import Titulo from '../../../componentes/basic/Titulo';
/**
 * funciones
 */
import generateConfigurationCards from './generateConfigurationCards';

export default class Configuracion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: null
        };
        this.expandirElemento = this.expandirElemento.bind(this);
    }

    expandirElemento(e) {
        let show = e.currentTarget.getAttribute('data');
        this.setState({ show: this.state.show !== show ? show : null });
    }

    componentDidMount() {
        console.log('configuracionMount');
    }

    componentWillUnmount() {
        console.log('configuracionUnmount');
    }

    render() {
        const 
            configurationList = generateConfigurationCards(
                ()=>false,
                this.expandirElemento,
                this.props.sub,
                this.props.data,
                this.state.show
            );
        return (
            <div className="full-width">
                <Titulo
                    title="Configuración"
                    navigation={[]} />
                <div className="full-width container box-padding">
                    <CardList
                        displayList="no-padding flex-column nav-list align-center full-width"
                        container="full-width highlight-hover"
                        elems={configurationList} />
                </div>
            </div>
        );
    }
}

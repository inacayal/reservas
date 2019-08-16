/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * navigation
 */
import BreadCrumb from '../componentes/control/BreadCrumb';
import LoadBar from '../utils/LoadBar';
import Lateral from './Lateral';

//holds reservation state
export default class MainFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: sidebar,
            loading: 0,
            loaded: 0
        };
    }

    downloadHandler(pEvent) {
        let
            loading = Math.round((pEvent.loaded * 100) / pEvent.total),
            state = loading !== 100 ?
                { loading, loadFinished: false }
                : { loading, loadFinished: true };
        this.setState(state);
    }

    render() {
        const current = window.location.href.replace(/((http:\/\/|https:\/\/)localhost\/|\/$)/gi, '');
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Lateral
                            current={this.props.current}
                            items={this.state.sidebar}/>
                    </div>
                    <div className="col-md-9">
                        <div className="container">
                            <div className="row">
                                <BreadCrumb
                                    items={current.split('/')}/>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <this.props.render 
                                        sub={this.state.sidebar[this.props.current].sub} 
                                        {...this.props} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

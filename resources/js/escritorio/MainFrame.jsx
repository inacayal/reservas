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
            loadFinished: false
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
        console.log(this.props.match);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3 no-padding border-right">
                        <Lateral
                            current={this.props.current}
                            items={this.state.sidebar}/>
                    </div>
                    <div className="col-md-9 no-padding">
                        <div className="container">
                            <div className="row">
                                <BreadCrumb
                                    items={current.split('/')}/>
                            </div>
                            <div className="row box-padding">
                                <div className="col-md-12  v-padding">
                                    {
                                        (this.state.loadFinished)
                                        ?
                                            <this.props.render 
                                                downloadHandler={this.downloadHandler}
                                                sub={this.state.sidebar[this.props.current].sub} 
                                                {...this.props} />
                                        :
                                            <LoadBar
                                                loaded={this.state.loading} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

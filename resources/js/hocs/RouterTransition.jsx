/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * navigation
 */
import LoadBar from '../utils/LoadBar';

//holds reservation state
export default class RouterTransition extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:null,
            loadFinished:false,
            loading:0
        };
        this.fetchData = this.props.dataConfig.handler(this.props.routeConfig.params).bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
        this.fetchHandler = this.fetchHandler.bind(this);
    }

    downloadHandler(pEvent) {
        let
            loading = Math.round((pEvent.loaded * 100) / pEvent.total),
            state = loading !== 100 ?
                { loading, loadFinished: false }
                : { loading };
        this.setState(state);
    }

    fetchHandler(params){
        this.fetchData(params);
    }

    componentDidMount() {
        this.fetchHandler({});
    }

    shouldComponentUpdate(np,ns){
        return this.props.dataConfig.endpoint !== np.dataConfig.endpoint || this.state.data !== ns.data;
    }

    componentWillUnmount(){

    }

    componentDidUpdate(pp,ps,s){
        if (pp.dataConfig.endpoint !== this.props.dataConfig.endpoint){
            this.fetchData = this.props.dataConfig.handler(this.props.routeConfig.params).bind(this);
            this.fetchData({});
        } else
            this.setState({
                loadFinished:false,
                loading:0,
                oldData:this.state.data,
                oldComponent:this.props.dataConfig
            });
    }

    render() {
        const router = React.cloneElement(
            this.props.children,
            {
                data:
                    this.state.loadFinished
                    ?
                        this.state.data
                    :
                        this.state.oldData,
                oldData:this.state.oldData,
                oldComponent:this.state.oldComponent,
                loaded:this.state.loadFinished
            });
        console.log(this.state.loadFinished)
        return (
            <>
                <LoadBar loaded={this.state.loading}/>
                {
                    (this.state.data)
                    ?
                        <div style={{padding:"10px 16px", height:"99%"}}
                            className="main-container h-overflow-auto">
                            <div className="visible relative">
                                <div className={this.state.loadFinished ? "hidden" : "top-padding full-width overlay"} style={{marginLeft:"-15px"}}/>
                                {router}
                            </div>
                        </div>
                    :
                        <></>
                }
            </>
        );
    }
}

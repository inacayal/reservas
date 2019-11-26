/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import BreadCrumb from '../componentes/control/BreadCrumb';
import Lateral from '../componentes/control/Lateral';
import {
    downloadHandler,
    LoadBar
} from '../utils/LoadBar';
import {
    assignHandler,
    awaitLoading
} from './handlers/routerTransitionHandlers';

export const WaitsLoading = React.createContext({});

export class RouterTransition extends Component {
    constructor(props){
        super(props);
        this.assignHandler = assignHandler.bind(this);
        this.state = {
            data:null,
            loadFinished:false,
            loading:0,
            preventRedirect:true,
            refresh:false,
            fetchData:this.assignHandler(this.props.handlerArray,this.props.location,this.props.route.params)
        };
        this.downloadHandler = downloadHandler.bind(this);
        this.awaitLoading = awaitLoading.bind(this);
        this.fetchHandler = this.fetchHandler.bind(this);
        this.displayErrors = this.displayErrors.bind(this);
    }


    fetchHandler(params){
        this.state.fetchData(params);
    }

    displayErrors(error){
        this.props.displayMessage({
            message:{
                data:(
                    <div className="h-padding">
                        <div className="inline-block ">
                            <span className="side-margin bold">código</span>
                            <span className="side-margin bold">{error.response.status}</span>
                        </div>
                        <div className="inline-block side-margin">
                            {error.response.statusText}
                        </div>
                    </div>
                ),
                title:(
                    <>
                        <i className="far fa-exclamation-triangle bold sub-title side-margin" />
                        <span className="side-margin">Errores</span>
                    </>
                ),
                type:'failure'
            }
        });
    }

    shouldComponentUpdate(np,ns){
        if (np.message !== this.props.message)
            return false;
        else
            return np.location !== this.props.location
                || ns.loadFinished
                || this.state.loadFinished;
    }

    componentDidUpdate(pp){
        if ((pp.location !== this.props.location
            || this.state.refresh)
            && this.state.loadFinished){
            this.setState({
                refresh:false,
                redirect:React.cloneElement(
                    this.props.children,
                    {data:this.state.data}
                )
            })
        }
    }

    componentDidMount() {
        this.fetchHandler({});
    }

    componentWillUnmount(){
    }

    render() {
        return (
            <WaitsLoading.Provider value={this.awaitLoading}>
                <LoadBar loaded={this.state.loading}/>
                <div className="col-md-2 no-padding light-background">
                    <Lateral    current={this.props.sidebarElem}
                                items={sidebar}/>
                </div>
                <div    className="col-md-8 container-fluid"
                        style={{height:'100%'}}>
                    <div className="row">
                        <BreadCrumb items={this.props.url.split('/')}
                                    url={this.props.url}
                                    nombre={this.state.nombre}/>
                    </div>
                    <div    className="row white-background"
                            style={{height:'100%'}}>
                        <div    className="col-md-12 container-fluid no-padding"
                                style={{height:'90%'}}>
                            {
                                (this.state.data)
                                ?
                                    <div style={{padding:"10px 16px", height:"99%"}}
                                        className="main-container h-overflow-auto">
                                        <div className="visible relative">
                                            <div className={this.state.loadFinished ? "hidden" : "top-padding full-width overlay"} style={{marginLeft:"-15px"}}/>
                                            {
                                                this.state.loadFinished
                                                    && !this.state.preventRedirect
                                                ?
                                                    this.state.redirect
                                                :
                                                    React.cloneElement(
                                                        this.props.children,
                                                        {
                                                            data:this.state.data
                                                        }
                                                    )
                                            }
                                        </div>
                                    </div>
                                :
                                    <></>
                            }
                        </div>
                    </div>
                </div>
            </WaitsLoading.Provider>
        );
    }
}

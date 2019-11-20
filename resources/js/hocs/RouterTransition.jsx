/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import BreadCrumb from '../componentes/control/BreadCrumb';
import Lateral from '../componentes/control/Lateral';
/**
 * navigation
 */
import {
    downloadHandler,
    LoadBar
} from '../utils/LoadBar';

//holds reservation state
import {searchHandler} from './MainFrame';

function assignHandler(handlerArray,location,params){
    let handler = searchHandler(handlerArray,location);
    handler = handler.callback(params);
    return handler.bind(this);
}

function awaitLoading(location,params){
    const fetchData = this.assignHandler(this.props.handlerArray,location,params);
    this.setState(
        {
            loading:0,
            loadFinished:false,
            fetchData:fetchData,
            preventRedirect:false
        },() => {
            this.fetchHandler(params);
        }
    );
}

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
    }


    fetchHandler(params){
        this.state.fetchData(params);
    }

    shouldComponentUpdate(np,ns){
        return np.location !== this.props.location || ns.loadFinished || this.state.loadFinished;
    }

    componentDidUpdate(pp){
        if ((pp.location !== this.props.location || this.state.refresh) && this.state.loadFinished){
            this.setState({
                refresh:false,
                redirect:React.cloneElement(this.props.children,{data:this.state.data})
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
            <>
                <LoadBar loaded={this.state.loading}/>
                <div className="col-md-2 no-padding white-background">
                    <Lateral
                        current={this.props.sidebarElem}
                        items={sidebar}/>
                </div>
                <div className="col-md-8 container-fluid"  style={{height:'100%'}}>
                    <div className="row">
                        <BreadCrumb
                            items={this.props.url.split('/')}
                            url={this.props.url}
                            nombre={this.state.nombre}
                            load={this.awaitLoading}
                            match={this.props.children.props.match.path}/>
                    </div>
                    <div className="row white-background" style={{height:'100%'}}>
                        <div className="col-md-12 container-fluid no-padding" style={{height:'90%'}}>
                        {
                            (this.state.data)
                            ?
                                <WaitsLoading.Provider value={this.awaitLoading}>
                                    <div style={{padding:"10px 16px", height:"99%"}}
                                        className="main-container h-overflow-auto">
                                        <div className="visible relative">
                                            <div className={this.state.loadFinished ? "hidden" : "top-padding full-width overlay"} style={{marginLeft:"-15px"}}/>
                                            {
                                                this.state.loadFinished && !this.state.preventRedirect
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
                                </WaitsLoading.Provider>
                            :
                                <></>
                        }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

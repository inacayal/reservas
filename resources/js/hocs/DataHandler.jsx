/**
 * react basic
 */
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import BreadCrumb from '../componentes/control/BreadCrumb';
import Lateral from '../componentes/control/Lateral';
import {
    withRouter,
    matchPath
} from 'react-router-dom';
import {
    downloadHandler,
    LoadBar
} from '../utils/LoadBar';
import {searchHandler} from './MessageHandler';
import {handlers} from '../handlers/index';
import {
    displayGetRequestErrors as displayErrors
} from '../utils/errorHandling';

const routeMap = [
    'horarios',
    'horarios/feriados',
    'reservas',
    'configuracion',
    'eventos',
    'promociones',
    'locales',
    'franquicias',
    'ubicaciones'
];

const searchRoute = (path) => routeMap.filter(e => path.match(e)).pop();

function assignHandler (
    handlerArray,
    location,
    r
){
    return [
        handler.bind(this),
        parameters.params
    ];
}

function awaitLoading (
    {
        handler,
        route,
        message,
    }
){
    this.setState(
        {
            loading:0,
            loadFinished:false,
            fetchData:handler.callback(route.params).bind(this),
        },
            () =>
                new Promise (
                    (resolve,reject) => {
                        if (!this.state.loadFinished)
                            resolve();
                    }
                )
                .then (
                    () =>
                        this.fetchHandler({
                            component:this.props.children,
                            message:message
                        })
                )
    );
}

export const WaitsLoading = React.createContext({});

export class DataHandler extends Component {
    constructor(props){
        super(props);
        this.assignHandler = assignHandler.bind(this);
        this.state = {
            data:null,
            loadFinished:true,
            loading:0
            //location:this.props.location,
            //fetchData:this.assignHandler(this.props.handlerArray,this.props.location,null)[0]
        };
        this.downloadHandler = downloadHandler.bind(this);
        this.awaitLoading = awaitLoading.bind(this);
        this.fetchHandler = this.fetchHandler.bind(this);
        this.displayErrors = displayErrors.bind(this);
    }

    fetchHandler({component,message}){
        //console.log(this.state.loadFinished)
        const handlePromise = (resolve,reject) => {
            this.state.fetchData(component)
                .then(
                    res => {
                        //console.log(res)
                        if (res instanceof Error)
                            reject(res);
                        else
                            resolve(message);
                    }
                )
        };
        new Promise (handlePromise)
            .then (res => {
                if (res)
                    this.props.displayMessage(res);
            })
            .catch(this.displayErrors)
    }

    shouldComponentUpdate(np,ns){
        //console.log('parent')
        //console.log((ns.loadFinished !== this.state.loadFinished) && ns.loadFinished)
        //console.log(ns.loadFinished !== this.state.loadFinished)
        //console.log(np.location !== this.props.location)
        if (np.message !== this.props.message)
            return false;
        return  np.location !== this.props.location || ns.loadFinished !== this.state.loadFinished;
    }

    componentDidUpdate(pp,ps){
        //console.log('culo')
        if(pp.location !== this.props.location){
            this.awaitLoading({
                handler:this.props.handler,
                route:this.props.route,
                message:null
            });
        }
    }

    componentDidMount() {
        this.awaitLoading({
            handler:this.props.handler,
            route:this.props.route,
            message:null,
        });
    }

    componentWillUnmount(){
        //console.log('unmount1')
    }

    render() {
        //console.log(this.state.location)
        return (
            <WaitsLoading.Provider value={this.awaitLoading}>
                <LoadBar loaded={this.state.loading}/>
                <div    className="col-md-2 no-padding light-background">
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
                                    <div    style={{padding:"10px 16px", height:"99%"}}
                                            className="main-container h-overflow-auto">
                                        <div className="visible relative">
                                            <div    className={
                                                        this.state.loadFinished
                                                            ? "hidden"
                                                            : "top-padding full-width overlay"
                                                    }
                                                    style={{marginLeft:"-15px"}}/>
                                                {
                                                    React.cloneElement(
                                                        this.props.children,
                                                        {
                                                            data:this.state.data,
                                                            match:this.props.global,
                                                            location:this.state.location
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

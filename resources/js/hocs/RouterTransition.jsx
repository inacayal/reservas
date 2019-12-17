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
import {searchHandler} from './MainFrame';
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
    let handler = searchHandler(handlerArray,location);
    const parameters = matchPath(location,{path:handler.endpoint});
    handler = handler.callback(parameters.params);
    return [
        handler.bind(this),
        parameters.params
    ];
}

function awaitLoading (
    location,
    match,
    message,
    push=true,
){
    console.log(match)
    const   [
        fetchData,
        parameters
    ] = this.assignHandler(
            handlers[match].list,
            location,
            null
        );

    this.setState(
        {
            loading:0,
            loadFinished:false,
            fetchData:fetchData,
        },
            () =>
                this.fetchHandler(
                    location,
                    parameters,
                    push,
                    message
                )
    );
}

export const WaitsLoading = React.createContext({});

export class RouterTransition extends Component {
    constructor(props){
        super(props);
        this.assignHandler = assignHandler.bind(this);
        this.state = {
            data:null,
            loadFinished:true,
            loading:0,
            //location:this.props.location,
            //fetchData:this.assignHandler(this.props.handlerArray,this.props.location,null)[0]
        };
        this.downloadHandler = downloadHandler.bind(this);
        this.awaitLoading = awaitLoading.bind(this);
        this.fetchHandler = this.fetchHandler.bind(this);
        this.displayErrors = displayErrors.bind(this);
    }

    fetchHandler(location,params,push,message){
        const handlePromise = (resolve,reject) => {
            this.state.fetchData(params)
                .then(
                    res => {
                        if (res instanceof Error)
                            reject(res);
                        else {
                            if (push)
                                this.props.history.push(location);
                            resolve(message);
                        }
                    }
                )
        };

        new Promise (handlePromise)
            .then (res => {
                if (res)
                    this.props.displayMessage(res)
            })
            .catch(this.displayErrors)
    }

    shouldComponentUpdate(np,ns){
        if (np.message !== this.props.message)
            return false;
        else
            return this.state.loadFinished;
    }

    componentDidUpdate(pp){
        if (this.props.history.action === 'POP'){
            this.awaitLoading(
                this.props.location,
                searchRoute(this.props.location),
                null,
                false
            );
        }
    }

    componentDidMount() {
        this.awaitLoading(
            this.props.location,
            searchRoute(this.props.location),
            null,
            true
        );
    }

    componentWillUnmount(){
        console.log('unmount1')
    }

    render() {
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
                                                        {data:this.state.data}
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

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
import {handlerArray} from '../handlers/index';
import {
    displayGetRequestErrors as displayErrors
} from '../utils/errorHandling';

const searchHandler = (path) => {
    return handlerArray.filter(
        c => path.match(c.match)
    ).pop();
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

const assignRoute =
    (location) => {
        const handler = searchHandler(location);
        return {
            handler,
            route:matchPath(location,{path:handler.endpoint})
        };
    };

export const WaitsLoading = React.createContext({});

class DataHandler extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:null,
            loading:0,
            message:null
        };
        this.downloadHandler = downloadHandler.bind(this);
        this.awaitLoading = awaitLoading.bind(this);
        this.fetchHandler = this.fetchHandler.bind(this);
        this.displayErrors = displayErrors.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange (location,message) {
        const config = assignRoute(location.pathname);
        this.awaitLoading({...config,message})
    }

    fetchHandler({component,message}){
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
        return  np.location !== this.props.location
                || ns.loadFinished !== this.state.loadFinished
                || np.loading!==0;
    }

    componentDidUpdate(pp,ps){
        if(pp.location !== this.props.location){
            this.routeChange(this.props.location,{message:null})
        }
    }

    componentDidMount() {
        window.addEventListener(
            'onhashchange',
            e => {
                e.preventDefault();
                console.log('culo')
            });
        this.routeChange(this.props.location,{message:null})
    }

    componentWillUnmount() {
    }

    render() {
        const location = `escritorio${this.props.location.pathname}`;
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
                        <BreadCrumb url={location}
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
                                                    (this.state.location.pathname === this.props.location.pathname)
                                                        ? React.cloneElement(
                                                            this.props.children,
                                                            {
                                                                data:this.state.data,
                                                                match:this.props.global,
                                                                location:this.state.location
                                                            }
                                                        )
                                                        : <></>
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
export default withRouter(DataHandler);

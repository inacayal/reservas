/**
 * react basic
 */
import React, {
    Component
} from 'react';
import {
    withRouter,
    matchPath
} from 'react-router-dom';
import {
    downloadHandler,
    LoadBar
} from '../componentes/control/LoadBar';
import {Redirect} from 'react-router-dom';
import {handlerArray} from '../handlers/index';
import ReactDOM from 'react-dom';
import BreadCrumb from '../componentes/control/BreadCrumb';
import Lateral from '../componentes/control/Lateral';


function searchHandler (path) {
    return handlerArray.filter(
        c => path.match(c.match)
    ).pop();
}

function awaitLoading (
    {
        handler,
        route
    }
){
    this.setState(
        {
            loading:0,
            loadFinished:false,
            fetchData:handler.callback(route.params).bind(this),
        },
        () => this.fetchHandler(this.props.location.state)
    );
}


function assignRoute (location){
    const handler = searchHandler(location);
    return {
        handler,
        route:matchPath(location,{path:handler.endpoint})
    };
};

export const WaitsLoading = React.createContext({});

export default class DataHandler extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:null,
            loading:0,
        };
        this.downloadHandler = downloadHandler.bind(this);
        this.awaitLoading = awaitLoading.bind(this);
        this.fetchHandler = this.fetchHandler.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange (location) {
        const config = assignRoute(location.pathname);
        this.awaitLoading({...config})
    }

    fetchHandler(params){
        return  this.state.fetchData(params)
                .catch(
                    err => {console.log(err);}
                )
    }

    shouldComponentUpdate(np,ns){
        return  np.location !== this.props.location
                || ns.loadFinished !== this.state.loadFinished;
    }

    componentDidUpdate(pp,ps){
        if(pp.location.pathname !== this.props.location.pathname)
            this.routeChange(this.props.location)
    }

    componentDidMount() {
        this.routeChange(this.props.location)
    }

    componentWillUnmount() {
    }

    render() {
        const   location = this.state.location
                        ? `escritorio${this.state.location.pathname}`
                        : `escritorio`;
        return (
            <WaitsLoading.Provider value={this.fetchHandler}>
                <LoadBar loaded={this.state.loading}/>
                <div    className="col-md-2 no-padding white-background">
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
                                                                location:this.state.location,
                                                                message:this.state.message
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

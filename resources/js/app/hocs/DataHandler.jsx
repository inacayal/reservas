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
import {DisplaysMessages} from './MessageHandler';

function searchHandler (path) {
    return handlerArray.filter(
        c => path.match(c.match)
    ).pop();
}

function awaitLoading ({
    handler,
    route,
    user
}){
    this.setState({
            loading:0,
            loadFinished:false,
            fetchData: handler.callback({
                params:route.params,
                user
            }).bind(this),
        },() => this.fetchHandler(
            this.props.location.state||{}
        )
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
        this.user = this.props.user;
        this.downloadHandler = downloadHandler.bind(this);
        this.awaitLoading = awaitLoading.bind(this);
        this.fetchHandler = this.fetchHandler.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }

    static contextType = DisplaysMessages;

    routeChange (location) {
        const config = assignRoute(location.pathname);
        this.awaitLoading({...config,user:this.user})
    }

    fetchHandler(params){
        return this.state.fetchData(params)
            .catch(this.context.backEndError)
    }

    shouldComponentUpdate(np,ns){
        return  np.location !== this.props.location
            || ns.loadFinished !== this.state.loadFinished;
    }

    componentDidUpdate(pp,ps){
        if(pp.location.pathname !== this.props.location.pathname){
            this.routeChange(this.props.location)
        }
    }

    componentDidMount() {
        this.routeChange(this.props.location)
    }

    componentWillUnmount() {
    }

    render() {
        const location = this.state.location
                ? `escritorio${this.state.location.pathname}`
                : `escritorio`,
            path = (this.state.location||this.props.location).pathname;

        return (
            <WaitsLoading.Provider value={this.fetchHandler}>
                <LoadBar loaded={this.state.loading}/>
                <div className="col-md-12 d-none d-md-block"
                     style={{
                         zIndex:5,
                         height:"6vh",
                         marginTop:"6px",
                         backgroundColor:'rgba(255,255,255,0.95)'
                     }} >
                    <div className="row small-v-padding margin-left">
                        <BreadCrumb url={location}
                            nombre={this.state.nombre}/>
                    </div>
                </div>
                <div className="sticky-top col-md-2 no-padding d-none d-md-block"
                    style={{
                        zIndex:4,
                        height:"100%"
                    }} >
                    <Lateral current={path}
                        items={sidebar}/>
                    <div className="text-center v-padding align-center">Designed by santiago</div>
                </div>
                <div className="col-md-10">
                    {
                        (this.state.data)
                        ?
                            <div style={{padding:"10px 16px"}}
                                className="main-container">
                                <div className="visible relative">
                                    <div className={
                                        this.state.loadFinished
                                            ? "hidden"
                                            : "top-padding full-width overlay"
                                        }/>
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
            </WaitsLoading.Provider>
        );
    }
}

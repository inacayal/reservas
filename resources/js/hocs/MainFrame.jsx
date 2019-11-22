/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {matchPath} from 'react-router-dom';
import Message from '../utils/Message';
/**
 * navigation
 */
import Profile from '../componentes/control/Profile';
import {RouterTransition} from './RouterTransition';

export const searchHandler = (handlerArray,path) => {
    const handler = handlerArray.filter((c,i) => {
        if (path.match(c.match))
            return c;
    });
    return handler[0];
}

export const DisplaysMessages = React.createContext({});

export default class MainFrame extends Component {
    constructor(props){
        super(props);
        this.state={
            showMessage:false,
            message:{}
        }
        this.showMessage = this.showMessage.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    hideMessage(){
        if (this.state.showMessage)
            this.setState({
                showMessage:false,
                message:{}
            });
    }

    showMessage({message}){
        this.setState({
                showMessage:true,
                message:message
            }
        );
        setTimeout(this.hideMessage,5000);
    }

    render(){
        const props = this.props,
            location = props.location,
            handler =searchHandler(props.handlers,location.pathname),
            match = matchPath(location.pathname,{path:handler.endpoint});
        return (
            <div className="row round-border" style={{height:'95%',overflow:'hidden'}}>
                <Message
                    hide={this.hideMessage}
                    show={this.state.showMessage}
                    message={this.state.message}/>
                <DisplaysMessages.Provider value={this.showMessage}>
                    <RouterTransition
                        message={this.state.showMessage}
                        url={window.location.href.replace(/((http:\/\/|https:\/\/)localhost\/|\/$)/gi, '')}
                        sidebarElem={props.current}
                        route={match}
                        location={location.pathname}
                        handlerArray = {props.handlers}>
                        {props.children}
                    </RouterTransition>
                </DisplaysMessages.Provider>
                <div className="col-md-2 hidden-sm white-background">
                    <Profile />
                </div>
            </div>
        )
    }
}

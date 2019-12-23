/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from '../utils/Message';
/**
 * navigation
 */
export const DisplaysMessages = React.createContext({});

export default class MessageHandler extends Component {
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
        return (
            <>
                <Message    hide={this.hideMessage}
                            show={this.state.showMessage}
                            message={this.state.message}/>
                <DisplaysMessages.Provider value={this.showMessage}>
                    {
                        React.cloneElement(
                            this.props.children,
                            {displayMessage:this.showMessage}
                        )
                    }
                </DisplaysMessages.Provider>
            </>
        )
    }
}

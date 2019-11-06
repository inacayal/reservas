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
export default class RequestHandler extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:null,
            loadFinished:false,
            loading:0,
            open:false
        };
        this.downloadHandler = this.downloadHandler.bind(this);
        this.modal = this.props.modal.bind(this);
        this.fetchHandler = this.props.fetchHandler.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(e) {
        e.preventDefault();
        this.setState({
            open: !this.state.open
        })
    }

    downloadHandler(pEvent) {
        let
            loading = Math.round((pEvent.loaded * 100) / pEvent.total),
            state = loading !== 100 ?
                { loading, loadFinished: false }
                : { loading, loadFinished: true };
        this.setState(state);
    }

    componentDidMount() {
        this.fetchHandler();
    }

    render(){
        if (this.state.data && this.state.loadFinished){
            return (
                <>
                    <this.modal />
                    <this.props.component
                        data={this.state.data}
                        toggleModal={this.toggleModal}/>
                </>
            );
        }
        else
            return (<LoadBar loaded={this.state.loading}/>);
    }
}

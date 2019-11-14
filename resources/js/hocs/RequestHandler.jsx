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
        this.fetchHandler = this.fetchHandler.bind(this);
        this.fetchData = this.props.fetchHandler.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal (e){
        e.preventDefault();
        this.setState({open:!this.state.open});
    }

    downloadHandler(pEvent) {
        let
            loading = Math.round((pEvent.loaded * 100) / pEvent.total),
            state = loading !== 100 ?
                { loading, loadFinished: false }
                : { loading, loadFinished: true };
        this.setState(state);
    }

    fetchHandler(params){
        this.setState({
            loadFinished:false,
            loading:0
        });
        this.fetchData(params);
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
                <this.props.modal
                    open={this.state.open}
                    closeModal={this.toggleModal}/>
                {
                    (this.state.data && this.state.loadFinished)
                    ?
                        <div style={{padding:"10px 16px", height:"99%"}} className="main-container h-overflow-auto">
                            <this.props.component
                                fetch={this.fetchHandler}
                                data={this.state.data}
                                toggleModal={this.toggleModal}/>
                        </div>
                    :
                        <></>
                }
            </>
        );
    }
}

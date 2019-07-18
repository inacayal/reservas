import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonList from '../../../componentes/complex/allUse/ButtonList';
import { formActions, formNavigation, panelNavigation } from '../../../funciones/generateActions';
import ConfirmarModal from '../../../modal/Modal';
export default class Locales extends Component {
    constructor(props){
        super(props);
        this.state={
            open:false,
        }
        this.eliminar=this.eliminar.bind(this);
        this.volver=this.volver.bind(this);
        this.editHandlers = formNavigation(this.volver,this.eliminar);
        this.closeModal = this.closeModal.bind(this);
    }

    volver(e){
        console.log('volver');
    }

    eliminar(e){
        this.setState({
            open:true
        })
    }

    closeModal(e){
        this.setState({open:false});
    }

    render(){
        return (
            <div className={(this.props.panel) ? "full-width container" : "hidden"}>
                <div>
                    <ButtonList
                        displayList="flex-row nav-list no-padding inline-block  align-center"
                        container="side-margin inline-block"
                        elems={this.editHandlers} />
                </div>
                <div>
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.closeModal}
                        title="props.title"
                        content="props.content"/>
                </div>
            </div>
        )
    }
}

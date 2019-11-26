/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {DisplaysMessages} from './MainFrame';
import Actions from '../componentes/basic/Actions';
import {FormActions} from '../acciones/ActionsByView'
import {
    validateValue,
    formatErrors,
    searchErrors,
    resetDependencies,
    assignValues
} from './handlers/validatorHandlers';

export default class Validator extends Component{
    constructor(props){
        super(props);
        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);
        this.sendPutRequest   = this.sendPutRequest.bind(this);
        this.sendPostRequest = this.sendPostRequest.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
        this.actions = FormActions(this.enviarFormulario,this.cancelarFormulario);
        this.state = {
            form:{},
            errors:{},
            validation:{}
        };
    }

    static contextType = DisplaysMessages;

    changeFormField(e){
        const   input = e.currentTarget||e,
                name = input.getAttribute('name'),
                value = input.getAttribute('needsvalue') === '1'
                    ? input.value
                    : input.getAttribute('value'),
                [form,errors] = assignValues(
                    value,
                    name,
                    this.state.form,
                    this.state.validation,
                    this.state.errors
                );
        this.setState({form,errors});
    }

    enviarFormulario(e){
        e.preventDefault();
        const [hasErrors,errors] = searchErrors(
                this.state.errors,
                this.state.validation,
                this.state.form
            );
        if (hasErrors.length>0)
            this.setState(
                {errors},
                () =>
                    this.context({
                        message:{
                            data:(
                                <ul className="h-padding nav-list">
                                    {hasErrors}
                                </ul>
                            ),
                            title:(
                                <>
                                    <i className="far fa-exclamation-triangle bold sub-title side-margin" />
                                    <span className="side-margin">Errores</span>
                                </>
                            ),
                            type:'failure',
                            update:false
                        }
                    })
            );
        else
            this.context({
                message:{
                    data:'no errors found',
                    type:'success',
                    update:false
                }
            })
    }

    cancelarFormulario(e){
        e.preventDefault();
        this.context({
            message:{
                data:'cancelar from Ubicaciones form',
                type:'failure',
                update:false
            }
        })
    }

    static getDerivedStateFromProps (props){
        return {
            form:props.form,
            validation:props.validation
        }
    }

    sendPostRequest(){

    }

    sendPutRequest(){

    }

    render(){
        const Form = React.cloneElement(
            this.props.children,
            {
                fields:this.state.form,
                change:this.changeFormField,
                errors:this.state.errors
            }
        );
        return (
            <form className="full-width">
                {Form}
                <div className="row justify-content-end h-padding">
                    <Actions buttons={Object.values(this.actions)}/>
                </div>
            </form>
        )
    }
}

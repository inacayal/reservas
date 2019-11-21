/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {DisplaysMessages} from './MainFrame';
/**
 * react router
 */
import Actions from '../componentes/basic/Actions';

const evaluateRule = {
    required:({val,name}) => {
        if (val==="" || !val)
            return `el campo ${name} no puede estar vacío`;
    },
    min:({val,min,name}) => {
        if (parseInt(val) < min)
            return `el campo ${name} no puede ser menor a ${min}`;
    },
    max:({val,max,name}) => {
        if (parseInt(val) > max)
            return `el campo ${name} no puede ser mayor a ${max}`;
    },
    alpha_numeric:({val,name}) => {
        if (val.match(/[^a-zA-Z\d\s:\,\.\;\:]/gi))
            return `el campo ${name} debe contener caracteres alfanuméricos`;
    },
    numeric: ({val,name}) => {
        if (val.match(/[^\d]/gi))
            return `el campo ${name} debe contener únicamente números`;
    }
}

const extFields = ['max','min'];

const validateValue = (val,rules,name) =>
    Object.keys(rules).reduce(
        (tot,r) => {
            const arg = {
                val:val,
                name:name
            };
            if (extFields.indexOf(r)!==-1)
                arg[r] = rules[r];
            const err = evaluateRule[r](arg);
            if (err)
                tot.push(err);
            return tot;
        }, []
    );

export default class Validator extends Component{
    constructor(props){
        super(props);
        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);
        this.sendPutRequest   = this.sendPutRequest.bind(this);
        this.sendPostRequest = this.sendPostRequest.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
        this.state = {
            form:{},
            errors:{},
            validation:{}
        };
        this.actions =[
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-times-circle inline-box side-margin" />
                        Cancelar
                    </div>
                ),
                click: this.cancelarFormulario
            },
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-check-circle inline-box side-margin" />
                        Guardar
                    </div>
                ),
                click: this.enviarFormulario
            },
        ];
    }

    static contextType = DisplaysMessages;

    changeFormField(e){
        e.preventDefault();

        const input = e.currentTarget,
            name = e.target.name,
            form = this.state.form,
            errors = this.state.errors,
            er = validateValue(input.value,this.state.validation[name],name);

        form[name]=input.value;
        errors[name] = er;

        this.setState({form,errors});
    }

    enviarFormulario(e){
        e.preventDefault();
        this.context({
            message:{
                data:'clicked from Ubicaciones form',
                type:'success'
            }
        })
    }

    cancelarFormulario(e){
        e.preventDefault();
        this.context({
            message:{
                data:'cancelar from Ubicaciones form',
                type:'failure'
            }
        })
    }

    static getDerivedStateFromProps (props){
        return {
            form:props.form,
            errors:{},
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
        console.log(this.state.errors)
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

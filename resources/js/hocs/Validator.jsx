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
import {FormActions} from '../acciones/ActionsByView'

const evaluateRule = {
    required:({val,name}) => {
        if (val=="" || !val)
            return {
                description:`el campo ${name} no puede estar vacío`,
                type:'required',
                field:name
            };
    },
    min:({val,min,name}) => {
        if (parseInt(val) < min)
            return {
                description:`el campo ${name} no puede ser menor a ${min}`,
                type:'min',
                field:name
            };
    },
    max:({val,max,name}) => {
        if (val.length > max){
            return {
                description:`el campo ${name} no puede tener más de ${max} caracteres`,
                type:'max',
                field:name
            };
        }
    },
    alpha_numeric:({val,name}) => {
        if (val.match(/[^a-zA-Z\d\s\,\.ñáéíóú]/gi))
            return {
                description:`el campo ${name} debe contener caracteres alfanuméricos`,
                type:'alpha_numeric',
                field:name
            };
    },
    email:({val,name}) => {
        if (!val.match(/@/gi))
            return {
                description:`el campo ${name} debe ser un correo`,
                type:'email',
                field:name
            };
    },
    numeric: ({val,name}) => {
        if (val.match(/[^\d]/gi))
            return {
                description:`el campo ${name} debe contener únicamente números`,
                type:'numeric',
                field:name
            };
    },
    phone: ({val,name}) => {
        if (val.match(/[^\d\-\s]/gi))
            return {
                description:`el campo ${name} debe ser un número de teléfono`,
                type:'phone',
                field: name
            };
    }
}

const extFields = ['max','min'];

const validateValue = (val,{rules,fieldName}) =>
    Object.keys(rules).reduce(
        (t,r) => {
            const arg = {
                val:val,
                name:fieldName
            };
            if (extFields.indexOf(r)!==-1){
                arg[r] = rules[r];
            }
            const err = evaluateRule[r](arg);
            if (err)
                t.push(err);
            return t;
        }, []
    );

const formatErrors = (errors,name,ind) => (
    <li key={ind}>
        <div className="bold smaller-text">
            {`En el campo ${name}`}
        </div>
        <ul className="h-padding">
        {
            errors.map(
                (e,i) => <li key={i} className="smaller-text">{e.description}</li>
            )
        }
        </ul>
    </li>
)

const searchForErrors = (errors,fields) =>
    Object.keys(errors).reduce(
        (t,e,i) => {
            const err = errors[e].length>0
                ?
                    formatErrors(
                        errors[e],
                        fields[e].fieldName,
                        i
                    )
                :
                    null;
            if (err){
                t.push(err);
            }
            return t;
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
        this.actions = FormActions(this.enviarFormulario,this.cancelarFormulario);
        this.state = {
            form:{},
            errors:{},
            validation:{}
        };
    }

    static contextType = DisplaysMessages;

    changeFormField(e){
        e.preventDefault();
        const input = e.currentTarget,
            name = input.getAttribute('name'),
            value = input.getAttribute('value') === null ? input.value : input.getAttribute('value'),
            form = this.state.form,
            errors = this.state.errors,
            er = validateValue(value.toString(),this.state.validation[name]);

        form[name]=value;
        errors[name] = er;
        this.setState({form,errors});
    }

    enviarFormulario(e){
        e.preventDefault();
        const hasErrors = searchForErrors(this.state.errors,this.state.validation);
        if (hasErrors.length>0)
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
                    type:'failure'
                }
            })
        else
            this.context({
                message:{
                    data:'no errors found',
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

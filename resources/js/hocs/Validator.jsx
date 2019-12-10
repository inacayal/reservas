
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {DisplaysMessages} from './MainFrame';
import Actions from '../componentes/basic/Actions';
import {FormActions} from '../acciones/ActionsByView'

const evaluateRule = {
    required:({val,name}) => {
        if (val.length===0 || !val)
            return {
                description:`el campo ${name} no puede estar vacío`,
                type:'required',
                field:name
            };
    },
    maxVal:({val,maxVal,name}) => {
        if (parseInt(val) > maxVal)
            return {
                description:`el campo ${name} no puede ser mayor a ${maxVal}`,
                type:'max',
                field:name
            };
    },
    minVal:({val,minVal,name}) => {
        if (parseInt(val) < minVal)
            return {
                description:`el campo ${name} no puede ser menor a ${minVal}`,
                type:'min',
                field:name
            };
    },
    maxLen:({val,maxLen,name}) => {
        if (val.length > maxLen){
            return {
                description:`el campo ${name} no puede tener más de ${maxLen} caracteres`,
                type:'max',
                field:name
            };
        }
    },
    minLen:({val,minLen,name}) => {
        if (val.length < minLen){
            return {
                description:`el campo ${name} no puede tener menos de ${minLen} caracteres`,
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
        if (!parseInt(val))
            return {
                description:`el campo ${name} debe contener únicamente números`,
                type:'numeric',
                field:name
            };
    },
    phone: ({val,name}) => {
        if (val.match(/[^\d\-\s\(\)]/gi))
            return {
                description:`el campo ${name} debe ser un número de teléfono`,
                type:'phone',
                field: name
            };
    }
}

const cast = {
    array: ($value) => {
        if ($value)
            return $value.split(',').map(e => parseInt(e));
        else return [];
    },
    integer: ($value) => parseInt($value)
}

const extFields = ['maxLen','minVal','maxVal','minLen'];

function validateValue (
    val,
    {rules,fieldName}
) {
    return Object.keys(rules).reduce(
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
}

function formatErrors (
    errors,
    name,
    ind
) {
    return (
        <li key={ind}>
            <ul className="h-padding">
            {
                errors.map(
                    (e,i) =>
                        <li key={i} className="smaller-text small-v-padding">
                            {e.description||e}
                        </li>
                )
            }
            </ul>
        </li>
    );
}

function searchErrors (
    errors,
    fields,
    form
) {
    const frmtErrs = Object.keys(form).reduce(
            (t,e,i) => {
                const   flds = (errors[e]||[]).length>0
                            ? errors[e]
                            : validateValue(form[e],fields[e]),
                        err = flds.length>0
                            ? formatErrors(
                                flds,
                                fields[e].fieldName,
                                i
                            )
                            : null;
                errors[e] = flds;
                if (err){
                    t.push(err);
                }
                return t;
            }, []
        );
    return [frmtErrs,errors];
}

function resetDependencies (
    form,
    vali,
    err,
    name
) {
    vali[name].dependencies.map(
        e => {
            form[e] = "";
            err[e] = validateValue("",vali[e]);
        }
    );
    return [form,err];
}

function assignValues (
    value,
    name,
    form,
    validate,
    err
) {
    if ((validate[name].dependencies||[]).length > 0 && (value === "" || value === null))
        [form,err] = resetDependencies(
            form,
            validate,
            err,
            name
        );
    form[name] =  value;
    err[name] = validateValue(value,validate[name])
    return [form,err];
};

const castBeforeSending = (values,validation) =>
    Object.keys(values).reduce(
        (final,current) => {
            const type = validation[current].casting;
            final[current] = type
                ? cast[type](values[current])
                : values[current];
            return final;
        }
    ,{});

export function displayErrors ([hasErrors,errors]){
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
}

const rewriteErrors = (errors) => Object.keys(errors).reduce(
    (tot,cur) => {
        const ind = cur.match(/\./gi)
            ? cur.split('.')[0]
            : cur;
        if (tot[ind])
            tot[ind].push(errors[cur][0]);
        else
            tot[ind] = [errors[cur][0]]
        return tot;
    },
    {}
)

export default class Validator extends Component{
    constructor(props){
        super(props);

        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
        this.displayErrors = displayErrors.bind(this);
        this.actions = FormActions(this.enviarFormulario,this.cancelarFormulario);
        this.requestHandler = this.props.sendRequest.bind(this);
        this.displayBackendErrors = this.displayBackendErrors.bind(this);

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

    displayBackendErrors(errors){
        const   rewrittenErrors = rewriteErrors(errors.response.data.errors),
                [hasErrors,err] = searchErrors(
                    rewrittenErrors,
                    this.state.validation,
                    this.state.form
                );
        this.displayErrors([hasErrors,err]);
    }

    enviarFormulario(e){
        e.preventDefault();
        const [hasErrors,errors] = searchErrors(
                this.state.errors,
                this.state.validation,
                this.state.form
            );
        if (hasErrors.length>0)
            this.displayErrors([hasErrors,errors]);
        else
            this.requestHandler(
                castBeforeSending(this.state.form,this.state.validation),
                this.displayBackendErrors
            );
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

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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

export function validateValue (
    val,
    {rules,fieldName}
) {
    return Object.keys(rules).reduce(
        (t,r) => {
            const arg = {
                val:val.toString(),
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

export function formatErrors (
    errors,
    name,
    ind
) {
    return (
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
    );
}

export function searchErrors (
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

export function resetDependencies (
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

export function assignValues (
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
    form[name] = value;
    err[name] = validateValue(value,validate[name])
    return [form,err];
}

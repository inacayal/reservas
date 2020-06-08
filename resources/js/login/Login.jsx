import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import Titulo from '../app/componentes/basic/Titulo';
import {
     Text
 } from '../app/componentes/input/Text';
import {
    Password
} from '../app/componentes/input/Password'

import validation from "./validation";
import ValidationHandler from '../app/hocs/ValidationHandler';
import MessageHandler from '../app/hocs/MessageHandler';
import {AuthUser} from '../AppRouting';

function LoginComponent (props) {
    const sendForm = (e) => {
        e.preventDefault();
        props.logUser(props.fields);
    }

    return (
        <>
            <div className="container-fluid" style={{marginTop:"10%"}}>
                <div className="row relative visible top-padding justify-content-center">
                    <div className="col-md-8 col-lg-4 col-sm-12">
                        <Titulo title="Login"/>
                        <Text rows={1}
                            titulo="Email"
                            holder="Email de usuario"
                            name="email"
                            value={props.fields.email}
                            changeHandler={props.change}
                            errors={props.errors.email}/>
                        <div className="top-padding">
                            <Password titulo="Password"
                                holder="Contraseña"
                                name="password"
                                value={props.fields.password}
                                changeHandler={props.change}
                                errors={props.errors.password}/>
                        </div>
                        <button onClick={sendForm}>
                            Ingresar
                        </button>
                    </div>
                </div>
                <div className="row">
                </div>
            </div>
        </>
    );
}

export default function Login (props){
    const fields = {
        email:"",
        password:""
    };
    return (
        props.auth
        ?
            <Redirect to="/escritorio"/>
        :
            <MessageHandler {...props}>
                <ValidationHandler form={fields}
                    sendRequest={()=>false}
                    validation={validation}
                    hideButtons>
                    <LoginComponent logUser={props.logUser}/>
                </ValidationHandler>
            </MessageHandler>
    )
}

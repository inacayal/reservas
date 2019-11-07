/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import ButtonList from '../basic/ButtonList';

function Profile(props) {
    return (
        <div className="container extra-v-box-padding">
            <div className="row box-padding white-background">
                <div>
                    foto perfil
                </div>
                <div>
                    logout y otros
                </div>
            </div>
        </div>
    );
}
export default React.memo(Profile);

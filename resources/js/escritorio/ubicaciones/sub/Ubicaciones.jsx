/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
import {CardList} from '../../../componentes/basic/CardList';
import ButtonList from '../../../componentes/basic/ButtonList';
import { ConfirmarModal, closeModal } from '../../../componentes/modal/Modal';
/**
 * funciones
 */
import generateUbicacionesCard from './generateUbicacionesCard';
/**
 * api
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';

export const handler = (
    endpoint
) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    this.setState({
                        data: response.data.ubicaciones.data,
                        loadFinished:true
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}

export const Ubicaciones = (props) => {
    const ubicaciones = generateUbicacionesCard(
            props.data,
            {eliminar:props.toggleModal}
        );
    return (
        <>
            <Titulo
                title="Ubicaciones"
                links={props.nav.links} />
            <div className="container-fluid">
                <div className="row">
                    <div className="bold">
                        {"Mostrando " + ubicaciones.length + " ubicaciones encontradas"}
                    </div>
                    <ul className="full-width nav-list no-padding">
                        {
                            ubicaciones.map(
                                (elem, index) =>
                                    <li key={index} className={elem.class}><elem.content /></li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

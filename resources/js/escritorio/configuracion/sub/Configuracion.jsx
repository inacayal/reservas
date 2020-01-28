import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import Titulo from '../../../componentes/basic/Titulo';
import generateConfigurationCards from '../../../generators/configuracionGenerator';

export default function Configuracion (props) {
    const configuracion = generateConfigurationCards(
        props.data
    );
    return (
        <>
            <Titulo title="Configuración"/>
            <ul className="full-width nav-list h-padding">
                {
                    configuracion.map(
                        (elem, index) =>
                            <li key={index} className={elem.class}><elem.content /></li>
                    )
                }
            </ul>
        </>
    );
}

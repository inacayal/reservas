/**
 * react basic
 */
import React, {
    Component,
    useContext
} from 'react';
import ReactDOM from 'react-dom';
import ButtonList from '../basic/ButtonList';
import Search from '../search/Search';

function BarraNavegacion(props) {
    const user = props.user;
    let items = [
        {
            title: (
                <i className="fas fa-bars" />
            )
        }
    ];
    return (
        <>
            <div className="col-sm-8 relative small-v-padding">
                <div className="inline-block" style={{verticalAlign: "top"}}>
                    <img src={user.usuario.foto_perfil} height="50px" width="50px" alt="foto perfil"/>
                </div>
                <div className="inline-block">
                    <h5 className="bold white-font no-margin">{user.nombre}</h5>
                    <p className="s-font no-margin">{user.franquicia.nombre}</p>
                </div>
            </div>
        </>
    );
}

export default React.memo(BarraNavegacion);

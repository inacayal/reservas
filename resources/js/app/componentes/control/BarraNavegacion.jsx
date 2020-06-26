/**
 * react basic
 */
import React, {
    Component,
    useContext,
    useState
} from 'react';
import ReactDOM from 'react-dom';
import ButtonList from '../basic/ButtonList';
import Search from '../search/Search';

function BarraNavegacion(props) {
    const user = props.user,
        [showop,toggle] = useState(false),
        togFunc = e => {
            e.preventDefault();
            toggle(!showop);
        };
    return (
        <div className="col-md-8 col-lg-5 col-sm-12 col-xl-3 relative no-padding" style={{marginRight:"0.5%"}}>
            <button onClick={togFunc}
                className="no-background no-border margin-box small-padding text-left full-width">
                <div className="container-fluid no-padding">
                    <div className="row justify-content-between align-items-end">
                        <div className="col-md-2 align-items-center d-flex">
                            <img style={{
                                    borderRadius:"50%",
                                    border:"solid 2px var(--border)"
                                }}
                                src={user.usuario.foto_perfil}
                                className="h-margin"
                                height="40px"
                                width="40px"
                                alt="foto perfil"/>
                        </div>
                        <div className="col-md-6 white-font no-padding">
                            <span className="bold">{user.nombre}</span>
                            <div className="smaller-text">
                                {user.usuario.email}
                            </div>
                        </div>
                        <div className="col-md-4 text-right" style={{color:"var(--border)"}}>
                            <i className={`fas small-padding fa-angle-${showop ? "up" : "down"}`}/>
                        </div>
                    </div>
                </div>
            </button>
            <div className={
                showop
                    ? "visible relative"
                    : "hidden"
                } style={{zIndex:6}}>
                <div className="arrow-up"
                    style={{
                        borderBottomColor:"white",
                        marginTop:"-10px",
                        marginLeft:"90%",
                        zIndex:50,
                        position:"relative"
                    }}/>
                <div style={{margin:"-1px auto auto 30%"}}
                    className="white-background shadow-result seventy sidebar-box round-border">
                    <ul className="nav-list no-padding">
                        <li className="box-transparent full-width text-left box-padding highlight-hover bold-hover text">
                            <button className="box-transparent"
                            onClick={
                                e => {
                                    e.preventDefault();
                                    props.logout({err:null});
                                }
                            }>
                                <i className="fas small-padding fa-sign-out-alt"/>
                                Cerrar Sesión
                            </button>
                        </li>
                        <li className="box-transparent full-width text-left box-padding highlight-hover bold-hover text">
                            <i className="fas small-padding fa-bell"/>
                            Notificaciones
                        </li>
                        <li className="text-center light-background full-width text-left box-padding highlight-hover bold-hover text">
                            <img style={{
                                borderRadius:"50%",
                                border:"solid 2px var(--black)"
                            }}
                                src={user.franquicia.usuario.foto_perfil}
                                className="h-margin"
                                height="30px"
                                width="30px"
                                alt="foto perfil"/>
                            <span className="small-margin inline-block">{user.franquicia.nombre}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default React.memo(BarraNavegacion);

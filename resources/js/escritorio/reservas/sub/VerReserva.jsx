/**
 * react basic
 */
import React, {
    Component
} from 'react';
import {Redirect} from 'react-router-dom';
import CustomLink from '../../../componentes/basic/CustomLink';
import ReactDOM from 'react-dom';
import {Calendario} from '../../horarios/formularios/Calendario';
import {MONTHS} from '../../../constantes/DaysMonths';
import Titulo from '../../../componentes/basic/Titulo';
import {ReservasActions} from '../../../acciones/ReservasActions';

export class VerReserva extends Component {
    constructor(props){
        super(props);
        this.actions = {
            aceptar: this.aceptarReserva.bind(this),
            rechazar: this.rechazarReserva.bind(this),
            revertir: this.revertirReserva.bind(this)
        };

    }

    revertirReserva() {
        console.log('revertir');
    }

    aceptarReserva() {
        console.log('aceptarReserva');
    }

    rechazarReserva() {
        console.log('rechazarReserva');
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        console.log('localesUnmount');
    }

    render() {
        const   data = this.props.data,
                actions = ReservasActions.day[data.estado](this.actions,data.estado),
                date = new Date(`${data.fechaReserva} 00:00`),
                ElemByState = {
                    Aprobada: ()=>(
                        <div className="bold text-right full-width" style={{position:'absolute',bottom:0,right:'10px'}}>
                            <i className="fas fa-check-circle inline-box side-margin"/>
                            Aprobada
                        </div>
                    ),
                    Rechazada: ()=>(
                        <div className="bold text-right full-width" style={{position:'absolute',bottom:0,right:'10px'}}>
                            <i className="fas fa-times-circle inline-box side-margin"/>
                            Rechazada
                        </div>
                    ),
                    Pendiente: ()=>(
                        <div className="bold text-right full-width" style={{position:'absolute',bottom:0,right:'10px'}}>
                            <i className="fas fa-history inline-box side-margin"/>
                            Pendiente
                        </div>
                    )
                },
                eventoParam = {
                    to:`/eventos/${data.evento.id}`,
                    params:{id:data.evento.id},
                    route:'eventos'
                },
                ubicacionParam = {
                    to:`/ubicaciones/${data.ubicacion.id}`,
                    params:{id:data.ubicacion.id},
                    route:'ubicaciones'
                },
                promoParam = {
                    to:`/promociones/${data.promocion.id}`,
                    params:{id:data.promocion.id},
                    route:'promociones'
                };
        return (
            <>
                <Titulo title={`Reserva de ${data.nombre} ${data.apellido}`}
                        links={[this.props.nav.links[0]]}
                        buttons ={actions.buttons}/>
                <div className="container">
                    <div className="m-font light-danger row">
                        {
                            data.DNI
                            ? (
                                <>
                                    <span className="bold">
                                        DNI
                                    </span>
                                    <span className="text">
                                        {data.dni}
                                    </span>
                                </>
                            )
                            : (
                                <span className="bold">Sin DNI</span>
                            )
                        }

                    </div>
                    <div className="row v-padding">
                        <div className="col-md-6 container">
                            <div className="row">
                                <Calendario editar={true}
                                            date={date}
                                            data={data}/>
                            </div>
                        </div>
                        <div className="col-md-6 container">
                            <div className="row">
                                <div className="col-md-8 no-padding">
                                    <span className="mid-title inline-block">
                                        {`${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`}
                                    </span>
                                    <span className="c-title inline-block">{`${data.hora_reserva} horas`}</span>
                                </div>
                                <div className="col-md-4 text-right mid-font relative">
                                    {ElemByState[data.estado]()}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="m-font light-danger row">
                                        Correo
                                    </div>
                                    <div className="row">
                                        {data.email}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row top-padding top-padding m-font light-danger">
                                        Telefono
                                    </div>
                                    <div className="row">
                                        {data.telefono}
                                    </div>
                                </div>
                            </div>
                            <div className="row top-padding">
                                <div className="col-md-6 no-padding">
                                    <div className="m-font light-danger">
                                        Evento:
                                        <CustomLink params = {eventoParam}>
                                            <span className="side-margin">
                                                {data.evento.nombre}
                                            </span>
                                        </CustomLink>
                                    </div>
                                    {data.evento.descripcion||"sin definir"}
                                </div>
                                <div className="col-md-6 no-padding">
                                    <div className="m-font light-danger">
                                        Promoción:
                                        <CustomLink params = {promoParam}>
                                            <span className="side-margin">
                                                {data.promocion.nombre||"sin definir"}
                                            </span>
                                        </CustomLink>
                                    </div>
                                    {data.promocion.descripcion||"sin definir"}
                                    <div className="small-v-padding bold">
                                        {`${data.promocion.descuento}% descuento`||'sin definir'}
                                    </div>
                                </div>
                            </div>
                            <div className="row top-padding">
                                <div className="col-md-6 no-padding">
                                    <span className="light-danger side-margin m-font ">
                                        Ubicación:
                                    </span>
                                    <CustomLink params={ubicacionParam}>
                                        <span className="side-margin">
                                            {data.ubicacion.nombre||"sin definir"}
                                        </span>
                                    </CustomLink>
                                    <div>
                                        {data.ubicacion.descripcion||"sin definir"}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="m-font light-danger row">
                                        Cantidad de personas
                                    </div>
                                    <div className="row">
                                        <span className="m-font bold side-margin inline-block">
                                            {data.personas}
                                        </span>
                                        personas
                                    </div>
                                </div>
                            </div>
                            <div className="row highlight m-font top-padding">
                                Observaciones:
                            </div>
                            <div className="row">
                                {data.descripcion}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

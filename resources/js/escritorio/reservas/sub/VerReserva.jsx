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
                        <div className="bold">
                            <i className="fas fa-check-circle inline-box side-margin"/>
                            Aprobada
                        </div>
                    ),
                    Rechazada: ()=>(
                        <div className="bold">
                            <i className="fas fa-times-circle inline-box side-margin"/>
                            Rechazada
                        </div>
                    ),
                    Pendiente: ()=>(
                        <div className="bold">
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
                <div className="container v-padding">
                    <div className="row v-padding">
                        <div className="col-md-10 container">
                            <div className="row">
                                <div className="col-md-6 mid-title">
                                    {`${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`}
                                </div>
                                <div className="col-md-6 text-right mid-font">
                                    {ElemByState[data.estado]()}
                                </div>
                            </div>
                            <div className="row">
                                <Calendario editar={true}
                                            date={date}
                                            data={data}/>
                            </div>
                        </div>
                    </div>
                    <div className="row v-padding">
                        <div className="col-md-11 container">
                            <div className="row c-title">
                                {`${data.hora_reserva} horas`}
                            </div>
                            <div className="row">
                                <div className="col-md-6 container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mid-font light-danger">
                                                DNI
                                            </div>
                                            <div>
                                                {data.dni||"sin DNI"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row top-padding">
                                        <div className="col-md-12">
                                            <div className="mid-font light-danger">
                                                Correo
                                            </div>
                                            <div>
                                                {data.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row top-padding top-padding">
                                        <div className="col-md-12">
                                            <div className="mid-font light-danger">
                                                Telefono
                                            </div>
                                            <div>
                                                {data.telefono}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 top-padding">
                                            <div className="mid-font light-danger">
                                                Cantidad de personas
                                            </div>
                                            <div>
                                                <span className="mid-font bold side-margin inline-block">
                                                    {data.personas}
                                                </span>
                                                personas
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span className="mid-font light-danger side-margin">
                                                Evento:
                                            </span>
                                            <CustomLink params = {eventoParam}>
                                                <span className="side-margin">
                                                    {data.evento.nombre}
                                                </span>
                                            </CustomLink>
                                            <div>
                                                {data.evento.descripcion||"sin definir"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row top-padding">
                                        <div className="col-md-12">
                                            <span className="mid-font light-danger side-margin">
                                                Promoción:
                                            </span>
                                            <CustomLink params = {promoParam}>
                                                <span className="side-margin">
                                                    {data.promocion.nombre||"sin definir"}
                                                </span>
                                            </CustomLink>
                                            <div>
                                                {data.promocion.descripcion||"sin definir"}
                                            </div>
                                            <div className="small-v-padding">
                                                <span className="side-margin">
                                                    descuento:
                                                </span>
                                                <span className="side-margin">
                                                    {data.promocion.descuento+"%"||"sin definir"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row top-padding">
                                        <div className="col-md-12">
                                            <span className="mid-font light-danger side-margin">
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
                                    </div>
                                    <div className="row v-padding">
                                        <div className="col-md-12 mid-font light-danger">
                                            Observaciones:
                                        </div>
                                        <div className="col-md-12">
                                            {data.descripcion}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

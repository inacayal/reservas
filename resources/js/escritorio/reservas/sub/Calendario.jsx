/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * axios
 */
import {GET} from '../../../utils/api';
/**
 * componentes
 */
import Calendar from '../../../componentes/calendario/Calendar';
import LoadBar from '../../../componentes/control/LoadBar';
import Titulo from '../../../componentes/basic/Titulo';
/**
 * constantes
 */
import { ALL_CONTROL } from '../../../constantes/CalendarControls';

const data = {
    1559358000000: {
        show: false,
        reservas: {
            1559435400000: [{
                id: 1,
                nombre: "Yelitza",
                apellido: "Quagliarello",
                telefono: "13123",
                evento: "reunion",
                estado: "aprobado",
                descripcion: "descripcion1",
                personas: "18"
            }],
            1559439000000: [{
                id: 21,
                nombre: "Santiago",
                apellido: "Guevara",
                telefono: "5465464",
                evento: "negocios",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "17"
            }],
            1559440800000: [{
                id: 12,
                nombre: "Noelia",
                apellido: "Mora",
                telefono: "6546548",
                evento: "reunion",
                descripcion: "descripcion1",
                estado: "rechazado",
                personas: "16"
            }]
        }
    },
    1560481200000: {
        show: false,
        reservas: {
            1560544200000: [{
                id: 2,
                nombre: "Natali",
                apellido: "Diaz",
                telefono: "654987987",
                evento: "negocios",
                descripcion: "descripcion1",
                estado: "pendiente",
                personas: "15"
            }],
            1560547800000: [{
                id: 36,
                nombre: "Reyna",
                apellido: "Diaz",
                telefono: "646546987",
                evento: "cumpleaños",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "14"
            }],
        }
    },
    1561345200000: {
        show: false,
        reservas: {
            1561397400000: [{
                id: 4,
                nombre: "Josefina",
                apellido: "Toledo",
                telefono: "545487",
                evento: "negocios",
                descripcion: "descripcion1",
                estado: "rechazado",
                personas: "13"
            }],
            1561400400000: [{
                id: 47,
                nombre: "Noel",
                apellido: "Mora",
                telefono: "65464987",
                evento: "reunion",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "12"
            }],
            1561405800000: [{
                id: 48,
                nombre: "Andres",
                apellido: "Sanchez",
                telefono: "546547",
                evento: "amigos",
                descripcion: "descripcion1",
                estado: "rechazado",
                personas: "11"
            }]
        }
    },
    1561518000000: {
        show: false,
        reservas: {
            1561577400000: [{
                id: 65,
                nombre: "Gerardo",
                apellido: "Mora",
                telefono: "5469879",
                evento: "reunion",
                descripcion: "descripcion1",
                estado: "pendiente",
                personas: "10"
            }],
            1561580400000: [{
                id: 78,
                nombre: "Enrique",
                apellido: "Diaz",
                telefono: "56467987",
                evento: "amigos",
                estado: "aprobado",
                descripcion: "descripcion1",
                personas: "9"
            }],
            1561582200000: [{
                id: 97,
                nombre: "Vicente",
                apellido: "Mora",
                telefono: "546546465",
                evento: "reunion",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "8"
            }],
            1561582800000: [{
                id: 43,
                nombre: "Sebastian",
                apellido: "Diaz",
                telefono: "64654654",
                evento: "negocios",
                estado: "aprobado",
                descripcion: "descripcion1",
                personas: "7"
            }]
        }
    },
    1561690800000: {
        show: false,
        reservas: {
            1561755000000: [{
                id: 74,
                nombre: "Luis",
                apellido: "Mora",
                telefono: "465465",
                evento: "rechazado",
                estado: "pendiente",
                descripcion: "descripcion1",
                personas: "6"
            }, {
                id: 45,
                nombre: "Tyrone",
                apellido: "Gonzalez",
                telefono: "4546546",
                evento: "negocios",
                estado: "aprobado",
                descripcion: "descripcion1",
                personas: "4"
            }],
            1561753200000: [{
                id: 2,
                nombre: "Santiago",
                apellido: "Diaz",
                telefono: "65465465",
                evento: "reunion",
                estado: "aprobado",
                descripcion: "descripcion1",
                personas: "5"
            }],
            1561764600000: [{
                id: 88,
                nombre: "Jose",
                apellido: "Orama",
                telefono: "65464654",
                evento: "negocios",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "3"
            }],
            1561766400000: [{
                id: 98,
                nombre: "Carolina",
                apellido: "Mora",
                telefono: "5456465",
                evento: "amigos",
                descripcion: "descripcion1",
                estado: "rechazado",
                personas: "2"
            }]
        }
    },
    1561777200000: {
        show: false,
        reservas: {
            1561836600000: [{
                id: 87,
                nombre: "Priscilla",
                apellido: "Sanchez",
                telefono: "154654",
                evento: "negocios",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "2"
            }],
            1561854000000: [{
                id: 5,
                nombre: "Genesis",
                apellido: "Ojose",
                telefono: "55+556465",
                evento: "amigos",
                estado: "pendiente",
                descripcion: "descripcion1",
                personas: "9"
            }],
            1561855800000: [{
                id: 413,
                nombre: "Santiago",
                apellido: "Diaz",
                telefono: "4654654",
                evento: "negocios",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "3"
            }],
            1561854600000: [{
                id: 356,
                nombre: "Pedro",
                apellido: "Perez",
                telefono: "56654654",
                evento: "negocios",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "8"
            }],
            1561856400000: [{
                id: 478,
                nombre: "Andres",
                apellido: "Perez",
                telefono: "64654",
                evento: "cumpleaños",
                descripcion: "descripcion1",
                estado: "rechazado",
                personas: "6"
            }],
            1561858200000: [{
                id: 424,
                nombre: "Luis",
                apellido: "Mora",
                telefono: "34654654",
                evento: "reunion",
                estado: "rechazado",
                descripcion: "descripcion1",
                personas: "5"
            }]
        }
    }
};
var horariosReserva = {
    intervalo: "10",
    caida: "20",
    horarios: {
        0: {
            apertura: "15:00:00",
            cierre: "17:30:00",
            estado: "1"
        },
        1: {
            apertura: "14:30:00",
            cierre: "18:00:00",
            estado: "1"
        },
        2: {
            apertura: "16:30:00",
            cierre: "20:30:00",
            estado: "0"
        },
        3: {
            apertura: "15:30:00",
            cierre: "21:00:00",
            estado: "1"
        },
        4: {
            apertura: "16:00:00",
            cierre: "19:30:00",
            estado: "1"
        },
        5: {
            apertura: "17:00:00",
            cierre: "22:30:00",
            estado: "1"
        },
        6: {
            apertura: "21:30:00",
            cierre: "23:00:00",
            estado: "1"
        }
    }
};
export default class Calendario extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            weekRender: true,
            dayRender: true,
            show: "2",
            loading: 0,
            loadFinished: false,
            controls: ALL_CONTROL,
            horarios: horariosReserva,
            data:data
        };
        this.actions = {
            outer: {
                ver: this.verDia.bind(this),
                expandir: this.expandirReservaSemanal.bind(this)
            },
            inner: {
                ver: this.verReserva,
                aceptar: this.aceptarReserva,
                rechazar: this.rechazarReserva,
                revertir: this.revertirReserva
            }
        };
        this.verDia = this.verDia.bind(this);
        this.verReserva = this.verReserva.bind(this);
        this.aceptarReserva = this.aceptarReserva.bind(this);
        this.rechazarReserva = this.rechazarReserva.bind(this);
        this.revertirReserva = this.revertirReserva.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
        this.nav = [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar nueva
                    </div>
                ),
                to: 'reservas/agregar'
            }
        ];
    }

    revertirReserva() {
        console.log('revertir');
    }

    expandirReservaSemanal(e) {
        let show = e.currentTarget.getAttribute('data'),
            data = this.state.data,
            reserve = data[show];
        reserve.show = !reserve.show;
        data[show] = reserve;
        this.setState({ data: data, weekRender: !this.state.weekRender });
    }

    aceptarReserva() {
        console.log('aceptarReserva');
    }

    rechazarReserva() {
        console.log('rechazarReserva');
    }

    verReserva() {
        console.log('verReserva');
    }

    verDia(e) {
        let dt = parseInt(e.currentTarget.getAttribute('data')),
            date = new Date(dt),
            controls = this.state.controls.map(
                (e, i) => {
                    e.class = (i === 3) ?
                        "blue-background highlight-border h-padding small-v-padding"
                        : "box-transparent highlight-hover bordered h-padding small-v-padding transparent-border";
                    return e;
                }
            );
        date.setHours(0, 0, 0, 0);
        this.setState({ show: "3", date: date, controls: controls });
    } 

    /*componentDidMount() {
        const request = GET({
            endpoint: 'reservas/27/08',
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    this.setState({data:response.data});
                }
            )
            .catch(
                error => {
                    console.log('error')
                }
            );
    }*/

    downloadHandler(pEvent) {
        let
            loading = Math.round((pEvent.loaded * 100) / pEvent.total),
            state = loading !== 100 ?
                { loading, loadFinished: false }
                : { loading, loadFinished: true };
        this.setState(state);
    }

    componentWillUnmount() {
        console.log('reservasSubUnmount');
    }

    render(){
        if (this.state.data)
            return (
                <>
                    <Titulo
                        title={"Reservaciones"}
                        links={this.nav} />
                    <div className="container">
                        <Calendar
                            show={this.state.show}
                            horariosReserva={this.state.horarios}
                            date={this.state.date}
                            weekRender={this.state.weekRender}
                            dayRender={this.state.dayRender}
                            actions={this.actions}
                            controls={this.state.controls}
                            data={this.state.data}
                            type="reservas"/>
                    </div>
                </>
                );
        return (
            <LoadBar
                loaded = {this.state.loading}/>
        ); 
    }
}
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Configuracion from './subElements/Configuracion';
import Calendar from '../../../componentes/complex/calendar/Calendar';

var horariosReserva = {
    intervalo: "10",
    caida:"20",
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

const data = {
    1559358000000: {
        show:false,
        reservas: [
            {
                id: 1,
                nombre: "Yelitza",
                apellido: "Quagliarello",
                telefono: "13123",
                hora: "hora1",
                evento: "reunion",
                estado: "aprobado",
                descripcion: "descripcion1",
                personas: "18"
            },
            {
                id: 21,
                nombre: "Santiago",
                apellido: "Guevara",
                telefono: "5465464",
                hora: "hora2",
                evento: "negocios",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "17"
            },
            {
                id: 12,
                nombre: "Noelia",
                apellido: "Mora",
                telefono: "6546548",
                hora: "hora2",
                evento: "reunion",
                descripcion: "descripcion1",
                estado: "rechazado",
                personas: "16"
            }
        ]
    },
    1560481200000: {
        show:false,
        reservas: [
            {
                id: 2,
                nombre: "Natali",
                apellido: "Diaz",
                telefono: "654987987",
                hora: "hora2",
                evento: "negocios",
                descripcion: "descripcion1",
                estado: "pendiente",
                personas: "15"
            },
            {
                id: 36,
                nombre: "Reyna",
                apellido: "Diaz",
                telefono: "646546987",
                hora: "hora2",
                evento: "cumpleaños",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "14"
            },
        ]
    },
    1561345200000: {
        show:false,
        reservas: [
            {
                id: 4,
                nombre: "Josefina",
                apellido: "Toledo",
                telefono: "545487",
                hora: "hora2",
                evento: "negocios",
                descripcion: "descripcion1",
                estado: "rechazado",
                personas: "13"
            },
            {
                id: 47,
                nombre: "Noel",
                apellido: "Mora",
                telefono: "65464987",
                hora: "hora2",
                evento: "reunion",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "12"
            },
            {
                id: 48,
                nombre: "Andres",
                apellido: "Sanchez",
                telefono: "546547",
                hora: "hora2",
                evento: "amigos",
                descripcion: "descripcion1",
                estado: "rechazado",
                personas: "11"
            }
        ]
    },
    1561518000000: {
        show:false,
        reservas: [
            {
                id: 65,
                nombre: "Gerardo",
                apellido: "Mora",
                telefono: "5469879",
                hora: "hora2",
                evento: "reunion",
                descripcion: "descripcion1",
                estado: "pendiente",
                personas: "10"
            },
            {
                id: 78,
                nombre: "Enrique",
                apellido: "Diaz",
                telefono: "56467987",
                hora: "hora2",
                evento: "amigos",
                estado: "aprobado",
                descripcion: "descripcion1",
                personas: "9"
            },
            {
                id: 97,
                nombre: "Vicente",
                apellido: "Mora",
                telefono: "546546465",
                hora: "hora2",
                evento: "reunion",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "8"
            },
            {
                id: 43,
                nombre: "Sebastian",
                apellido: "Diaz",
                telefono: "64654654",
                hora: "hora2",
                evento: "negocios",
                estado: "aprobado",
                descripcion: "descripcion1",
                personas: "7"
            }
        ]
    },
    1561690800000: {
        show:false,
        reservas: [
            {
                id: 74,
                nombre: "Luis",
                apellido: "Mora",
                telefono: "465465",
                hora: "hora2",
                evento: "rechazado",
                estado: "pendiente",
                descripcion: "descripcion1",
                personas: "6"
            },
            {
                id: 2,
                nombre: "Santiago",
                apellido: "Diaz",
                telefono: "65465465",
                hora: "hora2",
                evento: "reunion",
                estado: "aprobado",
                descripcion: "descripcion1",
                personas: "5"
            },
            {
                id: 45,
                nombre: "Tyrone",
                apellido: "Gonzalez",
                telefono: "4546546",
                hora: "hora2",
                evento: "negocios",
                estado: "aprobado",
                descripcion: "descripcion1",
                personas: "4"
            },
            {
                id: 88,
                nombre: "Jose",
                apellido: "Orama",
                telefono: "65464654",
                hora: "hora2",
                evento: "negocios",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "3"
            },
            {
                id: 98,
                nombre: "Carolina",
                apellido: "Mora",
                telefono: "5456465",
                hora: "hora2",
                evento: "amigos",
                descripcion: "descripcion1",
                estado: "rechazado",
                personas: "2"
            }
        ]
    },
    1561777200000: {
        show:false,
        reservas: [
            {
                id: 87,
                nombre: "Priscilla",
                apellido: "Sanchez",
                telefono: "154654",
                hora: "hora2",
                evento: "negocios",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "2"
            },
            {
                id: 5,
                nombre: "Genesis",
                apellido: "Ojose",
                telefono: "55+556465",
                hora: "hora2",
                evento: "amigos",
                estado: "pendiente",
                descripcion: "descripcion1",
                personas: "9"
            },
            {
                id: 413,
                nombre: "Santiago",
                apellido: "Diaz",
                telefono: "4654654",
                hora: "hora2",
                evento: "negocios",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "3"
            },
            {
                id: 356,
                nombre: "Pedro",
                apellido: "Perez",
                telefono: "56654654",
                hora: "hora2",
                evento: "negocios",
                descripcion: "descripcion1",
                estado: "aprobado",
                personas: "8"
            },
            {
                id: 478,
                nombre: "Andres",
                apellido: "Perez",
                telefono: "64654",
                hora: "hora2",
                evento: "cumpleaños",
                descripcion: "descripcion1",
                estado: "rechazado",
                personas: "6"
            },
            {
                id: 424,
                nombre: "Luis",
                apellido: "Mora",
                telefono: "34654654",
                hora: "hora2",
                evento: "reunion",
                estado: "rechazado",
                descripcion: "descripcion1",
                personas: "5"
            }
        ]
    }
}
export default class Reservas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:"2",
            data: data,
            actions:[],
            weekRender:true,
            dayRender:true,

        };
        this.calendarControl = [
            {
                title: "Anual",
                data: "0",
                class: "box-transparent highlight-hover h-padding small-v-padding bordered transparent-border"
            },
            {
                title: "Mensual",
                data: "1",
                class: "box-transparent highlight-hover bordered h-padding small-v-padding transparent-border"
            },
            {
                title: "Semanal",
                data: "2",
                class: "blue-background highlight-border h-padding small-v-padding"
            },
            {
                title: "Diario",
                data: "3",
                class: "box-transparent highlight-hover bordered h-padding small-v-padding transparent-border"
            }
        ];

        this.actions = {
            outer:{
                ver: this.verDia.bind(this),
                expandir: this.expandirReservaSemanal.bind(this)
            },
            inner:{
                ver: this.verReserva.bind(this),
                aceptar: this.aceptarReserva.bind(this),
                rechazar: this.rechazarReserva.bind(this),
                revertir: this.revertirReserva.bind(this)
            }
        };
    }

    revertirReserva(){
        console.log('revertir');
    }

    expandirReservaSemanal(e){
        let show = e.currentTarget.getAttribute('data'),
            data = this.state.data,
            reserve = data[show];
        reserve.show = !reserve.show;
        data[show] = reserve;
        this.setState({data:data,weekRender:!this.state.weekRender});
    }
    aceptarReserva(){
        console.log('aceptarReserva');
    }

    rechazarReserva(){
        console.log('rechazarReserva');
    }

    verReserva(){
        console.log('verReserva');
    }

    verDia(e){
        let day = e.currentTarget.getAttribute('data');
        this.calendarControl.map(
            (e,i) => {
                e.class = i===3 ? 
                    "blue-background highlight-border h-padding small-v-padding"
                    : "box-transparent highlight-hover bordered h-padding small-v-padding transparent-border";
                return e;
            }
        );
        this.setState({show:"3"});
    }

    render() {
        return (
            <div className={(this.props.panel) ? "full-width container" : "hidden"}>
                <div className={(this.props.currentSub !== "0") ? "row" : "hidden"}>
                    <Calendar
                        show={this.state.show}
                        horariosReserva={horariosReserva}
                        weekRender={this.state.weekRender}
                        dayRender={this.state.dayRender}
                        actions={this.actions}
                        controls={this.calendarControl}
                        data={this.state.data}
                        type="reservas"/>
                </div>
                <div className={(this.props.currentSub === "0") ? "row" : "hidden"}>
                    <Configuracion />
                </div>
            </div>
        );
    }
}

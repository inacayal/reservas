export const horariosValidation = {
    fecha_feriado : {
        rules:{
            required:true,
            isDate:true
        },
        fieldName:"Fecha"
    },
    id_evento:{
        rules:{
            min:1
        },
        fieldName:"Eventos",
        isMultiple:true
    },
    apertura_reserva_hora: {
        rules:{
            required:true
        },
        fieldName: "Hora apertura de reserva"
    },
    apertura_reserva_minuto: {
        rules:{
            required:true
        },
        fieldName: "Minuto apertura de reserva"
    },
    cierre_reserva_hora: {
        rules:{
            required:true
        },
        fieldName: "Hora cierre de reserva"
    },
    cierre_reserva_minuto: {
        rules:{
            required:true
        },
        fieldName: "Minuto cierre de reserva"
    },
    apertura_atencion_hora: {
        rules:{
            required:true
        },
        fieldName: "Hora apertura atención"
    },
    apertura_atencion_minuto: {
        rules:{
            required:true
        },
        fieldName: "Minuto apertura atención"
    },
    cierre_atencion_hora: {
        rules:{
            required:true
        },
        fieldName: "Hora cierre atención"
    },
    cierre_atencion_minuto: {
        rules:{
            required:true
        },
        fieldName: "Minuto cierre atención"
    },
    descripcion:{
        rules:{
            max:100
        },
        fieldName:"Descripción"
    },
    id_estado:{
        rules:{},
        fieldName:"Estado"
    }
};



export const feriadoValidation = {
    id_evento:{
        rules:{
            min:1
        },
        fieldName:"Eventos",
        isMultiple:true
    },
    nombre:{
        rules:{
            max:50
        },
        fieldName:"Nombre"
    },
    apertura_reserva_hora: {
        rules:{
            required:true
        },
        fieldName: "Hora apertura de reserva"
    },
    apertura_reserva_minuto: {
        rules:{
            required:true
        },
        fieldName: "Minuto apertura de reserva"
    },
    cierre_reserva_hora: {
        rules:{
            required:true
        },
        fieldName: "Hora cierre de reserva"
    },
    cierre_reserva_minuto: {
        rules:{
            required:true
        },
        fieldName: "Minuto cierre de reserva"
    },
    apertura_atencion_hora: {
        rules:{
            required:true
        },
        fieldName: "Hora apertura atención"
    },
    apertura_atencion_minuto: {
        rules:{
            required:true
        },
        fieldName: "Minuto apertura atención"
    },
    cierre_atencion_hora: {
        rules:{
            required:true
        },
        fieldName: "Hora cierre atención"
    },
    cierre_atencion_minuto: {
        rules:{
            required:true
        },
        fieldName: "Minuto cierre atención"
    },
    descripcion:{
        rules:{
            max:100
        },
        fieldName:"Descripción"
    },
    id_estado:{
        rules:{},
        fieldName:"Estado"
    }
};

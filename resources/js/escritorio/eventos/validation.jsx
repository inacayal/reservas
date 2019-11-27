const validation = {
    nombre:{
        rules:{},
        fieldName:"Id"
    },
    nombre:{
        rules:{
            required:true,
            max:45,
            alpha_numeric:true
        },
        fieldName:"Nombre"
    },
    descripcion:{
        rules:{
            max:50
        },
        fieldName:"Descripción"
    },
    capacidad_maxima:{
        rules:{
            required:true,
            numeric:true,
            min:1
        },
        fieldName:"Capacidad máxima"
    },
    maximo_personas:{
        rules:{
            required:true,
            numeric:true,
            min:1
        },
        fieldName:"Máximo Personas"
    }
};
export default validation;

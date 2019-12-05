const validation = {
    id:{
        rules:{},
        fieldName:"Id"
    },
    nombre:{
        rules:{
            required:true,
            maxLen:45,
            alpha_numeric:true
        },
        fieldName:"Nombre"
    },
    descripcion:{
        rules:{
            maxLen:50
        },
        fieldName:"Descripción"
    },
    cantidad_maxima:{
        rules:{
            required:true,
            numeric:true,
            minVal:1
        },
        fieldName:"Capacidad máxima"
    },
    maximo_personas:{
        rules:{
            required:true,
            numeric:true,
            minVal:1
        },
        fieldName:"Máximo Personas"
    }
};
export default validation;

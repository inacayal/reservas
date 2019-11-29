export const validation = {
    id:{
        rules:{},
        fieldName:"Id"
    },
    promociones:{
        rules:{},
        fieldName:"Promociones"
    },
    horarios:{
        rules:{
            required:true
        },
        fieldName:"Horarios"
    },
    feriados:{
        rules:{},
        fieldName:"Feriados"
    },
    descripcion:{
        rules:{
            max:100,
            required:true
        },
        fieldName:"Descripción"
    },
    nombre:{
        rules:{
            max:45,
            required:true
        },
        fieldName:"Nombre"
    },
};
export default validation;
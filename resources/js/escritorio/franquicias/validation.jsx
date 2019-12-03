const validation = {
    id:{
        rules:{},
        fieldName:"Id"
    },
    nombre:{
        rules:{
            required:true,
            maxLen:100,
            alpha_numeric:true
        },
        fieldName:"Nombre de la franquicia"
    },
    correo:{
        rules:{
            required:true,
            maxLen:100,
            email:true
        },
        fieldName:"Correo de la franquicia"
    },
    telefono:{
        rules:{
            required:true,
            maxLen:20,
            alpha_numeric:true
        },
        fieldName:"Teléfono de la franquicia"
    },
    username: {
        rules:{
            required:true,
            maxLen:100,
            alpha_numeric:true
        },
        fieldName:"Nombre de Usuario"
    },
    email: {
        rules:{
            required:true,
            email:true,
            maxLen:100,
            alpha_numeric:true
        },
        fieldName:"Email de usuario"
    },
    razon_social:{
        rules:{
            required:true,
            maxLen:100,
            alpha_numeric:true
        },
        fieldName:"Razón Social"
    },
    cuit_cuil:{
        rules:{
            required:true,
            maxLen:11,
            minLen:11
        },
        fieldName:"CUIT/CUIL del local"
    },
    password:{
        rules:{},
        fieldName:"Contraseña de usuario"
    }
};
export default validation;
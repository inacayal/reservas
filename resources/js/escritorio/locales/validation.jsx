const validation = {
    id:{
        rules:{},
        fieldName:"Id"
    },
    franquicia:{
        rules:{},
        fieldName:"Franquicia"
    },
    nombre:{
        rules:{
            required:true,
            maxLen:100,
            alpha_numeric:true
        },
        fieldName:"Nombre del local"
    },
    correo_contacto:{
        rules:{
            required:true,
            maxLen:100,
            email:true
        },
        fieldName:"Correo de contacto"
    },
    telefono_contacto:{
        rules:{
            required:true,
            maxLen:20,
            alpha_numeric:true
        },
        fieldName:"Teléfono de contacto"
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
    nombre_encargado:{
        rules:{
            required:true,
            alpha_numeric:true,
            maxLen:100
        },
        fieldName:"Nombre del Encargado"
    },
    password:{
        rules:{},
        fieldName:"Contraseña de usuario"
    }
};
export default validation;

const validation = {
    id:{
        rules:{},
        fieldName:"Id"
    },
    franquicia:{
        rules:{},
        fieldName:"Franquicia"
    },
    nombre_local:{
        rules:{
            required:true,
            maxLen:100,
            alpha_numeric:true
        },
        fieldName:"Nombre del local"
    },
    correo_local:{
        rules:{
            required:true,
            maxLen:100,
            email:true
        },
        fieldName:"Correo del local"
    },
    telefono_local:{
        rules:{
            required:true,
            maxLen:20,
            alpha_numeric:true
        },
        fieldName:"Teléfono de local"
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
    id_provincia:{
        rules:{
            required:true,
            numeric:true,
            minVal:1,
            maxVal:24,
        },
        fieldName:"Provincia"
    },
    direccion:{
        rules:{
            required:true,
            alpha_numeric:true,
            maxLen:150
        },
        fieldName:"Máximo Personas"
    },
    nombre_encargado:{
        rules:{
            required:true,
            alpha_numeric:true,
            maxLen:100
        },
        fieldName:"Nombre del Encargado"
    },
    correo_encargado:{
        rules:{
            required:true,
            alpha_numeric:true,
            maxLen:100,
            email:true
        },
        fieldName:"Correo del encargado"
    },
    telefono_encargado:{
        rules:{
            required:true,
            alpha_numeric:true,
            maxLen:20
        },
        fieldName:"Telefono del encargado"
    },
    password:{
        rules:{},
        fieldName:"Contraseña de usuario"
    }
};
export default validation;

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
        fieldName:"Nombre"
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
            phone:true
        },
        fieldName:"Teléfono de contacto"
    },
    username: {
        rules:{
            required:true,
            maxLen:100,
            alpha_numeric:true
        },
        fieldName:"Username"
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
            maxLen:100,
            email:true
        },
        fieldName:"Correo del encargado"
    },
    telefono_encargado:{
        rules:{
            required:true,
            phone:true,
            maxLen:20
        },
        fieldName:"Telefono del encargado"
    },
    password:{
        rules:{},
        fieldName:"Contraseña de usuario"
    },
    intervalo_reserva:{
        rules:{
            required:true,
            numeric:true
        },
        fieldName:"Intervalo de la reserva"
    },
    antelacion_reserva:{
        rules:{
            required:true,
            numeric:true
        },
        fieldName:"Antelación de la reserva"
    },
    caida_reserva:{
        rules:{
            required:true,
            numeric:true
        },
        fieldName:"Caída de la reserva"
    },
    disponibilidad_reserva:{
        rules:{
            required:false,
            numeric:true,
            maxVal:60,
            minVal:0
        },
        fieldName:"Apertura de la reserva"
    }
};

export default validation;

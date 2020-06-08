const validation = {
    email: {
        rules:{
            required:true,
            email:true,
            maxLen:100
        },
        fieldName:"Email de usuario"
    },
    password:{
        rules:{
            required:true,
            maxLen:100
        },
        fieldName:"Contraseña"
    }
};

export default validation;

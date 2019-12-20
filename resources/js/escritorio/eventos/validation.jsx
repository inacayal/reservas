import {createFeriadosList} from '../../utils/Helper';

export const validation = {
    id:{
        rules:{},
        fieldName:"ID",
        casting:"integer"
    },
    id_usuario:{
        rules:{},
        fieldName:"ID del usuario",
        casting:"integer"
    },
    promociones:{
        rules:{},
        fieldName:"Promociones",
        casting:"array"
    },
    horarios:{
        rules:{
            required:true
        },
        fieldName:"Horarios",
        casting:"array"
    },
    feriados:{
        rules:{},
        fieldName:"Feriados",
        casting:"array"
    },
    descripcion:{
        rules:{
            maxLen:100,
            required:true
        },
        fieldName:"Descripción"
    },
    nombre:{
        rules:{
            maxLen:45,
            required:true
        },
        fieldName:"Nombre"
    },
    scope:{
        rules:{
            required:true
        },
        fieldName:"Estado",
        casting:"integer"
    }
};

export const addFormFields = (data) => {
    console.log(data)
    return {
        id_usuario:user.id,
        promociones:'',
        horarios:'',
        feriados:'',
        descripcion:'',
        nombre:'',
        scope:1
    };
}

export const editFormFields = (data) => {
    console.log(data)
    const   selected = data.selected,
            feriados = createFeriadosList(selected.feriados.data);
    return {
        id:selected.id,
        id_usuario:user.id,
        promociones:Object.keys(selected.promociones.list).join(','),
        horarios:Object.keys(selected.horarios.list).join(','),
        feriados:Object.keys(feriados).join(','),
        descripcion:selected.descripcion,
        nombre:selected.nombre,
        scope:selected.estado==="Activo" ? 1 : 2
    };
}

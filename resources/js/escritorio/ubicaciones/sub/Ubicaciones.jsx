import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import Titulo from '../../../app/componentes/basic/Titulo';
import UbicacionesTable from '../../../app/componentes/tables/UbicacionesTable';
import GraphicHolder from '../../../app/componentes/graphics/GraphicHolder';

export default function Ubicaciones (props) {
    const data = Object.values(props.data);
    return (
        <>
            <Titulo title="Ubicaciones"
                links={props.nav.links}/>
            <GraphicHolder titulo="Métricas para las ubicaciones"
                monthly="/ubicaciones/resumen/mensual/$month/$year"
                yearly="/ubicaciones/resumen/anual/$year"/>
            <div className="container-fluid">
                <div className="row">
                    <div className="m-font">
                        {`Mostrando ${data.length} ubicaciones encontradas`}
                    </div>
                    <UbicacionesTable actions={{eliminar:props.toggleModal}}
                        data={data}/>
                </div>
            </div>
        </>
    );
}

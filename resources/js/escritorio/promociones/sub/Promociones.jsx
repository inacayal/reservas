import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Redirect
} from 'react-router-dom';

import Titulo from '../../../app/componentes/basic/Titulo';
import PromocionesTable from '../../../app/componentes/tables/PromocionesTable';
import {
    GenerateActions
} from '../../../app/acciones/GenerateActions';
import {
    CommaList
} from '../../../app/componentes/basic/CommaList';
import GraphicHolder from '../../../app/componentes/graphics/GraphicHolder';

export default function Promociones (props) {
    const promociones = Object.values(props.data);
    return (
        <>
            <Titulo title="Promociones"
                    links={props.nav.links} />
            <GraphicHolder titulo="Métricas para las promociones"
                monthly="/promociones/resumen/mensual/$month/$year"
                yearly="/promociones/resumen/anual/$year"/>
            <div className="container-fluid">
                <div className="row">
                    <div className="m-font top-padding">
                        {`Mostrando ${promociones.length} promociones encontradas`}
                    </div>
                </div>
                <div className="row">
                    <PromocionesTable actions={{eliminar:props.toggleModal}}
                        data={promociones}
                        showEventos
                        filter
                        showActions/>
                </div>
            </div>
        </>
    );
}

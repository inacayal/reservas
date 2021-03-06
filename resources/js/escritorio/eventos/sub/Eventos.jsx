import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import Titulo from '../../../app/componentes/basic/Titulo';
import EventosTable from '../../../app/componentes/tables/EventosTable';
import {
    CommaList
} from '../../../app/componentes/basic/CommaList';
import {
    GenerateActions
} from '../../../app/acciones/GenerateActions';
import {
    assignHorarios
} from '../../../app/utils/Helper';
import GraphicHolder from '../../../app/componentes/graphics/GraphicHolder';

function NoMemoEventos (props) {
    const data = Object.values(props.data);
    return (
        <>
            <Titulo title="Eventos"
                links={props.nav.links} />
            <GraphicHolder titulo="Métricas para los eventos"
                monthly="/eventos/resumen/mensual/$month/$year"
                yearly="/eventos/resumen/anual/$year"/>
            <div className="container-fluid">
                <div className="m-font top-padding row">
                    {`Mostrando ${data.length} eventos encontrados`}
                </div>
                <div className="row">
                    <EventosTable actions={{eliminar: props.toggleModal}}
                        data={data}
                        showPromociones
                        showHorarios
                        showActions
                        filter/>
                </div>
            </div>
        </>
    );
}
export default React.memo(NoMemoEventos);

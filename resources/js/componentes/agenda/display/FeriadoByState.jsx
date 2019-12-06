import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import CardList from '../../basic/CardList';
import ButtonList from '../../basic/ButtonList';
import {CommaList} from '../../basic/CommaList';
import {
    DAYS,
    MONTHS
} from '../../../constantes/DaysMonths';
import { CLASSBYSTATE } from '../../../constantes/CardObject';
import CustomLink from '../../basic/CustomLink';
import {ExpandableComponent} from '../../../hocs/ExpandableComponent';
import Actions from '../../basic/Actions';

export const FeriadoMonthByState = {
    laboral: (
        renderActions,
        sectionData,
        date,
        isSelectedDate,
        isThisMonth
    ) => ({
        content:
            <>
                <div className="mid-title light-danger">
                    {date.getDate()}
                </div>
                    <i  className="text-top fas fa-ellipsis-h highlight-title"
                        style={{ marginTop: "-8px" }} />
                <div>
                    <Actions    links={renderActions.links}
                                buttons={renderActions.buttons}
                                overlay/>
                </div>
            </>
        ,
        class: "same-width text-center box-padding light-danger relative black-overlay"
    }),
    no_laboral: (
        renderActions,
        sectionData,
        date,
        isSelectedDate,
        isThisMonth
    ) => ({
        content: (
            <>
                <div className="mid-title light-danger">
                    {date.getDate()}
                </div>
                <i  className="text-top fas fa-ellipsis-h highlight-title"
                    style={{ marginTop: "-8px" }} />
                <div className="flex-row">
                    <Actions    links={renderActions.links}
                                buttons={renderActions.buttons}
                                overlay/>
                </div>
            </>
        ),
        class: "same-width text-center box-padding light-danger fix-height relative black-overlay background-border"
    }),
    no_data: (
        renderActions,
        sectionData,
        date,
        isSelectedDate,
        isThisMonth
    ) => ({
        content:(
            <div className="content mid-title ">
                {date.getDate()}
            </div>
        ),
        class: isThisMonth
            ? "same-width text-center box-padding fix-height"
            : "background-border same-width text-center box-padding fix-height"
    })
}

export const FeriadoWeekByState = {
    laboral:(
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    )=>
        {
            const   date = new Date(sectionData.fecha),
                    eventosLength = Object.values(sectionData.eventos.list).length,
                    linkParam = {
                        to:`/horarios/feriados/${sectionData.id}`,
                        params:{id:sectionData.id},
                        route:`horarios/feriados`
                    };
            return {
                content:() =>
                    <div className="container">
                        <div className="row col-md-12">
                            <ExpandableComponent    links = {renderActions.links}
                                                    buttons = {renderActions.buttons}
                                                    title = {
                                                        <CustomLink params={linkParam}>
                                                            <span className="mid-title light-danger">
                                                                {date.getDate() + " "}
                                                            </span>
                                                            <span className="sub-title side-margin bold" style={{color:'var(--text-color)'}}>
                                                                {DAYS[date.getDay()]}
                                                            </span>
                                                            <span   className="side-margin m-font"
                                                                    style={{color:"var(--text-color)"}}>
                                                                {sectionData.nombre}
                                                            </span>
                                                        </CustomLink>
                                                    }>
                                <div className="row top-padding">
                                    <div className="col-md-8 container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="light-danger m-font">
                                                    Horarios de atención
                                                </div>
                                                <div >
                                                    <span className="bold">
                                                        Reservas:
                                                    </span>
                                                    {` ${sectionData.apertura.reserva.hora}:${sectionData.apertura.reserva.minuto} hs. - ${sectionData.cierre.reserva.hora}:${sectionData.apertura.reserva.minuto}hs.`}
                                                </div>
                                                <div>
                                                    <span className="bold">
                                                        Atencion:
                                                    </span>
                                                    {` ${sectionData.apertura.atencion.hora}:${sectionData.apertura.atencion.minuto}hs. - ${sectionData.cierre.atencion.hora}:${sectionData.cierre.atencion.minuto}hs.`}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="light-danger m-font">
                                                    Eventos
                                                </div>
                                                {
                                                    eventosLength > 0
                                                    ?
                                                        <CommaList  list={sectionData.eventos.list}
                                                                    route="eventos"/>
                                                    :
                                                        "No hay eventos que mostrar."
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="text-right bold m-font">
                                            Día laboral
                                        </div>
                                        <div className="light-danger m-font">
                                            Descripción:
                                        </div>
                                        <div>
                                            {sectionData.descripcion.substring(0, 50) + "..."}
                                        </div>
                                        <div className="border-top small-v-padding" />
                                        <div className="smaller-text">
                                            mostrando sólo los primeros 50 caracteres
                                        </div>
                                    </div>
                                </div>
                            </ExpandableComponent>
                        </div>
                    </div>,
            class: date.getDay() !== 6
                ? "box-padding full-width relative border-bottom"
                : "box-padding full-width relative"
        }
    },
    no_laboral: (
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) =>
        {
            const   date = new Date(sectionData.fecha),
                    linkParam = {
                        to:`/horarios/feriados/${sectionData.id}`,
                        params:{id:sectionData.id},
                        route:'horarios/feriados'
                    };
            return {
                content: () =>
                <div className="container">
                    <div className="row col-md-12">
                        <ExpandableComponent    links = {renderActions.links}
                                                buttons = {renderActions.buttons}
                                                title = {
                                                    <CustomLink params={linkParam}>
                                                        <span className="light-danger mid-title side-margin">
                                                            {date.getDate() + " "}
                                                        </span>
                                                        <span   className="side-margin subrayado sub-title bold"
                                                                style={{color:"var(--text-color)"}}>
                                                            {DAYS[date.getDay()] + " "}
                                                        </span>
                                                        <span   className="m-font"
                                                                style={{color:"var(--text-color)"}}>
                                                            {sectionData.nombre}
                                                        </span>
                                                    </CustomLink>
                                                }>
                            <div className="row">
                                <div className="col-md-6 light-danger mid-font">
                                    Sin apertura
                                </div>
                                <div className="col-md-6">
                                    <div className="text-right bold m-font">
                                        Día no laboral
                                    </div>
                                    <div className="light-danger mid-font">
                                        Descripción:
                                    </div>
                                    <div>
                                        {`${sectionData.descripcion.substring(0, 50)} ...`}
                                    </div>
                                    <div className="border-top small-v-padding" />
                                    <div className="smaller-text" style={{paddingBottom:"10px"}}>
                                        mostrando sólo los primeros 50 caracteres
                                    </div>
                                </div>
                            </div>
                        </ExpandableComponent>
                    </div>
                </div>,
                class: date.getDay() !== 6
                    ? "box-padding full-width relative border-bottom background-border"
                    : "box-padding full-width relative background-border"
            }
        },
    no_data: (
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) =>
        ({
            content: () =>
                <div className="container v-padding">
                    <div className="row">
                        <div className="col-md-8 no-padding">
                            <span className="mid-title light-danger side-margin">
                                {dataIndex.getDate()}
                            </span>
                            <span className="side-margin sub-title">
                                {DAYS[dataIndex.getDay()]}
                            </span>
                        </div>
                        <div className="col-md-4 text-right smaller-text">
                            No has designado este día como feriado
                        </div>
                    </div>
                </div>,
            class: dataIndex.getDay() !== 6
                ? "box-padding full-width relative border-bottom"
                : "box-padding full-width relative"
        })
}

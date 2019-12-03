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
                    {renderActions}
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
                    {renderActions}
                </div>
            </>
        ),
        class: "same-width text-center box-padding light-danger fix-heigh relative black-overlay"
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
                    <div className="container v-padding">
                        <div className="row">
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
                            {renderActions}
                        </div>
                        <div className="row m-font justify-content-end bold">
                            laboral
                        </div>
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
                            </div>
                            <div className="col-md-4">
                                <div className="light-danger m-font">
                                    Eventos
                                </div>
                                {
                                    eventosLength > 0
                                    ?
                                        <CommaList list={sectionData.eventos.list} endpoint="/eventos"/>
                                    :
                                        "No hay eventos que mostrar."
                                }
                            </div>
                        </div>
                    </div>,
            class: "box-padding  box-transparent full-width relative"
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
                    <div className="container v-padding">
                        <div className="row">
                            <CustomLink params={linkParam}>
                                <span className="light-danger mid-title side-margin">
                                    {date.getDate() + " "}
                                </span>
                                <span   className="side-margin subrayado sub-title bold"
                                        style={{color:"var(--text-color)"}}>
                                    {DAYS[date.getDay()] + " "}
                                </span>
                                <span   className="mid-font"
                                        style={{color:"var(--text-color)"}}>
                                    {sectionData.nombre}
                                </span>
                            </CustomLink>
                            {renderActions}
                        </div>
                        <div className="row m-font justify-content-end bold">
                            no laboral
                        </div>
                        <div className="row">
                            <div className="col-md-6 light-danger mid-font">
                                Sin apertura
                            </div>
                            <div className="col-md-6">
                                <div className="light-danger mid-font">
                                    Descripción:
                                </div>
                                <div>
                                    {`${sectionData.descripcion.substring(0, 50)} ...`}
                                </div>
                                <div className="border-top small-v-padding" />
                                <div className="smaller-text" style={{paddingBottom:"10px"}}>
                                    mostrando sólo los primeros 30 caracteres
                                </div>
                            </div>
                        </div>
                    </div>,
                class: "h-padding full-width background-border"
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
                        <div className="col-md-4 border-bottom text-right smaller-text">
                            No has designado este día como feriado
                        </div>
                    </div>
                </div>,
            class: "box-padding box-transparent full-width"
        })
}

/**
 * react basic
 */
import React, { Component, useContext } from 'react';
import ReactDOM from 'react-dom';
import {CardList} from '../../basic/CardList';
import ButtonList from '../../basic/ButtonList';
import {GenerateActions} from '../../../acciones/GenerateActions';
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';
import { CLASSBYSTATE } from '../../../constantes/CardObject';
import CustomLink from '../../basic/CustomLink';

export const ReservaDayByState = {
    data: (
        display,
        data,
        actions,
        dataStr
    ) => {
        const reservations = generateDayCardFromArray(
            data,
            actions,
            dataStr
        );
        return {
            title: {
                data: (
                    <div className="container no-padding">
                        <div className="row">
                            <div className="col-md-1">
                                <span className="side-margin light-danger bold inline-block">
                                    {display}
                                </span>
                            </div>
                            <div className="col-md-11">
                                <CardList
                                    displayList="nav-list full-width"
                                    elems={reservations} />
                            </div>
                        </div>
                    </div>
                ),
                class: "box-padding"
            },
            content: {},
            container: {
                class: "padding-box"
            }
        };
    },
    no_data: (
        display,
        data,
        actions,
        dataStr
    ) => ({
        title: {
            data: (
                <div>
                    <div className="inline-block half">
                        <div className="line-v-middle light-danger bold side-margin inline-block">
                            {display}
                        </div>
                    </div>
                    <div className="inline-block half smaller-text text-right border-bottom">
                        Sin reservas
                    </div>
                </div>
            ),
            class: "box-padding"
        },
        content: {},
        container: {
            class: "box-padding"
        }
    })
};

export const ReservaMonthByState = {
    data: (
        renderActions,
        sectionData,
        date,
        isSelectedDate,
        isThisMonth
    ) => ({
        content: (
            <>
                <div className="mid-title light-danger">{date.getDate()}</div>
                <i className="text-top fas fa-ellipsis-h highlight-title" style={{ marginTop: "-8px" }} />
                <div>{renderActions}</div>
            </>
        ),
        class: isSelectedDate
        ?
            "same-width text-center box-padding light-danger relative black-overlay selected"
        :
            "same-width text-center box-padding light-danger relative black-overlay"
    }),
    no_data: (
        renderActions,
        sectionData,
        date,
        isSelectedDate,
        isThisMonth
    ) => ({
        content:(
            <div className="content mid-title">
                {date.getDate()}
            </div>
        ),
        class: isThisMonth
            ?
                isSelectedDate
                ?
                    "same-width text-center box-padding fix-height selected"
                :
                    "same-width text-center box-padding fix-height"
            : "background-border same-width text-center box-padding fix-height"
    })
};

export const ReservaWeekByState = {
    no_data:(
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) => ({
        content:() =>
            <>
                <div className="v-align-center light-danger mid-title">
                    {dataIndex.getDate() + " "}
                </div>
                <div className="line-v-middle inline-block v-align-center mid-font">
                    {DAYS[dataIndex.getDay()] + " "}
                </div>
                <div className="line-v-middle v-align-center bold">
                    <i className="fas fa-ellipsis-h" style={{color:"transparent"}}/>
                </div>
            </>,
            class: "box-padding text-center same-width highlight-hover pointer ",
            data: dataIndex.getDate()
    }),
    data: (
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) => {
        return {
            content:() => (
                <>
                    <div className="v-align-center light-danger mid-title">
                        {dataIndex.getDate() + " "}
                    </div>
                    <div className="line-v-middle v-align-center mid-font">
                        {DAYS[dataIndex.getDay()]}
                    </div>
                    <div className="line-v-middle v-align-center bold">
                        <i className="highlight-title fas fa-ellipsis-h"/>
                    </div>
                </>
            ),
            class: "box-padding same-width text-center highlight-hover pointer",
            data:dataIndex.getDate()
        }
    }
};

function generateDayCardFromArray(
    data,
    actions,
    dataStr
) {
    return data.map(
        (e, i) => {
            let acciones = GenerateActions.reservas(
                e,
                actions,
                e.id,
                'day'
            );
            const linkParam = {
                to:`/reservas/${e.id}`,
                params:{id:e.id},
                route:'reservas'
            }
            return {
                title: {
                    data: (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-11 no-padding">
                                    <CustomLink params={linkParam}>
                                        <span className="side-margin sub-title text bold subrayado inline-block">
                                            {e.nombre + " " + e.apellido}
                                        </span>
                                    </CustomLink>
                                    {acciones}
                                </div>
                                <div className="col-md-1 no-padding smaller-text">
                                    {e.estado}
                                </div>
                            </div>
                        </div>
                    ),
                    class: ""
                },
                content: {},
                container: {
                    class: ""
                }
            };
        }
    );
};

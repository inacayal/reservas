/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import CardList from '../../basic/CardList';
import ButtonList from '../../basic/ButtonList';
/**
 * procedimientos
 */
import { assignActionsByStatus } from '../../../funciones/generateActions';
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';
import { CLASSBYSTATE } from '../../../constantes/CardObject';

const assignDayElementType = {
    reservas: (
        sectionData,
        data,
        actions
    ) => {
        let dt = new Date(data),
            hrPtr = dt.getHours(),
            mnPtr = dt.getMinutes(),
            reservations = sectionData ?
                generateDayCardFromArray(
                    sectionData,
                    actions,
                    data
                )
                : [];
        return sectionData ? {
            title: {
                data: (
                    <div className="container no-padding">
                        <div className="row">
                            <div className="col-md-1">
                                <span className="side-margin light-danger bold inline-block">{hrPtr + ":" + (mnPtr < 10 ? "0" + mnPtr : mnPtr)}</span>
                            </div>
                            <div className="col-md-11">
                                <CardList
                                    displayList="nav-list full-width"
                                    elems={reservations} />
                            </div>
                        </div>
                    </div>
                ),
                class: "box-padding border-bottom"
            },
            content: {},
            container: {
                class: "padding-box"
            }
        } : {
                title: {
                    data: (
                        <div>
                            <div className="inline-block half">
                                <div className="line-v-middle light-danger bold side-margin inline-block">{hrPtr + ":" + (mnPtr < 10 ? "0" + mnPtr : mnPtr)}</div>
                            </div>
                            <div className="inline-block half smaller-text text-right">
                                Sin reservas
                            </div>
                        </div>
                    ),
                    class: "box-padding border-bottom"
                },
                content: {},
                container: {
                    class: "padding-box"
                }
            };
    },
    feriados: (
        type,
        sectionData,
        data,
        actions
    ) => {
        return {};
    }
}

function generateDayCardFromArray(
    data,
    actions,
    dateStr
) {
    let obj = {};
    return data.map(
        (e, i) => {
            let acciones = assignActionsByStatus(
                e.estado,
                actions,
                data
            );
            let date = new Date(parseInt(dateStr)),
                classes = i === 0 ?
                    "box-padding no-top-padding"
                    : "box-padding";
            if (i !== data.length - 1)
                classes += " border-bottom";
            return {
                title: {
                    data: (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-11 no-padding">
                                    <span className="side-margin light-title inline-block">{e.nombre + " " + e.apellido}</span>
                                    <ButtonList
                                        displayList="nav-list no-padding inline-block side-margin line-v-middle"
                                        container="side-margin inline-block"
                                        elemClass="box-transparent highlight-hover full-width border-box button-border"
                                        elems={acciones.splice(1, acciones.length)} />
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
                    class: classes
                }
            };
        }
    );
};
export default assignDayElementType;
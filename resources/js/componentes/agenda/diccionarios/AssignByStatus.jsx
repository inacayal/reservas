/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AssignWeekComponent, AssignMonthComponent, AssignDayComponent } from './AssignRenderComponent';

const assignIndex = (
    data
) => {
    let rIndex = '';
    if (data) 
        rIndex = data.estado ? data.estado : 'data';
    else 
        rIndex = 'no_data';
    return rIndex;
}

export const AssignDayByStatus = (
    data,
    dataStr,
    display,
    actions,
    type
) => {
    const index = assignIndex(data);
    return AssignDayComponent[type][index](
        display,
        data,
        actions,
        dataStr
    );
}

export const AssignWeekByStatus = (
    renderActions,
    sectionData,
    dataIndex,
    originalActions,
    type
) => {
    const index = assignIndex(sectionData);
    return AssignWeekComponent[type][index](
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    );
}

export const AssignMonthByStatus = (
    renderActions,
    sectionData,
    date,
    type,
    isThisMonth
) => {
    const index = assignIndex(sectionData);
    return AssignMonthComponent[type][index](
        renderActions,
        sectionData,
        date,
        isThisMonth
    );
}


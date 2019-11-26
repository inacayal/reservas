import {
    DAYS,
    MONTHS,
    monthRows,
    monthIndex
} from '../constantes/DaysMonths';

export const evaluateDateChange = (
    changeObject,
    fetchCallback,
    changeDate,
    path,
    view,
    section
) => {
    const oDate = changeObject.o,
        nDate = changeObject.n;
    if (oDate.getMonth() !== nDate.getMonth() || oDate.getFullYear() !== nDate.getFullYear()) {
        nDate.setDate(changeObject.m);
        return fetchCallback(path,{date:new Date(nDate),show:view,refresh:true},section);
    } else
        return changeDate({date:new Date(nDate),show:view});
};

export const generateHoursFromInterval = (interval) => {
    let res = {};
    res["0"] = "00";
    for (let ctr = interval; ctr < 60; ctr += interval) {
        res[ctr] = (ctr).toString();
    }
    return res;
}

export const getMonthLength = (month, year) => {
    let date = new Date(year, month, 0).getDate();
    return date;
}

const cmp = {
    '>'    : (a,b) => a>b,
    '<'    : (a,b) => a<b,
    '>='   : (a,b) => a>=b,
    '<='   : (a,b) => a<=b,
    '='    : (a,b) => a===b,
    '!='   : (a,b) => a!=b
}

export const compareDates = (
    d1,
    d2,
    {d,m,y}
) => {
    return  cmp[d](d1.getDate(),d2.getDate())
            && cmp[m](d1.getMonth(), d2.getMonth())
            && cmp[y](d1.getFullYear(), d2.getFullYear());
}

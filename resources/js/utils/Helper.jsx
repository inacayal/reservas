import { DAYS, MONTHS, monthRows, monthIndex } from '../constantes/DaysMonths';

export const evaluateDateChange = (
    changeObject,
    fetchCallback,
    changeDate,
    path,
    view
) => {
    const oDate = changeObject.o,
        nDate = changeObject.n;
    if (oDate.getMonth() !== nDate.getMonth() || oDate.getFullYear() !== nDate.getFullYear()) {
        nDate.setDate(changeObject.m);
        return fetchCallback(path,{date:new Date(nDate),show:view,refresh:true});
    } else
        return changeDate({date:new Date(nDate),show:view});
};

export const generateHoursFromInterval = (interval) => {
    let res = {};
    res["00"] = "00";
    for (let ctr = interval; ctr < 60; ctr += interval) {
        res[ctr] = (ctr).toString();
    }
    return res;
}

export const getMonthLength = (month, year) => {
    let date = new Date(year, month, 0).getDate();
    return date;
}

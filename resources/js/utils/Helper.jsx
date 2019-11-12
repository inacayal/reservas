import { DAYS, MONTHS, monthRows, monthIndex } from '../constantes/DaysMonths';

export const evaluateDateChange = (
    changeObject,
    fetchCallback,
    changeDate,
    view
) => {
    const oDate = changeObject.o,
        nDate = changeObject.n,
        index = monthIndex[oDate.getMonth()];
    if (oDate.getMonth() !== nDate.getMonth()) {
        nDate.setDate(changeObject.m);
        monthRows[index[0]][index[1]].class = "";
        return fetchCallback({date:new Date(nDate),show:view});
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

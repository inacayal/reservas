import { DAYS, MONTHS, monthRows, monthIndex } from '../constantes/DaysMonths';

export const evaluateDateChange = (date, offset, fetch, changeCallback) => {
    let index = monthIndex[date.getMonth()],
        isPrev = offset < 0,
        nwDate = new Date(date),
        change = isPrev
            ? {
                date: date.getDate() + offset + (6 - date.getDay()),
                monthLength: getMonthLength(date.getMonth() + 1, date.getFullYear())
            }
            : {
                date: date.getDate() + offset - date.getDay(),
                monthLength: 1
            };
    date.setDate(change.date);
    if (date.getMonth() !== nwDate.getMonth()) {
        date.setDate(change.monthLength);
        monthRows[index[0]][index[1]].class = "";
        return fetch(date);
    } else if (changeCallback)
        return changeCallback(new Date(date));
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
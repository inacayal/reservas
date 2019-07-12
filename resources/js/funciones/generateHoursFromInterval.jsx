export default function generateHoursFromInterval(interval){
    let res = {};
    for (let ctr = interval; ctr < 60; ctr += interval){
        res[ctr] = (ctr).toString();
    }
    return res;
}
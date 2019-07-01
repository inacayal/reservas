export default function getMonthLength(month, year) {
    let date = new Date(year, month, 0).getDate();
    return date;
}
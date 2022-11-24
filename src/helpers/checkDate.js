import dayjs from 'dayjs';
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

export default function checkDate(time) {
    dayjs.extend(isSameOrAfter)
    if (dayjs().isSameOrAfter(dayjs(time))) {
        return true;
    } else {
        return false;
    }
}

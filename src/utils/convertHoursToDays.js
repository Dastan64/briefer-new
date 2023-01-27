import { declinate } from './declinate';

export const convertHoursToDays = (numberOfHours) => {
    const days = Math.floor(numberOfHours / 8);
    const remainder = numberOfHours % 8;
    const hours = Math.round(remainder);
    if (days > 0 && hours === 0) {
        return `${days} ${declinate(days, 'adjectives')} ${declinate(days, 'days')}`
    } else if (days === 0 && hours !== 0) {
        return `${hours} ${declinate(hours, 'hours')}`
    } else {
        return `${days} ${declinate(days, 'adjectives')} ${declinate(days, 'days')} и ${hours} ${declinate(hours, 'hours')}`
    }
}

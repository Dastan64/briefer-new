export const formatDates = (startDate, endDate) => {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const start = new Date(startDate);
    const startMonth = start.getMonth();
    const startDay = start.getDate();
    const startYear = start.getFullYear();
    if (new Date(endDate) && new Date(endDate) instanceof Date && !isNaN(new Date(endDate))) {
        const end = new Date(endDate);
        const endMonth = end.getMonth();
        const endDay = end.getDate();
        const endYear = end.getFullYear();
        return `${startDay} ${months[startMonth]} ${startYear} - ${endDay} ${months[endMonth]} ${endYear}`;
    } else {
        return `${startDay} ${months[startMonth]} ${startYear}`
    }
}


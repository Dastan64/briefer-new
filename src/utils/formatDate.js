export const formatDate = (date) => {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    if (Array.isArray(date)) {
        const [startDate, endDate] = date;
        const start = new Date(startDate);
        const end = new Date(endDate);

        const startMonth = start.getMonth();
        const startDay = start.getDate();
        const startYear = start.getFullYear();

        const endMonth = end.getMonth();
        const endDay = end.getDate();
        const endYear = end.getFullYear();

        return `${startDay} ${months[startMonth]} ${startYear} - ${endDay} ${months[endMonth]} ${endYear}`;
    } else {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${day} ${months[month]} ${year}`
    }
}


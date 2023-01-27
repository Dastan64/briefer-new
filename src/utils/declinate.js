export const declinate = (number, type) => {
    const data = {
        hours: ['час', 'часа', 'часов'],
        minutes: ['минута', 'минуты', 'минут'],
        days: ['день', 'дня', 'дней'],
        adjectives: ['рабочий', 'рабочих', 'рабочих']
    }
    const cases = [2, 0, 1, 1, 1, 2];
    return data[type][(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

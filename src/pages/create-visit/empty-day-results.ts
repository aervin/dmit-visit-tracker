export function generateDayResults(visitDate: string) {
    const dates = [];
    for (let i = 0; i < 10; i++) {
        const d = new Date(visitDate);
        d.setDate(d.getDate() + i);
        dates.push({
            date: d.toISOString(),
            result: null
        });
    }
    return dates;
}

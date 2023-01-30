export const deleteKeys = (task) => {
    const keysToFilter = ['isChecked', 'taskVariant', 'id'];
    return Object.keys(task).reduce((accum, key) => {
        if (!keysToFilter.includes(key)) {
            return { ...accum, [key]: task[key] };
        } else {
            return accum;
        }
    }, {})
}

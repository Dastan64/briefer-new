export const removeProperties = (obj, propsToRemove) => {
    return Object.keys(obj).reduce((result, key) => {
        if (!propsToRemove.includes(key)) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}

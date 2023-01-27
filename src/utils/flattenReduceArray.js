export function flattenReduceArray(result = [], targetArray) {
    if (Array.isArray(targetArray)) {
        return targetArray.reduce(flattenReduceArray, result)
    } else {
        result.push(targetArray);
        return result;
    }
}

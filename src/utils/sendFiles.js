export const sendFiles = async (filesCollection, callback) => {
    const promises = Array.from(filesCollection).map(file => {
        const formData = new FormData();
        formData.append('file', file);
        return fetch(`https://marketing-stage.technodom.kz/api/v1/promo_brief_constructor/file`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic Y29udGVudF9zZXJ2aWNlX2FjY291bnQ6aDRyZDJyM20zbWIzcnA0c3N3MHJk',
            },
            body: formData,
        }).then(response => response.json())
    })
    const data = await Promise.all(promises);
    const uuids = data.map(obj => obj.uuid);
    callback(uuids);
}

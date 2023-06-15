const AUTH_HEADER = {
    'Authorization': 'Basic Y29udGVudF9zZXJ2aWNlX2FjY291bnQ6aDRyZDJyM20zbWIzcnA0c3N3MHJk',
};

export const sendFiles = async (filesCollection, callback) => {
    const promises = Array.from(filesCollection).map(file => {
        const formData = new FormData();
        formData.append('file', file);
        return fetch(`https://marketing-stage.technodom.kz/api/v2/technodom/brief/file`, {
            method: 'POST',
            headers: AUTH_HEADER,
            body: formData,
        }).then(response => response.json()).catch(error => console.log(error))
    })
    const data = await Promise.all(promises);
    const uuids = data.map(obj => obj.uuid);
    callback(uuids);
}

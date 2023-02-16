export const sendFiles = (filesCollection, callback) => {
    const res = [];
    Array.from(filesCollection).forEach(file => {
        const formData = new FormData();
        formData.append('file', file);
        fetch('https://marketing-stage.technodom.kz/api/v1/promo_brief_constructor/file', {
            method: 'post',
            headers: {
                'Authorization': 'Basic Y29udGVudF9zZXJ2aWNlX2FjY291bnQ6aDRyZDJyM20zbWIzcnA0c3N3MHJk',
            },
            body: formData,
        }).then(response => response.json()).then(data => {
            console.log(data.uuid);
            res.push(data.uuid)
            callback(res);
        })
    })
}

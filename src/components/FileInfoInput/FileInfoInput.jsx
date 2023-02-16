import React, { useEffect, useState } from 'react';
import './FileInfoInput.scss';

const FileInfoInput = ({ task }) => {
    const [links, setLinks] = useState([]);
    const [fileIds] = useState(JSON.parse(task.value.replace(/'/g, '"')))

    useEffect(() => {
        const fetchData = async () => {
            return await Promise.all(
                fileIds.map(id => {
                    return fetch(`https://marketing-stage.technodom.kz/api/v1/promo_brief_constructor/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic Y29udGVudF9zZXJ2aWNlX2FjY291bnQ6aDRyZDJyM20zbWIzcnA0c3N3MHJk',
                        },
                    }).then(response => response.json())
                })
            );
        };
        fetchData().then(data => setLinks(data));
    }, [fileIds])
    return (
        <div className="input-container">
            <label className="label label--file">Файлы:</label>
            <ul className="list">
                {links.map(link => {
                    return link.original_filename.includes('png') ?
                        <a className="list__link" href={link.link} target="_blank" rel="noopener noreferrer">
                            <div className="file file--previewable">
                                <span className="file__name">{link.original_filename}</span>
                                {link.original_filename.includes('.png') &&
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={2} stroke="#fc6b3f" width={16} height={16}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                }
                            </div>
                        </a> : (
                            <div className="file">
                                <span className="file__name">{link.original_filename}</span>
                            </div>
                        )
                })}
            </ul>
        </div>
    );
};

export default FileInfoInput;
import React, { useEffect, useState } from 'react';
import styles from './FileInfoInput.module.css';
import { v4 as uuidv4 } from 'uuid';

const FileInfoInput = ({ task }) => {
    const [links, setLinks] = useState([]);
    const [fileIds] = useState(JSON.parse(task.value.replace(/'/g, '"')));

    useEffect(() => {
        const AUTH_HEADER = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Y29udGVudF9zZXJ2aWNlX2FjY291bnQ6aDRyZDJyM20zbWIzcnA0c3N3MHJk',
        };
        const fetchData = async () => {
            return await Promise.all(
                fileIds.map(id => {
                    return fetch(`https://marketing.technodom.kz/api/v2/technodom/brief/file/${id}`, {
                        method: 'GET',
                        headers: AUTH_HEADER,
                    }).then(response => response.json())
                })
            );
        };
        fetchData().then(data => setLinks(data));
    }, [fileIds])

    return (
        <div className="input-container">
            <label className="label">Файлы:</label>
            <ul className={styles.list}>
                {links.map(link => {
                    return /\.(pdf|jpg|jpeg|png|docx|doc)$/.test(link.original_filename) ?
                        <a className={styles.link} href={link.link} target="_blank" rel="noopener noreferrer"
                           key={uuidv4()}>
                            <div className={styles.file}>
                                <span>{link.original_filename}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={2} stroke="#fc6b3f" width={16} height={16}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                        </a> : (
                            <a className={styles.link} href={link.link} download
                               key={uuidv4()}>
                                <div className={styles.file}>
                                    <span>{link.original_filename}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={2} stroke="#fc6b3f" width={16} height={16}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                                    </svg>
                                </div>
                            </a>
                        )
                })}
            </ul>
        </div>
    );
};

export default FileInfoInput;

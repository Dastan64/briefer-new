import React from 'react';
import styles from './ArchiveThumb.module.css';
import { Link } from 'react-router-dom';
import { declinate } from '../../utils/declinate';

const ArchiveThumb = ({ data }) => {
    const { title, uuid, date_start, date_end, time_to_create } = data;
    const start = new Date(date_start).toLocaleDateString();
    const end = new Date(date_end).toLocaleDateString();
    const timeToDo = time_to_create ? `${time_to_create} ${declinate(time_to_create, 'hours')}` : 'неизвестно';
    
    return (
        <li>
            <article className={styles.archbrief}>
                <div className={styles.container}>
                    <div>
                        <h3 className={styles.title}>{title || 'Здесь должно было быть реальное название брифа'}</h3>
                        <div className={styles.info}>
                            <span>Номер: <strong>{uuid.slice(0, 8)}</strong></span>
                            <span>Продолжительность: <strong>{start} - {end}</strong></span>
                            <span>Время на выполнение: <strong>{timeToDo}</strong></span>
                        </div>
                    </div>
                    <Link className={styles.link} to={`/briefs/${uuid}`}>Перейти</Link>
                </div>
            </article>
        </li>
    );
};

export default ArchiveThumb;

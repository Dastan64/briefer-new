import React from 'react';
import styles from './ArchiveThumb.module.css';

const ArchiveThumb = ({ data }) => {
    const { title, uuid, date_start, date_end } = data;
    const start = new Date(date_start).toLocaleDateString();
    const end = new Date(date_end).toLocaleDateString();

    return (
        <li>
            <article className={styles.archbrief}>
                <div className={styles.container}>
                    <div>
                        <h3 className={styles.title}>{title || 'Здесь должно было быть реальное название брифа'}</h3>
                        <div className={styles.info}>
                            <span>Номер: <strong>{uuid.slice(0, 8)}</strong></span>
                            <span>Продолжительность: <strong>{start} - {end}</strong></span>
                            <span>Время на выполнение: <strong>16 часов</strong></span>
                        </div>
                    </div>
                    <a className={styles.link} href="https://www.google.com">Перейти</a>
                </div>
            </article>
        </li>
    );
};

export default ArchiveThumb;

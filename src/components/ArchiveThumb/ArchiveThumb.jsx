import React from 'react';
import styles from './ArchiveThumb.module.css';

const ArchiveThumb = ({ data }) => {
    const { name, id } = data;
    return (
        <li>
            <article className={styles.archbrief}>
                <div className={styles.container}>
                    <div>
                        <h3 className={styles.title}>{name || 'Длинное название какого-то брифа'}</h3>
                        <div className={styles.info}>
                            <span>Номер: <strong>{id || '100500'}</strong></span>
                            <span>Продолжительность: <strong>12.01.2023 - 13.03.2023</strong></span>
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

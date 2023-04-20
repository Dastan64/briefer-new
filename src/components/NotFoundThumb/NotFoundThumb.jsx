import React from 'react';
import styles from './NotFoundThumb.module.css';

const NotFoundThumb = ({ title, subtitle, icon }) => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <p className={styles.title}>{title}</p>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
            <div className={styles.iconContainer}>
                <img src={icon} alt={title}/>
            </div>
        </div>
    );
};

export default NotFoundThumb;

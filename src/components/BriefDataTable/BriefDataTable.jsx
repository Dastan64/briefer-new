import React from 'react';
import styles from './BriefDataTable.module.css';
import { declinate } from '../../utils/declinate';

const BriefDataTable = ({ tasks, totalTime }) => {
    return (
        <div className={styles.table}>
            <div className={`${styles.row} ${styles.header}`}>
                <span>Коммуникация</span>
                <span>Задача</span>
                <span>Комментарии/примечания</span>
                <span>Время на выполнение</span>
            </div>
            <div className={styles.body}>
                {tasks?.length > 0 && tasks.filter(task => task.taskTitle.toLowerCase() !== 'не требуется').map(task => {
                    return (
                        <div className={styles.row}>
                            <span className={styles.bold}>{task.parentSection}</span>
                            <span>{task.taskTitle}</span>
                            <span>{task.taskDescription}</span>
                            <span
                                className={styles.bold}>{task.taskTimeToCreate ? `${task.taskTimeToCreate} ${declinate(task.taskTimeToCreate, 'hours')}` : '-'}</span>
                        </div>
                    )
                })}
            </div>
            <div className={styles.footer}>
                <p>Общее время разработки: <span className={styles.time}>{totalTime}</span></p>
            </div>
        </div>
    );
};

export default BriefDataTable;

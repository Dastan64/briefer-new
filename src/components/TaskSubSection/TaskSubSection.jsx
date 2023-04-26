import React, { useMemo } from 'react';
import styles from './TaskSubSection.module.css';
import TaskCardsList from '../TaskCardsList/TaskCardsList';
import { declinate } from '../../utils/declinate';

const TaskSubSection = ({ subsection, parentIndex, index }) => {
    const { subsectionTitle, tasks, id, subsectionDescription } = subsection;
    const hours = useMemo(() => tasks.filter(task => task.isChecked).reduce((acc, item) => {
        return acc + Number(item.taskTimeToCreate.toString().replace(/,/g, '.')) || 0
    }, 0), [tasks])

    return (
        <section className={styles.subsection}>
            <h3 className={styles.title}
                data-number={`${parentIndex}.${index + 1}`}>
                {subsectionTitle || 'Заголовок второго уровня'}
                {hours !== 0 && <span className={styles.time}>{hours} {declinate(hours, 'hours')}</span>}
            </h3>
            <p className={styles.subtitle}>{subsectionDescription || 'Описание подраздела'}</p>
            <TaskCardsList tasks={tasks} subsectionId={id}/>
        </section>
    );
};

export default TaskSubSection;

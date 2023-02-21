import React, { useMemo } from 'react';
import './TaskSubSection.scss';
import TaskCardsList from '../TaskCardsList/TaskCardsList';
import { declinate } from '../../utils/declinate';

const TaskSubSection = ({ subsection, parentIndex, index }) => {
    const { subsectionTitle, tasks, id, subsectionDescription } = subsection;
    const hours = useMemo(() => tasks.filter(task => task.isChecked).reduce((acc, item) => {
        return acc + Number(item.taskTimeToCreate.toString().replace(/,/g, '.')) || 0
    }, 0), [tasks])

    return (
        <section className="subsection">
            <h3 className="subsection__title"
                data-number={`${parentIndex}.${index + 1}`}>
                {subsectionTitle || 'Заголовок второго уровня'}
                {hours !== 0 && <span className="time">{hours} {declinate(hours, 'hours')}</span>}
            </h3>
            <p className="subsection__subtitle">{subsectionDescription || 'Описание подраздела'}</p>
            <TaskCardsList tasks={tasks} subsectionId={id}/>
        </section>
    );
};

export default TaskSubSection;

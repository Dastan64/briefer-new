import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './Brief.scss';

import { fetchBriefTasks } from '../../features/brief/briefSlice';
import { declinate } from '../../utils/declinate';

//Components
import Input from '../../components/UI/Input/Input';
import TaskSection from '../../components/TaskSection/TaskSection';
import FileInfoInput from '../../components/FileInfoInput/FileInfoInput';

const Brief = () => {
        const { id } = useParams();
        const tasks = useSelector(state => state.brief.tasks);
        const sections = useSelector(state => state.brief.sections);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(fetchBriefTasks(id))
        }, [id, dispatch])

        const totalTime = useMemo(() => tasks.reduce((acc, current) => acc + Number(current.taskTimeToCreate.toString().replace(/,/g, '.')) || 0, 0), [tasks]);

        return (
            <main className="result">
                <p className="result__time">Общее время разработки:
                    <span className="result__time--bolder"> {totalTime} {declinate(totalTime, 'hours')}</span>
                </p>
                <div className="result__fields">
                    {tasks.filter(task => task.taskType !== 'radio' && task.taskType !== 'checkbox').map(task => {
                        if (task.taskType === 'file') {
                            return <FileInfoInput task={task} key={uuidv4()}/>
                        }
                        return <Input name={task.taskTitle} label={task.taskTitle}
                                      value={task.value}
                                      key={uuidv4()} id={task.id} isDisabled={true}/>

                    })}
                </div>
                <div className="result__options">
                    {sections?.length > 0 && sections.map((section, index) =>
                        <TaskSection
                            section={section}
                            parentIndex={index}
                            key={section.id}/>)}
                </div>
            </main>
        );
    }
;

export default Brief;
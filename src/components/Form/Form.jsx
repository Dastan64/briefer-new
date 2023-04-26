import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Form.module.css';

//UI Components
import Input from '../UI/Input/Input';
import Select from '../UI/Select/Select';
import Textarea from '../UI/Textarea/Textarea';
import FileInput from '../UI/FileInput/FileInput';
import CustomDatepicker from '../UI/CustomDatepicker/CustomDatepicker';
import CustomSelect from '../UI/CustomSelect/CustomSelect';

import WithBlurAndDispatch from '../../hocs/WithBlurAndDispatch';
import { checkTask } from '../../features/data/dataSlice';

const EnhancedTextarea = WithBlurAndDispatch(Textarea);
const EnhancedInput = WithBlurAndDispatch(Input);

const Form = () => {
    const dispatch = useDispatch();
    const section = useSelector(state => state.data.modifiedData.sections[0]);
    const info = {
        id: section?.subsections[0].id,
        tasks: section?.subsections[0]?.tasks,
    }

    const handleClose = (dates, id, subsectionId) => {
        dispatch(checkTask({
            id,
            subsectionId,
            value: [new Date(dates[0]).getTime(), new Date(dates[1]).getTime()],
            type: 'date',
        }))
    }

    return (
        <section className={styles.brief}>
            <div className={styles.textContainer}>
                <h2 className={styles.title}>Собираем бриф</h2>
                <p className={styles.subtitle}>Будьте внимательны, ведь каждая деталь очень важна для нас.</p>
                <p className={styles.warning}>Обязательные поля помечены звёздочкой!</p>
            </div>

            <form className={styles.form}>
                {info?.tasks?.length > 0 && info?.tasks.map(input => {
                    if (input.taskType === 'input') {
                        return <EnhancedInput name={input.taskTitle} label={input.taskTitle}
                                              isRequired={input.taskMandatory}
                                              placeholder="Напишите сюда что-нибудь..."
                                              key={input.id} id={input.id} subsectionId={info.id}/>
                    } else if (input.taskType === 'date') {
                        return <CustomDatepicker label={input.taskTitle} key={input.id} id={input.id}
                                                 isRequired={input.taskMandatory}
                                                 icon={'https://www.technodom.kz/under/briefer/calendar-black.svg'}
                                                 variant={'outlined'}
                                                 subsectionId={info.id} onClose={handleClose}/>
                    } else if (input.taskType.includes('select')) {
                        return <Select slugData={input.taskType} label={input.taskTitle}
                                       defaultValue={'Выберите из списка'}
                                       name={input.taskType} key={input.id} id={input.id} subsectionId={info.id}
                                       isRequired={input.taskMandatory}/>
                    } else if (input.taskType === 'textarea') {
                        return <EnhancedTextarea name={input.taskTitle} label={input.taskTitle} key={input.id}
                                                 id={input.id} subsectionId={info.id} isRequired={input.taskMandatory}/>
                    }
                    return <FileInput name={input.taskTitle} label={input.taskTitle} key={input.id}
                                      id={input.id} subsectionId={info.id} isRequired={input.taskMandatory}/>
                })}
            </form>
        </section>
    );
}

export default Form;

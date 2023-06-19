import React from 'react';
import SelectWrapper from '../SelectWrapper/SelectWrapper';
import Input from '../UI/Input/Input';
import FileInput from '../UI/FileInput/FileInput';
import { useDispatch } from 'react-redux';
import { checkTask } from '../../features/data/dataSlice';

const SecondaryForm = ({ secondaryFormDataSubsection }) => {
    const dispatch = useDispatch();
    const subsectionId = secondaryFormDataSubsection?.id;

    const handleSelect = ({ value, id }) => {
        if (value && id) {
            dispatch(checkTask({
                id,
                subsectionId,
                value,
            }))
        }
    }

    const handleBlur = ({ target: { id, value } }) => {
        dispatch(checkTask({
            id,
            subsectionId,
            value,
        }))
    }

    const handleChange = ({ target }) => {
        if (target.name.toLowerCase().includes('бюджет')) {
            target.value = Number(target.value.replace(/\D/g, '')).toLocaleString()
        }
    }

    return (
        <>
            {secondaryFormDataSubsection?.tasks.length > 0 && secondaryFormDataSubsection.tasks.map(item => {
                if (item.taskType.includes('select')) {
                    return <SelectWrapper name={item.taskType} label={item.taskTitle} slug={item.taskType}
                                          placeholder={'Выберите из списка ниже'}
                                          onSelect={handleSelect} isRequired={item.taskMandatory} id={item.id}
                                          key={item.id}/>
                } else if (item.taskType.includes('file')) {
                    return <FileInput label={item.taskTitle} id={item.id} isRequired={item.taskMandatory}
                                      key={item.id} subsectionId={subsectionId}/>
                } else {
                    return <Input name={item.taskTitle} label={item.taskTitle} placeholder={'Введите сюда что-нибудь'}
                                  id={item.id}
                                  isRequired={item.taskMandatory} key={item.id} onBlur={handleBlur}
                                  onChange={handleChange}/>
                }
            })}
        </>
    );
};

export default SecondaryForm;

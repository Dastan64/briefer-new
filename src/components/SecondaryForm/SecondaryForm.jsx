import React from 'react';
import SelectWrapper from '../SelectWrapper/SelectWrapper';
import Input from '../UI/Input/Input';
import FileInput from '../UI/FileInput/FileInput';
import { useDispatch } from 'react-redux';
import { checkTask } from '../../features/data/dataSlice';

const SecondaryForm = ({ secondaryFormDataSubsection }) => {
    const dispatch = useDispatch();
    const subsectionId = secondaryFormDataSubsection?.id;

    const handleSelect = ({ option, id }) => {
        if (option && id) {
            dispatch(checkTask({
                id,
                subsectionId,
                value: option,
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

    return (
        <div style={{
            display: 'grid',
            gap: '24px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(384px, 100%), 1fr)'
        }}>
            {secondaryFormDataSubsection?.tasks.length > 0 && secondaryFormDataSubsection.tasks.map(item => {
                if (item.taskType.includes('select')) {
                    return <SelectWrapper name={item.taskType} label={item.taskTitle} slug={item.taskType}
                                          placeholder={'Выберите из списка ниже'}
                                          onSelect={handleSelect} isRequired={item.taskMandatory} id={item.id}
                                          key={item.id}/>
                } else if (item.taskType.includes('file')) {
                    return <FileInput label={item.taskTitle} id={item.id} isRequired={item.taskMandatory}
                                      key={item.id}/>
                } else {
                    return <Input label={item.taskTitle} placeholder={'Введите сюда что-нибудь'} id={item.id}
                                  isRequired={item.taskMandatory} key={item.id} onBlur={handleBlur}/>
                }
            })}
        </div>
    );
};

export default SecondaryForm;

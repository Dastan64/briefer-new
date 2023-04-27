import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect from '../UI/CustomSelect/CustomSelect';
import { checkTask } from '../../features/data/dataSlice';

const SelectWrapper = ({ slugData, caption, label, id, subsectionId, isRequired }) => {
    const [slug] = useState(slugData.split('_').at(-1));
    const dispatch = useDispatch();
    const data = useSelector(state => state.data.data[slug]);
    const [selectedOption, setSelectedOption] = useState('');

    const selectOption = (item) => {
        setSelectedOption(item);
    }

    useEffect(() => {
        if (selectedOption) {
            dispatch(checkTask({
                id,
                subsectionId,
                value: selectedOption,
            }));
        }
    }, [selectedOption, dispatch, id, subsectionId])

    return (
        <CustomSelect data={data} placeholder={caption} label={label} value={selectedOption} variant={'primary'}
                      isRequired={isRequired} onClick={selectOption}/>
    );
};

export default SelectWrapper;

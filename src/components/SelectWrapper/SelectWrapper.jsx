import React, { useEffect, useState } from 'react';
import CustomSelect from '../UI/CustomSelect/CustomSelect';
import { useSelector } from 'react-redux';

const SelectWrapper = ({ name, data, slug, label, id, placeholder, isRequired, onSelect, variant = 'primary' }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const key = slug?.split('_').at(-1);
    const selectData = useSelector(state => state.data.data[key]);
    const renderSelectData = data || selectData;

    const selectOption = ({ option }) => {
        setSelectedOption(option);
    }

    useEffect(() => {
        const params = {
            name,
            value: selectedOption,
            id,
        }
        onSelect(params);
    }, [id, name, selectedOption])

    return (
        <CustomSelect data={renderSelectData} placeholder={placeholder} label={label} value={selectedOption}
                      variant={variant}
                      isRequired={isRequired} onClick={selectOption} id={id}/>
    );
};

export default SelectWrapper;

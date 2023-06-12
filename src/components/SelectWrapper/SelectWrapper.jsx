import React, { useEffect, useState } from 'react';
import CustomSelect from '../UI/CustomSelect/CustomSelect';

const SelectWrapper = ({ name, data, label, placeholder, isRequired, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const selectOption = (item) => {
        setSelectedOption(item);
    }

    useEffect(() => {
        onSelect(name, selectedOption);
    }, [name, selectedOption])

    return (
        <CustomSelect data={data} placeholder={placeholder} label={label} value={selectedOption} variant={'primary'}
                      isRequired={isRequired} onClick={selectOption}/>
    );
};

export default SelectWrapper;

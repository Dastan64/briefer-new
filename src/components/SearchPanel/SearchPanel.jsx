import React from 'react';
import styles from './SearchPanel.module.css';

import IconInput from '../UI/IconInput/IconInput';
import CustomDatepicker from '../UI/CustomDatepicker/CustomDatepicker';
import SelectWrapper from '../SelectWrapper/SelectWrapper';

const SearchPanel = ({ filters, categories, onChange, onSelect, onClose, onSearch }) => {
    const isDisabled = Object.keys(filters).every(key => !filters[key]);

    return (
        <div className={styles.filtersPanel}>
            <IconInput value={filters.value} name={'name'} icon={'https://www.technodom.kz/under/briefer/loupe.svg'}
                       placeholder={'Найти по названию или ID...'} onChange={onChange}/>
            <CustomDatepicker placeholder={'Выбери дату...'} iconDirection={'left'} onClose={onClose}
                              icon={'https://www.technodom.kz/under/briefer/calendar.svg'} mode="single"/>
            <SelectWrapper name={'category'} data={categories}
                           icon={'https://www.technodom.kz/under/briefer/category.svg'} placeholder={'Категория:'}
                           onSelect={onSelect} value={filters.category} variant="secondary"/>
            <button disabled={isDisabled} className={styles.button} type="button" onClick={onSearch}>Найти</button>
        </div>
    );
};

export default SearchPanel;

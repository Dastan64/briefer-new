import React from 'react';
import styles from './SearchPanel.module.css';

import IconInput from '../UI/IconInput/IconInput';
import CustomSelect from '../UI/CustomSelect/CustomSelect';
import CustomDatepicker from '../UI/CustomDatepicker/CustomDatepicker';

const SearchPanel = ({ filters, categories, onChange, onClick, onClose }) => {
    return (
        <div className={styles.filtersPanel}>
            <IconInput value={filters.value} name={'name'} icon={'https://www.technodom.kz/under/briefer/loupe.svg'}
                       placeholder={'Найти по названию или ID...'} onChange={onChange}/>
            <CustomDatepicker iconDirection={'left'} onClose={onClose}
                              icon={'https://www.technodom.kz/under/briefer/calendar.svg'}/>
            <CustomSelect icon={'https://www.technodom.kz/under/briefer/category.svg'} placeholder={'Категория'}
                          name={'category'} data={categories} onClick={onClick} value={filters.category}/>
        </div>
    );
};

export default SearchPanel;
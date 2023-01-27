import React, { useRef } from 'react';
import './Checkbox.scss'
import { useDispatch } from 'react-redux';
import { checkTask } from '../../../features/data/dataSlice';

const Checkbox = ({ variant, value, id, isChecked, subsectionId }) => {
    const dispatch = useDispatch();
    const checkboxRef = useRef(null);
    const handleChange = ({ target }) => {
        dispatch(checkTask({
            id,
            subsectionId,
            type: 'checkbox',
        }));
    }

    return (
        <label className={`check check--${variant}`}>
            <input type="checkbox" className="check__input" checked={isChecked} onChange={handleChange}
                   ref={checkboxRef}
                   data-value={value}/>
            <span className={`check__box`}></span>
        </label>
    );
};

export default Checkbox;

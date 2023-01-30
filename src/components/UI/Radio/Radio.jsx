import React from 'react';
import './Radio.scss';
import { useDispatch } from 'react-redux';
import { checkTask } from '../../../features/data/dataSlice';

const Radio = ({ variant, value, id, isChecked, subsectionId }) => {
    const dispatch = useDispatch();
    const handleChange = ({ target }) => {
        dispatch(checkTask({
            id,
            subsectionId,
            type: 'radio',
            value,
        }));
    }

    return (
        <label className={`radio radio--${variant}`}>
            <input type="radio" className="radio__input" checked={isChecked}
                   value={value} onChange={handleChange}/>
            <span className={`radio__box`}></span>
        </label>
    );
};

export default Radio;

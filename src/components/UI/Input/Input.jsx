import React from 'react';
import './Input.scss';

const Input = ({ label, name, placeholder, id, value, onChange, onBlur, onFocus, isRequired, isDisabled }) => {

    return (
        <div className="input-container">
            <label htmlFor={id} className="label">{label}
                {isRequired && <span className="label__asterisk">*</span>}
            </label>
            <input
                value={value}
                name={name}
                id={id}
                className={`input ${label.toLowerCase().includes('бюджет') ? 'input_type_budget' : ''}`}
                placeholder={placeholder}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={isDisabled}
            />
        </div>
    );
};

export default Input;

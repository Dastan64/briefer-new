import React from 'react';
import './Input.scss';

const Input = ({ label, name, placeholder, id, value, onChange, onBlur, isRequired }) => {

    return (
        <div className="input-container">
            <label htmlFor={id} className="label">{label}
                {isRequired && <span className="label__asterisk">*</span>}
            </label>
            <input
                value={value}
                name={name}
                id={id}
                className="input"
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    );
};

export default Input;

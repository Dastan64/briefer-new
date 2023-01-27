import React from 'react';
import './Input.scss';

const Input = ({ label, name, placeholder, value, onChange, onBlur, isRequired }) => {

    return (
        <div className="input-container">
            <label htmlFor={name} className="label">{label}{isRequired &&
                <span className="label__asterisk">*</span>}</label>
            <input
                value={value}
                data-key={label}
                name={name}
                id={name}
                className="input"
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    );
};

export default Input;

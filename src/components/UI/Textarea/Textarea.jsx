import React from 'react';
import './Textarea.scss';

const Textarea = ({ name, label, value, onBlur, onChange, isRequired }) => {

    return (
        <div className="input-container input-container--wide">
            <label htmlFor={name} className="label">{label}{isRequired &&
                <span className="label__asterisk">*</span>}</label>
            <textarea value={value} className="textarea" name={name} placeholder="Что нужно сделать?"
                      onChange={onChange}
                      onBlur={onBlur}></textarea>
        </div>
    );
};

export default Textarea;

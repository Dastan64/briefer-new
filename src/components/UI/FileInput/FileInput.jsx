import React, { useRef, useState } from 'react';
import './FileInput.scss';

const FileInput = ({ label, name, placeholder, isRequired }) => {
    const [value, setValue] = useState('');
    const buttonRef = useRef(null);
    const inputRef = useRef(null);

    const handleChange = ({ target }) => {
        setValue(target.value);
        buttonRef.current.textContent = Array.from(target.files).map(file => file.name).join(', ') || 'Выберите файл (-ы) с устройства';
    }

    const handleClick = () => {
        inputRef.current.click();
    }
    return (
        <div className="input-container">
            <label htmlFor={name} className="label label--file">
                <span className="label__text">{label}</span>
                {isRequired && <span className="label__asterisk">*</span>}
            </label>
            <input
                type="file"
                value={value}
                data-key={label}
                name={name}
                ref={inputRef}
                id={name}
                className="input input--file"
                placeholder={placeholder}
                onChange={handleChange}
                multiple="multiple"
            />
            <button type="button" className={`file-button ${value ? 'file-button--highlighted' : ''}`}
                    onClick={handleClick} ref={buttonRef}>Выберите файл (-ы) с
                устройства
            </button>
        </div>
    );
};

export default FileInput;

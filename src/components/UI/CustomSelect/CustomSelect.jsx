import React, { useEffect, useRef, useState } from 'react';
import styles from './CustomSelect.module.css';
import { v4 as uuidv4 } from 'uuid';

const CustomSelect = ({ icon, caption, name, data, value, onClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const toggleSelect = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = ({ target }) => {
            if (selectRef.current && !selectRef.current.contains(target)) {
                setIsOpen(false);
            }
        }
        window.addEventListener('click', handleClickOutside);

        return () => window.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        <div className={`${styles.customSelect} ${isOpen ? styles.customSelectActive : ''}`} ref={selectRef}>
            <button type="button" className={styles.customSelectButton} onClick={toggleSelect}>
                <img width={20} height={20} src={icon} alt=""/>
                <span className={styles.customSelectCaption}>
                    <span>{caption}:</span>
                    <span className={styles.customSelectValue}>{value}</span>
                </span>
                <svg className={styles.customSelectChevron} xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                     viewBox="0 0 16 16" fill="none">
                    <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"
                          d="M9.11322 10.5364C8.50025 11.1545 7.49975 11.1545 6.88678 10.5364L3.12668 6.74459C2.95777 6.57426 2.95777 6.29809 3.12668 6.12775C3.2956 5.95742 3.56946 5.95742 3.73837 6.12775L7.49846 9.91955C7.77361 10.197 8.22639 10.197 8.50154 9.91955L12.2616 6.12775C12.4305 5.95742 12.7044 5.95742 12.8733 6.12775C13.0422 6.29809 13.0422 6.57426 12.8733 6.74459L9.11322 10.5364Z"
                          fill="#212427"/>
                </svg>
            </button>
            <div className={styles.customSelectContent}>
                <ul className={styles.customSelectOptionsList}>
                    {data.length > 0 && data.map(item => {
                        return <li tabIndex={0} key={uuidv4()} onClick={() => onClick(name, item)}>{item}</li>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default CustomSelect;

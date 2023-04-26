import React, { useEffect, useRef, useState } from 'react';
import styles from './CustomSelect.module.css';
import { v4 as uuidv4 } from 'uuid';

const CustomSelect = ({ icon, caption, name, data, value, onClick, ...props }) => {
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
                    {caption && <span>{caption}:</span>}
                    <span className={styles.customSelectValue}>{value}</span>
                </span>
                <img className={styles.customSelectChevron}
                     src="https://www.technodom.kz/under/briefer/chevron-black.svg" alt=""/>
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

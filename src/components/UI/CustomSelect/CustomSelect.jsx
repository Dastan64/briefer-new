import React, { useEffect, useRef, useState } from 'react';
import styles from './CustomSelect.module.css';
import { v4 as uuidv4 } from 'uuid';

const CustomSelect = ({ icon, placeholder, label, isRequired, name, data, value, onClick, variant }) => {
    const [query, setQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState(data);
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const toggleSelect = () => setIsOpen(!isOpen);

    const handleClick = (item) => {
        return () => {
            if (name) {
                onClick(name, item);
            } else {
                onClick(item);
            }
        }
    }

    const handleSearch = ({ target }) => setQuery(target.value);

    useEffect(() => {
        const filteredData = data?.length > 0 && data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
        setFilteredResults(filteredData);
    }, [data, query])

    useEffect(() => {
        if (!isOpen) {
            setQuery('');
        }
    }, [isOpen])

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
        <div className="input-container">
            {label && (
                <span className="label">{label}:
                    {isRequired && <span>*</span>}
                </span>
            )}
            <div
                className={`${styles.customSelect} ${variant === 'primary' ? styles.primary : ''} ${isOpen ? styles.customSelectActive : ''}`}
                ref={selectRef}>
                <button type="button" className={styles.button} onClick={toggleSelect}>
                    {icon && <img width={20} height={20} src={icon} alt=""/>}
                    <span className={styles.placeholder}>
                        {placeholder && !value && <span>{placeholder}</span>}
                        {placeholder && variant !== 'primary' && value && <span>{placeholder}</span>}
                        <span className={styles.value}>{value}</span>
                    </span>
                    <img className={styles.chevron}
                         src="https://www.technodom.kz/under/briefer/chevron-black.svg" alt=""/>
                </button>
                <div className={styles.content}>
                    {data?.length > 8 &&
                        <input value={query} className={styles.searchInput} type="search" onChange={handleSearch}
                               placeholder="Давайте поищем..."/>}
                    <ul className={styles.optionsList}>
                        {filteredResults?.length > 0 && filteredResults.map(item => {
                            return <li tabIndex={0} key={uuidv4()} onClick={handleClick(item)}>{item}</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CustomSelect;

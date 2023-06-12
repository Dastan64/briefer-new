import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Archive.module.css';

//Components
import ArchiveThumb from '../../components/ArchiveThumb/ArchiveThumb';
import NotFoundThumb from '../../components/NotFoundThumb/NotFoundThumb';
import SearchPanel from '../../components/SearchPanel/SearchPanel';

const Archive = () => {
    // const categories = useSelector(state => state.data.data.categories);
    const categories = ['CE', 'IT', 'MDA', 'NE', 'SDA', 'TC'];
    const briefs = useSelector(state => state.briefsList.briefs);
    const [filteredBriefs, setFilteredBriefs] = useState(briefs);
    const [filters, setFilters] = useState({
        value: '',
        date: '',
        category: '',
    })

    const handleChange = ({ target }) => {
        setFilters({
            ...filters,
            value: target.value,
        });
    }

    const handleClick = (key, value) => {
        setFilters({
            ...filters,
            [key]: value,
        })
    }

    const handleClose = (date) => {
        setFilters({
            ...filters,
            date: date[0],
        })
    }

    const filterBriefs = useCallback(() => {
        let filtered = briefs;
        if (filters.value) {
            filtered = filtered.filter(brief => (brief.uuid === +filters.value) || (brief.title.toLowerCase().trim().includes(filters.value.toLowerCase())));
        }
        setFilteredBriefs(filtered);
    }, [briefs, filters])

    useEffect(() => {
        if (!filters.value) {
            setFilteredBriefs(briefs);
        } else {
            filterBriefs();
        }
    }, [filters, briefs]);

    return (
        <section>
            <h2 className={styles.title}>Архив</h2>
            <p className={styles.subtitle}>Здесь собраны все созданные брифы.</p>
            <SearchPanel filters={filters} categories={categories} onChange={handleChange} onClick={handleClick}
                         onClose={handleClose}/>
            {filteredBriefs.length > 0 && (
                <ul className={styles.list}>
                    {filteredBriefs.map(brief => (<ArchiveThumb data={brief} key={brief.uuid}/>))}
                </ul>
            )}
            {filteredBriefs.length === 0 && <NotFoundThumb title={'Не удалось найти запрошенный бриф'}
                                                           subtitle={'Попробуйте изменить настройки поиска'}
                                                           icon={'https://www.technodom.kz/under/briefer/not-found.svg'}/>}
        </section>
    );
};

export default Archive;

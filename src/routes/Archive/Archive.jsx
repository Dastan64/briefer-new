import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Archive.module.css';

//Components
import ArchiveThumb from '../../components/ArchiveThumb/ArchiveThumb';
import NotFoundThumb from '../../components/NotFoundThumb/NotFoundThumb';
import SearchPanel from '../../components/SearchPanel/SearchPanel';

import { fetchBriefs } from '../../features/briefsList/briefsListSlice';

const Archive = () => {
    // const categories = useSelector(state => state.data.data.categories);
    const categories = ['CE', 'IT', 'MDA', 'NE', 'SDA', 'TC'];
    const dispatch = useDispatch();
    const briefs = useSelector(state => state.briefsList.briefs);
    const [filteredBriefs, setFilteredBriefs] = useState([]);
    const [filters, setFilters] = useState({
        value: '',
        date: '',
        category: '',
    })

    const handleChange = ({ target: { value } }) => {
        setFilters({
            ...filters,
            value: value,
        });
    }

    const handleSelect = ({ name, value }) => {
        setFilters({
            ...filters,
            [name]: value,
        })
    }

    const handleClose = (date) => {
        setFilters({
            ...filters,
            date: date[0],
        })
    }

    useEffect(() => {
        const filtered = briefs.filter(brief => {
            const byValue = !filters.value || brief.title?.toLowerCase().includes(filters.value?.toLowerCase().trim());
            const byDate = !filters.date || new Date(brief.date_start).getTime() === new Date(filters.date).getTime();
            return byValue && byDate;
        });
        setFilteredBriefs(filtered || briefs);
    }, [briefs, filters.value, filters.date]);

    useEffect(() => {
        if (briefs?.length > 0) {
            setFilteredBriefs(briefs)
        }
    }, [briefs])

    useEffect(() => {
        dispatch(fetchBriefs());
    }, [])

    return (
        <section>
            <h2 className={styles.title}>Архив</h2>
            <p className={styles.subtitle}>Здесь собраны все созданные брифы.</p>
            <SearchPanel filters={filters} categories={categories} onChange={handleChange} onSelect={handleSelect}
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

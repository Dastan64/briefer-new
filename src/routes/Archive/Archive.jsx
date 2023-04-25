import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Archive.scss';

//Components
import ArchiveThumb from '../../components/ArchiveThumb/ArchiveThumb';
import NotFoundThumb from '../../components/NotFoundThumb/NotFoundThumb';
import SearchPanel from '../../components/SearchPanel/SearchPanel';

const Archive = () => {
    const categories = ['CE', 'IT', 'MDA', 'NE', 'SDA', 'TC'];
    const briefs = useSelector(state => state.briefsList.briefs);
    const [filteredBriefs, setFilteredBriefs] = useState(briefs);
    const [filters, setFilters] = useState({
        value: '',
        startDate: '',
        category: '',
        sortBy: '',
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

    const filterBriefs = useCallback(() => {
        let filtered = briefs;
        if (filters.value) {
            filtered = filtered.filter(brief => (brief.id === +filters.value) || (brief.name.toLowerCase().trim().includes(filters.value.toLowerCase())));
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
        <section className="archive">
            <h2 className="archive__title">Архив</h2>
            <p className="archive__subtitle">Здесь собраны все созданные брифы.</p>
            <SearchPanel filters={filters} categories={categories} onChange={handleChange} onClick={handleClick}/>
            {filteredBriefs.length > 0 && (
                <ul className="archive__list">
                    {filteredBriefs.map(brief => {
                        return <ArchiveThumb data={brief} key={brief.id}/>
                    })}
                </ul>
            )}
            {filteredBriefs.length === 0 &&
                <NotFoundThumb title={'Не удалось найти запрошенный бриф'}
                               subtitle={'Попробуйте изменить настройки поиска'}
                               icon={'https://www.technodom.kz/under/briefer/not-found.svg'}/>}
        </section>
    );
};

export default Archive;
